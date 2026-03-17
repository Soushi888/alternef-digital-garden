// Mirrors formatRecentDate from RecentChanges.tsx — must stay in sync
function formatRecentDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return diffMinutes <= 1 ? "just now" : `${diffMinutes} minutes ago`
    }
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`
  }

  if (diffDays === 1) return "yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`
  }

  const months = Math.floor(diffDays / 30)
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`

  const years = Math.floor(months / 12)
  return years === 1 ? "1 year ago" : `${years} years ago`
}

interface RcItemJson {
  i: number
  t: string
  l: string
  d: number // most-recent-activity timestamp
  c: number // creation date timestamp
  k: "created" | "modified"
  e?: string
  g?: string[]
}

function setupRecentChanges() {
  // Refresh relative dates on all pre-rendered items, preserving their prefix
  const dateEls = document.querySelectorAll<HTMLElement>(".recent-change-date[data-timestamp]")
  dateEls.forEach((el) => {
    const ts = parseInt(el.dataset.timestamp!, 10)
    const prefix = el.dataset.prefix ?? ""
    if (!isNaN(ts)) {
      const rel = formatRecentDate(new Date(ts))
      el.textContent = prefix ? `${prefix} ${rel}` : rel
    }
  })

  const containers = document.querySelectorAll<HTMLElement>(".recent-changes")
  containers.forEach((container) => {
    const filterGroup = container.querySelector<HTMLElement>(".recent-changes-filter")
    if (!filterGroup) return

    const pageSize = parseInt(container.dataset.pageSize ?? "20", 10)
    const isDetailed = container.dataset.detailed === "1"
    const showExcerpt = container.dataset.showExcerpt === "1"
    const showTags = container.dataset.showTags === "1"

    const list = container.querySelector<HTMLUListElement>(".recent-changes-list")
    const loadMoreBtn = container.querySelector<HTMLButtonElement>(".recent-changes-load-more")
    const tabDesc = container.querySelector<HTMLParagraphElement>(".rc-tab-desc")

    if (!list) return
    const safeList = list

    const dataScript = container.querySelector<HTMLScriptElement>(".rc-items-data")
    if (!dataScript) return

    let allData: RcItemJson[]
    try {
      allData = JSON.parse(dataScript.textContent ?? "[]")
    } catch {
      return
    }

    // Three sort views:
    //   "all"      → all notes by most recent activity
    //   "created"  → ALL notes by creation date (the "Timeline" tab)
    //   "modified" → only modified notes by modification date
    const sortedArrays: Record<string, RcItemJson[]> = {
      all: [...allData].sort((a, b) => b.d - a.d),
      created: [...allData].sort((a, b) => b.c - a.c),
      modified: allData.filter((x) => x.k === "modified").sort((a, b) => b.d - a.d),
    }

    // Human-readable descriptions for each tab
    const tabDescriptions: Record<string, string> = {
      all: `All ${allData.length} notes · most recent activity first`,
      created: `All ${allData.length} notes · sorted by when they were added`,
      modified: `${sortedArrays.modified.length} revised notes · latest changes first`,
    }

    // Per-tab injection pointer
    const injectedCount: Record<string, number> = { all: 0, created: 0, modified: 0 }

    let currentFilter = localStorage.getItem("recent-changes-filter") ?? "all"

    // Date prefix depends on the active sort:
    //   "created" tab → always "added" (showing creation date)
    //   "modified" tab → always "edited"
    //   "all" tab → "added" for never-modified notes, "edited" for modified ones
    function datePrefix(item: RcItemJson, filter: string): string {
      if (filter === "created") return "added"
      if (filter === "modified") return "edited"
      return item.k === "created" ? "added" : "edited"
    }

    function createItemEl(item: RcItemJson, filter: string): HTMLLIElement {
      const li = document.createElement("li")
      li.className = `recent-change-item ${item.k}`
      li.dataset.type = item.k

      const a = document.createElement("a")
      a.href = item.l
      a.className = "recent-change-link internal"
      const titleSpan = document.createElement("span")
      titleSpan.className = "recent-change-title"
      titleSpan.textContent = item.t
      a.appendChild(titleSpan)
      li.appendChild(a)

      const meta = document.createElement("div")
      meta.className = "recent-change-meta"

      // Badge: "Created" or "Edited" (neutral verbs, not category labels)
      const typeSpan = document.createElement("span")
      typeSpan.className = "recent-change-type"
      typeSpan.textContent = item.k === "created" ? "Created" : "Edited"
      meta.appendChild(typeSpan)

      // Date: use creation timestamp for Timeline tab, activity timestamp otherwise
      const ts = filter === "created" ? item.c : item.d
      const prefix = datePrefix(item, filter)
      const dateSpan = document.createElement("span")
      dateSpan.className = "recent-change-date"
      dateSpan.dataset.timestamp = ts.toString()
      dateSpan.dataset.prefix = prefix
      dateSpan.textContent = `${prefix} ${formatRecentDate(new Date(ts))}`
      meta.appendChild(dateSpan)

      li.appendChild(meta)

      if (isDetailed && showExcerpt && item.e) {
        const p = document.createElement("p")
        p.className = "recent-change-excerpt"
        p.textContent = item.e
        li.appendChild(p)
      }

      if (isDetailed && showTags && item.g?.length) {
        const tagsDiv = document.createElement("div")
        tagsDiv.className = "recent-change-tags"
        item.g.forEach((tag) => {
          const tagSpan = document.createElement("span")
          tagSpan.className = "recent-change-tag"
          tagSpan.textContent = tag
          tagsDiv.appendChild(tagSpan)
        })
        li.appendChild(tagsDiv)
      }

      return li
    }

    function updateTabDesc(filter: string) {
      if (tabDesc) tabDesc.textContent = tabDescriptions[filter] ?? ""
    }

    function updateLoadMoreBtn(filter: string) {
      if (!loadMoreBtn) return
      const arr = sortedArrays[filter] ?? []
      const loaded = injectedCount[filter]
      const remaining = arr.length - loaded
      if (remaining <= 0) {
        loadMoreBtn.style.display = "none"
      } else {
        loadMoreBtn.textContent = `Load ${Math.min(pageSize, remaining)} more · ${remaining} remaining`
        loadMoreBtn.style.display = "block"
      }
    }

    function renderTab(filter: string) {
      safeList.innerHTML = ""
      injectedCount[filter] = 0
      const arr = sortedArrays[filter] ?? []
      const end = Math.min(pageSize, arr.length)
      for (let i = 0; i < end; i++) {
        safeList.appendChild(createItemEl(arr[i], filter))
      }
      injectedCount[filter] = end
      updateTabDesc(filter)
      updateLoadMoreBtn(filter)
    }

    function loadMore(filter: string) {
      const arr = sortedArrays[filter] ?? []
      const start = injectedCount[filter]
      const end = Math.min(start + pageSize, arr.length)
      for (let i = start; i < end; i++) {
        safeList.appendChild(createItemEl(arr[i], filter))
      }
      injectedCount[filter] = end
      updateLoadMoreBtn(filter)
    }

    const buttons = filterGroup.querySelectorAll<HTMLButtonElement>("button[data-filter]")
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter ?? "all"
        localStorage.setItem("recent-changes-filter", currentFilter)
        buttons.forEach((b) => b.classList.toggle("active", b === btn))
        renderTab(currentFilter)
      })
    })

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => loadMore(currentFilter))
    }

    // Restore saved filter button active state
    if (currentFilter !== "all") {
      const savedBtn = filterGroup.querySelector<HTMLButtonElement>(
        `button[data-filter="${currentFilter}"]`,
      )
      if (savedBtn) {
        buttons.forEach((b) => b.classList.remove("active"))
        savedBtn.classList.add("active")
      }
    }

    // Initialize: keep SSR items if on "all" tab, otherwise rebuild
    if (currentFilter === "all") {
      injectedCount.all = safeList.querySelectorAll(".recent-change-item").length
      updateTabDesc("all")
      updateLoadMoreBtn("all")
    } else {
      renderTab(currentFilter)
    }
  })
}

document.addEventListener("nav", setupRecentChanges)
