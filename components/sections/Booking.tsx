"use client";

import { useState } from "react";
import { Star, Sun, Truck } from "lucide-react";
import { Calendar } from "@/components/booking/Calendar";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { RequestDialog } from "@/components/booking/RequestDialog";
import { Stamp } from "@/components/ui/Stamp";
import { eur, PRICING, type DeliveryMode, type ExtraId } from "@/lib/pricing";
import { MSG, pickDay, type Selection } from "@/lib/selection";

type Props = { bookedDates: string[]; minIso: string; baseYear: number; baseMonth: number };

export function Booking({ bookedDates, minIso, baseYear, baseMonth }: Props) {
  const [selection, setSelection] = useState<Selection>({ start: null, end: null });
  const [status, setStatus] = useState<string>(MSG.initial);
  const [view, setView] = useState(0);
  const [mode, setMode] = useState<DeliveryMode>("pickup");
  const [extraIds, setExtraIds] = useState<ExtraId[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  function onPick(day: string) {
    const r = pickDay(selection, day, bookedDates);
    setSelection(r.selection);
    setStatus(r.message);
  }

  function toggleExtra(id: ExtraId) {
    setExtraIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  return (
    <section className="sec alt" id="kalender" aria-labelledby="hk">
      <div className="wrap">
        <div className="head-c">
          <Stamp>Pitch-Entwurf: Preise, Extras und belegte Tage sind Platzhalter</Stamp>
          <h2 id="hk" style={{ marginTop: 14 }}>Zeitraum wählen und anfragen</h2>
          <p>Tippe zuerst auf den Tag der Abholung, dann auf den Tag der Rückgabe. Der Preis wird sofort berechnet. Die Anfrage ist unverbindlich, wir bestätigen sie persönlich.</p>
        </div>
        <div className="kal">
          <Calendar
            baseYear={baseYear}
            baseMonth={baseMonth}
            view={view}
            onView={setView}
            minIso={minIso}
            booked={bookedDates}
            selection={selection}
            onPick={onPick}
            status={status}
          />
          <BookingSummary
            selection={selection}
            mode={mode}
            onMode={setMode}
            extraIds={extraIds}
            onToggleExtra={toggleExtra}
            onRequest={() => setDialogOpen(true)}
          />
        </div>
        <div className="tiles">
          <div><Sun className="ic" aria-hidden="true" /><p><b>Mo bis Do</b><span>{eur(PRICING.weekdayPerDay)} pro Tag</span></p></div>
          <div><Star className="ic" aria-hidden="true" /><p><b>Fr bis So</b><span>{eur(PRICING.weekendPerDay)} pro Tag</span></p></div>
          <div><Truck className="ic" aria-hidden="true" /><p><b>Lieferung</b><span>ab {eur(PRICING.deliveryFlat)}, Zonen folgen</span></p></div>
        </div>
      </div>
      {selection.start && selection.end && (
        <RequestDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          start={selection.start}
          end={selection.end}
          mode={mode}
          extraIds={extraIds}
        />
      )}
    </section>
  );
}
