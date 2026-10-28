const FAQS = [
  { q: "Wie viele Personen passen in die Fasssauna?", a: "Hier steht die tatsächliche Personenzahl der Sauna." },
  { q: "Brauche ich Strom oder Wasser vor Ort?", a: "Das hängt vom Ofen ab. Die Angabe folgt vom Kunden." },
  { q: "Wie viel Platz und welchen Untergrund braucht die Sauna?", a: "Hier stehen Stellfläche, Zufahrt und Untergrund." },
  { q: "Was kostet die Lieferung?", a: "Die Lieferung wird nach Entfernung berechnet. Die Zonen folgen." },
  { q: "Kann ich stornieren?", a: "Die Stornobedingungen werden mit dem Kunden festgelegt und auf einer eigenen Seite veröffentlicht." },
];

export function Faq() {
  return (
    <section className="sec" id="faq" aria-labelledby="hf">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div className="head-c">
          <h2 id="hf">Häufige Fragen</h2>
          <p>Alle Antworten sind Platzhalter und werden mit dem Kunden abgestimmt.</p>
        </div>
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
