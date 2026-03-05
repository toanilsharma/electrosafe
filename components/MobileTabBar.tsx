import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Wrench, BookOpen, ShieldCheck, User } from 'lucide-react';

const TABS = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Tools', icon: Wrench, to: '/tools' },
  { label: 'Guides', icon: BookOpen, to: '/protection-guide' },
  { label: 'Safety', icon: ShieldCheck, to: '/quick-quiz' },
  { label: 'My Home', icon: User, to: '/my-home' },
];

export const MobileTabBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 dark:bg-gray-900 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700 dark:border-gray-700 safe-area-bottom"
      role="navigation"
      aria-label="Mobile navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch">
        {TABS.map(({ label, icon: Icon, to }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors min-h-[56px] ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:text-gray-200 dark:text-gray-200 dark:hover:text-gray-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold tracking-tight">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
