---
description: Start or resume a teaching session on a topic
argument-hint: <topic>
---

Start a teaching session on: **$ARGUMENTS**

Follow the `teach` skill (`.claude/skills/teach/SKILL.md`) in full. Before anything else:

1. Slugify the topic and check whether `knowledge/<topic-slug>.md` exists.
   - **If it exists**, read it. Report back in one or two lines: what's already solid, what's outstanding, and what's due for review. Then resume from the recorded frontier. **Do not re-probe nodes marked `[x]`.** If several nodes are overdue, offer to run `/review` on them first — reviewing due material beats piling new material on top of decaying material.
   - **If it doesn't exist**, this is a fresh topic. Run Phase 1 from scratch.
2. Then continue through the skill's phases in order: probe → goal → plan (present it and wait for go-ahead) → teach the loop → close out.

Don't skip the plan checkpoint, and don't start teaching before he's approved the dependency map.
