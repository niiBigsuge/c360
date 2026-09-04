---
description: Write and run tests for specified code
---

Write and execute tests for the specified target.

1. Read the target code to understand its behavior
2. Write tests covering: happy path, edge cases, and failure states
3. Run the test suite and report results
4. If tests fail, report failures to the Developer — do NOT fix the code yourself

Target: $ARGUMENTS

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/tester.md` (delegate to the `tester` subagent if available).
- Triage level: STANDARD. Workflow: direct. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
