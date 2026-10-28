import { Stamp } from "@/components/ui/Stamp";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="sec legal" style={{ borderBottom: 0 }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Stamp>Platzhalter: vor Live-Gang von einer Rechtsperson prüfen lassen</Stamp>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}
