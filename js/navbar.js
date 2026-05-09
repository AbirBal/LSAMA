/* =============================================================
   LSAMA — navbar.js
   Fonctions partagées : menu mobile, langue FR/EN, lien actif
   ============================================================= */

// ===== MENU MOBILE =====
function toggleNavMenu() {
  const nav = document.getElementById('navMenu');
  if (nav) nav.classList.toggle('open');
}

function toggleNavDropdown(e) {
  e.stopPropagation();
  const item = e.currentTarget.closest('.nav-has-dropdown');
  if (item) item.classList.toggle('open');
}

// Fermer le menu et dropdown au clic extérieur
document.addEventListener('click', function (e) {
  if (!e.target.closest('.navbar')) {
    const nav = document.getElementById('navMenu');
    if (nav) nav.classList.remove('open');
    document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
  }
});

// Fermer le menu après clic sur un lien
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navMenu');
      if (nav) nav.classList.remove('open');
    });
  });

  // Marquer le lien actif
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links [data-page]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });

  // Appliquer la langue sauvegardée
  applyLang(currentLang);
  updateLangButtons();
});

// ===== LANGUE FR / EN =====
let currentLang = localStorage.getItem('lsama-lang') || 'fr';

const translations = {
  fr: {
    // ---- Navbar ----
    'nav-accueil':      'Accueil',
    'nav-presentation': 'Présentation',
    'nav-equipes':      'Équipes de Recherche',
    'nav-actualites':   'Actualités',
    'nav-production':   'Production Scientifique',
    'nav-annuaire':     'Annuaire',
    'nav-contact':      'Contact',
    // ---- Dropdown Production ----
    'drop-all':         'Toutes les publications',
    'drop-articles':    'Articles',
    'drop-revues':      'Revues',
    'drop-chapitres':   'Chapitres de livre',
    'drop-conferences': 'Conférences',
    'drop-theses':      'Doctorants & Thèses',
    // ---- Footer ----
    'footer-bottom':    '© 2025 Laboratoire LSAMA — Tous droits réservés. | LR01ES09 — Université de Tunis El Manar',
    // ---- Index — Slideshow ----
    'slide1-h1':  'Laboratoire de Spectroscopie Atomique Moléculaire',
    'slide1-p':   'Pionnier de la recherche spectroscopique en Tunisie depuis 2001, au service de l\'énergie, l\'environnement et la santé.',
    'slide1-btn': 'Découvrir le laboratoire',
    'slide2-h1':  '4 Équipes de Recherche Spécialisées',
    'slide2-p':   'DMEAF, SDMI2A, MIBP et ELIBSF — des domaines d\'excellence couvrant l\'astrophysique, la biologie et la physique des lasers.',
    'slide2-btn': 'Voir les équipes',
    'slide3-h1':  'Excellence Scientifique Internationale',
    'slide3-p':   'Des publications et collaborations à l\'échelle mondiale, portées par une tradition de recherche fondamentale et appliquée.',
    'slide3-btn': 'Production scientifique',
    // ---- Index — Stats ----
    'stat1-lbl':  'Année de fondation',
    'stat2-lbl':  'Équipes de recherche',
    'stat3-lbl':  'Chercheurs actifs',
    'stat4-lbl':  'Référence nationale',
    // ---- Index — About ----
    'about-badge': 'À propos du laboratoire',
    'about-p1':   'Laboratoire créé en 2001 et dirigé par <strong>Mme Zohra Ben Lakhdar</strong> (Prix L\'Oréal-UNESCO 2005) jusqu\'en 2008. Dirigé ensuite par <strong>M. Nejm-Eddine Jaïdane</strong> jusqu\'en 2021, le laboratoire est actuellement sous la direction de <strong>M. Mourad Telmini</strong>.',
    'about-p2':   'Évolution du <strong>Laboratoire de Physique Atomique et Moléculaire (LPAM)</strong> fondé dans les années 1970, le LSAMA développe des techniques spectroscopiques avancées appliquées aux domaines de l\'énergie, de l\'environnement et de la santé.',
    'about-btn':  'En savoir plus',
    'teams-btn':  'Nos équipes',
    // ---- Index — Teams ----
    'teams-badge': 'Nos équipes',
    'teams-h2':   'Équipes de Recherche',
    'teams-p':    'Quatre équipes spécialisées couvrant les grands domaines de la spectroscopie atomique et moléculaire',
    // ---- Index — News ----
    'news-badge': 'Dernières nouvelles',
    'news-h2':    'Actualités du LSAMA',
    'news-p':     'Événements, soutenances et annonces du laboratoire',
    'news-all':   'Toutes les actualités',
    'lire-plus':  'Lire plus',
  },
  en: {
    // ---- Navbar ----
    'nav-accueil':      'Home',
    'nav-presentation': 'About',
    'nav-equipes':      'Research Teams',
    'nav-actualites':   'News',
    'nav-production':   'Scientific Output',
    'nav-annuaire':     'Directory',
    'nav-contact':      'Contact',
    // ---- Dropdown Production ----
    'drop-all':         'All publications',
    'drop-articles':    'Articles',
    'drop-revues':      'Journals',
    'drop-chapitres':   'Book chapters',
    'drop-conferences': 'Conferences',
    'drop-theses':      'PhD Students & Theses',
    // ---- Footer ----
    'footer-bottom':    '© 2025 LSAMA Laboratory — All rights reserved. | LR01ES09 — University of Tunis El Manar',
    // ---- Index — Slideshow ----
    'slide1-h1':  'Laboratory of Atomic and Molecular Spectroscopy',
    'slide1-p':   'Pioneer in spectroscopic research in Tunisia since 2001, advancing energy, environment and health.',
    'slide1-btn': 'Discover the laboratory',
    'slide2-h1':  '4 Specialized Research Teams',
    'slide2-p':   'DMEAF, SDMI2A, MIBP and ELIBSF — areas of excellence spanning astrophysics, biology and laser physics.',
    'slide2-btn': 'View the teams',
    'slide3-h1':  'International Scientific Excellence',
    'slide3-p':   'Publications and collaborations on a global scale, driven by a tradition of fundamental and applied research.',
    'slide3-btn': 'Scientific output',
    // ---- Index — Stats ----
    'stat1-lbl':  'Year of founding',
    'stat2-lbl':  'Research teams',
    'stat3-lbl':  'Active researchers',
    'stat4-lbl':  'National reference',
    // ---- Index — About ----
    'about-badge': 'About the laboratory',
    'about-p1':   'Laboratory founded in 2001 and led by <strong>Prof. Zohra Ben Lakhdar</strong> (L\'Oréal-UNESCO Award 2005) until 2008. Subsequently led by <strong>Prof. Nejm-Eddine Jaïdane</strong> until 2021, the laboratory is currently under the direction of <strong>Prof. Mourad Telmini</strong>.',
    'about-p2':   'An evolution of the <strong>Laboratory of Atomic and Molecular Physics (LPAM)</strong> founded in the 1970s, LSAMA develops advanced spectroscopic techniques applied to energy, environment and health.',
    'about-btn':  'Learn more',
    'teams-btn':  'Our teams',
    // ---- Index — Teams ----
    'teams-badge': 'Our teams',
    'teams-h2':   'Research Teams',
    'teams-p':    'Four specialized teams covering the main fields of atomic and molecular spectroscopy',
    // ---- Index — News ----
    'news-badge': 'Latest news',
    'news-h2':    'LSAMA News',
    'news-p':     'Events, thesis defences and announcements from the laboratory',
    'news-all':   'All news',
    'lire-plus':  'Read more',
  }
};

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lsama-lang', lang);
  applyLang(lang);
  updateLangButtons();
}

function updateLangButtons() {
  const btnFR = document.getElementById('langBtnFR');
  const btnEN = document.getElementById('langBtnEN');
  if (btnFR && btnEN) {
    btnFR.classList.toggle('active', currentLang === 'fr');
    btnEN.classList.toggle('active', currentLang === 'en');
  }
}

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.documentElement.lang = lang;
}

// Compat : ancienne fonction toggleLang() si encore appelée quelque part
function toggleLang() {
  setLang(currentLang === 'fr' ? 'en' : 'fr');
}
