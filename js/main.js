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
// Exposed as observeReveal() so elements injected later (e.g. the dynamic
// project grid) can opt into the same reveal-on-scroll behavior.
const revealSupported = 'IntersectionObserver' in window;
const revealIO = revealSupported
  ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

function observeReveal(el) {
  if (revealIO) {
    revealIO.observe(el);
  } else {
    el.classList.add('visible');
  }
}

document.querySelectorAll('.reveal').forEach(observeReveal);

// ---- Project filter tabs ----
// The "All" tab is static HTML; category tabs are fetched from the API so
// a newly created category shows up here without touching this file.
const filterTabsWrap = document.getElementById('filterTabs');

function bindFilterTabs() {
  const tabs = filterTabsWrap.querySelectorAll('.filter-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      document.querySelectorAll('[data-filter-item]').forEach(function (item) {
        const cat = item.getAttribute('data-filter-item');
        item.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });
}

if (filterTabsWrap && typeof API_BASE_URL !== 'undefined') {
  fetch(API_BASE_URL + '/project-categories')
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (payload) {
      const categories = payload.data || [];
      categories.forEach(function (category) {
        const tab = document.createElement('button');
        tab.className = 'filter-tab';
        tab.setAttribute('data-filter', category.slug);
        tab.textContent = category.name;
        filterTabsWrap.appendChild(tab);
      });
      bindFilterTabs();
    })
    .catch(function () {
      bindFilterTabs();
    });
} else if (filterTabsWrap) {
  bindFilterTabs();
}

// ---- Project grids (index.html "Featured Projects" + projects.html full listing) ----
// Both render from the same public API; index.html's grid carries
// data-limit="3" to only show its featured subset.
const projectGrids = document.querySelectorAll('.project-grid');
if (projectGrids.length && typeof API_BASE_URL !== 'undefined') {
  const STAGGER_CLASSES = ['', 'd1', 'd2'];

  fetch(API_BASE_URL + '/projects')
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (payload) {
      const allProjects = payload.data || [];

      projectGrids.forEach(function (grid) {
        const limit = parseInt(grid.getAttribute('data-limit'), 10);
        const projects = limit ? allProjects.slice(0, limit) : allProjects;

        projects.forEach(function (project, index) {
          const card = buildProjectCard(project, STAGGER_CLASSES[index % STAGGER_CLASSES.length]);
          grid.appendChild(card);
          observeReveal(card);
        });
      });
    })
    .catch(function () {
      projectGrids.forEach(function (grid) {
        const notice = document.createElement('p');
        notice.textContent = "Couldn't load projects right now — please try again later.";
        grid.appendChild(notice);
      });
    });
}

function buildProjectCard(project, staggerClass) {
  const detailHref = 'project-detail.html?slug=' + encodeURIComponent(project.slug);

  const article = document.createElement('article');
  article.className = staggerClass ? 'project-card reveal ' + staggerClass : 'project-card reveal';
  article.setAttribute('data-filter-item', project.category);

  const thumbLink = document.createElement('a');
  thumbLink.href = detailHref;
  thumbLink.className = 'project-thumb';
  if (project.thumbnail) {
    const img = document.createElement('img');
    img.src = project.thumbnail;
    img.alt = project.title + ' screenshot';
    img.loading = 'lazy';
    thumbLink.appendChild(img);
  } else {
    const placeholder = document.createElement('span');
    placeholder.textContent = '[ screenshot ]';
    thumbLink.appendChild(placeholder);
  }

  const body = document.createElement('div');
  body.className = 'project-body';

  const h3 = document.createElement('h3');
  const titleLink = document.createElement('a');
  titleLink.href = detailHref;
  titleLink.textContent = project.title;
  h3.appendChild(titleLink);

  const description = document.createElement('p');
  description.textContent = project.description;

  const tagRow = document.createElement('div');
  tagRow.className = 'tag-row';
  (project.tags || []).forEach(function (tag) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagRow.appendChild(span);
  });

  const links = document.createElement('div');
  links.className = 'project-links';
  const detailsLink = document.createElement('a');
  detailsLink.href = detailHref;
  detailsLink.textContent = 'Details →';
  links.appendChild(detailsLink);

  body.appendChild(h3);
  body.appendChild(description);
  body.appendChild(tagRow);
  body.appendChild(links);

  article.appendChild(thumbLink);
  article.appendChild(body);
  return article;
}

