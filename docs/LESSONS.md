# Lessons Learned

> This file is a persistent episodic memory store. When an agent encounters a significant error and resolves it, the root cause and resolution are logged here. Agents SHOULD query this file before starting tasks involving similar domains.

## Format
Each entry follows this structure:

```
### [DATE] — [SHORT TITLE]
- **Domain:** (e.g., Git, Auth, Deployment, UI, Database)
- **What went wrong:** (brief description of the failure)
- **Root cause:** (why it happened)
- **Resolution:** (how it was fixed)
- **Prevention rule:** (what to do differently next time)
```

---

### 2026-08-10 — Hardcoded Secret Leaked in PR
- **Domain:** Git, Security
- **What went wrong:** The Orchestrator agent directly wrote code and committed a hardcoded API key into a Pull Request, bypassing the Developer → QA → Human pipeline.
- **Root cause:** The Orchestrator's TRIVIAL triage level allowed direct code execution and commits. Combined with context window truncation, the agent fell back to raw `git commit` instead of `commit.sh`.
- **Resolution:** Removed the TRIVIAL direct-commit loophole. Added mechanical pre-commit hooks (`gitleaks` + `DEVOS_COMMIT_APPROVED` gate). Added Hard Rules #8 and #9.
- **Prevention rule:** Orchestrator NEVER writes production code. All commits route through `commit.sh`. Pre-commit hooks mechanically block secrets.

## Missing Environment Variables Silent Catch
**Date:** 2026-09-04
**Issue:** Next.js Server Actions connecting to Prisma failed silently when the .env file was missing, because the action had a 	ry/catch that swallowed the PrismaClientInitializationError and returned a {error} object, which the UI did not display.
**Lesson:** Always verify the .env file exists and contains the correct DATABASE_URL after checking out a project or scaffolding database connections. When implementing Server Actions, ensure UI gracefully surfaces caught database connection errors instead of failing silently.

### 2026-09-07 — NextAuth Configuration Error (AUTH_SECRET)
- **Domain:** Auth
- **What went wrong:** Users hit a generic "Server Error" screen on NextAuth routes (`/api/auth/signin`).
- **Root cause:** NextAuth v5 requires the `AUTH_SECRET` environment variable to encrypt session cookies. Without it, the library immediately throws a configuration error on initialization.
- **Resolution:** Generated a 32-byte secure base64 string and appended `AUTH_SECRET="..."` to the `.env` file, followed by a local dev server restart.
- **Prevention rule:** Whenever integrating Auth.js (NextAuth), always ensure `AUTH_SECRET` is generated and configured in the environment variables immediately after scaffolding.
