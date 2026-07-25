// ============================
// API CONFIG
// ============================
// Switches automatically between local backend and production based on hostname.
// Update PRODUCTION_API_BASE once the backend is deployed publicly.
const PRODUCTION_API_BASE = 'https://api.vinodsuthar.com/api';
const LOCAL_API_BASE = 'http://127.0.0.1:8000/api';

const isLocalHost = ['localhost', '127.0.0.1'].includes(location.hostname);
const API_BASE_URL = isLocalHost ? LOCAL_API_BASE : PRODUCTION_API_BASE;
