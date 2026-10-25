const STORAGE_KEYS = {
  USERS: 'hostelhub_users',
  SESSION: 'hostelhub_session',
  COMPLAINTS: 'hostelhub_complaints',
  ANNOUNCEMENTS: 'hostelhub_announcements',
  MAINTENANCE: 'hostelhub_maintenance',
  THEME: 'hostelhub_theme',
};

function getStorageKey(key) {
  return key;
}

export function getStoredData(key) {
  return new Promise((resolve) => {
    try {
      const data = localStorage.getItem(getStorageKey(key));
      resolve(data ? JSON.parse(data) : null);
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      resolve(null);
    }
  });
}

export function setStoredData(key, value) {
  return new Promise((resolve) => {
    try {
      localStorage.setItem(getStorageKey(key), JSON.stringify(value));
      resolve(true);
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      resolve(false);
    }
  });
}

export function removeStoredData(key) {
  return new Promise((resolve) => {
    try {
      localStorage.removeItem(getStorageKey(key));
      resolve(true);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      resolve(false);
    }
  });
}

export async function getUsers() {
  const users = await getStoredData(STORAGE_KEYS.USERS);
  return users || [];
}

export async function saveUsers(users) {
  return setStoredData(STORAGE_KEYS.USERS, users);
}

export async function getSession() {
  return getStoredData(STORAGE_KEYS.SESSION);
}

export async function setSession(session) {
  return setStoredData(STORAGE_KEYS.SESSION, session);
}

export async function clearSession() {
  return removeStoredData(STORAGE_KEYS.SESSION);
}

export async function getComplaints() {
  const complaints = await getStoredData(STORAGE_KEYS.COMPLAINTS);
  return complaints || [];
}

export async function saveComplaints(complaints) {
  return setStoredData(STORAGE_KEYS.COMPLAINTS, complaints);
}

export async function getAnnouncements() {
  const announcements = await getStoredData(STORAGE_KEYS.ANNOUNCEMENTS);
  return announcements || [];
}

export async function saveAnnouncements(announcements) {
  return setStoredData(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
}

export async function getMaintenance() {
  const maintenance = await getStoredData(STORAGE_KEYS.MAINTENANCE);
  return maintenance || [];
}

export async function saveMaintenance(maintenance) {
  return setStoredData(STORAGE_KEYS.MAINTENANCE, maintenance);
}

export async function getTheme() {
  const theme = await getStoredData(STORAGE_KEYS.THEME);
  return theme || 'light';
}

export async function setTheme(theme) {
  return setStoredData(STORAGE_KEYS.THEME, theme);
}

export function generateId(prefix = 'HC') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date = new Date()) {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusLabel(status) {
  const labels = {
    new: 'New',
    pending: 'Pending',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected',
    closed: 'Closed',
  };
  return labels[status] || status;
}

export function getPriorityLabel(priority) {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };
  return labels[priority] || priority;
}