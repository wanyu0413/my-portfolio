// ----- typed-text.js -----
let aText = ["WEB DEVELOPER."];
let iSpeed = 350;
let iIndex = 0;
let iArrLength = aText[0].length;
let iScrollAt = 20;
let iTextPos = 0;
let sContents = '';
let iRow;

function typewriter() {
  sContents = ' ';
  iRow = Math.max(0, iIndex - iScrollAt);
  let destination = document.getElementById("typedtext");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + '<br />';
  }
  if (destination) {
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
  }
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout(typewriter, 500);
    }
  } else {
    setTimeout(typewriter, iSpeed);
  }
}

// ----- popup.js -----
function setupPopups() {
  const triggers = document.querySelectorAll('.trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const popupID = this.getAttribute('data-popup');
      const popup = document.getElementById(popupID);
      const overlay = document.querySelector('.overlay');
      if (popup && overlay) {
        popup.classList.add('active');
        overlay.classList.add('active');
      }
    });
  });

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function () {
    const popups = document.querySelectorAll('.popup.active');
    popups.forEach(popup => {
      popup.classList.remove('active');
    });
    overlay.classList.remove('active');
  });
}

// ----- imgAlign.js -----
function updateDivLeftMargin() {
  const mainContainer = document.querySelector('.container');
  if (mainContainer) {
    const computedStyle = getComputedStyle(mainContainer);
    const leftMargin = computedStyle.marginLeft;
    document.documentElement.style.setProperty('--container-left-margin', leftMargin);
  }
}

// ----- scroll-reveal.js -----
function setupScrollReveal() {
  const images = document.querySelectorAll('.duotone-img');
  
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      } else {
        entry.target.classList.remove('reveal');
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the image is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  images.forEach(img => {
    observer.observe(img);
  });
}

// ----- Init on DOMContentLoaded -----
document.addEventListener("DOMContentLoaded", function () {
  typewriter();
  setupPopups();
  updateDivLeftMargin();
  setupScrollReveal();
});

window.addEventListener("resize", updateDivLeftMargin);
