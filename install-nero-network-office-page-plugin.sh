#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="$ROOT/nero-network-office-page"
DEST="$HOME/.cursor/plugins/local/nero-network-office-page"
if [[ ! -d "$SRC" ]]; then
  echo "Plugin source not found: $SRC" >&2
  exit 1
fi
mkdir -p "$HOME/.cursor/plugins/local"
rm -rf "$DEST"
cp -a "$SRC" "$DEST"
echo "Installed to $DEST"
