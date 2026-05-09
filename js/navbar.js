/* =============================================================
   LSAMA — navbar.js
   Menu mobile, langue FR/EN, lien actif — toutes les pages
   ============================================================= */

// ===== MENU MOBILE =====
function toggleNavMenu() {
  const nav = document.getElementById('navMenu');
  if (nav) nav.classList.toggle('open');
}

function toggleNavDropdown(e) {
  e.preventDefault();
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
    // ---- Lab full name ----
    'lab-fullname': 'Laboratoire de Spectroscopie Atomique Moléculaire &amp; Applications',

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
    'drop-theses':      'Doctorants &amp; Thèses',

    // ---- Footer ----
    'footer-desc':   'Laboratoire spécialisé dans l\'étude des interactions lumière-matière à l\'échelle atomique et moléculaire, développant des techniques spectroscopiques avancées pour l\'énergie, l\'environnement et la santé.',
    'footer-nav':    'Navigation',
    'footer-links':  'Liens utiles',
    'footer-contact':'Contact',
    'footer-bottom': '© 2025 Laboratoire LSAMA — Tous droits réservés. | LR01ES09 — Université de Tunis El Manar',

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
    'team-discover': 'Découvrir',

    // ---- Index — News ----
    'news-badge': 'Dernières nouvelles',
    'news-h2':    'Actualités du LSAMA',
    'news-p':     'Événements, soutenances et annonces du laboratoire',
    'news-all':   'Toutes les actualités',
    'lire-plus':  'Lire plus',

    // ---- Breadcrumbs ----
    'bc-home':         'Accueil',
    'bc-actualites':   'Actualités',
    'bc-presentation': 'Présentation du LSAMA',
    'bc-equipes':      'Équipes de Recherche',
    'bc-production':   'Production Scientifique',
    'bc-annuaire':     'Annuaire',
    'bc-contact':      'Contact',

    // ---- Page heroes ----
    'hero-actualites-h1': 'Actualités du LSAMA',
    'hero-actualites-p':  'Découvrez les dernières actualités scientifiques, événements et publications du laboratoire.',
    'hero-presentation-h1': 'Historique du LSAMA LR01ES09',
    'hero-presentation-p':  'Pionnier de la spectroscopie atomique et moléculaire en Tunisie depuis les années 1970, au service de la science, de l\'environnement et de la santé.',
    'hero-equipes-badge': 'Nos équipes',
    'hero-equipes-h1': 'Les Équipes de Recherche du LSAMA',
    'hero-equipes-p':  'Le laboratoire LSAMA est organisé en <strong style="color:var(--teal-light);">4 équipes spécialisées</strong>, bénéficiant d\'une large autonomie scientifique et couvrant des domaines allant de la spectroscopie astrophysique à la physique des lasers, en passant par la biologie moléculaire.',
    'hero-production-h1': 'Production Scientifique',
    'hero-production-p':  'Publications, thèses et contributions scientifiques du laboratoire LSAMA LR01ES09.',
    'hero-annuaire-h1': 'Annuaire du LSAMA',
    'hero-annuaire-p':  'Retrouvez les membres du laboratoire, leurs équipes et leurs coordonnées.',
    'hero-contact-badge': 'Nous contacter',
    'hero-contact-h1': 'Contact',
    'hero-contact-p':  'Une question, une collaboration ou une demande d\'information ? Nous sommes à votre écoute.',

    // ---- Actualités ----
    'actu-search-ph':    'Rechercher une actualité…',
    'actu-filter-all':   'Tout',
    'actu-filter-event': 'Événements',
    'actu-filter-sout':  'Soutenances',
    'actu-filter-reun':  'Réunions',
    'actu-no-results':   'Aucune actualité ne correspond à votre recherche.',
    'actu-tag-reunion':  'Réunion',
    'actu-tag-soutenance':'Soutenance',
    'actu-tag-evenement':'Événement',

    // ---- Présentation ----
    'pres-histoire-badge': 'Notre histoire',
    'pres-histoire-h2':  'Évolution du Laboratoire',
    'pres-histoire-p':   'Du LPAM fondé dans les années 1970 au LSAMA d\'aujourd\'hui, une longue tradition d\'excellence scientifique',
    'pres-axes-badge':   'Recherche',
    'pres-axes-h2':      'Axes de Recherche',
    'pres-axes-p':       'Le laboratoire s\'intéresse à l\'étude des systèmes moléculaires, petits et grands, avec des applications variées dans les domaines de la santé, de l\'environnement et de l\'industrie.',
    'pres-axe1-h3':      'Petits systèmes moléculaires',
    'pres-axe2-h3':      'Grands systèmes moléculaires',
    'pres-axe3-h3':      'Études expérimentales de mélanges complexes',
    'pres-kw-badge':     'Thématiques',
    'pres-kw-h2':        'Mots-clés illustrés',
    'pres-kw-p':         'Les grandes thématiques scientifiques du laboratoire',
    'pres-know-badge':   'Positionnement',
    'pres-know-h2':      'État des Connaissances',
    'pres-know-p':       'La place du LSAMA à l\'échelle nationale et internationale',
    'pres-know-nat-h3':  'Au niveau national',
    'pres-know-int-h3':  'Au niveau international',
    'pres-map-badge':    'Localisation',
    'pres-map-h2':       'Où nous trouver ?',
    'pres-map-p':        'Faculté des Sciences de Tunis, Département de Physique — 2092 Manar II, Tunis',
    'pres-gallery-badge':'Galerie',
    'pres-gallery-h2':   'Galerie Photos',
    'pres-gallery-p':    'Les activités et moments forts du laboratoire',

    // ---- Équipes de Recherche (page liste) ----
    'eq-stats-eq':   'Équipes de recherche',
    'eq-stats-ch':   'Chercheurs actifs',
    'eq-stats-fond': 'Fondation du LSAMA',
    'eq-stats-ref':  'Référence nationale',
    'eq-struct-badge':'Structure scientifique',
    'eq-struct-h2':  'Quatre Équipes d\'Excellence',
    'eq-struct-p':   'Chaque équipe développe des expertises complémentaires au cœur de la spectroscopie atomique et moléculaire',
    'eq-discover':   'Découvrir l\'équipe',
    'eq-members':    'Membres',

    // ---- Contact ----
    'contact-coord-h3':  'Coordonnées',
    'contact-addr-lbl':  'Adresse',
    'contact-email-lbl': 'Email',
    'contact-tel-lbl':   'Téléphone',
    'contact-hours-lbl': 'Horaires d\'accueil',
    'contact-hours-val': 'Lundi – Vendredi : 8h00 – 17h00<br>Samedi : 8h00 – 13h00',
    'contact-dir-h3':    'Direction du laboratoire',
    'contact-dir-lbl':   'Directeur',
    'contact-dirtel-lbl':'Téléphone direct',
    'contact-ref-lbl':   'Référence nationale',
    'contact-social-h3': 'Réseaux sociaux',
    'contact-form-h3':   'Envoyer un message',
    'contact-form-name': 'Nom complet',
    'contact-form-email':'Adresse e-mail',
    'contact-form-subj': 'Sujet',
    'contact-form-msg':  'Votre message',
    'contact-form-send': 'Envoyer le message',

    // ---- Annuaire ----
    'ann-search-ph':  'Rechercher un membre…',
    'ann-filter-all': 'Tous',

    // ---- Production Scientifique ----
    'prod-tab-pub':   'Publications',
    'prod-tab-thesis':'Thèses',
    'prod-filter-all':'Toutes',
  },

  en: {
    // ---- Lab full name ----
    'lab-fullname': 'Laboratory of Atomic &amp; Molecular Spectroscopy and Applications',

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
    'drop-theses':      'PhD Students &amp; Theses',

    // ---- Footer ----
    'footer-desc':   'Laboratory specializing in the study of light-matter interactions at the atomic and molecular scale, developing advanced spectroscopic techniques for energy, environment and health.',
    'footer-nav':    'Navigation',
    'footer-links':  'Useful links',
    'footer-contact':'Contact',
    'footer-bottom': '© 2025 LSAMA Laboratory — All rights reserved. | LR01ES09 — University of Tunis El Manar',

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
    'team-discover': 'Discover',

    // ---- Index — News ----
    'news-badge': 'Latest news',
    'news-h2':    'LSAMA News',
    'news-p':     'Events, thesis defences and announcements from the laboratory',
    'news-all':   'All news',
    'lire-plus':  'Read more',

    // ---- Breadcrumbs ----
    'bc-home':         'Home',
    'bc-actualites':   'News',
    'bc-presentation': 'About LSAMA',
    'bc-equipes':      'Research Teams',
    'bc-production':   'Scientific Output',
    'bc-annuaire':     'Directory',
    'bc-contact':      'Contact',

    // ---- Page heroes ----
    'hero-actualites-h1': 'LSAMA News',
    'hero-actualites-p':  'Discover the latest scientific news, events and publications from the laboratory.',
    'hero-presentation-h1': 'History of LSAMA LR01ES09',
    'hero-presentation-p':  'Pioneer in atomic and molecular spectroscopy in Tunisia since the 1970s, serving science, the environment and health.',
    'hero-equipes-badge': 'Our teams',
    'hero-equipes-h1': 'LSAMA Research Teams',
    'hero-equipes-p':  'The LSAMA laboratory is organized into <strong style="color:var(--teal-light);">4 specialized teams</strong>, with broad scientific autonomy covering fields from astrophysical spectroscopy to laser physics and molecular biology.',
    'hero-production-h1': 'Scientific Output',
    'hero-production-p':  'Publications, theses and scientific contributions of the LSAMA LR01ES09 laboratory.',
    'hero-annuaire-h1': 'LSAMA Directory',
    'hero-annuaire-p':  'Find laboratory members, their teams and contact information.',
    'hero-contact-badge': 'Get in touch',
    'hero-contact-h1': 'Contact',
    'hero-contact-p':  'A question, a collaboration or an information request? We are here to help.',

    // ---- Actualités ----
    'actu-search-ph':    'Search news…',
    'actu-filter-all':   'All',
    'actu-filter-event': 'Events',
    'actu-filter-sout':  'Defences',
    'actu-filter-reun':  'Meetings',
    'actu-no-results':   'No news matches your search.',
    'actu-tag-reunion':  'Meeting',
    'actu-tag-soutenance':'Defence',
    'actu-tag-evenement':'Event',

    // ---- Présentation ----
    'pres-histoire-badge': 'Our history',
    'pres-histoire-h2':  'Laboratory Evolution',
    'pres-histoire-p':   'From the LPAM founded in the 1970s to today\'s LSAMA, a long tradition of scientific excellence',
    'pres-axes-badge':   'Research',
    'pres-axes-h2':      'Research Areas',
    'pres-axes-p':       'The laboratory studies molecular systems, small and large, with diverse applications in health, environment and industry.',
    'pres-axe1-h3':      'Small molecular systems',
    'pres-axe2-h3':      'Large molecular systems',
    'pres-axe3-h3':      'Experimental studies of complex mixtures',
    'pres-kw-badge':     'Topics',
    'pres-kw-h2':        'Key Research Topics',
    'pres-kw-p':         'The main scientific themes of the laboratory',
    'pres-know-badge':   'Positioning',
    'pres-know-h2':      'State of Knowledge',
    'pres-know-p':       'LSAMA\'s position at national and international level',
    'pres-know-nat-h3':  'At national level',
    'pres-know-int-h3':  'At international level',
    'pres-map-badge':    'Location',
    'pres-map-h2':       'Find Us',
    'pres-map-p':        'Faculty of Sciences of Tunis, Physics Department — 2092 Manar II, Tunis',
    'pres-gallery-badge':'Gallery',
    'pres-gallery-h2':   'Photo Gallery',
    'pres-gallery-p':    'Activities and highlights from the laboratory',

    // ---- Équipes de Recherche (page liste) ----
    'eq-stats-eq':   'Research teams',
    'eq-stats-ch':   'Active researchers',
    'eq-stats-fond': 'LSAMA founded',
    'eq-stats-ref':  'National reference',
    'eq-struct-badge':'Scientific structure',
    'eq-struct-h2':  'Four Teams of Excellence',
    'eq-struct-p':   'Each team develops complementary expertise at the heart of atomic and molecular spectroscopy',
    'eq-discover':   'Discover the team',
    'eq-members':    'Members',

    // ---- Contact ----
    'contact-coord-h3':  'Contact Details',
    'contact-addr-lbl':  'Address',
    'contact-email-lbl': 'Email',
    'contact-tel-lbl':   'Phone',
    'contact-hours-lbl': 'Office hours',
    'contact-hours-val': 'Monday – Friday: 8:00 – 17:00<br>Saturday: 8:00 – 13:00',
    'contact-dir-h3':    'Laboratory Director',
    'contact-dir-lbl':   'Director',
    'contact-dirtel-lbl':'Direct phone',
    'contact-ref-lbl':   'National reference',
    'contact-social-h3': 'Social networks',
    'contact-form-h3':   'Send a message',
    'contact-form-name': 'Full name',
    'contact-form-email':'Email address',
    'contact-form-subj': 'Subject',
    'contact-form-msg':  'Your message',
    'contact-form-send': 'Send message',

    // ---- Annuaire ----
    'ann-search-ph':  'Search a member…',
    'ann-filter-all': 'All',

    // ---- Production Scientifique ----
    'prod-tab-pub':   'Publications',
    'prod-tab-thesis':'Theses',
    'prod-filter-all':'All',
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
  if (btnFR) { btnFR.classList.toggle('active', currentLang === 'fr'); btnFR.setAttribute('aria-pressed', currentLang === 'fr'); }
  if (btnEN) { btnEN.classList.toggle('active', currentLang === 'en'); btnEN.setAttribute('aria-pressed', currentLang === 'en'); }
}

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  // Also handle placeholder attributes
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
  });
  document.documentElement.lang = lang;
}

// Compat : ancienne fonction toggleLang() si encore appelée quelque part
function toggleLang() {
  setLang(currentLang === 'fr' ? 'en' : 'fr');
}
