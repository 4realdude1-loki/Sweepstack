import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import { STATUSES } from '../lib/utils.js';

// Renders a lucide icon by name (used for achievements).
export const Icon = ({ name, size = 18, ...p }) => {
  const C = Icons[name] || Icons.Circle;
  return <C size={size} {...p} />;
};

// Counts up smoothly whenever `value` changes.
export function AnimatedNumber({ value = 0, decimals = 0, prefix = '', suffix = '' }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current, b = value, dur = 700;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(a + (b - a) * eased);
      if (p < 1) raf = requestAnimationFrame(tick); else from.current = b;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="num">{prefix}{Number(shown).toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
}

export const StatusBadge = ({ status }) => {
  const s = STATUSES[status];
  if (!s) return null;
  return <span className="badge" style={{ '--c': s.color }}><i />{s.label}</span>;
};

export const Chip = ({ color, children, active, onClick, title }) => (
  <button type="button" title={title} className={'chip' + (active ? ' on' : '')} style={{ '--c': color }} onClick={onClick}>
    {children}
  </button>
);

export function Modal({ open, onClose, children, wide, title }) {
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className={'modal' + (wide ? ' wide' : '')} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label={title}>
        <button className="icon-btn close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}

export const Toasts = ({ items }) => (
  <div className="toasts">
    {items.map((t) => (
      <div key={t.id} className={'toast ' + (t.kind || '')}>
        {t.icon && <Icon name={t.icon} size={18} />}
        <div><b>{t.title}</b>{t.body && <span>{t.body}</span>}</div>
      </div>
    ))}
  </div>
);

export const SkeletonGrid = ({ n = 8 }) => (
  <div className="grid">
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="card skel">
        <div className="sk sk-row"><div className="sk sk-logo" /><div className="sk sk-line w60" /></div>
        <div className="sk sk-line w80 tall" />
        <div className="sk sk-line w40" />
        <div className="sk sk-row"><div className="sk sk-btn" /><div className="sk sk-btn" /></div>
      </div>
    ))}
  </div>
);

export const Empty = ({ icon = 'Sparkles', title, body, action }) => (
  <div className="empty">
    <div className="empty-orb"><Icon name={icon} size={30} /></div>
    <h3>{title}</h3>
    <p>{body}</p>
    {action}
  </div>
);

export function ProgressRing({ pct = 0, size = 64, stroke = 7, children }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="ring-bg" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="ring-fg" fill="none"
          strokeDasharray={c} strokeDashoffset={c - (Math.min(100, pct) / 100) * c} strokeLinecap="round" />
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  );
}
