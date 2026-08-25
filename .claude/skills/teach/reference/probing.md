# Phase 1 — Probing

Goal: find out **what he already holds** and **where it runs out**, along the strands the lesson will depend on — without wasting his time or fooling yourself.

Read `quiz-design.md` before writing any question here.

---

## Probe the lattice, not a difficulty scale

The earlier version of this skill said to "binary-search the edge": jump difficulty up sharply on a hit, narrow in on a miss. **That was wrong, and wrong in a way that produces confident errors.**

Binary search needs a reliable comparison at each step. A single multiple-choice response is a *noisy bit* — with 3 options, someone who knows nothing is right a third of the time. Binary search with a faulty comparator doesn't fail loudly; it converges smoothly to the wrong place and reports high confidence. Real adaptive tests never take point estimates from 2–3 items for exactly this reason.

**Probe the prerequisite structure instead.** The topic is a DAG — that's the same structure Phase 2 will draw and Phase 3 will build. Use it:

- A **confident correct** answer on a high node discharges much of the sub-lattice beneath it. That's the efficient move: one item eliminating many.
- A **wrong** answer localises the frontier to somewhere *below* that node. Now probe its prerequisites.
- Prefer the item that **discharges the most structure**. Asking for the median of a non-sequential list of eight numbers tests "you must order it first" *and* "even-length lists have no single middle" in one item — far better than two separate questions.

This gives more information per question than difficulty-walking, and — unlike a latent "ability score" — its output is directly actionable: it names which nodes to teach.

---

## Never conclude from one response

- **One correct answer is not knowledge.** Check tier 3. Correct + "just guessing" is a coin flip, not a floor. Correct + wrong reason (tier 2) is not knowledge either — it's the 10.7% case.
- **One wrong answer is not a diagnosis.** It's a single coordinate, and you don't yet know its kind: a slip, a narrow gap, or a systematic misconception. Confidence tells you which — see `misconceptions.md`.
- **A run of all-correct means your questions were too easy.** You've established a floor with no ceiling: you know he knows *at least* this much and nothing about where it ends. Escalate.

The confidence tier is what makes short probes trustworthy. A guess reported as a guess costs nothing; a guess silently scored as mastery corrupts the whole plan.

---

## Keep it short

Target **~5 well-chosen items per session**, not an exhaustive interrogation. Adaptive-testing work on the Force Concept Inventory got to 5 items per sitting by *accumulating across sessions* rather than re-estimating from scratch each time — which is exactly what `knowledge/<topic>.md` is for.

**Always read `knowledge/<topic>.md` first if it exists.** Nodes already marked solid don't need re-probing; start from the recorded frontier. Re-probing known ground is the single most annoying failure mode of a tutor with no memory, and there's no excuse for it once state exists.

Bound the probe by relevance: map the strands the lesson will actually rest on. Don't survey the field.

---

## What "located the frontier" means

For each goal-relevant strand you should be able to state, concretely:

- **What he has** — something at that level he got right, confidently, for the right reason.
- **Where it ends** — something he got wrong, or got right while guessing, or got right for the wrong reason.

The frontier sits between those. **One side alone tells you almost nothing.**

Do not advance to Phase 2 until you can write both sentences for every strand the lesson depends on. If a strand is fully solid to the depth the lesson needs, that counts as located — record it and move on.

---

## Phase 1b — the goal

Separate question, no right answer, so **no grading and no confidence tier**. A plain `AskUserQuestion`.

With an unfamiliar subject the goal is genuinely hard for him to articulate. "I want to understand LLMs" or "how the internet works" can mean ten different things, and which one it is changes everything downstream. Push until it's concrete: what would he be able to *do*, or *explain*, that he can't now?

Ask about the **retention horizon** too, if it isn't obvious — is this for a conversation next week, an exam in three months, or permanently? That sets the review spacing (see `../../review/SKILL.md`) and is nearly impossible to infer later.

---

## Recording what you found

Write findings to `knowledge/<topic>.md` as you go — not from memory at the end. For each probed node:

```markdown
- [x] node-id — solid (2026-08-25, confident + correct reason)
- [ ] node-id — FRONTIER: knows X, breaks at Y
- [!] node-id — misconception: "<the belief, in his words>" (confident, context: <where it showed up>)
```

Record misconceptions **in his own phrasing** and **with the context they appeared in**. Both matter: the phrasing makes the best future distractor, and the context matters because misconceptions are context-indexed — the same wrong model can reappear in a different setting after seeming fixed.
