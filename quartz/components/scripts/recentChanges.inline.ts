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

function setupRecentChanges() {
  // Update relative dates
  const dateEls = document.querySelectorAll<HTMLElement>(".recent-change-date[data-timestamp]")
  dateEls.forEach((el) => {
    const ts = parseInt(el.dataset.timestamp!, 10)
    if (!isNaN(ts)) {
      el.textContent = formatRecentDate(new Date(ts))
    }
  })

  // Filter + Load More setup
  const containers = document.querySelectorAll<HTMLElement>(".recent-changes")
  containers.forEach((container) => {
    const filterGroup = container.querySelector<HTMLElement>(".recent-changes-filter")
    if (!filterGroup) return

    const pageSize = parseInt(container.dataset.pageSize ?? "20", 10)
    const items = Array.from(container.querySelectorAll<HTMLElement>(".recent-change-item"))
    const loadMoreBtn = container.querySelector<HTMLButtonElement>(".recent-changes-load-more")

    let currentFilter = localStorage.getItem("recent-changes-filter") ?? "all"
    let visibleCount = pageSize

    function getFilteredItems(): HTMLElement[] {
      return items.filter((item) => currentFilter === "all" || item.dataset.type === currentFilter)
    }

    function applyVisibility() {
      const filtered = getFilteredItems()
      let shown = 0

      items.forEach((item) => {
        const matchesFilter = currentFilter === "all" || item.dataset.type === currentFilter
        const withinPage = matchesFilter && shown < visibleCount

        item.classList.toggle("rc-hidden-filter", !matchesFilter)
        item.classList.toggle("rc-hidden-page", matchesFilter && !withinPage)

        if (matchesFilter) shown++
      })

      // Update load more button
      if (loadMoreBtn) {
        const totalFiltered = filtered.length
        if (visibleCount >= totalFiltered) {
          loadMoreBtn.style.display = "none"
        } else {
          loadMoreBtn.style.display = "block"
        }
      }
    }

    // Filter button clicks
    const buttons = filterGroup.querySelectorAll<HTMLButtonElement>("button[data-filter]")
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter ?? "all"
        visibleCount = pageSize
        localStorage.setItem("recent-changes-filter", currentFilter)

        buttons.forEach((b) => b.classList.toggle("active", b === btn))
        applyVisibility()
      })
    })

    // Load More click
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        visibleCount += pageSize
        applyVisibility()
      })
    }

    // Restore saved filter
    if (currentFilter !== "all") {
      const savedBtn = filterGroup.querySelector<HTMLButtonElement>(
        `button[data-filter="${currentFilter}"]`,
      )
      if (savedBtn) {
        buttons.forEach((b) => b.classList.remove("active"))
        savedBtn.classList.add("active")
      }
    }

    applyVisibility()
  })
}

document.addEventListener("nav", setupRecentChanges)
