// Erzeugt Logo-Varianten aus public/images/logo-original.png (1024x1024, weißer Hintergrund)
import sharp from "sharp";
const src = "public/images/logo-original.png";
const cx = 512, cy = 484, r = 452, d = 2 * r;
const box = { left: cx - r, top: cy - r, width: d, height: d };
const cropped = await sharp(src).extract(box).ensureAlpha().png().toBuffer();
const mask = Buffer.from(`<svg width="${d}" height="${d}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`);
const circle = await sharp(cropped).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
await sharp(circle).resize(512, 512).png({ compressionLevel: 9 }).toFile("public/images/logo-rund.png");
await sharp(circle).resize(512, 512).png().toFile("app/icon.png");
await sharp(cropped).resize(180, 180).flatten({ background: "#ffffff" }).png().toFile("app/apple-icon.png");
// Header-Emblem: Kreisausschnitt ohne Wortmarke (Flammen, Saunahelden, Fass)
const ex = 512, ey = 378, er = 284, ed = 2 * er;
const eb = await sharp(src).extract({ left: ex - er, top: ey - er, width: ed, height: ed }).ensureAlpha().png().toBuffer();
const em = Buffer.from(`<svg width="${ed}" height="${ed}"><circle cx="${er}" cy="${er}" r="${er}" fill="#fff"/></svg>`);
const emblem = await sharp(eb).composite([{ input: em, blend: "dest-in" }]).png().toBuffer();
await sharp(emblem).resize(160, 160).png({ compressionLevel: 9 }).toFile("public/images/logo-emblem.png");
await sharp(circle).resize(256, 256).png({ compressionLevel: 9 }).toFile("app/icon.png");
await sharp(circle).resize(256, 256).png({ compressionLevel: 9 }).toFile("public/images/logo-rund.png");
