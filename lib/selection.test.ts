import { describe, expect, it } from "vitest";
import { MSG, pickDay } from "./selection";

const booked = ["2026-11-14", "2026-11-15"];
const empty = { start: null, end: null };

describe("pickDay", () => {
  it("erster Tipp setzt Start", () => {
    expect(pickDay(empty, "2026-11-10", booked).selection).toEqual({ start: "2026-11-10", end: null });
  });
  it("gleicher Tag zweimal = 1 Miettag", () => {
    const a = pickDay(empty, "2026-11-10", booked).selection;
    expect(pickDay(a, "2026-11-10", booked).selection).toEqual({ start: "2026-11-10", end: "2026-11-10" });
  });
  it("späterer Tag setzt Ende", () => {
    const r = pickDay({ start: "2026-11-10", end: null }, "2026-11-12", booked);
    expect(r.selection.end).toBe("2026-11-12");
    expect(r.message).toBe(MSG.done);
  });
  it("Tipp vor dem Start ergibt neuen Start", () => {
    expect(pickDay({ start: "2026-11-10", end: null }, "2026-11-08", booked).selection).toEqual({ start: "2026-11-08", end: null });
  });
  it("bei vollständiger Auswahl startet neuer Zeitraum", () => {
    const r = pickDay({ start: "2026-11-10", end: "2026-11-12" }, "2026-11-20", booked);
    expect(r.selection).toEqual({ start: "2026-11-20", end: null });
  });
  it("belegter Tag im Zeitraum verwirft ihn", () => {
    const r = pickDay({ start: "2026-11-13", end: null }, "2026-11-16", booked);
    expect(r.selection).toEqual({ start: "2026-11-16", end: null });
    expect(r.message).toBe(MSG.conflict);
  });
});
