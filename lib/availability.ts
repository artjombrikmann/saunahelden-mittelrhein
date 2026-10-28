// Phase 2: statische Beispielliste (Platzhalter). Später Supabase (Tabelle blocked_dates).
const BOOKED_DATES: readonly string[] = [
  "2026-11-14", "2026-11-15", "2026-11-21", "2026-11-22",
  "2026-12-05", "2026-12-06", "2026-12-12", "2026-12-13", "2026-12-31",
];

export async function getBookedDates(): Promise<string[]> {
  return [...BOOKED_DATES];
}
