import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudLightning, ShieldCheck, AlertTriangle, Info, RotateCcw, DollarSign, Zap } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

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

// Regions for currency
const REGIONS: Record<string, { symbol: string; label: string; surgeProtectorCost: number }> = {
  IN: { symbol: '₹', label: 'India', surgeProtectorCost: 8000 },
  US: { symbol: '$', label: 'USA', surgeProtectorCost: 300 },
  GB: { symbol: '£', label: 'UK', surgeProtectorCost: 250 },
  EU: { symbol: '€', label: 'Europe', surgeProtectorCost: 280 },
  AU: { symbol: 'A$', label: 'Australia', surgeProtectorCost: 400 },
};

function detectRegion(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'IN';
    if (tz.startsWith('America/')) return 'US';
    if (tz.startsWith('Europe/London')) return 'GB';
    if (tz.startsWith('Europe/')) return 'EU';
    if (tz.startsWith('Australia/')) return 'AU';
  } catch {}
  return 'US';
}

// ── Component ───────────────────────────────────────────────
export const LightningRisk: React.FC = () => {
  const [regionKey, setRegionKey] = useState(detectRegion);
  const region = REGIONS[regionKey];

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
    // Terrain: assume flat (Cd = 1)

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
    const electronicsValue = regionKey === 'IN' ? 200000 : regionKey === 'US' ? 5000 : 4000;
    const surgeROI = hasSPD ? 0 : Math.round(electronicsValue * probYear * 25);

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
    };
  };

  const results = showResults ? calculate() : null;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the probability of lightning striking my house?', acceptedAnswer: { '@type': 'Answer', text: 'The probability depends on your building height, location (ground flash density), and terrain. Using the IEC 62305 formula, a typical 8m house in a temperate region has roughly a 1 in 1,000 to 1 in 10,000 annual probability. Taller buildings and tropical regions have much higher risk.' } },
      { '@type': 'Question', name: 'Do I need a whole-house surge protector?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Even nearby lightning strikes (within 2 km) can induce voltage surges that destroy unprotected electronics. A Type 2 SPD (Surge Protective Device) at your electrical panel costs $200-400 and protects thousands of dollars in equipment. Per IEC 62305-4, SPDs are recommended for all buildings in areas with Ng > 1.' } },
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <CloudLightning className="w-4 h-4" /> Storm Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          Lightning Strike <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Probability</span> Calculator
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          What are the <strong>real odds</strong> of a lightning strike hitting your home? Calculate your risk using the international <strong>IEC 62305</strong> standard.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> IEC 62305-2 · NFPA 780 · BS EN 62305
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-xl font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-2"><CloudLightning className="w-5 h-5 text-sky-500" /> Your Building</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Building Height (m)</label>
              <input type="number" min={1} max={100} className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none font-medium" value={height} onChange={e => { setHeight(e.target.value === '' ? '' : Number(e.target.value)); setShowResults(false); }} />
              <p className="text-xs text-slate-400 mt-1">1 story ≈ 3m · 2 story ≈ 6-8m · 3 story ≈ 9-12m</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Storm Region (Ground Flash Density N<sub>g</sub>)</label>
              <div className="space-y-2">
                {GFD_REGIONS.map((gfd, idx) => (
                  <button key={idx} onClick={() => { setGfdIdx(idx); setShowResults(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${gfdIdx === idx ? 'bg-sky-50 border-sky-300 text-sky-800 ring-1 ring-sky-300' : 'bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-slate-100 dark:border-gray-800 dark:border-gray-800 text-slate-700 dark:text-gray-300 dark:text-gray-300 hover:bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50'}`}>
                    <p className="font-medium">{gfd.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{gfd.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Roof Material</label>
              <select className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none font-medium appearance-none"
                value={roofIdx} onChange={e => { setRoofIdx(Number(e.target.value)); setShowResults(false); }}>
                {ROOF_MATERIALS.map((rm, idx) => (
                  <option key={idx} value={idx}>{rm.label} — {rm.desc}</option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={hasTrees} onChange={e => { setHasTrees(e.target.checked); setShowResults(false); }}
                  className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 border-gray-300" />
                <span className="text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300">Tall trees nearby (taller than building)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={hasLPS} onChange={e => { setHasLPS(e.target.checked); setShowResults(false); }}
                  className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 border-gray-300" />
                <span className="text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300">Lightning rod / LPS installed</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={hasSPD} onChange={e => { setHasSPD(e.target.checked); setShowResults(false); }}
                  className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 border-gray-300" />
                <span className="text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300">Whole-house surge protector (SPD)</span>
              </label>
            </div>

            <button onClick={() => setShowResults(true)}
              className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <CloudLightning className="w-5 h-5" /> Calculate Risk
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {results ? (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Lightning probability */}
              <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Lightning bolt animation */}
                <motion.div className="text-center mb-6 relative z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <CloudLightning className="w-16 h-16 text-yellow-400 mx-auto mb-3" />
                  <div className="text-4xl font-extrabold text-white">1 in <AnimN value={results.odds === Infinity ? 999999 : results.odds} /></div>
                  <p className="text-sky-400 text-sm font-medium mt-1">Annual probability of direct strike</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-sky-400 text-xs font-bold uppercase mb-1">Collection Area</div>
                    <div className="text-2xl font-extrabold text-white">{results.Ae} m²</div>
                    <p className="text-[10px] text-slate-400 mt-1">A<sub>e</sub> = LW + 6H(L+W) + 9πH²</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-sky-400 text-xs font-bold uppercase mb-1">N<sub>d</sub> (strikes/yr)</div>
                    <div className="text-2xl font-extrabold text-white">{results.Nd}</div>
                    <p className="text-[10px] text-slate-400 mt-1">N<sub>d</sub> = N<sub>g</sub> × A<sub>e</sub> × C<sub>d</sub> × 10⁻⁶</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-amber-400 text-xs font-bold uppercase mb-1">25-Year Risk</div>
                    <div className="text-2xl font-extrabold text-white"><AnimN value={parseFloat(results.prob25)} decimals={2} suffix="%" /></div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-amber-400 text-xs font-bold uppercase mb-1">Protection Level</div>
                    <div className="text-2xl font-extrabold text-white">{results.protectionLevel === 'None' ? '—' : `Class ${results.protectionLevel}`}</div>
                    <p className="text-[10px] text-slate-400 mt-1">per IEC 62305-2</p>
                  </div>
                </div>
              </div>

              {/* Surge Protector ROI */}
              {!hasSPD && results.surgeROI > 0 && (
                <motion.div className="bg-amber-50 border border-amber-200 rounded-3xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5" /> Surge Protector ROI</h3>
                  <p className="text-sm text-amber-800 mb-2">
                    Without a whole-house SPD, a nearby lightning strike can destroy {region.symbol}{regionKey === 'IN' ? '2,00,000' : regionKey === 'US' ? '5,000' : '4,000'}+ in electronics (TVs, routers, PCs, appliances).
                  </p>
                  <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase font-bold">Expected Loss (25 yr)</p>
                        <p className="text-xl font-extrabold text-amber-700">{region.symbol}<AnimN value={results.surgeROI} /></p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase font-bold">SPD Cost</p>
                        <p className="text-xl font-extrabold text-green-600">{region.symbol}{region.surgeProtectorCost}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase font-bold">Verdict</p>
                        <p className="text-lg font-extrabold text-green-600">{results.surgeROI > region.surgeProtectorCost ? '✅ Worth it' : '≈ Break even'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Protection installed */}
              {(hasLPS || hasSPD) && (
                <motion.div className="bg-green-50 border border-green-200 rounded-3xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Protection Active</h3>
                  <p className="text-sm text-green-700">
                    {hasLPS && 'Lightning Protection System (LPS) reduces direct damage risk by ~98%. '}
                    {hasSPD && 'Surge Protective Device (SPD) clamps induced voltage surges to safe levels. '}
                    Your residual risk: <strong>{results.protectedRisk}%</strong>
                  </p>
                </motion.div>
              )}

              {/* Formulas */}
              <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">IEC 62305-2 Formulas</h4>
                <div className="space-y-2 text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400 font-mono">
                  <p>A<sub>e</sub> = LW + 6H(L + W) + 9πH²</p>
                  <p>N<sub>d</sub> = N<sub>g</sub> × A<sub>e</sub> × C<sub>d</sub> × 10⁻⁶</p>
                  <p>P<sub>strike</sub> = 1 − e<sup>−N<sub>d</sub></sup></p>
                  <p>P<sub>25yr</sub> = 1 − (1 − P)²⁵</p>
                  <p>N<sub>g</sub> = {results.Ng} flashes/km²/yr (selected region)</p>
                </div>
              </div>

              <button onClick={() => { setShowResults(false); window.scrollTo(0, 0); }}
                className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold transition flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Recalculate
              </button>
            </motion.div>
          ) : (
            <motion.div key="placeholder" className="bg-slate-900 rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <CloudLightning className="w-16 h-16 text-yellow-500/50 mb-6 animate-pulse" />
              <p className="text-slate-400 text-center font-medium text-lg">Enter your building details<br />to calculate strike probability</p>
              <div className="mt-6 text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 font-mono text-center space-y-1">
                <p>N<sub>d</sub> = N<sub>g</sub> × A<sub>e</sub> × C<sub>d</sub> × 10⁻⁶</p>
                <p>P = 1 − e<sup>−N<sub>d</sub></sup></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RelatedTools currentPath="/lightning-risk" count={3} />
    </div>
  );
};
