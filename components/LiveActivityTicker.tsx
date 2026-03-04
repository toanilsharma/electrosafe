import React, { useState, useEffect } from 'react';
import { MapPin, Zap, AlertTriangle, Hammer, CheckCircle } from 'lucide-react';

const CITIES = [
  'Austin', 'Seattle', 'London', 'Toronto', 'Sydney', 'Denver',
  'Miami', 'Vancouver', 'Bristol', 'Atlanta', 'Portland', 'Dublin'
];

const ACTIONS = [
  { text: 'just upgraded their breaker panel.', icon: Hammer, color: 'text-amber-500' },
  { text: 'mapped a 24-slot breaker box.', icon: Zap, color: 'text-blue-500' },
  { text: 'saved $850 on an electrician quote.', icon: CheckCircle, color: 'text-green-500' },
  { text: 'caught an ungrounded fire hazard.', icon: AlertTriangle, color: 'text-red-500' },
  { text: 'served a Tenant Demand notice.', icon: AlertTriangle, color: 'text-red-500' },
  { text: 'calculated their exact EV charger wire gauge.', icon: Zap, color: 'text-blue-500' }
];

export const LiveActivityTicker: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Initialize with 4 items
    const initial = Array.from({ length: 4 }).map((_, i) => ({
      id: `init-${i}`,
      city: CITIES[Math.floor(Math.random() * CITIES.length)],
      action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
    }));
    setItems(initial);

    const interval = setInterval(() => {
      setItems(prev => {
        const newItem = {
          id: `new-${Date.now()}`,
          city: CITIES[Math.floor(Math.random() * CITIES.length)],
          action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
        };
        // Keep only last 4
        return [newItem, ...prev].slice(0, 4);
      });
    }, 4500); // New activity every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900 border-t border-b border-slate-800 py-3 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap min-w-full">
        {items.map((item, i) => (
          <div key={item.id} className="inline-flex items-center gap-3 px-8 text-sm">
            <div className="flex items-center gap-1.5 opacity-60">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 font-medium">Homeowner in {item.city}</span>
            </div>
            <item.action.icon className={`w-4 h-4 ${item.action.color}`} />
            <span className="text-white font-medium">{item.action.text}</span>
            <span className="mx-4 text-slate-700 font-bold">•</span>
          </div>
        ))}
        {/* Duplicate set for seamless looping */}
        {items.map((item, i) => (
          <div key={`${item.id}-dup`} className="inline-flex items-center gap-3 px-8 text-sm">
            <div className="flex items-center gap-1.5 opacity-60">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 font-medium">Homeowner in {item.city}</span>
            </div>
            <item.action.icon className={`w-4 h-4 ${item.action.color}`} />
            <span className="text-white font-medium">{item.action.text}</span>
            <span className="mx-4 text-slate-700 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
