#!/usr/bin/env bash
set -euo pipefail
repo="${1:-/home/ubuntu/code/nodejs_demo}"
state="$HOME/.local/state/china-tech-trip"
mkdir -p "$state"
exec 9>"$state/update.lock"
flock -n 9 || exit 0
cd "$repo"
export GIT_TERMINAL_PROMPT=0
timeout 90 git fetch --quiet origin main
old=$(git rev-parse HEAD)
new=$(git rev-parse origin/main)
[ "$old" != "$new" ] || exit 0
[ "$(git branch --show-current)" = main ] || { echo 'Not on main; update stopped.'; exit 1; }
git merge-base --is-ancestor "$old" "$new" || { echo 'History diverged; manual review needed.'; exit 1; }
# Never automatically deploy backend, database or server configuration changes.
if git diff --name-only "$old" "$new" | grep -Ev '^(frontend/|deploy/)' >/dev/null; then
  echo 'Changes outside frontend/deploy; manual deployment required.'; exit 1
fi
[ -z "$(git status --porcelain -- frontend deploy)" ] || { echo 'Local website edits exist; update stopped.'; exit 1; }
stamp=$(date -u +%Y%m%dT%H%M%SZ)
backup="$state/backups/$stamp-$old"
mkdir -p "$backup"
tar -czf "$backup/frontend.tar.gz" frontend
git diff > "$backup/local-config.patch"
printf '%s\n' "$old" > "$backup/revision"
git merge --ff-only "$new"
curl --fail --silent --max-time 10 http://127.0.0.1:3000/api/health >/dev/null
curl --fail --silent --max-time 10 http://127.0.0.1:8080/ >/dev/null
printf '%s deployed %s (previous %s)\n' "$stamp" "$new" "$old"
