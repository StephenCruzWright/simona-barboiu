![][image1]

**Application Security Tooling 2026.**

*A 2026 landscape review and recommendation for Cognisearch*

Internal Research Paper

Version 1.0   •   April 28, 2026

# **Table of Contents**

# **1\. Executive Summary**

Cognisearch's current Web Project Delivery Plan names Snyk as the default scanner in Phase 6\. After surveying the 2026 application-security tooling market, that recommendation is wrong for our cost profile and stack. This paper presents the alternatives, the evidence behind the change, and a final stack recommendation.

*Default to a free-first stack — Dependabot, Semgrep, gitleaks, Trivy, and Socket.dev's free tier — and reserve commercial platforms (Aikido or Snyk) for clients whose compliance posture explicitly demands them.*

### **Why this matters**

Cognisearch operates with a $2,000 project floor and a small core team. Every default tool on a project either consumes margin or — once installed in CI — keeps consuming it for the lifetime of the engagement. A scanner choice that costs $25 per developer per month is not a small line item when multiplied across our portfolio. At the same time, dropping security scanning entirely is not an option: 2026 has already seen multiple npm self-propagating worms, the Trivy supply-chain compromise, and a steady drumbeat of typosquatting attacks. Doing nothing is negligence; defaulting to the most-marketed paid product is waste.

### **The recommendation in one paragraph**

Make Cognisearch's default security stack: Dependabot for SCA, Semgrep for SAST, gitleaks plus GitHub Push Protection for secrets, Trivy for container and IaC scanning, and Socket.dev's free tier for npm supply-chain risk in pull requests. Add OWASP ZAP only when there is a meaningful authenticated surface to test. This stack is free at our scale, gates every PR in CI, and is best-in-class in each individual category. Upgrade to Aikido Security ($300/month flat for 10 users, with a startup discount available) when a client requires a single-pane-of-glass dashboard for compliance reporting. Reserve Snyk for the narrow case where a client's procurement contract specifically names it.

# **2\. Background and Methodology**

### **The previous recommendation**

Phase 6 of the Web Project Delivery Plan currently lists Snyk as the primary SAST and dependency scanner, with Dependabot as a secondary source. That recommendation reflected an instinct to consolidate scanning into a single commercial product. It was made without a full survey of the market and without anchoring against Cognisearch's actual cost model.

### **Scope of this review**

This paper covers the application-security tools that are realistic for a small web agency to integrate into a Vercel-hosted Astro or Next.js delivery workflow in 2026\. The recommendation is framework-agnostic — Cognisearch ships both, and every tool selected below works the same on either. Out of scope: enterprise GRC platforms, runtime EDR, SIEM, and cloud security posture management beyond what is required for a Vercel-hosted site.

### **Methodology**

* Identified the standard application-security categories: SCA, SAST, secrets scanning, supply-chain risk, container and IaC scanning, DAST, and all-in-one ASPM platforms.

* For each category, identified the leading 2026 commercial and open-source tools.

* Verified pricing from vendor sites and independent reviews dated 2026\.

* Cross-checked accuracy claims against independent benchmarks where available (EASE 2024 for SAST, Forrester Wave Q4 2024 for SCA, Doyensec SCA benchmark).

* Filtered against Cognisearch's actual delivery profile: small team, Astro or Next.js on Vercel, $2k project floor, Cloudflare in front, Google Workspace plus Resend for mail.

* Constructed three concrete stack options and selected one as the default.

# **3\. The Categories of Application Security**

Tools in this market are sold under overlapping buzzwords. Before comparing products, it is useful to be clear about what each category actually does.

### **SCA — Software Composition Analysis**

Scans your dependency manifests (package.json, pnpm-lock.yaml, requirements.txt) for known CVEs in third-party libraries. The single highest-leverage scan you can add to a project. SCA does not look at the code you wrote — only at what you imported.

### **SAST — Static Application Security Testing**

