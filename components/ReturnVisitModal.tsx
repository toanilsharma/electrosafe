import React, { useState, useEffect } from 'react';
import { X, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DAILY_TIPS = [
  "⚡ Test your RCD/GFCI 'Test' button monthly — it should cut power instantly.",
  "🔌 Never daisy-chain power strips. Each strip into a wall, not into another strip.",
  "🌩️ During a lightning storm, unplug sensitive electronics — surge protectors don't stop direct strikes.",
  "🐀 Inspect your loft/attic annually for rodent damage to wiring insulation.",
  "💡 LED bulbs run 90% cooler than incandescent — dramatically less fire risk in enclosed fixtures.",
  "🛁 Your bathroom should have zero standard sockets. Only shaver outlets, placed 3ft+ from water.",
  "🔥 Space heaters cause 1,700 home fires per year. Keep 3ft clear. Never on extension cords.",
  "📋 Label every circuit in your breaker panel. You'll thank yourself in an emergency.",
  "🏠 Know where your main circuit breaker is — every adult in the home should know.",
  "🔋 Lithium battery fires cannot be extinguished with water. Remove from home if battery swells.",
  "🌡️ Overloaded circuits are warm to the touch near the outlet. Feel your outlet plates weekly.",
  "⛈️ After a flood: do NOT turn on power until a licensed electrician inspects the wiring.",
  "🔦 Keep a torch near your bed. If power fails at night and you need to reach the breaker box safely.",
  "🏗️ Never DIY a new circuit — always hire a licensed electrician and get it inspected.",
  "🧯 Every home with a gas stove, gas heater, or attached garage needs a carbon monoxide detector.",
  "👶 Child safety: plastic outlet covers are a choking hazard. Install Tamper-Resistant Receptacles (TRR) instead.",
  "📱 Stop charging phones under your pillow. Pillows trap heat and lithium batteries can ignite.",
  "🔧 If your circuit breaker trips more than once for the same reason, call an electrician. Never force it.",
  "☀️ Solar DC wiring is high-voltage and doesn't turn off with the sun. Arc faults can occur at night.",
  "💧 Don't spray water near electrical outlets when mopping — moisture causes ground faults.",
  "🚗 EV chargers: use a dedicated 40A circuit. Never use a regular 13A outlet for overnight charging.",
  "🔌 Loose outlets that wiggle easily have loose wiring behind them — a fire risk. Replace them.",
  "🌿 Outdoor outlets must be weatherproof (IP44+). Cover caps must be in place when not in use.",
  "🏡 Moving into a new/old home? Get an Electrical Installation Condition Report (EICR) first.",
  "📺 Entertainment setups draw up to 3000W. Always use a surge-protected power strip — never a plain cable.",
  "🛌 Electric blankets: use to warm the bed, then turn off before sleeping. Never fold while switched on.",
  "💡 Replace all bulbs exceeding your fixture's maximum wattage — this overheats the socket and wiring.",
  "🔍 Scorched marks around outlets mean internal arcing. Call an electrician same day.",
  "🏠 Annual check: look under vinyl/carpet at edges for extension cords or wiring covered by flooring.",
  "✅ After any power cut, wait 2 minutes before switching appliances on — power surges happen at restoration.",
];

const LAST_VISIT_KEY = 'return_visit_last';
const VISIT_COUNT_KEY = 'return_visit_count';
const MODAL_DISMISSED_KEY = 'modal_dismissed_today';

export const ReturnVisitModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
    const dismissedToday = localStorage.getItem(MODAL_DISMISSED_KEY);

    // Only show on return visits (not first), and only once per day
    if (visitCount > 0 && dismissedToday !== today) {
      // Pick daily tip based on day of year
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      setTip(DAILY_TIPS[dayOfYear % DAILY_TIPS.length]);

      // Calculate streak
      if (lastVisit) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const currentStreak = parseInt(localStorage.getItem('safety_streak') || '0');
        if (lastVisit === yesterday.toDateString()) {
          const newStreak = currentStreak + 1;
          localStorage.setItem('safety_streak', String(newStreak));
          setStreak(newStreak);
        } else {
          setStreak(currentStreak);
        }
      }

      // Show modal after 3 seconds
      setTimeout(() => setVisible(true), 3000);
    }

    // Update visit tracking
    if (lastVisit !== today) {
      localStorage.setItem(LAST_VISIT_KEY, today);
      localStorage.setItem(VISIT_COUNT_KEY, String(visitCount + 1));
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(MODAL_DISMISSED_KEY, new Date().toDateString());
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 max-w-sm w-full animate-in slide-in-from-bottom-4 duration-500 no-print">
      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-300" />
            <div>
              <p className="font-bold text-sm">Welcome back! 👋</p>
              {streak > 1 && <p className="text-xs text-blue-200">🔥 {streak}-day safety streak!</p>}
            </div>
          </div>
          <button onClick={dismiss} className="text-white/70 hover:text-white transition p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Daily Tip */}
        <div className="p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">⚡ Today's Safety Tip</p>
          <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm leading-relaxed font-medium">{tip}</p>
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-4 flex gap-2">
          <Link to="/quick-quiz" onClick={dismiss}
            className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition flex items-center justify-center gap-1">
            Quiz <ArrowRight className="w-3 h-3" />
          </Link>
          <Link to="/my-home" onClick={dismiss}
            className="flex-1 text-center px-3 py-2 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold text-xs hover:bg-gray-200 transition">
            My Home
          </Link>
          <button onClick={dismiss} className="px-3 py-2 text-gray-400 text-xs hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition">Later</button>
        </div>
      </div>
    </div>
  );
};
