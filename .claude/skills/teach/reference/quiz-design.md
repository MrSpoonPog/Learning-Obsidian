# Writing questions

Every gradable question in this system is a three-tier diagnostic. This file is how to build one. Numbers behind the rules are in `evidence.md`.

---

## The three tiers

One `AskUserQuestion` call carries all three (it accepts up to 4 questions per call). Ask them together — never split across turns, or he'll answer tier 2 already knowing tier 1 was wrong.

1. **Answer** — the claim. 3 options.
2. **Reason** — *why* that answer. 3 options, each a different route to an answer.
3. **Confidence** — `Just guessing` / `Fairly sure` / `Certain`.

Why all three: answer-only reliability is α = .61; adding reason takes it to .70; adding confidence to .78. More concretely — **10.7% of correct answers are right for the wrong reason** (up to 54.9% on a bad item), and **38.8% of responses are lack-of-knowledge rather than misconception**. A single-tier quiz calls the first group "mastery" and treats the second identically to a real misconception. Both errors send you to the wrong next move.

For a quick check on a node just established, you may drop tier 2 and keep tiers 1 and 3. **Never drop tier 3.** Confidence is what routes the remediation, and it costs one line.

### Tier 2 without giving away tier 1

The reason options must not reveal the answer. Write them as *routes* rather than justifications of a specific option:

- BAD: "Because packets can arrive out of order" (only fits one answer)
- GOOD: "Because the ordering is reconstructed after arrival" / "Because the channel guarantees order" / "Because ordering is handled before sending"

Each should be the reasoning of someone holding a different model, statable independently of which answer they picked.

---

## Rule 1 — every distractor must be competitive

**This is the most important rule in this file, and the one most easily broken without noticing.**

A distractor must be a *plausible answer to the actual question* — something he'd have to retrieve real knowledge to rule out. Distractors that are obviously wrong don't make the question "easier"; they **destroy the mechanism entirely**. Multiple-choice earns its keep because rejecting a competitive wrong option is itself an act of retrieval that strengthens the related material (d = 0.43). With non-competitive options that benefit is **zero** — the item degrades into elimination-by-recognition and teaches nothing.

The canonical illustration: *"Which outer planet was discovered by mathematical prediction?"* — with *Uranus / Saturn* as alternatives, the item works. With *Mercury / Mars*, it does nothing at all.

**Test:** could someone who doesn't know the material eliminate an option using only general plausibility, without engaging the content? If yes, that option is dead weight. Replace or remove it.

---

## Rule 2 — three options, and every one of them earns its place

Default to **3 options**. Going 4→3 slightly *improves* discrimination (+.03) and reliability (+.02).

Use a 4th **only when you can name a third distinct, real misconception**. The evidence says a non-functioning fourth option is worse than useless — but a genuinely functioning one is worth keeping, and diagnostic use is the explicit carve-out in the literature.

If you can't think of a third plausible wrong model, that is **information**: your model of how people get this wrong is thin. Go with 2 distractors, or think harder about the misconceptions. **Never invent filler to reach a target count.** Reality check: across real exams, the modal number of *effective* distractors per item is one, and only ~3% of five-option items have all options working.

---

## Rule 3 — the key must not be reachable by wrong reasoning

**Barton's Golden Rule 5, the hardest and most important item-writing skill.** An item must be impossible to answer correctly while still holding the misconception you're testing for.

His example: *"Which of the following is a multiple of 6? 20 / 62 / 24 / 26"* is a **bad** diagnostic question — someone who confuses factors with multiples still lands on 24. His fix: *"Which of these is a factor of 27? 7 / 13.5 / 54 / 3"* — where 13.5 specifically traps the sloppy definition "a number that goes into another number."

In measurement terms: *false positives are more serious than false negatives.* A false positive makes you skip a node he doesn't actually hold, and then you build on sand. **Interpretability of the key matters more than interpretability of the distractors.**

