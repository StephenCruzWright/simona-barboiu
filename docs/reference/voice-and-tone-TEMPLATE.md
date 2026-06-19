# Voice & tone — brief for your project

A short brief Claude can read to write in your voice. Copy this to
`voice-and-tone.md` (drop the `-TEMPLATE`) and fill it in. Reference in
prompts:

> "Write three variations for the home hero subtitle. Use the voice
> defined in `docs/reference/voice-and-tone.md`."

Keep it under 400 words; Claude re-reads this every time.

---

## Who we're talking to

Briefly describe your reader:

- **Who they are**: `{{job titles, role, industry}}`
- **What they already know**: `{{assumed background}}`
- **What they care about**: `{{their top 2-3 priorities}}`
- **What turns them off**: `{{marketing-speak? jargon? hype?}}`

Example:
> Senior engineering managers at 50-500 person startups. They've
> shipped software, they can smell vendor BS from across the room,
> and they're skeptical of "platforms" and "solutions."

---

## Voice

Three adjectives that define how we sound:

1. **`{{adjective}}`** — e.g. "direct" (short sentences, no filler)
2. **`{{adjective}}`** — e.g. "technical" (specific, not vague)
3. **`{{adjective}}`** — e.g. "warm" (we are people, not a corporation)

---

## Tone by context

Tone shifts based on where the copy lives:

| Context | Tone | Example |
|---|---|---|
| Home hero | Bold, confident | "We ship code that works." |
| Feature descriptions | Clear, specific | "Generates a 1200×630 social card from any URL." |
| Error messages | Humble, helpful | "Couldn't reach the server. Try again in a moment." |
| FAQ answers | Practical, direct | "Yes — billing resets on the 1st of each month." |
| Footer / legal | Plain, no-frills | "© 2026. All rights reserved." |

---

## Words we use

- `{{phrase we use}}` — e.g. "ships" (not "launches")
- `{{phrase we use}}` — e.g. "customers" (not "users")

## Words we don't use

- `{{phrase to avoid}}` — e.g. "solution", "platform", "ecosystem"
- `{{phrase to avoid}}` — e.g. "synergize", "leverage", "seamless"
- `{{phrase to avoid}}` — e.g. "at scale" (everyone says this — be specific)

---

## Formatting conventions

- **Headlines**: sentence case (not Title Case)
- **Oxford comma**: `{{yes / no}}`
- **"you" vs "we"**: `{{we address the reader as "you"; we are "we"}}`
- **Contractions**: `{{yes — we use contractions to sound human}}`
- **Emoji**: `{{rarely / never / only in informal contexts}}`
- **Exclamation marks**: `{{sparingly — one per page max}}`

---

## Short examples — rewrites

Before / after pairs that show our voice in action. Useful for
Claude to pattern-match off.

### Too hypey → clearer

> **Before**: "Revolutionize your workflow with our all-in-one
> productivity platform that empowers your team to do more."
>
> **After**: "Meetings, tasks, and docs in one place. Cut your
> tool count in half."

### Too vague → specific

> **Before**: "Flexible pricing for businesses of all sizes."
>
> **After**: "$10/user/month on the team plan. Free for under 5 people."

### Too corporate → human

> **Before**: "We apologize for any inconvenience this may have
> caused."
>
> **After**: "Sorry — our mistake. We're fixing it now."

---

## Voice-checking prompt for Claude

When Claude writes copy, have it self-check:

> Before showing me the draft, rate it 1-5 on each:
>
> - Specificity (vs. vague)
> - Concision (vs. padded)
> - Confidence (vs. hedging)
> - Humanity (vs. corporate)
>
> If anything scores ≤3, rewrite before showing me.

---

## Reference

Sample voices I like (for pattern-matching, not direct copying):
- `{{site / brand / writer}}` — e.g. "Basecamp's marketing copy"
- `{{site / brand / writer}}` — e.g. "Paul Graham's essays"