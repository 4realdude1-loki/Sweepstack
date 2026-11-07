import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { BONUS_TYPES } from '../data/casinos.js';
import { Chip } from './ui.jsx';
import { US_STATES } from '../lib/utils.js';

// Instant search + type chips + sort/geo/device/model selects.
export default function FilterBar({ f, setF, searchRef, affiliateMode, count }) {
  const toggleType = (t) => setF((p) => ({ ...p, types: p.types.includes(t) ? p.types.filter((x) => x !== t) : [...p.types, t] }));
  const active = f.q || f.types.length || f.device !== 'any' || f.model !== 'any' || f.onlyNew || f.hideTracked;
  return (
    <div className="filters">
      <div className="search">
        <Search size={18} />
        <input ref={searchRef} value={f.q} placeholder="Search 65+ sweepstakes casinos..." onChange={(e) => setF((p) => ({ ...p, q: e.target.value }))} />
        <kbd>/</kbd>
      </div>
      <div className="chips">
        {Object.entries(BONUS_TYPES).map(([k, v]) => (
          <Chip key={k} color={v.color} active={f.types.includes(k)} onClick={() => toggleType(k)}>{v.label}</Chip>
        ))}
        <Chip color="#ec4899" active={f.onlyNew} onClick={() => setF((p) => ({ ...p, onlyNew: !p.onlyNew }))}>New 2025-26</Chip>
        <Chip color="#94a3b8" active={f.hideTracked} onClick={() => setF((p) => ({ ...p, hideTracked: !p.hideTracked }))}>Hide tracked</Chip>
      </div>
      <div className="selects">
        <SlidersHorizontal size={16} className="muted" />
        <select value={f.sort} onChange={(e) => setF((p) => ({ ...p, sort: e.target.value }))} aria-label="Sort">
          <option value="sc">Most free SC</option>
          <option value="gc">Most Gold Coins</option>
          <option value="new">Newest first</option>
          <option value="az">A to Z</option>
          {affiliateMode && <option value="cpa">Highest CPA</option>}
        </select>
        <select value={f.state} onChange={(e) => setF((p) => ({ ...p, state: e.target.value }))} aria-label="My state">
          <option value="">All states</option>
          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={f.device} onChange={(e) => setF((p) => ({ ...p, device: e.target.value }))} aria-label="Device">
          <option value="any">Any device</option><option value="web">Web</option><option value="ios">iOS app</option><option value="android">Android app</option>
        </select>
        {affiliateMode && (
          <select value={f.model} onChange={(e) => setF((p) => ({ ...p, model: e.target.value }))} aria-label="Deal model">
            <option value="any">Any deal</option><option>CPA</option><option>RevShare</option><option>Hybrid</option>
          </select>
        )}
        <span className="count">{count} offers</span>
        {active ? <button className="link" onClick={() => setF((p) => ({ ...p, q: '', types: [], device: 'any', model: 'any', onlyNew: false, hideTracked: false }))}><X size={14} />Clear</button> : null}
      </div>
    </div>
  );
}
