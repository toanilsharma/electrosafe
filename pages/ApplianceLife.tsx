import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, ShieldCheck, Info, RotateCcw, Zap, TrendingDown, DollarSign, CheckCircle2, Flame } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

// ── Appliance database ──────────────────────────────────────
interface ApplianceData {
  name: string;
  category: string;
  lifespanYears: number;
  typicalWatts: number;
  degradationRate: number; // % efficiency loss per year past midlife
  safetyRisk: string; // what fails
}

const APPLIANCES: ApplianceData[] = [
  { name: 'Refrigerator', category: 'Kitchen', lifespanYears: 15, typicalWatts: 200, degradationRate: 3, safetyRisk: 'Compressor motor insulation failure' },
  { name: 'Washing Machine', category: 'Laundry', lifespanYears: 12, typicalWatts: 500, degradationRate: 2.5, safetyRisk: 'Motor brushes wear, water leak to electrics' },
  { name: 'Clothes Dryer', category: 'Laundry', lifespanYears: 13, typicalWatts: 3000, degradationRate: 2, safetyRisk: 'Heating element degradation, lint ignition' },
  { name: 'Dishwasher', category: 'Kitchen', lifespanYears: 10, typicalWatts: 1800, degradationRate: 2, safetyRisk: 'Heating element corrosion, water pump seal' },
  { name: 'Microwave Oven', category: 'Kitchen', lifespanYears: 10, typicalWatts: 1000, degradationRate: 3, safetyRisk: 'Magnetron failure, door seal radiation leak' },
  { name: 'Air Conditioner (Split)', category: 'Climate', lifespanYears: 15, typicalWatts: 1500, degradationRate: 3.5, safetyRisk: 'Capacitor failure, refrigerant leak, compressor burnout' },
  { name: 'Air Conditioner (Window)', category: 'Climate', lifespanYears: 12, typicalWatts: 1200, degradationRate: 4, safetyRisk: 'Compressor overheating, power cord degradation' },
  { name: 'Electric Water Heater', category: 'Plumbing', lifespanYears: 12, typicalWatts: 4500, degradationRate: 5, safetyRisk: 'Anode rod corrosion, element scale failure, pressure relief valve' },
  { name: 'Gas Furnace (electric fan)', category: 'Climate', lifespanYears: 20, typicalWatts: 500, degradationRate: 1.5, safetyRisk: 'Fan motor bearing failure, thermostat malfunction' },
  { name: 'Electric Oven / Range', category: 'Kitchen', lifespanYears: 15, typicalWatts: 2500, degradationRate: 1.5, safetyRisk: 'Element failure, door switch malfunction' },
  { name: 'Ceiling Fan', category: 'Climate', lifespanYears: 15, typicalWatts: 75, degradationRate: 1, safetyRisk: 'Capacitor failure, bearing noise/wobble' },
  { name: 'Space Heater', category: 'Climate', lifespanYears: 8, typicalWatts: 1500, degradationRate: 5, safetyRisk: 'Tip-over switch failure, cord overheating' },
  { name: 'Vacuum Cleaner', category: 'Cleaning', lifespanYears: 8, typicalWatts: 1200, degradationRate: 3, safetyRisk: 'Motor brush arcing, cord insulation wear' },
  { name: 'Electric Kettle', category: 'Kitchen', lifespanYears: 5, typicalWatts: 1500, degradationRate: 4, safetyRisk: 'Element mineral scale, auto-shutoff failure' },
  { name: 'Iron (Steam)', category: 'Laundry', lifespanYears: 7, typicalWatts: 1200, degradationRate: 3, safetyRisk: 'Thermostat failure, steam leak, cord fatigue' },
  { name: 'Television (LED/OLED)', category: 'Entertainment', lifespanYears: 10, typicalWatts: 100, degradationRate: 1, safetyRisk: 'Capacitor swelling, backlight failure' },
  { name: 'Desktop Computer', category: 'Office', lifespanYears: 7, typicalWatts: 300, degradationRate: 2, safetyRisk: 'PSU capacitor aging, fan bearing failure' },
  { name: 'Garage Door Opener', category: 'Utility', lifespanYears: 12, typicalWatts: 500, degradationRate: 2, safetyRisk: 'Motor capacitor failure, chain/belt wear' },
  { name: 'Sump Pump', category: 'Utility', lifespanYears: 10, typicalWatts: 500, degradationRate: 3, safetyRisk: 'Float switch failure, motor burnout, check valve leak' },
  { name: 'Well Pump', category: 'Utility', lifespanYears: 15, typicalWatts: 750, degradationRate: 2, safetyRisk: 'Motor winding insulation breakdown' },
  { name: 'Inverter / UPS', category: 'Power', lifespanYears: 7, typicalWatts: 600, degradationRate: 4, safetyRisk: 'Battery swelling, MOSFET failure, overheating' },
];

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

