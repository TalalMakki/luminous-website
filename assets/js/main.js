(function () {
  var root = document.documentElement;
  var STORAGE_KEY = 'luminous-lang';

  var langSwitch = document.getElementById('langSwitch');
  var langSwitchLabel = document.getElementById('langSwitchLabel');

  function applyLang(lang) {
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('data-lang', lang);
    langSwitchLabel.textContent = lang === 'ar' ? 'EN' : 'AR';

    document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (savedLang === 'ar' || savedLang === 'en') applyLang(savedLang);

  langSwitch.addEventListener('click', function () {
    var current = root.getAttribute('data-lang') || 'ar';
    applyLang(current === 'ar' ? 'en' : 'ar');
  });

  /* Header shadow on scroll */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  var groups = ['.quality-grid', '.product-grid', '.gallery-grid', '.brand-grid'];
  groups.forEach(function (sel) {
    var group = document.querySelector(sel);
    if (!group) return;
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--i', i);
    });
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
