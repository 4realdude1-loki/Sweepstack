import { useEffect, useState } from 'react';

// useState that persists to localStorage. Everything a user tracks lives
// on their own device - no backend needed to start.
export function useLocal(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return typeof initial === 'function' ? initial() : initial;
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }, [key, value]);
  return [value, setValue];
}
