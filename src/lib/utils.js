import confetti from 'canvas-confetti';

// ---------- Status model for tracked bonuses ----------
export const STATUSES = {
  active:  { label: 'Active',         color: '#3b82f6', step: 0 },
  claimed: { label: 'Claimed',        color: '#22c55e', step: 1 },
  pending: { label: 'Pending Payout', color: '#f59e0b', step: 2 },
  paid:    { label: 'Paid Out',       color: '#a855f7', step: 3 },
  expired: { label: 'Expired',        color: '#6b7280', step: -1 },
};
export const STATUS_ORDER = ['active', 'claimed', 'pending', 'paid', 'expired'];

export const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

// ---------- Dates ----------
export const dateKey = (d = new Date()) => {
  const z = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};
export const daysBetween = (a, b) =>
  Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
export const prettyDate = (k) =>
  k ? new Date(k + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';

// ---------- XP / levels ----------
export const XP = { track: 10, claim: 25, paid: 40, daily: 5, dailyGoal: 30 };
export const levelInfo = (xp) => {
  // Each level needs a bit more XP than the last.
  let level = 1, need = 100, floor = 0;
  while (xp >= floor + need) { floor += need; level += 1; need = Math.round(need * 1.25); }
  return { level, into: xp - floor, need, pct: Math.min(100, ((xp - floor) / need) * 100) };
};
export const LEVEL_TITLES = ['Rookie', 'Grinder', 'Hustler', 'Sharp', 'High Roller', 'Whale', 'Legend', 'Sweeps King'];
export const levelTitle = (lvl) => LEVEL_TITLES[Math.min(lvl - 1, LEVEL_TITLES.length - 1)];

// ---------- Confetti ----------
export function burst(kind = 'small') {
  const colors = ['#7c5cff', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4'];
  if (kind === 'big') {
    const end = Date.now() + 700;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  } else {
    confetti({ particleCount: 60, spread: 65, startVelocity: 35, origin: { y: 0.75 }, colors, scalar: 0.9 });
  }
}

// ---------- Export / share ----------
export function toCSV(rows) {
  if (!rows.length) return '';
  const cols = Object.keys(rows[0]);
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n');
}
export function download(filename, text, type = 'text/csv') {
  const blob = new Blob([text], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export const encodeShare = (obj) => btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
export const decodeShare = (s) => { try { return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch { return null; } };

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t);
    t.select(); const ok = document.execCommand('copy'); t.remove(); return ok;
  }
}

export const initials = (name) =>
  name.replace(/[^A-Za-z0-9 ]/g, ' ').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const fmtNum = (n, d = 0) =>
  n == null ? '-' : Number(n).toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: 0 });
