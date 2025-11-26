
'use client';

import { useEffect } from 'react';

export const THEME_STORAGE_KEY = 'vibeflow-color-theme';
// 'theme-default' is represented by the absence of other theme classes
const THEME_CLASSES = ['theme-serene-sky', 'theme-forest-whisper', 'theme-midnight-bloom']; // Added new theme

export function applyTheme(themeName: string | null) {
  const docElement = document.documentElement;
  
  // Remove any existing custom theme classes
  THEME_CLASSES.forEach(cls => {
    docElement.classList.remove(cls);
  });

  // Add the new theme class if it's not the default
  if (themeName && themeName !== 'theme-default') {
    docElement.classList.add(themeName);
  }
  // If themeName is 'theme-default' or null, all specific theme classes are removed,
  // relying on the base :root styles in globals.css.
}

export function ThemeApplicator() {
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
      applyTheme(storedTheme);
    } else {
      applyTheme('theme-serene-sky'); // Apply 'theme-serene-sky' as default if nothing is stored
    }

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        applyTheme(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return null; // This component does not render any UI
}

