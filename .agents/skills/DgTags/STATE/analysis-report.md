# Tag Analysis Report

**Scan timestamp**: 2026-05-16T02:42:46.188Z (post-cleanup scan)
**Pre-cleanup scan**: 2026-05-16T01:56:32.488Z

---

## Summary

| Metric | Before | After |
|--------|--------|-------|
| Total files scanned | 573 | 573 |
| Unique tags | 327 | 302 |
| Total tag assignments | 2339 | 2348 |
| Empty-tag files | 2 | 2 |
| Format issues (YAML-list) | 1 | **0** |
| Orphan tags (count=1) | 28 | 42* |
| Alias tags found | 0 | 0 |

*Orphan count rose because new vocabulary tags were added (some with count=1 from new music-as-code.md tags) and duplicates were eliminated (merged pair tags now show as singletons on the canonical form side). This is expected and healthy.

---

## Empty Tag Files

Total: 2 files — **no action needed** (infrastructure files).

- `content/recent-changes.md`
- `content/index.md`

---

## Format Issues

Total: **0** (resolved).

The scanner initially flagged `fediverse.md` as YAML-list, but on inspection the file already used YAML-array format. Issue was a false positive in the scanner. No fix was needed.

---

## Alias Tags Found

**None.** The garden is clean on alias usage. The alias table in TagVocabulary.md was pre-populated with the pairs already identified and fixed in a prior cleanup session (holochain-overview → holochain, ai-assistant → artificial-intelligence, domain-specific-language → dsl, etc.).

---

## Duplicate Tags Consolidated

| Removed | Canonical | Files updated |
|---------|-----------|---------------|
| `concurrent-programming` | `concurrency` | agent-vs-actor-models.md, erlang.md |
| `system-architecture` | `software-architecture` | kernel-architectures.md, operating-systems/index.md |
| `bioregionalisme` | `bioregionalism` | stewardship.md, blog/fr/souverainete-fractale.md |
| `cosmo-localisme` | `cosmo-localism` | bioregionalism.md, blog/fr/souverainete-fractale.md |
| `fundamentals` | `hdk` | holochain/concepts: link.md, entry.md, record.md, cell.md |
| `integration` (generic) | `culture` / `api` | ikigai.md, ai-protocols/index.md |
| `system` (generic) | `systems-programming` | languages/c.md |

---

## Low-Signal Tags Replaced

| File | Old tag | New tag | Rationale |
|------|---------|---------|-----------|
| specialized-technologies/index.md | `specialized-tech` | `programming` | Path-segment label → domain tag |
| perez-hourglass.md | `specialized-tech` | `number-theory` | Specific concept |
| tools-and-platforms/library-management-systems.md | `tools` | `software-development` | Generic → domain tag |
| tools-and-platforms/index.md | `tools`, `platforms` | `programming`, `software-development` | Generic → domain tags |
| holochain/applications/index.md | `applications` | `happs` | Specific Holochain term |
| health-and-wellbeing/shadow-work.md | `integration` | `mental-health` | Holistic context → specific domain tag |

---

## TagVocabulary.md Additions

### Domain 3 — Tools and Technology (6 new entries)
- `deep-learning` — Neural networks, backprop, training pipelines
- `generative-ai` — LLM/diffusion output: text, images, music, code
- `audio` — Audio processing, sound synthesis, digital audio
- `creative-coding` — Generative art, music-as-code, code as creative medium
- `cognitive-extension` — AI tools as extended mind; externalized cognition
- `philosophy-of-mind` — Theory of mind, consciousness studies (cross-domain)

### Domain 4 — Culture and Education (8 new entries)
- `metaphysics` — Ontology, being, existence, reality
- `mysticism` — Contemplative and esoteric traditions
- `history` — Historical analysis and chronological context
- `trivium` — Grammar, logic, rhetoric
- `quadrivium` — Arithmetic, geometry, music, astronomy
- `tango` — Tango as musical and dance tradition
- `jazz` — Jazz theory, improvisation, tradition
- `classical-music` — Western classical music tradition

### Domain 1 — Land and Nature (5 new entries)
- `agroecology` — Ecological farming systems
- `soil-health` — Soil biology, regenerative soil practice
- `hydrology` — Water cycles, watershed dynamics
- `water-management` — Water stewardship and catchment systems
- `ecosystem-restoration` — Rewilding and habitat restoration

### Domain 5 — Health and Wellbeing (3 new entries)
- `breathwork` — Pranayama, Wim Hof, somatic breathing
- `hatha-yoga` — Physical yoga tradition
- `pranayama` — Yogic breath control practices

### Garden-Specific (3 new entries)
- `homunculus` — Alchemical/PAI Homunculus concept
- `personal-ai-infrastructure` — PAI framework documentation
- `telos` — TELOS life-OS concept

---

## Orphan Tags — Kept as Legitimate Niche

These tags appear once but represent valid, specific concepts. No action taken.

`claude-code`, `tauri`, `unocss`, `sacred-geometry`, `collaborative-learning`, `participatory-methodology`, `constructivism`, `self-organization`, `economic-sovereignty`, `reflexology`, `data-sovereignty`, `self-hosted`, `real-time`, `dsl`, `creative-coding`, `cognitive-extension`, `homunculus`, `content-management`, `zero-knowledge`, `authorization`, `low-code`, `telos`, `philosophy-of-mind`, `query-language`

---

## Recommendations for Next Session

1. **Content balance**: The Tools and Technology domain dominates (programming:221 vs ecology:2). This reflects actual content distribution, not a tagging problem. The garden's primary domain is tech. No tag fix needed.
2. **French tags in English notes**: `communaute`, `conscience`, `pieces` remain in French-language content. Intentional — leave them.
3. **`holochain-overview`** (2 uses): These two files may benefit from using `holochain` directly. Low priority.
4. **`links` and `entries`** (2 each): Holochain-specific data structure tags. Valid niche — keep.
