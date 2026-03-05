import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudLightning, ShieldCheck, AlertTriangle, Info, RotateCcw, DollarSign, Zap, Calculator } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';
import { useCurrencyStore } from '../store/currencyStore';

// Animated number
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

// ── Ground Flash Density regions ─────────────────────────────
const GFD_REGIONS = [
  { label: 'Tropical (India, SE Asia, Central Africa)', value: 10, desc: 'N_g ≈ 8–15 flashes/km²/yr' },
  { label: 'Subtropical (Southern USA, Mediterranean)', value: 6, desc: 'N_g ≈ 4–8 flashes/km²/yr' },
  { label: 'Temperate (Northern USA, Europe)', value: 3, desc: 'N_g ≈ 1–4 flashes/km²/yr' },
  { label: 'Maritime (UK, Pacific NW, Scandinavia)', value: 1, desc: 'N_g ≈ 0.5–2 flashes/km²/yr' },
  { label: 'Arid (Desert, Polar)', value: 0.5, desc: 'N_g ≈ 0.1–1 flashes/km²/yr' },
];

const ROOF_MATERIALS = [
  { label: 'Metal Standing Seam', factor: 0.5, desc: 'Conducts safely, lowest risk' },
  { label: 'Concrete / Tile', factor: 0.8, desc: 'Non-combustible, good' },
  { label: 'Asphalt Shingle', factor: 1.0, desc: 'Standard, moderate risk' },
  { label: 'Wood Shingle / Thatch', factor: 1.5, desc: 'Combustible, high risk' },
  { label: 'Solar Panels on Roof', factor: 0.7, desc: 'Metal frame provides partial path' },
];

