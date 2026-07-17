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
    const beforeVid = slider.querySelector('.before-video');
    const beforeEl = beforeImg || beforeVid;
    const afterVid = slider.querySelector('.after-video');

    if (!handle || !beforeEl) return;

    var fullscreenTarget = slider.closest('.comparison-container') || slider;
    var fullscreenBtn = slider.querySelector('.comparison-fullscreen-btn');
    var fullscreenHint = slider.querySelector('.comparison-fullscreen-hint');
    var canFullscreen = fullscreenTarget.requestFullscreen || fullscreenTarget.webkitRequestFullscreen;

    function getFullscreenElement() {
      return document.fullscreenElement || document.webkitFullscreenElement;
    }

    function requestSliderFullscreen() {
      if (fullscreenTarget.requestFullscreen) return fullscreenTarget.requestFullscreen();
      if (fullscreenTarget.webkitRequestFullscreen) return fullscreenTarget.webkitRequestFullscreen();
      return Promise.resolve();
    }

    function exitSliderFullscreen() {
      if (document.exitFullscreen) return document.exitFullscreen();
      if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      return Promise.resolve();
    }

    function updateFullscreenButton() {
      if (!fullscreenBtn) return;

      var isFullscreen = getFullscreenElement() === fullscreenTarget;
      var enterIcon = fullscreenBtn.querySelector('.fullscreen-enter-icon');
      var exitIcon = fullscreenBtn.querySelector('.fullscreen-exit-icon');

      fullscreenTarget.classList.toggle('comparison-is-fullscreen', isFullscreen);
      fullscreenBtn.setAttribute('aria-label', isFullscreen ? 'Exit full screen comparison' : 'Open comparison full screen');
      fullscreenBtn.setAttribute('title', isFullscreen ? 'Exit full screen' : 'Full screen');

      if (enterIcon) enterIcon.style.display = isFullscreen ? 'none' : '';
      if (exitIcon) exitIcon.style.display = isFullscreen ? '' : 'none';
    }

    if (canFullscreen) {
      if (!fullscreenHint) {
        fullscreenHint = document.createElement('div');
        fullscreenHint.className = 'comparison-fullscreen-hint';
        fullscreenHint.textContent = 'Click full screen to inspect details';
        slider.appendChild(fullscreenHint);
      }

      if (!fullscreenBtn) {
        fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'comparison-fullscreen-btn';
        fullscreenBtn.type = 'button';
        fullscreenBtn.setAttribute('aria-label', 'Open comparison full screen');
        fullscreenBtn.setAttribute('title', 'Full screen');
        fullscreenBtn.innerHTML = '<span class="fullscreen-enter-icon">⛶</span><span class="fullscreen-exit-icon" style="display: none;">×</span>';
        slider.appendChild(fullscreenBtn);
      }

      fullscreenBtn.addEventListener('mousedown', function (event) {
        event.stopPropagation();
      });

      fullscreenBtn.addEventListener('touchstart', function (event) {
        event.stopPropagation();
      });

      fullscreenBtn.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var isFullscreen = getFullscreenElement() === fullscreenTarget;
        var fullscreenAction = isFullscreen ? exitSliderFullscreen() : requestSliderFullscreen();
        if (fullscreenHint) fullscreenHint.style.opacity = '0';

        if (fullscreenAction && fullscreenAction.catch) {
          fullscreenAction.catch(function () {});
        }
      });

      document.addEventListener('fullscreenchange', updateFullscreenButton);
      document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
      updateFullscreenButton();
    } else {
      if (fullscreenBtn) fullscreenBtn.style.display = 'none';
      if (fullscreenHint) fullscreenHint.style.display = 'none';
    }

    let isDragging = false;

    function updateClip(position) {
      handle.style.left = (position * 100) + '%';
      beforeEl.style.clipPath = 'inset(0 ' + ((1 - position) * 100) + '% 0 0)';
    }

    function updateSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let position = (clientX - rect.left) / rect.width;
      position = Math.max(0.05, Math.min(0.95, position));
      updateClip(position);
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

    // Video sync: keep both videos at the same playback position
    if (beforeVid && afterVid) {
      function syncVideo(source, target) {
        if (Math.abs(source.currentTime - target.currentTime) > 0.1) {
          target.currentTime = source.currentTime;
        }
        if (source.paused !== target.paused) {
          if (source.paused) target.pause();
          else target.play();
        }
      }

      beforeVid.addEventListener('play', function () { syncVideo(beforeVid, afterVid); });
      beforeVid.addEventListener('pause', function () { syncVideo(beforeVid, afterVid); });
      beforeVid.addEventListener('seeked', function () { syncVideo(beforeVid, afterVid); });
      afterVid.addEventListener('play', function () { syncVideo(afterVid, beforeVid); });
      afterVid.addEventListener('pause', function () { syncVideo(afterVid, beforeVid); });
      afterVid.addEventListener('seeked', function () { syncVideo(afterVid, beforeVid); });
    }
  });

  /* ===== Video Comparison Carousel ===== */
  document.querySelectorAll('.comparison-carousel').forEach(function (carousel) {
    const containers = carousel.querySelectorAll('.comparison-container');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicator = carousel.querySelector('.carousel-indicator');

    if (!containers.length || !prevBtn || !nextBtn || !indicator) return;

    let currentIndex = 0;

    // Add drag hint on first active slider
    var dragHint = null;
    var firstActiveSlider = carousel.querySelector('.comparison-container.active .comparison-slider');
    if (firstActiveSlider) {
      dragHint = document.createElement('div');
      dragHint.className = 'slider-drag-hint';
      dragHint.innerHTML = '↔ Drag to compare';
      firstActiveSlider.appendChild(dragHint);

      function hideDragHint() {
        if (dragHint && dragHint.parentNode) {
          dragHint.style.opacity = '0';
          setTimeout(function () { if (dragHint.parentNode) dragHint.parentNode.removeChild(dragHint); }, 500);
          dragHint = null;
        }
      }

      firstActiveSlider.addEventListener('mousedown', function () { hideDragHint(); });
      firstActiveSlider.addEventListener('touchstart', function () { hideDragHint(); });
    }

    // Add next hint below carousel controls
    var nextHint = null;
    if (containers.length > 1) {
      nextHint = document.createElement('div');
      nextHint.className = 'carousel-next-hint';
      nextHint.innerHTML = '👆 Click Next → to see more comparisons';
      carousel.appendChild(nextHint);

      function hideNextHint() {
        if (nextHint && nextHint.parentNode) {
          nextHint.style.opacity = '0';
          setTimeout(function () { if (nextHint.parentNode) nextHint.parentNode.removeChild(nextHint); }, 500);
          nextHint = null;
        }
      }

      nextBtn.addEventListener('click', function () { hideNextHint(); });
    }

    function showSlide(index) {
      containers.forEach(function (c, i) {
        c.classList.toggle('active', i === index);
        // Pause videos in hidden containers
        if (i !== index) {
          var vids = c.querySelectorAll('video');
          vids.forEach(function (v) { v.pause(); });
          // Reset slider handle and before element
          var s = c.querySelector('.comparison-slider');
          var h = s ? s.querySelector('.slider-handle') : null;
          var bImg = s ? s.querySelector('.before-img') : null;
          var bVid = s ? s.querySelector('.before-video') : null;
          if (h) h.style.left = '';
          if (bImg) bImg.style.clipPath = '';
          if (bVid) bVid.style.clipPath = '';
          // Reset progress bar
          var filled = c.querySelector('.video-progress-filled');
          var curTime = c.querySelector('.video-current-time');
          if (filled) filled.style.width = '0%';
          if (curTime) curTime.textContent = '0:00';
        }
      });

      // Reset slider in the newly active container after DOM update
      var activeContainer = containers[index];
      var slider = activeContainer.querySelector('.comparison-slider');
      var handle = slider ? slider.querySelector('.slider-handle') : null;
      var beforeEl = slider ? (slider.querySelector('.before-img') || slider.querySelector('.before-video')) : null;

      if (handle && beforeEl) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            handle.style.left = '50%';
            beforeEl.style.clipPath = 'inset(0 50% 0 0)';
          });
        });
      }

      // Reset play button state for active container
      var playIcon = activeContainer.querySelector('.play-icon');
      var pauseIcon = activeContainer.querySelector('.pause-icon');
      if (playIcon) playIcon.style.display = '';
      if (pauseIcon) pauseIcon.style.display = 'none';

      indicator.textContent = (index + 1) + ' / ' + containers.length;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === containers.length - 1;
    }

    prevBtn.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
      }
    });

    nextBtn.addEventListener('click', function () {
      if (currentIndex < containers.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
      }
    });

    showSlide(0);
  });

  /* ===== Video Playback Controls ===== */
  document.querySelectorAll('.video-playback-controls').forEach(function (controls) {
    var playBtn = controls.querySelector('.video-play-btn');
    var playIcon = controls.querySelector('.play-icon');
    var pauseIcon = controls.querySelector('.pause-icon');
    var container = controls.closest('.comparison-container');
    var videos = container ? container.querySelectorAll('video') : [];
    var progressTrack = controls.querySelector('.video-progress-track');
    var progressFilled = controls.querySelector('.video-progress-filled');
    var currentTimeEl = controls.querySelector('.video-current-time');
    var durationEl = controls.querySelector('.video-duration');

    if (!playBtn || !videos.length) return;

    function formatTime(seconds) {
      if (!seconds || seconds < 0) return '0:00';
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    function updateButtonState() {
      var allPaused = true;
      videos.forEach(function (v) {
        if (!v.paused) allPaused = false;
      });
      if (allPaused) {
        playIcon.style.display = '';
        pauseIcon.style.display = 'none';
      } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = '';
      }
    }

    function updateProgress() {
      if (!videos[0]) return;
      var current = videos[0].currentTime;
      var dur = videos[0].duration || 0;
      var pct = dur > 0 ? (current / dur) * 100 : 0;
      if (progressFilled) progressFilled.style.width = pct + '%';
      if (currentTimeEl) currentTimeEl.textContent = formatTime(current);
      if (durationEl) durationEl.textContent = formatTime(dur);
    }

    // Sync all videos
    playBtn.addEventListener('click', function () {
      var shouldPlay = videos[0].paused;
      videos.forEach(function (v) {
        if (shouldPlay) {
          v.play().catch(function () {});
        } else {
          v.pause();
        }
      });
      updateButtonState();
    });

    // Progress bar click to seek
    if (progressTrack) {
      progressTrack.addEventListener('click', function (e) {
        var rect = progressTrack.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        pct = Math.max(0, Math.min(1, pct));
        videos.forEach(function (v) {
          if (v.duration) v.currentTime = pct * v.duration;
        });
        updateProgress();
      });
    }

    // Listen to video events for progress update
    videos.forEach(function (v) {
      v.addEventListener('play', updateButtonState);
      v.addEventListener('pause', updateButtonState);
      v.addEventListener('ended', updateButtonState);
      v.addEventListener('timeupdate', updateProgress);
      v.addEventListener('loadedmetadata', function () {
        updateProgress();
      });
    });

    // Initial state
    updateButtonState();
    updateProgress();
  });
});
