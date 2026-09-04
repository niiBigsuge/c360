---
description: Stage and commit changes through the Dev-OS commit gate
---

Prepare and execute a commit through `.agents/scripts/commit.sh`.

1. Run `git status` to show current changes
2. Stage the relevant files based on: $ARGUMENTS
3. Execute `.agents/scripts/commit.sh` for human-approved conventional commit

NEVER run raw `git commit`. Always use `commit.sh`.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/developer.md` (delegate to the `developer` subagent if available).
- Triage level: TRIVIAL. Workflow: direct. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
