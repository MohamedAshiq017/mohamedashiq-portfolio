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

## 1. Update your content

Open `src/config.js`. This is the main day-to-day content file:

- `bio`, `skills`, `experience`, `education`, and `achievements` are rendered
  from arrays or objects. Add an item using the existing object shape and it
  appears automatically; you do not need to hardcode a new JSX block.
- `resumeUrl` points to the external resume file opened by the download loader.
- `featuredProject` controls the spotlight card. Its `repoName` should match a
  public GitHub repository if you want live repository details.
- `pinnedRepos` controls the default project order. Unlisted repositories are
  appended after the pinned ones, sorted by stars.

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

## 2. Deploy with Vercel (recommended)

This is a client-side Vite app and needs no server or environment variables.
The simplest deployment is:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the detected settings: build command `npm run build` and output
  directory `dist`.
4. Every push to the selected production branch creates a new deployment.

You can also deploy from the terminal:

```bash
npm install -g vercel
vercel
```

## 3. GitHub Pages alternative

The repository includes `.github/workflows/deploy.yml`, which builds and
publishes on pushes to `main`.

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

## 4. Notes and limits

- GitHub API requests are made in the visitor's browser and unauthenticated,
  so the usual limit is about 60 requests per hour per visitor IP. If the
  limit is reached, projects or project details may fail temporarily.
- Only public repositories are available, and the main repository request is
  limited to 100 repositories.
- Opening a project dialog makes extra best-effort requests for languages,
  dependencies, Dockerfile, Python dependency files, and README images.
- README relative image fallback assumes the `master` branch; images in repos
  using only `main` may not load.
- `pinnedRepos` in `config.js` sets the default project order for every
  visitor. In-page drag/reorder only persists to the browser it was done in.
- The GitHub heatmap and statistics use external image services and may be
  unavailable independently of the portfolio.
- Do not add API keys, passwords, or private tokens to this frontend. Vite
  `VITE_*` variables are exposed to visitors and are not secret.
