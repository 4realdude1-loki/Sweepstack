import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutGrid, ListChecks, Flame, CalendarDays, BarChart3, Moon, Sun, Keyboard, Plus, BadgeDollarSign } from 'lucide-react';
import { CASINOS } from './data/casinos.js';
import { SITE_NAME, TAGLINE, DATA_CHECKED, DEFAULT_CPA, AFFILIATE_LINKS } from './config.js';
import { useLocal } from './lib/storage.js';
import { ACHIEVEMENTS } from './lib/achievements.js';
import { XP, burst, dateKey, daysBetween, toCSV, download, encodeShare, decodeShare, copyText, levelInfo } from './lib/utils.js';
import { Toasts, SkeletonGrid, Empty } from './components/ui.jsx';
import OfferCard from './components/OfferCard.jsx';
import OfferModal from './components/OfferModal.jsx';
import FilterBar from './components/FilterBar.jsx';
import StatsHero from './components/StatsHero.jsx';
import TrackerView from './components/TrackerView.jsx';
import DailyView from './components/DailyView.jsx';
import CalendarView from './components/CalendarView.jsx';
import InsightsView from './components/InsightsView.jsx';
import Onboarding from './components/Onboarding.jsx';
import ShortcutsModal from './components/ShortcutsModal.jsx';
import AddOfferModal from './components/AddOfferModal.jsx';

const TABS = [
  { id: 'offers', label: 'Offers', icon: LayoutGrid },
  { id: 'tracker', label: 'Tracker', icon: ListChecks },
  { id: 'daily', label: 'Daily', icon: Flame },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
];

