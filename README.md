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
- **Hosting:** GitHub Pages (static only — no backend/PHP possible)
- **Old portfolio (reference/data source):** https://vkdeveloper900.github.io/Portfolio/

---

## 2. File Structure

```
develoeprvk/
├── index.html          ✅ DONE (Home — all sections built)
├── projects.html       ✅ DONE (filter tabs + 7 project cards)
├── experience.html     ✅ DONE (full timeline + education + specializations recap)
├── contact.html        ✅ DONE (info cards + Formspree form — needs real FORM_ID)
├── css/
│   └── style.css       ✅ DONE (single shared stylesheet — ALL pages use this; added .page-hero, .filter-tabs)
├── js/
│   └── main.js         ✅ DONE (shared JS — nav, typing, reveal, counters, filter tabs, to-top)
├── images/
│   ├── vk-logo.jpg      ✅ Owner's VK monogram logo — used as favicon + apple-touch-icon on all pages
│   └── og-image.svg     (social-share image source — still needs PNG export, see TODO)
├── robots.txt           ✅ DONE
└── sitemap.xml          ✅ DONE (uses vkdeveloper900.github.io — update if deployed elsewhere)
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
| `--green` | `#3FB950` | Status/success (200 OK, online dot, available badge) |
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

Hero has a **JSON API response card** (`GET /api/developer/vinod-suthar → 200 OK`) — this is the brand identity of the site. Keep this concept; API/JSON theming may repeat subtly (e.g. section labels like `// about me`, `also_worked_with:` in mono font).

---

## 4. Reusable Components (already in style.css)

| Component | Classes |
|---|---|
| Navbar (sticky, blur) | `.navbar`, `.nav-inner`, `.nav-links`, `.nav-cta`, `.hamburger` |
| Buttons | `.btn` + `.btn-primary` (red) / `.btn-outline` |
| Section header | `.section-head` > `.section-label` (mono, `// label` style) + `h2` + `p` |
| Cards | `.spec-card` (icon cards), `.project-card` (thumb + body + tags + links) |
| Tags | `.tag` (mono, pill, bordered) inside `.tag-row` |
| Timeline | `.timeline` > `.t-item` (`.t-date`, `h3`, `.t-org`, `ul`) — red dots, left line |
| Stats | `.stats-bar` > `.stat` (`.num[data-count]` auto-animates, `.lbl`) |
| JSON card | `.json-card` (`.jk` keys blue, `.js` strings green, `.jb` bool orange, `.jp` punctuation) |
| Contact strip | `.contact-strip` (gradient CTA banner) |
| Footer | `.footer` > `.footer-grid` (3 cols: brand+socials / quick links / contact info) + `.footer-bottom` |
| Social icon buttons | `.hero-socials a` / `.footer-socials a` with Font Awesome `<i>` |
| Scroll reveal | Add `.reveal` (+ optional `.d1`/`.d2`/`.d3` delays) — JS handles visibility |
| Back to top | `.to-top` button with id `toTop` |

### JS behaviors in main.js (auto-work if IDs/classes present)
- `#hamburger` + `#navLinks` → mobile menu
- `#typeText` → typing effect (roles array)
- `.reveal` → IntersectionObserver fade-up
- `.num[data-count]` → animated counters
- `#toTop` → back-to-top button

---

## 5. Page Specs

### 5.1 index.html ✅ DONE
Sections in order: Navbar → Hero (typing + JSON card + socials + floating icons) → "How I Build" process flow (6-step animated connector, see §9 — replaced the old stats bar) → About (photo + bio + info grid + animated SVG cartoon developer) → Skills (devicon tiles + also_worked_with tags) → Specializations (3 cards) → Featured Projects (3 cards) → Experience & Education preview (two-col timelines) → Contact strip → Footer → to-top button.

### 5.2 projects.html ✅ DONE
- Same navbar (active = Projects) + footer as index
- Page hero: small header (`// portfolio`, "Projects Made", subtitle)
- Optional filter tabs: All / Laravel / Frontend (vanilla JS, `data-filter` attributes)
- Project grid using `.project-card`. Projects list:

