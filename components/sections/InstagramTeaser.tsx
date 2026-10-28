import { SITE } from "@/lib/site";

// Kein Feed und keine Einbettung vor Klick: nur ein normaler Link zum Profil.
// Eine Einbettung nach Klick folgt in Phase 5.
export function InstagramTeaser() {
  return (
    <section className="sec alt" aria-labelledby="hi">
      <div className="wrap">
        <div className="insta">
          <div>
            <h2 id="hi" style={{ fontSize: "1.9rem" }}>Die Saunahelden auf Instagram</h2>
            <p>Start-Countdown, Neuigkeiten und Eindrücke. Mit dem Klick verlässt du diese Seite, dann gelten die Datenschutzbestimmungen von Instagram (Meta).</p>
          </div>
          <a className="btn line" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>
        </div>
      </div>
    </section>
  );
}
