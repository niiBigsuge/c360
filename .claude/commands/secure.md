---
description: Run security scan on current changes
---

Perform a security scan on the specified target.

Check for:
- OWASP Top 10 patterns
- Authentication and authorization logic flaws
- Input validation and sanitisation gaps
- Secrets and credentials exposure
- Dependency vulnerabilities (known CVEs)
- SQL injection, XSS, CSRF vectors
- File upload handling issues
- Rate limiting and abuse vectors

Target: $ARGUMENTS

Return a risk report with severity levels: CRITICAL, HIGH, MEDIUM, LOW, INFO.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/security.md` (delegate to the `security` subagent if available).
- Triage level: STANDARD. Workflow: direct. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
