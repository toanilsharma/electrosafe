import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShieldCheck, AlertTriangle, Info, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

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
    text: 'When was the dryer vent last professionally cleaned?',
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
    text: 'What is the approximate vent duct length?',
    description: 'Longer ducts trap more lint and reduce airflow. NEC and CPSC recommend < 25 ft (7.6 m) total equivalent length.',
    options: [
      { label: '< 10 ft (3 m)', value: 'short', weight: 0 },
      { label: '10–25 ft (3–7.6 m)', value: 'medium', weight: 3 },
      { label: '25–40 ft (7.6–12 m)', value: 'long', weight: 6 },
      { label: '40+ ft (12+ m)', value: 'vlong', weight: 9 },
    ],
  },
  {
    id: 'vent_material',
    text: 'What type of vent duct material is used?',
    description: 'Plastic and vinyl ducts are banned by most codes (NFPA 211) because they melt and ignite. Rigid metal is safest.',
    options: [
      { label: 'Rigid aluminum or steel', value: 'rigid', weight: 0 },
      { label: 'Semi-rigid aluminum', value: 'semi', weight: 2 },
      { label: 'Foil flex duct', value: 'foil', weight: 5 },
      { label: 'Plastic / vinyl (banned)', value: 'plastic', weight: 10 },
    ],
  },
  {
    id: 'dryer_age',
    text: 'How old is your dryer?',
    description: 'Older dryers lack modern thermal fuses and overheat protection circuits (IEC 60335-2-11).',
    options: [
      { label: '< 5 years', value: 'new', weight: 0 },
      { label: '5–10 years', value: 'mid', weight: 2 },
      { label: '10–15 years', value: 'old', weight: 5 },
      { label: '15+ years', value: 'vold', weight: 8 },
    ],
  },
  {
    id: 'lint_visible',
    text: 'Can you see lint buildup around the dryer exhaust or vent exterior?',
    description: 'Visible lint at the exterior flap means the duct interior is significantly clogged, restricting airflow.',
    options: [
      { label: 'No visible lint', value: 'none', weight: 0 },
      { label: 'Some lint around edges', value: 'some', weight: 3 },
      { label: 'Heavy lint accumulation', value: 'heavy', weight: 7 },
      { label: 'Flap is completely blocked', value: 'blocked', weight: 10 },
    ],
  },
];

