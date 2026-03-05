import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Minus, AlertTriangle, ShieldCheck, Info, RotateCcw, Zap, CheckCircle2, Calculator, ArrowRight, DollarSign } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';
import { useCurrencyStore } from '../store/currencyStore';

// Animated counter
const AnimN: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [d, setD] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const s = d, e = value, dur = 1000, st = performance.now();
    const fn = (n: number) => { const p = Math.min((n - st) / dur, 1); setD(s + (e - s) * (1 - Math.pow(1 - p, 3))); if (p < 1) ref.current = requestAnimationFrame(fn); };
    ref.current = requestAnimationFrame(fn);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);
  return <span>{prefix}{d.toFixed(decimals)}{suffix}</span>;
};

// ── Light types ─────────────────────────────────────────────
interface LightType { label: string; wattsPerString: number; bulbCount: number; type: 'led' | 'incandescent'; }

const LIGHT_TYPES: LightType[] = [
  { label: 'LED Mini Lights (100 ct)', wattsPerString: 4.8, bulbCount: 100, type: 'led' },
  { label: 'LED C6 Lights (70 ct)', wattsPerString: 4.2, bulbCount: 70, type: 'led' },
  { label: 'LED C9 Lights (25 ct)', wattsPerString: 6.0, bulbCount: 25, type: 'led' },
  { label: 'LED Icicle Lights (150 ct)', wattsPerString: 7.2, bulbCount: 150, type: 'led' },
  { label: 'LED Net Lights (100 ct)', wattsPerString: 5.0, bulbCount: 100, type: 'led' },
  { label: 'LED Rope Light (18 ft / 5.5m)', wattsPerString: 10.8, bulbCount: 1, type: 'led' },
  { label: 'Incandescent Mini (100 ct)', wattsPerString: 40, bulbCount: 100, type: 'incandescent' },
  { label: 'Incandescent C7 (25 ct)', wattsPerString: 125, bulbCount: 25, type: 'incandescent' },
  { label: 'Incandescent C9 (25 ct)', wattsPerString: 175, bulbCount: 25, type: 'incandescent' },
  { label: 'Blow Mold Decoration (each)', wattsPerString: 60, bulbCount: 1, type: 'incandescent' },
  { label: 'Animated Deer / Display', wattsPerString: 50, bulbCount: 1, type: 'led' },
  { label: 'Projector Light (laser/LED)', wattsPerString: 15, bulbCount: 1, type: 'led' },
];

// ── Component ───────────────────────────────────────────────
interface AddedLight { type: LightType; qty: number; }