| Project | Description | Tags | Links |
|---|---|---|---|
| Inventory Management System | Stock & product mgmt, GST invoices, roles/permissions, AJAX | Laravel, MySQL, AJAX | Live: https://business.adoisstudio.com/admin/login |
| HRMS Platform (Adler) | HR system: roles/permissions, REST APIs, Outlook meeting automation | Laravel, REST API, MS 365 | client work — no public link |
| Billing System | Electronic shop: inventory, invoice printing, sales reports | Laravel, MySQL, Bootstrap | LinkedIn demo post |
| Snap Spirit / Photographer Studio | Studio showcase site, gallery CMS | Laravel, Bootstrap | LinkedIn demo post |
| Paper Selling Website | Exam-paper platform, categories, search, admin | HTML, CSS, JS, PHP | Live: https://vkdeveloper900.github.io/Paper-Selling-Website/ · Code: github.com/vkdeveloper900/Paper-Selling-Website |
| VW (Vishwakarma Welding) | Responsive business site | HTML, Bootstrap | Live: https://vkdeveloper900.github.io/Vishwakarma-Welding/ · Code: github.com/vkdeveloper900/Vishwakarma-Welding |
| SweetAlert Showcase | Interactive alert demos | JS, SweetAlert | Live: https://vkdeveloper900.github.io/sweetalert-showcase/ |

- Thumbnails: old site images can be hotlinked temporarily from `https://vkdeveloper900.github.io/Portfolio/images/projects/` (e.g. `vw.png`, `sweet.png`, `paperselling.png`, `Home.png`, `billing%20web.png`) — replace with local `images/` later
- EXCLUDE tiny old projects: contact page, about page, location page, dummy university, duplicate portfolios

### 5.3 experience.html ✅ DONE
- Full `.timeline` — Work: Adler Talent Solutions (Laravel Developer, Aug 2025–Present, Ahmedabad: HRMS, REST APIs, roles/permissions, MySQL optimization, integrations) → ADOIS Games (Apprenticeship, Oct 2024–Jul 2025: Laravel apps, REST APIs, auth modules, query optimization) → Early roles 2022 (Computer Operator — Gov. Municipal Board; Surveyor — Oasis Softapp; Data Entry — MS Excel)
- Education timeline: BCA — SPU College Falna, JNV University Jodhpur (2021–24) → Sr. Secondary Science Agriculture — DMB Govt School Sadri, RBSE (2019–21) → Secondary — Saraswati Vidya Mandir, Sadri, RBSE (2006–19)
- Optional: specializations recap cards

### 5.4 contact.html ✅ DONE (form action still points to placeholder FORM_ID)
- Email card lists 3 addresses: vksuthar900@gmail.com, vkdeveloper900@gmail.com, vksuthar900@icloud.com
- Form submits via AJAX (fetch, not a hard page navigation) with an animated success panel (circle+checkmark draw) and an animated error panel (shake-in), both with a reset button back to the form
- Contact info cards: phone/WhatsApp, email, location (use Font Awesome icons)
- Contact form → **Formspree** (`https://formspree.io/f/FORM_ID` — owner must create free account & replace FORM_ID). Fields: name, email, message. Style inputs dark: `--surface` bg, `--border`, focus `--accent`
- All social links + "Keep Rising 🚀" line

---

## 6. Owner Data (single source of truth)

- **Name:** Vinod Suthar · **Brand:** VKDEVELOPER · logo text: `vinod.suthar` (dot in accent red)
- **Roles (typing effect):** Full Stack Developer, Laravel Developer, API & Integration Specialist, Freelance Developer
- **Email:** vksuthar900@gmail.com · **Phone/WhatsApp:** +91 75682 93812
- **Location:** Ahmedabad, Gujarat (current) · Sadri, Pali, Rajasthan — 306702 (home)
- **Company:** Adler Talent Solutions Pvt. Ltd. (Laravel Developer, Aug 2025–Present)
- **Resume:** https://drive.google.com/file/d/1jMJ4gY8_PHOWBuebPLd4mOzOtIjykf0Y/view
- **Photo:** https://vkdeveloper900.github.io/Portfolio/images/vk2.JPG (replace with local later)
- **Socials:** GitHub `vkdeveloper900` · LinkedIn `vinod-suthar-30b8a1298` · Instagram `vksuthar_` · Telegram `VKSUTHAR900` · WhatsApp wa.me/917568293812
- **Skills (devicon tiles):** PHP, Laravel, MySQL, JavaScript, HTML5, CSS3, Bootstrap, Git, GitHub, jQuery/AJAX, VS Code, PhpStorm
- **also_worked_with tags:** REST APIs, C, C++, Java, SQL, VB.NET, SweetAlert, XAMPP/MAMP
- **Stats:** 15+ Projects · 6+ Integrations · 2 Companies · ∞ Cups of Chai ☕
- **EXCLUDED on purpose (do NOT re-add):** MS Word/Excel/PowerPoint/Keynote/Canva skills, Snapchat/Facebook links, "E-invitation card/video" services line

