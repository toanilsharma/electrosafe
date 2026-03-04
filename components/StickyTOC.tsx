import React, { useState, useEffect, useRef } from 'react';
import { List, ChevronRight } from 'lucide-react';

export interface TOCItem {
  id: string;
  label: string;
  level?: number; // 1 = section, 2 = subsection
}

interface Props {
  items: TOCItem[];
}

export const StickyTOC: React.FC<Props> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop: Sticky Sidebar */}
      <div className="hidden xl:block fixed top-24 right-4 z-30 w-56">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <List className="w-3.5 h-3.5" />
            On this page
          </div>
          <nav className="space-y-0.5" aria-label="Table of Contents">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left text-sm py-1.5 px-2.5 rounded-lg transition-all ${
                  item.level === 2 ? 'pl-5 text-xs' : ''
                } ${
                  activeId === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile: Floating toggle button */}
      <div className="xl:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition"
          aria-label="Table of Contents"
        >
          <List className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute bottom-14 right-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 max-h-[50vh] overflow-y-auto animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Jump to</div>
            <nav className="space-y-0.5">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-2 w-full text-left text-sm py-2 px-3 rounded-lg transition ${
                    activeId === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <ChevronRight className={`w-3 h-3 flex-shrink-0 ${activeId === item.id ? 'text-blue-500' : 'text-gray-300'}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};