Analyzes the source code you wrote for vulnerability patterns: SQL injection, XSS, insecure deserialization, hardcoded secrets in source, etc. SAST quality varies enormously between tools and per language. Rule quality matters more than vendor.

### **Secrets Scanning**

Detects API keys, tokens, and other credentials accidentally committed to git or pasted into source. Operates at three points: pre-commit (best — never lands), CI on every push, and historical sweeps of the entire git history.

### **Supply-Chain Risk (deeper than SCA)**

Goes beyond "is this version of lodash known to be vulnerable?" to ask "is this newly published package actually malicious?" Looks for install scripts, network calls, obfuscated code, typosquatting, and maintainer changes. Critical in 2026 — npm has seen self-propagating worms, dependency confusion at scale, and the Trivy supply-chain compromise.

### **Container and IaC Scanning**

Scans Docker images for vulnerable base layers, Terraform / CloudFormation / Kubernetes manifests for misconfigurations. For a Vercel-hosted Astro or Next.js project, container scanning is rarely needed, but IaC scanning matters once Cloudflare configuration is captured as code or backups go to S3.

### **DAST — Dynamic Application Security Testing**

Runs against a deployed copy of the app, attempting real attacks: XSS payloads, SQL injection, broken auth flows. Requires a running staging environment and only catches a subset of issues, but catches things SAST cannot. Most relevant for sites with authenticated areas, dashboards, or APIs.

### **All-in-one ASPM platforms**

Application Security Posture Management products that combine SCA, SAST, secrets, container, IaC, and DAST behind a single dashboard. Trade per-tool best-of-breed quality for operational simplicity and unified reporting.

## **4\. SCA Tools**

| Tool | Price | Notes |
| :---- | :---- | :---- |
| Dependabot | Free (GitHub-native) | 30+ ecosystems. Auto-PRs to bump versions. 2026 added grouped updates that cut CI runs by \~55% on multi-package ecosystems. SCA only — no SAST. |
| Renovate (by Mend) | Free (OSS) | 90+ package managers, 400+ config options, multi-platform (GitHub, GitLab, Bitbucket, Azure). 47% faster than Dependabot for monorepos in a 1,200-repo benchmark. Higher setup cost. |
| Snyk Open Source | $25/dev/mo (Team) | Strongest SCA per Forrester Wave Q4 2024\. Better remediation suggestions than Dependabot. Free tier limited to 400 OSS tests per period. |
| Trivy | Free (OSS) | 32k+ GitHub stars, the most popular OSS SCA. Single binary covers SCA \+ container \+ IaC \+ secrets. |
| Mend | Commercial | Renovate's parent company. Stronger reachability analysis than basic SCA, more enterprise-oriented. |

*For Cognisearch: Dependabot covers 95% of SCA value at zero cost. Renovate is worth the setup cost only if a client asks for monorepo support or non-GitHub hosting.*

## **5\. SAST Tools**

| Tool | Price | Notes |
| :---- | :---- | :---- |
| Semgrep | Free for ≤10 contributors (full platform) | Beats Snyk on SAST in independent EASE 2024 benchmarks. Strong OSS rule library, fast CI scans, custom rules in YAML. The default modern choice for SMB SAST. |
| Snyk Code | Bundled with Snyk Team ($25/dev/mo) | Built on the DeepCode acquisition. Decent SAST, strong remediation guidance, but objectively weaker than Semgrep on benchmarks. |
| GitHub CodeQL | Free on public repos. $49/active user/mo for private repos via GitHub Advanced Security. | Best-in-class SAST quality, but GHAS pricing is steep for small agencies. Free for any open-source work. |
| SonarCloud | Free for OSS. \~$11/mo per 100k LOC for private. | Code quality plus security. Strong type-system-aware analysis. Worth it if the team already cares about code quality metrics. |
| Aikido (SAST module) | Bundled in Aikido plans (from $300/mo flat) | Wraps OSS engines plus proprietary rules. Strong reachability analysis to suppress non-exploitable findings. |

