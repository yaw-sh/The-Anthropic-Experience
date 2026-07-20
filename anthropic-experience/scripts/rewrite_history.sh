#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "usage: rewrite_history.sh SOURCE_REPOSITORY EPHEMERAL_MIRROR REWRITE_INPUT_DIR" >&2
  exit 2
fi

source_repo=$(git -C "$1" rev-parse --show-toplevel)
content_root="$source_repo"
if [ -d "$source_repo/anthropic-experience" ]; then
  content_root="$source_repo/anthropic-experience"
fi
mirror=$(python3 "$content_root/scripts/rewrite_safety.py" --target "$2")
inputs=$(cd "$3" && pwd -P)

test -f "$inputs/replace-text.txt"
test -f "$inputs/replacement-values.json"
test -f "$inputs/paths-to-remove.txt"
test -f "$inputs/ref-renames.json"
test -f "$inputs/rewrite-inventory.json"

git clone --mirror "$source_repo" "$mirror"

path_args=()
while IFS= read -r path; do
  [ -z "$path" ] && continue
  path_args+=(--path "$path")
done < "$inputs/paths-to-remove.txt"

if git filter-repo --version >/dev/null 2>&1; then
  git -C "$mirror" filter-repo --force \
    --replace-text "$inputs/replace-text.txt" \
    --replace-message "$inputs/replace-text.txt" \
    --name-callback 'return b"Public Contributor"' \
    --email-callback 'return b"public-contributor"' \
    --prune-empty never \
    --prune-degenerate never \
    "${path_args[@]}" --invert-paths
else
  export FILTER_BRANCH_SQUELCH_WARNING=1
  git -C "$mirror" filter-branch --force \
    --tree-filter "python3 '$content_root/scripts/rewrite_tree_filter.py' --inputs '$inputs'" \
    --msg-filter "python3 '$content_root/scripts/rewrite_tree_filter.py' --inputs '$inputs' --message" \
    --env-filter '
      GIT_AUTHOR_NAME="Public Contributor"
      GIT_AUTHOR_EMAIL="public-contributor"
      GIT_COMMITTER_NAME="Public Contributor"
      GIT_COMMITTER_EMAIL="public-contributor"
      export GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL GIT_COMMITTER_NAME GIT_COMMITTER_EMAIL
    ' --tag-name-filter cat -- --all
  git -C "$mirror" for-each-ref --format='delete %(refname)' refs/original | git -C "$mirror" update-ref --stdin
  git -C "$mirror" reflog expire --expire=now --all
  git -C "$mirror" gc --prune=now
fi

python3 "$content_root/scripts/rewrite_postprocess.py" --mirror "$mirror" --inputs "$inputs"

echo "rewritten_mirror=$mirror"
