# John Learning

A personal teaching system. The point is that things he learns here are **understood and retained**, not recited once and forgotten.

## Setup

Run `setup.cmd` (double-click it). Idempotent — safe to re-run any time. It checks Node, installs the render toolchain, creates the working folders, and smoke-tests both diagram renderers before reporting success.

## Layout

| Path | What it is |
|---|---|
| `setup.cmd` | One-shot installer / health check. Re-run it if diagrams stop rendering |
| `.claude/skills/teach/` | How to teach. `SKILL.md` + four `reference/` files loaded on demand |
| `.claude/skills/review/` | Spaced re-testing and knowledge-state upkeep |
| `.claude/skills/visualize/` | Adds a diagram to a lesson when a picture genuinely helps |
| `.claude/agents/` | `researcher` (fact-checking, topic scoping), `mermaid-maker`, `svg-maker` |
| `.claude/tools/visual/` | Local render toolchain — mermaid-cli + `svg2png.mjs` (puppeteer) |
| `.claude/tools/dashboard/generate.mjs` | Builds the `Frontier` dashboard HTML from `knowledge/*.md` + `knowledge/_activity.jsonl`. Run + republish as an Artifact at the end of every `/learn`, `/review`, and `/exam` session — see **Dashboard** below |
| `.claude/tools/sync/session-end.mjs` | `SessionEnd` hook safety net — auto-commits+pushes `knowledge/`, `lessons/`, `anki/` if a session ends with those dirty. Doesn't touch the dashboard artifact (hooks can't call the `Artifact` tool) — see **Automation** below |
| `.claude/skills/exam/` | Periodic cross-topic consolidation, bigger than a single `/review` sitting |
| `knowledge/<topic>.md` | **State.** Dependency DAG, node statuses, misconceptions, due dates |
| `knowledge/_activity.jsonl` | One line per session: `{"date","topic","type","interactions"}`. Feeds the dashboard's heatmap/streaks. Leading `_` excludes it from the topic scan |
| `lessons/<date>-<topic>.md` | **Prose.** The lesson itself, for him to re-read in Obsidian |
| `anki/<topic>-<date>.txt` | Optional flashcard export (`/anki <topic>`) — tab-separated, import into Anki once and **AnkiWeb sync handles cross-device from there**, no work needed from this repo |
| `viz/` | Rendered diagrams, embedded by the lesson logs |
| `.pi/` | Upstream `amosblomqvist/learn` clone. **Reference only — never live config.** `git -C .pi pull` to see upstream changes |

## Commands

- `/learn <topic>` — start or resume a teaching session
- `/review [topic]` — re-test what's due
- `/exam` — periodic bigger sitting across every topic's solid material, not just what's due (see `.claude/skills/exam/SKILL.md`)
- `/sync` — one-shot button: commit, push, regenerate + republish the dashboard, right now, regardless of session state
- `/anki <topic>` — export a topic's `[x]`/`[~]` nodes as an Anki deck (`anki/<topic>-<date>.txt`)

## Dashboard

Live at **https://claude.ai/code/artifact/fd45d4df-e3c7-47d1-b465-a953178825c8** ("Frontier") — private, bookmark it on any device. It shows every topic's node counts (solid/landed/frontier/misconception), next review due date, and a GitHub-style activity heatmap.

**Regenerate it at the end of every `/learn` and `/review` session:**
1. Append one line to `knowledge/_activity.jsonl`: `{"date":"<today>","topic":"<slug>","type":"learn|review","interactions":<count of AskUserQuestion calls this session>}`
2. `node .claude/tools/dashboard/generate.mjs --out <scratchpad-path>/frontier.html`
3. Publish with the `Artifact` tool, passing `url: "https://claude.ai/code/artifact/fd45d4df-e3c7-47d1-b465-a953178825c8"` so it updates in place rather than creating a new one.

Or just run **`/sync`** — it does exactly the above in one shot, any time, not only at session end.

## Automation

- **`/sync`** — the manual "button." Run it any time to force a commit+push+dashboard-republish immediately, regardless of whether a teaching session just finished.
- **`SessionEnd` hook** (`.claude/tools/sync/session-end.mjs`, registered in `.claude/settings.json`) — the automatic safety net. Fires whenever a Claude Code session on this repo ends; if `knowledge/`, `lessons/`, or `anki/` have uncommitted changes, it auto-commits and pushes them with a generic message. **It cannot republish the dashboard artifact** — hooks only run shell commands, and publishing goes through the in-conversation `Artifact` tool — so the primary path is still the skills' own close-out step doing the full sync (including the artifact) before a session ends normally. The hook exists purely so a session that ends abruptly (crash, forgot to close out) doesn't lose that session's `knowledge/`/`lessons/` data.
- If `.claude/settings.json` was just added or edited, the hook may not be picked up until the settings watcher reloads — open `/hooks` once (or restart) if `/sync` shows uncommitted changes that a session-end should have caught.

## Cross-device access

The repo has a private GitHub remote (`MrSpoonPog/john-learning`) — that's the sync backbone for all three surfaces:

- **Laptop** — clone the repo, run `setup.cmd`. Full native Claude Code CLI + Obsidian desktop.
- **Phone/tablet, running `/learn` or `/review`** — open **claude.ai/code** in the mobile browser, connect it to the `MrSpoonPog/john-learning` GitHub repo. Same slash commands, same skills, same knowledge files — no separate install. Push/pull to keep the repo in sync with what the laptop last did.
- **Phone/tablet, reading lesson prose** (rendered markdown/LaTeX/mermaid) — Obsidian mobile + the community **Obsidian Git** plugin, pointed at the same GitHub repo. Pull before reading, push if edited on mobile. Free, and renders exactly like the desktop vault.
- **Dashboard** — the `Frontier` Artifact link above works from any device's browser, no login-to-repo needed.
- **Anki (optional, lightest-weight)** — `/anki <topic>` exports a deck to `anki/`. Import it into the Anki app once; **AnkiWeb sync (free) then keeps it current on every device on its own** — no git, no Claude Code needed to review it. Best for pure fact-maintenance on `[x]`/`[~]` nodes when he doesn't want to open Claude Code at all; the three-tier diagnostic quizzing in `/review`/`/exam` stays the deeper mechanism and lives only here.

**Keep the remote in sync**: since sessions on different devices all read/write `knowledge/` and `lessons/`, commit and push at the end of a session before switching devices, and pull before starting one — otherwise a session on a second device works from a stale knowledge state.

## Standing rules

- **Teaching content goes in `lessons/`, state goes in `knowledge/`.** Don't mix them. The lesson log is narrative he'll read; the knowledge file is terse machine state.
- **Never re-probe a node marked `[x]`** in `knowledge/`. Read the state file first, every session.
- **Grade every gradable question immediately**, in the first line of the next message. An ungraded question is a wasted question — retrieval practice without feedback is g = 0.03, statistically nothing.
- **Verify before asserting.** Any fact you're less than sure of goes through the `researcher` agent before you say it. One confident hallucination costs more than any amount of pausing.
- **Don't edit `.pi/`.** Changes belong in `.claude/`.
- The pedagogy in `.claude/skills/teach/` is evidence-backed and the numbers are in `reference/evidence.md`. **Before changing any rule there, check what it was based on** — several of them are counter-intuitive and were arrived at by overturning a plausible-sounding assumption.
