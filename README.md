# Portfolio Template

A clean and professional portfolio template built with Next.js and Tailwind CSS.

## Getting Started

1. **Setup:** Install dependencies with `npm install`.
2. **Config:** Modify `config.yaml` to include your personal details, projects, and skills.
3. **Run:** Start the development server with `npm run dev`.

### Important Notes

- Whenever you modify `config.yaml`, run `npm run build` again or use one of the deploy scripts below. The `prebuild` step syncs `config.yaml` to `src/lib/data.ts` before Next.js builds the site.
- This repository is published under `/Trinh-Cong-Minh-Profile`, so if you rename the repository, update `basePath` in `next.config.ts`.

## Deployment

This project is configured for **GitHub Pages** on the `gh-pages` branch.

### Ubuntu / WSL

Run the scripts from the `main` branch.

#### First deploy or full redeploy

```bash
bash scripts/deploy-gh-pages.sh
```

#### Later updates

```bash
bash scripts/update-gh-pages.sh
```

Both scripts will:

- run `npm run build` on `main`
- add `.nojekyll` so GitHub Pages serves the `_next` assets correctly
- push only the static files from `/out` to the remote `gh-pages` branch
- prefer the `minh-profile` remote and fall back to `origin`

If you need a different remote or branch, override them like this:

```bash
DEPLOY_REMOTE=minh-profile DEPLOY_BRANCH=gh-pages bash scripts/update-gh-pages.sh
```

### GitHub Pages Settings

In your repository, open **Settings > Pages** and set:

- **Source:** `Deploy from a branch`
- **Branch:** `gh-pages`
- **Folder:** `/ (root)`

---
Generated from a customizable template.
