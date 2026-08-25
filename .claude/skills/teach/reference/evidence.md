# Evidence base

Every non-obvious rule in this skill traces to something here. Read this when you want to change a rule, or when you're tempted to add a "learning hack" you half-remember. The most common failure mode for a system like this is drifting back toward folklore that *sounds* like science.

Effect sizes are Hedges's *g* or Cohen's *d* unless noted. Rough calibration: 0.2 small, 0.5 moderate, 0.8 large.

---

## 1. Retrieval practice (why quizzing at all)

| Finding | Number | Source |
|---|---|---|
| Testing vs restudy, overall | g = 0.50 [0.42, 0.58], k=159 | Rowland 2014, *Psych Bulletin* |
| Exposure-matched subset | g = 0.66 [0.56, 0.75] | Rowland 2014 |
| Classroom studies | g = 0.499, 222 studies, N=48,478 | Yang et al. 2021, *Psych Bulletin* |

**The comparison condition is everything** (Yang 2021):
- vs. no activity / filler: **g = 0.610**
- vs. restudying: **g = 0.330**
- vs. **other elaborative strategies: g = 0.095**

⚠️ That last number is the honest one. Against a *well-designed active alternative*, quizzing's advantage is close to negligible. Headline testing-effect numbers are almost always against passive rereading. **Do not oversell this system's mechanism.**

**Retention interval — the effect grows with delay:**
- < 1 day: g = 0.41 · ≥ 1 day: g = 0.69 (Rowland)
- Roediger & Karpicke 2006: at a **5-minute** test, repeated *studying* beat repeated testing. At **1 week**, testing won (61% vs 40%).

→ This is why the immediate post-node check is explicitly *not* the retention mechanism. Real verification happens in `review`, ≥1 day later.

---

## 2. Recall vs recognition — the question that decided the architecture

The design hypothesis going in was "free recall beats multiple-choice, so the quiz machinery is the weak version." **This was refuted.**

| | Recall | Recognition | |
|---|---|---|---|
| Rowland 2014, exposure-matched lab | free 0.81 / cued 0.72 | **0.36** | recall wins ~2:1 |
| Rowland 2014, full data set | free 0.29 / cued 0.61 | 0.29 | free recall ≈ recognition |
| **Yang 2021, classrooms** | **0.520** | **0.518** | **Q(1)=0.004, p=.952** |
| Adesope 2017, 272 effects | short answer 0.48 | **MCQ 0.70** | MCQ *wins* |

Classroom formats ranked: matching 0.913 > fill-in-blank 0.773 > short answer 0.638 > **MCQ 0.567** > cued recall 0.316 > **free recall 0.238 (worst)**.

The lab recall advantage appears to be an artifact: 81% of Rowland's effects used word pairs/lists, and cued-recall studies used feedback 44% of the time vs 11% for free recall.

**Conclusion: multiple-choice is a legitimate primary format.** Two of three major meta-analyses put MCQ equal or better.

### But only if distractors are competitive

Little, Bjork, Bjork & Angello 2012, *Psychological Science*:
- With feedback, MCQ ≈ cued recall on retested items.
- MCQ additionally produced **retrieval-induced learning** of material tied to the *incorrect* alternatives (d = 0.43 vs control), where cued recall produced retrieval-induced **forgetting**. MCQ beat cued recall on related items by **d = 0.59**.

Little & Bjork 2010 — the essential proviso: this works **only with competitive distractors**. Their example: "which outer planet was discovered by mathematical prediction?" (Neptune). Enhancement of the alternatives occurred with *Uranus, Saturn* (plausibly outer planets), and **not at all** with *Mercury, Mars* (obviously inner). Non-competitive distractors → **zero benefit over control**.

→ A question with an obviously-silly wrong option isn't a weaker question. It's a question that has **forfeited the mechanism entirely**.

---

## 3. Feedback — the one non-negotiable

Rowland 2014, "retrievability and reexposure" moderator:

| Condition | g |
|---|---|
| **No feedback, initial success ≤ 50%** | **0.03 [−0.21, 0.27], p = .79 — NULL** |
| No feedback, 51–75% | 0.29 |
| No feedback, > 75% | 0.56 |
| **Feedback, any success level** | **0.73 [0.61, 0.86]** |

Retrieval practice on material the learner mostly can't retrieve, **without feedback, does literally nothing**. Feedback rescues it at every difficulty level. Yang 2021 confirms in classrooms (0.537 vs 0.374).

