
document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.steps-slider');

  if (!slider) return;

  const viewport = slider.querySelector('.steps-slider__viewport');
  const track = slider.querySelector('.steps-slider__track');
  const slides = slider.querySelectorAll('.step-card');

  const prevButton = slider.querySelector('.slider__arrow--prev');
  const nextButton = slider.querySelector('.slider__arrow--next');

  const dots = document.querySelectorAll('.slider__dot');

  let currentSlide = 0;

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function updateSlider() {

    if (!isMobile()) {
      track.style.transform = '';
      return;
    }

    const slideWidth = viewport.offsetWidth;

    track.style.transform =
      `translateX(-${currentSlide * slideWidth}px)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        'is-active',
        index === currentSlide
      );
    });

    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;
  }

  function goToSlide(index) {

    if (!isMobile()) return;

    currentSlide = Math.max(
      0,
      Math.min(index, slides.length - 1)
    );

    updateSlider();
  }

  nextButton.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  prevButton.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener(
    'touchstart',
    (event) => {
      if (!isMobile()) return;

      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  viewport.addEventListener(
    'touchend',
    (event) => {
      if (!isMobile()) return;

      touchEndX = event.changedTouches[0].clientX;

      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) < 50) return;

      if (difference > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', updateSlider);
  updateSlider();

});
