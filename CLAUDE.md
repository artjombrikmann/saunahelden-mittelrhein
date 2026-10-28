# CLAUDE.md – Saunahelden Mittelrhein (Website mit Buchungskalender)

Diese Datei liegt im Projekt-Root und ist die verbindliche Arbeitsgrundlage für Claude Code.
Design-Referenz (statischer Mockup, offline lauffähig): `docs/design/saunahelden-mockup-v2.html`

**Arbeitsweise:** Phasen (Abschnitt 13) nacheinander umsetzen. Nach jeder Phase: Qualitätskette (Abschnitt 14) laufen lassen, kurz berichten (geänderte Dateien, was umgesetzt wurde, wie testen) und auf Freigabe warten. Keine Umbauten außerhalb der aktuellen Phase.

---

## 1. Kontext

- **Kunde:** Saunahelden Mittelrhein, mobile Fasssauna zur Miete, Standort Boppard (Rheinland-Pfalz), Instagram `@saunaheldenmittelrhein`.
- **Status:** Pitch-Projekt. Vermietungsstart laut Instagram im November 2026, Gewerbeanmeldung und Anhänger noch offen.
- **Zweck:** Gefunden werden (SEO: "Fasssauna mieten", "mobile Sauna mieten", Boppard/Mittelrhein) und Termine über einen **Kalender mit Sofort-Richtpreis** anfragen lassen.
- **Zielgruppen:** Privatleute (Garten, Geburtstag, Paar-Auszeit), Ferienwohnungen und Hotels, Firmen und Teams, Vereine und Sport, Wandergruppen, Feiern und Events.
- **Kontakt (aus den Instagram-Posts):** +49 163 9010 603 (auch WhatsApp), saunahelden-mr@outlook.de.
- **Sprache der Seite:** nur Deutsch (Start).
- **Buchungsmodell:** Miete **pro Tag** (nicht pro Nacht). Erst-Tipp = Abholung, Zweit-Tipp = Rückgabe, gleicher Tag zweimal = 1 Miettag. Die Anfrage ist eine **Anfrage mit Bestätigung durch die Saunahelden**, keine automatische Buchung.

## 2. Harte Regeln (nicht verhandelbar)

1. **Keine erfundenen Daten.** Keine Bewertungen, Sterne, Gästezahlen, technischen Daten (Ofenmodell, kW, Maße, Gewicht), Reaktionszeiten, Zonen oder Preise, die der Kunde nicht geliefert hat. Unbekanntes wird als sichtbarer Platzhalter ("folgt") geführt und in `docs/OFFENE-PUNKTE.md` gelistet. Erfundene Kundenbewertungen sind zusätzlich wettbewerbsrechtlich riskant.
2. **Kein Tailwind-CDN, kein direktes Einbinden von Google Fonts, keine Inline-Event-Handler** (`onclick=...`). Schriften kommen über `@fontsource/*` (selbst gehostet).
3. **DSGVO by Design:** kein Tracking, keine Cookies ohne Notwendigkeit, keine Drittanbieter-Einbettung vor Klick (Instagram-Feed, Karten). Karten nur mit Leaflet/OpenStreetMap oder Google Maps hinter Zustimmung.
4. **Secrets nur in Umgebungsvariablen**, nie im Frontend oder im Repo.
5. **Preise und Verfügbarkeit werden serverseitig neu berechnet bzw. geprüft.** Dem Client-Gesamtpreis wird nie vertraut.
6. TypeScript strict, kein `any`. Nur ändern, was die Phase verlangt.
7. Copy aus dem Template/Mockup nicht verändern, ohne Rückfrage (siehe Abschnitt 12).

## 3. Design-Vorgaben

Dunkles Design in Anlehnung an das Branding (Rhein-Nacht, Burg, Holz-Fass, Feuerrot). Details und Verhalten stehen im Mockup, die Tokens hier:

