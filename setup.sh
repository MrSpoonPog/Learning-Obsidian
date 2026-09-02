#!/usr/bin/env bash
# John Learning - setup (Linux/macOS port of setup.cmd)
# Idempotent - safe to re-run any time.
set -u

cd "$(dirname "$0")"
VIS=".claude/tools/visual"

echo
echo " ==========================================="
echo "   John Learning  -  setup"
echo " ==========================================="
echo

# ---------------------------------------------------------------- 1. Node
echo " [1/5] Checking Node.js..."
if ! command -v node >/dev/null 2>&1; then
    echo "       ERROR  Node.js not found on PATH."
    echo "              Install it, then re-run this script."
    exit 1
fi
echo "       ok  Node $(node -v)"

# ------------------------------------------------------- 2. System files
echo " [2/5] Checking system files..."
for f in ".claude/skills/teach/SKILL.md" \
         ".claude/skills/review/SKILL.md" \
         ".claude/agents/researcher.md" \
         "$VIS/svg2png.mjs"; do
    if [ ! -f "$f" ]; then
        echo "       ERROR  missing: $f"
        echo "              Repo looks incomplete - re-clone it."
        exit 1
    fi
done
echo "       ok  skills, agents and tools present"

# ----------------------------------------------------------- 3. Folders
echo " [3/5] Creating working folders..."
mkdir -p knowledge lessons viz "$VIS/scratch"
echo "       ok  knowledge/  lessons/  viz/"

# -------------------------------------------------------------- 4. Deps
echo " [4/5] Installing render toolchain..."
echo "       (first run downloads a private Chrome - this can take a few minutes)"
if ! ( cd "$VIS" && npm install --no-fund --no-audit --loglevel=error ); then
    echo "       ERROR  npm install failed."
    exit 1
fi
( cd "$VIS" && npx --yes puppeteer browsers install chrome >/dev/null 2>&1 )
echo "       ok  dependencies installed"

# ------------------------------------------------------ 5. Verify render
echo " [5/5] Verifying the render pipeline..."
rm -f "$VIS/scratch/_smoke_mmd.png" "$VIS/scratch/_smoke_svg.png"
( cd "$VIS" && npx --yes mmdc -i fixtures/smoke.mmd -o scratch/_smoke_mmd.png -b white -s 2 >/dev/null 2>&1 )
( cd "$VIS" && node svg2png.mjs fixtures/smoke.svg scratch/_smoke_svg.png 2 >/dev/null 2>&1 )
if [ ! -f "$VIS/scratch/_smoke_mmd.png" ] || [ ! -f "$VIS/scratch/_smoke_svg.png" ]; then
    echo "       ERROR  render check failed."
    echo "              On a bare Linux box Chrome usually needs system libs:"
    echo "              sudo apt install -y libnss3 libatk1.0-0t64 libatk-bridge2.0-0t64 \\"
    echo "                   libcups2t64 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 \\"
    echo "                   libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2t64"
    exit 1
fi
rm -f "$VIS/scratch/_smoke_mmd.png" "$VIS/scratch/_smoke_svg.png"
echo "       ok  mermaid and svg both render"

echo
echo " Setup complete. Open this folder in Claude Code and run /learn <topic>."
echo
