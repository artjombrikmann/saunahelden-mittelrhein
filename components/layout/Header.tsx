import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/#kalender", label: "Kalender & Preise" },
  { href: "/#ausstattung", label: "Ausstattung" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#anlaesse", label: "Anlässe" },
  { href: "/#faq", label: "Fragen" },
];

export function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/" aria-label={`${SITE.name}, Startseite`}>
          <span className="logo">
            <Image src="/images/logo-emblem.png" alt="Logo der Saunahelden Mittelrhein: drei Saunahelden hinter einer Fasssauna" width={160} height={160} priority />
          </span>
          <span>
            <b>{SITE.name}</b>
            <small>{SITE.tagline}</small>
          </span>
        </Link>
        <nav className="main" aria-label="Hauptnavigation">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <a className="tel" href={SITE.phoneHref}>
          <Phone className="ic" aria-hidden="true" />
          Kontakt
        </a>
        <Link className="btn" href="/#kalender">Jetzt buchen</Link>
      </div>
    </header>
  );
}
