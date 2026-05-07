
/* ====== top-nav forsvinder, når man scroller ned ===== */

let lastScroll = 0;
const nav = document.querySelector('.top-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // At top → transparent
  if (currentScroll <= 10) {
    nav.classList.remove('is-active');
    nav.classList.remove('nav-hidden');
    lastScroll = currentScroll;
    return;
  }

  // Scrolling down → hide nav
  if (currentScroll > lastScroll) {
    nav.classList.add('nav-hidden');
  } 
  // Scrolling up → show nav + white background
  else {
    nav.classList.remove('nav-hidden');
    nav.classList.add('is-active');
  }

  lastScroll = currentScroll;
});


/* HAMBURGER and MEGA-PANEL */

/* ====== MEGA PANEL & WCAG AA ====== */

const hamburgers = document.querySelectorAll(".hamburger, .hamburger-black");
const overlay = document.querySelector(".menu-overlay");
const panels = document.querySelectorAll(".menu-panel");

let lastFocusedElement = null;
let panelStack = [];
let trapFocusCleanup = null;

// Focusable selectors
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Map child panel → parent panel for back navigation
const parentPanel = {
  "shop": "main",          // Shop panel goes back to main
  "men": "shop",           // Mænd panel goes back to shop
  "construction": "main"   // All construction panels go back to main
};



// ---------------------
// Open Menu
// ---------------------
function openMenu() {
  lastFocusedElement = document.activeElement;
  document.body.classList.add("menu-open");
  openPanel("main");
}

// ---------------------
// Close Menu
// ---------------------
function closeMenu() {
  document.body.classList.remove("menu-open");

  panels.forEach(p => p.classList.remove("is-active"));
  document.querySelector('[data-panel="main"]').classList.add("is-active");

  // Cleanup focus trap
  if (trapFocusCleanup) trapFocusCleanup();
  trapFocusCleanup = null;

  // Reset panel stack
  panelStack = [];

  // Return focus to hamburger
  if (lastFocusedElement) lastFocusedElement.focus();
}

// ---------------------
// Open Panel (with history)
// ---------------------
function openPanel(name, fromBack = false) {
  const current = document.querySelector('.menu-panel.is-active');
  const nextPanel = document.querySelector(`[data-panel="${name}"]`);
  if (!nextPanel) return;

  // Push current panel to stack if it's different and NOT coming from "back"
  if (current && current !== nextPanel && !fromBack) {
    panelStack.push(current.dataset.panel);
  }

  // Deactivate all panels
  panels.forEach(p => p.classList.remove("is-active"));

  // Activate next panel
  nextPanel.classList.add("is-active");

  // Focus for keyboard users
  nextPanel.setAttribute('tabindex', '-1');
  nextPanel.focus();

  // Setup focus trap
  if (trapFocusCleanup) trapFocusCleanup();
  trapFocusCleanup = trapFocus(nextPanel);
}


// ---------------------
// Focus Trap
// ---------------------
function trapFocus(panel) {
  const focusableEls = panel.querySelectorAll(focusableSelectors);
  if (!focusableEls.length) return () => {};

  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  function handleTab(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else { // Tab
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  panel.addEventListener('keydown', handleTab);

  // Return cleanup function
  return () => panel.removeEventListener('keydown', handleTab);
}

// ---------------------
// Event Listeners
// ---------------------
hamburgers.forEach(hamburger =>
  hamburger.addEventListener("click", openMenu)
);
overlay.addEventListener("click", closeMenu);

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (!btn) return;

  e.stopPropagation();
  openPanel(btn.dataset.open);
});

document.querySelectorAll(".menu-close").forEach(btn =>
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  })
);

document.querySelectorAll("[data-back]").forEach(btn =>
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const current = btn.closest(".menu-panel").dataset.panel;

    if (panelStack.length > 0) {
      const prev = panelStack.pop();
      openPanel(prev, true);
      return;
    }

    const parent = parentPanel[current];
    if (parent) openPanel(parent, true);
  })
);

// Desktop Shop dropdown
const desktopShop = document.querySelector('.desktop-menu-item[data-open="shop"]');
const shopPanel = document.querySelector('.menu-panel[data-panel="shop"]');

desktopShop.addEventListener('mouseenter', () => {
  shopPanel.classList.add('is-active');
});

desktopShop.addEventListener('mouseleave', () => {
  shopPanel.classList.remove('is-active');
});

// Keep panel visible on hover
shopPanel.addEventListener('mouseenter', () => {
  shopPanel.classList.add('is-active');
});
shopPanel.addEventListener('mouseleave', () => {
  shopPanel.classList.remove('is-active');
});





// ---------------------
// ESC key closes menu
// ---------------------
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMenu();
  }
});


/* ===== HORIZONTAL SLIDER + PROGRESS BAR ===== */

const slider = document.getElementById("bestseller-slider");
const next = document.querySelector(".slider-btn.next");
const prev = document.querySelector(".slider-btn.prev");
const progress = document.querySelector(".slider-progress-bar");

function scrollAmount() {
  return slider.clientWidth * 0.9;
}

next?.addEventListener("click", () => {
  slider.scrollBy({ left: scrollAmount(), behavior: "smooth" });
});

prev?.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
});

function updateProgress() {
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  if (maxScroll <= 0) {
    progress.style.width = "100%";
    return;
  }

  const percent = (slider.scrollLeft / maxScroll) * 100;
  progress.style.width = `${percent}%`;
}

slider.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);

updateProgress();


