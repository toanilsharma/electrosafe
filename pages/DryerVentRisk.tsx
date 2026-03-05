import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShieldCheck, AlertTriangle, Info, RotateCcw, Clock, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';
import { useCurrencyStore } from '../store/currencyStore';

// Animated counter
const AnimN: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [d, setD] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const s = d, e = value, dur = 1200, st = performance.now();
    const fn = (n: number) => { const p = Math.min((n - st) / dur, 1); setD(s + (e - s) * (1 - Math.pow(1 - p, 3))); if (p < 1) ref.current = requestAnimationFrame(fn); };
    ref.current = requestAnimationFrame(fn);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);
  return <span>{prefix}{d.toFixed(decimals)}{suffix}</span>;
};

// ── Questions ────────────────────────────────────────────────
interface Question {
  id: string;
  text: string;
  description: string;
  options: { label: string; value: string; weight: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'last_cleaned',
    text: 'Last Professional Cleaning?',
    description: 'Lint accumulates over time, restricting airflow and creating highly flammable conditions.',
    options: [
      { label: 'Within 6 months', value: '6m', weight: 0 },
      { label: '6–12 months ago', value: '12m', weight: 2 },
      { label: '1–2 years ago', value: '2y', weight: 5 },
      { label: '2+ years / Never', value: 'never', weight: 10 },
    ],
  },
  {
    id: 'vent_length',
    text: 'Approximate Duct Length?',
    description: 'Longer ducts trap more lint and reduce airflow. NEC and CPSC recommend < 25 ft total length.',
    options: [
      { label: '< 10 ft (3 m)', value: 'short', weight: 0 },
      { label: '10–25 ft (3–7.6 m)', value: 'medium', weight: 3 },
      { label: '25–40 ft (7.6–12 m)', value: 'long', weight: 6 },
      { label: '40+ ft (12+ m)', value: 'vlong', weight: 9 },
    ],
  },
  {
    id: 'vent_material',
    text: 'Duct Material Type?',
    description: 'Plastic and vinyl ducts are banned by most codes (NFPA 211) because they melt easily.',
    options: [
      { label: 'Rigid aluminum or steel', value: 'rigid', weight: 0 },
      { label: 'Semi-rigid aluminum', value: 'semi', weight: 2 },
      { label: 'Foil flex duct', value: 'foil', weight: 5 },
      { label: 'Plastic / vinyl (Banned)', value: 'plastic', weight: 10 },
    ],
  },
  {
    id: 'dryer_age',
    text: 'Age of the Dryer?',
    description: 'Older dryers lack modern thermal fuses and overheat protection circuits.',
    options: [
      { label: '< 5 years', value: 'new', weight: 0 },
      { label: '5–10 years', value: 'mid', weight: 2 },
      { label: '10–15 years', value: 'old', weight: 5 },
      { label: '15+ years', value: 'vold', weight: 8 },
    ],
  },
  {
    id: 'lint_visible',
    text: 'Visible Lint Buildup?',
    description: 'Visible lint at the exterior flap means the duct interior is significantly clogged.',
    options: [
      { label: 'No visible lint', value: 'none', weight: 0 },
      { label: 'Some around edges', value: 'some', weight: 3 },
      { label: 'Heavy accumulation', value: 'heavy', weight: 7 },
      { label: 'Flap is blocked', value: 'blocked', weight: 10 },
    ],
  },
];

