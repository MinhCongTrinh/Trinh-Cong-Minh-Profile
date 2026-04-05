# Portfolio Template

A clean and professional portfolio template built with Next.js and Tailwind CSS.

## Getting Started

1. **Setup:** Install dependencies with `npm install`.
2. **Config:** Modify `config.yaml` to include your personal details, projects, and skills.
3. **Run:** Start the development server with `npm run dev`.

## Deployment

This portfolio is ready to be hosted on **GitHub Pages**.

### 1. Build the project
Run the build script to generate a static distribution:
```bash
npm run build
```
The static files will be generated in the `/out` directory.

### 2. Host on GitHub Pages
- **Standard (GitHub Actions):** Go to repository Settings > Pages. Under "Build and deployment", set the source to "GitHub Actions". Search for "Next.js" in the suggested workflows.
- **Manual (Branch):** You can push the contents of the `/out` folder directly to a `gh-pages` branch.

*Note: If hosting on a subpath (e.g., `username.github.io/repo-name`), remember to update `basePath` in `next.config.ts`.*

---
Generated from a customizable template.
