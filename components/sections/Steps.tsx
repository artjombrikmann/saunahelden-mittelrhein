const STEPS = [
  { title: "Termin wählen", text: "Freien Zeitraum im Kalender antippen, Preis sehen." },
  { title: "Anfrage senden", text: "Kontaktdaten angeben. Wir melden uns und bestätigen persönlich." },
  { title: "Abholen oder liefern lassen", text: "Du holst die Sauna in Boppard ab oder wir bringen sie zu dir." },
  { title: "Anheizen und genießen", text: "Einweisung, dann Auszeit. Danach Rückgabe oder Abholung durch uns." },
];

export function Steps() {
  return (
    <section className="sec alt" id="ablauf" aria-labelledby="ha">
      <div className="wrap">
        <div className="head-c"><h2 id="ha">In vier Schritten zur Sauna-Auszeit</h2></div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
