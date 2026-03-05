#!/usr/bin/env node
/**
 * Generate favicon set from PNG (or SVG fallback).
 * Place your bubble PNG at: public/favicon/source.png
 * Outputs to public/favicon/:
 *   favicon.ico, favicon-16x16.png, favicon-32x32.png,
 *   apple-touch-icon.png (180), android-chrome-192x192.png, android-chrome-512x512.png
 * All with ~10% padding, centered, transparent background.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const faviconDir = join(publicDir, "favicon");
const sourcePng = join(faviconDir, "source.png");
const sourceSvg = join(publicDir, "brand", "bubble-icon.svg");

const PADDING_RATIO = 0; // ללא padding - הסמל ממלא את כל הריבוע (נראה גדול בטאב)

const sizes = [
  { name: "favicon-16x16.png", w: 16, h: 16 },
  { name: "favicon-32x32.png", w: 32, h: 32 },
  { name: "favicon-48x48.png", w: 48, h: 48 },
  { name: "favicon-64x64.png", w: 64, h: 64 },
  { name: "apple-touch-icon.png", w: 180, h: 180 },
  { name: "android-chrome-192x192.png", w: 192, h: 192 },
  { name: "android-chrome-512x512.png", w: 512, h: 512 },
];

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch (e) {
    console.error("Missing dependency. Run: npm install sharp to-ico --save-dev");
    process.exit(1);
  }

  mkdirSync(faviconDir, { recursive: true });

  let input;
  if (existsSync(sourcePng)) {
    input = sharp(readFileSync(sourcePng));
    console.log("Using source: public/favicon/source.png");
  } else if (existsSync(sourceSvg)) {
    input = sharp(readFileSync(sourceSvg));
    console.log("Using fallback: public/brand/bubble-icon.svg");
  } else {
    console.error("No source image found. Place your PNG at: public/favicon/source.png");
    process.exit(1);
  }

  const pngBuffers = { 16: null, 32: null, 48: null };

  for (const { name, w, h } of sizes) {
    if (name.startsWith("android-chrome") || name.startsWith("apple-touch") || name === "favicon-64x64.png") {
      const padding = Math.round(Math.min(w, h) * PADDING_RATIO);
      const iconW = Math.max(1, w - 2 * padding);
      const iconH = Math.max(1, h - 2 * padding);
      const buf = await input
        .clone()
        .resize(iconW, iconH)
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();
      const outPath = join(faviconDir, name);
      writeFileSync(outPath, buf);
      console.log("Written: favicon/" + name);
      continue;
    }
    const padding = Math.round(Math.min(w, h) * PADDING_RATIO);
    const iconW = Math.max(1, w - 2 * padding);
    const iconH = Math.max(1, h - 2 * padding);

    const buf = await input
      .clone()
      .resize(iconW, iconH)
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const outPath = join(faviconDir, name);
    writeFileSync(outPath, buf);
    console.log("Written: favicon/" + name);

    if (name === "favicon-16x16.png") pngBuffers[16] = buf;
    if (name === "favicon-32x32.png") pngBuffers[32] = buf;
    if (name === "favicon-48x48.png") pngBuffers[48] = buf;
  }

  try {
    const toIco = (await import("to-ico")).default;
    const icoBuf = await toIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]].filter(Boolean));
    writeFileSync(join(faviconDir, "favicon.ico"), icoBuf);
    console.log("Written: favicon/favicon.ico");
  } catch (e) {
    console.warn("favicon.ico skipped:", e.message);
  }

  console.log("Done. Favicons are in public/favicon/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
