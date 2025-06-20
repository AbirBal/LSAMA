let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function currentSlide(n) {
  clearTimeout(timer); // Stop auto timer
  slideIndex = n;
  showManualSlide();
}

function showManualSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

// Setup dots click listeners
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", () => {
    currentSlide(i + 1);
  });
}

// Launch slideshow
let timer = setTimeout(showSlides, 100); // Slight delay to avoid flash


