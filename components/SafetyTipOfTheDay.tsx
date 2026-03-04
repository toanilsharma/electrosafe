import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight, ChevronLeft, Share2, MessageCircle, RefreshCw } from 'lucide-react';

const SAFETY_TIPS = [
  {
    tip: "Test your RCD/GFCI buttons every month by pressing the 'T' button. If it doesn't trip, you have NO shock protection.",
    category: "Protection",
    emoji: "🛡️",
  },
  {
    tip: "Extension cords are temporary. If you use one for more than 30 days, install a permanent wall outlet instead.",
    category: "Fire Prevention",
    emoji: "🔌",
  },
  {
    tip: "A burning or 'fishy' smell near outlets means insulation is melting. Cut power to that circuit immediately.",
    category: "Emergency",
    emoji: "🔥",
  },
  {
    tip: "Never use water to extinguish an electrical fire. Use a dry powder (Class C/E) extinguisher or a fire blanket.",
    category: "First Aid",
    emoji: "🧯",
  },
  {
    tip: "Overloaded power strips are the #1 cause of home electrical fires. Never daisy-chain strips together.",
    category: "Fire Prevention",
    emoji: "⚡",
  },
  {
    tip: "LED bulbs use 75% less energy than incandescent. Switching all lights can save $100+/year on electricity bills.",
    category: "Savings",
    emoji: "💡",
  },
  {
    tip: "Flickering lights when appliances start means your circuit is overloaded. Redistribute heavy appliances to separate circuits.",
    category: "Maintenance",
    emoji: "💫",
  },
  {
    tip: "If an outlet feels warm to the touch, stop using it immediately. Heat = resistance = fire risk.",
    category: "Fire Prevention",
    emoji: "🌡️",
  },
  {
    tip: "Childproof outlets with Tamper-Resistant Receptacles (TRR), NOT plastic plug covers — children can remove and choke on them.",
    category: "Child Safety",
    emoji: "👶",
  },
  {
    tip: "After a flood or major water leak, have an electrician inspect ALL wiring before restoring power. Water + electricity = lethal.",
    category: "Emergency",
    emoji: "🌊",
  },
  {
    tip: "Replace any frayed, cracked, or damaged cords immediately. Exposed wires can arc and start fires.",
    category: "Maintenance",
    emoji: "🔧",
  },
  {
    tip: "Keep at least 3 feet (1 meter) of clearance around your electrical panel. It's not a storage shelf!",
    category: "Code Compliance",
    emoji: "📏",
  },
  {
    tip: "Charger getting unusually hot? It may be counterfeit. Only use UL/CE-listed chargers with proper current ratings.",
    category: "Device Safety",
    emoji: "📱",
  },
  {
    tip: "Install smoke alarms in EVERY bedroom AND the hallway. Test them monthly. Replace batteries every year.",
    category: "Fire Prevention",
    emoji: "🚨",
  },
  {
    tip: "Before drilling into any wall, use a stud finder with AC-wire detection. Hitting a live wire can be fatal.",
    category: "DIY Safety",
    emoji: "🔨",
  },
  {
    tip: "If you feel even a slight tingle from an appliance, unplug it immediately. This indicates a grounding fault.",
    category: "Shock Prevention",
    emoji: "⚠️",
  },
  {
    tip: "Always turn off power at the breaker before changing a light fixture or switch. 'Flicking the switch' is not enough.",
    category: "DIY Safety",
    emoji: "🔒",
  },
  {
    tip: "Outdoor outlets MUST have weatherproof 'in-use' covers, not just flat covers. Rain can enter flat covers when a plug is inserted.",
    category: "Outdoor Safety",
    emoji: "☔",
  },
  {
    tip: "Space heaters should always be plugged directly into wall outlets. Never use them with extension cords.",
    category: "Winter Safety",
    emoji: "🏠",
  },
  {
    tip: "Rats and rodents chew on wires. If you see droppings near a panel or junction box, get an electrician to inspect.",
    category: "Pest Damage",
    emoji: "🐀",
  },
  {
    tip: "If a circuit breaker keeps tripping, DON'T just reset it. It's detecting a fault. Find and fix the root cause.",
    category: "Maintenance",
    emoji: "🔄",
  },
  {
    tip: "Your microwave, hair dryer, and space heater each draw 1500W+. Never put two of them on the same circuit.",
    category: "Load Management",
    emoji: "📊",
  },
  {
    tip: "Label your breaker panel! In an emergency, you need to know which breaker controls which room instantly.",
    category: "Preparedness",
    emoji: "🏷️",
  },
  {
    tip: "Aluminum wiring (common in 1960s-70s homes) expands more than copper and loosens at connections. Get it inspected.",
    category: "Old Homes",
    emoji: "🏚️",
  },
  {
    tip: "A surge protector is NOT the same as a power strip. Only surge protectors guard your electronics against voltage spikes.",
    category: "Device Safety",
    emoji: "🔋",
  },
  {
    tip: "Lightning can enter through phone lines, cable TV, and ethernet — not just power lines. Use whole-house surge protection.",
    category: "Storm Safety",
    emoji: "🌩️",
  },
  {
    tip: "Never leave phone or laptop chargers plugged in under pillows or blankets. Trapped heat can cause thermal runaway.",
    category: "Device Safety",
    emoji: "🔥",
  },
  {
    tip: "Bathroom exhaust fans reduce moisture that causes corrosion of electrical connections. Run them for 15 min after showers.",
    category: "Moisture Safety",
    emoji: "💨",
  },
  {
    tip: "If you're buying a new home, demand a professional Electrical Inspection Certificate (EICR/EIC) before closing.",
    category: "Home Buying",
    emoji: "📋",
  },
  {
    tip: "Arc-Fault Circuit Interrupters (AFCIs) detect dangerous arcing before it starts a fire. Required in modern bedrooms by code.",
    category: "Protection",
    emoji: "🛡️",
  },
];

