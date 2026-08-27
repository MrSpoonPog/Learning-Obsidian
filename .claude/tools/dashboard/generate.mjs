#!/usr/bin/env node
// Generates the self-contained "Frontier" dashboard HTML from knowledge/*.md + knowledge/_activity.jsonl.
// Usage: node generate.mjs --out <path> [--now YYYY-MM-DD]

import { readdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..", "..");
const KNOWLEDGE_DIR = join(ROOT, "knowledge");
const ACTIVITY_LOG = join(KNOWLEDGE_DIR, "_activity.jsonl");

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : fallback;
}

const OUT = arg("out");
if (!OUT) {
  console.error("Usage: node generate.mjs --out <path> [--now YYYY-MM-DD]");
  process.exit(1);
}
const NOW = arg("now") ? new Date(arg("now") + "T00:00:00") : new Date();
const todayStr = NOW.toISOString().slice(0, 10);

// ---------- parse knowledge/*.md ----------

function parseTopic(filePath) {
  const raw = readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/);

  const titleLine = lines.find((l) => l.startsWith("# "));
  const title = titleLine ? titleLine.replace(/^#\s*/, "").trim() : filePath;

  const goalLine = lines.find((l) => /^Goal:/.test(l.trim()));
  const goal = goalLine ? goalLine.trim().replace(/^Goal:\s*/, "") : "";

  const horizonMatch = raw.match(/Retention horizon:\s*\*\*(.*?)\*\*/);
  const horizon = horizonMatch ? horizonMatch[1] : "";

  // Section slicer: from a "## Heading" line to the next "## " line (or EOF)
  function section(heading) {
    const startIdx = lines.findIndex((l) => l.trim().toLowerCase() === `## ${heading}`.toLowerCase());
    if (startIdx === -1) return [];
    const rest = lines.slice(startIdx + 1);
    const endIdx = rest.findIndex((l) => /^##\s/.test(l));
    return endIdx === -1 ? rest : rest.slice(0, endIdx);
  }

  // Review queue: any "- **YYYY-MM-DD**" line anywhere in the file
  const dueDates = [...raw.matchAll(/-\s*\*\*(\d{4}-\d{2}-\d{2})\*\*/g)].map((m) => m[1]).sort();

  // Node status section: count node ids per status marker
  const statusLines = section("node status");
  const counts = { solid: 0, landed: 0, frontier: 0, misconception: 0 };
  const statusMap = { "[x]": "solid", "[~]": "landed", "[ ]": "frontier", "[!]": "misconception" };
  for (const line of statusLines) {
    const m = line.match(/^-\s*(\[[x~ !]\])\s+([^—-]+?)\s*[—-]/);
    if (!m) continue;
    const key = statusMap[m[1]];
    if (!key) continue;
    const ids = m[2].split(",").map((s) => s.trim()).filter(Boolean);
    counts[key] += ids.length || 1;
  }

  const misconceptionLog = section("misconceptions log").filter((l) => l.trim().startsWith("- ["));

  const total = counts.solid + counts.landed + counts.frontier + counts.misconception;

  const upcoming = dueDates.filter((d) => d >= todayStr);
  const overdue = dueDates.filter((d) => d < todayStr);
  const nextDue = upcoming[0] || null;
  const daysUntil = nextDue
    ? Math.round((new Date(nextDue) - new Date(todayStr)) / 86400000)
    : null;

  return {
    slug: filePath.split(/[/\\]/).pop().replace(/\.md$/, ""),
    title,
    goal,
    horizon,
    counts,
    total,
    misconceptionLogCount: misconceptionLog.length,
    dueDates,
    nextDue,
    daysUntil,
    overdueCount: overdue.length,
  };
}

let topics = [];
if (existsSync(KNOWLEDGE_DIR)) {
  const files = readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  topics = files.map((f) => parseTopic(join(KNOWLEDGE_DIR, f)));
}
topics.sort((a, b) => {
  const da = a.daysUntil === null ? Infinity : a.daysUntil;
  const db = b.daysUntil === null ? Infinity : b.daysUntil;
  return da - db;
});

// ---------- parse activity log ----------

let activity = [];
if (existsSync(ACTIVITY_LOG)) {
  activity = readFileSync(ACTIVITY_LOG, "utf-8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

const byDate = new Map();
for (const a of activity) {
  byDate.set(a.date, (byDate.get(a.date) || 0) + (a.interactions || 1));
}

// Build a 53-week x 7-day grid ending on the most recent Saturday >= today
function buildHeatmapGrid() {
  const end = new Date(todayStr + "T00:00:00");
  const endDow = end.getDay(); // 0=Sun..6=Sat
  const gridEnd = new Date(end);
  gridEnd.setDate(end.getDate() + (6 - endDow)); // extend to Saturday
  const gridStart = new Date(gridEnd);
  gridStart.setDate(gridEnd.getDate() - 53 * 7 + 1);

  const weeks = [];
  let cursor = new Date(gridStart);
  for (let w = 0; w < 53; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const dstr = cursor.toISOString().slice(0, 10);
      days.push({
        date: dstr,
        count: byDate.get(dstr) || 0,
        future: dstr > todayStr,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(days);
  }
  return weeks;
}

const weeks = buildHeatmapGrid();

const totalInteractions = [...byDate.values()].reduce((a, b) => a + b, 0);
const activeDays = byDate.size;

function computeStreaks() {
  const days = [...byDate.keys()].sort();
  if (days.length === 0) return { current: 0, longest: 0 };
  const daySet = new Set(days);
  let longest = 0;
  let run = 0;
  let prev = null;
  for (const d of days) {
    if (prev) {
      const diff = (new Date(d) - new Date(prev)) / 86400000;
      run = diff === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    prev = d;
  }
  // current streak: walk back from today (or yesterday if today has no activity yet)
  let current = 0;
  let cursor = new Date(todayStr);
  if (!daySet.has(todayStr)) cursor.setDate(cursor.getDate() - 1);
  while (daySet.has(cursor.toISOString().slice(0, 10))) {
    current++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return { current, longest };
}
const streaks = computeStreaks();

// ---------- render ----------

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function statusPill(label, count, cls) {
  if (count === 0) return "";
  return `<span class="pill pill-${cls}"><span class="pill-dot"></span>${count} ${esc(label)}</span>`;
}

function dueChip(topic) {
  if (topic.overdueCount > 0) {
    return `<span class="chip chip-critical">Overdue ×${topic.overdueCount}</span>`;
  }
  if (topic.nextDue === null) {
    return `<span class="chip chip-muted">No review scheduled</span>`;
  }
  if (topic.daysUntil === 0) return `<span class="chip chip-warning">Due today</span>`;
  if (topic.daysUntil === 1) return `<span class="chip chip-warning">Due tomorrow</span>`;
  return `<span class="chip chip-muted">Due in ${topic.daysUntil}d · ${esc(topic.nextDue)}</span>`;
}

function topicCard(t) {
  const pct = t.total ? Math.round((t.counts.solid / t.total) * 100) : 0;
  return `
  <article class="card">
    <div class="card-head">
      <h3>${esc(t.title)}</h3>
      ${dueChip(t)}
    </div>
    ${t.goal ? `<p class="card-goal">${esc(t.goal)}</p>` : ""}
    <div class="bar" role="img" aria-label="${pct}% solid">
      <div class="bar-fill bar-solid" style="width:${(t.counts.solid / t.total) * 100 || 0}%"></div>
      <div class="bar-fill bar-landed" style="width:${(t.counts.landed / t.total) * 100 || 0}%"></div>
      <div class="bar-fill bar-frontier" style="width:${(t.counts.frontier / t.total) * 100 || 0}%"></div>
      <div class="bar-fill bar-misconception" style="width:${(t.counts.misconception / t.total) * 100 || 0}%"></div>
    </div>
    <div class="pills">
      ${statusPill("solid", t.counts.solid, "solid")}
      ${statusPill("landed", t.counts.landed, "landed")}
      ${statusPill("frontier", t.counts.frontier, "frontier")}
      ${statusPill("outstanding", t.counts.misconception, "misconception")}
    </div>
    <div class="card-foot">
      <span>${t.total} node${t.total === 1 ? "" : "s"}</span>
      <span>${t.misconceptionLogCount} logged misconception${t.misconceptionLogCount === 1 ? "" : "s"}</span>
      <span>${esc(t.horizon || "—")}</span>
    </div>
  </article>`;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function levelForCount(c) {
  if (c === 0) return 0;
  if (c <= 3) return 1;
  if (c <= 8) return 2;
  if (c <= 15) return 3;
  return 4;
}

function heatmapSvg() {
  const cell = 11;
  const gap = 3;
  const colW = cell + gap;
  const rowH = cell + gap;
  const leftPad = 28;
  const topPad = 18;
  const width = leftPad + weeks.length * colW;
  const height = topPad + 7 * rowH;

  let cells = "";
  let monthLabels = "";
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstOfWeek = new Date(week[0].date);
    const m = firstOfWeek.getMonth();
    if (m !== lastMonth && firstOfWeek.getDate() <= 7) {
      monthLabels += `<text x="${leftPad + wi * colW}" y="${topPad - 6}" class="hm-month">${MONTH_NAMES[m]}</text>`;
      lastMonth = m;
    }
    week.forEach((day, di) => {
      if (day.future) return;
      const lvl = levelForCount(day.count);
      const x = leftPad + wi * colW;
      const y = topPad + di * rowH;
      cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" class="hm-cell hm-lvl${lvl}" data-date="${day.date}" data-count="${day.count}"><title>${day.count} interaction${day.count === 1 ? "" : "s"} on ${day.date}</title></rect>`;
    });
  });
  const dowLabels = ["", "Mon", "", "Wed", "", "Fri", ""]
    .map((lab, di) => (lab ? `<text x="0" y="${topPad + di * rowH + cell - 1}" class="hm-dow">${lab}</text>` : ""))
    .join("");

  return `<svg viewBox="0 0 ${width} ${height}" class="heatmap-svg" role="img" aria-label="Activity heatmap">${monthLabels}${dowLabels}${cells}</svg>`;
}

const html = `<!doctype html>
<title>Frontier</title>
<meta name="description" content="John's personal learning dashboard — topic mastery, review due dates, and daily activity.">
<style>
  :root {
    --bg: #f6f4ee;
    --bg-plane: #f0eee5;
    --surface: #fdfcf9;
    --surface-2: #ece9df;
    --border: #ddd8c9;
    --ink: #201c14;
    --ink-2: #5c5646;
    --ink-muted: #8d8672;
    --accent: #2e5f6e;
    --accent-soft: #dde8ea;
    --accent-ink: #ffffff;
    --good: #0ca30c;
    --good-soft: #dff2df;
    --warning: #fab219;
    --warning-soft: #fdecc7;
    --critical: #d03b3b;
    --critical-soft: #f8dcdc;
    --seq-0: var(--surface-2);
    --seq-1: #cde2fb;
    --seq-2: #86b6ef;
    --seq-3: #3987e5;
    --seq-4: #184f95;
    --font-display: "Fraunces", Georgia, "Times New Roman", serif;
    --font-body: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
    color-scheme: light;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #17181a;
      --bg-plane: #121213;
      --surface: #1e2023;
      --surface-2: #26282c;
      --border: #34373c;
      --ink: #efece2;
      --ink-2: #bcb6a4;
      --ink-muted: #7c7869;
      --accent: #7fb8c9;
      --accent-soft: #223138;
      --accent-ink: #0d1a1e;
      --good: #3fae73;
      --good-soft: #1c3327;
      --warning: #d9a23f;
      --warning-soft: #3a2f18;
      --critical: #e2776a;
      --critical-soft: #3a2320;
      --seq-0: var(--surface-2);
      --seq-1: #184f95;
      --seq-2: #1c5cab;
      --seq-3: #256abf;
      --seq-4: #3987e5;
      color-scheme: dark;
    }
  }
  :root[data-theme="dark"] {
    --bg: #17181a;
    --bg-plane: #121213;
    --surface: #1e2023;
    --surface-2: #26282c;
    --border: #34373c;
    --ink: #efece2;
    --ink-2: #bcb6a4;
    --ink-muted: #7c7869;
    --accent: #7fb8c9;
    --accent-soft: #223138;
    --accent-ink: #0d1a1e;
    --good: #3fae73;
    --good-soft: #1c3327;
    --warning: #d9a23f;
    --warning-soft: #3a2f18;
    --critical: #e2776a;
    --critical-soft: #3a2320;
    --seq-0: var(--surface-2);
    --seq-1: #184f95;
    --seq-2: #1c5cab;
    --seq-3: #256abf;
    --seq-4: #3987e5;
    color-scheme: dark;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg-plane);
    color: var(--ink);
    font-family: var(--font-body);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); }
  main {
    max-width: 1040px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }
  header.page-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  header.page-head h1 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 2.1rem;
    letter-spacing: -0.01em;
    margin: 0;
    text-wrap: balance;
  }
  header.page-head .subtitle {
    color: var(--ink-muted);
    font-size: 0.95rem;
  }
  .stat-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 36px;
  }
  .stat-tile {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
  }
  .stat-tile .stat-value {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--ink);
  }
  .stat-tile .stat-label {
    font-size: 0.78rem;
    color: var(--ink-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 2px;
  }
  section { margin-bottom: 40px; }
  section > h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 14px;
    color: var(--ink);
  }
  .empty-state {
    color: var(--ink-muted);
    font-style: italic;
    padding: 24px;
    border: 1px dashed var(--border);
    border-radius: 10px;
    text-align: center;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .card-head h3 {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0;
  }
  .card-goal {
    margin: 0;
    color: var(--ink-2);
    font-size: 0.88rem;
    line-height: 1.45;
  }
  .bar {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--surface-2);
  }
  .bar-fill { height: 100%; }
  .bar-solid { background: var(--good); }
  .bar-landed { background: var(--warning); }
  .bar-frontier { background: var(--border); }
  .bar-misconception { background: var(--critical); }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.76rem;
    font-family: var(--font-mono);
    padding: 3px 8px;
    border-radius: 999px;
    background: var(--surface-2);
    color: var(--ink-2);
  }
  .pill-dot { width: 7px; height: 7px; border-radius: 50%; }
  .pill-solid { background: var(--good-soft); color: var(--ink); }
  .pill-solid .pill-dot { background: var(--good); }
  .pill-landed { background: var(--warning-soft); color: var(--ink); }
  .pill-landed .pill-dot { background: var(--warning); }
  .pill-frontier .pill-dot { background: var(--ink-muted); }
  .pill-misconception { background: var(--critical-soft); color: var(--ink); }
  .pill-misconception .pill-dot { background: var(--critical); }
  .chip {
    font-size: 0.76rem;
    font-family: var(--font-mono);
    padding: 4px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .chip-critical { background: var(--critical-soft); color: var(--critical); }
  .chip-warning { background: var(--warning-soft); color: var(--ink); }
  .chip-muted { background: var(--surface-2); color: var(--ink-muted); }
  .card-foot {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 0.76rem;
    color: var(--ink-muted);
    font-family: var(--font-mono);
    border-top: 1px solid var(--border);
    padding-top: 10px;
    margin-top: 2px;
  }
  .heatmap-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    overflow-x: auto;
  }
  .heatmap-svg { display: block; }
  .hm-cell { stroke: var(--bg-plane); stroke-width: 1.5; }
  .hm-lvl0 { fill: var(--seq-0); }
  .hm-lvl1 { fill: var(--seq-1); }
  .hm-lvl2 { fill: var(--seq-2); }
  .hm-lvl3 { fill: var(--seq-3); }
  .hm-lvl4 { fill: var(--seq-4); }
  .hm-month { font-family: var(--font-mono); font-size: 9px; fill: var(--ink-muted); }
  .hm-dow { font-family: var(--font-mono); font-size: 9px; fill: var(--ink-muted); }
  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 0.76rem;
    color: var(--ink-muted);
    font-family: var(--font-mono);
  }
  .legend-swatch { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
  footer.page-foot {
    margin-top: 48px;
    color: var(--ink-muted);
    font-size: 0.8rem;
    font-family: var(--font-mono);
  }
  @media (prefers-reduced-motion: no-preference) {
    .card { transition: border-color 0.15s ease; }
    .card:hover { border-color: var(--accent); }
  }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

<main>
  <header class="page-head">
    <div>
      <h1>Frontier</h1>
      <div class="subtitle">John's learning dashboard — generated ${esc(todayStr)}</div>
    </div>
  </header>

  <div class="stat-row">
    <div class="stat-tile"><div class="stat-value">${topics.length}</div><div class="stat-label">Topics</div></div>
    <div class="stat-tile"><div class="stat-value">${topics.reduce((s, t) => s + t.counts.solid, 0)}</div><div class="stat-label">Solid nodes</div></div>
    <div class="stat-tile"><div class="stat-value">${topics.reduce((s, t) => s + t.counts.landed, 0)}</div><div class="stat-label">Landed, unverified</div></div>
    <div class="stat-tile"><div class="stat-value">${streaks.current}</div><div class="stat-label">Day streak</div></div>
    <div class="stat-tile"><div class="stat-value">${totalInteractions}</div><div class="stat-label">Interactions (year)</div></div>
  </div>

  <section>
    <h2>Topics</h2>
    ${
      topics.length
        ? `<div class="card-grid">${topics.map(topicCard).join("")}</div>`
        : `<div class="empty-state">No topics yet — run <code>/learn &lt;topic&gt;</code> to start one.</div>`
    }
  </section>

  <section>
    <h2>Activity</h2>
    <div class="heatmap-panel">
      ${heatmapSvg()}
      <div class="heatmap-legend">
        <span>Less</span>
        <span class="legend-swatch" style="background:var(--seq-0)"></span>
        <span class="legend-swatch" style="background:var(--seq-1)"></span>
        <span class="legend-swatch" style="background:var(--seq-2)"></span>
        <span class="legend-swatch" style="background:var(--seq-3)"></span>
        <span class="legend-swatch" style="background:var(--seq-4)"></span>
        <span>More</span>
        <span style="margin-left:16px">${activeDays} active day${activeDays === 1 ? "" : "s"} · longest streak ${streaks.longest}d</span>
      </div>
    </div>
  </section>

  <footer class="page-foot">Regenerated after every /learn and /review session · knowledge/*.md is the source of truth</footer>
</main>
`;

writeFileSync(OUT, html, "utf-8");
console.log(`Wrote ${OUT}`);
console.log(`Topics: ${topics.length}, activity days: ${activeDays}, total interactions: ${totalInteractions}`);
