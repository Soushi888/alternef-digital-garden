document.addEventListener("nav", () => {
  const toggleButton = document.getElementById("mobile-menu-toggle")
  const bodyElement = document.getElementById("quartz-body")
  const menuNav = document.querySelector(".main-menu-nav")

  if (!toggleButton || !bodyElement || !menuNav) {
    console.warn("Mobile menu elements not found:", {
      toggleButton: !!toggleButton,
      bodyElement: !!bodyElement,
      menuNav: !!menuNav,
    })
    return
  }

  // Toggle mobile menu
  function toggleMenu() {
    const isActive = toggleButton!.classList.contains("active")

    if (isActive) {
      // Close menu
      toggleButton!.classList.remove("active")
      bodyElement!.classList.remove("lock-scroll")
      document.body.style.overflow = ""
    } else {
      // Open menu
      toggleButton!.classList.add("active")
      bodyElement!.classList.add("lock-scroll")
      document.body.style.overflow = "hidden"
    }
  }

  // Close menu
  function closeMenu() {
    toggleButton!.classList.remove("active")
    bodyElement!.classList.remove("lock-scroll")
    document.body.style.overflow = ""
  }

  // Handle click outside menu
  function handleOutsideClick(event: Event) {
    if (toggleButton!.classList.contains("active")) {
      const isClickInsideMenu = menuNav!.contains(event.target as Node)
      const isClickOnToggleButton = toggleButton!.contains(event.target as Node)

      if (!isClickInsideMenu && !isClickOnToggleButton) {
        closeMenu()
      }
    }
  }

  // Handle window resize - close menu if desktop size
  function handleResize() {
    if (window.innerWidth > 768) {
      closeMenu()
    }
  }

  // Event listeners
  toggleButton.addEventListener("click", toggleMenu)
  document.addEventListener("click", handleOutsideClick, true)
  window.addEventListener("resize", handleResize)

  // Cleanup function
  window.addCleanup(() => {
    toggleButton.removeEventListener("click", toggleMenu)
    document.removeEventListener("click", handleOutsideClick, true)
    window.removeEventListener("resize", handleResize)
  })

  console.log("Mobile menu initialized successfully")
})
