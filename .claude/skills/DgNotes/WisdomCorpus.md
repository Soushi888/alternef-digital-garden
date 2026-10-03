# Wisdom Corpus

A local mirror of the Wisdom Context Window corpus (https://wisdom.owocki.com/) can supply primary-source passages from the world's wisdom traditions. This file is the single reference for using it in the garden: `/dg:create`, `/dg:improve`, `/dg:explore`, DgBlog and `/dg:validate` all point here instead of carrying their own copy.

The corpus is optional. Every command behaves exactly as it would without it whenever the lookup finds nothing relevant or cannot run.

## When to consult it

Consult the corpus when the work at hand touches a wisdom tradition:

- a note or essay whose topic belongs to a contemplative, philosophical or religious tradition (non-attachment, wu wei, stoic indifference, the Hermetic axiom);
- a concept the corpus graph knows (`concepts "<topic>"` returns a match);
- a claim about what a tradition says, which deserves its primary source rather than a paraphrase from memory.

Do not consult it for technical, ecological or economic topics with no such tradition behind them. A word match there is noise (snow "flakes" for Nix flakes).

## Availability (hard)

Every call goes through one path:

```bash
bun "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts" <command> ...
```

If `PAI_DIR` is unset, the tool is absent at that path, or a command fails for any reason other than an unknown concept or passage (no index yet, bun error), skip the lookup silently. Never mention the corpus in that case, and never look for the tool anywhere else.

## Commands

```bash
# Concepts the corpus graph knows for a topic (slug, name, tradition, gloss)
bun "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts" concepts "<topic>" --limit 5 --json

# One concept with its key passages resolved to local passages (local_id)
bun "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts" concept <concept-slug> --json

# Full-text search restricted to quotable rows, without private notes
bun "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts" search "<topic>" --cite --limit 8 --json

# The full text of one passage: the only source of quotable text
bun "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts" passage <id> --json

# Catalog fields of a text (author, translator, source, license, kind)
bun "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts" text <slug> --count 0 --json
```

- `<concept-slug>` is kebab-case (`non-attachment`, `wu-wei`). `concept` exits 1 with `unknown concept` when nothing matches: ignore it.
- If a search returns zero passages, retry once with the single core term of the topic, then stop.
- `search --tradition a,b` narrows to named traditions; each passage row carries its `tradition`.
- `passage` and `search` rows already carry `title`, `author`, `translator`, `source`, `kind` and `layer`. Only `license` needs the `text` call.

## Public-garden rules (hard)

The garden is public. These rules hold for every command that uses the corpus.

1. **Passages only, never annotations.** `search --json` returns `{passages, annotations}`. Read `passages` only. `annotations` are private notes: never show them, quote them, paraphrase them, or let them shape a note. `--cite` already drops them; the rule holds even when it would not.
2. **Only full text is quoted.** Only `kind: "full-text"` passages may be quoted. A `kind: "summary"` row is curator-written with no stated licence, and a concept's own `gloss` and `summary` are curator-written too. They may be paraphrased in Soushi's words or linked, never quoted.
3. **Quotable text comes from a fetched passage.** Only the `text` field returned by `passage <id> --json` is ever quoted. A search hit's `snippet` holds highlight brackets (`[non]-[attachment]`) and `...` cuts: it is for judging relevance only and is never quoted or shown as an excerpt. Fetch the hit with its `id`, never its `idx`.
4. **Key passages resolve through `local_id`.** A concept's `key_passages` name a passage by its `quote` and `local_id`, the id of the local passage whose text contains that quote. Their `idx` is upstream numbering and addresses nothing locally: never use it. A key passage whose `local_id` is missing or null has no local match and is not offered. Never quote a key passage's own inline `text`; fetch `passage <local_id> --json` and quote from that.
5. **Quotation text never comes from memory.** If it was not just fetched, it is not quoted.

## Judge relevance

A hit is relevant only when the passage uses the topic's own sense. A word match in another sense ("attachment" of a file) is not a hit. If nothing is relevant, say nothing about the corpus and continue.

## Offer, never insert

Show Soushi at most 3 passages, each with title, author, translator, a short excerpt taken from the fetched `text`, the passage id, and the source URL when the catalog has one. Prefer clean passages: some full-text rows are OCR scans with visible errors, so say so when an excerpt shows them. Soushi picks which ones go in, possibly none. Nothing from the corpus enters a file unless he accepts it.

## Citation form

An accepted passage is cited with an attribution line followed by the verbatim quotation as a blockquote. The attribution line ends with the citation marker `` `wcw:SLUG/ID` ``, where `SLUG` is the passage's `slug` and `ID` its `id`. `/dg:validate` finds quotations by this marker and checks them against the corpus, so the marker is required and its shape is fixed.

### In a note's `## References`

With a catalog `source`:

```md
## References

- _Title_, Author, translated by Translator. [Original source](SOURCE_URL). Read in the [Wisdom Context Window corpus](https://wisdom.owocki.com/explorer/#/read/SLUG), passage `wcw:SLUG/ID`.
  > Verbatim passage text.
```

Without one (the catalog `source` is null for many full texts):

```md
## References

- _Title_, Author, translated by Translator. Read in the [Wisdom Context Window corpus](https://wisdom.owocki.com/explorer/#/read/SLUG), passage `wcw:SLUG/ID`.
  > Verbatim passage text.
```

When the note's template has no `## References` heading (the Blog Post template has none), add one at the end of the note.

### As an epigraph or an in-text quotation

An essay or article may open with a passage as its epigraph, or quote one inside a section. The same attribution line comes first, then one blank line, then the quotation:

```md
_Title_, Author, translated by Translator. [Original source](SOURCE_URL), passage `wcw:SLUG/ID`:

> Verbatim passage text.
```

An epigraph carries its full attribution where it stands; it is not repeated under `## References`.

### Rules for every form

- Author and translator come from the catalog. Omit "translated by" when `translator` is null.
- `SOURCE_URL` is the catalog `source` field, the public-domain edition the text was taken from. When it is null, the corpus reader link is the only link. Never invent a source URL and never search the web for one: a substitute edition could attribute the quote to a different text than the one it was taken from.
- When `license` is set and is not public domain (for example CC BY 4.0), state it after the last link.
- Use the corpus reader link `https://wisdom.owocki.com/explorer/#/read/SLUG` only when the passage's `layer` is `base`: a `commons` row has no upstream reader page, so drop that link and keep title, author, translator and the marker.
- The quotation is the passage `text`, verbatim. A long passage may be trimmed to the contiguous lines that carry the point, with `[...]` marking each cut; the kept segments stay in their original order. `[...]` is the only editorial mark allowed: no corrected spelling, no added emphasis, no bracketed insertions. A passage whose OCR errors make it unreadable is not quoted; offer a cleaner one instead.
- Never alter quoted text to satisfy a style rule. An em-dash or double hyphen inside a cited quotation is quoted source text: report it as such, and it does not block a commit.

## Integrity check

`/dg:validate` runs `.claude/skills/DgNotes/Tools/CheckCorpusQuotes.ts`, which reads every marker in `content/`, fetches `passage <ID> --json`, and reports as a violation: a quotation that does not match the passage text (whitespace normalised, `[...]` cuts allowed), an unknown id, a slug that does not match the passage, a passage that is not `full-text`, and a marker with no quotation after it. Without the corpus tool on the machine, the check is skipped with a note.

```bash
bun .claude/skills/DgNotes/Tools/CheckCorpusQuotes.ts [paths...] [--json]
```

Exit 0 is clean or skipped, 1 is violations, 2 is a corpus tool that failed to run (reported as a note, not a content violation). Passage ids belong to the local index, so a reindex after a corpus update can move them; an `unknown-id` or `slug-mismatch` after a sync means the citation needs its id refreshed, which the slug in the marker makes easy to find.

## Per-command use

| Command | Use | Writes |
|---|---|---|
| `/dg:create` | Lookup during the MCP pre-flight; offer up to 3 passages before drafting | Only accepted passages, under `## References` |
| `/dg:improve` | For an existing note in a tradition, offer up to 3 passages for its References | Only accepted passages, never unasked |
| `/dg:explore traditions` | "What do the traditions say" about a note or concept | Nothing |
| DgBlog | Epigraph or in-text quotation from a primary text | Only accepted passages |
| `/dg:validate` | Citation integrity over `content/` | Nothing |
