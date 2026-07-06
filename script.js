// THE SDT CHANNEL INT'L LTD — shared site behavior

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navbar = document.querySelector('.navbar');
  if (toggle && navbar) {
    toggle.addEventListener('click', function () {
      navbar.classList.toggle('open');
      var expanded = navbar.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    navbar.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { navbar.classList.remove('open'); });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.acc-item').forEach(function (item) {
    var q = item.querySelector('.acc-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function (el) {
        if (el !== item) el.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  // Quote / contact form (static demo — no backend wired up)
  document.querySelectorAll('form[data-quote-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
      form.reset();
    });
  });

  // ---------------------------------------------------------------
  // Scroll-reveal animation system
  // Auto-tags common section/card patterns with data-reveal attributes
  // so existing markup doesn't need to be rewritten by hand, then
  // fades/slides them in the first time they enter the viewport.
  // ---------------------------------------------------------------
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {

    // Tag section headers to fade up as they enter view
    document.querySelectorAll('.section-head').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up');
    });

    // Tag card/grid groups to stagger their children in
    document.querySelectorAll('.grid').forEach(function (el) {
      if (!el.hasAttribute('data-reveal-group')) el.setAttribute('data-reveal-group', '');
    });

    // Tag standalone bordered panels (forms, CTA bands, map, stat strip)
    document.querySelectorAll('.form-panel, .cta-band, .stat-strip, .logo-strip').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up');
    });

    // Two-column layout blocks: alternate slide-in direction left/right
    document.querySelectorAll('.two-col').forEach(function (el) {
      var children = el.children;
      if (children[0] && !children[0].hasAttribute('data-reveal')) children[0].setAttribute('data-reveal', 'left');
      if (children[1] && !children[1].hasAttribute('data-reveal')) children[1].setAttribute('data-reveal', 'right');
    });

    // Page-hero breadcrumb content (inner pages)
    document.querySelectorAll('.page-hero .container').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up');
    });

    var revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-group]');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });

    // ---------------------------------------------------------------
    // Animated stat counters (hero-stats and stat-strip numbers)
    // Parses the existing text (e.g. "500+", "98%", "24/7") and, where
    // it contains a plain animatable number, counts up on first view.
    // ---------------------------------------------------------------
    var counterEls = document.querySelectorAll('.hero-stats strong, .stat-strip strong');
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        counterObserver.unobserve(el);
        var raw = el.textContent.trim();
        var match = raw.match(/^(\d+)(.*)$/); // leading integer + trailing suffix (+, %, etc.)
        if (!match) return; // skip things like "24/7"
        var target = parseInt(match[1], 10);
        var suffix = match[2];
        var duration = 1200;
        var start = null;
        el.textContent = '0' + suffix;
        function step(ts) {
          if (start === null) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counterEls.forEach(function (el) { counterObserver.observe(el); });
  }

});

