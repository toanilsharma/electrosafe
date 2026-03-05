import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { Baby, ShieldAlert, CheckCircle2, ShieldCheck, Info, Calculator, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NURSERY_CHECKLIST = [
  {
    category: "The Crib Zone (3-Foot Radius)",
    icon: <Baby className="w-5 h-5" />,
    items: [
      { id: 'c1', text: "No cords (lamp, monitor, blinds) are within 3 feet of the crib or bassinet.", dangerLevel: "Critical", weight: 20 },
      { id: 'c2', text: "Baby monitor is placed at least 3 feet away from the crib to prevent strangulation.", dangerLevel: "Critical", weight: 20 },
      { id: 'c3', text: "No floor lamps near the crib that a standing toddler could pull down.", dangerLevel: "High", weight: 15 },
    ]
  },
  {
    category: "Outlets & Cords",
    icon: <ShieldAlert className="w-5 h-5" />,
    items: [
      { id: 'o1', text: "All unused outlets have solid, sliding safety covers, NOT small plastic plugs (choking hazards).", dangerLevel: "Critical", weight: 20 },
      { id: 'o2', text: "Furniture is pushed firmly against outlets currently in use so children cannot reach them.", dangerLevel: "High", weight: 10 },
      { id: 'o3', text: "No extension cords are used as permanent wiring in the nursery.", dangerLevel: "Critical", weight: 15 },
      { id: 'o4', text: "Cords are bundled and secured to the wall using cord concealers.", dangerLevel: "High", weight: 10 },
    ]
  },
  {
    category: "Appliances & Lighting",
    icon: <ShieldCheck className="w-5 h-5" />,
    items: [
      { id: 'a1', text: "Humidifier/purifier is plugged directly into the wall, not a power strip.", dangerLevel: "Important", weight: 5 },
      { id: 'a2', text: "Nightlights are cool to the touch (LED) and cannot be easily pulled out.", dangerLevel: "High", weight: 10 },
      { id: 'a3', text: "Smoke alarm in or immediately outside the nursery is tested and functional.", dangerLevel: "Critical", weight: 25 },
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

  const maxPossibleWeight = NURSERY_CHECKLIST.reduce((sum, cat) => 
    sum + cat.items.reduce((s, i) => s + i.weight, 0), 0
  );

  const currentWeight = NURSERY_CHECKLIST.reduce((sum, cat) => 
    sum + cat.items.reduce((s, i) => s + (checks[i.id] ? i.weight : 0), 0), 0
  );

  const percentComplete = Math.round((currentWeight / maxPossibleWeight) * 100) || 0;

  const getDangerBadgeColor = (level: string) => {
    switch(level) {
      case 'Critical': return 'bg-red-500 text-white border-red-600';
      case 'High': return 'bg-orange-500 text-white border-orange-600';
      case 'Important': return 'bg-yellow-500 text-white border-yellow-600';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>New Parent "Shock-Proofing" Nursery Checklist | ElectroSafe.homes</title>
        <meta name="description" content="Prepare your nursery for your baby. Specialized electrical safety teardown for new parents regarding baby monitors, outlets, cords, and crib zones." />
      </Helmet>

      {/* Hero Section */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Baby className="w-4 h-4" /> Infant Security
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter italic">
          Nursery <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Shock-Proofing</span> Guide
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Ensure your baby's sanctuary is free of hidden electrical threats. Based on pediatric safety standards and NFPA child safety codes.
        </p>
      </motion.div>

      {/* Progress & Share Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-gray-800 mb-12 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="flex-1 w-full text-center md:text-left">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Safety Readiness Index</h3>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mb-4">
              <span className={`text-7xl font-black tracking-tighter ${percentComplete === 100 ? 'text-emerald-500' : 'text-slate-900 dark:text-gray-100'}`}>
                {percentComplete}%
              </span>
              <span className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">{percentComplete === 100 ? 'Verified Safe' : 'In Progress'}</span>
            </div>
            <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-gray-800 overflow-hidden shadow-inner">
               <motion.div 
                  className={`h-full transition-all duration-700 ease-out ${percentComplete === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-rose-400 to-orange-400'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentComplete}%` }}
               />
            </div>
          </div>
          
          <div className="w-full md:w-auto flex-shrink-0">
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
      <div className="bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-900 p-8 rounded-[32px] mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center">
         <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-200">
            <AlertTriangle className="w-8 h-8 text-white" />
         </div>
         <div>
            <h4 className="text-orange-900 dark:text-orange-400 font-black uppercase tracking-widest text-xs mb-2">Choking Hazard Alert</h4>
            <p className="text-orange-800 dark:text-orange-200 text-sm leading-relaxed font-medium">
              Standard plastic outlet plugs are <strong className="font-black italic underline">major choking hazards</strong>. Toddlers can pull them out. Install self-closing <strong className="font-bold">sliding outlet plates</strong> instead.
            </p>
         </div>
         <div className="flex-shrink-0 md:ml-auto">
            <span className="text-orange-500 font-black text-sm italic flex items-center gap-1">PEDIATRIC WARNING <ArrowRight className="w-4 h-4" /></span>
         </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-10">
        {NURSERY_CHECKLIST.map((category, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden">
             
             <div className="bg-slate-50 dark:bg-gray-800/50 px-8 py-6 flex items-center gap-4 border-b border-slate-100 dark:border-gray-800">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-rose-500">
                   {category.icon}
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-gray-100">{category.category}</h2>
             </div>

             <div className="p-4 md:p-6 grid grid-cols-1 gap-4">
               {category.items.map((item) => {
                 const isChecked = !!checks[item.id];
                 return (
                   <div 
                     key={item.id}
                     onClick={() => toggle(item.id)}
                     className={`group relative flex items-start gap-4 p-5 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                       isChecked 
                         ? 'bg-emerald-50/50 border-emerald-500/30' 
                         : 'bg-white dark:bg-gray-900 border-slate-50 dark:border-gray-800 hover:border-rose-200 hover:bg-rose-50/20'
                     }`}
                   >
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isChecked ? 'bg-emerald-500 border-emerald-500 rotate-0' : 'border-slate-200 group-hover:border-rose-400'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className={`text-base font-bold transition-all ${isChecked ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-60' : 'text-slate-800 dark:text-gray-200'}`}>
                          {item.text}
                        </p>
                        
                        {!isChecked && (
                           <span className={`inline-block mt-3 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${getDangerBadgeColor(item.dangerLevel)}`}>
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

      {/* Transparency Panel */}
      <div className="mt-12 bg-slate-900 rounded-[32px] p-8 md:p-10 text-left shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
            <Calculator className="w-4 h-4 text-emerald-500" /> Scoring Transparency
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-4 font-mono text-xs text-slate-400">
               <p>• Weight (W_i) assigned by risk level.</p>
               <p>• Critical = 20-25 pts | High = 10-15 pts</p>
               <p>• Sigma (Σ) current verification: {currentWeight} pts</p>
               <p>• Max Safety Capacity: {maxPossibleWeight} pts</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-white font-bold text-sm mb-2 italic">Applied Standard:</p>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Safe Kids Worldwide · NFPA 70 · Consumer Product Safety Commission (CPSC) Publication #5211</p>
            </div>
         </div>
      </div>
      
    </div>
  );
};
