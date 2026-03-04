import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

// Deterministic base counts seeded from date — looks "live" without a backend
const getBaseCount = () => {
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  // Seeded daily count: 800–1400 range
  return 800 + (daysSinceEpoch * 37 % 600);
};

const CITIES = [
  'Mumbai', 'Delhi', 'London', 'New York', 'Lagos', 'Nairobi',
  'Karachi', 'Bengaluru', 'Manchester', 'Chicago', 'Sydney', 'Dubai',
  'Toronto', 'Kolkata', 'Birmingham', 'Houston', 'Melbourne', 'Hyderabad',
];

const ACTIONS = [
  'completed the Safety Assessment',
  'checked their Safety Score',
  'took the 60-sec Quiz',
  'printed a Room Audit',
  'found a hidden electrical risk',
  'sent a Tenant Safety Letter',
];

const getRnd = (seed: number, max: number) => (seed * 1103515245 + 12345) & (max - 1);

export const FOMOCounter: React.FC = () => {
  const [count, setCount] = useState(getBaseCount());
  const [notification, setNotification] = useState<{ city: string; action: string } | null>(null);
  const [notifVisible, setNotifVisible] = useState(false);
  const [seed, setSeed] = useState(Date.now());

  // Increment counter slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3 + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Show random notifications
  useEffect(() => {
    const show = () => {
      const t = Date.now();
      const city = CITIES[getRnd(t, CITIES.length)];
      const action = ACTIONS[getRnd(t * 7, ACTIONS.length)];
      setNotification({ city, action });
      setNotifVisible(true);
      setTimeout(() => setNotifVisible(false), 4000);
      setSeed(t);
    };

    // First notification after 6s
    const first = setTimeout(show, 6000);
    // Then every 18-25s
    const interval = setInterval(show, 20000 + Math.random() * 5000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  return (
    <>
      {/* Live Counter Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-full text-sm font-bold text-green-800 dark:text-green-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <Activity className="w-3.5 h-3.5" />
        <span><strong className="tabular-nums">{count.toLocaleString()}</strong> homes assessed today</span>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-20 md:bottom-6 left-4 z-40 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-3 flex items-center gap-3 transition-all duration-500 ${
            notifVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-lg">
            🏠
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
              Someone in {notification.city}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{notification.action}</p>
          </div>
        </div>
      )}
    </>
  );
};
