#!/usr/bin/env node
// SessionStart hook: prints a one-glance Frontier summary the moment a new
// Claude Code session opens on this repo — the "open the app, see what's
// due" moment Anki gives you on its home screen.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopics, loadActivity, readDashboardUrl, todayStr } from "./lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const today = todayStr();

const topics = loadTopics(ROOT, today);
const { totalInteractions, activeDays, streaks } = loadActivity(ROOT, today);
const url = readDashboardUrl(ROOT);

let lines = [];

if (topics.length === 0) {
  lines.push("📊 Frontier — no topics yet. Run /learn <topic> to start one.");
} else {
  lines.push(`📊 Frontier — ${topics.length} topic${topics.length === 1 ? "" : "s"} · streak ${streaks.current}d · ${totalInteractions} interactions (${activeDays} active days)`);
  for (const t of topics) {
    let due;
    if (t.overdueCount > 0) due = `OVERDUE ×${t.overdueCount}`;
    else if (t.nextDue === null) due = "no review scheduled";
    else if (t.daysUntil === 0) due = "due today";
    else if (t.daysUntil === 1) due = "due tomorrow";
    else due = `due in ${t.daysUntil}d (${t.nextDue})`;
    lines.push(`   ${t.title}: ${t.counts.solid} solid, ${t.counts.landed} landed, ${t.counts.frontier} frontier — ${due}`);
  }
  if (url) lines.push(`   Full dashboard: ${url}`);
}

const summary = lines.join("\n");

console.log(
  JSON.stringify({
    systemMessage: summary,
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: summary,
    },
  })
);
