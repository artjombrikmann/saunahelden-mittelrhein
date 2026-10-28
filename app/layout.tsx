import type { Metadata, Viewport } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

const description =
  "Mobile Fasssauna mieten am Mittelrhein: Termin im Kalender wählen, Preis sehen, verbindlich anfragen. Abholung in Boppard oder Lieferung zu dir.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Fasssauna mieten Boppard & Mittelrhein | Saunahelden",
    template: "%s | Saunahelden Mittelrhein",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mobile Fasssauna mieten am Mittelrhein | Saunahelden Mittelrhein",
    description: "Wellness, wo du willst. Freie Termine im Kalender prüfen und die mobile Fasssauna anfragen.",
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Fasssauna mieten am Mittelrhein | Saunahelden Mittelrhein",
    description: "Wellness, wo du willst. Freie Termine im Kalender prüfen und die mobile Fasssauna anfragen.",
  },
  robots: SITE.indexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#16263F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a className="skip" href="#main">Zum Inhalt springen</a>
        <JsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
