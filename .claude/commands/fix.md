---
description: Fix a specific bug using the Bug Fix workflow
---

Fix the specified bug following the Bug Fix Delivery workflow.

1. Investigate and reproduce the issue
2. Identify the root cause
3. Implement the fix
4. Work with the Tester to verify the fix with a regression test
5. Submit for QA review

Bug: $ARGUMENTS

Do NOT commit directly. Present changes for human review.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/developer.md` (delegate to the `developer` subagent if available).
- Triage level: STANDARD. Workflow: bugfix. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