→ Never pose a gradable question without grading it. This is why the grade-immediately rule is absolute rather than stylistic. It also means hard questions are *safe* — provided feedback always follows.

**Feedback timing:** Rowland found delayed feedback g = 1.38 vs immediate 0.66 — but ⚠️ **k = 6, confounded with retention interval, and flagged as unreliable by Rowland himself.** Use immediate. It's solidly established and it's what Little & Bjork used.

---

## 4. Item design

**Haladyna, Downing & Rodriguez 2002** — 31 guidelines; the authors state plainly that they "do not have equal degrees of evidence."

*Genuinely evidence-backed:* avoid "all of the above" (reduces reliability; nearly everyone picks it when present); avoid complex/Type-K formats; NOTA increases difficulty in all five studies examining it.

*Convention with no cited evidence:* equal option length (85% textbook endorsement, **zero studies**), homogeneous options, central idea in stem (100% endorsement, but Downing 1991 found no difficulty/discrimination difference).

⚠️ Keep the equal-length rule anyway — not because examinees exploit it, but because it defends against *item-writer laziness*, which is a very live failure mode for an LLM that pads the key with qualifiers.

*The gap that matters here:* the two rules that make a distractor diagnostic — plausibility (#29) and "use typical student errors" (#30) — have 96% and 70% endorsement and **essentially no research**. Haladyna: plausibility is "long overdue for study." The usable evidence comes from concept inventories and formative assessment, not psychometrics.

**Number of options — Rodriguez 2005**, meta-analysis, 56 trials, 80 years:

| Change | Difficulty | Discrimination | Reliability |
|---|---|---|---|
| 5→3 | +.070 easier | −.004 (ns) | −.016 (ns) |
| **4→3** | +.044 easier | **+.031** | **+.019** |

Three options is optimal. **The precondition everyone drops:** deleting an *ineffective* distractor costs reliability +.006 (nil); deleting a *random* one costs −.059. So the finding is really "a non-functioning fourth option is worthless" — not "never use four."

Base rates on how rarely options function: only **3% of 5-option items** have all options working (Wakefield 1958); the modal number of effective distractors per item is **one** (Haladyna & Downing 1993). And items with more effective distractors discriminate better — which is the whole reason to bother.

Rodriguez's own carve-out, written for exactly this use case: *"In some contexts, distractors can provide diagnostic information where distractors are coded to map to common misconceptions. In such cases, more distractors may be needed."*

**Barton's Golden Rule 5** (from *How I Wish I'd Taught Maths*): an item must not be answerable correctly while still holding the misconception. He calls it "the big one… the hardest skill to get right, but also the most important."

**Wylie & Wiliam 2006** (ETS) state the same in measurement terms: *"it is more important that the key is interpretable than it is that the distractors are interpretable… false positives are more serious than false negatives."*

---

## 5. Three-tier diagnosis and confidence

**Kirbulut & Geban 2014** — adding tiers raises reliability monotonically: **α = .61 (answer only) → .70 (+ reason) → .78 (+ confidence)**.

Their Table 4, the datum that justifies the whole three-tier design:
- **10.7% of "correct" answers were right for the wrong reason** (peaking at **54.9%** on one item). A single-tier quiz scores every one of those as mastery.
- **38.8% of responses reflected lack of knowledge, not misconception.** No single- or two-tier test can separate these — and they need opposite remediation.

**Gardner-Medwin (UCL, certainty-based marking):** α .873 → .925 with confidence weighting; chance variance in scores dropped 14.6% → 8.1%. His framing: *"a lucky guess is not knowledge, and a firm misconception is far worse than acknowledged ignorance."*

⚠️ Risk: any scheme that *rewards* high confidence must be a proper scoring rule or honest reporting stops being optimal. Since this system doesn't grade, the incentive problem evaporates — **provided no gamification/streak layer is ever added that rewards confidence.**

---

## 6. Misconceptions and conceptual change

**Posner et al. 1982** — four conditions for accommodation: **dissatisfaction** with the existing conception, then intelligibility, plausibility, fruitfulness.

→ Making the learner commit to an answer *before* correcting is what manufactures dissatisfaction. Explaining the correct model without first eliciting a commitment skips condition 1 — this is precisely the "layering a fact on top" failure.

