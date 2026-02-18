#!/usr/bin/env bash
# validate-notes.sh — Validate digital garden knowledge notes
# Checks frontmatter, orphaned notes, missing indexes, and broken index links
set -euo pipefail

CONTENT_DIR="${1:-content/knowledge}"
ERRORS=0
WARNINGS=0

echo "=== Digital Garden Note Validation ==="
echo "Scanning: $CONTENT_DIR"
echo

# 1. Check for missing index.md in directories with 2+ files
echo "--- Missing Index Files ---"
while IFS= read -r dir; do
  file_count=$(find "$dir" -maxdepth 1 -name "*.md" ! -name "index.md" ! -name "_index.md" | wc -l)
  has_index=false
  [[ -f "$dir/index.md" ]] && has_index=true
  [[ -f "$dir/_index.md" ]] && has_index=true
  if [[ "$file_count" -ge 2 ]] && [[ "$has_index" == "false" ]]; then
    echo "  WARNING: $dir has $file_count notes but no index.md"
    ((WARNINGS++))
  fi
done < <(find "$CONTENT_DIR" -type d)

echo

# 2. Check frontmatter required fields
echo "--- Frontmatter Validation ---"
while IFS= read -r file; do
  # Skip index files for stricter checks
  basename=$(basename "$file")
  [[ "$basename" == "index.md" || "$basename" == "_index.md" ]] && continue

  # Check for title
  if ! head -30 "$file" | grep -q "^title:"; then
    echo "  ERROR: Missing title in $file"
    ((ERRORS++))
  fi

  # Check for tags
  if ! head -30 "$file" | grep -q "^tags:"; then
    echo "  ERROR: Missing tags in $file"
    ((ERRORS++))
  fi

  # Check for created date
  if ! head -30 "$file" | grep -q "^created:"; then
    # Also accept date: field
    if ! head -30 "$file" | grep -q "^date:"; then
      echo "  WARNING: Missing created/date in $file"
      ((WARNINGS++))
    fi
  fi
done < <(find "$CONTENT_DIR" -name "*.md" -type f)

echo

# 3. Check for relative paths to index files (common error)
echo "--- Index Link Validation ---"
while IFS= read -r file; do
  if grep -nE '\[\[\.\..*index' "$file" 2>/dev/null; then
    echo "  ERROR: Relative path to index in $file (use absolute paths)"
    ((ERRORS++))
  fi
done < <(find "$CONTENT_DIR" -name "*.md" -type f)

echo

# 4. Check naming conventions
echo "--- Naming Convention Check ---"
while IFS= read -r file; do
  basename=$(basename "$file" .md)
  if echo "$basename" | grep -qE '[A-Z]'; then
    echo "  WARNING: Uppercase in filename: $file (use kebab-case)"
    ((WARNINGS++))
  fi
  if echo "$basename" | grep -qE '_'; then
    echo "  WARNING: Underscore in filename: $file (use hyphens)"
    ((WARNINGS++))
  fi
done < <(find "$CONTENT_DIR" -name "*.md" -type f ! -name "index.md" ! -name "_index.md")

echo
echo "=== Summary ==="
echo "Errors:   $ERRORS"
echo "Warnings: $WARNINGS"

if [[ $ERRORS -gt 0 ]]; then
  exit 1
fi
exit 0
