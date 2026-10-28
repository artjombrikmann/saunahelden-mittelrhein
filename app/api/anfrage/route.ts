import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getBookedDates } from "@/lib/availability";
import { bookingSchema } from "@/lib/booking-schema";
import { eachDay, formatIso } from "@/lib/dates";
import { calcQuote, eur } from "@/lib/pricing";
import { earliestBookable, latestBookable } from "@/lib/window";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) }, { status: 400 });
  }
  const v = parsed.data;

  // Honeypot: still 200, nichts senden.
  if (v.website && v.website.trim() !== "") return NextResponse.json({ ok: true });

  const days = eachDay(v.start, v.end);
  if (days.length === 0 || v.start < earliestBookable() || v.end > latestBookable()) {
    return NextResponse.json({ error: "invalid_range" }, { status: 400 });
  }

  const booked = await getBookedDates();
  if (days.some((d) => booked.includes(d))) {
    return NextResponse.json({ error: "dates_unavailable" }, { status: 409 });
  }

  // Preis serverseitig neu berechnen, dem Client wird nie vertraut.
  const quote = calcQuote({ start: v.start, end: v.end, mode: v.mode, extraIds: v.extraIds });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });

  const text = [
    "Neue Mietanfrage über die Website",
    "",
    `Zeitraum: ${formatIso(v.start)} bis ${formatIso(v.end)} (${quote.days} Miettag${quote.days === 1 ? "" : "e"})`,
    `Übergabe: ${v.mode === "delivery" ? `Lieferung an ${v.address}` : "Abholung in Boppard"}`,
    `Extras: ${v.extraIds.length ? v.extraIds.join(", ") : "keine"}`,
    "",
    ...quote.lines.map((l) => `  ${l.label}: ${eur(l.amount)}`),
    `Richtpreis: ${eur(quote.total)}`,
    "",
    `Name: ${v.name}`,
    `E-Mail: ${v.email}`,
    `Telefon: ${v.phone || "-"}`,
    `Personen: ${v.persons}`,
    `Anlass: ${v.occasion}`,
    `Nachricht: ${v.message || "-"}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.MAIL_FROM || "onboarding@resend.dev",
      to: process.env.MAIL_TO || "saunahelden-mr@outlook.de",
      replyTo: v.email,
      subject: `Mietanfrage ${formatIso(v.start)} bis ${formatIso(v.end)}`,
      text,
    });
    if (error) {
      console.error("anfrage: mail_send_failed", error.name); // keine personenbezogenen Daten loggen
      return NextResponse.json({ error: "mail_failed" }, { status: 502 });
    }
  } catch {
    console.error("anfrage: mail_send_exception");
    return NextResponse.json({ error: "mail_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
