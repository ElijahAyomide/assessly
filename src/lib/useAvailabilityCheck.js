import { useEffect, useState } from 'react';

// Watches a value as it is typed and asks `isTaken(value)` whether it is already
// used. Returns 'idle' | 'checking' | 'taken' | 'free'. If the check itself
// fails (offline, etc.) it stays 'idle': the real check runs again on submit.
export function useAvailabilityCheck(value, isTaken, skipValue = '') {
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    const v = String(value || '').trim();
    if (!v || v.toLowerCase() === String(skipValue || '').trim().toLowerCase()) { setStatus('idle'); return undefined; }
    setStatus('checking');
    let stale = false;
    const t = setTimeout(async () => {
      try {
        const taken = await isTaken(v);
        if (!stale) setStatus(taken ? 'taken' : 'free');
      } catch {
        if (!stale) setStatus('idle');
      }
    }, 450);
    return () => { stale = true; clearTimeout(t); };
  }, [value, skipValue]); // eslint-disable-line react-hooks/exhaustive-deps
  return status;
}

// Small red message shown under a field. Inline styles only, so the site's
// stylesheet is not touched.
export const RED = '#D92D20';
export const alertStyle = { marginTop: '0.4em', color: RED, fontSize: '0.8em', fontWeight: 600, lineHeight: 1.4 };
export const redBorder = { borderColor: RED };
