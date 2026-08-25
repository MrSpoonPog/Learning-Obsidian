# Handling wrong answers

A wrong answer is not one thing. The single most consequential decision in this whole system is **which kind of wrong it is**, because the two main kinds need opposite responses — and applying the wrong one is worse than doing nothing.

Numbers behind everything here are in `evidence.md`.

---

## The routing decision

Read tier 3 **before** you decide how to respond.

| He was | Confidence | What it is | What to do |
|---|---|---|---|
| Wrong | Certain / Fairly sure | **Misconception** — an active, wrong model | **Refute.** See below |
| Wrong | Just guessing | **Lack of knowledge** — no model at all | **Just teach it.** Do NOT refute |
| Right | Just guessing | **A guess** | Don't credit. Re-probe the idea differently |
| Right, tier 2 wrong | any | **Right for the wrong reason** | Treat as a miss. Fix the reasoning, not the answer |

Roughly 38.8% of wrong responses in three-tier data are lack-of-knowledge, not misconception. Refuting someone who simply doesn't know is not neutral — you name a wrong belief, give it airtime, and hand him a plausible-sounding claim he didn't previously hold. **You can install a misconception by refuting one he never had.** When he's guessing, skip the refutation frame entirely and teach the thing directly.

The mirror error is treating a confident wrong answer as a knowledge gap and simply stating the correct fact. That fails, because the wrong model is still there and will re-absorb the new fact as a special case.

---

## Refutation — for confident errors only

Refutation texts beat plain exposition at g = 0.41, and the mechanism is co-activation: the wrong idea and the right one have to be **held in mind at the same time** for one to displace the other. Stating only the correct model leaves the wrong one untouched in a separate compartment.

The order matters and is not negotiable:

1. **Name the belief**, in his words where possible. "You're treating <X> as if <belief>."
2. **Mark it false explicitly.** Not "it's more subtle than that" — say it's wrong. Hedging defeats the co-activation.
3. **Say why it fails** — the specific case where the belief makes a wrong prediction. This is the load-bearing step.
4. **Give the correct model**, and show it handling that same case.

Hypercorrection is why this is worth the effort: **errors committed with high confidence are the ones corrected most durably.** A confident wrong answer is the best learning opportunity in the session, not a setback. Say so if he seems deflated by it.

### The pre-condition you can't skip

Posner's four conditions for conceptual change start with **dissatisfaction** — he has to feel his model failed *before* the replacement arrives. That's what the quiz-first structure buys: he commits, then finds out. If you explain first and quiz after, you've skipped condition one and the refutation is just exposition.

Practical consequence: **never soften the moment of being wrong by pre-emptively explaining.** Grade first, refute second.

---

## Why refutation often fails anyway

Chinn & Brewer catalogued seven responses to data that contradicts a held belief. **Six of them leave the belief intact**: ignore it, reject it, declare it outside the theory's scope, hold it in abeyance, reinterpret it, or make a peripheral tweak. Only the seventh is actual theory change.

So a contradiction that he doesn't *perceive* as a contradiction gets quietly assimilated. Guard against this:

- **Check that the conflict landed.** After a refutation, ask him to state what his old model predicts for the counterexample. If he can't, or if he produces the correct answer without noticing it contradicts him, the conflict didn't register.
- **Watch for peripheral repair.** "Oh, so it's just different for that case" is the tell. That's a patch, not a change — the core belief survived with an exception bolted on.
- **A silent nod is not agreement.** It's the most common form of "hold in abeyance."

---

## Find the productive core

Most wrong answers are not stupid. They're a correct intuition applied out of range.

Bridging from an intuition he already holds correctly (g = 1.06) is about as effective as head-on conflict (g = 1.10) and is much less likely to trigger the rejection responses above. Prefer it when you can find an anchor:

- Find a case where his intuition **is right**, and get him to agree to it.
- Build a short chain of intermediate cases from there to the case he got wrong.
- Let the chain do the work — he revises the boundary of the intuition rather than abandoning it.

This matters because knowledge in unfamiliar domains isn't a coherent wrong theory, it's a loose collection of fragments (diSessa's p-prims) activated by surface features. "Wrong" usually means *right fragment, wrong context*. Telling him his intuition is wrong when it's actually well-founded-but-misapplied is both false and demoralising.

**Special case worth knowing:** some errors are ontological — he's put the thing in the wrong *category*. Treating a diffusion-like process (many agents, no coordinator, outcome emerges) as if it had a controller is the classic pattern. These don't respond to more examples, because every example gets re-read through the wrong category. The fix is to name the category itself: "this doesn't have anyone in charge — the pattern is what falls out of the parts."

---

## Recording and re-probing

Write every diagnosed misconception to `knowledge/<topic>.md`:

```markdown
- [!] node-id — misconception: "<his exact phrasing>" (confident, context: <where it appeared>)
```

Both fields earn their place:

- **His phrasing** becomes the best distractor you will ever have for that node. Real errors make diagnostic distractors; invented ones usually don't.
- **The context**, because misconceptions are **context-indexed, not traits**. The same wrong model routinely reappears in a structurally different setting weeks after looking resolved. Someone can answer correctly in the framing they were taught in and revert immediately in another.

So: **re-probe a "fixed" misconception in a different surface context, at a delay.** Same-context, same-session re-testing tells you almost nothing — it's the weakest test available (at 5 minutes, restudy actually beats testing). Mark the node `[!]` until it survives a cold re-probe in a new setting. Only then does it become `[x]`.

If it fails the re-probe, that is normal and expected. Log the new context and try a different route — bridging if you used conflict, conflict if you used bridging.
