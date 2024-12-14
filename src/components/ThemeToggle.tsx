import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-3 bg-violet-500 neu-border rounded-lg hover:translate-x-[2px] hover:translate-y-[2px] 
                 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]
                 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-white" />
      ) : (
        <SunIcon className="h-6 w-6 text-white" />
      )}
    </button>
  );
}