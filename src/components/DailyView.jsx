import React from 'react';
import { Check, ExternalLink, Flame, Trophy } from 'lucide-react';
import { ProgressRing, Empty } from './ui.jsx';
import { initials } from '../lib/utils.js';

// The daily grind: check off each casino's daily login bonus to build a streak.
export default function DailyView({ list, checkedToday, goal, streak, best, onCheck, onOpen, goBrowse }) {
  const done = list.filter((c) => checkedToday.includes(c.id)).length;
  const pct = goal ? (Math.min(done, goal) / goal) * 100 : 0;
  if (!list.length) return <Empty icon="Flame" title="No dailies yet" body="Track casinos with daily login bonuses to build your daily checklist." action={<button className="btn primary" onClick={goBrowse}>Find daily bonuses</button>} />;
  return (
    <div className="daily">
      <div className="daily-hero">
        <ProgressRing pct={pct} size={96} stroke={9}><b>{Math.min(done, goal)}/{goal}</b><span>today</span></ProgressRing>
        <div>
          <h2>{done >= goal ? 'Daily goal crushed.' : `Claim ${goal - Math.min(done, goal)} more to keep the streak`}</h2>
          <p className="muted">Free coins reset every day. Check them off as you collect.</p>
          <div className="streak-row">
            <span className={'streak big' + (streak ? ' lit' : '')}><Flame size={18} />{streak} day streak</span>
            <span className="pill ghost"><Trophy size={13} />Best {best}</span>
          </div>
        </div>
      </div>
      <div className="daily-list">
        {list.map((c) => {
          const on = checkedToday.includes(c.id);
          return (
            <div key={c.id} className={'dl' + (on ? ' on' : '')} style={{ '--brand': c.color }}>
              <button className="check" onClick={() => onCheck(c.id)} aria-label={'Mark ' + c.name + ' daily claimed'}>{on && <Check size={16} />}</button>
              <div className="logo xs">{initials(c.name)}</div>
              <b>{c.name}</b>
              <button className="btn ghost sm" onClick={() => onOpen(c)}>Collect<ExternalLink size={14} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