// Deterministic "tip of the day" based on date
const getDailyTipIndex = () => {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dayOfYear % SAFETY_TIPS.length;
};

export const SafetyTipOfTheDay: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(getDailyTipIndex());
  const [isFlipping, setIsFlipping] = useState(false);
  
  const tip = SAFETY_TIPS[tipIndex];

  const nextTip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setTipIndex((tipIndex + 1) % SAFETY_TIPS.length);
      setIsFlipping(false);
    }, 200);
  };

  const prevTip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setTipIndex((tipIndex - 1 + SAFETY_TIPS.length) % SAFETY_TIPS.length);
      setIsFlipping(false);
    }, 200);
  };

  const shareText = encodeURIComponent(`${tip.emoji} Safety Tip: ${tip.tip}\n\nMore tips at electrosafe.homes`);
  const shareUrl = encodeURIComponent('https://electrosafe.homes');

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-y border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-extrabold text-amber-700 uppercase tracking-widest">
            Safety Tip of the Day
          </h2>
        </div>

        <div className={`transition-all duration-200 ${isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-amber-100 relative overflow-hidden">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
                {tip.emoji} {tip.category}
              </span>
              <span className="text-xs text-gray-400 font-bold">
                #{tipIndex + 1} of {SAFETY_TIPS.length}
              </span>
            </div>
            
            {/* Tip Text */}
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 leading-snug mb-6">
              "{tip.tip}"
            </p>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevTip}
                  className="p-2 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 hover:bg-gray-200 rounded-full transition"
                  aria-label="Previous tip"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                </button>
                <button 
                  onClick={nextTip}
                  className="p-2 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 hover:bg-gray-200 rounded-full transition"
                  aria-label="Next tip"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => { setIsFlipping(true); setTimeout(() => { setTipIndex(getDailyTipIndex()); setIsFlipping(false); }, 200); }}
                  className="p-2 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 hover:bg-gray-200 rounded-full transition"
                  aria-label="Today's tip"
                  title="Back to today's tip"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Share:</span>
                <a
                  href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-transform hover:scale-110 shadow-sm"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black hover:bg-gray-800 text-white rounded-full transition-transform hover:scale-110 shadow-sm"
                  title="Share on X"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
