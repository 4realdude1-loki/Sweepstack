import React, { useMemo, useState } from 'react';
import { Download, Share2, Check, ChevronRight, Bell, Link2 } from 'lucide-react';
import { StatusBadge, Empty } from './ui.jsx';
import { STATUSES, STATUS_ORDER, initials, prettyDate, dateKey, daysBetween, fmtNum } from '../lib/utils.js';

// Personal tracker: everything the user is working, with journey progress.
export default function TrackerView({ items, onDetails, onSetStatus, onExport, onShare, goBrowse }) {
  const [filter, setFilter] = useState('all');
  const counts = useMemo(() => {
    const c = { all: items.length };
    STATUS_ORDER.forEach((s) => (c[s] = items.filter((i) => i.track.status === s).length));
    return c;
  }, [items]);
  const list = items
    .filter((i) => filter === 'all' || i.track.status === filter)
    .sort((a, b) => (b.track.updatedAt || 0) - (a.track.updatedAt || 0));
  const today = dateKey();

  if (!items.length) {
    return <Empty icon="Rocket" title="Your tracker is empty" body="Hit Track This on any offer and it lands here with status, notes, proof, and reminders." action={<button className="btn primary" onClick={goBrowse}>Browse offers</button>} />;
  }

  return (
    <div className="tracker">
      <div className="tracker-bar">
        <div className="seg">
          {['all', ...STATUS_ORDER].map((s) => (
            <button key={s} className={filter === s ? 'on' : ''} style={{ '--c': STATUSES[s]?.color || 'var(--accent)' }} onClick={() => setFilter(s)}>
              {s === 'all' ? 'All' : STATUSES[s].label}<span>{counts[s]}</span>
            </button>
          ))}
        </div>
        <div className="tb-actions">
          <button className="btn soft sm" onClick={onExport}><Download size={15} />CSV</button>
          <button className="btn soft sm" onClick={onShare}><Share2 size={15} />Share link</button>
        </div>
      </div>

      {!list.length && <Empty icon="Filter" title="Nothing here" body="No bonuses with this status yet." />}

      <div className="rows">
        {list.map(({ casino, track }) => {
          const step = STATUSES[track.status].step;
          const due = track.reminder ? daysBetween(today, track.reminder) : null;
          return (
            <div key={casino.id} className={'trow s-' + track.status} style={{ '--brand': casino.color }}>
              <div className="logo sm">{initials(casino.name)}</div>
              <div className="tmain" onClick={() => onDetails(casino.id)}>
                <div className="tline"><b>{casino.name}</b><StatusBadge status={track.status} /></div>
                <div className="journey">
                  {['active', 'claimed', 'pending', 'paid'].map((s, i) => (
                    <i key={s} className={step >= i ? 'done' : ''} style={{ '--c': STATUSES[s].color }} title={STATUSES[s].label} />
                  ))}
                </div>
                <div className="tmeta">
                  <span>{casino.noDeposit}</span>
                  {track.value != null && <span className="hl">{fmtNum(track.value, 1)} logged</span>}
                  {due != null && <span className={due < 0 ? 'late' : due <= 1 ? 'soon' : ''}><Bell size={12} />{due < 0 ? 'Overdue ' : ''}{prettyDate(track.reminder)}</span>}
                  {track.proof && <a href={track.proof} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><Link2 size={12} />Proof</a>}
                  {(track.tags || []).map((t) => <span key={t} className="utag">{t}</span>)}
                </div>
              </div>
              <div className="tact">
                {track.status === 'active' && <button className="btn success sm" onClick={() => onSetStatus(casino.id, 'claimed')}><Check size={15} />Claimed</button>}
                {track.status === 'claimed' && <button className="btn warn sm" onClick={() => onSetStatus(casino.id, 'pending')}>Redeemed</button>}
                {track.status === 'pending' && <button className="btn purple sm" onClick={() => onSetStatus(casino.id, 'paid')}>Got paid</button>}
                <button className="icon-btn" onClick={() => onDetails(casino.id)} aria-label="Details"><ChevronRight size={18} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
