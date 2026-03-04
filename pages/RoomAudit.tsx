import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Printer, Share2, MessageCircle, ArrowRight, Home, Zap } from 'lucide-react';

const ROOMS_DATA = [
  {
    id: 'kitchen',
    name: '🍳 Kitchen',
    color: 'orange',
    items: [
      'GFCI/RCD outlet installed within 6ft of sink',
      'No extension cords used as permanent wiring',
      'Refrigerator has dedicated 20A circuit',
      'Microwave has dedicated outlet (not shared)',
      'No outlet directly above or beside sink',
      'Smoke detector installed and tested in last 6 months',
      'No curtains or towels near cooktop / range',
    ],
  },
  {
    id: 'bathroom',
    name: '🛁 Bathroom',
    color: 'blue',
    items: [
      'GFCI/RCD outlet at least 3ft from water source',
      'No extension cords or power strips in bathroom',
      'Geyser / water heater wiring is concealed and undamaged',
      'Light switches are outside or moisture-rated (IP44+)',
      'No electrical devices stored near bathtub or shower',
      'Exhaust fan works and is not blocked',
    ],
  },
  {
    id: 'bedroom',
    name: '🛏 Bedroom',
    color: 'purple',
    items: [
      'No running phone chargers under pillow or mattress',
      'Extension cords are not running under rugs or carpets',
      'AC unit is on a dedicated circuit',
      'Smoke detector installed and tested in last 6 months',
      'No multi-plug adapters daisy-chained together',
      'Outlet covers in place if young children present',
      'Electric blanket stored flat (not folded) when stored',
    ],
  },
  {
    id: 'living',
    name: '🛋 Living Room',
    color: 'teal',
    items: [
      'TV/entertainment setup not on a single overloaded outlet',
      'Extension cords are temporary — not permanent fixtures',
      'Power strips used (not plain extension cords) for TV area',
      'No cords running under furniture or carpets',
      'Fireplace / heater has 3ft clearance from all combustibles',
      'All outlets have covers or are childproofed if applicable',
    ],
  },
  {
    id: 'garage',
    name: '🚗 Garage / Utility',
    color: 'gray',
    items: [
      'Outlets near floor or water are GFCI protected',
      'EV charger wiring inspected and rated correctly',
      'Main breaker panel is accessible and not blocked',
      'No exposed or frayed wiring visible on walls / ceiling',
      'Panel labeled correctly for each circuit',
      'Fire extinguisher present and not expired',
    ],
  },
  {
    id: 'outdoor',
    name: '🌿 Outdoor / Balcony',
    color: 'green',
    items: [
      'All outdoor outlets are weatherproof (IP65+ rated)',
      'Outdoor wiring run in conduit (not exposed)',
      'No extension cords run through windows or holes',
      'Outdoor light fixtures sealed against moisture',
      'No power tools left plugged in outdoors',
    ],
  },
];

const STORAGE_KEY = 'room_audit_checks';

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
  gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
};

export const RoomAudit: React.FC = () => {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setChecks(JSON.parse(saved));
  }, []);

  const toggle = (key: string) => {
    const updated = { ...checks, [key]: !checks[key] };
    setChecks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Save last check date
    localStorage.setItem('assessment_last_date', new Date().toISOString());
  };

  const totalItems = ROOMS_DATA.reduce((sum, r) => sum + r.items.length, 0);
  const checkedItems = Object.values(checks).filter(Boolean).length;
  const percent = Math.round((checkedItems / totalItems) * 100);

  const shareText = `🏠⚡ I completed ${percent}% of my home electrical safety audit using ElectroSafe.homes! Check your home → https://electrosafe.homes/room-audit`;

  const copyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const progressColor = percent < 40 ? 'bg-red-500' : percent < 80 ? 'bg-yellow-500' : 'bg-green-500';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I audit each room for electrical safety?', acceptedAnswer: { '@type': 'Answer', text: 'Check each outlet, switch and appliance in every room. Look for GFCI protection near water, proper grounding, no overloaded circuits, and tested smoke detectors.' } },
      { '@type': 'Question', name: 'Which room in the home has the most electrical hazards?', acceptedAnswer: { '@type': 'Answer', text: 'Kitchens and bathrooms have the highest risk due to the combination of water and electricity. GFCI outlets are mandatory in these areas under most electrical codes.' } },
      { '@type': 'Question', name: 'How often should I do a home electrical room audit?', acceptedAnswer: { '@type': 'Answer', text: 'Experts recommend a full home electrical audit at least once per year, and after any major appliance installation or renovation.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Room-by-Room Electrical Safety Audit | ElectroSafe.homes</title>
        <meta name="description" content="Free printable room-by-room home electrical safety checklist. Kitchen, Bathroom, Bedroom, Living Room, Garage and Outdoor inspection guide." />
        <link rel="canonical" href="https://electrosafe.homes/room-audit" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Home className="w-3.5 h-3.5" /> Room Audit
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Room-by-Room Safety Audit</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Walk through each room and tick off each safety item. Your progress is saved automatically. Print or share when done.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8 no-print">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-700">{checkedItems} of {totalItems} items checked</span>
          <span className={`font-black text-2xl ${percent >= 80 ? 'text-green-600' : percent >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{percent}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${progressColor} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
        </div>
        {percent === 100 && (
          <p className="text-center text-green-700 font-bold mt-3 animate-bounce">🎉 Congratulations! Your home audit is complete!</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 no-print">
        <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-sm">
          <Printer className="w-4 h-4" /> Print Audit
        </button>
        <button onClick={copyShare} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition shadow-sm ${copied ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}>
          <Share2 className="w-4 h-4" /> {copied ? 'Copied!' : `Share (${percent}% done)`}
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition shadow-sm">
          <MessageCircle className="w-4 h-4" /> Send to Family
        </a>
      </div>

      {/* Room Checklists */}
      <div className="space-y-6">
        {ROOMS_DATA.map(room => {
          const c = colorMap[room.color];
          const roomChecked = room.items.filter((_, i) => checks[`${room.id}-${i}`]).length;
          const roomTotal = room.items.length;
          return (
            <div key={room.id} className={`${c.bg} rounded-2xl border ${c.border} overflow-hidden`}>
              <div className="flex items-center justify-between p-5 border-b border-gray-200/60">
                <h2 className={`text-lg font-bold ${c.text}`}>{room.name}</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>{roomChecked}/{roomTotal}</span>
              </div>
              <div className="p-5 space-y-3">
                {room.items.map((item, i) => {
                  const key = `${room.id}-${i}`;
                  const checked = !!checks[key];
                  return (
                    <button key={i} onClick={() => toggle(key)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked ? 'bg-white/80 shadow-sm' : 'hover:bg-white/50'}`}>
                      {checked
                        ? <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${c.text}`} />
                        : <Circle className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" />}
                      <span className={`text-sm font-medium ${checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-slate-900 rounded-2xl p-8 text-white text-center no-print">
        <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold mb-2">Want a deeper safety score?</h2>
        <p className="text-gray-400 mb-4">Take our 25-point Self-Assessment for a precise risk rating.</p>
        <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
          Full Safety Assessment <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; font-size: 12px; }
          h1 { font-size: 20px; page-break-after: avoid; }
        }
      `}</style>
    </div>
  );
};
