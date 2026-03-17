#!/usr/bin/env bash
# CheckDates.sh — Verify frontmatter dates against git history
# Usage: bash CheckDates.sh [content/dir] [--full]
#   --full  Re-index all files even if already indexed

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$SKILL_DIR/STATE"
CONTENT_DIR="${1:-content/knowledge}"
FULL_SCAN="${2:-}"
TODAY=$(date -I)

# Resolve content dir relative to repo root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

echo "=== CheckDates — Date Verification ==="
echo "Content: $CONTENT_DIR"
echo "State:   $STATE_DIR"
echo

mkdir -p "$STATE_DIR"

# Seed state files if missing
[[ -f "$STATE_DIR/date-index.json" ]]  || echo '{}' > "$STATE_DIR/date-index.json"
[[ -f "$STATE_DIR/issues.json" ]]      || echo '[]' > "$STATE_DIR/issues.json"
[[ -f "$STATE_DIR/last-indexed.txt" ]] || echo ''   > "$STATE_DIR/last-indexed.txt"

LAST_INDEXED=$(cat "$STATE_DIR/last-indexed.txt" 2>/dev/null || echo '')

CHECKED=0
SKIPPED=0
ISSUE_LIST=""
INDEX_ENTRIES=""

while IFS= read -r file; do
  basename_f=$(basename "$file")
  [[ "$basename_f" == "index.md" || "$basename_f" == "_index.md" ]] && continue

  # Incremental mode: skip files not touched since last index
  if [[ -n "$LAST_INDEXED" && -z "$FULL_SCAN" ]]; then
    last_commit_ts=$(git log --follow --format="%as" -- "$file" 2>/dev/null | { head -1; cat >/dev/null; } || true)
    if [[ -n "$last_commit_ts" && "$last_commit_ts" < "$LAST_INDEXED" ]]; then
      SKIPPED=$((SKIPPED + 1))
      continue
    fi
  fi

  CHECKED=$((CHECKED + 1))

  # --- Git dates (authoritative) ---
  # Use process substitution to avoid SIGPIPE from head/tail with pipefail
  git_history=$(git log --follow --format="%as" -- "$file" 2>/dev/null || true)
  git_created=$(echo "$git_history" | tail -1 || true)
  git_modified=$(echo "$git_history" | head -1 || true)

  # --- Frontmatter dates (between first and second ---) ---
  frontmatter=$(awk 'BEGIN{n=0} /^---/{n++; next} n==1{print} n==2{exit}' "$file" 2>/dev/null || true)

  fm_date=$(   echo "$frontmatter" | grep -m1 "^date:"     | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)
  fm_updated=$(echo "$frontmatter" | grep -m1 "^updated:"  | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)
  fm_created=$(echo "$frontmatter" | grep -m1 "^created:"  | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)
  fm_modified=$(echo "$frontmatter" | grep -m1 "^modified:" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)

  status="ok"
  issue_types=""

  # 1. Wrong field names
  if [[ -n "$fm_created" ]]; then
    issue_types="${issue_types} wrong_field:created_not_date"
    status="issue"
  fi
  if [[ -n "$fm_modified" ]]; then
    issue_types="${issue_types} wrong_field:modified_not_updated"
    status="issue"
  fi

  # Use whichever date field exists for remaining checks
  effective_date="${fm_date:-$fm_created}"

  # 2. Missing date
  if [[ -z "$effective_date" ]]; then
    issue_types="${issue_types} missing_date"
    status="issue"
  fi

  # 3. Future date
  if [[ -n "$effective_date" && "$effective_date" > "$TODAY" ]]; then
    issue_types="${issue_types} future_date:$effective_date"
    status="issue"
  fi

  # 4. Updated before date (impossible)
  if [[ -n "$fm_updated" && -n "$effective_date" && "$fm_updated" < "$effective_date" ]]; then
    issue_types="${issue_types} updated_before_date"
    status="issue"
  fi

  # 5. Year mismatch vs git creation year
  if [[ -n "$effective_date" && -n "$git_created" ]]; then
    fm_year="${effective_date:0:4}"
    git_year="${git_created:0:4}"
    if [[ "$fm_year" != "$git_year" ]]; then
      issue_types="${issue_types} year_mismatch"
      status="issue"
    fi
  fi

  # Accumulate JSON index entry
  issues_json="[]"
  if [[ -n "$issue_types" ]]; then
    issues_json="["
    first=true
    for itype in $issue_types; do
      [[ "$first" == "true" ]] && first=false || issues_json="${issues_json},"
      issues_json="${issues_json}\"$itype\""
    done
    issues_json="${issues_json}]"
  fi

  [[ -n "$INDEX_ENTRIES" ]] && INDEX_ENTRIES="${INDEX_ENTRIES},"
  INDEX_ENTRIES="${INDEX_ENTRIES}
  \"$file\": {\"fm_date\": \"$effective_date\", \"fm_updated\": \"${fm_updated:-}\", \"git_created\": \"${git_created:-}\", \"git_modified\": \"${git_modified:-}\", \"status\": \"$status\", \"issues\": $issues_json}"

  # Collect issues for report
  if [[ "$status" == "issue" ]]; then
    for itype in $issue_types; do
      [[ -n "$ISSUE_LIST" ]] && ISSUE_LIST="${ISSUE_LIST},"
      ISSUE_LIST="${ISSUE_LIST}{\"file\":\"$file\",\"type\":\"$itype\",\"fm_date\":\"${effective_date:-}\",\"git_created\":\"${git_created:-}\",\"git_modified\":\"${git_modified:-}\"}"
    done
  fi

