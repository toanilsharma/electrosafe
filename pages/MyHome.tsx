import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Share2, MessageCircle, Trophy, Zap, ArrowRight, Flame, Home, RefreshCw } from 'lucide-react';

const CHECKLIST = [
  { id: 'k1', room: '🍳 Kitchen', item: 'GFCI outlet installed within 6ft of sink' },
  { id: 'k2', room: '🍳 Kitchen', item: 'Microwave on dedicated outlet' },
  { id: 'k3', room: '🍳 Kitchen', item: 'Smoke detector tested this month' },
  { id: 'k4', room: '🍳 Kitchen', item: 'No extension cords used permanently' },
  { id: 'b1', room: '🛁 Bathroom', item: 'GFCI outlet at 3ft+ from water' },
  { id: 'b2', room: '🛁 Bathroom', item: 'No power strips in bathroom' },
  { id: 'b3', room: '🛁 Bathroom', item: 'Geyser wiring inspected this year' },
  { id: 'r1', room: '🛏 Bedroom', item: 'No chargers under pillow/mattress' },
  { id: 'r2', room: '🛏 Bedroom', item: 'Extension cords not under carpet/rug' },
  { id: 'r3', room: '🛏 Bedroom', item: 'Smoke detector installed & tested' },
  { id: 'r4', room: '🛏 Bedroom', item: 'AC on dedicated circuit' },
  { id: 'l1', room: '🛋 Living Room', item: 'No overloaded outlet (TV+AC+heater)' },
  { id: 'l2', room: '🛋 Living Room', item: 'Power strip has surge protection' },
  { id: 'l3', room: '🛋 Living Room', item: 'Outlet covers present (if children)' },
  { id: 'p1', room: '⚡ Electrical Panel', item: 'Know where the main breaker is' },
  { id: 'p2', room: '⚡ Electrical Panel', item: 'Panel is accessible and not blocked' },
  { id: 'p3', room: '⚡ Electrical Panel', item: 'All circuits are labeled' },
  { id: 'p4', room: '⚡ Electrical Panel', item: 'RCD/GFCI tested in last 6 months' },
  { id: 'g1', room: '🚗 Garage/Outdoor', item: 'Outdoor outlets are weatherproof' },
  { id: 'g2', room: '🚗 Garage/Outdoor', item: 'No extension cords through doors/windows' },
  { id: 'g3', room: '🚗 Garage/Outdoor', item: 'Fire extinguisher present & not expired' },
  { id: 'a1', room: '🔌 General', item: 'No burning smell from any outlet or switch' },
  { id: 'a2', room: '🔌 General', item: 'No flickering lights in past 30 days' },
  { id: 'a3', room: '🔌 General', item: 'Professional inspection in last 5 years' },
  { id: 'a4', room: '🔌 General', item: 'Carbon monoxide detector installed' },
  { id: 'a5', room: '🔌 General', item: 'No rodent damage to wiring visible' },
  { id: 'a6', room: '🔌 General', item: 'Emergency numbers posted near panel' },
  { id: 'a7', room: '🔌 General', item: 'Family knows shock emergency steps' },
];

const BADGES = [
  { id: 'starter', name: 'Safety Starter', desc: 'Completed first 5 items', icon: '🌱', threshold: 5 },
  { id: 'halfway', name: 'Half-Safe', desc: 'Completed 14+ items', icon: '⚡', threshold: 14 },
  { id: 'guardian', name: 'Home Guardian', desc: 'Completed 22+ items', icon: '🛡️', threshold: 22 },
  { id: 'champion', name: 'Safety Champion', desc: 'All 28 items complete!', icon: '🏆', threshold: 28 },
];

const STORAGE_KEY = 'my_home_checks';
const STREAK_KEY = 'safety_streak';
const STREAK_LAST_KEY = 'safety_streak_last';

