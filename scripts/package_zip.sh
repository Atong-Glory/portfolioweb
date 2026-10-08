#!/bin/bash
# Package the RHIZORA TECH portfolio into a downloadable zip with a clean top-level folder.
set -e

ROOT=/home/z/my-project
STAGE=$ROOT/.zip-stage/rhizora-tech-portfolio
OUT=$ROOT/download/rhizora-tech-portfolio.zip

# Clean previous staging + output
rm -rf "$ROOT/.zip-stage"
rm -f "$OUT"
mkdir -p "$STAGE" "$ROOT/download"

# Reference design ships inside the zip too (design/ folder, documented in README)
mkdir -p "$STAGE/design"
cp "$ROOT/download/reference-design.jpg" "$STAGE/design/reference-design.jpg"

# Copy source tree (what a user needs to clone & run — no node_modules/.next/build artifacts)
cp -r "$ROOT/src"                "$STAGE/src"
cp -r "$ROOT/prisma"             "$STAGE/prisma"
cp -r "$ROOT/public"             "$STAGE/public"
cp -r "$ROOT/scripts"            "$STAGE/scripts"
mkdir -p "$STAGE/db"
cp    "$ROOT/db/custom.db"       "$STAGE/db/custom.db"

# Root configs & docs
cp "$ROOT/package.json"     "$STAGE/package.json"
cp "$ROOT/tsconfig.json"    "$STAGE/tsconfig.json"
cp "$ROOT/next.config.ts"   "$STAGE/next.config.ts"
cp "$ROOT/tailwind.config.ts" "$STAGE/tailwind.config.ts"
cp "$ROOT/postcss.config.mjs" "$STAGE/postcss.config.mjs"
cp "$ROOT/components.json"  "$STAGE/components.json"
cp "$ROOT/eslint.config.mjs" "$STAGE/eslint.config.mjs"
cp "$ROOT/.gitignore"       "$STAGE/.gitignore"
cp "$ROOT/bun.lock"         "$STAGE/bun.lock"
cp "$ROOT/README.md"        "$STAGE/README.md"
cp "$ROOT/.env.example"     "$STAGE/.env.example"

# Guard: no sandbox-absolute paths inside the shipped .env.example / README
if grep -R "/home/z" "$STAGE/.env.example" "$STAGE/README.md" "$STAGE/package.json"; then
  echo "ERROR: sandbox-absolute path leaked into shipped files"; exit 1
fi

# Build the zip (from staging parent so the archive has a top-level rhizora-tech-portfolio/)
cd "$ROOT/.zip-stage"
zip -r -9 -q "$OUT" rhizora-tech-portfolio \
  -x "*.DS_Store" "*__MACOSX*"

# Cleanup staging
cd "$ROOT"
rm -rf "$ROOT/.zip-stage"

echo "---- zip created ----"
ls -lh "$OUT"
echo "---- file count ----"
unzip -l "$OUT" | tail -1
