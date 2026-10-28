"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDay, iso, monthName } from "@/lib/dates";
import { dayPrice } from "@/lib/pricing";
import type { Selection } from "@/lib/selection";

const DOW = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
export const MAX_VIEW = 10; // zwei Monate sichtbar, maximal 12 Monate voraus

type Props = {
  baseYear: number;
  baseMonth: number;
  view: number;
  onView: (v: number) => void;
  minIso: string;
  booked: readonly string[];
  selection: Selection;
  onPick: (day: string) => void;
  status: string;
};

function Month({ y, m, minIso, booked, selection, onPick }: Pick<Props, "minIso" | "booked" | "selection" | "onPick"> & { y: number; m: number }) {
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const count = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(<span key={`p${i}`} className="pad" />);
  for (let d = 1; d <= count; d++) {
    const date = new Date(y, m, d);
    const s = iso(date);
    const isBooked = booked.includes(s);
    const isPast = s < minIso;
    const price = dayPrice(s);
    const edge = s === selection.start || s === selection.end;
    const inRange = !!selection.start && !!selection.end && s > selection.start && s < selection.end;
    let cls = "day";
    let label = formatDay(date);
    if (isBooked) { cls += " booked"; label += ", belegt"; }
    else if (isPast) { cls += " past"; label += ", nicht buchbar"; }
    else label += `, frei, ${price} Euro`;
    if (edge) cls += " edge"; else if (inRange) cls += " inr";
    cells.push(
      <button
        key={s}
        type="button"
        className={cls}
        disabled={isBooked || isPast}
        aria-label={label}
        aria-pressed={edge}
        onClick={() => onPick(s)}
      >
        {d}
        <small>{price}</small>
      </button>,
    );
  }
  return (
    <div className="month">
      <h3>{monthName(m)} {y}</h3>
      <div className="grid7">
        {DOW.map((x) => <div key={x} className="dow" aria-hidden="true">{x}</div>)}
        {cells}
      </div>
    </div>
  );
}

export function Calendar({ baseYear, baseMonth, view, onView, minIso, booked, selection, onPick, status }: Props) {
  const a = new Date(baseYear, baseMonth + view, 1);
  const b = new Date(baseYear, baseMonth + view + 1, 1);
  return (
    <div className="card">
      <div className="cal-nav">
        <button type="button" aria-label="Vorheriger Monat" disabled={view === 0} onClick={() => onView(view - 1)}>
          <ChevronLeft aria-hidden="true" size={22} />
        </button>
        <span>Vermietung ab November 2026</span>
        <button type="button" aria-label="Nächster Monat" disabled={view >= MAX_VIEW} onClick={() => onView(view + 1)}>
          <ChevronRight aria-hidden="true" size={22} />
        </button>
      </div>
      <div className="months">
        <Month y={a.getFullYear()} m={a.getMonth()} minIso={minIso} booked={booked} selection={selection} onPick={onPick} />
        <Month y={b.getFullYear()} m={b.getMonth()} minIso={minIso} booked={booked} selection={selection} onPick={onPick} />
      </div>
      <div className="legend" aria-hidden="true">
        <span><i style={{ background: "#101c2e" }} />Frei (Preis pro Tag in €)</span>
        <span><i style={{ background: "#030e20" }} />Belegt</span>
        <span><i style={{ background: "#D7261E", borderColor: "#D7261E" }} />Abholung / Rückgabe</span>
        <span><i style={{ background: "rgba(215,38,30,.3)" }} />Mietzeitraum</span>
      </div>
      <p className="helper" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
