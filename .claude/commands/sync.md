---
description: Commit, push, and republish the dashboard in one shot
---

Run the full learning-system close-out sync, right now, regardless of whether a `/learn`/`/review`/`/exam` session just finished:

1. **Check state.** `git status` — see what's changed in `knowledge/`, `lessons/`, `anki/`, `.claude/`, `CLAUDE.md`.
2. **Backfill activity log if needed.** If this conversation ran a `/learn`, `/review`, or `/exam` session and `knowledge/_activity.jsonl` doesn't yet have a line for it, append one now (date, topic slug, type, interactions = count of `AskUserQuestion` calls that session).
3. **Regenerate the dashboard.** `node .claude/tools/dashboard/generate.mjs --out <a scratchpad path>`.
4. **Publish it.** Use the `Artifact` tool on that file, passing `url:` set to the URL already recorded under **Dashboard** in `CLAUDE.md` — this updates the existing "Frontier" artifact in place rather than creating a new one.
5. **Commit and push.** Stage whatever's actually changed (don't blindly `git add -A`; check what's staged before committing), write a real commit message describing what changed this session — not a generic placeholder — and push.
6. **Report back**: what got committed, whether push succeeded, and the dashboard link.

If nothing has changed since the last sync, say so and skip the commit/publish steps — don't manufacture an empty commit.
