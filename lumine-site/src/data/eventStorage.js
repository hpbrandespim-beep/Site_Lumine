const EVENT_STORAGE_KEY = 'lumine-custom-events-v1';
const HIDDEN_EVENT_STORAGE_KEY = 'lumine-hidden-base-events-v1';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function loadCustomEvents() {
  if (!canUseStorage()) return [];

  try {
    const saved = window.localStorage.getItem(EVENT_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomEvents(events) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
}

export function loadHiddenEventIds() {
  if (!canUseStorage()) return [];

  try {
    const saved = window.localStorage.getItem(HIDDEN_EVENT_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHiddenEventIds(eventIds) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(HIDDEN_EVENT_STORAGE_KEY, JSON.stringify(eventIds));
}

export function createEventId() {
  return `evento-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}
