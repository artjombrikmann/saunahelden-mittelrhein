# Offene Punkte vor dem Live-Gang

## Vom Kunden zu liefern
- [ ] Echte Preise, Tarife, Extras, Lieferzonen und Lieferpreise (aktuell Platzhalter in `lib/pricing.ts`)
- [ ] Technische Daten der Sauna (Ofentyp, Personenzahl, Maße, Gewicht, Strombedarf), Anforderungen an Standplatz und Zugfahrzeug (Bereich "folgt" auf der Seite)
- [ ] Echte Fotos und Videos (Hero-Szene `HeroScene` ist eine SVG-Illustration)
- [ ] Logo mit transparentem Hintergrund (Original ist ein 1024×1024-PNG auf weißem Grund, Varianten per `scripts/make-logo.mjs`)
- [ ] FAQ-Antworten (aktuell Platzhalter)
- [ ] Verfügbarkeitspflege: wer trägt belegte Tage ein (aktuell statische Beispielliste in `lib/availability.ts`)

## Technik und Betrieb
- [ ] `RESEND_API_KEY` setzen, sonst zeigt das Formular den Fallback (503 `mail_not_configured`)
- [ ] `MAIL_FROM` mit verifizierter Absenderdomain bei Resend (zum Testen `onboarding@resend.dev`, sendet dann nur an die eigene Resend-Adresse)
- [ ] Domain verbinden, `NEXT_PUBLIC_SITE_URL` anpassen, `NEXT_PUBLIC_INDEXING=true` erst beim Live-Gang
- [ ] Rate-Limiting für `/api/anfrage` (Vercel-Schutzfunktionen oder Upstash)
- [ ] CSP mit Nonce per Middleware ergänzen und testen (aktuell nur `frame-ancestors`)
- [ ] Optional Phase 5: Supabase, Admin-Ansicht, Ortsseiten, Instagram-Einbettung nach Klick

## Rechtliches
- [ ] Gewerbeanmeldung und Rechtsform für das Impressum, USt-ID oder Kleinunternehmer-Hinweis
- [ ] Impressum, Datenschutzerklärung und Mietbedingungen von einer Rechtsperson prüfen lassen (Haftung, Kaution, Storno, Widerruf)
- [ ] Speicherdauer der Anfragen in der Datenschutzerklärung festlegen
- [ ] Echte Bewertungen erst nach Start sammeln und mit Einwilligung veröffentlichen

## Getroffene Annahmen
- Projekt liegt direkt im Repo-Root (`C:\SSV-Entwicklung\saunahelden`), nicht im Unterordner `saunahelden-mittelrhein`.
- Next.js 16 (aktuelle Version von create-next-app). Die vom Template gesetzten `cacheComponents`/`partialPrefetching` sind entfernt, die Startseite wird dynamisch gerendert, weil der Kalender das heutige Datum braucht.
- Buchbares Fenster: ab 01.11.2026 oder heute (Zeitzone Europe/Berlin), 12 Monate voraus; die API prüft das ebenfalls.
- Maximal 30 Personen im Formular (technisches Limit gegen Fehleingaben, keine Aussage zur Saunakapazität).
- Keine Bestätigungsmail an Kunden (optional laut CLAUDE.md), nur Mail an `MAIL_TO`.
- Instagram: nur Link zum Profil, keine Einbettung.
- Header-Logo: kreisförmiger Ausschnitt des Emblems ohne Wortmarke; Name steht als Text daneben.
- Hinweis zur Aussage "Anfrage ist unverbindlich" (Mockup-Copy) vs. Button "Verbindlich anfragen" (CLAUDE.md): beides aus der Vorlage übernommen, bitte mit dem Kunden und der Rechtsprüfung klären.
