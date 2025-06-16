export function highlightActiveLink() {
  const path = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".navItems a");
  links.forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.classList.add("activeLink");
    } else {
      link.classList.remove("activeLink");
    }
  });
}