export default function App() {
  // ---------- Persistent state (localStorage) ----------
  const [theme, setTheme] = useLocal('ss.theme', 'dark');
  const [tracked, setTracked] = useLocal('ss.tracked', {});          // { [id]: { status, notes, value, reminder, expires, proof, tags, updatedAt } }
  const [custom, setCustom] = useLocal('ss.custom', []);            // user-added offers
  const [xp, setXp] = useLocal('ss.xp', 0);
  const [daily, setDaily] = useLocal('ss.daily', { days: {}, streak: 0, best: 0, last: null, goalsHit: 0 });
  const [unlocked, setUnlocked] = useLocal('ss.ach', []);
  const [deals, setDeals] = useLocal('ss.deals', {});               // affiliate: { [id]: { cpa, model, aff } }
  const [prefs, setPrefs] = useLocal('ss.prefs', { onboarded: false, affiliateMode: false, shared: 0 });
  const [f, setF] = useLocal('ss.filters', { q: '', types: [], sort: 'sc', state: '', device: 'any', model: 'any', onlyNew: false, hideTracked: false });

  // ---------- Session state ----------
  const [tab, setTab] = useState('offers');
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [showKeys, setShowKeys] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [incoming, setIncoming] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 550); return () => clearTimeout(t); }, []);

  // Shared link import (#share=...)
  useEffect(() => {
    const m = location.hash.match(/share=([^&]+)/);
    if (m) { const d = decodeShare(m[1]); if (d?.t) setIncoming(d); }
  }, []);

  const notify = useCallback((title, body, icon, kind) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, body, icon, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  // XP with level-up celebration
  const gainXp = useCallback((n) => {
    setXp((prev) => {
      const before = levelInfo(prev).level, after = levelInfo(prev + n).level;
      if (after > before) setTimeout(() => { burst('big'); notify(`Level ${after}!`, 'You leveled up. Keep stacking.', 'Rocket', 'gold'); }, 250);
      return prev + n;
    });
  }, [setXp, notify]);

  // ---------- Derived data ----------
  const all = useMemo(() => [...custom, ...CASINOS], [custom]);
  const byId = useMemo(() => Object.fromEntries(all.map((c) => [c.id, c])), [all]);
  const cpaOf = (id) => deals[id]?.cpa ?? DEFAULT_CPA;
  const modelOf = (id) => deals[id]?.model || 'Hybrid';
  const linkOf = (c) => deals[c.id]?.aff || AFFILIATE_LINKS[c.id] || c.url;

  const visible = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    let list = all.filter((c) => {
      if (q && !(c.name + ' ' + c.noDeposit + ' ' + c.purchase + ' ' + c.code + ' ' + (c.notes || '')).toLowerCase().includes(q)) return false;
      if (f.types.length && !f.types.every((t) => c.types.includes(t))) return false;
      if (f.device !== 'any' && !c.devices.includes(f.device)) return false;
      if (f.onlyNew && !c.isNew) return false;
      if (f.hideTracked && tracked[c.id]) return false;
      if (prefs.affiliateMode && f.model !== 'any' && modelOf(c.id) !== f.model) return false;
      if (f.state && c.restricted?.includes(f.state)) return false;
      return true;
    });
    const s = {
      sc: (a, b) => (b.freeSC ?? -1) - (a.freeSC ?? -1) || (b.verified - a.verified),
      gc: (a, b) => (b.gc ?? -1) - (a.gc ?? -1),
      new: (a, b) => (b.isNew - a.isNew) || (b.freeSC ?? -1) - (a.freeSC ?? -1),
      az: (a, b) => a.name.localeCompare(b.name),
      cpa: (a, b) => cpaOf(b.id) - cpaOf(a.id),
    }[f.sort] || (() => 0);
    return list.sort(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, f, tracked, deals, prefs.affiliateMode]);

  const trackedItems = useMemo(
    () => Object.entries(tracked).filter(([id]) => byId[id]).map(([id, track]) => ({ casino: byId[id], track })),
    [tracked, byId]
  );

  const stats = useMemo(() => {
    const vals = trackedItems.map((i) => i.track);
    return {
      tracked: vals.length,
      claimed: vals.filter((t) => ['claimed', 'pending', 'paid'].includes(t.status)).length,
      paid: vals.filter((t) => t.status === 'paid').length,
      value: vals.filter((t) => t.status !== 'active' && t.status !== 'expired').reduce((s, t) => s + (Number(t.value) || 0), 0),
      best: daily.best, goalsHit: daily.goalsHit,
      tags: vals.reduce((s, t) => s + (t.tags?.length || 0), 0),
      shared: prefs.shared,
    };
  }, [trackedItems, daily, prefs.shared]);

  const totalFreeSC = useMemo(() => visible.reduce((s, c) => s + (c.freeSC || 0), 0), [visible]);
  const affValue = useMemo(() => trackedItems.reduce((s, i) => s + cpaOf(i.casino.id), 0), [trackedItems, deals]); // eslint-disable-line

  // ---------- Achievements ----------
  useEffect(() => {
    const fresh = ACHIEVEMENTS.filter((a) => !unlocked.includes(a.id) && a.test(stats));
    if (!fresh.length) return;
    setUnlocked((u) => [...u, ...fresh.map((a) => a.id)]);
    fresh.forEach((a, i) => setTimeout(() => { notify('Achievement unlocked', a.name + ' - ' + a.desc, a.icon, 'gold'); burst(); }, 400 + i * 500));
  }, [stats]); // eslint-disable-line

  // ---------- Actions ----------
  const track = (id) => {
    if (tracked[id]) return;
    setTracked((t) => ({ ...t, [id]: { status: 'active', tags: [], addedAt: Date.now(), updatedAt: Date.now() } }));
    gainXp(XP.track);
    notify('Tracking ' + byId[id].name, '+' + XP.track + ' XP', 'Target');
  };
  const update = (id, patch) => {
    setTracked((t) => {
      const prev = t[id] || { status: 'active', tags: [] };
      if (patch.status && patch.status !== prev.status) {
        if (patch.status === 'claimed' && prev.status === 'active') { burst(); gainXp(XP.claim); notify('Claimed!', '+' + XP.claim + ' XP', 'Check', 'good'); }
        if (patch.status === 'paid' && prev.status !== 'paid') { burst('big'); gainXp(XP.paid); notify('Payday!', '+' + XP.paid + ' XP', 'Banknote', 'gold'); }
      }
      const next = { ...prev, ...patch, updatedAt: Date.now() };
      if (patch.status === 'claimed' && next.value == null && byId[id]?.freeSC) next.value = byId[id].freeSC;
      return { ...t, [id]: next };
    });
  };
  const untrack = (id) => setTracked((t) => { const n = { ...t }; delete n[id]; return n; });
  const openOffer = (c) => window.open(linkOf(c), '_blank', 'noopener');
  const copyCode = async (c) => { if (await copyText(c.code)) notify('Code copied', c.code, 'Copy'); };
  const setDeal = (id, patch) => setDeals((d) => ({ ...d, [id]: { ...d[id], ...patch } }));

  // Daily checklist + streak
  const today = dateKey();
  const checkedToday = daily.days[today] || [];
  const dailyList = useMemo(() => {
    const t = trackedItems.map((i) => i.casino).filter((c) => c.types.includes('daily'));
    return t;
  }, [trackedItems]);
  const goal = Math.max(1, Math.min(5, dailyList.length));
  const checkDaily = (id) => {
    setDaily((d) => {
      const list = d.days[today] || [];
      const on = list.includes(id);
      const nextList = on ? list.filter((x) => x !== id) : [...list, id];
      let { streak, best, last, goalsHit } = d;
      if (!on) {
        gainXp(XP.daily);
        if (last !== today) { streak = last && daysBetween(last, today) === 1 ? streak + 1 : 1; last = today; best = Math.max(best, streak); }
        if (nextList.length === goal) { goalsHit += 1; gainXp(XP.dailyGoal); setTimeout(() => { burst('big'); notify('Daily goal hit', '+' + XP.dailyGoal + ' XP bonus', 'Star', 'gold'); }, 150); }
      }
      // keep only the last 60 days of history
      const days = Object.fromEntries(Object.entries({ ...d.days, [today]: nextList }).sort().slice(-60));
      return { ...d, days, streak, best, last, goalsHit };
    });
  };
  // Streak resets if a day was missed
  const liveStreak = daily.last && daysBetween(daily.last, today) <= 1 ? daily.streak : 0;

  // Export / share
  const markShared = () => setPrefs((p) => ({ ...p, shared: (p.shared || 0) + 1 }));
  const exportCSV = () => {
    const rows = trackedItems.map(({ casino, track: t }) => ({
      casino: casino.name, status: t.status, offer: casino.noDeposit, free_sc: casino.freeSC ?? '', value_logged: t.value ?? '',
      promo_code: casino.code, reminder: t.reminder || '', expires: t.expires || '', proof: t.proof || '', tags: (t.tags || []).join('|'), notes: t.notes || '',
      ...(prefs.affiliateMode ? { cpa: cpaOf(casino.id), model: modelOf(casino.id) } : {}),
    }));
    download(`sweepstack-${today}.csv`, toCSV(rows)); markShared(); notify('CSV exported', rows.length + ' bonuses', 'Download');
  };
  const shareLink = async () => {
    const t = Object.fromEntries(Object.entries(tracked).filter(([id]) => !id.startsWith('custom-')).map(([id, v]) => [id, v.status]));
    const url = location.origin + location.pathname + '#share=' + encodeShare({ t });
    if (await copyText(url)) { markShared(); notify('Share link copied', 'Anyone with it can import your list', 'Share2'); }
  };
  const importShared = () => {
    setTracked((cur) => {
      const n = { ...cur };
      Object.entries(incoming.t).forEach(([id, status]) => { if (!n[id] && byId[id]) n[id] = { status, tags: [], addedAt: Date.now(), updatedAt: Date.now() }; });
      return n;
    });
    setIncoming(null); history.replaceState(null, '', location.pathname); notify('List imported', '', 'Check', 'good');
  };

  // ---------- Keyboard shortcuts ----------
  useEffect(() => {
    const k = (e) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
      if (typing) { if (e.key === 'Escape') document.activeElement.blur(); return; }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') { e.preventDefault(); setTab('offers'); setTimeout(() => searchRef.current?.focus(), 30); }
      else if (e.key === 't') setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
      else if (e.key === 'a') setPrefs((p) => ({ ...p, affiliateMode: !p.affiliateMode }));
      else if (e.key === 'n') setShowAdd(true);
      else if (e.key === '?') setShowKeys(true);
      else if (/^[1-5]$/.test(e.key)) setTab(TABS[Number(e.key) - 1].id);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [setTheme, setPrefs]);

  const openCasino = openId ? byId[openId] : null;

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <div className="mark">S</div>
          <div><b>{SITE_NAME}</b><span>{TAGLINE}</span></div>
        </div>
        <nav className="tabs">
          {TABS.map((t, i) => {
            const I = t.icon;
            const badge = t.id === 'tracker' ? stats.tracked : t.id === 'daily' && dailyList.length ? `${Math.min(checkedToday.length, goal)}/${goal}` : null;
            return (
              <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)} title={`${t.label} (${i + 1})`}>
                <I size={17} /><span>{t.label}</span>{badge ? <em>{badge}</em> : null}
              </button>
            );
          })}
        </nav>
        <div className="top-actions">
          <button className={'icon-btn' + (prefs.affiliateMode ? ' on' : '')} onClick={() => setPrefs((p) => ({ ...p, affiliateMode: !p.affiliateMode }))} title="Affiliate mode (a)"><BadgeDollarSign size={18} /></button>
          <button className="icon-btn" onClick={() => setShowAdd(true)} title="Add offer (n)"><Plus size={18} /></button>
          <button className="icon-btn hide-sm" onClick={() => setShowKeys(true)} title="Shortcuts (?)"><Keyboard size={18} /></button>
          <button className="icon-btn theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Theme (t)">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>
      </header>

      <main className="main">
        {incoming && (
          <div className="banner">
            <span>Someone shared a list of {Object.keys(incoming.t).length} bonuses with you.</span>
            <div><button className="btn primary sm" onClick={importShared}>Import</button><button className="btn ghost sm" onClick={() => setIncoming(null)}>Dismiss</button></div>
          </div>
        )}

        <StatsHero xp={xp} streak={liveStreak} totalFreeSC={totalFreeSC} tracked={stats.tracked} claimed={stats.claimed} value={stats.value} affiliateMode={prefs.affiliateMode} affValue={affValue} />

        <div className="view" key={tab}>
          {tab === 'offers' && (
            <>
              <FilterBar f={f} setF={setF} searchRef={searchRef} affiliateMode={prefs.affiliateMode} count={visible.length} />
              {loading ? <SkeletonGrid /> : visible.length ? (
                <div className="grid">
                  {visible.map((c) => (
                    <OfferCard key={c.id} casino={c} track={tracked[c.id]} affiliateMode={prefs.affiliateMode} cpa={cpaOf(c.id)}
                      onTrack={() => track(c.id)} onClaim={() => update(c.id, { status: 'claimed' })}
                      onOpen={() => openOffer(c)} onCopy={() => copyCode(c)} onDetails={() => setOpenId(c.id)} />
                  ))}
                </div>
              ) : (
                <Empty icon="SearchX" title="No offers match" body="Loosen a filter or clear your search."
                  action={<button className="btn soft" onClick={() => setF((p) => ({ ...p, q: '', types: [], device: 'any', model: 'any', onlyNew: false, hideTracked: false, state: '' }))}>Reset filters</button>} />
              )}
            </>
          )}
          {tab === 'tracker' && <TrackerView items={trackedItems} onDetails={setOpenId} onSetStatus={(id, s) => update(id, { status: s })} onExport={exportCSV} onShare={shareLink} goBrowse={() => setTab('offers')} />}
          {tab === 'daily' && <DailyView list={dailyList} checkedToday={checkedToday} goal={goal} streak={liveStreak} best={daily.best} onCheck={checkDaily} onOpen={openOffer} goBrowse={() => { setTab('offers'); setF((p) => ({ ...p, types: ['daily'] })); }} />}
          {tab === 'calendar' && <CalendarView items={trackedItems} onDetails={setOpenId} />}
          {tab === 'insights' && <InsightsView items={trackedItems} xp={xp} unlocked={unlocked} stats={stats} affiliateMode={prefs.affiliateMode} affValue={affValue} />}
        </div>
      </main>

      <footer className="foot">
        <p><b>Affiliate disclosure:</b> {SITE_NAME} may earn a commission when you sign up through links on this site, at no cost to you.</p>
        <p>No purchase necessary to play at sweepstakes casinos. Void where prohibited. 18+ or 21+ depending on the site and your state. Offers change often; verify terms on each site. Data last checked {DATA_CHECKED}.</p>
        <p>Play responsibly. If gambling stops being fun, call or text <b>1-800-GAMBLER</b>.</p>
      </footer>

      {openCasino && (
        <OfferModal casino={openCasino} track={tracked[openCasino.id]} onClose={() => setOpenId(null)}
          onTrack={() => track(openCasino.id)} onUpdate={update} onUntrack={untrack}
          onOpen={() => openOffer(openCasino)} onCopy={() => copyCode(openCasino)}
          affiliateMode={prefs.affiliateMode} deal={deals[openCasino.id]} onDeal={setDeal} defaultCpa={DEFAULT_CPA} />
      )}
      <Onboarding open={!prefs.onboarded && !loading} onDone={() => setPrefs((p) => ({ ...p, onboarded: true }))} />
      <ShortcutsModal open={showKeys} onClose={() => setShowKeys(false)} />
      <AddOfferModal open={showAdd} onClose={() => setShowAdd(false)} onSave={(c) => { setCustom((x) => [c, ...x]); setShowAdd(false); setTimeout(() => track(c.id), 0); }} />
      <Toasts items={toasts} />
    </div>
  );
}
