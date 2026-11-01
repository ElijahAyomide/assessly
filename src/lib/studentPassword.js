// A student's password is their FIRST NAME, written with a capital first letter
// and small letters after it (Elijah). The sign-in check is case sensitive.
// (The database column is still called "surname"; it simply holds this value.)
export function passwordFromName(fullName) {
  const first = String(fullName || '').trim().split(/\s+/)[0] || '';
  return first
    .toLowerCase()
    .replace(/(^|[^\p{L}\p{N}])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
}
