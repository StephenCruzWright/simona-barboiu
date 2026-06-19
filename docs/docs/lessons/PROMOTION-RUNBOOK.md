# Lesson Promotion Runbook

The mechanism for taking lessons learned on a client project and bringing them **back to this starter template** so the next clone benefits.

This is the "transferable back" piece of the lessons loop. The per-project loop (incident → draft → finalized post-mortem) is documented in [`INDEX.md`](INDEX.md). This runbook covers what happens *after* a post-mortem is finalized.

---

## The three layers

| Layer | Lives in | Lifespan | Promotion rule |
|---|---|---|---|
| **Per-incident draft** | Client repo: `docs/lessons/draft.md` | Mid-project | Promoted at Phase 9 close |
| **Per-project post-mortem** | Client repo: `docs/lessons/<slug>-<date>.md` | Permanent in that client repo | Promoted when `recurrence ≥ 3` |
| **Stack-wide log** | Starter repo: `docs/LESSONS-LEARNED.md` | Permanent in the starter | Sometimes promoted further into pre-baked configs |

The journey of a recurring lesson:

```
incident → draft.md (one project)
       → <slug>-<date>.md (one project, finalized)
       → <slug-2>-<date>.md (next project — recurrence: 2)
       → <slug-3>-<date>.md (third project — recurrence: 3)
       → PR against starter's LESSONS-LEARNED.md  ← promotion fires here
       → maybe further: pre-baked into a starter config file, removing the recurrence entirely
```

---

## Step-by-step ritual

### During the project (Phase 4–8)

**As incidents happen**, append to `docs/lessons/draft.md` in the client repo. Don't wait — root causes get fuzzy fast. Each draft entry is a few sentences (symptom + fix). Don't structure it yet.

```markdown
## 2026-05-15 — tailwind 4.3 build break

Tried bumping tailwind via Dependabot. Build failed on @tailwindcss/vite
with `Missing field 'tsconfigPaths'`. Pinned back to 4.2.2, added ignore
rule to dependabot.yml. ~30 min.
```

### At Phase 9 close (Post-Launch Retrospective)

#### 1. Promote drafts to finalized post-mortems

For each draft entry, copy [`LESSON-TEMPLATE.md`](LESSON-TEMPLATE.md) to `docs/lessons/<incident-slug>-<YYYY-MM-DD>.md` in the client repo. Fill in the YAML frontmatter completely:

```yaml
---
title: "Tailwind 4.3 trips Rolldown tsconfigPaths error"
date: 2026-05-15
client: "Client X"
framework: astro
phase: "6.1"
severity: high
tags: [tailwind, vite, css-parser, rolldown]
fix-shipped: true   # pinned in package.json + dependabot.yml ignore
recurrence: 1
promote-candidate: false
---
```

Fill in the body sections: What broke / Root cause / Fix applied / What the obvious fix was / Takeaway.

#### 2. Sanitize

Strip client-confidential details before the lesson can be shared:

- Client name → "Client X" or sanitized initials
- Internal URLs → `example.com`
- Credentials, API keys, internal email addresses → remove entirely
- Architecture diagrams that show client-specific systems → redact

Technical content (error messages, package versions, config snippets, root-cause analysis) stays verbatim. That's the value.

#### 3. Update the per-project INDEX

Add a one-line entry to [`INDEX.md`](INDEX.md) (newest at top):

```markdown
- [<client-slug>](<client-slug>-<YYYY-MM-DD>.md) — <one-line takeaway from the frontmatter title>
```

### Cross-project distillation pass

**When**: at Phase 9 close OR every 3 months on the starter repo itself (whichever comes first).

#### 4. Read the index

Open [`INDEX.md`](INDEX.md). Count entries by `tags` (the YAML frontmatter field). For each tag that appears in ≥3 finalized post-mortems, you have a **promotion candidate**.

Manual ritual (no script):

