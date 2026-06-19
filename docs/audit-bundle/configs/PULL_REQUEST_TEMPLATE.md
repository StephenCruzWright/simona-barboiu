# Summary

<!-- One or two sentences. What changed and why. -->

## Type of change

- [ ] Bug fix
- [ ] Feature
- [ ] Refactor / cleanup
- [ ] Content / copy
- [ ] Infra / CI / tooling
- [ ] Docs

## Pre-merge checklist

### Code quality
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] Biome passes (`npx biome ci .`)
- [ ] No `any` introduced (or justified inline)
- [ ] No new magic numbers / strings — extracted to constants

### Security & secrets
- [ ] No secrets committed (gitleaks / TruffleHog clean in CI)
- [ ] No new env-specific values hardcoded — use Vercel env vars
- [ ] Semgrep / Dependabot / Socket.dev clean

### Accessibility (if UI changes)
- [ ] axe-core CI clean (no serious / critical violations)
- [ ] Tap targets ≥ 24×24 px on mobile
- [ ] Color contrast 4.5:1 body / 3:1 large text & UI
- [ ] Manual screen-reader spot check (VoiceOver or NVDA) on changed flows

### Performance (if visible content changes)
- [ ] Lighthouse mobile perf ≥ 90, desktop ≥ 95 against the preview URL
- [ ] LCP < 2.5s mobile, CLS < 0.1
- [ ] Images use `next/image` with explicit width/height

### Schema / SEO (if content changes)
- [ ] Affected JSON-LD validated via Google Rich Results Test
- [ ] Canonical URL correct
- [ ] OG / Twitter share metadata present

### Docs
- [ ] CLAUDE.md updated if architecture or conventions changed
- [ ] PR description lists any deletions / removals