import { eachDay } from "./dates";

export type Selection = { start: string | null; end: string | null };
export type PickResult = { selection: Selection; message: string };

export const MSG = {
  initial: "Wähle den ersten Tag. Ein zweiter Tipp auf denselben Tag ergibt eine Miete für einen Tag.",
  pickEnd: "Jetzt den Tag der Rückgabe wählen.",
  done: "Zeitraum gewählt. Ändere ihn mit einem neuen Tipp oder frage jetzt an.",
  conflict: "Im Zeitraum liegt ein belegter Tag. Bitte wähle einen anderen Zeitraum.",
} as const;

/** Auswahl-Logik aus CLAUDE.md Abschnitt 7. Tage als YYYY-MM-DD (Vergleich lexikografisch). */
export function pickDay(sel: Selection, day: string, booked: readonly string[]): PickResult {
  const { start, end } = sel;
  if (!start || end || day < start) {
    return { selection: { start: day, end: null }, message: MSG.pickEnd };
  }
  if (eachDay(start, day).some((d) => booked.includes(d))) {
    return { selection: { start: day, end: null }, message: MSG.conflict };
  }
  return { selection: { start, end: day }, message: MSG.done };
}