*For Cognisearch: Semgrep is the right default. Better than Snyk on the benchmark we care about, free at our team size, and the rules are inspectable.*

## **6\. Secrets Scanning Tools**

| Tool | Price | Notes |
| :---- | :---- | :---- |
| gitleaks | Free (OSS) | Fastest pre-commit scanner. Sub-second on modest diffs. \~150 credential types. Best for pre-commit hooks and CI diff scanning. |
| TruffleHog | Free (OSS) | 800+ credential types. Two-phase scan with live verification — calls the actual service to confirm a leaked credential still works. Reduces false positives. |
| GitHub Push Protection | Free (GitHub-native) | Blocks commits that contain known token patterns at push time. Covers a curated provider list. Should be enabled on every repo regardless. |
| GitGuardian | Commercial (free tier for ≤25 users) | 550+ types. Managed dashboard with incident workflow, NHI governance, and Slack/Confluence/Jira scanning. Pay for governance, not detection. |
| detect-secrets (Yelp) | Free (OSS) | Designed for legacy codebases — establishes a baseline of known false positives so you don't drown in noise on a brownfield repo. |

*For Cognisearch: gitleaks pre-commit \+ GitHub Push Protection \+ TruffleHog in CI. Total cost: zero. GitGuardian only when a client wants a managed dashboard with audit trail.*

## **7\. Supply-Chain Risk Tools**

| Tool | Price | Notes |
| :---- | :---- | :---- |
| Socket.dev | Free tier; paid from \~$10/mo | JS, Python, Go. Comments on PRs that introduce risky packages. Detects install scripts, network calls, obfuscated code, typosquatting. Detected the March 2026 PyPI litellm malware. |
| Snyk Open Source (reachability) | Bundled with Snyk Team | Reachability analysis distinguishes vulnerable packages you actually call from those you only transitively pull in. |
| Aikido (supply chain) | Bundled | Reachability \+ automatic triage. Cuts noise more aggressively than per-tool stacks. |
| Sigstore / SLSA verification | Free (OSS) | Cryptographic provenance for packages. Tooling is maturing in 2026 but not yet click-to-enable for typical npm projects. |

*For Cognisearch: Socket.dev free tier is the easy add. It catches the class of attack (malicious package, not just vulnerable version) that Dependabot fundamentally cannot see.*

## **8\. Container and IaC Scanning Tools**

| Tool | Price | Notes |
| :---- | :---- | :---- |
| Trivy (Aqua) | Free (OSS) | 32k+ GitHub stars. Single binary for SCA \+ container \+ IaC \+ Kubernetes \+ secrets. Absorbed tfsec for Terraform coverage. The de facto OSS standard. |
| Checkov (Bridgecrew/Prisma) | Free (OSS) | Deeper IaC policy library than Trivy, graph-based checks. Use alongside Trivy when IaC is a major part of the project. |
| Grype (Anchore) | Free (OSS) | Container-only. Lower false-positive rate than Trivy on container vulns. Pair with Syft for SBOM. |
| Snyk Container / IaC | Bundled with Snyk Team | Same product family as Snyk Open Source. Worth it only if you're already paying for Snyk. |

*For Cognisearch: Trivy when needed. Most Vercel-hosted Astro or Next.js projects don't ship containers, so this scan often runs only against Cloudflare or Vercel config-as-code if present.*

## **9\. DAST Tools**

| Tool | Price | Notes |
| :---- | :---- | :---- |
| OWASP ZAP / ZAP by Checkmarx | Free (OSS) | Industry standard OSS DAST. Now under Checkmarx stewardship. Good GitHub Actions support. Manual configuration for auth flows is the friction point. |
| Dastardly (PortSwigger) | Free | Burp Scanner engine in a 10-minute CI scan. Zero config. The fastest path to a sensible CI DAST for marketing sites. |
| StackHawk | Commercial | Originally built on ZAP, now a separate engine. Purpose-built for CI/CD with clean PR integration. Worth the cost for client work with auth flows. |
| Burp Suite Pro | $449/yr/user | The interactive testing tool of choice for security professionals. Not a CI tool; not a fit for our default workflow. |
| Akto | Free \+ commercial | OSS DAST plus API discovery. Strong for projects with significant API surface. |

