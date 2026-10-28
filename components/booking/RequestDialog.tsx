"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, OCCASIONS, type BookingInput } from "@/lib/booking-schema";
import { formatIso } from "@/lib/dates";
import { calcQuote, eur, type DeliveryMode, type ExtraId } from "@/lib/pricing";
import { SITE } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
  start: string;
  end: string;
  mode: DeliveryMode;
  extraIds: ExtraId[];
};

type Phase = "form" | "loading" | "success" | "error";
type ErrorKind = "conflict" | "mail" | "invalid" | "other";

const ERROR_TEXT: Record<ErrorKind, string> = {
  conflict: "Im gewählten Zeitraum ist inzwischen ein Tag belegt. Bitte wähle einen anderen Zeitraum.",
  mail: "Die Anfrage konnte gerade nicht per E-Mail versendet werden.",
  invalid: "Einige Angaben wurden vom Server nicht akzeptiert. Bitte prüfe das Formular.",
  other: "Beim Senden ist etwas schiefgelaufen.",
};

export function RequestDialog({ open, onClose, start, end, mode, extraIds }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("form");
  const [errorKind, setErrorKind] = useState<ErrorKind>("other");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema) });

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      setPhase("form");
      reset({
        start, end, mode, extraIds,
        name: "", email: "", phone: "", persons: 4, address: "",
        occasion: OCCASIONS[0], message: "", consent: false, website: "",
      });
      dlg.showModal();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open, start, end, mode, extraIds, reset]);

  const quote = calcQuote({ start, end, mode, extraIds });

  async function onSubmit(values: BookingInput) {
    setPhase("loading");
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, start, end, mode, extraIds }),
      });
      if (res.ok) return setPhase("success");
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setErrorKind(res.status === 409 ? "conflict" : body.error === "mail_not_configured" ? "mail" : res.status === 400 ? "invalid" : "other");
      setPhase("error");
    } catch {
      setErrorKind("other");
      setPhase("error");
    }
  }

  const fieldErr = (name: keyof BookingInput) =>
    errors[name]?.message ? <span className="err" role="alert">{String(errors[name]?.message)}</span> : null;

  return (
    <dialog ref={ref} aria-labelledby="dt" onClose={onClose}>
      {phase === "success" ? (
        <div className="dlg ok">
          <h2 id="dt">Anfrage gesendet</h2>
          <p style={{ margin: "10px auto 0" }}>Danke! Wir prüfen den Termin und melden uns persönlich bei dir.</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn" onClick={onClose}>Schließen</button>
          </div>
        </div>
      ) : (
        <div className="dlg">
          <h2 id="dt">Anfrage senden</h2>
          <p className="recap">
            {formatIso(start)} bis {formatIso(end)} · {quote.days} {quote.days === 1 ? "Miettag" : "Miettage"} ·{" "}
            {mode === "delivery" ? "Lieferung" : "Abholung in Boppard"} · Richtpreis {eur(quote.total)}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="f2">
              <div className="f">
                <label htmlFor="fn">Name</label>
                <input id="fn" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
                {fieldErr("name")}
              </div>
              <div className="f">
                <label htmlFor="fm">E-Mail</label>
                <input id="fm" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
                {fieldErr("email")}
              </div>
            </div>
            <div className="f2">
              <div className="f">
                <label htmlFor="ft">Telefon (optional)</label>
                <input id="ft" type="tel" autoComplete="tel" {...register("phone")} />
              </div>
              <div className="f">
                <label htmlFor="fp">Personen</label>
                <input id="fp" type="number" min={1} max={30} aria-invalid={!!errors.persons} {...register("persons", { valueAsNumber: true })} />
                {fieldErr("persons")}
              </div>
            </div>
            {mode === "delivery" && (
              <div className="f">
                <label htmlFor="fa">Lieferadresse</label>
                <input id="fa" autoComplete="street-address" aria-invalid={!!errors.address} {...register("address")} />
                {fieldErr("address")}
              </div>
            )}
            <div className="f">
              <label htmlFor="fo">Anlass</label>
              <select id="fo" {...register("occasion")}>
                {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="f">
              <label htmlFor="fx">Nachricht (optional)</label>
              <textarea id="fx" rows={3} {...register("message")} />
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="fw">Website</label>
              <input id="fw" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>
            <label className="chk">
              <input type="checkbox" aria-invalid={!!errors.consent} {...register("consent")} />
              <span>Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Mehr dazu in der <a href="/datenschutz" target="_blank">Datenschutzerklärung</a>.</span>
            </label>
            {errors.consent?.message && <p className="err" role="alert" style={{ color: "#ffb4a9", fontSize: ".85rem", fontWeight: 600 }}>{errors.consent.message}</p>}
            {phase === "error" && (
              <p className="alert" role="alert">
                {ERROR_TEXT[errorKind]} Bitte ruf uns an unter <a href={SITE.phoneHref}>{SITE.phone}</a> oder schreib per{" "}
                <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
              </p>
            )}
            <div className="row">
              <button type="button" className="btn line" onClick={onClose}>Abbrechen</button>
              <button type="submit" className="btn" disabled={phase === "loading"}>
                {phase === "loading" ? "Wird gesendet …" : "Anfrage senden"}
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
}