done < <(find "$CONTENT_DIR" -name "*.md" -type f | sort)

# Write state files
echo "{$INDEX_ENTRIES
}" > "$STATE_DIR/date-index.json"
echo "[${ISSUE_LIST}]" > "$STATE_DIR/issues.json"
date -I > "$STATE_DIR/last-indexed.txt"

# Build analysis report
issue_count=$(echo "${ISSUE_LIST}" | tr ',' '\n' | grep -c '"file"' || echo 0)
{
  echo "# Date Index Report"
  echo "Generated: $TODAY | Checked: $CHECKED | Skipped (cached): $SKIPPED | Issues: $issue_count"
  echo ""
  if [[ -n "$ISSUE_LIST" ]]; then
    echo "## Flagged Notes"
    echo ""
    # Parse each issue entry
    echo "$ISSUE_LIST" | tr '{' '\n' | grep '"file"' | while IFS= read -r entry; do
      f=$(echo  "$entry" | grep -oE '"file":"[^"]+"'       | grep -oE ':[^:]+$' | tr -d ':"')
      t=$(echo  "$entry" | grep -oE '"type":"[^"]+"'       | grep -oE ':[^:]+$' | tr -d ':"')
      fm=$(echo "$entry" | grep -oE '"fm_date":"[^"]+"'    | grep -oE ':[^:]+$' | tr -d ':"')
      gc=$(echo "$entry" | grep -oE '"git_created":"[^"]+"'| grep -oE ':[^:]+$' | tr -d ':"')
      gm=$(echo "$entry" | grep -oE '"git_modified":"[^"]+"'| grep -oE ':[^:]+$'| tr -d ':"')
      echo "### $f"
      echo "- Issue: \`$t\`"
      echo "- Frontmatter date: \`${fm:-none}\`"
      echo "- Git created: \`${gc:-unknown}\`"
      echo "- Git last modified: \`${gm:-unknown}\`"
      if [[ -n "$gc" ]]; then
        echo "- Suggested fix: \`date: $gc\` and \`updated: $gm\`"
      fi
      echo ""
    done
  else
    echo "All notes have correct dates."
  fi
} > "$STATE_DIR/analysis-report.md"

# --- Console output ---
echo "--- Results ---"
echo "Checked:  $CHECKED notes"
echo "Skipped:  $SKIPPED (cached, unchanged since last run)"
echo "Issues:   $issue_count"
echo ""

if [[ -n "$ISSUE_LIST" ]]; then
  echo "--- Flagged Notes ---"
  echo "$ISSUE_LIST" | tr '{' '\n' | grep '"file"' | while IFS= read -r entry; do
    f=$(echo  "$entry" | grep -oE '"file":"[^"]+"'       | grep -oE ':[^:]+$' | tr -d ':"')
    t=$(echo  "$entry" | grep -oE '"type":"[^"]+"'       | grep -oE ':[^:]+$' | tr -d ':"')
    fm=$(echo "$entry" | grep -oE '"fm_date":"[^"]+"'    | grep -oE ':[^:]+$' | tr -d ':"')
    gc=$(echo "$entry" | grep -oE '"git_created":"[^"]+"'| grep -oE ':[^:]+$' | tr -d ':"')
    echo "  [$t] $f"
    echo "    frontmatter: ${fm:-none}  →  git created: ${gc:-unknown}"
  done
  echo ""
  echo "Full report: $STATE_DIR/analysis-report.md"
  echo "Run Workflows/VerifyDates.md to fix."
fi
