# Mohamed Ashiq S — Portfolio

Terminal-inspired developer portfolio for Mohamed Ashiq S, a backend-leaning
full-stack developer focused on scalable applications, APIs, and practical
developer tools.

## Overview

The portfolio combines a developer-console visual style with live GitHub data.
It presents professional experience, education, achievements, technical
skills, featured work, public projects, and contact links in a responsive
single-page experience.

## Features

- Terminal-style hero section with animated profile details
- Experience timeline, education, and achievement sections
- Featured MediLink project spotlight
- Live public GitHub repository listing with language filters
- Project detail dialogs with repository metadata and README images
- GitHub activity, contribution, and language panels
- Owner-only project reorder controls stored locally in the browser
- Responsive layouts for desktop and mobile screens
- Canvas-based multicolor scroll sparkler effect

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- GitHub REST API

## Content Configuration

Personal portfolio content lives in [`src/config.js`](src/config.js). Update
the existing objects and arrays there to change:

- Profile details, bio, and social links
- Skills
- Experience
- Education
- Achievements
- Featured project
- Default GitHub project order

Adding an item to the existing `experience`, `education`, `achievements`, or
`skills` data automatically renders it through the corresponding component.

## Local Development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

Create a production build with:

```bash
npm run build
```

## Deployment

This is a client-side Vite application and does not require environment
variables or a server. It can be deployed directly to Vercel using:

```text
Build command: npm run build
Output directory: dist
```

The repository also includes a GitHub Pages workflow for deployments from the
`main` branch.

## GitHub Data

Public repository and profile data is fetched in the browser from the GitHub
REST API. The project works without authentication, but GitHub's unauthenticated
rate limit applies. Private repositories are not displayed by the live project
feed.

Project detail information is loaded on demand and degrades gracefully when a
repository file or external GitHub image service is unavailable.

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
