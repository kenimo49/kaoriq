#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from '/home/iris/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  html, body { margin:0; padding:0; }
  body {
    width: 1200px;
    height: 630px;
    background: #1A1714;
    color: #E8E0D6;
    font-family: 'DM Sans', system-ui, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .grain { position:absolute; inset:0; background:
    radial-gradient(circle at 18% 24%, rgba(196,151,42,0.18), transparent 45%),
    radial-gradient(circle at 82% 78%, rgba(192,120,80,0.14), transparent 50%);
  }
  .frame { position:absolute; inset:36px; border:1px solid rgba(196,151,42,0.32); border-radius:18px; }
  .wrap {
    position: relative;
    width: 100%; height: 100%;
    display: flex; flex-direction: column; justify-content: center;
    padding: 100px 110px;
    box-sizing: border-box;
  }
  .brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 44px; font-weight: 600;
    letter-spacing: 0.04em;
    color: #E8E0D6;
    margin-bottom: 36px;
  }
  .brand .q { color: #C4972A; }
  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 92px;
    font-weight: 600;
    line-height: 1.05;
    margin: 0 0 28px;
    color: #E8E0D6;
    max-width: 920px;
  }
  h1 em { font-style: italic; color: #D4A96A; }
  .sub {
    font-size: 26px;
    color: #C4B8A8;
    line-height: 1.5;
    max-width: 820px;
    margin: 0;
  }
  .meta {
    position: absolute; bottom: 70px; left: 110px; right: 110px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 18px; color: #A89888; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .meta .url { color: #C4972A; }
  .badge {
    display:inline-block; padding: 4px 12px;
    border: 1px solid rgba(196,151,42,0.5); border-radius: 999px;
    font-size: 14px; letter-spacing: 0.18em; color: #C4972A;
    margin-bottom: 28px; text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="grain"></div>
  <div class="frame"></div>
  <div class="wrap">
    <div class="brand">Kaori<span class="q">Q</span></div>
    <span class="badge">Data-driven fragrance</span>
    <h1>Your <em>personality.</em><br/>Your scent.</h1>
    <p class="sub">Personality science meets a 59,000-fragrance database — recommendations with reasoning, not hype.</p>
    <div class="meta">
      <span>kaoriq.com</span>
      <span class="url">Big Five &times; Olfactive Data</span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
const buf = await page.screenshot({ type: 'png', omitBackground: false });
writeFileSync(join(ROOT, 'public', 'og-image.png'), buf);
await browser.close();
console.log('wrote public/og-image.png');
