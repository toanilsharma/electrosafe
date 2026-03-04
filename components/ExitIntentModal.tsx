import React, { useState, useEffect, useRef } from 'react';
import { X, Download, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const EMERGENCY_TIPS = [
  '🔴 Electric shock? Do NOT touch them — cut power at the fuse box first.',
  '🔥 Electrical fire? Never use water. Use a CO₂ or dry powder extinguisher.',
  '💡 Burning smell from outlet? Switch off the circuit breaker immediately.',
  '⚡ Flickering lights + breaker tripping? Call an electrician — it may be an arc fault.',
  '🚫 Never overload extension cords. One heavy appliance per socket.',
];

export const ExitIntentModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('exit_modal_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    // Also trigger on mobile after 90s of inactivity
    const timer = setTimeout(() => {
      if (!triggered.current && !sessionStorage.getItem('exit_modal_dismissed')) {
        triggered.current = true;
        setVisible(true);
      }
    }, 90000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('exit_modal_dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-400">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-red-200 text-xs font-bold uppercase tracking-wider">Before you go</p>
              <h2 className="text-xl font-extrabold leading-tight">Take the 1-Page Emergency Card</h2>
            </div>
          </div>
          <p className="text-red-100 text-sm">Paste it on your fuse box. Could save a life.</p>
        </div>

        {/* Tips */}
        <div className="p-5 space-y-2.5">
          {EMERGENCY_TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="p-5 pt-0 flex flex-col gap-3">
          <button
            onClick={() => { window.print(); dismiss(); }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md transition"
          >
            <Download className="w-4 h-4" />
            Print Emergency Card (Free)
          </button>
          <Link
            to="/emergency"
            onClick={dismiss}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 transition text-sm"
          >
            <Zap className="w-4 h-4" />
            View Full Emergency Guide
          </Link>
          <button onClick={dismiss} className="text-xs text-gray-400 hover:text-gray-600 transition text-center">
            No thanks, I already know what to do
          </button>
        </div>
      </div>
    </div>
  );
};