**Refutation texts — Schroeder & Kucera 2022**, 44 comparisons, n=3,869: **g = 0.41**, robust across contexts. This is the most trustworthy single number in this document. (A broader conceptual-change meta-analysis reports g = 1.10, but with I² = 84.8%, 147/218 studies from one country, and quasi-experiments at 1.23 vs true experiments at **0.64**. Plan around 0.41.)

Mechanism (KReC): revision requires the wrong and right representations **co-active in memory**. Plain exposition lets the correct account be filed alongside the misconception without ever contacting it.

**van Loon et al. 2015** — the routing rule: **high-confidence misconceptions were corrected more often after refutation than after standard text; low-confidence ones showed no such benefit.** This is the hypercorrection effect. Confidence must therefore select the remediation strategy.

**Chinn & Brewer 1993** — seven responses to anomalous data: ignore, reject, declare irrelevant, hold in abeyance, reinterpret, peripheral change, or genuine theory change. **Six of seven leave the misconception intact.** Cognitive conflict is not self-executing.

**Limón 2001** — most classroom conflict fails because the learner doesn't perceive the anomaly *as* anomalous. Conflict not recognized as conflict just gets assimilated.

**diSessa (knowledge in pieces)** — misconceptions often aren't coherent theories but *p-prims*: intuitions correct in some contexts and misapplied here. "Closer means stronger" is right for inverse-square laws. → Look for the productive core; cognitive bridging (g = 1.06) is about as effective as conflict (g = 1.10).

**Context-indexing** — FCI evidence: *"students who appear to have acquired a Newtonian understanding of linear motion will revert to their common sense beliefs when first confronting rotational motion."* A misconception is not a stable trait. Re-probe in a structurally different context before declaring it fixed.

**Chi — emergent processes**: misconceptions are most robust when a concept is assigned to the wrong ontological kind (electricity, heat, diffusion, natural selection are *emergent* but get treated as *direct* processes). Expect these to survive a single good explanation.

---

## 7. Spacing

**Cepeda et al. 2008**, N > 1,350 — optimal gap grows with retention interval, but the *ratio declines*:

| Retention interval | Optimal gap | Ratio |
|---|---|---|
| 7 days | 1 day | ~14% |
| 35 days | 11 days | ~31% |
| 70 days | 21 days | 30% |
| 350 days | 21–23 days | **~6%** |

Magnitude vs zero gap: **+64% final recall, d = 1.1.**

⚠️ The popular "gap = 10–20% of retention interval" is a flattening of a curve that actually runs ~30% → ~6%. There is no single ratio.

**Spacing vs massing: g = 0.74** (Latimier et al. 2021) — one of the two largest levers available. Dunlosky et al. 2013 rate distributed practice and practice testing as the **only two high-utility techniques** of ten reviewed.

**Expanding vs uniform intervals: g = 0.034, ns** (Latimier, 54 effects); Cepeda 2006 found 62.0% vs 58.6%, p = .61. ⚠️ **The most oversold idea in consumer spaced repetition.** Don't build an expansion algorithm. Uniform gaps scaled to the horizon are fine.

---

## 8. Interleaving — narrower than advertised

**Brunmair & Richter 2019**, 59 studies, 238 effects. Overall g = 0.42, but:

| Material | g |
|---|---|
| Paintings | 0.67 |
| Photographs | 0.35 |
| Math tasks | 0.34 |
| **Expository texts** | **ns** |
| **Words** | **−0.39 (blocking WINS)** |

Mechanism is discriminative contrast: it works when between-category similarity is high. Authors: *"interleaved learning should be used with caution… especially for expository texts and words."*

Strongest positive evidence is procedural math — Rohrer et al. 2019 RCT, 54 classes, unannounced test one month later: **61% vs 38%, d = 0.83**.

→ Interleave only when you can name the confusion being trained against. Interleaving unrelated topics is unsupported and for verbal material was **net negative**.

---

## 9. Transfer — the biggest caveat in this document

**Pan & Rickard 2018**, 192 effect sizes, N = 10,382. Overall d = 0.40, but:

| Transfer type | d | sig |
|---|---|---|
| Across test formats | 0.58 | ✓ |
| **Application & inference** | **0.32** | ✓ |
| Problem-solving skills | 0.29 | **ns** |
| Rearranged stimulus–response | 0.22 | **ns** |
| **Untested material seen during study** | **0.16** | **ns** |

Two moderators do the work: response congruency (+0.35) and elaborated retrieval (+0.22). Both present → d = 0.78. Neither → d = 0.21.

⚠️ **Under publication-bias correction the moderators survive but the intercept drops to ~zero.** Pan & Rickard: *"often indicating no positive transfer when none of the aforementioned moderators are present."*

