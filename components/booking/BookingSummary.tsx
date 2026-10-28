"use client";

import { formatIso } from "@/lib/dates";
import { calcQuote, eur, PRICING, type DeliveryMode, type ExtraId } from "@/lib/pricing";
import type { Selection } from "@/lib/selection";

type Props = {
  selection: Selection;
  mode: DeliveryMode;
  onMode: (m: DeliveryMode) => void;
  extraIds: ExtraId[];
  onToggleExtra: (id: ExtraId) => void;
  onRequest: () => void;
};

export function BookingSummary({ selection, mode, onMode, extraIds, onToggleExtra, onRequest }: Props) {
  const { start, end } = selection;
  const ready = !!start && !!end;
  const quote = ready ? calcQuote({ start, end, mode, extraIds }) : null;
  return (
    <aside className="card sum" aria-labelledby="hs">
      <h3 id="hs" style={{ marginBottom: 12 }}>Deine Anfrage</h3>
      <p className="range">
        {ready ? `${formatIso(start)} bis ${formatIso(end)}` : start ? `${formatIso(start)} bis …` : "Noch kein Zeitraum gewählt"}
      </p>
      <p className="muted">
        {quote
          ? `${quote.days} ${quote.days === 1 ? "Miettag" : "Miettage"}`
          : start ? "Wähle jetzt den Tag der Rückgabe." : "Wähle Abholung und Rückgabe im Kalender."}
      </p>
      <fieldset>
        <legend>Übergabe</legend>
        <label className="opt">
          <input type="radio" name="mode" value="pickup" checked={mode === "pickup"} onChange={() => onMode("pickup")} />
          Abholung in Boppard <span className="p">0 €</span>
        </label>
        <label className="opt">
          <input type="radio" name="mode" value="delivery" checked={mode === "delivery"} onChange={() => onMode("delivery")} />
          Lieferung zu dir <span className="p">ab {eur(PRICING.deliveryFlat)}</span>
        </label>
      </fieldset>
      <fieldset>
        <legend>Extras</legend>
        {PRICING.extras.map((e) => (
          <label key={e.id} className="opt">
            <input type="checkbox" checked={extraIds.includes(e.id)} onChange={() => onToggleExtra(e.id)} />
            {e.label} <span className="p">{eur(e.price)}</span>
          </label>
        ))}
      </fieldset>
      <div className="lines" aria-live="polite">
        {quote?.lines.map((l) => (
          <div key={l.label}><span>{l.label}</span><span>{eur(l.amount)}</span></div>
        ))}
        <div className="tot"><span>Richtpreis</span><span>{eur(quote?.total ?? 0)}</span></div>
      </div>
      <button className="btn" type="button" disabled={!ready} onClick={onRequest} aria-describedby="reqHint">
        Verbindlich anfragen
      </button>
      {!ready && <p className="hint" id="reqHint">Wähle zuerst einen Zeitraum im Kalender.</p>}
      <p className="hint">Der Betrag ist ein Richtpreis. Verbindlich wird er mit unserer Bestätigung.</p>
    </aside>
  );
}
