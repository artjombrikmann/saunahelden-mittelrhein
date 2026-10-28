// Visuelle Kontrolle: node scripts/visual-check.mjs <baseUrl> <outPrefix>
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3838";
const out = process.argv[3] ?? ".shots/local";
const browser = await chromium.launch();
const external = new Set();
const errors = [];
async function page(w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  p.on("request", (r) => { const u = new URL(r.url()); if (!["localhost", new URL(base).hostname].includes(u.hostname) && !r.url().startsWith("data:")) external.add(r.url()); });
  p.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  p.on("pageerror", (e) => errors.push(String(e)));
  return p;
}
const d = await page(1360, 900);
await d.goto(base, { waitUntil: "networkidle" });
await d.screenshot({ path: `${out}-desktop.png`, fullPage: true });
await d.screenshot({ path: `${out}-hero.png` });
// Kalender per Maus: 5.11. (Do) bis 8.11. (So), dann Dialog
await d.getByRole("button", { name: /Do\., 5\. November 2026, frei/ }).click();
await d.getByRole("button", { name: /So\., 8\. November 2026, frei/ }).click();
await d.getByLabel("Lieferung zu dir").check();
await d.getByLabel(/Brennholz/).check();
await d.locator("#kalender").screenshot({ path: `${out}-kalender.png` });
await d.getByRole("button", { name: "Verbindlich anfragen" }).click();
await d.waitForSelector("dialog[open]");
await d.screenshot({ path: `${out}-dialog.png` });
// Dialog: leer absenden -> Validierungsfehler; dann ausfüllen -> Fehlerzustand (kein Key)
await d.getByRole("button", { name: "Anfrage senden" }).click();
await d.screenshot({ path: `${out}-dialog-fehler.png` });
await d.keyboard.press("Escape");
const m = await page(390, 844);
await m.goto(base, { waitUntil: "networkidle" });
await m.screenshot({ path: `${out}-mobile.png`, fullPage: true });
// Tastatur: Tag fokussieren, Enter
const k = await page(1360, 900);
await k.goto(base, { waitUntil: "networkidle" });
const day = k.getByRole("button", { name: /Mi\., 11\. November 2026, frei/ });
await day.focus(); await k.keyboard.press("Enter");
await k.keyboard.press("Enter");
const status = await k.locator('[role="status"]').textContent();
console.log("Tastatur-Status:", status);
console.log("Pressed:", await k.locator('button[aria-pressed="true"]').count());
// Belegter Tag im Zeitraum
await k.getByRole("button", { name: /Fr\., 13\. November 2026, frei/ }).click();
await k.getByRole("button", { name: /Mo\., 16\. November 2026, frei/ }).click();
console.log("Konflikt-Status:", await k.locator('[role="status"]').textContent());
console.log("Disabled belegt:", await k.getByRole("button", { name: /14\. November 2026, belegt/ }).isDisabled());
console.log("Externe Anfragen:", [...external]);
console.log("Konsolenfehler:", errors);
await browser.close();