```css
/* app/globals.css (Tailwind v4: @theme, v3: tailwind.config.ts theme.extend.colors) */
--bg:#071425;  --surface-low:#101c2e;  --surface:#142032;  --surface-high:#1f2a3d;  --surface-lowest:#030e20;
--deep:#16263F;  --border:rgba(255,255,255,.15);
--fire:#D7261E;  --fire-dark:#B01C16;  --fire-light:#FF8A50;  --gold:#FDBA53;
--cream:#FFF8F0;  --text:#D7E3FC;  --muted:#A9B8CE;
```

- **Schriften:** Anton (Headlines, Großbuchstaben, `letter-spacing:.02em`) und Work Sans 400/600/700 (Fließtext). Maximal diese zwei Familien.
- **Signatur-Elemente:** roter Zeilenakzent in der H1, Burg-Silhouette über dem Rhein im Hero, Flammen-Symbol im Logo.
- **Radien:** Buttons 10px, Karten 18px, Eingaben 8px. Abstände konsistent (8er-Raster).
- **Kontrast:** `muted` (#A9B8CE) für Nebentext. Das Template-Grau `#566173` auf dunklem Grund ist zu schwach und wird nicht verwendet.
- **Icons:** `lucide-react` (keine Emojis, keine Material-Symbols-Webfont).
- **Motion:** nur zurückhaltend, `prefers-reduced-motion` respektieren.
- **Hero-Bild:** bis echte Fotos vorliegen, die SVG-Szene aus dem Mockup als Komponente `HeroScene` übernehmen. Danach durch `next/image` mit echtem Foto ersetzen (WebP/AVIF, Alt-Text).

## 4. Tech-Stack

```
Next.js (aktuelle stabile Version, App Router) + TypeScript (strict)
Tailwind CSS (Version, die create-next-app installiert)
lucide-react
react-hook-form + zod + @hookform/resolvers
resend (Mailversand)
@fontsource/anton, @fontsource/work-sans
Vercel (Hosting) + GitHub (Versionierung)
```

Optional in Phase 5: Supabase (Postgres) für Verfügbarkeiten/Anfragen.

Projekt anlegen (PowerShell):

```powershell
npx create-next-app@latest saunahelden-mittelrhein --ts --tailwind --eslint --app --import-alias "@/*"
cd saunahelden-mittelrhein
npm i lucide-react react-hook-form zod @hookform/resolvers resend @fontsource/anton @fontsource/work-sans
```

Schriften in `app/layout.tsx` importieren:

```ts
import "@fontsource/anton/400.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
```

## 5. Projektstruktur

```
app/
  layout.tsx            Metadaten-Basis, lang="de", Fonts, Header/Footer
  page.tsx              Startseite (Sektionen)
  api/anfrage/route.ts  POST: Validierung, Preis- und Verfügbarkeitsprüfung, Mailversand
  impressum/page.tsx
  datenschutz/page.tsx
  mietbedingungen/page.tsx
  sitemap.ts  robots.ts  icon.png  apple-icon.png  opengraph-image.tsx
components/
  layout/   Header.tsx  Footer.tsx
  sections/ Hero.tsx  Booking.tsx  Features.tsx  Steps.tsx  Occasions.tsx  InstagramTeaser.tsx  Faq.tsx  CtaBand.tsx
  booking/  Calendar.tsx  BookingSummary.tsx  RequestDialog.tsx
  ui/       Button.tsx  Stamp.tsx  Icon-Wrapper
lib/
  pricing.ts        Preise, Extras, Lieferung (Konfiguration + calcQuote())
  availability.ts   getBookedDates() – Phase 1: statische Liste, Phase 5: Supabase
  booking-schema.ts zod-Schema (Client und Server)
  dates.ts          iso(), fromIso(), isWeekend(), eachDay() – nur lokale Tage, kein toISOString()
  site.ts           Name, Telefon, Mail, URL, Instagram (eine Quelle der Wahrheit)
public/images/      Logo, echte Fotos
docs/design/        saunahelden-mockup-v2.html (Referenz)
docs/OFFENE-PUNKTE.md
```

## 6. Seiten und Sektionen (Reihenfolge der Startseite)

1. **Header** (sticky): Logo, Navigation (Kalender und Preise, Ausstattung, Ablauf, Anlässe, Fragen), Telefon, Button "Jetzt buchen". Anker immer als `/#abschnitt` und mit `next/link`, damit sie auch von Unterseiten funktionieren.
2. **Hero:** H1 "Mobile Fasssauna mieten. Wellness, wo du willst.", Hinweis "Vermietungsstart im November", vier USP-Kacheln (Fasssauna auf dem Anhänger, Abholung in Boppard, Lieferung, Anfrage online), zwei Buttons, Szene mit Standort-Badge.
3. **Kalender und Preise** (`#kalender`): Kern der Seite, Spezifikation in Abschnitt 7.
4. **Ausstattung** (`#ausstattung`): Bento mit vier Kacheln (Ofen und Aufheizen, Platz für die Gruppe, Anhänger und Transport, Extras). Alle technischen Werte bleiben "folgt", bis der Kunde liefert.
5. **Ablauf** (`#ablauf`): vier nummerierte Schritte.
6. **Anlässe** (`#anlaesse`): Garten und Zuhause, Ferienwohnungen und Hotels, Firmen und Teams, Vereine und Sport, Wandern und Natur, Feiern und Events.
7. **Instagram-Teaser:** Link zum Profil. Einbettung nur nach Klick (Hinweis auf Datenübertragung an Meta).
8. **FAQ** (`#faq`): `<details>`-Akkordeon, Antworten vorerst Platzhalter.
9. **CTA-Band** und **Footer** (Impressum, Datenschutz, Mietbedingungen).

**Keine Bewertungssektion**, solange es keine echten, freigegebenen Bewertungen gibt.

## 7. Kalender – Spezifikation

**Daten:** Verfügbarkeit als Liste belegter Tage `string[]` im Format `YYYY-MM-DD` (lokale Tage). `Booking` bekommt sie als Prop vom Server (`getBookedDates()`), damit später Supabase ohne UI-Änderung möglich ist.

**Darstellung:** zwei Monate nebeneinander (mobil untereinander), Pfeile zum Blättern, Start frühestens 01.11.2026 oder heute (der spätere Termin), maximal 12 Monate voraus. Wochenbeginn Montag. Pro Tag steht der Tagespreis klein im Feld.

**Zustände:** frei, belegt (durchgestrichen, `disabled`), nicht buchbar (Vergangenheit, `disabled`), Start/Ende (Feuerrot), dazwischen (rote Tönung), Hover und Fokus sichtbar.

**Auswahl-Logik:**
- Kein Start oder Start und Ende bereits gewählt: Tipp setzt neuen Start, Ende leeren.
- Tipp vor dem Start: neuer Start.
- Tipp auf gleichen Tag oder späteren Tag: Ende setzen (gleicher Tag = 1 Miettag).
- Liegt ein belegter Tag im Zeitraum: Zeitraum verwerfen, neuer Start, Hinweis im `role="status"`-Bereich.

**Seitenfeld "Deine Anfrage":** gewählter Zeitraum, Anzahl Miettage, Übergabe (Abholung Boppard oder Lieferung), Extras (Checkboxen), Preiszeilen und **Richtpreis**, Button "Verbindlich anfragen" (deaktiviert ohne Zeitraum, mit sichtbarem Hinweistext). Hinweis: Betrag ist Richtpreis, verbindlich mit Bestätigung.

**Barrierefreiheit:** jeder Tag ist ein `<button>` mit `aria-label` (z. B. "Fr., 6. November 2026, frei, 109 Euro"), Start/Ende mit `aria-pressed`, Statusmeldungen per `aria-live="polite"`, vollständig per Tastatur bedienbar, sichtbare Fokusrahmen.

## 8. Preislogik (`lib/pricing.ts`)

Alle Werte sind **Platzhalter aus dem Pitch** und müssen vom Kunden bestätigt werden:

```ts
export const PRICING = {
  weekdayPerDay: 89,   // Mo-Do
  weekendPerDay: 109,  // Fr-So
  deliveryFlat: 39,    // Lieferung ab, Zonen folgen
  extras: [
    { id: "holz", label: "Brennholz-Paket", price: 15 },
    { id: "aufguss", label: "Aufguss-Set", price: 8 },
    { id: "handtuch", label: "Handtuchpaket", price: 12 },
    { id: "reinigung", label: "Endreinigung durch uns", price: 25 },
  ],
} as const;
```

`calcQuote({ start, end, mode, extraIds })` liefert Zeilen und Summe. Dieselbe Funktion läuft im Client (Anzeige) und im API-Route-Handler (verbindliche Prüfung). Tests (Vitest oder einfache Skriptprüfung) für: 1 Miettag, Wochenende (Fr-So = 3 Tage), Zeitraum über Monatsgrenze, Lieferung, Extras.

## 9. Anfrage-Formular und API

**Dialog** (`<dialog>` oder shadcn/Radix Dialog, Fokus-Falle, ESC schließt): Name, E-Mail, Telefon (optional), Personenzahl, Lieferadresse (nur bei Lieferung, dann Pflicht), Anlass (Auswahl), Nachricht (optional), Einwilligung zur Datenverarbeitung (Pflicht), Honeypot-Feld (unsichtbar). Zustände: Laden, Erfolg, Fehler (verständlich, mit Hinweis auf Telefon/WhatsApp).

**Validierung:** ein zod-Schema in `lib/booking-schema.ts`, gleich im Client (react-hook-form) und im Server verwendet.

**`POST /api/anfrage`:**
1. Body mit zod parsen, bei Fehler `400`.
2. Honeypot gefüllt: still `200` zurückgeben, nichts senden.
3. `getBookedDates()` prüfen: überschneidet sich der Zeitraum mit belegten Tagen, `409`.
4. Preis mit `calcQuote()` neu berechnen.
5. Mail über Resend an `MAIL_TO` (Zusammenfassung: Zeitraum, Übergabe, Extras, Richtpreis, Kontaktdaten). Optional Bestätigungsmail an den Kunden.
6. **Ohne `RESEND_API_KEY`:** sauberer Fehlerzustand (`503` mit `{ error: "mail_not_configured" }`), UI zeigt Fallback "Bitte ruf uns an oder schreib per WhatsApp". Kein Absturz. Im README als offener Punkt vermerken.
7. Keine personenbezogenen Daten ins Log schreiben.

**Umgebungsvariablen** (`.env.local`, in Vercel unter Settings → Environment Variables):

```
RESEND_API_KEY=
MAIL_TO=saunahelden-mr@outlook.de
MAIL_FROM=            # verifizierte Absenderdomain bei Resend, zum Testen onboarding@resend.dev
NEXT_PUBLIC_SITE_URL= # z. B. https://saunahelden-xyz.vercel.app, später die echte Domain
NEXT_PUBLIC_INDEXING= # "true" erst beim Live-Gang
```

`.env.local` ist in `.gitignore`. Zusätzlich `.env.example` mit leeren Werten ins Repo.

## 10. SEO

**Ziel-Keywords:** Fasssauna mieten, mobile Sauna mieten, Sauna mieten Boppard, Fasssauna Mittelrhein. Suchvolumen vor der Textarbeit im Keyword-Tool prüfen, keine Zahlen erfinden.

- **Title (Startseite):** `Fasssauna mieten Boppard & Mittelrhein | Saunahelden`
- **Description:** `Mobile Fasssauna mieten am Mittelrhein: Termin im Kalender wählen, Preis sehen, verbindlich anfragen. Abholung in Boppard oder Lieferung zu dir.`
- **H1:** "Mobile Fasssauna mieten. Wellness, wo du willst." Danach saubere H2/H3-Hierarchie, genau eine H1.
- **Metadata API:** `metadata` im Layout und pro Seite, Open Graph, Twitter Card, `canonical` aus `NEXT_PUBLIC_SITE_URL`, `opengraph-image.tsx`.
- **Strukturierte Daten:** `LocalBusiness` als JSON-LD (Name, Telefon, Mail, Ort Boppard, `areaServed`, `sameAs` Instagram), eingebunden über eine Komponente mit `<script type="application/ld+json">`. `AggregateRating`/`Review` **nur** mit echten, belegbaren Bewertungen.
- **`sitemap.ts`** und **`robots.ts`:** `robots` blockiert alles (`disallow: "/"`), solange `NEXT_PUBLIC_INDEXING !== "true"`. So wird der Pitch auf `*.vercel.app` nicht indexiert. Beim Live-Gang Variable auf `true` setzen.
- **Bilder:** `next/image`, WebP/AVIF, sprechende Dateinamen, Alt-Texte. Layout-Verschiebungen vermeiden (feste Größen/`aspect-ratio`).
- **FAQ** als echter, sichtbarer Text (Long-Tail: Strom, Platzbedarf, Lieferung, Storno). Das FAQ-Schema bringt kaum noch Rich Results, der Text selbst ist wichtig.
- **Phase 5 (Ortsseiten):** `/fasssauna-mieten/[ort]` nur für **vom Kunden bestätigte** Liefergebiete, jeweils mit eigenem Text (Anfahrt, Lieferpreis, passende Anlässe). Keine Massenseiten mit ausgetauschtem Ortsnamen.
- **Außerhalb des Codes:** Google-Unternehmensprofil anlegen (Service-Gebiet, Fotos), Instagram-Link zur Seite in der Bio.

## 11. Sicherheit und Datenschutz

- Serverseitige Validierung (zod), kein `dangerouslySetInnerHTML` mit Nutzereingaben.
- Security-Header in `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, `Permissions-Policy`). CSP über Middleware mit Nonce nach dem Basisbuild ergänzen und gründlich testen.
- Rate-Limiting für `/api/anfrage`: In-Memory-Limit reicht für den Pitch nur eingeschränkt (Serverless). Für Live Vercel-Schutzfunktionen oder Upstash prüfen.
- Datensparsamkeit: nur Felder abfragen, die für die Anfrage nötig sind.
- Datenschutzerklärung nennt: Resend (Mailversand), Vercel (Hosting), ggf. Instagram-Einbettung nach Klick.

## 12. Inhalte: was aus dem Template übernommen wird und was nicht

**Übernommen:** Farbwelt, Anton/Work Sans, Header-Aufbau, Hero-Struktur mit USP-Kacheln, Bento-Layout, vierstufiger Ablauf, Anlass-Karten, FAQ-Akkordeon, CTA-Band, Footer-Gliederung.

**Bewusst nicht übernommen (nicht belegt oder nicht vom Kunden):**
- Bewertungen, "4.9 / 5.0", "über 120 Saunagäste" und die drei Kundenzitate
- Harvia-Ofen M3, 16,5 kW, Zeder/Espe, Maße, Aufheizzeit, Powerstation, Bluetooth-Speaker
- Anhängergewicht, Führerschein-Aussagen (B/BE/B96), Stellflächen-Maße
- "100 % echtes Holzfeuer", "Kein Strom nötig", "Antwort binnen 2 Stunden"
- Lieferzonen 1 bis 3 und deren Preise, Wochenend-Paket 279 €, "Paket"-Preise
- Das reine Datumsfeld-Formular: ersetzt durch den Kalender

Alles davon kann später mit echten Angaben des Kunden eingebaut werden.

## 13. Umsetzungsphasen

**Phase 0 – Setup:** Projekt anlegen (Abschnitt 4), Struktur (Abschnitt 5), Tokens und Fonts, `lib/site.ts`, Header und Footer, `.env.example`, `docs/OFFENE-PUNKTE.md`, Mockup nach `docs/design/` kopieren.
*Abnahme:* `npm run build` grün, Header/Footer responsiv, Fonts lokal geladen (Netzwerk-Tab: keine Anfragen an Google).

**Phase 1 – Statische Startseite:** Hero (mit `HeroScene`), Ausstattung, Ablauf, Anlässe, Instagram-Teaser, FAQ, CTA-Band nach Mockup.
*Abnahme:* optisch wie Mockup, Mobile/Tablet/Desktop sauber, ein H1, alle Anker funktionieren auch von Unterseiten.

**Phase 2 – Kalender, Preis, Anfrage:** `dates.ts`, `pricing.ts`, `availability.ts` (statische Beispielliste), `booking-schema.ts`, Komponenten `Calendar`, `BookingSummary`, `RequestDialog`, API-Route, Mailversand mit Fehlerfall.
*Abnahme:* Auswahl-Logik aus Abschnitt 7 vollständig, Richtpreis stimmt mit `calcQuote()` überein, belegter Tag im Zeitraum wird abgefangen, Dialog mit Lade-/Erfolg-/Fehlerzustand, ohne `RESEND_API_KEY` kommt ein sauberer Fehler, Tastaturbedienung komplett.

**Phase 3 – SEO und Rechtliches:** Metadata, JSON-LD, `sitemap.ts`, `robots.ts` (Indexierungsschalter), `opengraph-image`, Favicon aus dem Logo, Seiten Impressum, Datenschutz, Mietbedingungen (Platzhalter mit klarer Kennzeichnung, Prüfung durch Rechtsperson nötig).
*Abnahme:* Rich-Results-Test für LocalBusiness ohne Fehler, Lighthouse (Mobile) für Performance, Accessibility, SEO jeweils im grünen Bereich.

**Phase 4 – QA und Deployment:** Abschnitt 14 und 15.
*Abnahme:* Vercel-Preview-Link läuft, Kernrouten antworten, Kunde kann die Seite ansehen.

**Phase 5 – Optional nach Freigabe:** Supabase für Verfügbarkeit (Tabelle `blocked_dates` mit `day date primary key`, `note text`; später `booking_requests`), kleine Admin-Ansicht zum Sperren/Freigeben von Tagen, Ortsseiten, echte Bewertungen, Instagram-Einbettung nach Klick, Gutscheine.

**Startprompt für Claude Code:**
> Lies `CLAUDE.md` und `docs/design/saunahelden-mockup-v2.html`. Setze Phase 0 um. Halte dich an die harten Regeln. Berichte danach kurz: geänderte Dateien, was umgesetzt wurde, wie ich es teste. Warte auf meine Freigabe für Phase 1.

## 14. Qualitätskette vor jeder Auslieferung

```powershell
npx tsc --noEmit
npx eslint .
npm run build
npm run start -- -p 3838    # Rauchtest: /, /impressum, /datenschutz, /mietbedingungen, /sitemap.xml, /robots.txt
```

Checkliste: responsiv (Mobile/Tablet/Desktop), alle Buttons, Links und das Formular funktionieren inkl. Lade-/Erfolg-/Fehlerzustand, Tastaturbedienung und sichtbarer Fokus, SEO-Metadaten vorhanden, `prefers-reduced-motion` berücksichtigt, keine Konsolenfehler, keine Anfragen an Google Fonts oder andere Drittanbieter.

## 15. Git und Deployment (GitHub, Vercel)

**Einmalig (PowerShell im Projektordner):**

```powershell
git init
git config user.email "DEINE-ECHTE-GITHUB-EMAIL"    # muss zum GitHub-Account passen
git config user.name  "dein-github-benutzername"
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<benutzername>/saunahelden-mittelrhein.git
git push -u origin main
```

Danach pro Änderung: `git add -A`, `git commit -m "Kurze Beschreibung"`, `git push`.

**Vercel:**
1. Auf vercel.com mit dem GitHub-Account anmelden.
2. "Add New..." → "Project" → Repository `saunahelden-mittelrhein` wählen → "Deploy". Next.js wird automatisch erkannt.
3. Unter Settings → Environment Variables die Werte aus Abschnitt 9 eintragen (`RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM`, `NEXT_PUBLIC_SITE_URL`). `NEXT_PUBLIC_INDEXING` zunächst leer lassen. Danach neu deployen, damit die Variablen greifen.
4. Jeder `git push` auf `main` deployt automatisch, der Preview-Link bleibt gleich. Diesen Link dem Kunden schicken.
5. **Live-Gang:** Domain unter Settings → Domains verbinden, die von Vercel angezeigten DNS-Einträge beim Registrar (z. B. GoDaddy) setzen, `NEXT_PUBLIC_SITE_URL` auf die echte Domain ändern, `NEXT_PUBLIC_INDEXING=true` setzen. Bei Resend die Absenderdomain verifizieren (DNS-Einträge) und `MAIL_FROM` anpassen.

## 16. Typische Stolpersteine

| Problem | Lösung |
|---|---|
| Vercel: "Deployment Blocked" wegen Commit-Autor-E-Mail | `git config user.email` auf die echte GitHub-E-Mail setzen, dann `git commit --allow-empty -m "Fix"` und `git push` |
| Build-Fehler bleibt trotz korrektem Code | Prüfen, ob mehrere `next dev`-Prozesse laufen ("Another next dev server is already running"). Alten Prozess beenden (`taskkill /PID <nr> /F`) und neu starten |
| Fonts laden nicht im Build | Nur `@fontsource/*` verwenden, kein `next/font/google` |
| Header-Links funktionieren nur auf der Startseite | Anker als `/#abschnitt` und `next/link` verwenden |
| Zeitzonen-Fehler im Kalender (Tag verschoben) | Nie `toISOString()` für Kalendertage nutzen, nur lokale Datumsteile (`lib/dates.ts`) |
| Änderungen aus dem Chat per Copy-Paste werfen Parse-Fehler | Dateien als Download statt als Text übernehmen. Typografische Anführungszeichen/Backticks sind die Ursache |
| Updates ans Kundenprojekt | Nur geänderte Dateien liefern, nie das ganze Projekt drüberkopieren. ZIPs ohne `.git` packen. Vor dem Push immer lokal `npm run build` |

## 17. Offene Punkte vor dem Live-Gang (auch in `docs/OFFENE-PUNKTE.md` führen)

- Echte Preise, Tarife, Extras, Lieferzonen und Lieferpreise vom Kunden
- Technische Daten der Sauna (Ofentyp, Personenzahl, Maße, Gewicht, Strombedarf), Anforderungen an Standplatz und Zugfahrzeug
- Logo als Datei (transparenter Hintergrund, auch für dunklen Grund geeignet), echte Fotos und Videos
- Domain, Mailadresse und Resend-Absenderdomain
- Gewerbeanmeldung und Rechtsform für das Impressum, ggf. Umsatzsteuer-ID oder Kleinunternehmer-Hinweis (Preisangaben entsprechend)
- Impressum, Datenschutzerklärung und Mietbedingungen (inkl. Haftung, Kaution, Storno, Widerrufsfragen bei terminierter Freizeitleistung) von einer Rechtsperson prüfen lassen
- Verfügbarkeitspflege: wer trägt belegte Tage ein, und wie (statische Liste, Supabase, Admin-Ansicht)
- Echte Bewertungen erst nach Start sammeln und mit Einwilligung veröffentlichen
