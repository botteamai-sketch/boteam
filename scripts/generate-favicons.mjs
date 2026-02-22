#!/usr/bin/env node
/**
 * Generate favicon set from /public/brand/bubble-icon.svg
 * Outputs: favicon.ico, favicon-16.png, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const svgPath = join(publicDir, "brand", "bubble-icon.svg");

const sizes = [
  { name: "favicon-16.png", w: 16, h: 16 },
  { name: "favicon-32.png", w: 32, h: 32 },
  { name: "apple-touch-icon.png", w: 180, h: 180 },
  { name: "icon-192.png", w: 192, h: 192 },
  { name: "icon-512.png", w: 512, h: 512 },
];

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch (e) {
    console.error("Missing dependency. Run: npm install sharp to-ico --save-dev");
    process.exit(1);
  }

  const svg = readFileSync(svgPath);
  const pngBuffers = { 16: null, 32: null };

  for (const { name, w, h } of sizes) {
    const outPath = join(publicDir, name);
    const buf = await sharp(svg)
      .resize(w, h)
      .png()
      .toBuffer();
    writeFileSync(outPath, buf);
    console.log("Written:", name);
    if (w === 16) pngBuffers[16] = buf;
    if (w === 32) pngBuffers[32] = buf;
  }

  try {
    const toIco = (await import("to-ico")).default;
    const icoBuf = await toIco([pngBuffers[16], pngBuffers[32]].filter(Boolean));
    writeFileSync(join(publicDir, "favicon.ico"), icoBuf);
    console.log("Written: favicon.ico");
  } catch (e) {
    console.warn("favicon.ico skipped:", e.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