import { useCurrencyStore } from '../store/currencyStore';

// ── Component ───────────────────────────────────────────────
export const ApplianceLife: React.FC = () => {
  const { currency, format, convert } = useCurrencyStore();
  const [selectedAppliance, setSelectedAppliance] = useState<string>(APPLIANCES[0].name);
  const [age, setAge] = useState<number | ''>(8);
  const [usage, setUsage] = useState<'light' | 'normal' | 'heavy'>('normal');
  const [hoursPerDay, setHoursPerDay] = useState<number | ''>(8);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const localElecRate = Number(convert(0.16).toFixed(2));
  const appliance = APPLIANCES.find(a => a.name === selectedAppliance)!;

  const calculate = () => {
    if (age === '' || hoursPerDay === '') return null;

    const a = age as number;
    const h = hoursPerDay as number;
    const usageFactor = usage === 'light' ? 0.7 : usage === 'heavy' ? 1.4 : 1.0;
    const effectiveAge = a * usageFactor;

    // Remaining life
    const remaining = Math.max(0, appliance.lifespanYears - effectiveAge);
    const lifePercent = Math.max(0, (remaining / appliance.lifespanYears) * 100);

    // Efficiency degradation
    // Only starts degrading after midlife
    const midLife = appliance.lifespanYears / 2;
    const yearsPostMid = Math.max(0, effectiveAge - midLife);
    const efficiencyLoss = yearsPostMid * appliance.degradationRate; // %
    const currentWatts = appliance.typicalWatts * (1 + efficiencyLoss / 100);
    const wastedWatts = currentWatts - appliance.typicalWatts;

    // Annual extra cost from inefficiency
    const extraKwhYear = (wastedWatts * h * 365) / 1000;
    const extraCostYear = extraKwhYear * localElecRate;

    // 5-year wasted cost
    const over5yr = extraCostYear * 5;

    // Safety tier
    let safetyTier: 'safe' | 'aging' | 'risky' | 'replace';
    if (effectiveAge < midLife) safetyTier = 'safe';
    else if (effectiveAge < appliance.lifespanYears * 0.75) safetyTier = 'aging';
    else if (effectiveAge < appliance.lifespanYears) safetyTier = 'risky';
    else safetyTier = 'replace';

    return {
      remaining: remaining.toFixed(1),
      lifePercent,
      efficiencyLoss: efficiencyLoss.toFixed(1),
      currentWatts: Math.round(currentWatts),
      wastedWatts: Math.round(wastedWatts),
      extraCostYear: Math.round(extraCostYear),
      over5yr: Math.round(over5yr),
      safetyTier,
      effectiveAge: effectiveAge.toFixed(1),
      localElecRate,
    };
  };

  const results = showResults ? calculate() : null;

  const tierStyles = {
    safe: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', bar: 'from-green-400 to-emerald-400', label: '✅ Healthy', icon: CheckCircle2 },
    aging: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', bar: 'from-yellow-400 to-amber-400', label: '⏳ Aging', icon: Clock },
    risky: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', bar: 'from-orange-400 to-red-400', label: '⚠️ Risky', icon: AlertTriangle },
    replace: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'from-red-500 to-red-700', label: '🔥 Replace Now', icon: Flame },
  };

  const categories = [...new Set(APPLIANCES.map(a => a.category))];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How long do home appliances last?', acceptedAnswer: { '@type': 'Answer', text: 'Typical lifespans: Refrigerator 15 years, Washing Machine 12 years, AC 12-15 years, Water Heater 12 years, Microwave 10 years, Electric Kettle 5 years. Heavy use or poor maintenance reduces these spans by 20-40%.' } },
      { '@type': 'Question', name: 'Do old appliances use more electricity?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Appliances lose 2-5% efficiency per year past their midlife due to worn motors, degraded insulation, and mineral buildup on heating elements. A 15-year-old fridge can use 30-50% more energy than when new.' } },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Appliance Life Expectancy Calculator — Efficiency & Safety"
        description="Check if your appliance is past its lifespan, losing efficiency, or becoming a safety hazard. Calculate extra energy costs from aging equipment. Based on ENERGY STAR and IEC 60335."
        path="/appliance-life"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Clock className="w-4 h-4" /> Appliance Health
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          Appliance <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">"Life Expectancy"</span> Gauge
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Is your old appliance costing you more in electricity than a new one would? Check its <strong>remaining life</strong>, efficiency decay, and safety risk.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> ENERGY STAR Data · IEC 60335 Safety Standards
        </div>
      </motion.div>

      {/* Global Currency applies; removed local Region Selector */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-xl font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-2"><Zap className="w-5 h-5 text-teal-500" /> Select Appliance</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Appliance Type</label>
              <select className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none font-medium appearance-none"
                value={selectedAppliance} onChange={e => { setSelectedAppliance(e.target.value); setShowResults(false); }}>
                {categories.map(cat => (
                  <optgroup key={cat} label={cat}>
                    {APPLIANCES.filter(a => a.category === cat).map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.lifespanYears} yr lifespan, {a.typicalWatts}W)</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Age (years)</label>
              <input type="number" min={0} max={40} className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none font-medium" value={age} onChange={e => { setAge(e.target.value === '' ? '' : Number(e.target.value)); setShowResults(false); }} />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Usage Pattern</label>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'normal', 'heavy'] as const).map(u => (
                  <button key={u} onClick={() => { setUsage(u); setShowResults(false); }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${usage === u ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-slate-100 dark:border-gray-800 dark:border-gray-800 text-slate-600 dark:text-gray-400 dark:text-gray-400 hover:bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50'}`}>
                    {u === 'light' ? '🟢 Light' : u === 'normal' ? '🟡 Normal' : '🔴 Heavy'}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Heavy use accelerates aging by ×1.4</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Daily Usage (hours)</label>
              <input type="number" min={0} max={24} className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none font-medium" value={hoursPerDay} onChange={e => { setHoursPerDay(e.target.value === '' ? '' : Number(e.target.value)); setShowResults(false); }} />
            </div>

            <button onClick={() => setShowResults(true)}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <TrendingDown className="w-5 h-5" /> Check Appliance Health
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {results ? (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Life Gauge */}
              <div className={`rounded-3xl p-6 md:p-8 border-2 ${tierStyles[results.safetyTier].bg} ${tierStyles[results.safetyTier].border}`}>
                <div className="flex items-center gap-3 mb-4">
                  {React.createElement(tierStyles[results.safetyTier].icon, { className: `w-8 h-8 ${tierStyles[results.safetyTier].color} ${results.safetyTier === 'replace' ? 'animate-pulse' : ''}` })}
                  <div>
                    <h3 className={`text-2xl font-extrabold ${tierStyles[results.safetyTier].color}`}>{tierStyles[results.safetyTier].label}</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400">{appliance.name} · {results.effectiveAge} effective years</p>
                  </div>
                </div>

                {/* Life bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 mb-1"><span>New</span><span>Midlife</span><span>End of Life</span></div>
                  <div className="w-full h-5 bg-white dark:bg-gray-900 dark:bg-gray-900/60 rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${tierStyles[results.safetyTier].bar}`}
                      initial={{ width: '100%' }} animate={{ width: `${results.lifePercent}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-400">Remaining: <strong>{results.remaining} years</strong></span>
                    <span className="text-xs text-slate-400"><AnimN value={results.lifePercent} decimals={0} suffix="%" /> life left</span>
                  </div>
                </div>

                {/* Safety risk */}
                <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/50 rounded-xl p-3 border border-black/5">
                  <p className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-1">Primary Failure Mode</p>
                  <p className="text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300 font-medium">{appliance.safetyRisk}</p>
                </div>
              </div>

              {/* Efficiency Card */}
              <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-white font-bold mb-4 relative z-10 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" /> Efficiency Loss Cost
                </h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-amber-400 text-xs font-bold uppercase mb-1">Efficiency Lost</div>
                    <div className="text-2xl font-extrabold text-white"><AnimN value={parseFloat(results.efficiencyLoss)} decimals={1} suffix="%" /></div>
                    <p className="text-[10px] text-slate-400 mt-1">η<sub>loss</sub> = years × δ<sub>rate</sub></p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-amber-400 text-xs font-bold uppercase mb-1">Current Draw</div>
                    <div className="text-2xl font-extrabold text-white"><AnimN value={results.currentWatts} suffix="W" /></div>
                    <p className="text-[10px] text-slate-400 mt-1">vs {appliance.typicalWatts}W when new</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-red-400 text-xs font-bold uppercase mb-1">Extra Cost / Year</div>
                    <div className="text-2xl font-extrabold text-white">{format(results.extraCostYear)}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-red-400 text-xs font-bold uppercase mb-1">Wasted Over 5 Years</div>
                    <div className="text-2xl font-extrabold text-white">{format(results.over5yr)}</div>
                  </div>
                </div>
              </div>

              {/* Formulas Transparency */}
              <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
                <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wider mb-3">Mathematical Breakdown</h4>
                <p className="text-xs font-medium text-slate-500 mb-4 pb-2 border-b border-slate-200 dark:border-gray-700">Displaying transparent calculations according to ENERGY STAR data.</p>
                <div className="space-y-3 text-sm text-slate-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 rounded-xl p-4 shadow-inner">
                  <div>
                    <span className="text-slate-400">Step 1: Effective Aging</span><br/>
                    <span className="text-teal-600 dark:text-teal-400">Age<sub>eff</sub> = {age}yr × {usage === 'light' ? 0.7 : usage === 'heavy' ? 1.4 : 1.0} = {results.effectiveAge} yr</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Step 2: Efficiency Decay</span><br/>
                    <span className="text-teal-600 dark:text-teal-400">η<sub>loss</sub> = {results.efficiencyLoss}% loss at current age</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Step 3: Annual Excess Cost</span><br/>
                    <span className="text-teal-600 dark:text-teal-400">Cost = {results.wastedWatts}W × {hoursPerDay}h × 365 ÷ 1000 × {format(results.localElecRate)} = {format(results.extraCostYear)}/yr</span>
                  </div>
                </div>
              </div>

              <button onClick={() => { setShowResults(false); window.scrollTo(0, 0); }}
                className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold transition flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Check Another Appliance
              </button>
            </motion.div>
          ) : (
            <motion.div key="placeholder" className="bg-slate-900 rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <Clock className="w-16 h-16 text-teal-500/50 mb-6 animate-pulse" />
              <p className="text-slate-400 text-center font-medium text-lg">Select an appliance and enter<br />its age to check health status</p>
              <div className="mt-6 text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 font-mono text-center space-y-1">
                <p>Life = Lifespan − Age × k<sub>usage</sub></p>
                <p>η<sub>loss</sub> = (Age − T<sub>½</sub>) × δ%/yr</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RelatedTools currentPath="/appliance-life" count={3} />
    </div>
  );
};
