import { z } from "zod";
import { EXTRA_IDS } from "./pricing";

export const OCCASIONS = [
  "Zuhause / Garten",
  "Ferienwohnung / Hotel",
  "Firma / Team",
  "Verein / Sport",
  "Feier / Event",
  "Sonstiges",
] as const;

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ungültiges Datum");

export const bookingSchema = z
  .object({
    start: isoDay,
    end: isoDay,
    mode: z.enum(["pickup", "delivery"]),
    extraIds: z.array(z.enum(EXTRA_IDS)).max(EXTRA_IDS.length),
    name: z.string().trim().min(2, "Bitte gib deinen Namen an.").max(100),
    email: z.string().trim().email("Bitte gib eine gültige E-Mail-Adresse an.").max(200),
    phone: z.string().trim().max(40).optional(),
    persons: z
      .number({ error: "Bitte gib die Personenzahl an." })
      .int("Bitte gib eine ganze Zahl an.")
      .min(1, "Mindestens 1 Person.")
      .max(30, "Maximal 30 Personen."),
    address: z.string().trim().max(300).optional(),
    occasion: z.enum(OCCASIONS),
    message: z.string().trim().max(2000).optional(),
    consent: z.boolean().refine((v) => v === true, "Bitte stimme der Datenverarbeitung zu."),
    website: z.string().max(200).optional(), // Honeypot
  })
  .superRefine((v, ctx) => {
    if (v.end < v.start) ctx.addIssue({ code: "custom", path: ["end"], message: "Rückgabe liegt vor der Abholung." });
    if (v.mode === "delivery" && !v.address?.trim()) {
      ctx.addIssue({ code: "custom", path: ["address"], message: "Bitte gib die Lieferadresse an." });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;
