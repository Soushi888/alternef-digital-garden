// Client-side script for ComponentName
// This runs in the browser after DOM ready
// Attach to component via: ComponentName.afterDOMLoaded = scriptContent

document.addEventListener("nav", () => {
  // Re-run on SPA navigation (if SPA enabled)
  // For non-SPA sites, this fires once on page load

  const elements = document.querySelectorAll(".component-name")
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      // Handle interaction
    })
  })
})
