---
name: visualize
description: "Add a correct, minimal visual to a lesson — a diagram or geometric picture — that renders inline in the lesson log. Use when an idea is genuinely clearer as a picture: a dependency graph, system/flow, sequence, state machine, tree, comparison, or a spatial/geometric thing (coordinate geometry, number line, vectors, a plot, a physical layout). Outsources authoring+rendering to a maker subagent that verifies the image by looking at it, then you embed the returned file."
---

# Visualize

A picture earns its place only when it shows something words can't — shape, structure, direction, relationship, geometry. This skill produces ONE such picture, guarantees it is **correct** (the maker renders it and looks at it before returning), and drops it into the lesson log so it renders inline.

You are the **creative director**. You decide the exact idea and distill it to its fewest carrying elements. A **maker subagent** does the authoring, rendering, visual verification, and saving, then returns a filename. You embed that filename in the lesson log.

## When to visualize (and when not to)

This teaching system builds a **dependency graph in the learner's head** — axioms at the root, derived facts hanging off them. A visual is powerful exactly when it makes that structure (or a geometry) visible. Reach for one when:

- The idea is a **structure or relationship**: dependencies, a system with parts and arrows, a flow/pipeline, a sequence of exchanges, a state machine, a tree/hierarchy, a comparison, a containment (what's inside vs outside).
- The idea is **spatial or geometric**: coordinate geometry, a number line, vectors, a function's shape, a physical arrangement.

Do NOT visualize when prose or a single equation already carries it. A decorative diagram that just restates the sentence next to it adds noise and a chance to be wrong. When in doubt, don't — a missing visual is cheaper than a false one.

**A note on cost:** each maker call spins up a headless browser and iterates, so it takes a while. That's a feature — it's what buys correctness — but it means you should reserve visuals for the two or three moments in a lesson where a picture genuinely carries the idea, not sprinkle them.

## Choose the maker

- **`mermaid-maker`** — structural/relational visuals: dependency graphs, flowcharts, sequence/state/ER/class diagrams, trees, mindmaps, timelines. This is the default and fits the dependency-graph pedagogy directly.
- **`svg-maker`** — spatial/geometric visuals Mermaid can't lay out: exact coordinates, geometry figures, number lines, vectors, plots, custom shapes.

Rule of thumb: if it's *nodes-and-edges / relationships*, use mermaid-maker. If it's *positions-and-shapes / geometry*, use svg-maker.

## Brief the maker well: one idea, fewest elements

The most common failure is **cramming** — every extra label makes the picture harder to read AND harder to lay out correctly. Before briefing, prune to the fewest elements that carry the idea, and for each ask: *"if I delete this, is the idea still clear?"* If yes, delete it.

Give the maker the concept AND the concrete elements you want — not a vague topic, and not a long checklist.

- BAD: "make a diagram about how TCP works"
- GOOD: "graph TD: a node 'packet' at the top; arrows down to 'ordering' and 'retransmit on loss'; both arrows down into 'reliable stream'. No title. Show that reliability is built FROM packets, not alongside them."

Keep the idea intact but trust the maker to compose; if your brief lists more than ~5–7 elements, cut it first.

## Invoke

Dispatch the maker with the `Agent` tool:

```
Agent(subagent_type="mermaid-maker", prompt="<your minimal, concrete brief>")
Agent(subagent_type="svg-maker",     prompt="<your minimal, concrete brief>")
```

The maker owns the render toolchain — it authors the source, renders it to a PNG, **looks at the PNG and iterates until it is correct and clean**, publishes it into the project's `viz/` folder with a unique filename, and returns:

```
RESULT:
filename: viz-<slug>-<timestamp>.png
path: <absolute path>
```

If it returns `RESULT: NONE`, it couldn't make a correct picture of the brief — simplify or rethink, or decide the visual isn't worth it. Never hand-author or fake a diagram yourself; correctness depends on the maker's render-and-inspect loop.

## Embed it in the lesson

The terminal can't display images, so the visual lands in the **lesson log** (`lessons/<date>-<topic>.md`), not the chat reply. Write the embed there with the returned **filename** and a display width:

```
![[viz-<slug>-<timestamp>.png|500]]
```

That's Obsidian's wikilink embed — it resolves by filename anywhere in the vault, and `viz/` sits inside the project, so it renders inline. If the log is read outside Obsidian, use standard markdown instead: `![](../viz/viz-<slug>-<timestamp>.png)`.

In the chat reply, just say a picture has been added and name the idea it carries. Introduce the visual in a sentence, then let it carry the idea — don't narrate every element back in prose.

## Why this is reliable

- The maker never returns a picture it hasn't **looked at**, so "renders fine but says something false" is caught before it reaches the learner.
- PNG embed means **what the maker verified is pixel-identical to what the learner sees** — no re-render drift.
- Unique filenames keep by-filename embed resolution unambiguous.

> Rendering runs through `.claude/tools/visual/`: Mermaid via a local `@mermaid-js/mermaid-cli` and a puppeteer-managed Chrome; SVG via `svg2png.mjs`, which screenshots the SVG through that same Chrome. You don't render anything yourself — you only brief the maker and embed the filename it returns.