*For Cognisearch: skip DAST on simple marketing sites — the attack surface doesn't justify the time. Run Dastardly in CI for sites with forms or auth. ZAP for anything more involved.*

## **10\. All-in-One ASPM Platforms**

| Tool | Price (entry) | Notes |
| :---- | :---- | :---- |
| Aikido Security | $300/mo flat for 10 users (50% startup discount available → \~$150/mo) | Belgium-based, developer-first. Free Developer plan: 2 users, 10 repos. Covers SCA \+ SAST \+ DAST \+ IaC \+ container \+ secrets \+ cloud in one product. Strong reachability and triage. Flat-rate pricing means cost doesn't explode with team size. |
| Snyk | $25/dev/mo (Team) | Best-in-class SCA, decent SAST, mature platform. SSO locked behind Ignite tier (\~$1,260/yr/dev). Strongest brand recognition with enterprise procurement teams. |
| GitHub Advanced Security | $49/active user/mo | Bundles CodeQL \+ Dependabot \+ Secret Scanning. Excellent if the client already has a GHAS-enabled GitHub Enterprise account. Expensive standalone. |
| Mend | Commercial (custom) | Renovate's parent. Strong reachability. Enterprise-oriented sales motion. |
| JIT, Endor Labs, Apiiro | Commercial | Newer ASPM contenders. Worth tracking but not yet default-recommended for a small agency. |

*For Cognisearch: Aikido is the most credible single-tool consolidation play at our scale. Snyk's price is comparable per-developer but doesn't include DAST. GHAS makes sense only when the client is already on GitHub Enterprise.*

# **11\. Side-by-Side Comparison**

The matrix below summarizes coverage and cost across the leading tools. "Default cost" is the realistic monthly bill for a small agency: 2-3 contributing developers, 10-30 active client repos.

| Tool | SCA | SAST | Secrets | Supply chain | Container/IaC | DAST | Default cost |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Dependabot | Yes | — | Partial (push protection) | — | — | — | $0 |
| Renovate | Yes | — | — | — | — | — | $0 |
| Semgrep | Yes (Supply Chain add-on) | Yes (best in class for OSS) | — | Partial | — | — | $0 (≤10 contributors) |
| gitleaks | — | — | Yes (pre-commit \+ CI) | — | — | — | $0 |
| TruffleHog | — | — | Yes (with verification) | — | — | — | $0 |
| GitGuardian | — | — | Yes (managed) | — | — | — | $0 (≤25 users) |
| Socket.dev | Yes (npm/PyPI/Go) | — | — | Yes (best in class) | — | — | $0–$25/mo |
| Trivy | Yes | — | Yes | — | Yes (best OSS) | — | $0 |
| Checkov | — | — | — | — | Yes (IaC) | — | $0 |
| OWASP ZAP | — | — | — | — | — | Yes | $0 |
| Dastardly | — | — | — | — | — | Yes (CI-only) | $0 |
| Snyk | Yes (best per Forrester) | Yes | Partial | Yes (reachability) | Yes | Optional | \~$50–$75/mo (2-3 devs) |
| Aikido | Yes | Yes | Yes | Yes | Yes | Yes | $150–$300/mo flat |
| GitHub Advanced Security | Yes (Dependabot) | Yes (CodeQL) | Yes | Partial | — | — | $49/user/mo |

# **12\. Three Stack Options for Cognisearch**

Three viable configurations, each defensible. The differences are in cost, operational overhead, and the kinds of clients each fits.

## **Option A — Free-First Stack**

### **Composition**

* SCA: Dependabot.

* SAST: Semgrep.

* Secrets: gitleaks (pre-commit) \+ GitHub Push Protection \+ TruffleHog (CI deep scan).

