import { eachDay, fromIso, isWeekend } from "./dates";

// Platzhalterwerte aus dem Pitch, vom Kunden zu bestätigen (docs/OFFENE-PUNKTE.md).
export const PRICING = {
  weekdayPerDay: 89, // Mo-Do
  weekendPerDay: 109, // Fr-So
  deliveryFlat: 39, // Lieferung ab, Zonen folgen
  extras: [
    { id: "holz", label: "Brennholz-Paket", price: 15 },
    { id: "aufguss", label: "Aufguss-Set", price: 8 },
    { id: "handtuch", label: "Handtuchpaket", price: 12 },
    { id: "reinigung", label: "Endreinigung durch uns", price: 25 },
  ],
} as const;

export type ExtraId = (typeof PRICING.extras)[number]["id"];
export const EXTRA_IDS = PRICING.extras.map((e) => e.id) as [ExtraId, ...ExtraId[]];
export type DeliveryMode = "pickup" | "delivery";

export type QuoteInput = { start: string; end: string; mode: DeliveryMode; extraIds: readonly string[] };
export type QuoteLine = { label: string; amount: number };
export type Quote = { days: number; lines: QuoteLine[]; total: number };

export function dayPrice(day: string): number {
  const d = fromIso(day);
  return d && isWeekend(d) ? PRICING.weekendPerDay : PRICING.weekdayPerDay;
}

export function calcQuote({ start, end, mode, extraIds }: QuoteInput): Quote {
  const days = eachDay(start, end);
  const lines: QuoteLine[] = [];
  const we = days.filter((s) => isWeekend(fromIso(s) as Date)).length;
  const wd = days.length - we;
  if (wd) lines.push({ label: `${wd} × Mo–Do`, amount: wd * PRICING.weekdayPerDay });
  if (we) lines.push({ label: `${we} × Fr–So`, amount: we * PRICING.weekendPerDay });
  if (mode === "delivery") lines.push({ label: "Lieferung", amount: PRICING.deliveryFlat });
  for (const e of PRICING.extras) {
    if (extraIds.includes(e.id)) lines.push({ label: e.label, amount: e.price });
  }
  return { days: days.length, lines, total: lines.reduce((s, l) => s + l.amount, 0) };
}

export const eur = (n: number) => `${n} €`;
