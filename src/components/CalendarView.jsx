import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, Clock } from 'lucide-react';
import { dateKey, prettyDate } from '../lib/utils.js';

// Month calendar of reminders and offer expirations from the tracker.
export default function CalendarView({ items, onDetails }) {
  const [cursor, setCursor] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [sel, setSel] = useState(dateKey());
  const events = useMemo(() => {
    const m = {};
    items.forEach(({ casino, track }) => {
      if (track.reminder) (m[track.reminder] ||= []).push({ casino, kind: 'reminder' });
      if (track.expires) (m[track.expires] ||= []).push({ casino, kind: 'expires' });
    });
    return m;
  }, [items]);
  const y = cursor.getFullYear(), mo = cursor.getMonth();
  const startPad = new Date(y, mo, 1).getDay();
  const days = new Date(y, mo + 1, 0).getDate();
  const cells = [...Array(startPad).fill(null), ...Array.from({ length: days }, (_, i) => dateKey(new Date(y, mo, i + 1)))];
  const today = dateKey();
  const upcoming = Object.keys(events).filter((k) => k >= today).sort().slice(0, 8);

  return (
    <div className="cal-wrap">
      <div className="cal">
        <div className="cal-head">
          <button className="icon-btn" onClick={() => setCursor(new Date(y, mo - 1, 1))} aria-label="Previous month"><ChevronLeft size={18} /></button>
          <h3>{cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h3>
          <button className="icon-btn" onClick={() => setCursor(new Date(y, mo + 1, 1))} aria-label="Next month"><ChevronRight size={18} /></button>
        </div>
        <div className="cal-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="dow">{d}</div>)}
          {cells.map((k, i) => k ? (
            <button key={k} className={'day' + (k === today ? ' today' : '') + (k === sel ? ' sel' : '')} onClick={() => setSel(k)}>
              <span>{Number(k.slice(-2))}</span>
              <div className="dots">{(events[k] || []).slice(0, 4).map((e, j) => <i key={j} className={e.kind} style={{ '--brand': e.casino.color }} />)}</div>
            </button>
          ) : <div key={'p' + i} />)}
        </div>
      </div>
      <aside className="cal-side">
        <h4>{prettyDate(sel)}</h4>
        {(events[sel] || []).length ? events[sel].map((e, i) => (
          <button key={i} className="ev" onClick={() => onDetails(e.casino.id)}>
            {e.kind === 'reminder' ? <Bell size={14} /> : <Clock size={14} />}
            <b>{e.casino.name}</b><span>{e.kind === 'reminder' ? 'Reminder' : 'Expires'}</span>
          </button>
        )) : <p className="muted small">Nothing on this day.</p>}
        <h4 className="mt">Coming up</h4>
        {upcoming.length ? upcoming.map((k) => events[k].map((e, i) => (
          <button key={k + i} className="ev" onClick={() => onDetails(e.casino.id)}>
            <span className="date">{prettyDate(k)}</span><b>{e.casino.name}</b><span>{e.kind === 'reminder' ? 'Reminder' : 'Expires'}</span>
          </button>
        ))) : <p className="muted small">Set reminders or expiration dates on tracked offers and they show up here.</p>}
      </aside>
    </div>
  );
}
