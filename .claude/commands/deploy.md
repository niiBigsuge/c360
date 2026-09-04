---
description: Prepare deployment plan and run checklist
---

Prepare a deployment plan for the specified target.

1. Run the deployment checklist from `.agents/skills/deployment-checklist/SKILL.md`
2. Verify all tests pass and QA has approved
3. Prepare the deployment plan — do NOT execute without Human approval
4. Present the plan for HUMAN CHECKPOINT

Target: $ARGUMENTS

NEVER deploy to production without explicit Human approval.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/devops.md` (delegate to the `devops` subagent if available).
- Triage level: CRITICAL. Workflow: direct. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