export const MyHome: React.FC = () => {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setChecks(JSON.parse(saved));

    // Update streak
    const last = localStorage.getItem(STREAK_LAST_KEY);
    const today = new Date().toDateString();
    const currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
    if (last !== today) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      const newStreak = last === yesterday.toDateString() ? currentStreak + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem(STREAK_KEY, String(newStreak));
      localStorage.setItem(STREAK_LAST_KEY, today);
    } else {
      setStreak(currentStreak);
    }
  }, []);

  const toggle = (id: string) => {
    const updated = { ...checks, [id]: !checks[id] };
    setChecks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem('assessment_last_date', new Date().toISOString());
  };

  const checkedCount = Object.values(checks).filter(Boolean).length;
  const total = CHECKLIST.length;
  const percent = Math.round((checkedCount / total) * 100);
  const earnedBadges = BADGES.filter(b => checkedCount >= b.threshold);
  const progressColor = percent < 40 ? 'bg-red-500' : percent < 80 ? 'bg-yellow-500' : 'bg-green-500';

  const shareText = `🏠 My home safety checklist: ${percent}% complete! ${checkedCount}/${total} items done on ElectroSafe.homes 🔒 Check yours free → https://electrosafe.homes/my-home`;

  const shareWA = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const rooms = [...new Set(CHECKLIST.map(c => c.room))];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Helmet>
        <title>My Home Safety Checklist — Track Your Progress | ElectroSafe.homes</title>
        <meta name="description" content="Track your home electrical safety progress with our 28-item checklist. Save your progress, earn badges, and share your score with family." />
        <link rel="canonical" href="https://electrosafe.homes/my-home" />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Home className="w-3.5 h-3.5" /> My Home Dashboard
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Your Personal Safety Hub</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Track every electrical safety item across your home. Progress saves automatically.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{percent}%</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Complete</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-3xl font-black text-orange-500">{streak}</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Day Streak 🔥</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-3xl font-black text-purple-600">{earnedBadges.length}</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Badges Earned</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-700 text-sm">{checkedCount} of {total} safety items</span>
          <span className={`font-black text-lg ${percent >= 80 ? 'text-green-600' : percent >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{percent}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${progressColor} rounded-full transition-all duration-700`} style={{ width: `${percent}%` }} />
        </div>
        {percent === 100 && (
          <p className="text-center text-green-700 font-bold mt-3 text-sm">🏆 Your home is fully audited! You've earned Safety Champion!</p>
        )}
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> Safety Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map(badge => {
            const earned = checkedCount >= badge.threshold;
            return (
              <div key={badge.id} className={`rounded-xl p-3 text-center transition-all ${earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-100 opacity-40'}`}>
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className={`text-xs font-bold ${earned ? 'text-yellow-700' : 'text-gray-500'}`}>{badge.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{badge.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share */}
      <div className="flex gap-3 mb-8">
        <button onClick={shareWA} className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition">
          <MessageCircle className="w-4 h-4" /> Share Progress
        </button>
        <button onClick={() => { setChecks({}); localStorage.removeItem(STORAGE_KEY); }} className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition text-sm">
          <RefreshCw className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* Checklists by Room */}
      <div className="space-y-6">
        {rooms.map(room => {
          const roomItems = CHECKLIST.filter(c => c.room === room);
          const roomDone = roomItems.filter(c => checks[c.id]).length;
          return (
            <div key={room} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">{room}</h2>
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">{roomDone}/{roomItems.length}</span>
              </div>
              <div className="p-4 space-y-2">
                {roomItems.map(ci => (
                  <button key={ci.id} onClick={() => toggle(ci.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${checks[ci.id] ? 'bg-green-50 border border-green-100' : 'hover:bg-gray-50 border border-transparent'}`}>
                    {checks[ci.id]
                      ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      : <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />}
                    <span className={`text-sm font-medium ${checks[ci.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>{ci.item}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6 text-center">
        <Flame className="w-8 h-8 text-orange-400 mx-auto mb-3" />
        <h2 className="font-bold text-lg mb-1">Test your full safety with our 25-point audit</h2>
        <p className="text-gray-400 text-sm mb-4">The full assessment gives you a precise numerical safety score.</p>
        <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
          Full Assessment <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
