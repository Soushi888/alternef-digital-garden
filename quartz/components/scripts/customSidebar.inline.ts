function toggleSidebar(this: HTMLElement) {
  // Toggle active state of button
  this.classList.toggle("active")

  // Toggle lock-scroll on body to prevent background scrolling
  const bodySelector = document.querySelector("#quartz-body")
  if (bodySelector) {
    bodySelector.classList.toggle("lock-scroll")
  }
}

function setupSidebar() {
  const toggleButton = document.getElementById("mobile-sidebar-toggle")
  if (toggleButton) {
    toggleButton.removeEventListener("click", toggleSidebar)
    toggleButton.addEventListener("click", toggleSidebar)
  }
}

document.addEventListener("nav", () => {
  const bodySelector = document.querySelector("#quartz-body")
  const toggleButton = document.getElementById("mobile-sidebar-toggle")
  if (bodySelector) {
    bodySelector.classList.remove("lock-scroll")
  }
  if (toggleButton) {
    toggleButton.classList.remove("active")
  }
})

window.addEventListener("resize", () => {
  const bodySelector = document.querySelector("#quartz-body")
  const toggleButton = document.getElementById("mobile-sidebar-toggle")
  if (window.innerWidth > 768) {
    if (bodySelector) {
      bodySelector.classList.remove("lock-scroll")
    }
    if (toggleButton) {
      toggleButton.classList.remove("active")
    }
  }
})

setupSidebar()
