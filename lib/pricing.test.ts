import { describe, expect, it } from "vitest";
import { calcQuote } from "./pricing";

describe("calcQuote", () => {
  it("1 Miettag unter der Woche (Mi)", () => {
    const q = calcQuote({ start: "2026-11-11", end: "2026-11-11", mode: "pickup", extraIds: [] });
    expect(q.days).toBe(1);
    expect(q.total).toBe(89);
  });
  it("Fr-So = 3 Tage à 109 €", () => {
    const q = calcQuote({ start: "2026-11-06", end: "2026-11-08", mode: "pickup", extraIds: [] });
    expect(q.days).toBe(3);
    expect(q.total).toBe(327);
  });
  it("Zeitraum über Monatsgrenze (Fr 27.11. bis Di 1.12.)", () => {
    const q = calcQuote({ start: "2026-11-27", end: "2026-12-01", mode: "pickup", extraIds: [] });
    expect(q.days).toBe(5);
    expect(q.total).toBe(3 * 109 + 2 * 89);
  });
  it("Lieferung addiert Pauschale", () => {
    const q = calcQuote({ start: "2026-11-11", end: "2026-11-11", mode: "delivery", extraIds: [] });
    expect(q.total).toBe(89 + 39);
  });
  it("Extras werden addiert, unbekannte ignoriert", () => {
    const q = calcQuote({ start: "2026-11-11", end: "2026-11-11", mode: "pickup", extraIds: ["holz", "reinigung", "unbekannt"] });
    expect(q.total).toBe(89 + 15 + 25);
  });
  it("Summe der Zeilen entspricht Gesamtsumme", () => {
    const q = calcQuote({ start: "2026-11-05", end: "2026-11-09", mode: "delivery", extraIds: ["aufguss"] });
    expect(q.lines.reduce((s, l) => s + l.amount, 0)).toBe(q.total);
  });
});
