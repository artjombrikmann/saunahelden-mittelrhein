// Kalendertage nur über lokale Datumsteile, nie über toISOString().
const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export const monthName = (m: number) => MONTHS[m];

const pad = (n: number) => (n < 10 ? "0" : "") + n;

export function iso(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parst YYYY-MM-DD (lokal). Gibt null zurück, wenn das Datum ungültig ist. */
export function fromIso(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return iso(d) === s ? d : null;
}

export function isWeekend(d: Date): boolean {
  const g = d.getDay();
  return g === 5 || g === 6 || g === 0; // Fr, Sa, So
}

/** Alle Tage von start bis end (beide inklusive) als ISO-Strings. */
export function eachDay(startIso: string, endIso: string): string[] {
  const a = fromIso(startIso);
  const b = fromIso(endIso);
  if (!a || !b || a > b) return [];
  const out: string[] = [];
  for (const d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) out.push(iso(d));
  return out;
}

export function formatDay(d: Date): string {
  return `${WEEKDAYS[d.getDay()]}., ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatIso(s: string): string {
  const d = fromIso(s);
  return d ? formatDay(d) : s;
}
