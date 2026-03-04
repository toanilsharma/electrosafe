import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const useDarkMode = () => {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('electrosafe_dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('electrosafe_dark', String(dark));
  }, [dark]);

  return { dark, setDark };
};

interface Props {
  dark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<Props> = ({ dark, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    style={{ background: dark ? '#3b82f6' : '#d1d5db' }}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-gray-900 dark:bg-gray-900 shadow flex items-center justify-center transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-0'}`}
    >
      {dark ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
    </span>
  </button>
);
