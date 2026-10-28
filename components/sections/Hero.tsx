import { CalendarDays, MapPin, Truck, Caravan } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Image from "next/image";

const USPS = [
  { Icon: Caravan, title: "Fasssauna", text: "auf dem Anhänger" },
  { Icon: MapPin, title: "Abholung", text: "in Boppard" },
  { Icon: Truck, title: "Lieferung", text: "an deinen Ort" },
  { Icon: CalendarDays, title: "Anfrage", text: "online im Kalender" },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="h1">
      <div className="wrap grid">
        <div>
          <span className="pill"><i />Vermietungsstart im November · Boppard</span>
          <h1 id="h1">
            Mobile Fasssauna mieten.<span className="r">Wellness, wo du willst.</span>
          </h1>
          <p className="lead">
            Garten, Ferienwohnung, Vereinsheim oder Firmenfeier: Die Saunahelden bringen die Fasssauna dorthin, wo du sie brauchst. Abholung in Boppard oder Lieferung am Mittelrhein.
          </p>
          <div className="usp">
            {USPS.map(({ Icon, title, text }) => (
              <div key={title}>
                <Icon className="ic" aria-hidden="true" />
                <b>{title}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="cta">
            <ButtonLink href="/#kalender">Freie Termine ansehen</ButtonLink>
            <ButtonLink href="/#ablauf" variant="line">So funktioniert&apos;s</ButtonLink>
          </div>
        </div>
        <div className="scene">
          <Image
            src="/images/sauna-am-rhein.webp"
            alt="Fasssauna mit beleuchtetem Innenraum am Rheinufer bei Dämmerung, im Hintergrund die Hügel des Mittelrheintals"
            width={564}
            height={564}
            priority
            sizes="(max-width: 960px) 100vw, 480px"
          />
          <div className="tag">
            <div><small>Standort Mittelrhein</small><b>Boppard und Umgebung</b></div>
            <div className="pr">ab 89 €<em>pro Tag, Beispielpreis</em></div>
          </div>
        </div>
      </div>
    </section>
  );
}
