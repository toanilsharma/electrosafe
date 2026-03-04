import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Snowflake, Sun, CloudRain, Leaf,
  ArrowRight, Flame, Zap, ThermometerSun, CloudLightning, Wind
} from 'lucide-react';

// Season configuration based on Northern Hemisphere months
const getSeasonConfig = () => {
  const month = new Date().getMonth(); // 0-11
  
  // Winter: Dec, Jan, Feb (months 11, 0, 1)
  if (month === 11 || month <= 1) {
    return {
      season: 'Winter',
      icon: Snowflake,
      gradient: 'from-blue-600 to-indigo-700',
      accentBg: 'bg-blue-500/20',
      accentBorder: 'border-blue-400/30',
      accentText: 'text-blue-200',
      title: '❄️ Winter Electrical Safety',
      subtitle: 'Heaters, holiday lights, and frozen pipes are the top winter hazards.',
      tips: [
        { icon: Flame, text: 'Space heaters: 3ft clearance from combustibles. Never on extension cords.' },
        { icon: Zap, text: 'Holiday lights: Use LED strings rated for indoor/outdoor. Check for frayed wires.' },
        { icon: ThermometerSun, text: 'Frozen pipes near wires can crack insulation. Inspect after thaw.' },
      ],
      cta: { text: 'Winter Safety Checklist', link: '/articles' },
    };
  }
  
  // Spring: Mar, Apr, May (months 2, 3, 4)
  if (month >= 2 && month <= 4) {
    return {
      season: 'Spring',
      icon: Leaf,
      gradient: 'from-green-600 to-emerald-700',
      accentBg: 'bg-green-500/20',
      accentBorder: 'border-green-400/30',
      accentText: 'text-green-200',
      title: '🌱 Spring Electrical Check-Up',
      subtitle: 'Storm season is coming. Prepare your home\'s electrical defenses.',
      tips: [
        { icon: CloudLightning, text: 'Install whole-house surge protection before storm season arrives.' },
        { icon: Zap, text: 'Test all GFCI/RCD outlets — winter moisture can cause hidden corrosion.' },
        { icon: Wind, text: 'Inspect outdoor outlets and panels for moisture/pest damage from winter.' },
      ],
      cta: { text: 'Storm Preparedness Guide', link: '/everyday-safety' },
    };
  }
  
  // Summer / Monsoon: Jun, Jul, Aug (months 5, 6, 7)
  if (month >= 5 && month <= 7) {
    return {
      season: 'Summer',
      icon: Sun,
      gradient: 'from-orange-500 to-red-600',
      accentBg: 'bg-orange-500/20',
      accentBorder: 'border-orange-400/30',
      accentText: 'text-orange-200',
      title: '☀️ Summer & Monsoon Safety',
      subtitle: 'AC overloads, lightning strikes, and water damage peak now.',
      tips: [
        { icon: Zap, text: 'ACs draw 1500W+. Never share a circuit with another heavy appliance.' },
        { icon: CloudRain, text: 'Monsoon: Inspect outdoor switches for water entry. Use IP65-rated covers.' },
        { icon: CloudLightning, text: 'Unplug sensitive electronics during thunderstorms — surges kill devices.' },
      ],
      cta: { text: 'Storm Protocol', link: '/everyday-safety' },
    };
  }
  
  // Fall / Autumn: Sep, Oct, Nov (months 8, 9, 10)
  return {
    season: 'Fall',
    icon: Leaf,
    gradient: 'from-amber-600 to-orange-700',
    accentBg: 'bg-amber-500/20',
    accentBorder: 'border-amber-400/30',
    accentText: 'text-amber-200',
    title: '🍂 Fall Maintenance Season',
    subtitle: 'Prepare your home before winter. Inspect, test, and replace now.',
    tips: [
      { icon: Flame, text: 'Service your heating system. Check wiring connections before heavy use.' },
      { icon: Zap, text: 'Test smoke detectors when setting clocks back. Replace 10-year-old units.' },
      { icon: ThermometerSun, text: 'Inspect insulation around exterior wiring for cracks before freeze.' },
    ],
    cta: { text: 'Full Safety Assessment', link: '/assessment' },
  };
};

// Get the next upcoming safety event date
const getNextSafetyEvent = () => {
  const now = new Date();
  const year = now.getFullYear();
  const candidates = [
    { name: 'Fire Prevention Month (Oct)', date: new Date(year, 9, 1) },
    { name: 'Fire Prevention Month (Oct)', date: new Date(year + 1, 9, 1) },
    { name: 'Electrical Safety Month (May)', date: new Date(year, 4, 1) },
    { name: 'Electrical Safety Month (May)', date: new Date(year + 1, 4, 1) },
    { name: 'Home Safety Month (Jun)', date: new Date(year, 5, 1) },
    { name: 'Home Safety Month (Jun)', date: new Date(year + 1, 5, 1) },
  ].filter(e => e.date > now);
  candidates.sort((a, b) => a.date.getTime() - b.date.getTime());
  const next = candidates[0];
  const diffMs = next.date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  return { name: next.name, days: diffDays };
};

export const SeasonalBanner: React.FC = () => {
  const config = getSeasonConfig();
  const SeasonIcon = config.icon;
  const [daysSinceCheck, setDaysSinceCheck] = useState<number | null>(null);
  const nextEvent = getNextSafetyEvent();

  useEffect(() => {
    const lastCheck = localStorage.getItem('assessment_last_date');
    if (lastCheck) {
      const days = Math.floor((Date.now() - new Date(lastCheck).getTime()) / 86400000);
      setDaysSinceCheck(days);
    }
  }, []);

  return (
    <section className={`py-10 bg-gradient-to-r ${config.gradient} text-white relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white dark:bg-gray-900 dark:bg-gray-900/5 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white dark:bg-gray-900 dark:bg-gray-900/5 translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Left: Season info */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${config.accentBg} ${config.accentBorder} border rounded-full text-xs font-extrabold uppercase tracking-widest ${config.accentText} mb-4`}>
              <SeasonIcon className="w-3.5 h-3.5" />
              {config.season} Alert
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              {config.title}
            </h2>
            <p className="text-white/80 text-lg mb-4">
              {config.subtitle}
            </p>
            {/* Countdown + Last Check Row */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.accentBg} ${config.accentBorder} border rounded-lg text-sm font-bold ${config.accentText}`}>
                ⏳ {nextEvent.days}d to {nextEvent.name}
              </div>
              {daysSinceCheck !== null && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.accentBg} ${config.accentBorder} border rounded-lg text-sm font-bold ${daysSinceCheck > 90 ? 'text-red-200' : config.accentText}`}>
                  🏠 Last checked: {daysSinceCheck === 0 ? 'Today' : `${daysSinceCheck}d ago`}
                </div>
              )}
            </div>
            <Link
              to={config.cta.link}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark:text-gray-100 rounded-xl font-bold hover:bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {config.cta.text} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Quick tips */}
          <div className="lg:w-1/2 w-full">
            <div className="space-y-3">
              {config.tips.map((tip, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-4 bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
                >
                  <div className="p-2 bg-white dark:bg-gray-900 dark:bg-gray-900/20 rounded-lg flex-shrink-0">
                    <tip.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
