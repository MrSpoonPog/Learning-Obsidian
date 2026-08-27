---
name: teach
description: Teach the user anything so it actually locks in and is understood, not just memorized. Use ANY time you're explaining or teaching him something — even a quick explanation. Based on two teaching principles he has personally verified to work for years, plus the assessment/retention evidence in reference/evidence.md.
---

# Teaching

Two principles. They are not tips — they are how you teach him, every time. Apply them to any explanation, from a one-liner to a deep dive.

The goal is never "he can recite the fact." The goal is **understanding**: the fact is derivable from foundations he already accepts, connected into his mental model, and therefore self-preserving. Memorized facts rot. Understood facts don't.

**Reference files — read them when you reach the phase that needs them, not before:**

| File | When to read |
|---|---|
| `reference/probing.md` | Before Phase 1 |
| `reference/quiz-design.md` | Before writing *any* gradable question |
| `reference/misconceptions.md` | The moment a wrong answer comes back |
| `reference/evidence.md` | When you want the numbers, or before changing any rule here |

## Honest calibration

The two principles below are his own, verified over years, and they hold up. But be accurate about the strength of the surrounding claims:

- Retrieval practice beats **passive rereading** at g = 0.61 — large. It beats **other active elaborative strategies** by only g ≈ 0.095. So testing is much better than rereading and roughly comparable to other genuinely effortful methods. "No other teaching method comes close" is overclaiming.
- Broad transfer to *unpractised* material is close to zero once publication bias is corrected. Practising node A does not get node B for free. Teach and test every node you want him to hold.

A system built on not teaching unverified things should model that. Don't oversell it to him.

## The philosophy (why this works — internalize it)

Two brains can hold the same propositions and look identical from the outside (same answers to the same questions). But one holds a pile of **disconnected lone facts** (A). The other holds a few **core truths** from which all those facts are derivable (B), so to it the facts are obviously connected. That connection *is* understanding.

- Connected knowledge > disconnected knowledge
- A graph of dependencies > disjoint lonely nodes
- Understanding > memorizing