```sh
# In the client repo or in the starter repo, walk all per-project lesson files:
grep -h "^tags:" docs/lessons/*.md | sort | uniq -c | sort -rn
```

Any tag with count ≥3 → promotion candidate.

#### 5. Bump `recurrence` and `promote-candidate` in the affected lesson files

For each lesson file matching the recurring pattern, update its frontmatter:

```yaml
recurrence: 3   # was 1 — bump on each re-occurrence
promote-candidate: true   # was false — flag for promotion
```

#### 6. Open a PR against the starter repo (this repo)

Target: `docs/LESSONS-LEARNED.md`.

Copy the lesson's body sections verbatim (skip the YAML frontmatter — LESSONS-LEARNED.md uses its own numbered format). Prefix with a `**Recurrence**:` line that lists the affected clients:

```markdown
## 13. <Title from lesson frontmatter>

**Recurrence**: 3 (Clients A / B / C — see docs/lessons/<each>.md)

**Symptom**: <from "What broke" section>

**Root cause**: <from "Root cause" section>

**Fix**: <from "Fix applied" section, generalized for the starter>

**Obvious wrong fix that failed**: <if applicable>

**Takeaway**: <from "Takeaway" section>
```

Append at the next number in LESSONS-LEARNED.md. **Don't reorder** — chronology of when a lesson was promoted is itself useful signal.

#### 7. Consider further promotion

If the fix is **config-shaped** (e.g., a Tailwind pin + Dependabot ignore), the right promotion is into the **starter's actual config files**, not just into LESSONS-LEARNED.md. The doc entry becomes a record of "we used to hit this; now we don't because the config is in place."

Examples:

| Lesson type | Fix lands in |
|---|---|
| "Tailwind 4.3 breaks the build" | `package.json` pin + `.github/dependabot.yml` ignore rule (already done) |
| "Knip flags scaffolding as unused" | `knip.json` entry roots expansion (already done) |
| "Lefthook 2 absolute paths in `.husky/_/`" | `.gitignore` entry (already done) |
| "CSP blocks PostHog/GA4 in prod" | `vercel.json` CSP allowlist (already done) |

If the fix is **behavior-shaped** (a thing the agent or developer should do, not a config), the right promotion is into the **kickoff-prompt's Common Landmines appendix** so it's surfaced from turn 1 of every new project.

If the fix is **process-shaped** (changes how a phase runs), the right promotion is into **kickoff-prompt's phase detail** for that phase.

#### 8. Get an outside reviewer

The retrospective itself is a verification activity (per V3). At least one person who *wasn't* on the project signs off the promotion PR. They spot-check 3 random items in the gap list / promotion candidates to ensure nothing got rubber-stamped.

For solo work: the outside reviewer is a fresh Claude Code session opened in the starter repo with the promotion PR diff loaded. The session reads the PR, reads the cited per-project lessons, and confirms the promotion is warranted.

---

## What NOT to promote

- **One-off project bugs**. If a lesson is `recurrence: 1` and the cause is client-specific (a quirk of their existing infrastructure, a one-time content-migration glitch), it stays in that client's `docs/lessons/` and doesn't make it back to the starter.
- **Lessons that contradict the SOP**. If a project found a "better way" that conflicts with the kickoff-prompt's stated approach, **flag the conflict** rather than auto-promoting. The kickoff-prompt may need updating — but that's a discussion, not a unilateral change.
- **Stale lessons**. If the root cause was patched upstream (e.g., a Tailwind bug fixed in 4.3.1) and the workaround is no longer needed, mark `fix-shipped: true` and `promote-candidate: false`. Don't add it to LESSONS-LEARNED.md as a "this used to be a problem" entry — that's noise.

---

## The cycle is what makes the starter improve

Every project that hits a problem and writes it up makes the next project faster. Every lesson promoted into a starter config means the next clone never even sees the problem. That's the loop.

If you find yourself solving the same kind of problem 3 times across projects without that lesson making it back here, something has broken in the ritual. Fix the ritual.
