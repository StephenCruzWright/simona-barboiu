# Lessons Index

Each entry is a one-line link to a finalized post-mortem. Newest at the top. Append on each project's Phase 9 close.

> **See also:** [docs/LESSONS-LEARNED.md](../LESSONS-LEARNED.md) is the
> **stack-wide** gotcha log — recurring lessons here get promoted up
> to it or into pre-baked configs.

## Format

```text
- [<client-slug>](<client-slug>-<YYYY-MM-DD>.md) — one-line takeaway
```

## How the lessons loop works

1. **During the project**, append every incident to [`draft.md`](draft.md) the moment it happens. Don't wait — root causes get fuzzy fast.
2. **At project end** (Phase 9 close), promote the draft to `<client-slug>-<YYYY-MM-DD>.md` using [`POSTMORTEM-TEMPLATE.md`](POSTMORTEM-TEMPLATE.md). Sanitize: strip client-confidential details (names, URLs, credentials) before merging.
3. **Append the new post-mortem to this index** (one line, top of the list below).
4. **Cross-project distillation:** when you read this index for a new project, scan for any lesson that recurs in 3+ post-mortems. Recurring patterns earn promotion into:
   - the starter's pre-baked configs (preferred — fix it once, all future projects benefit)
   - the SOP doc (next-preferred — captures the *why*)
   - `AGENTS.md` § "Do Not" or `docs/STACK-OVERVIEW.md` (last resort)

## Entries

<!-- Newest at the top. -->

<!-- Seed: starter has no prior projects yet. First entry lands when the first cloned project closes Phase 9. -->
