import React from 'react';
import { Copy, ExternalLink, Plus, Check, ChevronRight, Sparkles, Smartphone } from 'lucide-react';
import { BONUS_TYPES } from '../data/casinos.js';
import { StatusBadge } from './ui.jsx';
import { initials, fmtNum } from '../lib/utils.js';

// One casino offer card. Big CTAs, hover lift, status at a glance.
export default function OfferCard({ casino, track, onTrack, onClaim, onOpen, onCopy, onDetails, affiliateMode, cpa, blocked }) {
  const status = track?.status;
  return (
    <article className={'card offer' + (status ? ' tracked s-' + status : '') + (blocked ? ' blocked' : '')} style={{ '--brand': casino.color }}>
      <div className="card-top">
        <div className="logo" aria-hidden>{initials(casino.name)}</div>
        <div className="title">
          <h3>{casino.name}</h3>
          <div className="meta">
            {casino.isNew && <span className="pill new"><Sparkles size={11} />New</span>}
            {casino.custom && <span className="pill">Custom</span>}
            {casino.devices.includes('ios') && <span className="pill ghost" title="Has a mobile app"><Smartphone size={11} />App</span>}
            {blocked && <span className="pill warn">Not in your state</span>}
          </div>
        </div>
        {status && <StatusBadge status={status} />}
      </div>

      <button className="headline" onClick={onDetails}>
        {casino.freeSC != null ? (
          <>
            <div className="big"><span className="num">{fmtNum(casino.freeSC, 1)}</span><small>SC FREE</small></div>
            <div className="sub">{casino.gc ? `+ ${fmtNum(casino.gc)} Gold Coins` : casino.noDeposit}</div>
          </>
        ) : (
          <div className="big text">{casino.noDeposit}</div>
        )}
        {casino.purchase && <div className="purchase">Purchase deal: {casino.purchase}</div>}
      </button>

      <div className="types">
        {casino.types.slice(0, 4).map((t) => (
          <span key={t} className="tag" style={{ '--c': BONUS_TYPES[t]?.color }}>{BONUS_TYPES[t]?.label}</span>
        ))}
      </div>

      {casino.code && (
        <button className="code" onClick={onCopy} title="Copy promo code">
          <span>CODE</span><b>{casino.code}</b><Copy size={14} />
        </button>
      )}

      <div className="actions">
        {!status && <button className="btn primary" onClick={onTrack}><Plus size={16} />Track This</button>}
        {status === 'active' && <button className="btn success" onClick={onClaim}><Check size={16} />Mark Claimed</button>}
        {status && status !== 'active' && <button className="btn soft" onClick={onDetails}>Update<ChevronRight size={16} /></button>}
        <button className="btn ghost" onClick={onOpen}>Open Offer<ExternalLink size={15} /></button>
      </div>

      {affiliateMode && <div className="aff-line">Est. CPA <b>${fmtNum(cpa)}</b></div>}
    </article>
  );
}
