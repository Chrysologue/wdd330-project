const DESKTOP_BREAKPOINT = 768;
let resizeTimeout;

export function qs(element, parent = document) {
  return parent.querySelector(element);
}

export function setupToggleMenu(header, hamburger, navLinks, body) {
  function toggleMenu() {
    header.classList.toggle("menu-open");
    body.classList.toggle("no-scroll", header.classList.contains("menu-open"));
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      if (header.classList.contains("menu-open")) {
        navLinks.classList.add("menu-transition");
      } else {
        setTimeout(() => {
          navLinks.classList.remove("menu-transition");
        }, 200);
      }
    }
  }
  hamburger.addEventListener("click", toggleMenu);
}

export function setupResizeHandler(header, navLinks, body) {
  let resizeTimeout;
  window.addEventListener("resize", () => {
    body.classList.add("no-transition");
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      body.classList.remove("no-transition");
      if (
        window.innerWidth < DESKTOP_BREAKPOINT &&
        header.classList.contains("menu-open")
      ) {
        navLinks.classList.add("menu-transition");
      }
    }, 250);
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      if (header.classList.contains("menu-open")) {
        header.classList.remove("menu-open");
        body.classList.remove("no-scroll");
      }
      navLinks.classList.remove("menu-transition");
    }
  });
}

export function setupLoadHandler(header, navLinks, body) {
  window.addEventListener("load", () => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      header.classList.remove("menu-open");
      body.classList.remove("no-scroll");
      navLinks.classList.remove("menu-transition");
    }
  });
}