**Translation: retrieval practice strengthens what you practice. It does not meaningfully spread to what you don't.** Corroborated by pretesting meta-analyses (prequestioned content g = 0.54–0.66; non-prequestioned **g = 0.01–0.04**).

→ Coverage of the dependency graph is a first-order design concern. An unquizzed node is an untested node.

**On the flagship conceptual-understanding result:** Karpicke & Blunt 2011 (*Science*, retrieval beats concept mapping, d = 1.50) replicated in the Social Sciences Replication Project — but a re-examination found the retrieval condition got an **extra 5 minutes** plus different instructions. Equalizing those: **M = 0.73 vs 0.70, p = .854 — advantage gone.** Relatedly, Pyc & Rawson 2010's mediator-effectiveness mechanism **failed to replicate**.

---

## 10. Pretesting / guessing before instruction

| | Prequestioned | Non-prequestioned |
|---|---|---|
| St. Hilaire et al. 2023 | g = 0.54 | g = 0.04 |
| King-Shepard et al. 2025 | g = 0.66 | g = 0.01 |

Conditions (Metcalfe 2017): feedback mandatory; the guess must be **related** to the target — Huelser & Metcalfe found **no benefit with unrelated pairs**, and Kang et al. found nothing when learners had no idea at all. *"To be beneficial, the guess needs to be somewhat informed."*

⚠️ **Learners cannot detect this benefit.** Even right after a ~20-point gain, participants believed the error-free condition worked better. **Never optimize on the learner's felt sense of how well a session went.**

---

## 11. Things deliberately NOT built

- **Expanding intervals** — g = 0.034, ns.
- **Disfluent fonts / hard-to-read text** — repeated replication failures; Sans Forgetica shows no benefit or a cost.
- **Interleaving unrelated topics** — negative for verbal material.
- **Delayed feedback** — k = 6 and confounded.
- **Confidence-based scoring/streaks** — would break the honesty of the confidence tier.
- **Free-recall-only checks** — worst classroom format (g = 0.238).

---

## Sources

Rowland 2014 *Psych Bull* 140(6) · Yang, Luo, Vadillo, Yu & Shanks 2021 *Psych Bull* 147(4) · Adesope, Trevisan & Sundararajan 2017 *Rev Educ Res* · Roediger & Karpicke 2006 *Psych Sci* 17 · Little, E. Bjork, R. Bjork & Angello 2012 *Psych Sci* · Little & Bjork 2010 · Pan & Rickard 2018 *Psych Bull* 144(7) · Cepeda et al. 2006 *Psych Bull*; 2008 *Psych Sci* 19(11) · Latimier, Peyre & Ramus 2021 *Educ Psych Rev* · Brunmair & Richter 2019 *Psych Bull* · Rohrer, Dedrick, Hartwig & Cheung 2019 *J Educ Psych* · Metcalfe 2017 *Annu Rev Psych* 68 · St. Hilaire, Chan & Ahn 2023 *Psychon Bull Rev* · King-Shepard et al. 2025 *Educ Psych Rev* · Karpicke & Blunt 2011 *Science* 331 + PMC10783554 re-examination · Camerer et al. 2018 *Nat Hum Behav* · Dunlosky et al. 2013 *PSPI* · E. Bjork & R. Bjork 2011 · Haladyna, Downing & Rodriguez 2002 *Appl Meas Educ* 15(3) · Haladyna 2022 *IJATE* 9 · Rodriguez 2005 *Educ Meas* 24(2) · Barton 2018 *American Educator* · Wylie & Wiliam 2006 (ETS) · Hestenes, Wells & Swackhamer 1992 (FCI) · Kirbulut & Geban 2014 *EURASIA J Math Sci Tech Educ* 10(5) · Gardner-Medwin 2006 (CBM/LAPT, UCL) · Posner, Strike, Hewson & Gertzog 1982 *Sci Educ* 66(2) · Schroeder & Kucera 2022 *Educ Psych Rev* 34 · van Loon, Dunlosky, van Gog, van Merriënboer & de Bruin 2015 *Contemp Educ Psych* 42 · Chinn & Brewer 1993 · Limón 2001 · diSessa 2018 · Chi 2005 · Falmagne, Cosyn, Doignon & Thiéry 2003 (knowledge spaces) · Yasuda et al. 2021 *PRPER* 17; 2024 arXiv:2410.18531
