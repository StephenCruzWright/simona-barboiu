# Post-Mortem Template

> Copy this file to `<client-slug>-<YYYY-MM-DD>.md` at Phase 9 close. Fill every section. Sanitize per the checklist before merging to the starter.

---

# Post-Mortem — `<Client / Project Name>` (`<YYYY-MM-DD>`)

## Stack as built

Actual versions of the stack at launch — confirms what worked, surfaces drift from the starter defaults.

| Layer | Version |
| --- | --- |
| Astro | `<x.y.z>` |
| Tailwind CSS | `<x.y.z>` |
| Preact | `<x.y.z>` |
| Node | `<x.y.z>` |
| Package manager | `<npm \| pnpm \| yarn \| bun>` |
| Vercel adapter | `<x.y.z>` |
| Other key integrations | `<list>` |

## Deviations from starter defaults

For each line of the sanctioned tooling stack that this project did **not** use as shipped, document the swap and the reason. Empty section is best — it means the starter held up.

| Default | What was used instead | Why |
| --- | --- | --- |
| | | |

## Incidents

Cleaned-up entries from `draft.md`, deduplicated. Order: most-impactful first.

### 1. `<one-line title>`

**What broke:**
**Root cause:**
**Fix applied:**
**Takeaway:**

### 2. `<one-line title>`

**What broke:**
**Root cause:**
**Fix applied:**
**Takeaway:**

<!-- Add as many as needed. -->

## Recommendations for the starter

Concrete changes this project earned. Each one is a candidate PR against the starter template repo (not this client repo).

- **`<config-file or doc>`** — `<one-line change>`. Reason: `<which incident or which insight>`.
- ...

If a recommendation has shown up in 3+ prior post-mortems, flag it as a **promotion candidate** for the SOP gotchas appendix or pre-baked starter configs.

## Sanitization checklist

Before merging this post-mortem to the starter template repo, confirm:

- [ ] No specific client / business names in titles, headings, or prose
- [ ] No production URLs, hostnames, or domain names beyond `example.com`
- [ ] No credentials, tokens, API keys, or environment-variable values
- [ ] No internal financial figures, contract terms, or confidential commercial details
- [ ] Technical content (root causes, fixes, takeaways) preserved verbatim — that's what's worth sharing

If any item is incomplete, keep the un-sanitized post-mortem in the client repo only and don't merge to the starter.
