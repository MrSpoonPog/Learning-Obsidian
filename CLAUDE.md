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
| `knowledge/<topic>.md` | **State.** Dependency DAG, node statuses, misconceptions, due dates |
| `lessons/<date>-<topic>.md` | **Prose.** The lesson itself, for him to re-read in Obsidian |
| `viz/` | Rendered diagrams, embedded by the lesson logs |
| `.pi/` | Upstream `amosblomqvist/learn` clone. **Reference only — never live config.** `git -C .pi pull` to see upstream changes |

## Commands

- `/learn <topic>` — start or resume a teaching session
- `/review [topic]` — re-test what's due

## Standing rules

- **Teaching content goes in `lessons/`, state goes in `knowledge/`.** Don't mix them. The lesson log is narrative he'll read; the knowledge file is terse machine state.
- **Never re-probe a node marked `[x]`** in `knowledge/`. Read the state file first, every session.
- **Grade every gradable question immediately**, in the first line of the next message. An ungraded question is a wasted question — retrieval practice without feedback is g = 0.03, statistically nothing.
- **Verify before asserting.** Any fact you're less than sure of goes through the `researcher` agent before you say it. One confident hallucination costs more than any amount of pausing.
- **Don't edit `.pi/`.** Changes belong in `.claude/`.
- The pedagogy in `.claude/skills/teach/` is evidence-backed and the numbers are in `reference/evidence.md`. **Before changing any rule there, check what it was based on** — several of them are counter-intuitive and were arrived at by overturning a plausible-sounding assumption.
