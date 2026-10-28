import { fromIso } from "./dates";
import { SITE } from "./site";

/** Heutiges Datum in Deutschland (YYYY-MM-DD), unabhängig von der Serverzeitzone. */
export function todayBerlin(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Früheste buchbare Tag: 01.11.2026 oder heute (der spätere). */
export function earliestBookable(): string {
  const t = todayBerlin();
  return t > SITE.rentalStart ? t : SITE.rentalStart;
}

/** Letzter buchbarer Tag: Ende des 12. Monats ab dem ersten sichtbaren Monat. */
export function latestBookable(): string {
  const { baseYear, baseMonth } = bookingWindow();
  const d = new Date(baseYear, baseMonth + 12, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function bookingWindow() {
  const minIso = earliestBookable();
  const d = fromIso(minIso) as Date;
  return { minIso, baseYear: d.getFullYear(), baseMonth: d.getMonth() };
}
