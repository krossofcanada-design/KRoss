/* Her er vores hamburgermenu til mobilen. Js henter filerne i getElementById. addEventListener kalder på de events, der har et bestemt søgeord. Toggle er den fine funktion, der viser vores navigation, når vi trykker på hamburgeren */

/* Brugen af JavaScript var for at få vores drop down til at komme from OG til at forsvinde, når man trykker på en af liste-elementerne eller når man trykker udenfor dropdown menuen. Blev irriteret over, at den "sad fast" efter jeg aktiverede den via hamburgeren */

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

// Hide menu when a menu link is clicked
const links = mobileMenu.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
  });
});

// Hide menu when clicking outside the menu or hamburger
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('show');
  }
});


/* This following part was necessary to favorite an event card without following the link to the event */

document.querySelectorAll(".favorite").forEach(fav => {
  fav.addEventListener("click", (e) => {
    e.preventDefault();       // prevent link navigation
    e.stopPropagation();      // stop click from bubbling to <a>
    fav.classList.toggle("active"); // toggle red color
  });
});



/* Jeg prøvede at få en date picker op at køre i min kalender, men kunne ikke få det til at virke */

const calendarIcon = document.querySelector('.calendar-icon');
const calendarPicker = document.getElementById('calendarPicker');
const searchInput = document.getElementById('searchInput');

calendarIcon.addEventListener('click', () => {
  calendarPicker.showPicker(); // modern browsers (Chrome/Edge)
  calendarPicker.click();      // fallback
});

calendarPicker.addEventListener('change', () => {
  searchInput.value = calendarPicker.value;
});


/* Noget jeg prøvede at installere for at få et moderne look og for at få date picker til a køre i alle browsere */
flatpickr("#searchInput", {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "F j, Y",
  allowInput: true
});