---

## 7. Conventions & Rules

1. **Voice:** Professional but friendly; small personality touches OK (chai ☕, 🚀). No student-era phrasing.
2. **Every page:** same `<head>` (fonts + FA + style.css), same navbar (correct `.active` link), same footer, `<script src="js/main.js">` before `</body>`.
3. **Accessibility:** `aria-label` on icon links, `alt` on images, `prefers-reduced-motion` already handled — keep it.
4. **Performance:** `loading="lazy"` on below-fold images; no heavy libraries; CDN only (Google Fonts, Font Awesome, devicon).
5. **Links:** external → `target="_blank" rel="noopener"`.
6. **Animations:** use existing `.reveal` system; don't add new animation libraries (no AOS/GSAP).
7. **Copy style:** section labels in mono like `// projects`, `// journey`.

## 8. Pending TODO (priority order)

1. Create a free Formspree account and replace `FORM_ID` in `contact.html`'s form `action` — form won't actually send until this is done
2. **Export `images/og-image.svg` to `images/og-image.png` (1200×630)** — any SVG-to-PNG tool/converter works. All 4 pages already reference `images/og-image.png` in their `og:image`/`twitter:image` meta tags, so social previews (WhatsApp/Twitter/LinkedIn/Slack) will show a broken image until this PNG exists — most platforms don't render SVG for link previews.
3. ~~Local screenshots into `images/` + replace hotlinked project thumbs & about photo~~ ✅ DONE — see §12
4. Deploy: push to GitHub repo → GitHub Pages (suggest repo name `vkdeveloper900.github.io` for clean root URL)

## 9. Stats section → replaced with "How I Build" process flow

The stats bar (Projects Built / Integrations Shipped / Companies Worked / Cups of Chai) was removed entirely per owner request — replaced with a 6-step animated process flow (`.process-flow`) on `index.html`: Requirement → Flow & Planning → UI/UX Design → Development → Integration & Testing → Delivered.

- Desktop (≥900px): horizontal row of icon nodes connected by a line that draws in (red, over gray) when scrolled into view. The line math relies on all 6 `.process-step` being equal-width flex children with no gap — first icon center sits at exactly 8.333% of the row width, last at 91.667%, so the connector's `left`/`width` are hardcoded to those percentages. **If the step count ever changes from 6, these percentages must be recalculated** (formula: first-center = 50%/n, last-center = 100% − 50%/n).
- Mobile (<900px): flips to a vertical stepper — `.process-flow` gets `padding-left:66px`, icons become `position:absolute; left:-66px` per step, and the connector line becomes a vertical bar at `left:26px` (half the 52px icon width) spanning down instead of across.
- Each step also fades up individually via `reveal d1`…`d5` (added `.reveal.d4`/`.reveal.d5` to the shared reveal system — previously only went up to `d3`).
- Removed the now-dead `.stats-bar`/`.stat`/counter CSS and the "Animated counters" `IntersectionObserver` block in `main.js` (`.num[data-count]` no longer exists anywhere) — don't reintroduce without checking nothing else references it.

## 10. Branding assets (done)

