//  SDT CHANNEL INT'L LTD — shared site behavior

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

});
