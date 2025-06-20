// Affichage ou masquage du bouton selon le scroll
  window.addEventListener('scroll', function() {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });

  // Remonter en haut en douceur
  document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });