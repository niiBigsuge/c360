---
description: Run project inception and requirements grilling
---

Run the project inception process using `.agents/skills/grill-me/SKILL.md`.

1. Take the project idea and grill it for constraints, edge cases, and requirements
2. Extrapolate technical and non-technical needs
3. Generate `docs/PROJECT_REQUIREMENTS.md`
4. Present for HUMAN CHECKPOINT review

Project idea: $ARGUMENTS

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/architect.md` (delegate to the `architect` subagent if available).
- Triage level: STANDARD. Workflow: inception. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
