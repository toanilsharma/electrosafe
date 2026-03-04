import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { Baby, ShieldAlert, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

const NURSERY_CHECKLIST = [
  {
    category: "The Crib Zone (3-Foot Radius)",
    icon: <Baby className="w-5 h-5" />,
    items: [
      { id: 'c1', text: "No cords (lamp, monitor, blinds) are within 3 feet of the crib or bassinet.", dangerLevel: "Critical" },
      { id: 'c2', text: "Baby monitor is placed at least 3 feet away from the crib to prevent strangulation.", dangerLevel: "Critical" },
      { id: 'c3', text: "No floor lamps near the crib that a standing toddler could pull down.", dangerLevel: "High" },
    ]
  },
  {
    category: "Outlets & Cords",
    icon: <ShieldAlert className="w-5 h-5" />,
    items: [
      { id: 'o1', text: "All unused outlets have solid, sliding safety covers, NOT small plastic plugs (which are choking hazards).", dangerLevel: "Critical" },
      { id: 'o2', text: "Furniture is pushed firmly against outlets currently in use so children cannot unplug or reach them.", dangerLevel: "High" },
      { id: 'o3', text: "No extension cords are used as permanent wiring in the nursery.", dangerLevel: "Critical" },
      { id: 'o4', text: "Cords are bundled and secured to the wall using cord concealers or zip ties.", dangerLevel: "High" },
    ]
  },
  {
    category: "Appliances & Lighting",
    icon: <ShieldCheck className="w-5 h-5" />,
    items: [
      { id: 'a1', text: "Humidifier/purifier is plugged directly into the wall, not a power strip.", dangerLevel: "Important" },
      { id: 'a2', text: "Nightlights are cool to the touch (LED) and cannot be easily pulled out.", dangerLevel: "High" },
      { id: 'a3', text: "Smoke alarm in or immediately outside the nursery is tested and functional.", dangerLevel: "Critical" },
    ]
  }
];

const STORAGE_KEY = 'nursery_safety_checks';

export const NurserySafety: React.FC = () => {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setChecks(JSON.parse(saved));
  }, []);

  const toggle = (id: string) => {
    const updated = { ...checks, [id]: !checks[id] };
    setChecks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const totalItems = NURSERY_CHECKLIST.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedItems = Object.values(checks).filter(Boolean).length;
  const percentComplete = Math.round((checkedItems / totalItems) * 100) || 0;

  const getDangerBadgeColor = (level: string) => {
    switch(level) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Important': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 dark:text-gray-300 border-gray-200 dark:border-gray-700 dark:border-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>New Parent "Shock-Proofing" Nursery Checklist | ElectroSafe.homes</title>
        <meta name="description" content="Prepare your nursery for your baby. Specialized electrical safety teardown for new parents regarding baby monitors, outlets, cords, and crib zones." />
        <link rel="canonical" href="https://electrosafe.homes/nursery-safety" />
      </Helmet>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Baby className="w-4 h-4" /> Nursery Teardown
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 tracking-tight">
          The New Parent <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">"Shock-Proofing"</span> Guide
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Babies explore the world with their hands and mouths. This ruthless checklist ensures their sanctuary is completely free of hidden electrical threats.
        </p>
      </div>

      {/* Progress & Share Bar */}
      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800 mb-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex-1 w-full text-center md:text-left">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Completion Status</h3>
            <div className="flex items-end justify-center md:justify-start gap-3 mb-2">
              <span className={`text-5xl font-black tracking-tighter ${percentComplete === 100 ? 'text-green-500' : 'text-slate-900 dark:text-gray-100 dark:text-gray-100'}`}>
                {percentComplete}%
              </span>
              <span className="text-slate-500 dark:text-gray-400 dark:text-gray-400 font-medium pb-1.5">Safe</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 overflow-hidden">
               <div 
                  className={`h-full transition-all duration-700 ease-out ${percentComplete === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-rose-400 to-orange-400'}`}
                  style={{ width: `${percentComplete}%` }}
               />
            </div>
          </div>
          
          <div className="w-full md:w-auto flex-shrink-0 animate-in fade-in zoom-in duration-500">
             <ShareableScoreCard 
               score={percentComplete}
               category="Nursery Safety"
               shareText={`I just shock-proofed our baby's nursery and scored ${percentComplete}% on the ElectroSafe New Parent Checklist! Verify your nursery here:`}
               url="https://electrosafe.homes/nursery-safety"
             />
          </div>
        </div>
      </div>

      {/* Critical Warning Alert */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mb-12 flex gap-4 items-start">
         <Info className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
         <div>
            <h4 className="text-red-900 font-bold mb-1">Stop using small plastic outlet plugs.</h4>
            <p className="text-red-800 text-sm leading-relaxed">
              These are choking hazards. When you remove them to use an outlet, they are easily left on the floor where toddlers find them. Instead, install <strong className="font-bold">sliding outlet plate covers</strong> that snap shut automatically when a cord is removed.
            </p>
         </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-8">
        {NURSERY_CHECKLIST.map((category, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl shadow-sm border border-slate-200 dark:border-gray-700 dark:border-gray-700 overflow-hidden">
             
             <div className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 px-6 py-4 flex items-center gap-3 border-b border-slate-200 dark:border-gray-700 dark:border-gray-700">
                <div className="p-2 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-lg shadow-sm text-slate-700 dark:text-gray-300 dark:text-gray-300">
                   {category.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-gray-200 dark:text-gray-200">{category.category}</h2>
             </div>

             <div className="p-2 sm:p-4">
               {category.items.map((item) => {
                 const isChecked = !!checks[item.id];
                 return (
                   <div 
                     key={item.id}
                     onClick={() => toggle(item.id)}
                     className={`group relative flex flex-col sm:flex-row gap-4 p-4 m-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                       isChecked 
                         ? 'bg-green-50 border-green-200' 
                         : 'bg-white dark:bg-gray-900 dark:bg-gray-900 hover:bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-slate-100 dark:border-gray-800 dark:border-gray-800 hover:border-blue-200 shadow-sm'
                     } border`}
                   >
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-blue-400'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className={`text-lg font-medium transition-colors ${isChecked ? 'text-green-800 line-through opacity-70' : 'text-slate-700 dark:text-gray-300 dark:text-gray-300'}`}>
                          {item.text}
                        </p>
                        
                        {!isChecked && (
                           <span className={`inline-block mt-3 px-2.5 py-1 rounded-md text-xs font-bold border ${getDangerBadgeColor(item.dangerLevel)}`}>
                             {item.dangerLevel} Priority
                           </span>
                        )}
                      </div>
                   </div>
                 );
               })}
             </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
