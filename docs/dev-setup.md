# Dev machine setup

Per-OS toolchain setup for `web-starter-claude`. Pick your section, work top-to-bottom. Should take 15–30 minutes on a fresh machine.

This doc is read first; CLAUDE.md gotchas get read second. If something here disagrees with CLAUDE.md, fix this doc.

---

## Windows

### 1. Node 22.x

Use [fnm](https://github.com/Schniz/fnm) for version management:

```powershell
winget install Schniz.fnm
# Restart terminal so PATH refreshes
fnm install 22
fnm use 22
node --version  # should print v22.x
```

### 2. Git config

```powershell
git config --global core.autocrlf false  # starter ships .gitattributes; autocrlf would conflict
git config --global init.defaultBranch main
git config --global pull.rebase true
```

### 3. gitleaks

```powershell
winget install gitleaks.gitleaks
# CRITICAL: close THIS terminal and open a fresh one — winget doesn't refresh the current shell's PATH
gitleaks version  # should print a version
```

Pre-commit hooks check for `gitleaks` on PATH. If you skip this install, the Lefthook pre-commit hook will fail with a helpful error message + install instructions.

### 4. VS Code extensions

Recommended:

- **Astro** (astro-build.astro-vscode) — syntax, IntelliSense, formatting
- **Biome** (biomejs.biome) — lint + format for `.ts/.tsx/.js/.json/.css`
- **Prettier - Code formatter** (esbenp.prettier-vscode) — for `.astro` files only (Biome handles the rest)
- **markdownlint** (davidanson.vscode-markdownlint) — surfaces .md style issues

**Disable** if installed: ESLint extension (this project doesn't use ESLint).

Recommended `.vscode/settings.json` (workspace-level, commit it):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "[astro]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[markdown]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

### 5. First-run sanity check

```powershell
git clone <repo-url>
cd <repo-name>
npm install          # auto-runs `prepare: lefthook install` — installs git hooks
npm run dev          # starts dev server at http://localhost:4321
```

Open `http://localhost:4321` in your browser. You should see the starter site with placeholder copy. Edit `src/data/home/home.mdx` and the page should hot-reload.

---

## macOS

### 1. Node 22.x

Use [fnm](https://github.com/Schniz/fnm) (works the same as on Windows):

```sh
brew install fnm
# Add to your shell profile (~/.zshrc or ~/.bash_profile):
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
source ~/.zshrc
fnm install 22
fnm use 22
node --version
```

Or use nvm (`brew install nvm` — slightly slower, equivalent functionality).

### 2. Git config

```sh
git config --global core.autocrlf input    # CRLF in pasted code → LF on commit; LF on disk
git config --global init.defaultBranch main
git config --global pull.rebase true
```

### 3. gitleaks

```sh
brew install gitleaks
gitleaks version
```

No PATH-refresh issue on macOS.

### 4. VS Code extensions

Same list as Windows above.

### 5. First-run sanity check

```sh
git clone <repo-url>
cd <repo-name>
npm install
npm run dev
```

Visit `http://localhost:4321`.

---

## Linux (Ubuntu / Debian / Fedora)

### 1. Node 22.x

```sh
# Install fnm
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc   # or ~/.zshrc
fnm install 22
fnm use 22
node --version
```

### 2. Git config

```sh
git config --global core.autocrlf input
git config --global init.defaultBranch main
git config --global pull.rebase true
```

### 3. gitleaks

Download the latest binary from [github.com/gitleaks/gitleaks/releases](https://github.com/gitleaks/gitleaks/releases), unpack to `/usr/local/bin/`:

```sh
# Adjust version + arch as needed
curl -L https://github.com/gitleaks/gitleaks/releases/download/v8.21.2/gitleaks_8.21.2_linux_x64.tar.gz | sudo tar -xzv -C /usr/local/bin/ gitleaks
sudo chmod +x /usr/local/bin/gitleaks
gitleaks version
```

### 4. VS Code extensions

Same list as Windows above.

### 5. First-run sanity check

```sh
git clone <repo-url>
cd <repo-name>
npm install
npm run dev
```

Visit `http://localhost:4321`.

---

## Troubleshooting

### `lefthook install` fails on `npm install` with "core.hooksPath is set locally"

Local git config has `core.hooksPath` pointing somewhere Lefthook doesn't expect. Reset:

```sh
npx lefthook install --reset-hooks-path
```

This unsets `core.hooksPath` and reinstalls hooks into `.git/hooks/` (the Lefthook 2.x default).

### `npm run build` fails on Tailwind: "Missing field 'tsconfigPaths' on BindingViteResolvePluginConfig"

Tailwind 4.2.3+ trips a Rolldown/oxc resolver bug in Astro 6. The starter pins `tailwindcss` and `@tailwindcss/vite` to `4.2.2` and has Dependabot ignore rules to prevent re-bump. If you see this error after a manual upgrade attempt, revert both packages to `4.2.2` (no caret).

See [docs/LESSONS-LEARNED.md §6a](LESSONS-LEARNED.md).

### Windows: gitleaks not found after winget install

You must close the terminal you ran `winget install` in and open a fresh one. winget doesn't refresh the current shell's PATH.

### Hot reload not working in dev

Check that you're editing files inside `src/`. Files in `public/`, `docs/`, `.github/` don't trigger HMR by design.

---

## What's installed when you're done

| Tool | Why |
|---|---|
| Node 22 + npm 11 | Runs the build, manages deps |
| Lefthook (via `npm install`) | Pre-commit + pre-push hooks |
| Biome + Prettier (via `npm install`) | Lint + format |
| gitleaks (via OS package manager) | Pre-commit secret scan |
| VS Code + Astro + Biome + Prettier extensions | Editor experience |

Everything else (knip, Pagefind, Playwright, schema validator, SEO checker, PostHog SDK, Resend SDK, etc.) is a project devDep that installs automatically via `npm install`.

---

## Next steps

After this setup completes successfully:

1. Read [README.md](../README.md) for the project overview.
2. Read [AGENTS.md](../AGENTS.md) for the stack + conventions.
3. If working on a Cognisearch SOP-driven delivery project, read [docs/kickoff-prompt.md](kickoff-prompt.md) before opening Claude Code.
