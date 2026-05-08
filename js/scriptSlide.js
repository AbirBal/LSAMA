// ===== SLIDESHOW =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
let slideTimer;

if (slides.length > 0 && dotsContainer) {
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot-btn' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Slide ' + (i + 1));
    btn.onclick = () => goToSlide(i);
    dotsContainer.appendChild(btn);
  });
}

function goToSlide(n) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dotsContainer && dotsContainer.children[currentSlide]) {
    dotsContainer.children[currentSlide].classList.remove('active');
  }
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dotsContainer && dotsContainer.children[currentSlide]) {
    dotsContainer.children[currentSlide].classList.add('active');
  }
  resetTimer();
}

function moveSlide(dir) { goToSlide(currentSlide + dir); }

function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

if (slides.length > 0) {
  resetTimer();
}
