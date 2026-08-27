---
name: exam
description: Periodic cross-topic consolidation exam — a bigger sitting across every topic's already-solid material, not just what's due. Use when the user runs /exam or asks for a consolidation/exam session to cement material across topics.
---

# Exam

`/review` tests what's *due*, one topic at a time. This is the "zoom out, once in a while" pass: a bigger sitting across **every** topic's solid material at once, to catch silent drift in a topic he hasn't touched in months and that `/review`'s due-queue-only scope would never surface on its own.

This reuses all of `../review/SKILL.md`'s mechanics — three-tier items (`../teach/reference/quiz-design.md`), confidence-routed misconception handling (`../teach/reference/misconceptions.md`), immediate grading, state updates. **This file only changes scope and size, not method.** Read `../review/SKILL.md` first if you haven't already this session.

## When to run it

On-demand only (`/exam`) — not auto-scheduled. The +1 day / +1 week / +3 week ladder is what does the actual spacing work; an exam is a periodic top-up on top of it, not a replacement. A natural cadence is roughly monthly, or whenever he asks, or once several topics have accumulated solid material.

## Scope — the difference from /review

- Pull from **every** `knowledge/*.md` topic, not just what's currently due.
- Draw primarily from `[x]` solid nodes — this is a maintenance pass guarding against silent drift on things already earned. Include aging `[~]` nodes too if a topic has them.
- Cap higher: **10–15 items**, not review's 5–7.
- **Structure by topic block — never randomly interleave across unrelated topics.** Interleaving unrelated material is actively harmful (g = −0.39, `../teach/reference/evidence.md`); the benefit only exists between genuinely confusable siblings. Within one topic's block, follow review's own interleaving rule (confusable siblings only, per that topic's graph). Across topics, run one topic's block, then move to the next.
- If only one topic exists, or nothing has reached `[x]`/aged `[~]` yet, say so and suggest `/review` instead — don't manufacture a cross-topic exam out of thin material.

## Running it

1. **Pull candidates** from every topic file: all `[x]` nodes, plus `[~]` nodes more than a few days old.
2. **Pick 10–15**, weighted toward topics with the most solid material, but touch every topic that has anything solid — a genuine sweep, not a deep-dive on one topic.
3. **Test cold.** No re-teaching, no recap, straight into the question — same rule as review. Vary the surface form from how each node was originally taught or last reviewed.
4. **Grade immediately** (first line of the next message), route on confidence exactly as `misconceptions.md` describes.
5. **Update every touched topic's `knowledge/<topic>.md`** — status, last-tested, due date. A failed node resets to +1 day, exactly like a failed `/review` item — no special exam penalty or bonus.
6. **Close out**: append `knowledge/_activity.jsonl` (`"type":"exam"`), regenerate and republish the dashboard — see **Dashboard** in `CLAUDE.md`.

## What this is not

Not a harder review, not a way to promote nodes faster than the ladder allows, and not a substitute for the +1 day / +1 week / +3 week schedule. It exists purely because `/review` only ever surfaces one topic's due queue — without this, a topic he hasn't returned to in months could drift silently since nothing ever puts it back in front of him.