// ── Component ───────────────────────────────────────────────
export const LightningRisk: React.FC = () => {
  const { currency, format, convert } = useCurrencyStore();

  const [height, setHeight] = useState<number | ''>(8); // meters
  const [gfdIdx, setGfdIdx] = useState(2); // temperate by default
  const [roofIdx, setRoofIdx] = useState(2); // asphalt by default
  const [hasTrees, setHasTrees] = useState(false);
  const [hasLPS, setHasLPS] = useState(false);
  const [hasSPD, setHasSPD] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const calculate = () => {
    if (height === '') return null;

    const H = height as number;
    const Ng = GFD_REGIONS[gfdIdx].value;
    const roofFactor = ROOF_MATERIALS[roofIdx].factor;

    // IEC 62305-2 simplified: N_d = N_g × A_e × C_d × 10^-6
    // Equivalent collection area: A_e = L × W + 6H(L + W) + 9πH² (for isolated structure)
    // Simplified for a square building: assume L = W = 10m (typical house)
    const L = 10, W = 10;
    const Ae = L * W + 6 * H * (L + W) + 9 * Math.PI * H * H;

    // Location factor C_d
    let Cd = 1.0;
    if (hasTrees) Cd = 0.5; // Taller trees nearby reduce direct strikes

    // Raw strikes per year
    const Nd = Ng * Ae * Cd * 1e-6;

    // Probability of at least 1 strike in 1 year
    const probYear = 1 - Math.exp(-Nd);
    const probPercent = probYear * 100;

    // 25-year probability
    const prob25 = (1 - Math.pow(1 - probYear, 25)) * 100;

    // Odds string
    const odds = probYear > 0 ? Math.round(1 / probYear) : Infinity;

    // Risk with roof factor
    const damageRisk = probPercent * roofFactor;

    // Protection benefit
    const lpsReduction = hasLPS ? 0.02 : 1.0; // Class I LPS reduces risk to ~2% (IEC 62305 Table 2)
    const spdReduction = hasSPD ? 0.1 : 1.0;
    const protectedRisk = damageRisk * lpsReduction * spdReduction;

    // Protection level recommendation (IEC 62305-2)
    let protectionLevel: 'I' | 'II' | 'III' | 'IV' | 'None';
    if (Nd > 0.1) protectionLevel = 'I';
    else if (Nd > 0.01) protectionLevel = 'II';
    else if (Nd > 0.001) protectionLevel = 'III';
    else if (Nd > 0.0001) protectionLevel = 'IV';
    else protectionLevel = 'None';

    // Electronics value at risk (avg home)
    const electronicsValue = 5000; // Base USD value
    const surgeROI = hasSPD ? 0 : Math.round(electronicsValue * probYear * 25);
    const spdCost = 300; // Average cost in USD

    return {
      Ae: Math.round(Ae),
      Nd: Nd.toFixed(6),
      probPercent: probPercent.toFixed(4),
      prob25: prob25.toFixed(2),
      odds,
      damageRisk: damageRisk.toFixed(4),
      protectedRisk: protectedRisk.toFixed(6),
      protectionLevel,
      surgeROI,
      Ng,
      spdCost,
      electronicsValue
    };
  };

  const results = showResults ? calculate() : null;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the probability of lightning striking my house?', acceptedAnswer: { '@type': 'Answer', text: 'The probability depends on your building height, location (ground flash density), and terrain. Using the IEC 62305 formula, a typical 8m house in a temperate region has roughly a 1 in 1,000 to 1 in 10,000 annual probability. Taller buildings and tropical regions have much higher risk.' } },
      { '@type': 'Question', name: 'Do I need a whole-house surge protector?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Even nearby lightning strikes (within 2 km) can induce voltage surges that destroy unprotected electronics. A Type 2 SPD (Surge Protective Device) at your electrical panel costs around 300 USD and protects thousands of dollars in equipment. Per IEC 62305-4, SPDs are recommended for all buildings in areas with Ng > 1.' } },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Lightning Strike Probability Calculator — IEC 62305 Risk"
        description="Calculate the probability of lightning striking your home based on IEC 62305. Find your protection level recommendation and surge protector ROI. Free tool."
        path="/lightning-risk"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <CloudLightning className="w-4 h-4" /> Storm Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 tracking-tight font-black">
          Lightning <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 italic">Probability</span> Calculator
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          What are the <strong>real odds</strong> of a lightning strike hitting your home? Calculate your risk using the international <strong>IEC 62305</strong> standard.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-widest">
          <Info className="w-3.5 h-3.5" /> Derived from IEC 62305-2 · NFPA 780
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-[32px] p-6 md:p-10 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-xl font-black text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-8 flex items-center gap-3">
             <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-xl text-sky-500">
                <CloudLightning className="w-6 h-6" />
             </div>
             Site Parameters
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Building Height (meters)</label>
              <input type="number" min={1} max={100} className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-sky-500 outline-none font-bold text-lg" value={height} onChange={e => { setHeight(e.target.value === '' ? '' : Number(e.target.value)); setShowResults(false); }} />
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">1 story ≈ 3m · 2 story ≈ 6-8m · 3 story ≈ 9-12m</p>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Storm Region (Ground Flash Density)</label>
              <div className="grid grid-cols-1 gap-2">
                {GFD_REGIONS.map((gfd, idx) => (
                  <button key={idx} onClick={() => { setGfdIdx(idx); setShowResults(false); }}
                    className={`w-full text-left px-5 py-3 rounded-2xl text-sm transition-all border-2 ${gfdIdx === idx ? 'bg-sky-50 border-sky-500 text-sky-800 shadow-md transform scale-[1.01]' : 'bg-white dark:bg-gray-900 dark:bg-gray-900 border-slate-50 dark:border-gray-800 dark:border-gray-800 text-slate-700 dark:text-gray-300 dark:text-gray-300 hover:border-sky-200'}`}>
                    <p className="font-extrabold">{gfd.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{gfd.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Roof Material</label>
              <div className="relative">
                <select className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-sky-500 outline-none font-bold appearance-none"
                  value={roofIdx} onChange={e => { setRoofIdx(Number(e.target.value)); setShowResults(false); }}>
                  {ROOF_MATERIALS.map((rm, idx) => (
                    <option key={idx} value={idx}>{rm.label}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                   <RotateCcw className="w-4 h-4 text-slate-400 rotate-90" />
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 p-6 rounded-3xl space-y-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hasTrees ? 'bg-sky-500 border-sky-500' : 'border-slate-300 group-hover:border-sky-400'}`}>
                   {hasTrees && <ShieldCheck className="w-4 h-4 text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={hasTrees} onChange={e => { setHasTrees(e.target.checked); setShowResults(false); }} />
                <span className="text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 italic">Tall trees nearby (Shielding effect)</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                 <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hasLPS ? 'bg-sky-500 border-sky-500' : 'border-slate-300 group-hover:border-sky-400'}`}>
                   {hasLPS && <ShieldCheck className="w-4 h-4 text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={hasLPS} onChange={e => { setHasLPS(e.target.checked); setShowResults(false); }} />
                <span className="text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 italic">LPS Rod / Mesh Installed</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                 <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hasSPD ? 'bg-sky-500 border-sky-500' : 'border-slate-300 group-hover:border-sky-400'}`}>
                   {hasSPD && <ShieldCheck className="w-4 h-4 text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={hasSPD} onChange={e => { setHasSPD(e.target.checked); setShowResults(false); }} />
                <span className="text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 italic">Whole-House SPD (Panel Protection)</span>
              </label>
            </div>

            <button onClick={() => setShowResults(true)}
              className="w-full py-5 bg-gradient-to-br from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 text-white rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-sky-200/50 flex items-center justify-center gap-3 active:scale-95">
              <CloudLightning className="w-6 h-6" /> Analyze Probability
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {results ? (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Lightning probability */}
              <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden text-center">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Lightning bolt animation */}
                <motion.div className="relative z-10 mb-8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                  <div className="relative inline-block">
                     <CloudLightning className="w-20 h-20 text-yellow-400 mx-auto mb-4 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
                     <motion.div 
                        className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                     />
                  </div>
                  <div className="text-5xl font-black text-white tracking-tighter italic">1 in <AnimN value={results.odds === Infinity ? 999999 : results.odds} /></div>
                  <p className="text-sky-400 text-xs font-black uppercase tracking-[0.2em] mt-3 opacity-80">Annual strike probability</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 group hover:bg-white/10 transition-colors">
                    <div className="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Impact Area</div>
                    <div className="text-2xl font-black text-white">{results.Ae} m²</div>
                    <div className="w-8 h-1 bg-sky-500/30 mx-auto mt-2 rounded-full"></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 group hover:bg-white/10 transition-colors">
                    <div className="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Frequency (N<sub>d</sub>)</div>
                    <div className="text-2xl font-black text-white">{results.Nd}</div>
                    <div className="w-8 h-1 bg-sky-500/30 mx-auto mt-2 rounded-full"></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 group hover:bg-white/10 transition-colors">
                    <div className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">25-Year Risk</div>
                    <div className="text-2xl font-black text-white"><AnimN value={parseFloat(results.prob25)} decimals={2} suffix="%" /></div>
                    <div className="w-8 h-1 bg-amber-500/30 mx-auto mt-2 rounded-full"></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 group hover:bg-white/10 transition-colors">
                    <div className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Safety Class</div>
                    <div className="text-2xl font-black text-white">{results.protectionLevel === 'None' ? 'N/A' : `Class ${results.protectionLevel}`}</div>
                    <div className="w-8 h-1 bg-emerald-500/30 mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>

               {/* Mathematical Breakdown */}
               <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-8 border border-slate-100 dark:border-gray-800 dark:border-gray-800 shadow-xl">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-sky-500" /> Calculation Transparency
                 </h4>
                 <div className="space-y-4 text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400 font-mono">
                   <div className="p-4 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 dark:border-gray-700">
                     <p className="mb-2">1. Collection Area (A<sub>e</sub>):</p>
                     <p className="text-indigo-600 dark:text-indigo-400 font-bold">LW + 6H(L+W) + 9πH² = {results.Ae}m²</p>
                   </div>
                   <div className="p-4 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 dark:border-gray-700">
                     <p className="mb-2">2. Strikes Per Year (N<sub>d</sub>):</p>
                     <p className="text-indigo-600 dark:text-indigo-400 font-bold">{results.Ng} × {results.Ae} × 10⁻⁶ = {results.Nd}</p>
                   </div>
                   <div className="p-4 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 dark:border-gray-700">
                     <p className="mb-2">3. Prob. (1 - e⁻ᴺᵈ):</p>
                     <p className="text-indigo-600 dark:text-indigo-400 font-bold">{results.probPercent}% Annual Probability</p>
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold pt-2 uppercase tracking-tight">Standard Applied: IEC 62305-2 (Protection against lightning)</p>
                 </div>
               </div>

              {/* Surge Protector ROI */}
              {!hasSPD && results.surgeROI > 0 && (
                <motion.div className="bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-800 rounded-3xl p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="font-extrabold text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-3">
                     <DollarSign className="w-6 h-6 bg-amber-500 text-white rounded-full p-1" /> Financial Risk Assessment
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200 mb-6 font-medium leading-relaxed">
                    Without professional surge protection, even nearby strikes induce voltage spikes that destroy sensitive device motherboards.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-5 rounded-2xl border border-amber-200 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Expected Loss (25yr)</p>
                      <p className="text-2xl font-black text-red-600">{format(convert(results.surgeROI))}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-5 rounded-2xl border border-amber-200 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Protection Cost</p>
                      <p className="text-2xl font-black text-emerald-600">{format(convert(results.spdCost))}</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-white/20 text-center">
                     <span className="text-sm font-black text-amber-700 dark:text-amber-400 italic">Verdict: {results.surgeROI > results.spdCost ? 'SPD is highly cost-effective' : 'SPD is recommended for equipment longevity'}</span>
                  </div>
                </motion.div>
              )}

              {/* Protection installed */}
              {(hasLPS || hasSPD) && (
                <motion.div className="bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 shadow-lg shadow-emerald-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="font-black text-emerald-900 dark:text-emerald-400 mb-4 flex items-center gap-3">
                     <ShieldCheck className="w-7 h-7 text-emerald-600" /> Mitigation Active
                  </h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed">
                    {hasLPS && 'Your Lightning Protection System (LPS) safely redirects direct hits into the earth. '}
                    {hasSPD && 'Your Whole-House SPD intercepts induced voltage surges before they reach your home electronics. '}
                  </p>
                  <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                     <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Residual Probability</span>
                     <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">{results.protectedRisk}%</span>
                  </div>
                </motion.div>
              )}

              <button onClick={() => { setShowResults(false); window.scrollTo(0, 0); }}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:text-gray-300 dark:text-gray-300 rounded-2xl font-black transition-all border-2 border-slate-200 dark:border-gray-700 dark:border-gray-700 flex items-center justify-center gap-2 mb-10">
                <RotateCcw className="w-5 h-5" /> Start New Assessment
              </button>
            </motion.div>
          ) : (
            <motion.div key="placeholder" className="bg-slate-900 rounded-[40px] p-10 shadow-2xl flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative">
                 <CloudLightning className="w-20 h-20 text-yellow-500/30 mb-8 animate-pulse" />
                 <motion.div 
                    className="absolute inset-0 bg-sky-400/10 blur-3xl rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                 />
              </div>
              <p className="text-slate-300 text-center font-bold text-2xl tracking-tight leading-snug">
                 Ready for Analysis<br />
                 <span className="text-slate-500 text-sm font-medium">Enter your building details<br />to reveal strike probability.</span>
              </p>
              
              <div className="mt-12 w-full max-w-xs space-y-3 opacity-30">
                 <div className="h-1 bg-slate-800 rounded-full w-full"></div>
                 <div className="h-1 bg-slate-800 rounded-full w-3/4 mx-auto"></div>
                 <div className="h-1 bg-slate-800 rounded-full w-1/2 mx-auto"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RelatedTools currentPath="/lightning-risk" count={3} />
    </div>
  );
};