* Supply chain: Socket.dev free tier in PR comments.

* Container / IaC: Trivy when needed.

* DAST: Dastardly for sites with forms or auth; OWASP ZAP for anything more complex; skip otherwise.

### **Cost**

$0 baseline. \~$10–25/month if Socket.dev free tier limits get hit on a high-volume client.

### **Pros**

* Best-in-class in each category by independent benchmark.

* Inspectable rules and OSS provenance — no black box.

* Doesn't tax the $2k floor.

* Set up in a single afternoon per project from a template.

### **Cons**

* Multiple dashboards. No unified "security score" to hand a client.

* Per-tool config drift across projects unless we templatize aggressively.

* No vendor support contract — we own remediation triage.

## **Option B — Aikido all-in-one**

### **Composition**

* Aikido covers SCA, SAST, DAST, IaC, container, secrets, and cloud in a single product.

* Keep Dependabot enabled alongside for fast PR auto-updates (Aikido can drive these too but the GitHub-native flow is excellent).

* Keep gitleaks pre-commit because pre-commit blocking is faster than any cloud product can be.

### **Cost**

$300/month flat for 10 users (Basic). Pro adds API scanning, malware detection, IDE plugins for $600/month. 50% startup discount may apply for Cognisearch — bringing Basic to \~$150/month.

### **Pros**

* Single dashboard, single CI integration, single billing relationship.

* Reachability analysis cuts noise — fewer false positives reach the team.

* Flat-rate pricing means cost doesn't grow with team size or repo count.

* Looks credible to procurement teams at mid-market clients.

### **Cons**

* $150–$300/month is real money — must be allocable to client work, not absorbed.

* Lock-in: harder to migrate off than the free stack.

* SAST is decent but not as accurate as Semgrep standalone on independent benchmarks.

## **Option C — Snyk**

### **Composition**

* Snyk Team: SCA \+ SAST \+ Container \+ IaC.

* Pair with separate DAST (ZAP), separate secrets (gitleaks), and Dependabot for PR auto-updates.

### **Cost**

$25/contributing developer/month. For 2-3 devs: \~$50–$75/month. SSO requires the Ignite tier at \~$105/dev/month.

### **Pros**

* Forrester Wave Leader for SCA. Best raw SCA quality on the market.

* Strongest brand recognition with enterprise procurement.

* Mature, polished UX.

### **Cons**

* Doesn't include DAST — still need a second tool.

* SAST is weaker than Semgrep on EASE 2024 benchmarks.

* Per-developer pricing means cost grows with team — Aikido's flat rate scales better as Cognisearch grows.

* Pays for the brand premium without delivering more than Aikido at the same total monthly cost.

# **13\. Final Recommendation**

*Adopt Option A (free-first stack) as the Cognisearch default. Add Aikido as a tiered upsell for clients who require single-pane reporting. Reserve Snyk for the narrow case where a client's procurement contract names it.*

### **The reasoning**

Option A wins on cost, accuracy, and fit. Each tool in the stack is best-in-class in its category by independent benchmark — Dependabot for GitHub-native SCA, Semgrep beating Snyk on SAST in EASE 2024, gitleaks the fastest pre-commit secrets scanner, Trivy the most-starred OSS scanner in 2026, and Socket.dev catching the malicious-package class of attack that Dependabot fundamentally cannot see. The total cost is zero up to limits we're unlikely to hit, which preserves margin on $2k-floor projects.

Option B (Aikido) is a credible upgrade path and not a backup. It earns its $150-$300/month when the client requires unified reporting or when Cognisearch's portfolio grows past the operational complexity threshold — the rough rule is: when we have more than \~10 active client repos and per-tool config drift is costing us more than $300/month in engineering time, switch.

Option C (Snyk) is the wrong default for our profile. It costs more per developer than Aikido scales to, doesn't include DAST, has weaker SAST than the Semgrep alternative, and offers no advantage at our scale beyond brand recognition with procurement teams that we don't currently sell to. Deploy it only when a client's contract specifically names it.

