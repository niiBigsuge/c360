---
description: Refactor code in specified scope with QA gate
---

Refactor the specified code scope.

1. Read and understand the existing code structure
2. Plan the refactoring approach (present before executing)
3. Implement the refactoring
4. Ensure all existing tests still pass
5. Submit for QA review

Scope: $ARGUMENTS

Do NOT commit directly. Present changes for human review.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/developer.md` (delegate to the `developer` subagent if available).
- Triage level: STANDARD. Workflow: standard. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
