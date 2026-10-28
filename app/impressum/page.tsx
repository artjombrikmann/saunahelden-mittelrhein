import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>{SITE.name}</p>
      <p>Inhaber, Rechtsform und ladungsfähige Anschrift in {SITE.city}: <strong>folgt</strong> (Gewerbeanmeldung noch offen).</p>
      <h2>Kontakt</h2>
      <p>Telefon / WhatsApp: {SITE.phone}</p>
      <p>E-Mail: {SITE.email}</p>
      <h2>Umsatzsteuer</h2>
      <p>Umsatzsteuer-ID bzw. Kleinunternehmer-Hinweis: <strong>folgt</strong>.</p>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>Name und Anschrift: <strong>folgt</strong>.</p>
    </LegalPage>
  );
}
