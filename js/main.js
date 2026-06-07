/* ===== Mobile Navigation Toggle ===== */
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });
  }

  /* ===== Before-After Comparison Slider ===== */
  document.querySelectorAll('.comparison-slider').forEach(function (slider) {
    const handle = slider.querySelector('.slider-handle');
    const beforeImg = slider.querySelector('.before-img');
    if (!handle || !beforeImg) return;

    let isDragging = false;

    function updateSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let position = (clientX - rect.left) / rect.width;
      position = Math.max(0.05, Math.min(0.95, position));
      handle.style.left = (position * 100) + '%';
      beforeImg.style.clipPath = 'inset(0 ' + ((1 - position) * 100) + '% 0 0)';
    }

    slider.addEventListener('mousedown', function (event) {
      isDragging = true;
      updateSlider(event.clientX);
      event.preventDefault();
    });

    document.addEventListener('mousemove', function (event) {
      if (isDragging) {
        updateSlider(event.clientX);
      }
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    // Touch support
    slider.addEventListener('touchstart', function (event) {
      isDragging = true;
      updateSlider(event.touches[0].clientX);
    });

    document.addEventListener('touchmove', function (event) {
      if (isDragging) {
        updateSlider(event.touches[0].clientX);
      }
    });

    document.addEventListener('touchend', function () {
      isDragging = false;
    });
  });
});
