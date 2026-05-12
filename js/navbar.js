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

    // ---- Éléments partagés pages équipes ----
    'team-badge-label':    'Équipe de recherche',
    'team-desc-badge':     'Description',
    'team-pres-h3':        'Présentation de l\'équipe',
    'team-axes-h3':        'Axes de recherche',
    'team-kw-h3':          'Mots-clés',
    'team-members-badge':  'Membres',
    'team-members-h2':     'Membres permanents',
    'team-role-porteur':   'Professeur — Porteur',
    'team-role-prof':      'Professeur',
    'team-role-mcf':       'Maître de Conférences',
    'team-role-ma':        'Maître-assistant(e)',

    // ---- DMEAF ----
    'dmeaf-h1':    'Équipe DMEAF',
    'dmeaf-h2':    'Dynamique des Molécules Excitées et Atomes Froids<br><strong>Porteur : Mourad Telmini</strong>',
    'dmeaf-p1':    'Les compétences de l\'équipe <strong>« Dynamique des molécules excitées et Atomes froids »</strong> portent sur l\'étude des interactions fondamentales entre les molécules et les champs lumineux, ainsi que sur le contrôle de leur dynamique dans des environnements ultra-froids.',
    'dmeaf-p2':    'L\'équipe s\'intéresse notamment aux processus de relaxation, aux collisions à basse énergie, et au développement de techniques expérimentales et théoriques pour manipuler les atomes et molécules refroidis par laser.',
    'dmeaf-p3':    'Depuis la création du groupe, l\'équipe DMEAF développe des approches innovantes alliant spectroscopie, modélisation quantique et instrumentation optique avancée pour explorer les états excités et les réactions dynamiques des systèmes atomiques et moléculaires.',
    'dmeaf-axe1':  'Contrôle quantique des molécules excitées',
    'dmeaf-axe2':  'Refroidissement et piégeage d\'atomes et molécules',
    'dmeaf-axe3':  'Interactions lumière-matière dans les systèmes complexes',
    'dmeaf-kw1':   'Molécules excitées',
    'dmeaf-kw2':   'Atomes froids',
    'dmeaf-kw3':   'Laser',
    'dmeaf-kw4':   'Spectroscopie',
    'dmeaf-kw5':   'Physique quantique',
    'dmeaf-kw6':   'Interaction lumière-matière',
    'dmeaf-count': '6 membres',

    // ---- ELIBSF ----
    'elibsf-h1':   'Équipe ELIBSF',
    'elibsf-h2':   'Expériences LIBS et Fluorescence<br><strong>Porteur : Sami Hamzaoui</strong>',
    'elibsf-p1':   'L\'équipe <strong>« Expériences LIBS et Fluorescence » (ELIBSF)</strong> développe des approches expérimentales et théoriques basées sur la spectroscopie laser pour l\'analyse de matériaux, de milieux biologiques et environnementaux.',
    'elibsf-p2':   'Elle s\'appuie sur des techniques avancées de <em>Laser-Induced Breakdown Spectroscopy (LIBS)</em> et de fluorescence laser pour caractériser la composition, la structure et la dynamique de la matière à différentes échelles.',
    'elibsf-p3':   'Les travaux de l\'équipe trouvent des applications directes en environnement, agroalimentaire, biomédecine et sciences des matériaux.',
    'elibsf-axe1': 'Développement et optimisation des dispositifs LIBS et fluorescence résolue en temps',
    'elibsf-axe2': 'Applications en environnement, agroalimentaire, biomédecine et matériaux',
    'elibsf-axe3': 'Études spectroscopiques des plasmas laser et émissions atomiques/moléculaires',
    'elibsf-axe4': 'Analyse quantitative et qualitative par méthodes optiques et spectrales',
    'elibsf-kw1':  'LIBS',
    'elibsf-kw2':  'Fluorescence',
    'elibsf-kw3':  'Spectroscopie laser',
    'elibsf-kw4':  'Plasma',
    'elibsf-kw5':  'Analyse de matériaux',
    'elibsf-kw6':  'Instrumentation optique',
    'elibsf-count':'7 membres',

    // ---- MIBP ----
    'mibp-h1':    'Équipe MIBP',
    'mibp-h2':    'Molécules d\'Intérêt Biologique et Pharmaceutique<br><strong>Porteuse : Souad Lahmar</strong>',
    'mibp-p1':    'L\'équipe <strong>« Molécules d\'Intérêt Biologique et Pharmaceutique » (MIBP)</strong> se consacre à l\'étude de la structure, des interactions, de la dynamique et des propriétés physico-chimiques des molécules à potentiel biologique ou pharmaceutique.',
    'mibp-p2':    'Les recherches combinent chimie computationnelle, modélisation moléculaire, docking, simulations de dynamique moléculaire, et études spectroscopiques pour mieux comprendre les mécanismes d\'action, la stabilité et l\'optimisation des candidats moléculaires.',
    'mibp-p3':    'L\'équipe contribue à l\'émergence d\'une pharmacologie computationnelle nationale, en lien avec des partenaires académiques et industriels.',
    'mibp-axe1':  'Modélisation de la structure 3D et conformation des molécules actives',
    'mibp-axe2':  'Études d\'interactions ligand–récepteur, docking et affinités',
    'mibp-axe3':  'Dynamique moléculaire et stabilité en environnement solvant',
    'mibp-axe4':  'Optimisation de médicaments candidats et études in silico',
    'mibp-kw1':   'Molécules biologiques',
    'mibp-kw2':   'Chimie pharmaceutique',
    'mibp-kw3':   'Docking',
    'mibp-kw4':   'Dynamique moléculaire',
    'mibp-kw5':   'Interactions moléculaires',
    'mibp-kw6':   'Modélisation computationnelle',
    'mibp-count': '4 membres',

    // ---- SDMI2A ----
    'sdmi2a-h1':   'Équipe SDMI2A',
    'sdmi2a-h2':   'Structure et Dynamique de Molécules d\'Intérêt Astrophysique et Atmosphérique<br><strong>Porteur : Kamel Hammami</strong>',
    'sdmi2a-p1':   'L\'équipe <strong>« Structure et Dynamique de Molécules d\'Intérêt Astrophysique et Atmosphérique » (SDMI2A)</strong> étudie la structure électronique et la dynamique des molécules pertinentes en astrochimie et pour les atmosphères planétaires.',
    'sdmi2a-p2':   'Les travaux combinent calculs <em>ab initio</em>, dynamique moléculaire, spectroscopie théorique et expérimentale, et investigations des processus collisionnels et radiatifs qui gouvernent l\'évolution chimique des environnements astrophysiques.',
    'sdmi2a-p3':   'L\'équipe collabore avec des réseaux internationaux (BASECOL, HITRAN) et contribue à la modélisation non-LTE des milieux interstellaires et atmosphériques.',
    'sdmi2a-axe1': 'Caractérisation structurelle et spectroscopique de molécules polyatomiques',
    'sdmi2a-axe2': 'Dynamique collisionnelle et mécanismes de relaxation rotationnelle',
    'sdmi2a-axe3': 'Modélisation ab initio et surfaces d\'énergie potentielle',
    'sdmi2a-axe4': 'Applications à l\'astrochimie et aux atmosphères planétaires',
    'sdmi2a-kw1':  'Astrochimie',
    'sdmi2a-kw2':  'Atmosphère',
    'sdmi2a-kw3':  'Spectroscopie',
    'sdmi2a-kw4':  'Molécules polyatomiques',
    'sdmi2a-kw5':  'Dynamique moléculaire',
    'sdmi2a-kw6':  'Calculs ab initio',
    'sdmi2a-count':'7 membres',

    // ---- Présentation — contenu figé ----
    'pres-timeline-70s-year': 'Années 1970',
    'pres-timeline-70s-h4':   'Création du LPAM',
    'pres-timeline-70s-p':    'Création du Laboratoire de Physique Atomique et Moléculaire à la FST par <strong>Taoufik Ben Ména</strong>. Ont suivi : Zaïneb Ben Ahmed, Zohra Ben Lakhdar, Nejm-Eddine Jaïdane.',
    'pres-timeline-01-year':  '2001 — 2008',
    'pres-timeline-01-h4':    'Direction de Zohra Ben Lakhdar',
    'pres-timeline-01-p':     '<strong>Zohra Ben Lakhdar</strong>, lauréate du Prix L\'Oréal-UNESCO 2005, dirige le laboratoire nouvellement fondé et lui confère une reconnaissance internationale.',
    'pres-timeline-08-year':  '2008 — 2021',
    'pres-timeline-08-h4':    'Direction de Nejm-Eddine Jaïdane',
    'pres-timeline-08-p':     '<strong>Nejm-Eddine Jaïdane</strong> assure la direction pendant 13 ans, consolidant les équipes et développant les axes de recherche fondamentale et appliquée.',
    'pres-timeline-21-year':  'Depuis 2021',
    'pres-timeline-21-h4':    'Direction de Mourad Telmini',
    'pres-timeline-21-p':     '<strong>Mourad Telmini</strong> est l\'actuel directeur du laboratoire, poursuivant le développement des collaborations nationales et internationales.',
    'pres-axes-intro':        'Le laboratoire s\'intéresse à l\'étude des systèmes moléculaires, petits et grands, avec des applications variées dans les domaines de la santé, de l\'environnement et de l\'industrie.',
    'pres-axe1-p':            'Étude en phase gazeuse de molécules comportant moins de cinq atomes à l\'aide de méthodes quantiques avancées (MCSCF, RCCSDT, MRCI, etc.). Ces études permettent de prédire la stabilité, la spectroscopie et la dynamique d\'espèces instables, notamment dans le milieu interstellaire.',
    'pres-axe2-p':            'Utilisation des méthodes DFT et TD-DFT pour comprendre la réactivité et les mécanismes d\'oxydation de molécules complexes, avec des applications dans les secteurs pharmaceutique et cosmétique.',
    'pres-axe3-p':            'Analyse de mélanges tels que les huiles végétales, les huiles essentielles ou les hydrocarbures par des techniques comme la LIBS, la LIF, la spectroscopie EEM et la RPS. L\'objectif est de proposer des méthodes simples de contrôle qualité adaptées au terrain.',
    'pres-kw-badge2':         'Thématiques',
    'pres-kw-h2-2':           'Mots-clés illustrés',
    'pres-kw-p2':             'Les grandes thématiques scientifiques du laboratoire',
    'pres-kw-mol':            'Spectroscopie moléculaire',
    'pres-kw-chem':           'Chimie quantique',
    'pres-kw-plasma':         'Plasma',
    'pres-kw-health':         'Santé &amp; Environnement',
    'pres-know-nat-p':        'Le laboratoire est le <strong>leader en Tunisie</strong> dans le domaine de la spectroscopie atomique et moléculaire et ses applications, référencé LR01ES09 par le ministère de l\'Enseignement Supérieur et de la Recherche Scientifique.',
    'pres-know-int-p':        'La spectroscopie atomique et moléculaire est en plein essor, notamment avec les technologies quantiques et la manipulation cohérente des atomes, ions et molécules par laser. Des techniques comme la LIBS ou la fluorescence se développent pour des applications en médecine, environnement et agriculture.',
    'pres-map-p2':            'Faculté des Sciences de Tunis, Département de Physique — 2092 Manar II, Tunis',
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

    // ---- Shared team page elements ----
    'team-badge-label':    'Research team',
    'team-desc-badge':     'Description',
    'team-pres-h3':        'Team Presentation',
    'team-axes-h3':        'Research Areas',
    'team-kw-h3':          'Keywords',
    'team-members-badge':  'Members',
    'team-members-h2':     'Permanent Members',
    'team-role-porteur':   'Professor — Team Leader',
    'team-role-prof':      'Professor',
    'team-role-mcf':       'Associate Professor',
    'team-role-ma':        'Assistant Professor',

    // ---- DMEAF ----
    'dmeaf-h1':    'DMEAF Team',
    'dmeaf-h2':    'Dynamics of Excited Molecules and Cold Atoms<br><strong>Team Leader: Mourad Telmini</strong>',
    'dmeaf-p1':    'The <strong>"Dynamics of Excited Molecules and Cold Atoms"</strong> team focuses on the study of fundamental interactions between molecules and light fields, and on controlling their dynamics in ultra-cold environments.',
    'dmeaf-p2':    'The team investigates relaxation processes, low-energy collisions, and the development of experimental and theoretical techniques to manipulate laser-cooled atoms and molecules.',
    'dmeaf-p3':    'Since its founding, the DMEAF team has developed innovative approaches combining spectroscopy, quantum modelling and advanced optical instrumentation to explore excited states and dynamic reactions of atomic and molecular systems.',
    'dmeaf-axe1':  'Quantum control of excited molecules',
    'dmeaf-axe2':  'Cooling and trapping of atoms and molecules',
    'dmeaf-axe3':  'Light-matter interactions in complex systems',
    'dmeaf-kw1':   'Excited molecules',
    'dmeaf-kw2':   'Cold atoms',
    'dmeaf-kw3':   'Laser',
    'dmeaf-kw4':   'Spectroscopy',
    'dmeaf-kw5':   'Quantum physics',
    'dmeaf-kw6':   'Light-matter interaction',
    'dmeaf-count': '6 members',

    // ---- ELIBSF ----
    'elibsf-h1':   'ELIBSF Team',
    'elibsf-h2':   'LIBS and Fluorescence Experiments<br><strong>Team Leader: Sami Hamzaoui</strong>',
    'elibsf-p1':   'The <strong>"LIBS and Fluorescence Experiments" (ELIBSF)</strong> team develops experimental and theoretical approaches based on laser spectroscopy for the analysis of materials, biological media and environmental samples.',
    'elibsf-p2':   'It relies on advanced <em>Laser-Induced Breakdown Spectroscopy (LIBS)</em> and laser fluorescence techniques to characterise the composition, structure and dynamics of matter at different scales.',
    'elibsf-p3':   'The team\'s work finds direct applications in environment, food science, biomedicine and materials science.',
    'elibsf-axe1': 'Development and optimisation of LIBS and time-resolved fluorescence systems',
    'elibsf-axe2': 'Applications in environment, food science, biomedicine and materials',
    'elibsf-axe3': 'Spectroscopic studies of laser plasmas and atomic/molecular emissions',
    'elibsf-axe4': 'Quantitative and qualitative analysis by optical and spectral methods',
    'elibsf-kw1':  'LIBS',
    'elibsf-kw2':  'Fluorescence',
    'elibsf-kw3':  'Laser spectroscopy',
    'elibsf-kw4':  'Plasma',
    'elibsf-kw5':  'Materials analysis',
    'elibsf-kw6':  'Optical instrumentation',
    'elibsf-count':'7 members',

    // ---- MIBP ----
    'mibp-h1':    'MIBP Team',
    'mibp-h2':    'Molecules of Biological and Pharmaceutical Interest<br><strong>Team Leader: Souad Lahmar</strong>',
    'mibp-p1':    'The <strong>"Molecules of Biological and Pharmaceutical Interest" (MIBP)</strong> team is dedicated to studying the structure, interactions, dynamics and physicochemical properties of molecules with biological or pharmaceutical potential.',
    'mibp-p2':    'Research combines computational chemistry, molecular modelling, docking, molecular dynamics simulations and spectroscopic studies to better understand the mechanisms of action, stability and optimisation of molecular candidates.',
    'mibp-p3':    'The team contributes to the emergence of national computational pharmacology, in partnership with academic and industrial collaborators.',
    'mibp-axe1':  '3D structure modelling and conformation of active molecules',
    'mibp-axe2':  'Ligand–receptor interaction studies, docking and binding affinities',
    'mibp-axe3':  'Molecular dynamics and stability in solvent environments',
    'mibp-axe4':  'Candidate drug optimisation and in silico studies',
    'mibp-kw1':   'Biological molecules',
    'mibp-kw2':   'Pharmaceutical chemistry',
    'mibp-kw3':   'Docking',
    'mibp-kw4':   'Molecular dynamics',
    'mibp-kw5':   'Molecular interactions',
    'mibp-kw6':   'Computational modelling',
    'mibp-count': '4 members',

    // ---- SDMI2A ----
    'sdmi2a-h1':   'SDMI2A Team',
    'sdmi2a-h2':   'Structure and Dynamics of Molecules of Astrophysical and Atmospheric Interest<br><strong>Team Leader: Kamel Hammami</strong>',
    'sdmi2a-p1':   'The <strong>"Structure and Dynamics of Molecules of Astrophysical and Atmospheric Interest" (SDMI2A)</strong> team studies the electronic structure and dynamics of molecules relevant to astrochemistry and planetary atmospheres.',
    'sdmi2a-p2':   'Work combines <em>ab initio</em> calculations, molecular dynamics, theoretical and experimental spectroscopy, and investigations of collisional and radiative processes governing the chemical evolution of astrophysical environments.',
    'sdmi2a-p3':   'The team collaborates with international networks (BASECOL, HITRAN) and contributes to non-LTE modelling of interstellar and atmospheric media.',
    'sdmi2a-axe1': 'Structural and spectroscopic characterisation of polyatomic molecules',
    'sdmi2a-axe2': 'Collisional dynamics and rotational relaxation mechanisms',
    'sdmi2a-axe3': 'Ab initio modelling and potential energy surfaces',
    'sdmi2a-axe4': 'Applications to astrochemistry and planetary atmospheres',
    'sdmi2a-kw1':  'Astrochemistry',
    'sdmi2a-kw2':  'Atmosphere',
    'sdmi2a-kw3':  'Spectroscopy',
    'sdmi2a-kw4':  'Polyatomic molecules',
    'sdmi2a-kw5':  'Molecular dynamics',
    'sdmi2a-kw6':  'Ab initio calculations',
    'sdmi2a-count':'7 members',

    // ---- Présentation — hardcoded content ----
    'pres-timeline-70s-year': '1970s',
    'pres-timeline-70s-h4':   'Founding of the LPAM',
    'pres-timeline-70s-p':    'The Laboratory of Atomic and Molecular Physics was founded at FST by <strong>Taoufik Ben Ména</strong>. Followed by: Zaïneb Ben Ahmed, Zohra Ben Lakhdar, Nejm-Eddine Jaïdane.',
    'pres-timeline-01-year':  '2001 — 2008',
    'pres-timeline-01-h4':    'Direction of Zohra Ben Lakhdar',
    'pres-timeline-01-p':     '<strong>Zohra Ben Lakhdar</strong>, recipient of the L\'Oréal-UNESCO Award 2005, led the newly founded laboratory and gave it international recognition.',
    'pres-timeline-08-year':  '2008 — 2021',
    'pres-timeline-08-h4':    'Direction of Nejm-Eddine Jaïdane',
    'pres-timeline-08-p':     '<strong>Nejm-Eddine Jaïdane</strong> directed the laboratory for 13 years, consolidating the teams and developing fundamental and applied research areas.',
    'pres-timeline-21-year':  'Since 2021',
    'pres-timeline-21-h4':    'Direction of Mourad Telmini',
    'pres-timeline-21-p':     '<strong>Mourad Telmini</strong> is the current laboratory director, continuing the development of national and international collaborations.',
    'pres-axes-intro':        'The laboratory studies molecular systems, small and large, with diverse applications in health, environment and industry.',
    'pres-axe1-p':            'Gas-phase study of molecules with fewer than five atoms using advanced quantum methods (MCSCF, RCCSDT, MRCI, etc.). These studies predict the stability, spectroscopy and dynamics of unstable species, particularly in the interstellar medium.',
    'pres-axe2-p':            'Use of DFT and TD-DFT methods to understand the reactivity and oxidation mechanisms of complex molecules, with applications in the pharmaceutical and cosmetic sectors.',
    'pres-axe3-p':            'Analysis of complex mixtures such as vegetable oils, essential oils or hydrocarbons using techniques like LIBS, LIF, EEM spectroscopy and RPS. The aim is to develop simple, field-adaptable quality control methods.',
    'pres-kw-badge2':         'Topics',
    'pres-kw-h2-2':           'Illustrated Keywords',
    'pres-kw-p2':             'The main scientific themes of the laboratory',
    'pres-kw-mol':            'Molecular spectroscopy',
    'pres-kw-chem':           'Quantum chemistry',
    'pres-kw-plasma':         'Plasma',
    'pres-kw-health':         'Health &amp; Environment',
    'pres-know-nat-p':        'The laboratory is the <strong>leader in Tunisia</strong> in the field of atomic and molecular spectroscopy and its applications, referenced LR01ES09 by the Ministry of Higher Education and Scientific Research.',
    'pres-know-int-p':        'Atomic and molecular spectroscopy is rapidly expanding, especially with quantum technologies and coherent laser manipulation of atoms, ions and molecules. Techniques such as LIBS and fluorescence are being developed for applications in medicine, environment and agriculture.',
    'pres-map-p2':            'Faculty of Sciences of Tunis, Physics Department — 2092 Manar II, Tunis',
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
