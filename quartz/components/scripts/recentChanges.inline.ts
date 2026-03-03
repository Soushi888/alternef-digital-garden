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

document.addEventListener("nav", () => {
  const dateEls = document.querySelectorAll<HTMLElement>(
    ".recent-change-date[data-timestamp]",
  )
  dateEls.forEach((el) => {
    const ts = parseInt(el.dataset.timestamp!, 10)
    if (!isNaN(ts)) {
      el.textContent = formatRecentDate(new Date(ts))
    }
  })
})
