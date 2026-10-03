import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "fs"
import { spawnSync } from "child_process"
import { tmpdir } from "os"
import { join } from "path"
import { checkCitation, parseCitations, quoteMatches } from "./CheckCorpusQuotes"

const SCRIPT = join(import.meta.dir, "CheckCorpusQuotes.ts")

// A stub of the corpus tool: answers `passage <id> --json` from a fixed table, so the
// tests never depend on a real index.
const PASSAGES: Record<number, object> = {
  101: {
    id: 101,
    slug: "enchiridion",
    kind: "full-text",
    text: "VIII\n\nDemand not that events should happen as you wish; but wish them to happen\nas they do happen, and you will go on well.",
  },
  202: {
    id: 202,
    slug: "some-summary",
    kind: "summary",
    text: "A curator summary of a modern book.",
  },
}

const STUB = `const id = Number(process.argv[3])
const table = ${JSON.stringify(PASSAGES)}
if (process.argv[2] !== "passage" || !table[id]) { console.error("no passage " + id); process.exit(1) }
console.log(JSON.stringify(table[id]))
`

const GOOD = `---
title: "Fixture"
---

## References

- _The Enchiridion_, Epictetus, translated by Thomas Wentworth Higginson, passage \`wcw:enchiridion/101\`.
  > Demand not that events should happen as you wish; but wish them to happen
  > as they do happen, and you will go on well.
`

const BAD = `## References

- _The Enchiridion_, Epictetus, passage \`wcw:enchiridion/101\`.
  > Demand not that events happen as you wish.
- _A Book_, Someone, passage \`wcw:some-summary/202\`.
  > A curator summary of a modern book.
- _Ghost_, Nobody, passage \`wcw:ghost/999\`.
  > Anything.
- _The Enchiridion_, Epictetus, passage \`wcw:other-slug/101\`.
  > Demand not that events should happen as you wish
- _The Enchiridion_, Epictetus, passage \`wcw:enchiridion/101\`.

Some prose with no quotation.

\`\`\`md
- _Example_, passage \`wcw:enchiridion/101\`.
  > not checked: inside a fence
\`\`\`
`

let dir: string
let stub: string

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "corpus-quotes-"))
  stub = join(dir, "StubCorpus.ts")
  writeFileSync(stub, STUB)
  writeFileSync(join(dir, "good.md"), GOOD)
  writeFileSync(join(dir, "bad.md"), BAD)
})

afterAll(() => rmSync(dir, { recursive: true, force: true }))

function run(args: string[], env: Record<string, string> = {}) {
  const clean = { ...process.env, PAI_DIR: "", WISDOM_CORPUS_TOOL: "", ...env }
  const r = spawnSync("bun", [SCRIPT, ...args], { encoding: "utf8", env: clean })
  return { code: r.status, out: r.stdout }
}

describe("quoteMatches", () => {
  const text = "One  two\nthree four. Five six seven."
  test("whitespace is normalised", () => expect(quoteMatches("One two three", text)).toBe(true))
  test("a cut marked [...] keeps order", () =>
    expect(quoteMatches("One two [...] six seven.", text)).toBe(true))
  test("out-of-order segments fail", () =>
    expect(quoteMatches("six seven. [...] One two", text)).toBe(false))
  test("an altered word fails", () => expect(quoteMatches("One too three", text)).toBe(false))
})

describe("parseCitations", () => {
  test("reads the blockquote after the marker and skips fenced code", () => {
    const cs = parseCitations("bad.md", BAD)
    expect(cs.map((c) => c.id)).toEqual([101, 202, 999, 101, 101])
    expect(cs[0].quote).toBe("Demand not that events happen as you wish.")
    expect(cs[4].quote).toBeNull()
  })

  test("accepts one blank line between attribution and quotation (epigraph form)", () => {
    const cs = parseCitations("e.md", "_E_, passage `wcw:enchiridion/101`:\n\n> Demand not\n")
    expect(cs[0].quote).toBe("Demand not")
  })
})

describe("checkCitation", () => {
  const passage = PASSAGES[101] as { id: number; slug: string; kind: string; text: string }
  const base = { file: "f.md", line: 1, slug: "enchiridion", id: 101 }
  test("verbatim quote passes", () =>
    expect(
      checkCitation({ ...base, quote: "wish them to happen as they do happen" }, { ok: true, passage }),
    ).toBeNull())
  test("a tool failure other than unknown id throws", () =>
    expect(() =>
      checkCitation({ ...base, quote: "x" }, { ok: false, unknown: false, error: "no index" }),
    ).toThrow("no index"))
})

describe("CLI against the stub corpus tool", () => {
  test("a faithful quotation is clean", () => {
    const r = run([join(dir, "good.md"), "--tool", stub])
    expect(r.code).toBe(0)
    expect(r.out).toContain("Citations: 1  Violations: 0  Status: clean")
  })

  test("altered, summary, unknown, wrong slug and missing quotations are violations", () => {
    const r = run([join(dir, "bad.md"), "--tool", stub, "--json"])
    expect(r.code).toBe(1)
    const kinds = JSON.parse(r.out).violations.map((v: { kind: string }) => v.kind)
    expect(kinds).toEqual([
      "text-mismatch",
      "not-full-text",
      "unknown-id",
      "slug-mismatch",
      "missing-quotation",
    ])
  })

  test("WISDOM_CORPUS_TOOL is honoured", () => {
    const r = run([join(dir, "good.md")], { WISDOM_CORPUS_TOOL: stub })
    expect(r.code).toBe(0)
  })

  test("without the corpus tool the check is skipped with a note", () => {
    const r = run([join(dir, "bad.md")])
    expect(r.code).toBe(0)
    expect(r.out).toContain("SKIPPED: corpus tool not available")
  })

  test("a broken corpus tool exits 2", () => {
    const broken = join(dir, "Broken.ts")
    writeFileSync(broken, 'console.error("no index yet"); process.exit(1)\n')
    const r = run([join(dir, "good.md"), "--tool", broken])
    expect(r.code).toBe(2)
    expect(r.out).toContain("corpus tool failed: no index yet")
  })

  test("no citations means the tool is never needed", () => {
    const plain = join(dir, "plain.md")
    writeFileSync(plain, "Just prose.\n")
    const r = run([plain])
    expect(r.code).toBe(0)
    expect(r.out).toContain("No corpus citations found.")
  })
})
