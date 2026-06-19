# Deployment — shipping your site to the internet

You'll push code to GitHub, connect that repo to Vercel, and Vercel will
auto-build and deploy every time you push to `main`. First-time setup is
~15 minutes; every subsequent deploy is automatic.

---

## One-time setup

### 1. Push the project to GitHub

If you haven't already:

1. In **GitHub Desktop**: File → Add Local Repository → pick this folder
2. Click **Publish repository** (top of the window)
3. Pick a name (lowercase, dashes — e.g. `my-cafe-site`)
4. Pick Public or Private (either works with Vercel's free tier)
5. Click **Publish Repository**

Your code is now at `github.com/<you>/<name>`.

### 2. Create a Vercel account

Go to [vercel.com/signup](https://vercel.com/signup). Sign in with GitHub
(easiest).

### 3. Install the Vercel GitHub app

During signup Vercel will ask which repos it can access. Two options:

- **All repositories** (fine for personal projects)
- **Only select repositories** (more secure — pick just the one)

### 4. Import the project into Vercel

1. Vercel dashboard → **Add New → Project**
2. Pick your GitHub repo from the list
3. Vercel auto-detects **Framework Preset: Astro** — confirm it's set
   to Astro, not "Other"
4. **Root Directory**: leave blank (the project is at the repo root)
5. **Build Command**: leave as-is (`npm run build`)
6. **Output Directory**: leave blank (adapter handles it)
7. **Node.js Version**: set to **22.x** (Vercel should auto-detect from
   `.nvmrc`, but override in the UI to be safe)

### 5. Environment variables

If you haven't set any yet, skip this — every var is optional and the
site will build fine without them.

When you're ready to enable features:

1. Project Settings → Environment Variables
2. For each var, add to **all three scopes**: Production, Preview, Development
3. The ones that unlock features:
   - `RESEND_API_KEY` — contact form email send (Phase 3 feature)
   - `PUBLIC_GA4_ID` — Google Analytics (when you launch)
   - `PUBLIC_COOKIEYES_ID` — cookie banner (when you launch)
4. See [`.env.example`](../.env.example) for the full list + notes

### 6. Click Deploy

Wait 1–3 minutes. Vercel builds your site and gives you a URL
(`<name>-<hash>.vercel.app`). Click it — your site is live on the
internet.

---

## Day-to-day: deploying changes

1. Make changes locally (`npm run dev` to preview)
2. Commit via GitHub Desktop
3. Push (or click "Push origin" in GitHub Desktop)
4. Vercel auto-builds + deploys within 1–3 minutes

Every PR gets a **preview URL** you can share before merging. `main`
deploys to the production URL.

---

## Custom domain

1. Buy a domain (Namecheap, Cloudflare Registrar, Porkbun — any works)
2. Vercel → Project → Settings → Domains → Add
3. Vercel tells you the DNS records to add at your registrar
4. Add them, wait 5–30 minutes for DNS to propagate
5. Vercel auto-issues a Let's Encrypt cert; HTTPS works automatically

Once it's live, update `astro.config.mjs` → `site:` to your real URL,
and update `public/robots.txt` to reference the real sitemap URL. Commit
and push.

---

## When a deploy fails

If the build fails, Vercel shows red in the dashboard. Click the failed
deploy → expand **Build Logs**.

**Common failure modes** (see [LESSONS-LEARNED.md](LESSONS-LEARNED.md)
for details):

| Symptom | Likely cause |
|---|---|
| Fails at `Building server entrypoints…` with no visible error | OOM or native-binary crash — switch to Turbo builder (60 GB) |
| "Expected ':' but found ')'" in a generated chunk | Old esbuild; confirm `overrides` block in package.json forces 0.28+ |
| "Module not found" | Case-sensitive import on Linux; check exact filename casing |
| Pre-commit hook failed on CI | Run `npm run check && npm run lint` locally and fix |
| Env var required but not set | Check Project Settings → Environment Variables |

**Before blaming Vercel**: reproduce locally with a clean install.

```sh
rm -rf node_modules dist .astro
npm ci
npm run build
```

If local succeeds and Vercel fails, the failure is environment-specific.
If local also fails, the bug is in the code.

---

## Rolling back

Vercel keeps every deployment. To roll back:

1. Deployments tab → find the last known-good deploy
2. ⋯ menu → **Promote to Production**

Takes effect in under 30 seconds; no rebuild required.

---

## Cost

The Vercel Hobby (free) tier covers:

- 100 GB bandwidth / month
- Unlimited deployments
- Preview URLs on every PR
- HTTPS + custom domains

Small marketing sites rarely need more. If you exceed bandwidth you'll
get an email before being charged.