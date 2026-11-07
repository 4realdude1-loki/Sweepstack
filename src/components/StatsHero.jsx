import React from 'react';
import { Flame, Coins, Target, CheckCircle2, DollarSign } from 'lucide-react';
import { AnimatedNumber } from './ui.jsx';
import { levelInfo, levelTitle } from '../lib/utils.js';

// The at-a-glance strip: level + XP bar, streak, and the key counters.
export default function StatsHero({ xp, streak, totalFreeSC, tracked, claimed, value, affiliateMode, affValue }) {
  const L = levelInfo(xp);
  return (
    <section className="hero">
      <div className="level-card">
        <div className="lvl-badge"><span>LVL</span><b>{L.level}</b></div>
        <div className="lvl-body">
          <div className="lvl-top"><b>{levelTitle(L.level)}</b><span className="muted">{L.into} / {L.need} XP</span></div>
          <div className="bar"><i style={{ width: L.pct + '%' }} /></div>
        </div>
        <div className={'streak' + (streak > 0 ? ' lit' : '')} title="Daily streak"><Flame size={20} /><b>{streak}</b></div>
      </div>
      <div className="stat"><Coins size={18} /><div><b><AnimatedNumber value={totalFreeSC} decimals={1} /></b><span>Free SC up for grabs</span></div></div>
      <div className="stat"><Target size={18} /><div><b><AnimatedNumber value={tracked} /></b><span>Tracking</span></div></div>
      <div className="stat"><CheckCircle2 size={18} /><div><b><AnimatedNumber value={claimed} /></b><span>Claimed</span></div></div>
      {affiliateMode
        ? <div className="stat hot"><DollarSign size={18} /><div><b><AnimatedNumber value={affValue} prefix="$" /></b><span>Est. CPA potential</span></div></div>
        : <div className="stat hot"><DollarSign size={18} /><div><b><AnimatedNumber value={value} decimals={1} /></b><span>Value logged</span></div></div>}
    </section>
  );
}
