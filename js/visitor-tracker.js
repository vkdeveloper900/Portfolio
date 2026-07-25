// ============================
// VISITOR TRACKER (admin-only monthly stats)
// ============================
// Generates a persistent anonymous ID in localStorage (no server session,
// since the frontend and API live on different domains) and logs one visit
// per page per month. Fire-and-forget: never blocks or alters the page.
(function () {
  const page = document.body.dataset.page;
  if (!page) return;

  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);
  }

  fetch(`${API_BASE_URL}/visitor-log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page: page, visitor_id: visitorId }),
  }).catch(function () {});
})();
