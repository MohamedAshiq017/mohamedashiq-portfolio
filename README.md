# Mohamed Ashiq S — Portfolio

A terminal/editor-themed developer portfolio, built from your real resume.

- **Home** — a compact typing terminal (fast, matrix-style scramble-decode)
  plus a live "recent activity" stat instead of a raw follower count.
- **Experience** — Vaken Technologies role rendered as a git log, education,
  and a recognition block for the SIH 2023 win and NPTEL top-1% result.
- **Projects** — a featured spotlight card for MediLink up top, then every
  public non-fork repo pulled live from the GitHub API below it. Filter by
  language. Click any card to open a detail dialog with live language/dep
  badges, a Dockerfile preview when one exists, and a live-demo link when
  the repo has one set. Drag-to-reorder is owner-only (see below).
- **About** — real skills list + a live GitHub panel: contribution heatmap,
  stats card, and top languages, fetched fresh on every page load.
- **Contact** — icon + handle for GitHub, LinkedIn, X, Instagram and email.
  Either the logo or the handle text opens the link.

Fully responsive and componentized — see `src/components/`, `src/hooks/`,
and `src/lib/`.

## 1. The two things still worth doing

Open `src/config.js`:

- `resumeUrl: '#'` — host your resume PDF somewhere (Google Drive, or even
  a `resume.pdf` dropped in the `public/` folder here) and link it.
- `featuredProject.repoName: 'MediLink'` — this only auto-links to your live
  repo if a GitHub repo of that exact name exists and is public. If MediLink
  isn't pushed to GitHub yet, either push it or swap `repoName` for one that is.
  Set a repo's **Website** field on GitHub (or `homepage` via the API) to
  make its "live demo" link show up automatically, both here and in the
  project dialogs.

Everything else — name, role, experience, education, achievements, skills,
socials — is already filled in from your resume.

## 2. Run locally

```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`.

## 3. Unlock reorder mode (owner only)

Drag-to-reorder is hidden from regular visitors on purpose. To turn it on
for yourself, open the site once with `?owner=1` in the URL, e.g.:

```
http://localhost:5173/?owner=1
```

That sets a flag in that browser's `localStorage`, so the "reorder projects"
button stays visible on that device from then on — you don't need to keep
the query param around. It never appears for anyone visiting the plain URL.

## 4. Launch it

### Option A: GitHub Pages, fully automatic (recommended)

Already included: `.github/workflows/deploy.yml` builds and publishes on
every push to `main`.

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/MohamedAshiq017/portfolio.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source → GitHub Actions**. Live at
`https://mohamedashiq017.github.io/portfolio/` in about a minute. Every
future push redeploys automatically. To use reorder mode on the live site,
visit it once as `.../?owner=1`.

### Option B: Vercel (fastest, easiest custom domain)

```bash
npm install -g vercel
vercel
```

## Notes

- GitHub API is unauthenticated client-side, capped at 60 requests/hour per
  visitor IP — fine for a personal portfolio. The project dialog makes a
  couple of extra calls per repo (languages, `package.json`, `Dockerfile`)
  only when you actually open it, and fails silently if any of them 404s
  or the limit is hit.
- `pinnedRepos` in `config.js` sets the default project order for every
  visitor. In-page drag/reorder only persists to the browser it was done in.
- The contribution heatmap uses `ghchart.rshah.org` (this was pointed at a
  dead domain before — now fixed) and the stats cards use the free
  `github-readme-stats.vercel.app` service. Both degrade gracefully to a
  small text fallback with a direct GitHub link if either is ever down or
  rate-limited, so a hiccup there never breaks the rest of the page.
