#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." >/dev/null 2>&1 && pwd)"

detect_remote() {
  if git -C "$REPO_ROOT" remote | grep -qx 'minh-profile'; then
    printf '%s\n' 'minh-profile'
    return 0
  fi

  if git -C "$REPO_ROOT" remote | grep -qx 'origin'; then
    printf '%s\n' 'origin'
    return 0
  fi

  return 1
}

REMOTE="${DEPLOY_REMOTE:-}"
BRANCH="${DEPLOY_BRANCH:-gh-pages}"
COMMIT_MESSAGE="${DEPLOY_MESSAGE:-Deploy static site}"

if [[ -z "$REMOTE" ]]; then
  if ! REMOTE="$(detect_remote)"; then
    echo "Could not find a deployment remote. Set DEPLOY_REMOTE=minh-profile or DEPLOY_REMOTE=origin." >&2
    exit 1
  fi
fi

CURRENT_BRANCH="$(git -C "$REPO_ROOT" rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Run this script from the main branch. Current branch: $CURRENT_BRANCH" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found in PATH." >&2
  exit 1
fi

AUTHOR_NAME="${DEPLOY_GIT_NAME:-$(git -C "$REPO_ROOT" config user.name || true)}"
AUTHOR_EMAIL="${DEPLOY_GIT_EMAIL:-$(git -C "$REPO_ROOT" config user.email || true)}"

if [[ -z "$AUTHOR_NAME" ]]; then
  AUTHOR_NAME='GitHub Pages Deploy'
fi

if [[ -z "$AUTHOR_EMAIL" ]]; then
  AUTHOR_EMAIL='github-pages-deploy@local'
fi

REMOTE_URL="$(git -C "$REPO_ROOT" remote get-url "$REMOTE")"
TEMP_DIR="$(mktemp -d)"

cleanup() {
  if [[ "${KEEP_DEPLOY_TEMP:-0}" != "1" ]]; then
    rm -rf "$TEMP_DIR"
  else
    echo "Keeping temporary deploy directory: $TEMP_DIR"
  fi
}

trap cleanup EXIT

echo "Building static site from main..."
rm -rf "$REPO_ROOT/out"
(cd "$REPO_ROOT" && npm run build)

if [[ ! -f "$REPO_ROOT/out/index.html" ]]; then
  echo "Build finished but out/index.html was not generated." >&2
  exit 1
fi

touch "$REPO_ROOT/out/.nojekyll"

cp -a "$REPO_ROOT/out/." "$TEMP_DIR/"
cat > "$TEMP_DIR/.gitignore" <<'EOF'
.DS_Store
Thumbs.db
EOF

git -C "$TEMP_DIR" init -q
git -C "$TEMP_DIR" checkout -q -b "$BRANCH"
git -C "$TEMP_DIR" config user.name "$AUTHOR_NAME"
git -C "$TEMP_DIR" config user.email "$AUTHOR_EMAIL"
git -C "$TEMP_DIR" add -A
git -C "$TEMP_DIR" commit -q -m "$COMMIT_MESSAGE"

if [[ "${DRY_RUN:-0}" == "1" ]]; then
  echo "Dry run complete. Review the temporary deploy directory: $TEMP_DIR"
  exit 0
fi

git -C "$TEMP_DIR" remote add deploy "$REMOTE_URL"
git -C "$TEMP_DIR" push -f deploy "HEAD:$BRANCH"

echo "Deployed to $REMOTE/$BRANCH"