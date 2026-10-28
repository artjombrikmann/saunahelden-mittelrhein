import { Flame, Heart, Truck, Users } from "lucide-react";
import { Stamp } from "@/components/ui/Stamp";
import { PRICING } from "@/lib/pricing";

const price = (id: string) => PRICING.extras.find((e) => e.id === id)?.price;

export function Features() {
  return (
    <section className="sec" id="ausstattung" aria-labelledby="hu">
      <div className="wrap">
        <div className="head-c">
          <Stamp>Technische Daten folgen vom Kunden</Stamp>
          <h2 id="hu" style={{ marginTop: 14 }}>Die Fasssauna im Überblick</h2>
          <p>Hier stehen später die echten Daten und Fotos der Sauna. Die Kacheln sind für Ofen, Platz, Transport und Extras vorbereitet.</p>
        </div>
        <div className="bento">
          <article className="w2">
            <div>
              <div className="ico"><Flame className="ic" aria-hidden="true" /></div>
              <h3>Ofen und Aufheizen</h3>
              <p>Ofentyp, Leistung und Aufheizzeit. Je nach Ofen entfällt der Stromanschluss oder er wird zur Voraussetzung. Das klären wir mit dem Kunden.</p>
            </div>
            <div className="specs">
              <div><span>Ofentyp</span><b>folgt</b></div>
              <div><span>Aufheizzeit</span><b>folgt</b></div>
              <div><span>Temperatur</span><b>folgt</b></div>
            </div>
          </article>
          <article>
            <div>
              <div className="ico g"><Users className="ic" aria-hidden="true" /></div>
              <h3>Platz für deine Gruppe</h3>
              <p>Personenzahl, Sitz- und Liegeplätze.</p>
            </div>
            <div className="specs two"><div><span>Personen</span><b>folgt</b></div><div><span>Maße</span><b>folgt</b></div></div>
          </article>
          <article>
            <div>
              <div className="ico g"><Truck className="ic" aria-hidden="true" /></div>
              <h3>Anhänger und Transport</h3>
              <p>Voraussetzungen für die Selbstabholung (Zugfahrzeug, Führerschein) und für den Standplatz.</p>
            </div>
            <div className="specs two"><div><span>Gewicht</span><b>folgt</b></div><div><span>Stellfläche</span><b>folgt</b></div></div>
          </article>
          <article className="w2">
            <div>
              <div className="ico"><Heart className="ic" aria-hidden="true" /></div>
              <h3>Extras zum Dazubuchen</h3>
              <p>Brennholz, Aufguss-Set, Handtücher und Endreinigung. Die Auswahl und Preise sind im Kalender bereits eingebaut und werden vom Kunden angepasst.</p>
            </div>
            <div className="specs">
              <div><span>Brennholz</span><b>{price("holz")} €</b></div>
              <div><span>Aufguss-Set</span><b>{price("aufguss")} €</b></div>
              <div><span>Endreinigung</span><b>{price("reinigung")} €</b></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
