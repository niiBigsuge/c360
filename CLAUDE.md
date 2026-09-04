<!-- BEGIN DEV-OS -->
## Dev-OS — Multi-Agent Engineering OS

This project uses Dev-OS by Olives Technologies.

### Hard Rules Digest (Must be strictly obeyed at all times)
1. Zero Destructive Actions: Never delete, drop, or truncate without an approved dry-run plan.
2. Zero Secrets Stored or Logged: API keys & credentials must NEVER be hardcoded. Use `process.env.*`.
3. Mechanical Commit Gate: Raw `git commit` is BLOCKED. Always commit via `.agents/scripts/commit.sh`.
4. Staged Review: Agents write code but NEVER auto-commit. Present summaries for human review first.
5. Circuit Breaker: Halt after 3 failed agent loop iterations and escalate to the human.
6. Verify Before Implementing: Confirm actual library APIs and patterns before authoring code.
7. No Heavy Dependencies: Packages >5MB or >50 dependencies require explicit human approval.
8. Documentation in /docs: All plans, PRDs, architecture notes, and reports belong in `/docs/`.
9. Session-Start Freshness: Run `git fetch --all --prune` and check `git status -sb` before scoping work.
10. Session-End State Obligation: Update `docs/CURRENT_STATE.md` before concluding any session modifying code.

### Solo Session Protocol (Single-Agent Work)
- Step 1: Check freshness via `git fetch --all --prune` and `git status -sb`.
- Step 2: Implement following `CODING_STANDARDS.md`.
- Step 3: Self-verify with typecheck (`tsc --noEmit` or equivalent) and automated tests.
- Step 4: Present staged review summary to human.
- Step 5: Route commit through `.agents/scripts/commit.sh`.
- Step 6: Update `docs/CURRENT_STATE.md` and log incidents in `docs/LESSONS.md`.
- Escalation: DB schema changes (DBA), security alterations (Security), or loops exceeding 3 attempts must escalate to human.

### Tooling & Personas
- Slash commands: `.claude/commands/` (generated from `.agents/commands/` — refresh with `devos update`).
- Agent personas: `.claude/agents/` (generated from `.agents/agents/`).
- Coding standards: `CODING_STANDARDS.md`.
- Master roster & full rules: `.agents/AGENTS.md`.
<!-- END DEV-OS -->
