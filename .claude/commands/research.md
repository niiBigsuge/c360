---
description: Deep research on a library, API, or technical topic
---

Conduct thorough research on the specified topic.

1. Search official documentation, changelogs, and GitHub issues
2. Verify version compatibility with our current stack
3. Check for known security issues or CVEs
4. Surface deprecations and breaking changes
5. Provide a clear recommendation with sources

Topic: $ARGUMENTS

Never write code — only report findings with linked sources.

## Dev-OS Routing

- Adopt the persona defined in `.agents/agents/researcher.md` (delegate to the `researcher` subagent if available).
- Triage level: TRIVIAL. Workflow: direct. Follow the matching protocol in `.agents/AGENTS.md`.
- Honor all Hard Rules in `.agents/AGENTS.md`, including the mechanical commit gate (`.agents/scripts/commit.sh`).
