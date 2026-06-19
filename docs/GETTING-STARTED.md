# Getting started — from zero

Written for someone who has never built a website before, never used the
command line, and doesn't know what any of this means. If you already know
what `npm` is, skip to [README.md](../README.md)'s "Your first 10 minutes".

> Total time: about 30–45 minutes for a first-time setup.

---

## 1. Install Node.js (the thing that runs the code)

Node.js is the program that turns the files in this folder into an actual
website in your browser. You only install it once per computer.

### On Mac / Linux

Easiest: install [nvm](https://github.com/nvm-sh/nvm) (lets you switch Node
versions per project). Paste this into your terminal:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Close and re-open the terminal, then:

```sh
nvm install 22
nvm use 22
```

### On Windows

Easiest: install [fnm](https://github.com/Schniz/fnm) via
[winget](https://github.com/Schniz/fnm#winget) (Windows's built-in package
manager):

```sh
winget install Schniz.fnm
```

Close and re-open PowerShell (or Git Bash), then:

```sh
fnm install 22
fnm use 22
```

### Verify it worked

```sh
node --version
```

Should print something like `v22.x.x`. If it prints `v20` or lower, this
project won't build — fix it before continuing.

---

## 2. Install VS Code (the editor)

Download from [code.visualstudio.com](https://code.visualstudio.com). Run
the installer — any default options are fine.

**Recommended extensions** (install from the Extensions panel on the left
sidebar — `Ctrl+Shift+X` or `Cmd+Shift+X`):

- **Astro** — syntax highlighting for `.astro` files
- **Tailwind CSS IntelliSense** — autocomplete for `class=` names
- **ESLint** — red underlines on style/error issues while you type
- **Prettier** — formats code on save
- **MDX** — syntax for `.mdx` blog/content files

---

## 3. Install Git + GitHub Desktop

Git is how code-versioning works. GitHub Desktop is a visual tool that
makes it easy without learning the command line.

- **Git**: install from [git-scm.com](https://git-scm.com/downloads)
  — accept all defaults during setup.
- **GitHub Desktop**: [desktop.github.com](https://desktop.github.com)
  — sign in with your GitHub account.

If you prefer the command line, you can do everything in the terminal —
but this guide assumes the GUI path.

---

## 4. Open the project in VS Code

1. In VS Code: **File → Open Folder** → pick the folder this README lives in.
2. VS Code may ask "Do you trust the authors?" — yes.
3. Open the built-in terminal: **Terminal → New Terminal** (or press
   `` Ctrl+` `` / `` Cmd+` ``).

You should see a prompt at the bottom of the screen.

---

## 5. Install the project's dependencies

In that terminal, type:

```sh
npm install
```

Press Enter. This downloads everything the site needs (~600 packages). It
takes 30–60 seconds. You'll see a lot of scroll; that's normal. When it's
done you're back at a blank prompt.

---

## 6. Start the dev server

```sh
npm run dev
```

Wait a few seconds. You'll see something like:

```
  Local    http://localhost:4321/
```

Open that URL in your browser. You should see a page with a dark hero
banner and some text. **You're running a website on your computer.**

Leave the terminal running while you edit — the page auto-refreshes when
you save a file.

> **To stop the dev server**: press `Ctrl+C` in the terminal.

---

## 7. Make your first edit

Open `src/lib/constants.ts` in VS Code. Near the top you'll see:

```ts
export const SITE_META = {
  name: "{{Your Site Name}}",
  ...
};
```

Change `{{Your Site Name}}` to your real project name — say, "My Cafe".
Save the file.

Switch back to your browser. The top-left corner now says "My Cafe"
instead of the placeholder. You just edited your website.

---

## 8. Make your first commit (via GitHub Desktop)

1. Open **GitHub Desktop**
2. **File → Add Local Repository** → pick the project folder
3. On the left you'll see the file you changed (`constants.ts`)
4. Bottom-left: write a short summary like "set site name" and click
   **Commit to main** (or whatever your branch is)
5. Top: click **Publish repository** (first time) or **Push origin** (later)

Your code is now on GitHub.

---

## 9. What's next

- **Edit more copy**: `src/data/home/home.mdx` for the homepage,
  `src/data/blog/` for posts, `src/lib/constants.ts` for site-wide values
- **Swap brand colors**: `src/styles/global.css` — find the `@theme {}`
  block near the top, change the hex colors
- **Add a page**: create a new file `src/pages/whatever.astro` —
  visiting `/whatever` on the site will render it
- **Go live**: follow [docs/DEPLOYMENT.md](DEPLOYMENT.md) to connect your
  GitHub repo to Vercel
- **Use Claude**: open [docs/RECOMMENDED-PROMPTS.md](RECOMMENDED-PROMPTS.md)
  for ready-to-paste prompts — Claude is great at reading this codebase
  and helping with changes

---

## Common problems

### "npm: command not found"
Node didn't install. Go back to step 1.

### "npm run dev" says "Error: Cannot find module ..."
You skipped `npm install`. Run it.

### Port 4321 already in use
Another dev server is running. Close it (find the old terminal, press
`Ctrl+C`) or change the port: `npm run dev -- --port 3000`.

### The page looks broken / unstyled
Tailwind may not have processed yet. Wait 2–3 seconds after the first
load, then refresh.

### Pre-commit hook blocks my commit
Read the error — it's pointing at a real problem. Run
`npm run check` and `npm run lint` manually to see what failed, fix it,
commit again. Don't use `--no-verify` to skip it.

### Still stuck
Open [docs/LESSONS-LEARNED.md](LESSONS-LEARNED.md) — your symptom is
probably in there. If not, ask Claude Code (paste the error message) or
check the Astro Discord / GitHub issues.