// ============================================
// PROJECT DATA — single source of truth for the
// projects listing (projects.html) and the detail
// page (project-detail.html).
//
// Structure mirrors the admin backend's Project model
// (title, description, detail_content, tags, thumbnail,
// live_url, code_url, link_note, media[]) so this can be
// swapped for a real API call later without changing the
// rendering code, only where the data comes from.
// ============================================

const PROJECTS = [
  {
    slug: 'inventory-management-system',
    title: 'Inventory Management System',
    category: 'laravel',
    description: 'Stock & product management with GST invoice generation, role-permission control and AJAX-based operations.',
    tags: ['Laravel', 'MySQL', 'AJAX'],
    thumbnail: null,
    liveUrl: 'https://business.adoisstudio.com/admin/login',
    codeUrl: null,
    linkNote: null,
    detailContent: `
      <h3>The Challenge</h3>
      <p>A retail/electronics business needed a way to track stock levels across products, generate GST-compliant invoices at the point of sale, and stop relying on manual spreadsheets that different staff members were editing at the same time.</p>
      <h3>The Approach</h3>
      <p>Built a Laravel application with role-permission control so admins and staff see only what's relevant to their job — stock managers manage inventory, billing staff generate invoices. Product and stock operations run through AJAX so quantities update instantly without a full page reload, which matters a lot when someone's mid-checkout.</p>
      <p>GST invoice generation handles tax breakdown automatically based on product category, producing print-ready invoices directly from the order screen.</p>
      <h3>Tech Stack</h3>
      <p>Laravel, MySQL, AJAX, Bootstrap.</p>
    `,
    media: [],
  },
  {
    slug: 'hrms-platform',
    title: 'HRMS Platform',
    category: 'laravel',
    description: 'HR management system with role & permission management, REST APIs and Outlook Calendar meeting automation.',
    tags: ['Laravel', 'REST API', 'MS 365'],
    thumbnail: null,
    liveUrl: null,
    codeUrl: null,
    linkNote: 'Client project — private',
    detailContent: `
      <h3>The Challenge</h3>
      <p>An HR team needed a central system for managing employee roles and permissions, plus a way to schedule and track meetings without switching between the HR tool and Outlook all day.</p>
      <h3>The Approach</h3>
      <p>Built on Laravel with a granular role-permission system so access can be scoped per department or seniority level. REST APIs expose HR data to the frontend and to other internal tools that need it. Microsoft 365 integration (via the Microsoft Graph API) automates meeting scheduling directly against each employee's Outlook Calendar, so interview slots and reviews land on people's real calendars automatically instead of being coordinated manually.</p>
      <h3>Tech Stack</h3>
      <p>Laravel, REST APIs, Microsoft 365 / Microsoft Graph API, MySQL.</p>
      <p><em>This is a client project under a private company account — no public demo or repository is available.</em></p>
    `,
    media: [],
  },
  {
    slug: 'billing-system',
    title: 'Billing System',
    category: 'laravel',
    description: 'Laravel-based system for electronic shops — inventory tracking, invoice printing and sales reports.',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    thumbnail: 'images/projects/billing-web.jpg',
    liveUrl: null,
    codeUrl: null,
    linkNote: 'Demo shared on LinkedIn',
    detailContent: `
      <h3>The Challenge</h3>
      <p>An electronics shop needed one system to handle inventory tracking, printed invoices for walk-in customers, and sales reporting the owner could actually read at the end of the day.</p>
      <h3>The Approach</h3>
      <p>A Laravel app centered on three things: keeping stock counts accurate as sales happen, generating clean printable invoices at checkout, and rolling daily/monthly sales into simple reports so the owner can see what's moving without digging through raw transaction logs.</p>
      <h3>Tech Stack</h3>
      <p>Laravel, MySQL, Bootstrap.</p>
    `,
    media: [],
  },
  {
    slug: 'snap-spirit-photographer-studio',
    title: 'Snap Spirit — Photographer Studio',
    category: 'laravel',
    description: 'Studio showcase site with a gallery CMS for a professional photography business.',
    tags: ['Laravel', 'Bootstrap'],
    thumbnail: null,
    liveUrl: null,
    codeUrl: null,
    linkNote: 'Demo shared on LinkedIn',
    detailContent: `
      <h3>The Challenge</h3>
      <p>A photography studio wanted a portfolio-style website to showcase their work, but didn't want to depend on a developer every time they had a new shoot to add to the gallery.</p>
      <h3>The Approach</h3>
      <p>Built a lightweight Laravel CMS behind the public showcase site — the studio owner can upload, organize and remove gallery photos themselves through a simple admin panel, while visitors see a clean, fast-loading showcase on the public side.</p>
      <h3>Tech Stack</h3>
      <p>Laravel, Bootstrap.</p>
    `,
    media: [],
  },
  {
    slug: 'paper-selling-website',
    title: 'Paper Selling Website',
    category: 'frontend',
    description: 'Exam-paper platform with categories, search and an admin panel.',
    tags: ['HTML', 'CSS', 'JS', 'PHP'],
    thumbnail: 'images/projects/paperselling.jpg',
    liveUrl: 'https://vkdeveloper900.github.io/Paper-Selling-Website/',
    codeUrl: 'https://github.com/vkdeveloper900/Paper-Selling-Website',
    linkNote: null,
    detailContent: `
      <h3>The Challenge</h3>
      <p>Students needed an easy way to browse and buy previous exam papers organized by subject and category, instead of hunting through scattered PDFs.</p>
      <h3>The Approach</h3>
      <p>A PHP-backed catalog with category browsing and search, so a student can find the right paper in a couple of clicks. An admin panel lets papers be added, categorized and taken down without touching code.</p>
      <h3>Tech Stack</h3>
      <p>HTML, CSS, JavaScript, PHP.</p>
    `,
    media: [],
  },
  {
    slug: 'vw-vishwakarma-welding',
    title: 'VW — Vishwakarma Welding',
    category: 'frontend',
    description: 'Responsive business website for a welding services company.',
    tags: ['HTML', 'Bootstrap'],
    thumbnail: 'images/projects/vw.jpg',
    liveUrl: 'https://vkdeveloper900.github.io/Vishwakarma-Welding/',
    codeUrl: 'https://github.com/vkdeveloper900/Vishwakarma-Welding',
    linkNote: null,
    detailContent: `
      <h3>The Challenge</h3>
      <p>A welding services business had no web presence at all — no way for potential customers to find their services, contact details or work examples online.</p>
      <h3>The Approach</h3>
      <p>A clean, responsive marketing site covering services, business details and contact information, built to load fast and work well on the phone-first traffic a local service business actually gets.</p>
      <h3>Tech Stack</h3>
      <p>HTML, Bootstrap.</p>
    `,
    media: [],
  },
  {
    slug: 'sweetalert-showcase',
    title: 'SweetAlert Showcase',
    category: 'frontend',
    description: 'Interactive alert & modal demos built with SweetAlert.',
    tags: ['JS', 'SweetAlert'],
    thumbnail: 'images/projects/sweet.jpg',
    liveUrl: 'https://vkdeveloper900.github.io/sweetalert-showcase/',
    codeUrl: null,
    linkNote: null,
    detailContent: `
      <h3>About This Project</h3>
      <p>A reference/demo project exploring what's possible with SweetAlert — success/error/warning modals, confirmation dialogs, and custom-styled alerts — built as a quick showcase for client projects that need better UX than the browser's default <code>alert()</code>/<code>confirm()</code> popups.</p>
      <h3>Tech Stack</h3>
      <p>JavaScript, SweetAlert.</p>
    `,
    media: [],
  },
];
