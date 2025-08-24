// Gemeinsame JavaScript-Funktionen für alle PACO-Seiten

// Production/Development Konfiguration
let production_code = true;

// Mobile Device Detection
function isMobileDevice() {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile;
  }

  const ua = navigator.userAgent;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobileUA = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isIPad = /iPad/.test(ua) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  return isMobileUA || isIPad || isTouchDevice;
}

// PACO Chat Navigation
function go_to_chat(lang) {
  var backSite = encodeURIComponent(window.location.href);
  if (production_code) {
    var pacoBaseUrl = `https://study-coach.uni-koeln.de/${lang}/paco_chat/14820/3/%23/demo/`;
  } else {
    var pacoBaseUrl = `http://localhost:8000/${lang}/paco_chat/14820/3/%23/demo/`;
  }      
  var urlWithBackSite = pacoBaseUrl + (pacoBaseUrl.indexOf('?') === -1 ? '?' : '&') + "back_site=" + backSite;
  if (isMobileDevice()) {
    location.href = urlWithBackSite;
  } else {
    window.open(pacoBaseUrl, "KleinesFenster", "width=600,height=2000,resizable=no, toolbar=yes");
  }
}

// PACO Coach Interview Navigation
function go_to_interview(lang) {
  var backSite = encodeURIComponent(window.location.href);
  
  if (isMobileDevice()) {
    if (production_code) {
      var pacoBaseUrl = `https://study-coach.uni-koeln.de/${lang}/question/1/0/dummy/demo/`;
    } else {
      var pacoBaseUrl = `http://localhost:8000/${lang}/question/1/0/dummy/demo/`;
    }
    var urlWithBackSite = pacoBaseUrl + (pacoBaseUrl.indexOf('?') === -1 ? '?' : '&') + "back_site=" + backSite;
    location.href = urlWithBackSite;
  } else {
    if (production_code) {
      var pacoBaseUrl = `https://study-coach.uni-koeln.de/${lang}/question/1/0/%23/demo/`;
    } else {
      var pacoBaseUrl = `http://localhost:8000/${lang}/question/1/0/%23/demo/`;
    }
    window.open(pacoBaseUrl, "KleinesFenster", "width=600,height=2000,resizable=no");
  }
}

// Header/Footer Loading
async function loadHeaderFooter() {
  try {
    if (!document.querySelector('#site-header').dataset.loaded) {
      const h = await fetch('header.html');
      if (h.ok) {
        document.querySelector('#site-header').innerHTML = await h.text();
        document.querySelector('#site-header').dataset.loaded = '1';
      }
    }
  } catch(e) {}
  
  try {
    if (!document.querySelector('#site-footer').dataset.loaded) {
      const f = await fetch('footer.html');
      if (f.ok) {
        document.querySelector('#site-footer').innerHTML = await f.text();
        document.querySelector('#site-footer').dataset.loaded = '1';
      }
    }
  } catch(e) {}
  
  // Mobile menu toggle
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('#menu-toggle');
    if (btn) {
      const mm = document.getElementById('mobile-menu');
      if (mm) mm.classList.toggle('hidden');
    }
  });
}

// FAQ Accordion Funktionalität
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');
    
    header.addEventListener('click', () => {
      const isActive = !content.classList.contains('hidden');
      
      // Alle FAQs schließen
      document.querySelectorAll('.faq-content').forEach(el => {
        el.classList.add('hidden');
      });
      
      document.querySelectorAll('.faq-icon').forEach(icon => {
        icon.style.transform = 'rotate(0deg)';
      });
      
      // Wenn nicht aktiv war, öffnen
      if (!isActive) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// Modal Funktionen
function openModal(img) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  if (modal && modalImg) {
    modal.classList.remove('hidden');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Automatische Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  loadHeaderFooter();
  initFAQ();
});