### **When to revisit this decision**

* If Cognisearch wins a client with SOC 2, HIPAA, or PCI-DSS requirements — re-evaluate Aikido or Snyk for that engagement.

* If npm experiences another major supply-chain event in 2026 — re-evaluate paid Socket.dev tiers and Aikido's malware module.

* If team size grows past 5 contributing developers — re-run the cost math, particularly on Snyk.

* If a major Semgrep, Trivy, or Dependabot security incident occurs — reconsider the OSS-first posture for affected categories.

# **14\. Implementation Plan**

### **Week 1: template the CI**

* Create a reusable GitHub Actions workflow file: cognisearch-security.yml.

* Add Semgrep action with the p/default and p/owasp-top-ten rule packs, plus a Cognisearch custom rules file.

* Add Dependabot config (dependabot.yml) with grouped npm \+ actions ecosystems on weekly schedule.

* Add gitleaks action with full-history scan on first run, diff-only on subsequent runs.

* Add a separate workflow for Trivy when the project includes containers or IaC.

* Wire all of the above into a single required status check on the main branch.

### **Week 2: pre-commit hooks**

* Add Husky \+ lint-staged config to the project template.

* gitleaks pre-commit hook: blocks any commit containing a detected secret pattern.

* ESLint and Prettier on staged files.

* Tested locally; documented in CLAUDE.md.

### **Week 3: Socket.dev integration**

* Install the Socket GitHub app on the Cognisearch org.

* Verify it comments on a test PR that introduces a risky package.

* Document the triage process: who reviews Socket comments, when to override.

### **Week 4: documentation and rollout**

* Update Phase 6 of the Web Project Delivery Plan to reflect the new stack.

* Add a one-page "security setup checklist" to the project kickoff template.

* Backfill the new workflow into the most recent two client projects to verify it doesn't break anything.

* Schedule a quarterly review to revisit tool choices against new benchmarks.

# **15\. References**

* Snyk Plans and Pricing — snyk.io/plans

* Snyk Pricing 2026 (CheckThat.ai, DEV Community, PulseSignal)

* SCA vs SAST (2026): What Each Tool Finds, Misses, and Costs — Konvu

* Snyk vs Semgrep (2026): Technical Comparison — Konvu

* Snyk vs Dependabot (2026) — DEV Community

* SCA Tools Comparison: Snyk vs Dependabot vs Renovate vs OWASP Dependency-Check vs Rafter (2026)

* Best SAST Tools for AI-Generated Code: Snyk vs Semgrep vs Checkmarx (2026) — Vibe-Eval

* Aikido Security Pricing 2026 — aikido.dev/pricing, G2, Capterra

* Aikido Security Review 2026 — CTO Club, AppSec Santa, Klicktrust

* Socket.dev Pricing — socket.dev/pricing

* How Socket Helps Prevent Supply Chain Attacks — ALMtoolbox

* Self-Propagating Supply Chain Worm Hijacks npm Packages — The Hacker News, April 2026

* Detecting, investigating and defending against the Trivy supply chain compromise — Microsoft Security Blog, March 2026

* Secrets Scanners 2026: GitGuardian vs TruffleHog vs Gitleaks Compared — NomadX

* Best Secret Scanning Tools 2026 — AppSec Santa, GitGuardian Blog

* Renovate vs Dependabot 2026 — AppSec Santa, johal.in benchmark

* Trivy — trivy.dev, GitHub aquasecurity/trivy

* Trivy vs Snyk (2026) — AppSec Santa

* Free & Open-Source DAST Tools Compared (2026) — AppSec Santa

* OWASP ZAP / ZAP by Checkmarx — owasp.org, Checkmarx

* StackHawk vs ZAP — stackhawk.com

* Forrester Wave: Software Composition Analysis, Q4 2024

* EASE 2024 SAST benchmark

* Doyensec Software Composition Analysis Benchmark

[image1]: <data:image/png;base64,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>