import { Briefcase, Building2, Home, Mountain, PartyPopper, Trophy } from "lucide-react";

const ITEMS = [
  { Icon: Home, title: "Garten und Zuhause", text: "Wellness vor der eigenen Haustür, ohne Anfahrt und ohne Wartezeit." },
  { Icon: Building2, title: "Ferienwohnungen und Hotels", text: "Ein besonderes Extra für Gäste, ohne eigene Saunaanlage." },
  { Icon: Briefcase, title: "Firmen und Teams", text: "Teamevent oder Weihnachtsfeier einmal anders." },
  { Icon: Trophy, title: "Vereine und Sport", text: "Nach Training oder Turnier gemeinsam entspannen." },
  { Icon: Mountain, title: "Wandern und Natur", text: "Nach der Tour am Rhein die Muskeln aufwärmen." },
  { Icon: PartyPopper, title: "Feiern und Events", text: "Geburtstag, Junggesellenabschied oder Gartenfest." },
];

export function Occasions() {
  return (
    <section className="sec" id="anlaesse" aria-labelledby="hn">
      <div className="wrap">
        <div className="head-c">
          <h2 id="hn">Deine Auszeit, dein Ort</h2>
          <p>Eine mobile Sauna, viele Möglichkeiten. Wo würdest du deine Auszeit verbringen?</p>
        </div>
        <div className="anl">
          {ITEMS.map(({ Icon, title, text }) => (
            <article key={title}>
              <Icon className="ic" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
