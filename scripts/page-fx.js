// ============================================================================
// Page FX · additive polish. Reveals blocks as they scroll into view + makes the
// nav react on scroll. Fully isolated and fail-safe:
//   • drives the reveal with INLINE styles (can't be overridden by other CSS)
//   • only adds the "rise" where an element has no transform of its own
//   • a timeout reveals anything still hidden, so content can NEVER get stuck
//   • does nothing under prefers-reduced-motion
// Remove this file's <script> tag to revert completely.
// ============================================================================
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // land at the top so the reveal measures positions correctly (no restored scroll)
  if ('scrollRestoration' in history) try { history.scrollRestoration = 'manual'; } catch (e) {}

  // ---- reveal on scroll ---------------------------------------------------
  if (!reduce && 'IntersectionObserver' in window) {
    // section heads + group containers (NOT the flywheel / console internals)
    var SEL = '.b-problem-head, .b-metrics, .b-caps-head, .b-process-head, .b-steps,' +
              '.workflow-head, .b-stack-head, .b-tools, .b-testi-head, .b-testi-frame,' +
              '.b-mini-cta, .b-footer-ctas';
    var targets = Array.prototype.slice.call(document.querySelectorAll(SEL));
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var EASE = 'cubic-bezier(.2,.7,.3,1)';

    function reveal(el) { el.style.opacity = '1'; if (el.__pfxRise) el.style.transform = 'none'; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.9) return;      // already visible → leave it
      el.__pfxRise = getComputedStyle(el).transform === 'none';   // only rise if no transform to clobber
      el.style.transition = 'opacity .7s ease' + (el.__pfxRise ? ', transform .78s ' + EASE : '');
      el.style.opacity = '0';
      if (el.__pfxRise) el.style.transform = 'translateY(20px)';
      io.observe(el);
    });

    // fail-safe: reveal anything still hidden after a few seconds, no matter what
    setTimeout(function () { targets.forEach(function (el) { if (el.style.opacity === '0') reveal(el); }); }, 4500);
  }

  // ---- nav reacts on scroll (not motion — safe under reduced-motion) ------
  var nav = document.querySelector('.b-nav-wrap');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('pfx-scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();


// ---- mobile nav · burger toggles the slide-down menu (absent on desktop) ----
(function () {
  var burger = document.querySelector('.b-nav-burger');
  var menu = document.querySelector('.b-nav-menu');
  if (!burger || !menu) return;
  function setOpen(open) {
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !e.target.closest('.b-nav')) setOpen(false);
  });
})();

/* Hero cards on touch: tap toggles the reveal (hover has no un-hover on touch).
   First tap opens, second tap closes, tapping another card switches. */
(function () {
  if (window.matchMedia && window.matchMedia('(hover: hover)').matches) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.hero-el'));
  if (!cards.length) return;
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var wasOpen = card.classList.contains('is-open');
      cards.forEach(function (c) { c.classList.remove('is-open'); });
      if (!wasOpen) card.classList.add('is-open');
    });
  });
})();
