import React from 'react';
import { AnimatedNumber, Icon } from './ui.jsx';
import { ACHIEVEMENTS } from '../lib/achievements.js';
import { STATUSES, STATUS_ORDER, levelInfo, levelTitle } from '../lib/utils.js';
import { BONUS_TYPES } from '../data/casinos.js';

// Simple analytics + achievement wall.
export default function InsightsView({ items, xp, unlocked, stats, affiliateMode, affValue }) {
  const L = levelInfo(xp);
  const total = items.length || 1;
  const claimedish = items.filter((i) => ['claimed', 'pending', 'paid'].includes(i.track.status)).length;
  const rate = items.length ? Math.round((claimedish / items.length) * 100) : 0;
  const byType = {};
  items.forEach(({ casino }) => casino.types.forEach((t) => (byType[t] = (byType[t] || 0) + 1)));
  return (
    <div className="insights">
      <div className="kpis">
        <div className="kpi"><span>Total value logged</span><b><AnimatedNumber value={stats.value} decimals={1} /></b></div>
        <div className="kpi"><span>Claim rate</span><b><AnimatedNumber value={rate} suffix="%" /></b></div>
        <div className="kpi"><span>Paid out</span><b><AnimatedNumber value={stats.paid} /></b></div>
        <div className="kpi"><span>Best streak</span><b><AnimatedNumber value={stats.best} suffix=" days" /></b></div>
        {affiliateMode && <div className="kpi hot"><span>Est. CPA potential</span><b><AnimatedNumber value={affValue} prefix="$" /></b></div>}
      </div>

      <div className="panels">
        <div className="panel">
          <h4>Pipeline</h4>
          {STATUS_ORDER.map((s) => {
            const n = items.filter((i) => i.track.status === s).length;
            return (
              <div key={s} className="hbar"><span>{STATUSES[s].label}</span>
                <div className="track"><i style={{ width: (n / total) * 100 + '%', background: STATUSES[s].color }} /></div><b>{n}</b>
              </div>
            );
          })}
        </div>
        <div className="panel">
          <h4>Bonus mix</h4>
          {Object.entries(BONUS_TYPES).map(([k, v]) => (
            <div key={k} className="hbar"><span>{v.label}</span>
              <div className="track"><i style={{ width: ((byType[k] || 0) / total) * 100 + '%', background: v.color }} /></div><b>{byType[k] || 0}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="ach-head"><h4>Achievements</h4><span className="muted">{unlocked.length}/{ACHIEVEMENTS.length} unlocked - Level {L.level} {levelTitle(L.level)}</span></div>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => {
            const on = unlocked.includes(a.id);
            return (
              <div key={a.id} className={'ach' + (on ? ' on' : '')}>
                <div className="ach-ic"><Icon name={a.icon} size={20} /></div>
                <b>{a.name}</b><span>{a.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
