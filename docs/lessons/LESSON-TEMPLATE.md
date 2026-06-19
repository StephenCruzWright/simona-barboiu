---
title: "<one-line incident title>"
date: 2026-MM-DD
client: "<sanitized — 'Client X' if confidentiality matters>"
framework: astro            # astro | next | both
phase: "6.1"                # the SOP phase where it surfaced (kickoff-prompt's 9-phase numbering)
severity: high              # critical | high | medium | low
tags: [tailwind, vite, css-parser]   # short kebab-case tokens — used by the distillation pass for grouping
fix-shipped: true           # was the root cause patched in code/config? or is this just documented?
recurrence: 1               # bump when this lesson re-surfaces on another project
promote-candidate: false    # set true at the distillation pass when recurrence ≥ 3
---

<!--
  This is the structured template for a per-project lesson entry.

  Copy this file when a draft.md incident is promoted to a finalized
  post-mortem at Phase 9 close. Rename to <client-slug>-<YYYY-MM-DD>.md
  in the same directory.

  Fill the frontmatter completely — the distillation pass relies on it.

  Body sections mirror docs/LESSONS-LEARNED.md's existing structure so
  promotion to the stack-wide log is copy-paste once `recurrence ≥ 3`.

  See docs/lessons/PROMOTION-RUNBOOK.md for the full ritual.
-->

## What broke

<Symptom — what the developer or agent saw. Be concrete: error messages,
stack traces, observable behavior. Avoid generalizing ("the build broke")
in favor of specifics ("astro build exited 1 at @tailwindcss/vite:generate
with `Missing field 'tsconfigPaths'`").>

## Root cause

<The actual underlying issue. Often different from the symptom.>

## Fix applied

<What you did to resolve it on this project. Include exact file edits or
package versions if relevant.>

## What the obvious fix was (and why it was wrong)

<Optional but valuable — the trap that wasted time before finding the
real fix. Future-you will thank present-you for documenting these.>

## Takeaway

<The one sentence a future developer needs to know. This is what gets
quoted in PROMOTION-RUNBOOK output and in LESSONS-LEARNED.md.>