export const HolidayLights: React.FC = () => {
  const { currency, format, convert } = useCurrencyStore();
  
  // Electrical standards (simplified mapping)
  const standards: Record<string, { v: number; a: number; label: string }> = {
    'INR': { v: 230, a: 16, label: 'India (230V/16A)' },
    'USD': { v: 120, a: 15, label: 'USA (120V/15A)' },
    'GBP': { v: 230, a: 13, label: 'UK (230V/13A)' },
    'EUR': { v: 230, a: 16, label: 'Europe (230V/16A)' },
    'AUD': { v: 230, a: 10, label: 'Australia (230V/10A)' },
    'CAD': { v: 120, a: 15, label: 'Canada (120V/15A)' },
    'AED': { v: 230, a: 13, label: 'UAE (230V/13A)' },
  };

  const currentStandard = standards[currency.code] || standards['USD'];
  const [added, setAdded] = useState<AddedLight[]>([]);
  const [otherLoad, setOtherLoad] = useState<number | ''>(200); 
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const [seasonDays, setSeasonDays] = useState<number>(30);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const addLight = (lt: LightType) => {
    setAdded(prev => {
      const idx = prev.findIndex(a => a.type.label === lt.label);
      if (idx >= 0) { const n = [...prev]; n[idx].qty += 1; return n; }
      return [...prev, { type: lt, qty: 1 }];
    });
  };
  const updateQty = (idx: number, delta: number) => {
    setAdded(prev => {
      const n = [...prev];
      n[idx].qty = Math.max(0, n[idx].qty + delta);
      return n.filter(a => a.qty > 0);
    });
  };

  // Real-time calculation
  const totalLightsWatts = added.reduce((s, a) => s + a.type.wattsPerString * a.qty, 0);
  const otherW = (otherLoad as number) || 0;
  const totalWatts = totalLightsWatts + otherW;
  const circuitCapacity = currentStandard.v * currentStandard.a;
  const safeCapacity = circuitCapacity * 0.8; 
  const usagePercent = (totalWatts / circuitCapacity) * 100;
  const remainingW = Math.max(0, safeCapacity - totalWatts);
  const isOverloaded = totalWatts > safeCapacity;
  const isCritical = totalWatts > circuitCapacity;

  // Energy Cost
  const kwhRateUSDBase = 0.15; // $0.15 per kWh
  const totalKWh = (totalLightsWatts / 1000) * hoursPerDay * seasonDays;
  const estCostUSD = totalKWh * kwhRateUSDBase;

  const totalBulbs = added.reduce((s, a) => s + a.type.bulbCount * a.qty, 0);
  const hasIncandescent = added.some(a => a.type.type === 'incandescent');

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many Christmas light strings can I connect?', acceptedAnswer: { '@type': 'Answer', text: 'On a 15A/120V circuit, safe capacity is 1,440W. You can run ~150-300 LED strings but only 8-10 incandescent ones.' } },
      { '@type': 'Question', name: 'Can I mix LED and incandescent lights?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but be careful of total wattage. Incandescent lights draw much more power and can easily trip breakers when added to an existing display.' } },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Holiday Lights Capacity Planner — Seasonal Fire Safety"
        description="Plan your holiday light display safely. Calculate circuit load, energy costs, and maximum string counts based on standards."
        path="/holiday-lights"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles className="w-4 h-4" /> Festive Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter">
          Holiday <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-600 italic">Load Planner</span> 🎄
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Don't let a blown fuse ruin the magic. Calculate your display's electrical footprint using {currentStandard.label} standards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Light Library */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                 <Plus className="w-5 h-5 text-red-500" /> Light Library
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Modern LED (85% Less Power)</p>
                 {LIGHT_TYPES.filter(l => l.type === 'led').map(lt => (
                    <button key={lt.label} onClick={() => addLight(lt)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-100 border border-transparent hover:border-emerald-200 rounded-2xl transition-all text-left">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-700 dark:text-gray-300 truncate">{lt.label}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{lt.wattsPerString}W</p>
                      </div>
                      <Plus className="w-4 h-4 text-emerald-300" />
                    </button>
                 ))}

                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-6 mb-2">Classic Incandescent (High Heat)</p>
                 {LIGHT_TYPES.filter(l => l.type === 'incandescent').map(lt => (
                    <button key={lt.label} onClick={() => addLight(lt)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50/50 dark:bg-orange-900/10 hover:bg-orange-100 border border-transparent hover:border-orange-200 rounded-2xl transition-all text-left">
                      <Zap className="w-4 h-4 text-orange-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-700 dark:text-gray-300 truncate">{lt.label}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{lt.wattsPerString}W</p>
                      </div>
                      <Plus className="w-4 h-4 text-orange-300" />
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Center: Live Display Analysis */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
                 <div>
                    <h3 className="text-white font-black text-2xl flex items-center gap-3">
                       <Zap className={`w-6 h-6 ${isCritical ? 'text-red-500 animate-pulse' : 'text-green-500'}`} /> Circuit Load Analyzer
                    </h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Status: {isCritical ? 'CRITICAL OVERLOAD' : isOverloaded ? 'CAUTION' : 'SAFE'}</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <span className="text-white font-black text-sm">{currentStandard.label}</span>
                 </div>
              </div>

              <div className="space-y-8 relative z-10">
                 {/* Gauge */}
                 <div>
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                       <span>Total Watts: {totalWatts.toFixed(0)}W</span>
                       <span>Capacity: {circuitCapacity}W</span>
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                       <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${isCritical ? 'from-red-500 to-red-800' : isOverloaded ? 'from-orange-400 to-red-500' : 'from-emerald-400 to-green-600'}`}
                          animate={{ width: `${Math.min(usagePercent, 100)}%` }}
                          transition={{ type: 'spring', stiffness: 50 }}
                       />
                       {/* 80% Marker */}
                       <div className="absolute left-[80%] top-0 bottom-0 w-1 bg-white/20" title="Safe Limit" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Load %</p>
                       <p className={`text-2xl font-black ${isOverloaded ? 'text-red-400' : 'text-white'}`}><AnimN value={usagePercent} decimals={1} suffix="%" /></p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Bulbs</p>
                       <p className="text-2xl font-black text-white">{totalBulbs.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Remaining</p>
                       <p className="text-2xl font-black text-emerald-400">{Math.max(0, safeCapacity - totalWatts).toFixed(0)}W</p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Seasonal Cost</p>
                       <p className="text-2xl font-black text-white">{format(convert(estCostUSD))}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Build Display */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 shadow-sm">
                 <h3 className="font-black text-slate-900 dark:text-gray-100 text-lg mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" /> Active Display
                 </h3>
                 <div className="space-y-3 mb-6">
                    {added.length === 0 ? (
                       <p className="text-sm text-slate-400 italic text-center py-8">No lights added yet.</p>
                    ) : (
                       added.map((a, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl">
                             <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-slate-700 dark:text-gray-300 truncate">{a.type.label}</p>
                                <p className="text-[10px] text-slate-400">Total: {(a.type.wattsPerString * a.qty).toFixed(1)}W</p>
                             </div>
                             <div className="flex items-center gap-2">
                                <button onClick={() => updateQty(idx, -1)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><Minus className="w-3 h-3" /></button>
                                <span className="text-xs font-black">{a.qty}</span>
                                <button onClick={() => updateQty(idx, 1)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><Plus className="w-3 h-3" /></button>
                             </div>
                          </div>
                       ))
                    )}
                 </div>

                 <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-500">Other Circuit Load (W)</span>
                       <input type="number" className="w-16 bg-slate-50 p-2 rounded-lg text-right" value={otherLoad} onChange={e => setOtherLoad(e.target.value === '' ? '' : Number(e.target.value))} />
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-500">Daily Hours</span>
                       <input type="number" className="w-16 bg-slate-50 p-2 rounded-lg text-right" value={hoursPerDay} onChange={e => setHoursPerDay(Number(e.target.value))} />
                    </div>
                 </div>
              </div>

              {/* Transparency & Standards */}
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[32px] border-2 border-indigo-100 dark:border-indigo-800">
                 <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Math Breakdown
                 </h4>
                 <div className="space-y-4 text-xs font-mono text-indigo-700 dark:text-indigo-300">
                    <p>• P_total: {totalWatts.toFixed(1)} Watts</p>
                    <p>• P_safe: {safeCapacity.toFixed(0)} Watts (80% Limit)</p>
                    <p>• Efficiency Delta: {remainingW.toFixed(0)}W</p>
                    <div className="pt-4 border-t border-indigo-200">
                       <p className="font-bold underline mb-1">Standard Reference:</p>
                       <p>{currentStandard.standard}</p>
                       <p className="mt-2 text-[10px] opacity-70">Calculated using constant-current assumptions at nominal voltage.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <RelatedTools currentPath="/holiday-lights" count={3} />
    </div>
  );
};