// ---- Experience timeline (index.html preview + experience.html full) ----
// Education column stays static; only the Experience column is API-driven.
const experienceTimelines = document.querySelectorAll('.experience-timeline');
if (experienceTimelines.length && typeof API_BASE_URL !== 'undefined') {
  fetch(API_BASE_URL + '/experience')
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (payload) {
      const allEntries = payload.data || [];

      experienceTimelines.forEach(function (timeline) {
        const limit = parseInt(timeline.getAttribute('data-limit'), 10);
        const entries = limit ? allEntries.slice(0, limit) : allEntries;
        entries.forEach(function (entry) {
          timeline.appendChild(buildTimelineItem(entry));
        });
      });
    })
    .catch(function () {
      experienceTimelines.forEach(function (timeline) {
        const notice = document.createElement('p');
        notice.textContent = "Couldn't load experience right now — please try again later.";
        timeline.appendChild(notice);
      });
    });
}

function buildTimelineItem(entry) {
  const item = document.createElement('div');
  item.className = 't-item';

  const date = document.createElement('p');
  date.className = 't-date';
  date.textContent = entry.dateRange;
  item.appendChild(date);

  const title = document.createElement('h3');
  title.textContent = entry.title;
  item.appendChild(title);

  if (entry.organization) {
    const org = document.createElement('p');
    org.className = 't-org';
    if (entry.organizationUrl) {
      const link = document.createElement('a');
      link.href = entry.organizationUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = entry.organization;
      org.appendChild(link);
    } else {
      org.textContent = entry.organization;
    }
    item.appendChild(org);
  }

  if (entry.points && entry.points.length) {
    const ul = document.createElement('ul');
    entry.points.forEach(function (point) {
      const li = document.createElement('li');
      li.textContent = point;
      ul.appendChild(li);
    });
    item.appendChild(ul);
  }

  return item;
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

// ---- Project detail page (reads ?slug= from the public API) ----
const detailWrap = document.getElementById('detailWrap');
if (detailWrap && typeof API_BASE_URL !== 'undefined') {
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');

  fetch(API_BASE_URL + '/projects/' + encodeURIComponent(slug))
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (payload) {
      const project = payload.data;
      const pageTitle = project.title + ' | Vinod Suthar — Full Stack Laravel Developer';
      const pageUrl = location.href;
      const ogImage = project.thumbnail || 'https://vkdeveloper900.github.io/images/og-image.png';

      document.title = pageTitle;
      document.getElementById('metaDescription').setAttribute('content', project.description);
      document.getElementById('canonicalLink').setAttribute('href', pageUrl);
      document.getElementById('ogUrl').setAttribute('content', pageUrl);
      document.getElementById('ogTitle').setAttribute('content', pageTitle);
      document.getElementById('ogDescription').setAttribute('content', project.description);
      document.getElementById('ogImage').setAttribute('content', ogImage);
      document.getElementById('twitterTitle').setAttribute('content', pageTitle);
      document.getElementById('twitterDescription').setAttribute('content', project.description);
      document.getElementById('twitterImage').setAttribute('content', ogImage);

      document.getElementById('detailCategory').textContent = '// ' + (project.category === 'laravel' ? 'laravel project' : 'frontend project');
      document.getElementById('detailTitle').textContent = project.title;
      document.getElementById('detailDescription').textContent = project.description;

      const tagsEl = document.getElementById('detailTags');
      project.tags.forEach(function (tag) {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
      });

      const linksEl = document.getElementById('detailLinks');
      if (project.liveUrl) {
        linksEl.innerHTML += '<a href="' + project.liveUrl + '" target="_blank" rel="noopener">Live ↗</a>';
      }
      if (project.codeUrl) {
        linksEl.innerHTML += '<a href="' + project.codeUrl + '" target="_blank" rel="noopener">Code ↗</a>';
      }
      if (project.linkNote) {
        linksEl.innerHTML += '<span style="color: var(--muted); font-size: 0.9rem;">' + project.linkNote + '</span>';
      }

      if (project.thumbnail) {
        document.getElementById('detailThumb').src = project.thumbnail;
        document.getElementById('detailThumb').alt = project.title + ' screenshot';
        document.getElementById('detailThumbWrap').style.display = 'block';
      }

      document.getElementById('detailCaseStudy').innerHTML = project.detailContent;

      if (project.media && project.media.length) {
        const mediaEl = document.getElementById('detailMedia');
        project.media.forEach(function (item) {
          const wrap = document.createElement('div');
          wrap.className = 'detail-media-item';
          if (item.type === 'video') {
            wrap.innerHTML = '<iframe src="' + item.url + '" loading="lazy" allowfullscreen></iframe>';
          } else {
            wrap.innerHTML = '<img src="' + item.url + '" alt="' + (item.alt || project.title) + '" loading="lazy">';
          }
          mediaEl.appendChild(wrap);
        });
      }

      detailWrap.style.display = 'block';
    })
    .catch(function () {
      document.getElementById('notFoundWrap').style.display = 'block';
    });
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
