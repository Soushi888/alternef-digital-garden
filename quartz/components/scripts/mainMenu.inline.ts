function toggleSidebar(this: HTMLElement) {
  // Toggle active state of button
  this.classList.toggle("active")

  // Toggle lock-scroll on body to prevent background scrolling
  const bodySelector = document.querySelector("#quartz-body")
  if (bodySelector) {
    bodySelector.classList.toggle("lock-scroll")
  }
  
  // Prevent body scrolling when menu is open
  document.body.style.overflow = this.classList.contains("active") ? "hidden" : ""
}

function setupSidebar() {
  const toggleButton = document.getElementById("mobile-menu-toggle")
  if (toggleButton) {
    toggleButton.removeEventListener("click", toggleSidebar)
    toggleButton.addEventListener("click", toggleSidebar)
  }
  
  // Close menu when clicking outside of it
  document.addEventListener("click", (e) => {
    const menuNav = document.querySelector(".main-menu-nav")
    const toggleButton = document.getElementById("mobile-menu-toggle")
    
    if (menuNav && toggleButton && toggleButton.classList.contains("active")) {
      // Check if the click target is not part of the menu or toggle button
      // @ts-ignore
      const isMenuClick = menuNav.contains(e.target)
      // @ts-ignore
      const isToggleClick = toggleButton.contains(e.target)
      
      if (!isMenuClick && !isToggleClick) {
        toggleButton.click() // Close the menu
      }
    }
  }, { passive: true })
}

document.addEventListener("nav", () => {
  const bodySelector = document.querySelector("#quartz-body")
  const toggleButton = document.getElementById("mobile-menu-toggle")
  if (bodySelector) {
    bodySelector.classList.remove("lock-scroll")
  }
  if (toggleButton) {
    toggleButton.classList.remove("active")
  }
  
  // Reset body overflow
  document.body.style.overflow = ""
})

window.addEventListener("resize", () => {
  const bodySelector = document.querySelector("#quartz-body")
  const toggleButton = document.getElementById("mobile-menu-toggle")
  if (window.innerWidth > 768) {
    if (bodySelector) {
      bodySelector.classList.remove("lock-scroll")
    }
    if (toggleButton) {
      toggleButton.classList.remove("active")
    }
    
    // Reset body overflow
    document.body.style.overflow = ""
  }
})

setupSidebar()
