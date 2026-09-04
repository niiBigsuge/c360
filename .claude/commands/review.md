---
description: Run QA code review on current changes
---

Review the current code changes against our project coding standards.

Focus areas:
- Security vulnerabilities and forbidden patterns
- Missing or inadequate tests
- Hardcoded secrets or credentials
- TypeScript type safety (no `any` bypasses)
- TODOs without linked issues
- Code matches conventions in the project's stack standards

Target: $ARGUMENTS

Return a structured verdict: **APPROVED** or **CHANGES REQUESTED** with numbered items.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/qa.md` (delegate to the `qa` subagent if available).
- Triage level: STANDARD. Workflow: direct. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
