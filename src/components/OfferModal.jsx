import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Trash2, Bell, Link2, StickyNote, Tag, X } from 'lucide-react';
import { BONUS_TYPES } from '../data/casinos.js';
import { Modal, StatusBadge } from './ui.jsx';
import { STATUSES, STATUS_ORDER, initials, fmtNum } from '../lib/utils.js';

// Full offer view + personal tracker controls for one casino.
export default function OfferModal({ casino, track, onClose, onTrack, onUpdate, onUntrack, onOpen, onCopy, affiliateMode, deal, onDeal, defaultCpa }) {
  const [tagDraft, setTagDraft] = useState('');
  if (!casino) return null;
  const t = track || {};
  const set = (patch) => onUpdate(casino.id, patch);
  const addTag = () => {
    const v = tagDraft.trim();
    if (!v) return;
    set({ tags: Array.from(new Set([...(t.tags || []), v])) });
    setTagDraft('');
  };

  return (
    <Modal open onClose={onClose} wide title={casino.name}>
      <div className="m-head" style={{ '--brand': casino.color }}>
        <div className="logo lg">{initials(casino.name)}</div>
        <div>
          <h2>{casino.name}</h2>
          <div className="meta">
            {track && <StatusBadge status={t.status} />}
            {casino.isNew && <span className="pill new">New</span>}
            {!casino.verified && !casino.custom && <span className="pill ghost">Verify offer on site</span>}
          </div>
        </div>
      </div>

      <div className="m-grid">
        <section className="m-sec">
          <h4>Sign-up offer</h4>
          <p className="m-big">{casino.noDeposit}</p>
          {casino.purchase && (<><h4>First-purchase deal</h4><p>{casino.purchase}</p></>)}
          {casino.notes && (<><h4>Good to know</h4><p className="muted">{casino.notes}</p></>)}
          <div className="types">
            {casino.types.map((x) => <span key={x} className="tag" style={{ '--c': BONUS_TYPES[x]?.color }}>{BONUS_TYPES[x]?.label}</span>)}
          </div>
          <dl className="facts">
            <div><dt>Devices</dt><dd>{casino.devices.join(', ')}</dd></div>
            <div><dt>Not available in</dt><dd>{casino.restricted?.length ? casino.restricted.join(', ') : 'Check terms'}</dd></div>
            {casino.code && <div><dt>Promo code</dt><dd className="mono">{casino.code}</dd></div>}
          </dl>
          <div className="actions">
            <button className="btn primary" onClick={onOpen}>Open Offer<ExternalLink size={15} /></button>
            {casino.code && <button className="btn soft" onClick={onCopy}><Copy size={15} />Copy Code</button>}
          </div>
        </section>

        <section className="m-sec tracker-box">
          <h4>My tracker</h4>
          {!track ? (
            <div className="m-empty">
              <p>Track this offer to log status, notes, proof, and reminders.</p>
              <button className="btn primary block" onClick={onTrack}>Track This</button>
            </div>
          ) : (
            <>
              <div className="status-steps">
                {STATUS_ORDER.map((s) => (
                  <button key={s} className={'step' + (t.status === s ? ' on' : '')} style={{ '--c': STATUSES[s].color }} onClick={() => set({ status: s })}>
                    {t.status === s && <Check size={13} />}{STATUSES[s].label}
                  </button>
                ))}
              </div>
              <label className="field"><span><StickyNote size={14} />Notes</span>
                <textarea rows={3} value={t.notes || ''} placeholder="Wagering, redemption min, what you played..." onChange={(e) => set({ notes: e.target.value })} />
              </label>
              <div className="row2">
                <label className="field"><span>Value (SC / $)</span>
                  <input type="number" min="0" step="0.1" value={t.value ?? ''} placeholder={casino.freeSC ?? '0'} onChange={(e) => set({ value: e.target.value === '' ? null : Number(e.target.value) })} />
                </label>
                <label className="field"><span><Bell size={14} />Reminder</span>
                  <input type="date" value={t.reminder || ''} onChange={(e) => set({ reminder: e.target.value })} />
                </label>
              </div>
              <div className="row2">
                <label className="field"><span>Offer expires</span>
                  <input type="date" value={t.expires || ''} onChange={(e) => set({ expires: e.target.value })} />
                </label>
                <label className="field"><span><Link2 size={14} />Proof link</span>
                  <input type="url" value={t.proof || ''} placeholder="Screenshot or receipt URL" onChange={(e) => set({ proof: e.target.value })} />
                </label>
              </div>
              <label className="field"><span><Tag size={14} />Tags</span>
                <div className="tag-input">
                  {(t.tags || []).map((g) => (
                    <span key={g} className="utag">{g}<button onClick={() => set({ tags: t.tags.filter((x) => x !== g) })} aria-label="Remove tag"><X size={11} /></button></span>
                  ))}
                  <input value={tagDraft} placeholder="Add tag + Enter" onChange={(e) => setTagDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                </div>
              </label>
              <button className="btn danger-ghost" onClick={() => { onUntrack(casino.id); onClose(); }}><Trash2 size={15} />Stop tracking</button>
            </>
          )}

          {affiliateMode && (
            <div className="deal-box">
              <h4>My affiliate deal</h4>
              <div className="row2">
                <label className="field"><span>CPA ($)</span>
                  <input type="number" min="0" value={deal?.cpa ?? ''} placeholder={String(defaultCpa)} onChange={(e) => onDeal(casino.id, { cpa: e.target.value === '' ? null : Number(e.target.value) })} />
                </label>
                <label className="field"><span>Model</span>
                  <select value={deal?.model || 'Hybrid'} onChange={(e) => onDeal(casino.id, { model: e.target.value })}>
                    <option>CPA</option><option>RevShare</option><option>Hybrid</option>
                  </select>
                </label>
              </div>
              <label className="field"><span>My tracking link (this device)</span>
                <input type="url" value={deal?.aff || ''} placeholder="https://..." onChange={(e) => onDeal(casino.id, { aff: e.target.value })} />
              </label>
              <p className="muted small">For the live site, paste links in src/config.js so every visitor gets your link.</p>
            </div>
          )}
        </section>
      </div>
    </Modal>
  );
}
