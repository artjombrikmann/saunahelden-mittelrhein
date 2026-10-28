import { MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="sec" style={{ borderBottom: 0, paddingTop: 0 }} aria-labelledby="hc">
      <div className="wrap">
        <div className="cta-box">
          <div>
            <h2 id="hc">Deine Sauna-Auszeit ist nur eine Buchung entfernt.</h2>
            <p>Sichere dir deinen Wunschtermin am Mittelrhein.</p>
            <div className="contact">
              <a href={SITE.phoneHref}>
                <Phone className="ic" aria-hidden="true" />
                <span><small>Telefon / WhatsApp</small>{SITE.phone}</span>
              </a>
              <div>
                <MapPin className="ic" aria-hidden="true" />
                <span><small>Standort</small>{SITE.city}</span>
              </div>
            </div>
          </div>
          <ButtonLink href="/#kalender">Wunschtermin anfragen</ButtonLink>
        </div>
      </div>
    </section>
  );
}
