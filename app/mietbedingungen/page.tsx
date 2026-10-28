import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Mietbedingungen", alternates: { canonical: "/mietbedingungen" } };

const TOPICS = ["Haftung", "Kaution", "Stornobedingungen", "Widerrufsfragen bei terminierter Freizeitleistung", "Voraussetzungen an Standplatz und Zugfahrzeug", "Übergabe, Rückgabe und Reinigung"];

export default function Mietbedingungen() {
  return (
    <LegalPage title="Mietbedingungen">
      <p>Die Mietbedingungen werden mit den Saunahelden festgelegt und anschließend rechtlich geprüft. Folgende Punkte werden hier geregelt:</p>
      <ul>
        {TOPICS.map((t) => <li key={t}>{t}: <strong>folgt</strong></li>)}
      </ul>
    </LegalPage>
  );
}
