(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */

  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  /* ---------- Scroll reveal ---------- */

  var wantsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!wantsMotion || !('IntersectionObserver' in window)) return;

  var pending = [];
  var observerAlive = false;

  var observer = new IntersectionObserver(
    function (entries) {
      observerAlive = true;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );

  // Anything already on screen (including where a #hash link lands) stays
  // untouched and paints immediately; only what's below the fold animates in.
  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el, i) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    el.classList.add('will-reveal');
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    pending.push(el);
    observer.observe(el);
  });

  // The observer reports on every target shortly after observe(), so silence
  // here means it isn't working. Drop the animation rather than risk leaving
  // any of that content hidden.
  setTimeout(function () {
    if (observerAlive) return;
    observer.disconnect();
    pending.forEach(function (el) {
      el.classList.remove('will-reveal');
    });
  }, 1500);
})();
