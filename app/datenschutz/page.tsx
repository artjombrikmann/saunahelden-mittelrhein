import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz", alternates: { canonical: "/datenschutz" } };

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>Verantwortlicher</h2>
      <p>{SITE.name}, {SITE.city}. Kontakt: {SITE.email}. Vollständige Anbieterangaben: siehe Impressum (folgt).</p>
      <h2>Hosting</h2>
      <p>Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden technisch notwendige Server-Logdaten (z. B. IP-Adresse, Zeitpunkt) verarbeitet. Schriften werden lokal von unserem Server ausgeliefert, es werden keine Schriften von Google geladen.</p>
      <h2>Cookies und Tracking</h2>
      <p>Wir setzen keine Cookies zu Analyse- oder Werbezwecken ein und verwenden kein Tracking.</p>
      <h2>Mietanfrage</h2>
      <p>Wenn du eine Anfrage sendest, verarbeiten wir Name, E-Mail, optional Telefonnummer, Personenzahl, ggf. Lieferadresse, Anlass, Nachricht und den gewünschten Zeitraum, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b und a DSGVO). Der Versand der Anfrage erfolgt per E-Mail über den Dienstleister Resend. Speicherdauer: <strong>folgt</strong>.</p>
      <h2>Instagram</h2>
      <p>Wir verlinken unser Instagram-Profil. Erst mit deinem Klick verlässt du diese Seite, dann gilt die Datenschutzerklärung von Instagram (Meta). Es werden keine Inhalte von Instagram vorab eingebunden.</p>
      <h2>Deine Rechte</h2>
      <p>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit sowie Beschwerde bei einer Aufsichtsbehörde. Wende dich dazu an {SITE.email}.</p>
    </LegalPage>
  );
}
