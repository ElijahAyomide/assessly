import { useEffect, useState } from 'react';
import { schoolCodeTaken } from './schools';

// Watches a school code as it is typed and tells you whether another school
// already uses it. status: 'idle' | 'checking' | 'taken' | 'free'.
// `ownCode` (optional) is the school's current code, which is never "taken".
export function useSchoolCodeCheck(code, ownCode = '') {
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    const c = String(code || '').trim().toUpperCase();
    if (!c || c === String(ownCode || '').trim().toUpperCase()) { setStatus('idle'); return undefined; }
    setStatus('checking');
    let stale = false;
    const t = setTimeout(async () => {
      try {
        const taken = await schoolCodeTaken(c);
        if (!stale) setStatus(taken ? 'taken' : 'free');
      } catch {
        if (!stale) setStatus('idle'); // the save/register step checks again
      }
    }, 450);
    return () => { stale = true; clearTimeout(t); };
  }, [code, ownCode]);
  return status;
}
