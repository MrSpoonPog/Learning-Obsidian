// Render an SVG file to PNG using the Chrome that puppeteer already installed.
// Usage: node svg2png.mjs <input.svg> <output.png> [scale]
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import puppeteer from "puppeteer";

const [input, output, scaleArg] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node svg2png.mjs <input.svg> <output.png> [scale]");
  process.exit(1);
}
const scale = Number(scaleArg) || 2;

const svg = await readFile(resolve(input), "utf8");
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: scale });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;background:#fff;display:inline-block">${svg}</body></html>`,
    { waitUntil: "load" }
  );
  const el = await page.$("svg");
  if (!el) throw new Error("No <svg> element found in input.");
  await el.screenshot({ path: resolve(output), omitBackground: false });
  console.log(resolve(output));
} finally {
  await browser.close();
}
