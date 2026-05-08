// ===== BACK TO TOP =====
window.addEventListener('scroll', function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 300);
});