Before sending any item, ask: *is there a wrong route that lands on the right answer?* If yes, rewrite.

---

## Rule 4 — build options so evenness is automatic

The old rule was "keep options even," audited after writing. That fails, because by the time you audit, the tell is already baked in. Build them so parallelism falls out by construction:

1. **Write the correct claim first.** Then mutate it into each distractor: take one specific misconception and state what someone holding it would claim, in the *same* skeleton, grain size, and register.
2. **Zero justification in any option.** The number-one giveaway is the key carrying its own reasoning ("…, because it preserves X") while distractors are bare. All reasoning goes in the grade, which appears only after he answers. (Tier 2 handles the "why" properly.)
3. **Equal length.** Not because he'd exploit it — there's no evidence examinees do — but because *the writer* drifts into padding the key with qualifiers. This rule exists to defend against your own laziness.
4. **No asymmetric emphasis.** Bold the parallel term in every option or in none.
5. **No "(Recommended)" markers.** That's for real decisions; on a quiz it hands over the answer.
6. **No "all/none of the above."** Reduces reliability; nearly everyone picks "all of the above" when it appears.
7. **Positive stems.** Avoid NOT/EXCEPT where you can — evidence is mixed, but negation adds load without diagnostic value.
8. **Short.** If it takes more than ~10 seconds to answer, it's testing more than one thing. Split it.

**Final check:** read the option set cold, as someone who doesn't know the material. If you can still pick the answer, you skipped step 1 or 2. **Regenerate rather than patch** — patching preserves the tell.

---

## Rule 5 — derive distractors from real wrong models, not from imagination

The best instruments in this field (the Force Concept Inventory and its descendants) built distractors by asking questions **open-ended** first, then promoting the most common wrong answers into options. That's what makes a distractor diagnostic rather than merely wrong.

You can approximate this:
- Use documented misconceptions for the topic. When unsure what they are, the `researcher` subagent can find them — "common misconceptions about X" is a well-covered query for most subjects.
- When he gives a wrong answer in open conversation, **record it in `knowledge/<topic>.md`** and reuse it as a distractor later. His actual errors are the highest-quality distractors available.
- Keep an explicit option → misconception mapping in your head when writing: if you can't name what a distractor diagnoses, it isn't diagnostic.

**The test for a diagnostic distractor:** given that he picked it, can you name the belief and prescribe a *different* remediation than for the other options? If every wrong option leads to the same "here's the right answer" response, the item isn't diagnosing anything.

---

## Grading — mandatory, immediate, every time

**Your very next message after his answer must open with the grade.** Before any teaching, transition, or commentary.

```
✓ Correct — and for the right reason.
✗ Not quite. The answer is **<key>**.
```

Then: why the key is right; if he missed, what his choice implies and why it's wrong; if tier 2 was wrong, address that *even when tier 1 was right*.

This is not a stylistic preference. Retrieval practice **without** feedback on material he mostly can't retrieve produces **g = 0.03 — statistically nothing.** With feedback it's 0.73 regardless of difficulty. An ungraded question is a wasted question, and a run of them silently converts this system into theatre.

A useful consequence: **because feedback is guaranteed, hard questions are safe.** You don't need to keep success rates high. Aim at the frontier.

### Reading the tier combinations

| Tier 1 | Tier 3 | Reading | Response |
|---|---|---|---|
| ✓ | Certain | Solid | Move on |
| ✓ | Guessing | **Lucky guess — not knowledge** | Don't credit. Re-probe the same idea differently |
| ✓ | any, tier 2 ✗ | **Right for the wrong reason** (10.7% of "correct" answers) | Treat as a miss. Fix the reasoning |
| ✗ | Certain | **Confident misconception** | → refutation. See `misconceptions.md` |
| ✗ | Guessing | **Lack of knowledge, not misconception** | Just teach it. Do NOT refute |

That table is the entire reason the confidence tier exists. Rows 2, 3 and 5 are all invisible to a single-tier quiz, and each one demands a different next move.