- **Favicon:** now the owner's real `images/vk-logo.jpg` (VK monogram), wired into all 4 pages as both `<link rel="icon">` and `<link rel="apple-touch-icon">`. Replaced the earlier placeholder `favicon.svg` (deleted — no longer referenced anywhere).
- **Browser theme color:** `<meta name="theme-color" content="#0E1116">` + `msapplication-TileColor` added to all 4 pages, matching `--bg`. Chrome/Edge on Android and Safari on iOS will tint the address bar / status bar to match on browsers that support it — no visual effect on desktop browsers, that's expected, not a bug.
- `images/og-image.svg` — 1200×630 social-share card (name, role, tag pills, signature `</>` mark). Source is done; still needs the PNG export (see TODO #2 above).
- Open Graph + Twitter Card meta tags added to every page's `<head>` (page-specific `og:title`/`og:description`, shared `og:image`).

## 11. SEO (on-page work done — see honest caveat below)

Added to all 4 pages:
- `<meta name="robots" content="index, follow">`, `<meta name="author">`
- `<link rel="canonical">` pointing at `https://vkdeveloper900.github.io/...` (matches the deploy plan in §8 TODO #4 — **must be updated if you deploy under a different domain/repo name**, otherwise canonical tags will point at a URL that doesn't exist)
- `og:url` matching the canonical
- JSON-LD structured data: full `Person` schema on `index.html` (name, job title, employer, education, skills, social profiles); `BreadcrumbList` schema on the other 3 pages

Also added at project root: `robots.txt` (allows all crawlers, points to sitemap) and `sitemap.xml` (all 4 pages, same domain caveat as canonical tags above).

**Honest caveat on "top 10 in 1-2 days":** this isn't something on-page SEO can deliver, for reasons that have nothing to do with how well the HTML is marked up:
- The site isn't deployed yet — Google can't rank a page it can't crawl. Indexing a brand-new site after deploy typically takes days to weeks, not hours.
- Ranking also depends heavily on domain age, backlinks, and how competitive the target keywords are — a portfolio with zero backlinks and a same-day-old domain is very unlikely to outrank established Laravel-developer profiles/agencies for competitive terms in 1-2 days, no matter how clean the markup is.
- What's done here (structured data, meta tags, sitemap, canonical, fast static loading, mobile-responsive, semantic headings) is the legitimate groundwork that helps a site get indexed correctly and rank *over time* — it's necessary, not sufficient, and not fast.

If the goal is fast visibility, the more realistic levers are: deploy soon so indexing clock starts, submit the sitemap in Google Search Console (triggers faster crawl than waiting passively), and share the live link on LinkedIn/GitHub/socials for early backlinks/traffic — none of which a code change can substitute for.

## 12. Hotlinked images fixed (owner's old portfolio repo got renamed)

The About Me photo and 4 project thumbnails were hotlinked to `https://vkdeveloper900.github.io/Portfolio/...`, which started 404ing because that repo got renamed to `Portfolioold2021vinod`. Rather than re-hotlink to the renamed repo (which could break again on any future rename/deletion), all 5 images were downloaded and now live locally:

- `images/about-photo.jpg` — the About Me photo. **Had a real bug on the first pass**: the source JPEG carries EXIF orientation tag 8 (rotate 270° CW), and the initial resize (via .NET `System.Drawing`) copied pixels without applying that correction, so the saved file came out sideways. Fixed by calling `$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)` before resizing — final file is a correctly-oriented 900×1350 portrait. If this image is ever regenerated from a camera-original source, re-check EXIF orientation (tag ID 274) before resizing; don't assume `System.Drawing.Image.FromFile` bakes in EXIF rotation automatically — it doesn't.
- `images/projects/{billing-web,paperselling,vw,sweet}.jpg` — project thumbnails, converted from PNG (originals were 3.5–7.2MB screenshots at ~3584px wide) down to ~900px-wide JPEGs at 27–60KB each. No EXIF issue on these (screenshots, not camera photos).
- All `<img>` tags in `index.html` and `projects.html` updated from the dead hotlinked URLs to these local paths. The Person JSON-LD `image` field also updated to point at `about-photo.jpg` instead of the logo.
- The 3 standalone "Live" project links (Paper-Selling-Website, Vishwakarma-Welding, sweetalert-showcase) are separate repos and still resolve fine (checked via HTTP status) — only the `Portfolio` repo's assets were affected by the rename.

All four pages (`index.html`, `projects.html`, `experience.html`, `contact.html`) are now built and cross-linked.
