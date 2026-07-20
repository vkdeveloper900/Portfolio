// ============================
// VINOD SUTHAR PORTFOLIO — JS
// ============================

// ---- Mobile nav toggle ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// ---- Typing effect (hero roles) ----
const typeTarget = document.getElementById('typeText');
if (typeTarget) {
  const roles = [
    'Full Stack Developer',
    'Laravel Developer',
    'API & Integration Specialist',
    'Freelance Developer'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600); // pause on full word
        return;
      }
      setTimeout(typeLoop, 70);
    } else {
      charIdx--;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeLoop, 300);
        return;
      }
      setTimeout(typeLoop, 40);
    }
  }
  typeLoop();
}

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('visible'); });
}

// ---- Project filter tabs ----
const filterTabs = document.querySelectorAll('.filter-tab');
const filterItems = document.querySelectorAll('[data-filter-item]');
if (filterTabs.length && filterItems.length) {
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      filterItems.forEach(function (item) {
        const cat = item.getAttribute('data-filter-item');
        item.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });
}

// ---- Contact form (AJAX submit + success/error animation) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formFields = document.getElementById('formFields');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const submitBtn = document.getElementById('submitBtn');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const submitLabel = submitBtn.textContent;

  function showPanel(panel) {
    formFields.style.display = 'none';
    formSuccess.classList.remove('show');
    formError.classList.remove('show');
    if (panel) {
      panel.style.display = 'block';
      // restart CSS animations on repeat submissions
      void panel.offsetWidth;
      panel.classList.add('show');
    }
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          contactForm.reset();
          showPanel(formSuccess);
        } else {
          showPanel(formError);
        }
      })
      .catch(function () {
        showPanel(formError);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function () {
      formSuccess.classList.remove('show');
      formSuccess.style.display = 'none';
      formFields.style.display = 'block';
    });
  }
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', function () {
      formError.classList.remove('show');
      formError.style.display = 'none';
      formFields.style.display = 'block';
    });
  }
}

// ---- Back to top ----
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 500);
  });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
