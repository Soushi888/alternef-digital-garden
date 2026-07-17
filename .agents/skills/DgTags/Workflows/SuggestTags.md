# Workflow: SuggestTags

Suggests 3-7 tags for a single note, ready to paste into frontmatter. Used during note creation, editing, or bulk tagging.

## Input

A note file path relative to the project root, e.g.:
```
content/knowledge/tools-and-technology/holochain/architecture/hdk.md
content/blog/my-post.md
```

## Steps

### Step 1: Read the note

Read the full file at the given path. Extract:
- Existing frontmatter (to understand what tags, if any, are already present)
- Title and description from frontmatter
- Body content (first 500 words are usually sufficient)
- Wikilinks in the body (link targets are strong signals for related concepts)

### Step 2: Determine the domain tag

Map the file path to its domain:

| Path prefix | Domain tag |
|-------------|------------|
| `content/knowledge/land-and-nature-stewardship/` | `ecology` |
| `content/knowledge/built-environment/` | `architecture` |
| `content/knowledge/tools-and-technology/` | `programming` |
| `content/knowledge/culture-and-education/` | `education` |
| `content/knowledge/health-and-wellbeing/` | `health` |
| `content/knowledge/finance-and-economics/` | `economics` |
| `content/knowledge/governance-and-community/` | `governance` |
| `content/blog/` | `blog` |
| `content/alternef/` | (no domain tag — use topic tags) |
| `content/portfolio/` | (no domain tag — use topic tags) |

The domain tag is always the **first** tag in the suggestion.

Exception: blog posts get `blog` as the first tag always.

### Step 3: Identify topic signals from the content

Check these sources in order:

1. **Path segments**: Subdirectory names are strong signals. `holochain/architecture/` → tags `holochain`, `software-architecture`
2. **Frontmatter title**: Key nouns and proper names in the title
3. **Frontmatter description**: Concepts mentioned in the description
4. **Body headings** (H2/H3): Section headings reveal subtopics
5. **Wikilinks**: Each `[[target]]` in the body is a related concept — check if the target name matches a TagVocabulary entry
6. **Body text** (first 500 words): Scan for TagVocabulary terms appearing as significant nouns

### Step 4: Match signals to TagVocabulary

For each signal identified, check if it matches a tag in `TagVocabulary.md`:
- Direct match: use the tag as-is
- Alias match: use the canonical form (not the alias)
- No match: consider whether to suggest it as a new tag or skip

Do not invent tags not in TagVocabulary.md without noting that they are new candidates.

### Step 5: Select 3-7 tags

Order the selected tags:
1. Domain tag (always first)
2. Most specific topic tags (directly describe the note's content)
3. Broader category tags (if they add discovery value)

For blog posts: `blog` is always first, then domain tag if the note belongs to a domain, then topic tags.

Prefer specificity over breadth. A note on Rust's ownership model needs `rust` and `programming`, not also every language it's not about.

### Step 6: Present the suggestion

Output as a pasteable YAML array:

```yaml
tags: ["programming", "holochain", "rust", "distributed-systems"]
```

Also briefly explain each tag choice (one line per tag) so the user can evaluate:
- `programming` — domain tag for tools-and-technology notes
- `holochain` — note is about Holochain architecture
- `rust` — Holochain SDK is written in Rust
- `distributed-systems` — covers agent-centric distributed design

### Step 7: Offer to write the tags

Ask: "Write these tags to the frontmatter? [yes/edit/skip]"

On "yes": write the tags array to the file's frontmatter.
On "edit": user provides revised tags, write those instead.
On "skip": do nothing, the user will paste manually.

### Step 8: Propagate tags to related notes across the garden

After writing tags to the target note (Step 7), scan for other notes in the garden that could also benefit from the newly suggested tags.

**Identifying candidate notes (three tiers, ranked by relevance):**

1. **Tier 1 — Wikilinked notes (strongest signal)**: Parse the note body for `[[path/to/note]]` and `[[path/to/note|label]]` patterns. Notes directly linked to or from the target share explicit semantic relationship.
2. **Tier 2 — Same subdirectory**: Notes sharing the same directory path as the target are thematically related siblings.
3. **Tier 3 — Shared existing tags**: Query `STATE/tag-index.json` for notes that already share at least 2 tags with the target. Fewer than 2 shared tags is too weak a signal for Tier 3.

**For each candidate note:**

1. Read its current `tags:` from `STATE/tag-index.json` (no file read required — index has the data)
2. Compute the diff: which of the target note's new tags are absent from this candidate?
3. Apply propagation rules (see below)
4. If any tags pass the filter, include the note in the propagation table

**Propagation rules:**

- Propagate: vocabulary topic tags shared across notes (e.g., `holochain`, `distributed-systems`, `valueflows`, `rust`)
- Do NOT propagate: domain tags (`ecology`, `programming`, `education`, `health`, `economics`, `governance`, `architecture`) — each note keeps its own domain classification
- Do NOT propagate: `blog` tag to non-blog notes, or vice versa
- Do NOT propagate a tag if the candidate note's path is in a completely unrelated domain (e.g., do not propagate `yoga` to a blockchain note)
- Include Tier 3 candidates only when the shared tag overlap is 2+ tags

**Output format:**

Present a ranked propagation table after the single-note suggestion:

```
Notes across the garden that could also receive these tags:

| Tier | File | Missing tags |
|------|------|-------------|
| 1 (linked) | content/knowledge/.../holochain.md | holochain, distributed-systems |
| 2 (sibling) | content/knowledge/.../rea-accounting.md | valueflows |
| 3 (shared tags) | content/knowledge/.../p2p.md | distributed-systems |
```

Ask: "Apply these propagation suggestions? [all/select/skip]"

- `all`: write the suggested missing tags to all listed files in-place, preserving existing tags
- `select`: iterate through each file one by one, asking per-file whether to apply
- `skip`: do nothing — user will handle manually

If no candidate notes are found, or all candidates already have the new tags, skip Step 8 silently.

## Blog Post Special Case

For notes in `content/blog/`:
- `blog` is always the first tag
- If the post is about a technical topic, include the relevant domain tag second
- Then topic tags

Example:
```yaml
tags: ["blog", "programming", "holochain", "distributed-systems"]
```