// ── Component ────────────────────────────────────────────────
export const DryerVentRisk: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const setAnswer = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
    setShowResults(false);
  };

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  const calculate = () => {
    let totalWeight = 0;
    const maxWeight = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.weight)), 0); // max possible

    QUESTIONS.forEach(q => {
      const selected = q.options.find(o => o.value === answers[q.id]);
      if (selected) totalWeight += selected.weight;
    });

    // Compound multipliers
    // Plastic duct + never cleaned = extreme
    if (answers['vent_material'] === 'plastic' && answers['last_cleaned'] === 'never') totalWeight += 8;
    // Long duct + never cleaned
    if ((answers['vent_length'] === 'long' || answers['vent_length'] === 'vlong') && answers['last_cleaned'] === 'never') totalWeight += 5;
    // Old dryer + heavy lint
    if ((answers['dryer_age'] === 'old' || answers['dryer_age'] === 'vold') && (answers['lint_visible'] === 'heavy' || answers['lint_visible'] === 'blocked')) totalWeight += 5;

    const probability = Math.min((totalWeight / (maxWeight + 18)) * 100, 99); // cap at 99

    let tier: 'low' | 'medium' | 'high' | 'critical';
    if (probability < 20) tier = 'low';
    else if (probability < 45) tier = 'medium';
    else if (probability < 70) tier = 'high';
    else tier = 'critical';

    // Cleaning schedule
    let cleanSchedule = '';
    if (tier === 'low') cleanSchedule = 'Annual cleaning recommended (every 12 months)';
    else if (tier === 'medium') cleanSchedule = 'Clean within the next 30 days. Then every 6 months.';
    else if (tier === 'high') cleanSchedule = 'URGENT: Schedule professional cleaning this week.';
    else cleanSchedule = 'IMMEDIATE: Stop using dryer until vent is inspected and cleaned.';

    return { totalWeight, probability, tier, cleanSchedule };
  };

  const results = showResults ? calculate() : null;

  const tierColors = {
    low: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'from-green-400 to-emerald-400', label: 'LOW RISK' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'from-yellow-400 to-amber-400', label: 'MODERATE RISK' },
    high: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', bar: 'from-orange-400 to-red-400', label: 'HIGH RISK' },
    critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'from-red-500 to-red-700', label: 'CRITICAL DANGER' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How often should a dryer vent be cleaned?', acceptedAnswer: { '@type': 'Answer', text: 'The U.S. Fire Administration and NFPA recommend cleaning dryer vents at least once a year. Homes with longer vent runs, larger families, or pets may need cleaning every 6 months.' } },
      { '@type': 'Question', name: 'What causes dryer vent fires?', acceptedAnswer: { '@type': 'Answer', text: 'Lint accumulation in dryer vents is the #1 cause, responsible for 34% of all dryer-related house fires (NFPA). Plastic/vinyl ducts, crushed vents, and lack of maintenance increase risk dramatically.' } },
      { '@type': 'Question', name: 'Are plastic dryer vents safe?', acceptedAnswer: { '@type': 'Answer', text: 'No. Plastic and vinyl dryer vents are banned by most building codes and NFPA 211. They sag, trap lint, and can melt or ignite. Always use rigid or semi-rigid metal duct.' } },
    ]
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Dryer Vent Fire Risk Calculator — Lint Fire Probability"
        description="Calculate your dryer vent fire probability based on vent length, material, cleaning frequency, and age. Based on NFPA fire data and CPSC recommendations."
        path="/dryer-vent-risk"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Flame className="w-4 h-4" /> Fire Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          Dryer Vent <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">"Fire Probability"</span> Meter
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          <strong>34%</strong> of home dryer fires are caused by lint buildup (NFPA). Answer 5 questions to calculate your risk level.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> Based on NFPA 211 · CPSC Data · IEC 60335-2-11
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {QUESTIONS.map((q, qi) => (
              <motion.div key={q.id} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.08 }}>
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{qi + 1}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 text-lg">{q.text}</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 mt-1">{q.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                  {q.options.map(opt => (
                    <button key={opt.value} onClick={() => setAnswer(q.id, opt.value)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border ${answers[q.id] === opt.value ? 'bg-orange-50 border-orange-300 text-orange-800 ring-1 ring-orange-300' : 'bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-slate-100 dark:border-gray-800 dark:border-gray-800 text-slate-700 dark:text-gray-300 dark:text-gray-300 hover:bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}

            <button onClick={() => setShowResults(true)} disabled={!allAnswered}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-40 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Flame className="w-5 h-5" /> Calculate Fire Risk
            </button>
          </motion.div>
        ) : results ? (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Risk Gauge */}
            <div className={`rounded-3xl p-8 border-2 text-center shadow-xl ${tierColors[results.tier].bg} ${tierColors[results.tier].border}`}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
                {results.tier === 'low' ? <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" /> :
                 results.tier === 'medium' ? <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto mb-4" /> :
                 <Flame className={`w-20 h-20 mx-auto mb-4 ${results.tier === 'critical' ? 'text-red-600 animate-pulse' : 'text-orange-500'}`} />}
              </motion.div>

              <h2 className={`text-4xl font-extrabold uppercase mb-2 ${tierColors[results.tier].text}`}>
                {tierColors[results.tier].label}
              </h2>

              {/* Probability gauge */}
              <div className="max-w-md mx-auto mt-6 mb-4">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 mb-1 uppercase">
                  <span>Safe</span><span>Moderate</span><span>Danger</span>
                </div>
                <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-yellow-300 to-red-500 opacity-20" />
                  <motion.div className={`h-full rounded-full bg-gradient-to-r ${tierColors[results.tier].bar}`}
                    initial={{ width: 0 }} animate={{ width: `${results.probability}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} />
                </div>
                <p className="text-lg font-extrabold mt-2"><AnimN value={results.probability} decimals={0} suffix="%" /> fire probability score</p>
              </div>
            </div>

            {/* Cleaning Schedule */}
            <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500" /> Recommended Action</h3>
              <p className={`text-lg font-bold ${tierColors[results.tier].text}`}>{results.cleanSchedule}</p>
              <div className="mt-4 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-2">Prevention Checklist</h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300">
                  <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Clean lint trap after every load — reduces buildup by 80%</li>
                  <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Replace plastic/foil ducts with rigid metal per NFPA 211</li>
                  <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Keep vent runs under 25 ft (7.6 m) total equivalent length</li>
                  <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Check exterior flap opens freely during dryer operation</li>
                  <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Professional cleaning annually — or every 6 months for heavy use</li>
                </ul>
              </div>
            </motion.div>

            {/* Formula box */}
            <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">Risk Scoring Method</h4>
              <div className="space-y-2 text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400 font-mono">
                <p>R = Σ(w<sub>i</sub>) + Σ(compound<sub>j</sub>)</p>
                <p>P<sub>fire</sub> = R ÷ R<sub>max</sub> × 100%</p>
                <p>Compounds: plastic + uncleaned → +8, long + uncleaned → +5</p>
              </div>
            </div>

            <button onClick={() => { setShowResults(false); setAnswers({}); window.scrollTo(0, 0); }}
              className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Start Over
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <RelatedTools currentPath="/dryer-vent-risk" count={3} />
    </div>
  );
};