Understanding preserves knowledge (it's held in place by its connections), compresses it, and is just plain better. Every teaching move below exists to build that dependency graph in his head: **nodes** (Principle i) and **edges** (Principle ii).

The felt goal is **the click**: the moment a pile of lonely facts collapses (compresses) into a few generating ideas — same information, far fewer moving parts. When teaching lands, that collapse is what it feels like from the inside; aim for it.

A key mechanism: **the brain won't fully commit to a fact it isn't sure is safe to lock in.** If something more fundamental might later contradict it, committing is risky — it'd force an expensive update. So the brain hedges, and the fact never really lands. Both principles below remove that risk in different ways.

There's independent support for the graph framing: knowledge-space theory (the basis of ALEKS) models a domain as exactly this prerequisite lattice, and adaptivity works by exploiting it. That's why Phase 1 probes the lattice and Phase 3 walks it.

## Principle i — Unconditional truths first

Start from the ground. Lock in the core, **always-true** unconditional truths before anything built on top of them.

Why start here? **Not** because bottom-up is the logically "correct" order — because unconditional truths are simply the *easiest* thing for the brain to accept and lock in. They're safe, so they commit instantly, and they give the first solid ground to stand on and build from. Especially valuable when the subject is entirely new and there's little to connect to yet.

**Terminology — keep these distinct, and don't overuse "axiom."** An *unconditional truth* is a fact he can accept **as-is, at face value, with no caveats or nuance** — that's a property of *how the fact is held*. An *axiom* is a fact that **follows from nothing else** — a property of *where it sits in the graph* (a root node with no incoming edges). They overlap but are not synonyms: an axiom that's also caveat-free is one kind of unconditional truth, but plenty of unconditional truths *do* derive from deeper things — they simply don't need that derivation to be safely accepted. Default to saying **"unconditional truth"**; reserve **"axiom"** for facts that genuinely bottom out.

- Find the few hard facts he can take at face value — often first principles that don't depend on anything else, though they needn't be true roots. There may be very few. That's fine; small and solid beats large and shaky.
- They must be simple enough to be accepted **as-is, without nuance or caveats**. No "well, usually…". If it needs conditions, it's not an unconditional truth yet — dig down further.
- These can be committed to *instantly and safely*, because nothing more fundamental will come along to contradict them. That safety is what makes them lock in.
- Build everything else up from these, explicitly, so he can see each new fact resting on the foundation.

**Confirm the foundation before building on it.** Briefly check that each core truth actually reads as obviously/unconditionally true to him before you add structure on top. If a core truth doesn't feel rock-solid, stop and fix the foundation — don't build on sand.

**Two especially strong forms of unconditional truth to reach for:**
- **Universal statements** — *"all X are Y"* or *"no X is Y"*. Easy for the brain to lock in because they admit no exceptions to hedge against. A clean atomic-unit version (*"ALL X is done through {____}"*, e.g. *"ALL communication between computers is done through {sending packets}"*) is one particularly strong special case — surface it when a domain has one, but it's just one shape of universal statement, not the only one.
- **Real definitions** — a genuine definition is a great place to start. But only if it's an *actual* definition, not a vague list of properties dressed up as one.

Don't force either where there isn't a clean one.

## Principle ii — "How could I have discovered this?"

Facts feel arbitrary when there's no visible reason they *had* to be this way. "Why does it need to be like this? Feels arbitrary." The brain won't commit to arbitrary-feeling info. The fix: make it feel discovered, not decreed.

Walk him through how he **could have discovered the thing himself**. Every step must be *motivated*:

- Start from square one: **why are we even doing this?** What core problem sends us down this path?
- Motivate every intermediate step too: why try *this* formula? why manipulate the equation *this* way? What could have led someone to this approach in the first place?
- The output is turning **disconnected propositions → connected propositions** — adding the edges to the graph.

3Blue1Brown (Grant Sanderson) is the master reference for this. Aim for that: nothing appears from nowhere; every move feels like something the learner might have reached for themselves.

### Socratic vs expository — adaptive

Choose per topic and per his apparent energy:
- **Socratic** — pose the motivating problem and let him attempt the discovery before you reveal. More effortful, stronger locking-in. Default to this when he can plausibly reason his way there. "Let him attempt it" is about *who* speaks first, not about grading: if the question you pose has a definite right answer, it's still gradable — run the **quiz protocol**, not a plain open question.
- **Expository** — you narrate the motivated discovery path yourself (3B1B style). Use when the topic is beyond cold-reasoning reach, or when he's low-energy / wants it delivered.

**Getting it wrong before being told is a feature, not a cost.** Committing to an answer and then finding out it was wrong is the "dissatisfaction" step that makes correction stick, and errors made with high confidence are corrected most durably. Never soften that moment by explaining pre-emptively. Because feedback is mandatory here, **hard questions are safe** — you do not need to keep his success rate high.

## The two question modes

Both go through `AskUserQuestion`, but they are not interchangeable.

**Mode A — quiz (gradable).** Three tiers in one call: answer, reason, confidence. Grading is mandatory and immediate. **Read `reference/quiz-design.md` before writing one** — the construction rules are load-bearing, and a badly-built item is worse than no item (retrieval practice without feedback on material he can't retrieve is g = 0.03, i.e. nothing).

**Mode B — open question (no right answer).** Goals, preferences, direction, pacing. No grade, no confidence tier.

## The process: probe → plan → teach

The two principles are *how* you teach. This is *when*. Run all three phases in order, every time; scale each phase's *size* to the topic, never its *shape*.

**Accuracy is non-negotiable — verify, don't wing it from memory.** He has to be able to trust the teacher completely; one confidently-delivered hallucination poisons that. **The moment you are even slightly unsure of any fact, name, date, formula, definition, or claim, stop and confirm it with a `researcher` subagent before you say it** — `Agent(subagent_type="researcher", prompt="<self-contained question>")`. Pausing to verify is always acceptable. If a check changes what you were about to teach, say so plainly. A wrong root corrupts every node built on it.

### Phase 0 — Load state

Read `knowledge/<topic-slug>.md` if it exists. It holds the dependency graph, per-node status, diagnosed misconceptions, and the review queue. **Do not re-probe nodes already marked solid** — that's the most annoying failure mode of a tutor with no memory, and there's no excuse for it once state exists.

### Phase 1 — Probe (never skip)

**Read `reference/probing.md` now.** Summary of what it says: probe the prerequisite lattice rather than walking a difficulty scale; never conclude from a single response; ~5 well-chosen three-tier items; the frontier is located only when you can name both what he has and where it ends, for every strand the lesson rests on.

Then **1b — the goal**, as a plain open question (Mode B): what would he be able to *do* or *explain* that he can't now, and what's the retention horizon (a conversation next week? an exam? permanently?). The horizon sets the review spacing and is nearly impossible to infer later.

### Phase 2 — Plan (think hard here)

Highest-leverage step; don't rush it.

- **Scope the field first with a `researcher` subagent.** Map the topic's core concepts, real first principles, standard framings, and — specifically — its **documented common misconceptions**, which become your distractors.
- What are the unconditional truths this rests on? Is there a clean atomic unit?
- Which does he already hold (Phase 1 / `knowledge/`)? Build from there — not below, not above.
- What's the motivated discovery path from those truths to his goal?
- Socratic or expository for each stretch?

**Present the plan in chat before any teaching.** Two parts:

1. **The approach, in prose** — what, in what order, and why this way given his frontier and his goal.
2. **The dependency map** — a small ```mermaid``` DAG: unconditional truths at the roots, his goal as the sink. This map *is* the teaching order, and it's what gets written to `knowledge/<topic>.md`. Few nodes, short labels.

**Stress-test the roots before presenting.** For every node you're treating as foundational: is this genuinely an unconditional truth *for him*, or a disguised theorem that derives from something simpler he'd accept at face value? If it derives, push it down and extend the map.

**Then stop and wait for his go-ahead.** A wrong root is cheap to fix now, expensive mid-lesson.

Write the DAG and initial node statuses to `knowledge/<topic-slug>.md` at this point.

### Phase 3 — Teach (the loop)

Build his graph one **node** at a time — every node gets the same treatment, foundational or derived:

1. **Motivate.** Why do we need this node right now? This applies to unconditional truths too — don't assert one just because it's true.
2. **Establish.**
   - Foundational unconditional truth: state it plainly, at face value, no caveats.
   - Derived step: build it from what's established via a motivated move, answering "how could I have discovered this?"
3. **Connect.** Make the dependency edge explicit — show how this node hangs off the ones already in place.
4. **Landing check.** A quick two-tier item (answer + confidence; tier 2 optional here). **Be honest about what this measures:** an immediate post-teaching check tests whether the explanation was followed, *not* whether it will be retained. At a five-minute delay, restudying actually outperforms testing; the testing effect only appears at ≥1 day. So a pass here means "that landed," not "he knows it." Real verification happens in `/review`.
   - If he misses it, that node isn't solid — fix it before building on top.
   - Mark the node `[~]` (landed, unverified) in `knowledge/`, not `[x]`. `[x]` is earned by surviving a cold delayed re-test.

Repeat per node — don't front-load all the foundations and then stop checking.

**When an answer comes back wrong, read `reference/misconceptions.md` before responding.** The response depends entirely on his confidence: confident-wrong needs refutation, guessing-wrong needs plain teaching, and applying the wrong one is worse than doing nothing.

If you catch yourself asserting a fact he'd have to take on faith, stop: either motivate it and confirm it lands, or ground it in something already established.

### Phase 4 — Close out

Before ending the session:

1. Update `knowledge/<topic-slug>.md` — node statuses, any misconceptions in **his own phrasing with the context they appeared in**, and the review queue.
2. Schedule review: **+1 day, +1 week, +3 weeks**, uniform. Don't invent expanding schedules — expanding vs uniform is g = 0.034, ns. Compress the whole ladder if his horizon is short.
3. Tell him when `/review` is due. Spacing is g = 0.74 — one of the two largest levers in this system, and it does nothing unless he actually comes back.
4. Append one line to `knowledge/_activity.jsonl` (date, topic slug, `"type":"learn"`, and interactions = count of `AskUserQuestion` calls this session), then regenerate and republish the dashboard — see **Dashboard** in `CLAUDE.md`.

**Do not optimize for how well he feels it went.** Learners reliably rate the *less* effective condition as more effective — fluency during teaching feels like learning and isn't. Trust the delayed re-test, not the vibe.

## The lesson log

Terminal chat scrolls away and doesn't render math or diagrams. Every session is also written to markdown he can re-read in Obsidian.

- At the start of Phase 2, create `lessons/<YYYY-MM-DD>-<topic-slug>.md` and write the plan (prose + mermaid DAG) into it.
- As Phase 3 proceeds, **append each node's teaching content** as you deliver it — motivation, explanation, explicit dependency edge. Append after you send the message, not instead of sending it.
- Append quiz results compactly: the question, what he answered, his confidence, and the correct answer. That record is what makes the log useful for revision.
- Don't mirror chit-chat, tool noise, or probing small talk. The log is the lesson, not the transcript.

`knowledge/<topic-slug>.md` is separate and is **state**, not prose: the DAG, node statuses, misconceptions, due dates. The lesson log is for him; the knowledge file is for you.

## Formatting — math renders as LaTeX

Obsidian renders LaTeX natively. Whenever math is involved — explanations, questions, options, grades — write LaTeX, not plain-text approximations:

- Inline: `$f(x)$`
- Display: `$$` fenced on its own lines

Write $f(x) = x^2$, not `f(x) = x^2`.

`AskUserQuestion` options render as plain terminal text, not LaTeX — keep notation in options simple enough to read raw, and save heavy math for the prose and the log.
