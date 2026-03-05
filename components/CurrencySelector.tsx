import React, { useState, useRef, useEffect } from 'react';
import { useCurrencyStore, CURRENCIES, CurrencyCode } from '../store/currencyStore';
import { Globe, ChevronDown } from 'lucide-react';

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors border border-slate-200 dark:border-gray-700"
        aria-label="Select Currency"
      >
        <Globe className="w-3.5 h-3.5" />
        {currency.code} ({currency.symbol})
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl z-50 overflow-hidden border border-slate-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2">
          <div className="py-1">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
              const c = CURRENCIES[code];
              return (
                <button
                  key={code}
                  onClick={() => {
                    setCurrency(code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors ${
                    currency.code === code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-sm">{c.name}</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 dark:bg-gray-800 rounded">{c.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
