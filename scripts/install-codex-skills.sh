#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$REPO_ROOT/skills"
DST="${CODEX_SKILLS_DIR:-${CODEX_HOME:-$HOME/.codex}/skills}"
CHECK_ONLY=0
PRUNE=0
MANIFEST_NAME=".metforge-install.txt"

usage() {
  printf '%s\n' \
    "Usage: scripts/install-codex-skills.sh [--check] [--prune] [--dest PATH]" \
    "" \
    "  --check      Compare installed MetForge skills without changing them." \
    "  --prune      Remove obsolete skills previously installed by this script." \
    "  --dest PATH  Override the Codex skills directory."
}

die() {
  printf 'error: %s\n' "$*" >&2
  exit 1
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --check) CHECK_ONLY=1 ;;
    --prune) PRUNE=1 ;;
    --dest)
      shift
      [ "$#" -gt 0 ] || die "--dest requires a directory"
      DST="$1"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *) die "unknown argument: $1" ;;
  esac
  shift
done

[ -d "$SRC" ] || die "skills directory not found: $SRC"
command -v diff >/dev/null 2>&1 || die "diff is required"

skill_names() {
  for path in "$SRC"/*/; do
    [ -d "$path" ] || continue
    [ -f "$path/SKILL.md" ] || die "missing SKILL.md in $path"
    basename "$path"
  done | sort
}

verify() {
  status=0
  while IFS= read -r name; do
    if [ ! -d "$DST/$name" ]; then
      printf 'MISSING  %s\n' "$name"
      status=1
    elif diff -qr "$SRC/$name" "$DST/$name" >/dev/null; then
      printf 'MATCH    %s\n' "$name"
    else
      printf 'DIFF     %s\n' "$name"
      status=1
    fi
  done < <(skill_names)
  return "$status"
}

if [ "$CHECK_ONLY" -eq 1 ]; then
  verify
  exit $?
fi

mkdir -p "$DST"
command -v rsync >/dev/null 2>&1 || die "rsync is required for installation"

while IFS= read -r name; do
  mkdir -p "$DST/$name"
  rsync -a --delete "$SRC/$name/" "$DST/$name/"
  printf 'INSTALLED %s\n' "$name"
done < <(skill_names)

manifest="$DST/$MANIFEST_NAME"
if [ "$PRUNE" -eq 1 ] && [ -f "$manifest" ]; then
  while IFS= read -r old_name; do
    case "$old_name" in ""|\#*) continue ;; esac
    case "$old_name" in metforge-*) ;; *) continue ;; esac
    if ! skill_names | grep -Fxq "$old_name" && [ -d "$DST/$old_name" ]; then
      rm -rf "$DST/$old_name"
      printf 'PRUNED    %s\n' "$old_name"
    fi
  done < "$manifest"
fi

{
  printf '# Managed by MetForge\n'
  skill_names
} > "$manifest"

verify
