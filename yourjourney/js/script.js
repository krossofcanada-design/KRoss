/* ==================== HAMBURGER MENU (Accessible) ===================== */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("Menu");

// Track last interaction type (keyboard vs mouse)
let lastInteractionWasKeyboard = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") lastInteractionWasKeyboard = true;
});

document.addEventListener("mousedown", () => {
  lastInteractionWasKeyboard = false;
});

hamburger.addEventListener("click", (event) => {
  event.stopPropagation();

  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  const opening = !expanded;

  hamburger.setAttribute("aria-expanded", String(opening));
  menu.hidden = expanded; // true when closing, false when opening
  menu.classList.toggle("show", opening);

  const icon = hamburger.querySelector("i");
  icon.classList.toggle("fa-bars", !opening);
  icon.classList.toggle("fa-xmark", opening);
  hamburger.classList.toggle("open", opening);



  // Focus first link ONLY if keyboard user
  if (opening && lastInteractionWasKeyboard) {
    const firstLink = menu.querySelector("a");
    firstLink && firstLink.focus();
  }
});

// Close menu on outside click
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    hamburger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    menu.classList.remove("show");
    hamburger.classList.remove("open");

    // Reset icon to hamburger (fa-bars)
    const icon = hamburger.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  }
});

// Close menu with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hamburger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    menu.classList.remove("show");
    hamburger.classList.remove("open");

    // Reset icon to hamburger (fa-bars)
    const icon = hamburger.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");

    if (lastInteractionWasKeyboard) hamburger.focus();
  }
});

/* ==================== RESPONSIVE MENU RESET ==================== */
// Ensure correct menu state when resizing between mobile and desktop
window.addEventListener("resize", () => {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches; // adjust breakpoint if needed

  if (isDesktop) {
    // Desktop view: show menu normally, reset hamburger state
    menu.hidden = false;
    menu.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("open");

    const icon = hamburger.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  } else {
    // Mobile view: hide menu initially
    if (!hamburger.classList.contains("open")) {
      menu.hidden = true;
    }
  }
});



/* ==================== LANGUAGE SWITCHER ==================== */
const langToggle = document.getElementById("lang-toggle");
const langDisplay = document.getElementById("current-lang");
const languages = ["FR", "EN"];
let currentLangIndex = 0;

langToggle.addEventListener("click", () => {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  langDisplay.textContent = languages[currentLangIndex];
  console.log("Language switched to:", languages[currentLangIndex]);
});




/* ================= Back to Top Button ===================== */
const backToTop = document.getElementById("back-to-top");

// Show button after scrolling 300px
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// Smooth scroll to top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



/* ============ Accordions  ============ */


const accordions = document.querySelectorAll(".accordion");
accordions.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});


