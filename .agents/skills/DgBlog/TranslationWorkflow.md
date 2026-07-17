# EN→FR Translation Workflow

## Pre-Translation Checklist

1. English post is finalized and reviewed
2. French file created in `content/blog/fr/`
3. Filename follows French kebab-case convention

## Frontmatter Translation

| Field | English | French |
|-------|---------|--------|
| `title` | English title | French translation |
| `subtitle` | English subtitle | French translation |
| `description` | English desc | French translation |
| `tags` | `["blog", ...]` | Keep `"blog"`, translate others |
| `language` | (not set) | Add `"fr"` |
| `categories` | English categories | French translations |
| `author` | Keep as-is | Keep as-is |
| `date` | Keep as-is | Keep as-is |

## Tag Translation Map

| English | French |
|---------|--------|
| `blog` | `blog` (keep) |
| `consciousness` | `conscience` |
| `evolution` | `evolution` |
| `spirituality` | `spiritualite` |
| `natural-kingdoms` | `regnes-naturels` |
| `philosophy` | `philosophie` |
| `community` | `communaute` |
| `governance` | `gouvernance` |
| `economics` | `economie` |

## Content Translation Rules

1. **Translate all prose** — headings, paragraphs, lists
2. **Keep code blocks** in English (code is universal)
3. **Keep wikilinks targets** in English (filenames don't change): `[[bitcoin|Bitcoin]]` stays the same
4. **Translate wikilink display text** if appropriate: `[[bitcoin|Bitcoin]]` → `[[bitcoin|Bitcoin]]` (proper nouns stay)
5. **Translate image alt text**
6. **Keep URLs** unchanged
7. **Adapt idioms** — don't translate literally; find French equivalent
8. **Maintain formatting** — bold, italics, headings preserve same hierarchy

## Quality Checks

- [ ] `language: "fr"` in frontmatter
- [ ] All prose translated (no English remnants in body)
- [ ] Code blocks preserved in English
- [ ] Wikilink targets unchanged
- [ ] Tags translated where appropriate
- [ ] Natural French phrasing (not machine-translation style)
- [ ] Consistent terminology throughout
