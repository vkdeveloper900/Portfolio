# Vinod Suthar — Portfolio Website

> **AI CONTEXT FILE** — Read this fully before making any changes to this project.
> This file defines the design system, page structure, data, and conventions.
> Follow these rules exactly. Do NOT invent new colors, fonts, or layouts.

---

## 1. Project Overview

- **Owner:** Vinod Suthar (VKDEVELOPER) — Full Stack Laravel Developer, Ahmedabad, India
- **Purpose:** Professional developer portfolio — targets recruiters & freelance clients
- **Positioning:** "Laravel Developer specializing in APIs & Integrations (Payments, SMS/OTP, Microsoft 365)"
- **Tech:** Pure HTML + CSS + Vanilla JS (NO frameworks, NO build step)
- **Hosting:** GitHub Pages — **live at https://vkdeveloper900.github.io/Portfolio/**
- **Sibling project:** `../Portfolio_Backend_Laravel` — a Laravel admin panel + public API (Projects, Project Categories, Experience, Leads/contact submissions), live at **https://vinodsuthar.alwaysdata.net**. **This frontend is fully wired to it** — projects, project filter tabs, experience, and the contact form all read/write through the real API (`js/config.js` picks the right base URL by hostname). Editing content in the admin panel now directly controls the live site.

---

## 2. File Structure

