// Mobile menu
(function () {
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

// Reveal on scroll
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();

// Footer year
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Contact form -> email via FormSubmit (no account needed)
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form._honey && form._honey.value) return;
    status.className = 'form-status';
    btn.disabled = true;
    var label = btn.textContent;
    btn.textContent = 'Sending...';
    var data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.j.success) === 'true') {
          status.textContent = 'Thank you. Your enquiry has been sent and our team will respond within 1 business day.';
          status.className = 'form-status ok';
          form.reset();
        } else { throw new Error('fail'); }
      })
      .catch(function () {
        status.innerHTML = 'Sorry, the message could not be sent. Please email <a href="mailto:contact@quantaraservices.in"><u>contact@quantaraservices.in</u></a> or call +91 99021 06188.';
        status.className = 'form-status err';
      })
      .finally(function () { btn.disabled = false; btn.textContent = label; });
  });
})();