// ── Component ────────────────────────────────────────────────
export const DryerVentRisk: React.FC = () => {
  const { format, convert, currency } = useCurrencyStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const setAnswer = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  const calculate = () => {
    let totalWeight = 0;
    const maxWeightPossible = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.weight)), 0);

    QUESTIONS.forEach(q => {
      const selected = q.options.find(o => o.value === answers[q.id]);
      if (selected) totalWeight += selected.weight;
    });

    // Compound multipliers
    let compounds = 0;
    if (answers['vent_material'] === 'plastic' && answers['last_cleaned'] === 'never') compounds += 8;
    if ((answers['vent_length'] === 'long' || answers['vent_length'] === 'vlong') && answers['last_cleaned'] === 'never') compounds += 5;
    if ((answers['dryer_age'] === 'old' || answers['dryer_age'] === 'vold') && (answers['lint_visible'] === 'heavy' || answers['lint_visible'] === 'blocked')) compounds += 5;

    const finalScore = totalWeight + compounds;
    const probability = Math.min((finalScore / (maxWeightPossible + 18)) * 100, 99); 

    let tier: 'low' | 'medium' | 'high' | 'critical';
    if (probability < 20) tier = 'low';
    else if (probability < 45) tier = 'medium';
    else if (probability < 70) tier = 'high';
    else tier = 'critical';

    // Cleaning cost estimation based on risk and local currency
    const baseCleaningCost = 150; // USD approx
    const estCost = baseCleaningCost;

    return { totalWeight, compounds, finalScore, probability, tier, estCost, maxWeightPossible };
  };

  const results = showResults ? calculate() : null;

  const tierStyles = {
    low: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-400', bar: 'from-emerald-400 to-green-500', label: 'LOW RISK' },
    medium: { bg: 'bg-amber-50 dark:bg-amber-900/10', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-400', bar: 'from-amber-400 to-orange-500', label: 'MODERATE RISK' },
    high: { bg: 'bg-orange-50 dark:bg-orange-900/10', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-400', bar: 'from-orange-400 to-red-500', label: 'HIGH RISK' },
    critical: { bg: 'bg-red-50 dark:bg-red-900/10', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-400', bar: 'from-red-500 to-red-700', label: 'CRITICAL DANGER' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How often should a dryer vent be cleaned?', acceptedAnswer: { '@type': 'Answer', text: 'Professional cleaning is recommended at least once a year. If you have pets or a large family, consider every 6 months.' } },
      { '@type': 'Question', name: 'What is the #1 cause of dryer fires?', acceptedAnswer: { '@type': 'Answer', text: 'Lint accumulation in the vent duct. It accounts for 34% of all dryer-related house fires.' } },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Dryer Vent Fire Risk Calculator — Lint Fire Probability"
        description="Calculate your dryer vent fire probability based on vent length, material, cleaning frequency, and age. Based on NFPA fire data."
        path="/dryer-vent-risk"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Flame className="w-4 h-4" /> Fire Defense
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 tracking-tighter italic">
          Dryer Vent <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Risk Assessment</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Lint is the most common fuel for home fires. Use our weighted analyzer to determine if your dryer is a ticking time bomb.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Questions */}
        {!showResults ? (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
             {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
                   <h3 className="font-black text-slate-900 dark:text-gray-100 dark:text-gray-100 text-lg mb-4 flex items-center gap-3">
                      <span className="text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 w-8 h-8 rounded-full flex items-center justify-center text-sm">{idx + 1}</span>
                      {q.text}
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      {q.options.map(opt => (
                         <button
                            key={opt.value}
                            onClick={() => setAnswer(q.id, opt.value)}
                            className={`px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all border-2 ${
                               answers[q.id] === opt.value
                               ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                               : 'bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 text-slate-600 dark:text-gray-400 dark:text-gray-400 border-transparent hover:border-indigo-200'
                            }`}
                         >
                            {opt.label}
                         </button>
                      ))}
                   </div>
                </div>
             ))}
             <button
                disabled={!allAnswered}
                onClick={() => { setShowResults(true); window.scrollTo(0, 0); }}
                className="w-full py-5 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-40 text-white rounded-3xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
             >
                <Flame className="w-6 h-6" /> Calculate Probability
             </button>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
             <div className={`p-10 rounded-[40px] border-4 shadow-2xl relative overflow-hidden text-center ${tierStyles[results!.tier].bg} ${tierStyles[results!.tier].border}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                   {results!.tier === 'low' ? <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-6" /> :
                    results!.tier === 'medium' ? <AlertTriangle className="w-24 h-24 text-amber-500 mx-auto mb-6" /> :
                    <Flame className={`w-24 h-24 mx-auto mb-6 ${results!.tier === 'critical' ? 'text-red-600 animate-pulse' : 'text-orange-500'}`} />}
                </motion.div>

                <h2 className={`text-5xl font-black uppercase mb-2 tracking-tighter ${tierStyles[results!.tier].text}`}>
                   {tierStyles[results!.tier].label}
                </h2>

                <div className="max-w-md mx-auto mt-8 mb-8">
                   <div className="w-full h-4 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden relative shadow-inner">
                      <motion.div 
                         className={`h-full rounded-full bg-gradient-to-r ${tierStyles[results!.tier].bar}`}
                         initial={{ width: 0 }} 
                         animate={{ width: `${results!.probability}%` }} 
                         transition={{ duration: 1.5, ease: 'easeOut' }} 
                      />
                   </div>
                   <p className="text-3xl font-black mt-4 text-slate-900 dark:text-gray-100"><AnimN value={results!.probability} decimals={0} suffix="%" /> Score</p>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Relative Ignition Probability</p>
                </div>

                <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-sm mt-8">
                   <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Recommended Cleaning Budget</h3>
                   <p className="text-4xl font-black text-slate-900 dark:text-gray-100">{format(convert(results!.estCost))}</p>
                   <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight italic">Professional servicing recommended annually</p>
                </div>
             </div>

             <button onClick={() => { setShowResults(false); setAnswers({}); }}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:text-gray-400 rounded-2xl font-black transition flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-gray-800">
                <RotateCcw className="w-4 h-4" /> Recalculate
             </button>
          </motion.div>
        )}

        {/* Info / Transparency Panel */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
              <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
                 <div className="p-2 bg-indigo-500/20 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-indigo-400" />
                 </div>
                 Safety Best Practices
              </h2>
              <ul className="space-y-6 relative z-10">
                 {[
                    { icon: <Clock />, title: "Annual Servicing", desc: "IEC 60335-2-11 standards recommend professional duct inspection every 12 months." },
                    { icon: <ShieldCheck />, title: "Duct Material", desc: "Replace all plastic/foil ducts with rigid metal per NFPA 211 fire codes." },
                    { icon: <AlertTriangle />, title: "The 25ft Rule", desc: "Vent runs exceeding 25 feet require secondary lint traps or high-velocity boosters." },
                 ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                       <div className="w-10 h-10 shrink-0 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                       </div>
                       <div>
                          <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                          <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                       </div>
                    </li>
                 ))}
              </ul>

              {results && (
                 <div className="mt-10 pt-10 border-t border-white/5 relative z-10">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Calculator className="w-3.5 h-3.5" /> Calculation Transparency
                    </h4>
                    <div className="space-y-3 font-mono text-[11px] text-slate-400">
                       <p>• Base Weight: {results.totalWeight}</p>
                       <p>• Compounds: +{results.compounds}</p>
                       <p>• Sigma (Σ): {results.finalScore} / {results.maxWeightPossible + 18}</p>
                       <div className="pt-3 border-t border-white/10">
                          <p className="text-indigo-400 font-bold italic">Source: NFPA Report on Clothes Dryer Fires</p>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>

      <RelatedTools currentPath="/dryer-vent-risk" count={3} />
    </div>
  );
};
