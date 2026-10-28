import { SITE } from "@/lib/site";

// Nur belegbare Angaben. Kein AggregateRating/Review ohne echte Bewertungen.
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: "Vermietung einer mobilen Fasssauna in Boppard und am Mittelrhein, Abholung oder Lieferung.",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "DE",
    },
    areaServed: ["Boppard", "Mittelrhein"],
    sameAs: [SITE.instagramUrl],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
