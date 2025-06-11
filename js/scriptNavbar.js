 function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('open');
  }

  // Fermer le menu après clic sur un lien (optionnel mais conseillé)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navMenu').classList.remove('open');
    });
  });