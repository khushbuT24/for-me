import { useSyncExternalStore } from 'react';

export type StylePreferences = {
  styleTags: string[];
  colors: string[];
  brands: string[];
};

const STORAGE_KEY = 'forme-style-preferences';
const subscribers = new Set<() => void>();

export function emptyStylePreferences(): StylePreferences {
  return { styleTags: [], colors: [], brands: [] };
}

export function loadStylePreferences(): StylePreferences {
  try {
    const stored = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyStylePreferences();
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return emptyStylePreferences();
    }

    const values = parsed as Record<string, unknown>;
    const strings = (value: unknown) => Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string')
      : [];
    return {
      styleTags: strings(values.styleTags),
      colors: strings(values.colors),
      brands: strings(values.brands),
    };
  } catch {
    return emptyStylePreferences();
  }
}

export function saveStylePreferences(preferences: StylePreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  subscribers.forEach(subscriber => subscriber());
}

function subscribeToStylePreferences(subscriber: () => void) {
  subscribers.add(subscriber);
  window.addEventListener('storage', subscriber);
  return () => {
    subscribers.delete(subscriber);
    window.removeEventListener('storage', subscriber);
  };
}

function getStylePreferencesSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? '';
}

export function useSavedStylePreferences() {
  const stored = useSyncExternalStore(
    subscribeToStylePreferences,
    getStylePreferencesSnapshot,
    () => '',
  );

  try {
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return emptyStylePreferences();
    }
    const values = parsed as Record<string, unknown>;
    const strings = (value: unknown) => Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string')
      : [];
    return {
      styleTags: strings(values.styleTags),
      colors: strings(values.colors),
      brands: strings(values.brands),
    };
  } catch {
    return emptyStylePreferences();
  }
}

export function addStylePreferencesToMessage(
  message: string,
  preferences: StylePreferences,
) {
  const details = [
    preferences.styleTags.length && `Style directions: ${preferences.styleTags.join(', ')}`,
    preferences.colors.length && `Preferred colors: ${preferences.colors.join(', ')}`,
    preferences.brands.length && `Preferred brands: ${preferences.brands.join(', ')}`,
  ].filter((detail): detail is string => Boolean(detail));

  if (!details.length) return message;
  return `Saved style preferences (use as guidance):\n${details.map(detail => `- ${detail}`).join('\n')}\n\nUser request: ${message}`;
}