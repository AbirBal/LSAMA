/* =============================================================
   LSAMA — navbar.js
   Fonctions partagées : menu mobile, langue FR/EN, lien actif
   ============================================================= */

// ===== MENU MOBILE =====
function toggleMenu() {
  const nav = document.getElementById('navMenu');
  if (nav) nav.classList.toggle('open');
}

// Fermer le menu après clic sur un lien
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navMenu');
      if (nav) nav.classList.remove('open');
    });
  });
});

// ===== LANGUE FR / EN =====
let currentLang = localStorage.getItem('lsama-lang') || 'fr';

const translations = {
  fr: {
    'nav-accueil':      'Accueil',
    'nav-presentation': 'Présentation',
    'nav-equipes':      'Équipes de Recherche',
    'nav-actualites':   'Actualités',
    'nav-production':   'Production Scientifique',
    'nav-annuaire':     'Annuaire',
    'nav-contact':      'Contact',
  },
  en: {
    'nav-accueil':      'Home',
    'nav-presentation': 'About',
    'nav-equipes':      'Research Teams',
    'nav-actualites':   'News',
    'nav-production':   'Scientific Output',
    'nav-annuaire':     'Directory',
    'nav-contact':      'Contact',
  }
};

function toggleLang() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lsama-lang', currentLang);
  const label = document.getElementById('langLabel');
  if (label) label.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  applyNavTranslations(currentLang);
}

function applyNavTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t && t[key] !== undefined) el.innerHTML = t[key];
  });
  document.documentElement.lang = lang;
}

// ===== LIEN ACTIF =====
(function markActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });
})();

// Apply saved language on load
document.addEventListener('DOMContentLoaded', function () {
  const label = document.getElementById('langLabel');
  if (label) label.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  applyNavTranslations(currentLang);
});
