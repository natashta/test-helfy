
document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.steps-slider');

  if (!slider) return;

  const viewport = slider.querySelector('.steps-slider__viewport');
  const track = slider.querySelector('.steps-slider__track');
  const slides = slider.querySelectorAll('.step-card');

  const prevButton = slider.querySelector('.steps-slider__arrow--prev');
  const nextButton = slider.querySelector('.steps-slider__arrow--next');

  const dots = document.querySelectorAll('.steps-slider__dot');

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

    // dots
    dots.forEach((dot, index) => {
      dot.classList.toggle(
        'is-active',
        index === currentSlide
      );
    });

    // arrows
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

  // NEXT
  nextButton.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  // PREV
  prevButton.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  // DOTS
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

      // Минимальное расстояние свайпа
      if (Math.abs(difference) < 50) return;

      if (difference > 0) {
        // swipe left
        goToSlide(currentSlide + 1);
      } else {
        // swipe right
        goToSlide(currentSlide - 1);
      }
    },
    { passive: true }
  );

  // При изменении размера окна
  window.addEventListener('resize', updateSlider);

  // Первоначальное состояние
  updateSlider();

});