```
portfolio/
├── index.html            ✅ Home — hero, process flow, about, skills, specializations, featured projects (API, top 2), experience preview (API, top 2), contact strip
├── projects.html         ✅ Full projects grid (API-driven) + dynamic filter tabs (from GET /api/project-categories), links to project-detail.html
├── project-detail.html   ✅ Single reusable template — reads ?slug= and fetches GET /api/projects/{slug}
├── experience.html       ✅ Experience column is API-driven (GET /api/experience); Education column stays static HTML by design
├── contact.html          ✅ Contact cards + Save Contact vCard button + AJAX form posting to the Laravel backend's POST /api/contact
├── privacy-policy.html   ✅ Plain-language privacy policy, linked from every footer
├── 404.html              ✅ Custom space-themed 404 (GitHub Pages auto-serves this for unmatched paths) — same design as the backend's Blade 404 view
├── css/
│   └── style.css         ✅ Single shared stylesheet — ALL pages use this
├── js/
│   ├── config.js          ✅ API_BASE_URL — switches between local (127.0.0.1:8000) and production (vinodsuthar.alwaysdata.net) by hostname. Must be loaded before main.js.
│   ├── main.js            ✅ Shared JS — nav, typing, reveal, process flow, dynamic filter tabs, project grid fetch, experience timeline fetch, contact form, project-detail rendering, theme bits, to-top
│   └── projects-data.js   ⚠️ LEGACY, no longer loaded by any page — superseded by the live API. Kept only as historical reference; safe to delete whenever, just isn't wired to anything.
├── images/
│   ├── about-photo.png    ✅ Transparent PNG headshot (see §12 — do not swap back to JPG, JPG can't hold transparency)
│   ├── vk-logo.jpg        ✅ Favicon + apple-touch-icon on all pages
│   ├── vcard-photo.jpg    ✅ Small square photo embedded (base64) in vinod-suthar.vcf
│   ├── og-image.svg       ⏳ Social-share image source — still needs PNG export, see TODO
│   ├── antigravity.png, kiro.svg  ✅ Real brand logos pulled directly from the products' own sites (see §15)
│   └── projects/          ✅ Local project thumbnails (legacy — new projects upload thumbnails through the admin panel instead, stored on the backend)
├── vinod-suthar.vcf      ✅ Downloadable vCard (see §16)
├── robots.txt / sitemap.xml  ✅ Both point at vkdeveloper900.github.io — update if ever deployed elsewhere
└── email-templates/
    └── thank-you.html    ⚠️ LEGACY — the real contact-form emails are now sent by the Laravel backend (`resources/views/emails/*.blade.php`), which was originally adapted from this file. This copy no longer sends anything; kept for reference only.
```

**Rule:** One shared `css/style.css` and `js/main.js` for ALL pages. Never create per-page CSS/JS files. Reuse existing classes before adding new ones.

---

## 3. Design System

### 3.1 Colors (CSS variables in `:root`)

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#0E1116` | Page background (deep charcoal, never pure black) |
| `--surface` | `#161B22` | Cards, footer background |
| `--surface-2` | `#1C232C` | Card headers, nested surfaces |
| `--border` | `#262D37` | All borders/dividers |
| `--text` | `#E6EDF3` | Headings, primary text |
| `--muted` | `#8B949E` | Paragraphs, secondary text |
| `--accent` | `#FF4433` | Laravel red — buttons, links, highlights, timeline dots |
| `--accent-soft` | `rgba(255,68,51,0.12)` | Accent hover backgrounds, icon chips |
| `--green` | `#3FB950` | Status/success (200 OK, live badges) |
| `--blue` | `#79C0FF` | JSON keys, typing line text |
| `--yellow` | `#FFA657` | JSON booleans/numbers |

**Rule:** ALWAYS use `var(--x)` — never hardcode hex values in new code.

### 3.2 Typography (Google Fonts)

| Role | Font | Usage |
|---|---|---|
| Display | **Sora** (600/700) | h1, h2, h3, card titles |
| Body | **Inter** (400/500/600) | Paragraphs, UI text |
| Mono | **JetBrains Mono** (400/700) | Code, labels, eyebrows, tags, JSON card, logo |

Font links + Font Awesome 6.5.1 (cdnjs) must be in `<head>` of every page.

### 3.3 Layout Tokens

- Container: `width: min(1120px, 92%)` centered — class `.container`
- Section padding: `76px 0` desktop → `52px 0` mobile — class `.section`
- Card radius: `14px` | Button radius: `10px` | Border: `1px solid var(--border)`
- Card hover: `translateY(-4px)` + `border-color: var(--accent)`
- Breakpoints: `900px` (tablet), `640px` (mobile)

### 3.4 Signature Element

Hero has a **JSON API response card** (`GET /api/developer/vinod-suthar → 200 OK`) — this is the brand identity of the site. Keep this concept; API/JSON theming repeats subtly elsewhere (section labels like `// about me`, the case-study `<code>` styling on project-detail.html).

---

## 4. Reusable Components (already in style.css)

| Component | Classes |
|---|---|
| Navbar (sticky, blur) | `.navbar`, `.nav-inner`, `.nav-links`, `.nav-cta`, `.hamburger` |
| Buttons | `.btn` + `.btn-primary` (red) / `.btn-outline` |
| Section header | `.section-head` > `.section-label` (mono, `// label` style) + `h2` + `p` |
| Cards | `.spec-card`, `.project-card` (thumb + body + tags + links), `.contact-card` |
| Tags | `.tag` (mono, pill, bordered) inside `.tag-row` |
| Timeline | `.timeline` > `.t-item` (`.t-date`, `h3`, `.t-org`, `ul`) — red dots, left line |
| Process flow | `.process-flow` > `.process-step` — see §9 |
| JSON card | `.json-card` (`.jk` keys blue, `.js` strings green, `.jb` bool orange, `.jp` punctuation) |
| Contact strip | `.contact-strip` (gradient CTA banner) |
| Save Contact button | `.save-contact-btn` — see §16 |
| Project detail | `.detail-back`, `.detail-title`, `.detail-thumb`, `.case-study`, `.detail-media-grid` — see §14 |
| Footer | `.footer` > `.footer-grid` (3 cols) + `.footer-bottom` |
| Scroll reveal | Add `.reveal` (+ optional `.d1`–`.d5` delays) — JS handles visibility |
| Back to top | `.to-top` button with id `toTop` |

### JS behaviors in main.js (auto-work if IDs/classes present)
- `#hamburger` + `#navLinks` → mobile menu
- `#typeText` → typing effect (roles array)
- `.reveal` → IntersectionObserver fade-up
- `#filterTabs` → fetches `GET /api/project-categories`, appends a `.filter-tab` per category next to the static "All" tab, then wires up `[data-filter-item]` filtering
- `.project-grid` → fetches `GET /api/projects`, renders cards (`data-limit` attribute caps how many, used on index.html's featured section)
- `.experience-timeline` → fetches `GET /api/experience`, renders timeline items (`data-limit` attribute caps how many, used on index.html's preview)
- `#contactForm` → AJAX POST to the Laravel backend (`API_BASE_URL + '/contact'`) with success/error panels
- `#detailWrap` → fetches `GET /api/projects/{slug}` (from `?slug=` in the URL) and renders the project-detail.html page (see §14)
- `#toTop` → back-to-top button

---

## 5. Page Specs

### 5.1 index.html ✅
Navbar → Hero (typing + JSON card + socials) → "How I Build" process flow (§9) → About (photo + bio, Adler Talent Solutions linked to adlertalent.com) → Skills (§15 — expanded tile set) → Specializations (3 cards) → Featured Projects (3 cards, link to project-detail.html) → Experience/Education preview → Contact strip → Footer.

### 5.2 projects.html ✅
Filter tabs — "All" is static, every category tab is fetched live from `GET /api/project-categories` (a new category created in the admin panel shows up here with zero frontend changes) — + full project grid fetched from `GET /api/projects`. Every card's **title and thumbnail link to `project-detail.html?slug=...`** (§14); cards with no public live/code link show a "Details →" action instead of nothing. Card descriptions are CSS line-clamped to 3 lines (`.case-study`/`.project-body p` — full text still shows on the detail page).

### 5.3 project-detail.html ✅
Single reusable template, not one file per project — fetches `GET /api/projects/{slug}` and renders into the page (see §14).

### 5.4 experience.html ✅
Experience column fetches `GET /api/experience` and renders live; Education column is static HTML by explicit design choice (no `education` concept exists in the backend — don't add one without asking, see the project's memory notes on this). "Adler Talent Solutions Pvt. Ltd." renders as a link (via the entry's `organizationUrl` field) wherever an experience entry has one set.

### 5.5 contact.html ✅
Contact cards (phone/WhatsApp with Save Contact button, email ×3, location) + AJAX form posting to `API_BASE_URL + '/contact'` (the Laravel backend) with animated success/error panels. Real emails go out via Gmail SMTP — a thank-you to the submitter, a lead notification to the site owner, both styled to match the site (dark, JSON-card motif). Admin can also reply to a lead from the admin panel; the reply threads into the same email conversation.

### 5.6 privacy-policy.html ✅
Static page using the `.case-study` prose class. Plain-language explanation of what the contact form collects and that it's never sold/shared — linked from every page's footer.

### 5.7 404.html ✅
Static, at the repo root. GitHub Pages auto-serves it for any unmatched URL — no routing config needed, purely by filename convention. Same space/astronaut animation as the backend's Blade 404 view, with the admin login/dashboard buttons swapped for "Back Home"/"Go Back".

---

## 6. Owner Data (single source of truth)

- **Name:** Vinod Suthar · **Brand:** VKDEVELOPER · logo text: `vinod.suthar` (dot in accent red)
- **Roles (typing effect):** Full Stack Developer, Laravel Developer, API & Integration Specialist, Freelance Developer
- **Emails:** vksuthar900@gmail.com · vkdeveloper900@gmail.com · vksuthar900@icloud.com
- **Phone/WhatsApp:** +91 75682 93812
- **Location:** Ahmedabad, Gujarat (current) · Sadri, Pali, Rajasthan — 306702 (home)
- **Company:** Adler Talent Solutions Pvt. Ltd. (Laravel Developer, Aug 2025–Present) — linked to adlertalent.com on the site; **vCard ORG field intentionally says "VK Developer" instead**, per owner's explicit request
- **Resume:** https://drive.google.com/file/d/1jMJ4gY8_PHOWBuebPLd4mOzOtIjykf0Y/view
- **Photo:** `images/about-photo.png` (local, transparent — see §12)
- **Socials:** GitHub `vkdeveloper900` · LinkedIn `vinod-suthar-30b8a1298` · Instagram `vksuthar_` · Telegram `VKSUTHAR900` · WhatsApp wa.me/917568293812
- **Skills tiles:** PHP, Laravel, MySQL, JavaScript, HTML5, CSS3, Bootstrap, Git, GitHub, GitLab, Bitbucket, jQuery/AJAX, VS Code, PhpStorm, Android Studio, Cursor, Claude, Codex, Antigravity, Kiro (see §15)
- **also_worked_with tags:** REST APIs, C, C++, Java, SQL, VB.NET, SweetAlert, XAMPP/MAMP
- **EXCLUDED on purpose (do NOT re-add):** MS Office/Canva skills, Snapchat/Facebook links, stats bar (Projects Built/Integrations Shipped — replaced by the process flow, see §9)

---

## 7. Conventions & Rules

1. **Voice:** Professional but friendly; small personality touches OK (chai ☕, 🚀). No student-era phrasing.
2. **Every page:** same `<head>` (fonts + FA + style.css), same navbar (correct `.active` link), same footer, `<script src="js/main.js">` before `</body>`.
3. **Accessibility:** `aria-label` on icon links, `alt` on images, `prefers-reduced-motion` already handled — keep it.
4. **Performance:** `loading="lazy"` on below-fold images; no heavy libraries; CDN only (Google Fonts, Font Awesome, devicon, Simple Icons).
5. **Links:** external → `target="_blank" rel="noopener"`.
6. **Animations:** use existing `.reveal` system; don't add new animation libraries (no AOS/GSAP).
7. **Copy style:** section labels in mono like `// projects`, `// journey`.

---

## 8. Pending TODO (priority order)

1. **Add real projects via the admin panel** (`admin/projects` on the live backend) and mark them **Live** — the live production DB has zero projects in it as of this writing, so `projects.html`/index.html's featured grid render empty until content is entered. Draft content for the "Vishwakarma Welding" project already exists (case study, meta, tags) from an earlier session — just needs entering.
2. **Export `images/og-image.svg` to `images/og-image.png` (1200×630)** — any SVG-to-PNG converter works. All pages already reference the PNG in `og:image`/`twitter:image`, so social previews (WhatsApp/LinkedIn/Slack) show a broken image until this exists.
3. **No admin password-reset flow** — if the admin login password is ever lost, there's currently no self-service recovery (backend gap, not a frontend one, but tracked here since it blocks live-site maintenance).
4. Delete or ignore the now-dead `js/projects-data.js` and `email-templates/thank-you.html` — both superseded by the live API/backend mail, kept only as historical reference (see §2).

---

## 9. "How I Build" process flow (index.html)

6-step animated connector: Requirement → Flow & Planning → UI/UX Design → Development → Integration & Testing → Delivered. Replaced the old stats bar entirely (Projects Built/Integrations Shipped/etc. — don't re-add it).

- Desktop (≥900px): horizontal row of icon nodes connected by a line that draws in (red, over gray) on scroll. The line math relies on all 6 `.process-step` being equal-width flex children with no gap — first icon center sits at exactly 8.333% of the row width, last at 91.667%. **If the step count ever changes from 6, recalculate these percentages** (formula: first-center = 50%/n, last-center = 100% − 50%/n).
- Mobile (<900px): flips to a vertical stepper (`padding-left:66px`, icons `position:absolute; left:-66px`, connector line at `left:26px`).
- Each step fades up individually via `reveal d1`…`d5`.

## 10. Branding & SEO (done)

- Favicon: `images/vk-logo.jpg` (VK monogram), wired as `<link rel="icon">` + `apple-touch-icon` on all pages.
- `theme-color` (`#0E1116`) + `msapplication-TileColor` on all pages — tints mobile browser chrome where supported.
- `robots`/`author` meta, `canonical` links, `og:url`, JSON-LD (`Person` on index.html, `BreadcrumbList` elsewhere), `robots.txt` + `sitemap.xml` — all assume domain `vkdeveloper900.github.io`.
- **Honest note on SEO speed:** on-page SEO (done here) helps a site get indexed *correctly*, but ranking also depends on domain age, backlinks, and keyword competition — none of which a code change can fix quickly. Don't oversell "top 10 in N days" claims based on this work alone.

## 11. Hotlinked images fixed (owner's old portfolio repo got renamed)

The original About photo and 4 project thumbnails were hotlinked to `https://vkdeveloper900.github.io/Portfolio/...`, which 404'd after that repo got renamed to `Portfolioold2021vinod`. All 5 are now local files instead of hotlinks — don't re-introduce hotlinks to any external repo for site assets.

## 12. About Me photo — must stay a transparent PNG, not JPG

`images/about-photo.png` is a **real transparent PNG** (verified alpha=0 at the corners) — the `.about-photo` box's `background: var(--bg)` shows through around the person instead of a white box. **JPG cannot store transparency at all** — an earlier pass used a JPG export of a "background removed" photo and it silently got flattened to solid white on save, which is why there was a visible white box bug before this fix. If this photo is ever replaced, get a PNG (or WebP) with a real alpha channel, not a JPG — check corner-pixel alpha before trusting a "background removed" file's format claim.

## 13. Contact form emails — now sent by the Laravel backend, not this repo

`email-templates/thank-you.html` (this repo) is **legacy** — it was the original design reference, but no longer sends anything. The real thank-you email, the lead-notification email, and the admin-reply email are now Blade mail views living in `Portfolio_Backend_Laravel` (`resources/views/emails/*.blade.php`), sent via real Gmail SMTP when `POST /api/contact` is hit. All three keep the same email-safe HTML approach (table-based, inlined styles, websafe fonts) and the same dark/JSON-card branding as this file originally established.

## 14. Project detail pages (project-detail.html)

One reusable template instead of one file per project. `js/projects-data.js` is now **dead code** (see §2, §8) — `main.js` instead reads `?slug=` from the URL and fetches `GET /api/projects/{slug}` from the live backend, rendering the response (title, description, tags, links, thumbnail, case-study HTML from `detailContent`, media gallery). Shows a "Project not found" state if the fetch 404s. `projects.html` links every card's title + thumbnail to `project-detail.html?slug=...`.

The API response shape still mirrors what `js/projects-data.js` used to hardcode (`slug`, `title`, `category`, `description`, `tags`, `thumbnail`, `liveUrl`, `codeUrl`, `linkNote`, `detailContent`, `media[]`) — that was intentional groundwork from before the API existed, and it paid off: switching the data source required no changes to the rendering logic.

## 15. Skills grid — expanded, including AI tools with no icon library entry

Added GitLab, Bitbucket, Android Studio, Cursor, Claude, Codex, Antigravity, Kiro. Icon sourcing notes:
- GitLab/Bitbucket/Android Studio: devicon, full color, no `.invert` needed.
- Cursor/Claude/Codex: Simple Icons — these are **monochrome black SVGs with no explicit fill**, so they need the `.invert` class (same treatment as the existing GitHub tile) or they're invisible on the dark background.
- **Antigravity and Kiro have no entry in devicon or Simple Icons** (checked directly, both 404) — too new/niche. Real logos were pulled directly from the products' own sites instead: `kiro.dev`'s `/icon.svg` (their actual brand SVG) and `antigravity.google`'s `favicon.ico` (decoded from gzip, converted to PNG — only 48×48 available, that's the largest they publish). These are genuine brand assets, not placeholders — if a monogram/letter badge ever needs to come back for some other unreleased tool, that pattern still exists in git history (`.skill-monogram`, now removed since these two got real icons).

## 16. Save Contact (vCard) button

`vinod-suthar.vcf` at the project root — a real vCard (VCF 3.0) with name, org (**"VK Developer"**, not Adler — deliberate), title, phone, both emails, address, and an embedded base64 photo (`images/vcard-photo.jpg`, a small square crop, decoded/verified byte-for-byte against the source before committing). Long lines (the base64 photo) are properly folded per RFC 2426 (75-char lines, continuation lines start with a single space) — don't reformat this file by hand or a strict vCard parser may reject it.

The "Save Contact" button lives on the Phone/WhatsApp card on `contact.html` (`.save-contact-btn`) — floats on the right side on desktop, stacks full-width below the card content on mobile (`max-width: 640px`). It's a plain `<a download>` link, no JS needed for the download itself.

To regenerate the vCard after a data change, see the Node script pattern used to build it (reads the photo file, base64-encodes, folds the PHOTO line, writes the `.vcf` — not committed to the repo, rebuild inline if needed).

---

All 7 pages (`index.html`, `projects.html`, `project-detail.html`, `experience.html`, `contact.html`, `privacy-policy.html`, `404.html`) are built, cross-linked, wired to the live Laravel backend, and live at https://vkdeveloper900.github.io/Portfolio/. Backend is live at https://vinodsuthar.alwaysdata.net.
