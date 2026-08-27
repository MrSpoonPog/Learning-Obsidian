// Shared parsing for the dashboard tooling: knowledge/*.md topic state +
// knowledge/_activity.jsonl activity log. Used by generate.mjs (HTML +
// Obsidian markdown) and session-start-summary.mjs (SessionStart hook).

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function todayStr(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function parseTopic(filePath, today) {
  const raw = readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/);

  const titleLine = lines.find((l) => l.startsWith("# "));
  const title = titleLine ? titleLine.replace(/^#\s*/, "").trim() : filePath;

  const goalLine = lines.find((l) => /^Goal:/.test(l.trim()));
  const goal = goalLine ? goalLine.trim().replace(/^Goal:\s*/, "") : "";

  const horizonMatch = raw.match(/Retention horizon:\s*\*\*(.*?)\*\*/);
  const horizon = horizonMatch ? horizonMatch[1] : "";

  function section(heading) {
    const startIdx = lines.findIndex((l) => l.trim().toLowerCase() === `## ${heading}`.toLowerCase());
    if (startIdx === -1) return [];
    const rest = lines.slice(startIdx + 1);
    const endIdx = rest.findIndex((l) => /^##\s/.test(l));
    return endIdx === -1 ? rest : rest.slice(0, endIdx);
  }

  const dueDates = [...raw.matchAll(/-\s*\*\*(\d{4}-\d{2}-\d{2})\*\*/g)].map((m) => m[1]).sort();

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

  const upcoming = dueDates.filter((d) => d >= today);
  const overdue = dueDates.filter((d) => d < today);
  const nextDue = upcoming[0] || null;
  const daysUntil = nextDue ? Math.round((new Date(nextDue) - new Date(today)) / 86400000) : null;

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

export function loadTopics(root, today) {
  const knowledgeDir = join(root, "knowledge");
  if (!existsSync(knowledgeDir)) return [];
  const files = readdirSync(knowledgeDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const topics = files.map((f) => parseTopic(join(knowledgeDir, f), today));
  topics.sort((a, b) => {
    const da = a.daysUntil === null ? Infinity : a.daysUntil;
    const db = b.daysUntil === null ? Infinity : b.daysUntil;
    return da - db;
  });
  return topics;
}

export function loadActivity(root, today) {
  const activityLog = join(root, "knowledge", "_activity.jsonl");
  let entries = [];
  if (existsSync(activityLog)) {
    entries = readFileSync(activityLog, "utf-8")
      .split(/\r?\n/)
      .filter(Boolean)
      .map((l) => JSON.parse(l));
  }
  const byDate = new Map();
  for (const e of entries) {
    byDate.set(e.date, (byDate.get(e.date) || 0) + (e.interactions || 1));
  }
  const totalInteractions = [...byDate.values()].reduce((a, b) => a + b, 0);
  const activeDays = byDate.size;

  const days = [...byDate.keys()].sort();
  let longest = 0;
  let run = 0;
  let prev = null;
  for (const d of days) {
    run = prev && (new Date(d) - new Date(prev)) / 86400000 === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = d;
  }
  const daySet = new Set(days);
  let current = 0;
  let cursor = new Date(today);
  if (!daySet.has(today)) cursor.setDate(cursor.getDate() - 1);
  while (daySet.has(cursor.toISOString().slice(0, 10))) {
    current++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { byDate, totalInteractions, activeDays, streaks: { current, longest } };
}

export function readDashboardUrl(root) {
  const claudeMd = join(root, "CLAUDE.md");
  if (!existsSync(claudeMd)) return null;
  const raw = readFileSync(claudeMd, "utf-8");
  const m = raw.match(/live at \*\*(https:\/\/\S+?)\*\*/i);
  return m ? m[1] : null;
}
