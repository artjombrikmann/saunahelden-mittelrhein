import { describe, expect, it } from "vitest";
import { eachDay, fromIso, iso, isWeekend } from "./dates";

describe("dates", () => {
  it("iso/fromIso Roundtrip ohne Zeitzonenversatz", () => {
    expect(iso(fromIso("2026-11-01") as Date)).toBe("2026-11-01");
  });
  it("lehnt ungültige Tage ab", () => {
    expect(fromIso("2026-02-30")).toBeNull();
    expect(fromIso("abc")).toBeNull();
  });
  it("Wochenende Fr-So", () => {
    expect(isWeekend(fromIso("2026-11-06") as Date)).toBe(true);
    expect(isWeekend(fromIso("2026-11-05") as Date)).toBe(false);
  });
  it("eachDay über Monatsgrenze", () => {
    expect(eachDay("2026-11-29", "2026-12-02")).toEqual(["2026-11-29", "2026-11-30", "2026-12-01", "2026-12-02"]);
  });
});
