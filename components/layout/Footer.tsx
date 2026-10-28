import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <h3>{SITE.name}</h3>
          <p>Mobile Fasssauna zur Miete. Standort Boppard, Abholung oder Lieferung.</p>
        </div>
        <div>
          <h3>Kontakt</h3>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a>
        </div>
        <div>
          <h3>Rechtliches</h3>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/mietbedingungen">Mietbedingungen</Link>
        </div>
        <p className="copy">Pitch-Entwurf, alle Inhalte vorläufig. Kontaktdaten stammen aus den Instagram-Beiträgen.</p>
      </div>
    </footer>
  );
}
