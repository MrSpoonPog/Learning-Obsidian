---
name: anki
description: "Generate Anki-ready flashcards (front/back) from a taught topic's lesson + knowledge files, verified by two independent review agents so only cards they agree on ship. Use when the user runs /anki <topic> or asks for Anki cards for something taught in this system."
---

# Anki card generation

Turns what's already been taught (`lessons/<date>-<topic>.md` + `knowledge/<topic>.md`) into a small deck of high-quality Anki cards, filtered through independent verification so junk cards don't make it into the deck.

## Trigger

`/anki <topic>` — slugify the topic the same way `/learn` does.

## Process

1. **Locate source material.** Glob `lessons/*-<topic-slug>.md` (there may be several dated sessions for the same topic) and read `knowledge/<topic-slug>.md`. If neither exists, tell the user and stop — nothing to make cards from.

2. **Draft candidate cards.** From the source material, draft one card per genuinely atomic, testable idea — not one per sentence. Favor nodes marked `[x]` or `[~]` in the knowledge file (things actually taught and landed) over passing mentions. Skip nodes still marked `[ ]` (frontier, not yet taught) and misconceptions that were never resolved. Each card:
   - **Front**: one clear question, answerable without seeing the back.
   - **Back**: the answer, plus — if it fits in a line or two — the one-line reason it's true. Bare recall without the "why" decays faster than understanding does.
   - Math in Anki's MathJax delimiters: `\(...\)` inline, `\[...\]` display — **not** the `$...$` / `$$...$$` used in the Obsidian lesson logs, which Anki does not render.
   - No card testing two ideas at once. Split it if it does.

3. **Verify with two independent agents.** Dispatch two `general-purpose` agents in parallel via the `Agent` tool (normal foreground dispatch, same call shape as any other agent — do not background them). Give each the **same** candidate list and source material, but don't let them see each other's verdicts. Ask each to independently mark every card `keep` or `cut`, with a one-line reason, checking:
   - factual correctness against the source material
   - whether the front is unambiguous (answerable one way)
   - whether the back is actually answerable from the front alone, without outside context

4. **Keep only cards both agents marked `keep`.** Anything either agent flagged gets dropped — don't overrule a verifier yourself. If a cut looks wrong on reflection, that's a sign the card was genuinely ambiguous; rewrite and re-verify rather than overriding the verdict.

5. **Write the deck.** Save to `anki/<topic-slug>-<date>.txt`, **tab-separated**, one card per line: `Front<TAB>Back`, no header row. Tab-separated rather than comma-separated because card text routinely contains commas (inside math, inside prose) that would otherwise need escaping.

6. **Report to the user**: how many cards were drafted vs. kept, the file path, and the one-line Anki import steps:
   > File → Import File → select the `.txt` → Note Type: Basic → Fields separated by: Tab → Import.

## Design notes

- This intentionally does **not** touch the teach/review flow — it's a separate, on-demand pull from already-taught material, not something that fires automatically at session end.
- "Agents agree" means unanimous — a single flagged card is dropped, never overruled. A smaller, trustworthy deck beats a bigger, uneven one.
- If a topic has no `[x]`/`[~]` nodes at all yet (nothing has landed), say so instead of drafting cards from thin air.
