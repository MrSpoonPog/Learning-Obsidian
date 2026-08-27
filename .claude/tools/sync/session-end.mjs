#!/usr/bin/env node
// SessionEnd safety net: if knowledge/lessons/anki have uncommitted work when
// the session ends, commit + push it so nothing is lost and other devices see
// it. Deliberately narrow scope (not .claude/ or CLAUDE.md) — infra/skill
// changes get real commit messages from a live session, not an auto message.
// Never blocks (SessionEnd can't force further turns anyway) and never throws.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const TRACKED_DIRS = ["knowledge", "lessons", "anki"].filter((d) => existsSync(join(ROOT, d)));

// execFileSync spawns git directly (no shell), sidestepping COMSPEC/shell
// resolution quirks. Plain "git" relies on PATH lookup, which some sandboxed
// invocation contexts refuse even when PATH lists it — probe absolute
// Windows install locations as a fallback the first time that happens.
const GIT_FALLBACKS = ["git", "C:\\Program Files\\Git\\cmd\\git.exe", "C:\\Program Files\\Git\\bin\\git.exe"];
let GIT = null;
function resolveGit() {
  for (const candidate of GIT_FALLBACKS) {
    try {
      execFileSync(candidate, ["--version"], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
      return candidate;
    } catch {
      continue;
    }
  }
  throw new Error("git executable not found on any known path");
}
function git(args) {
  if (!GIT) GIT = resolveGit();
  return execFileSync(GIT, args, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
}

try {
  if (TRACKED_DIRS.length === 0) process.exit(0);

  const status = git(["status", "--porcelain", "--", ...TRACKED_DIRS]);
  if (!status) process.exit(0);

  git(["add", ...TRACKED_DIRS]);
  const date = new Date().toISOString().slice(0, 10);
  git(["commit", "-m", `Auto-sync: session-end backup (${date})`]);

  try {
    git(["push"]);
    console.log(JSON.stringify({ systemMessage: "Auto-synced today's learning files to GitHub." }));
  } catch {
    console.log(JSON.stringify({ systemMessage: "Committed today's learning files locally; push failed (offline?) — push manually when back online." }));
  }
} catch {
  // Nothing staged, or git itself declined (e.g. a pre-commit hook rejected).
  // Non-fatal either way — a future session's close-out will catch it.
  process.exit(0);
}
