import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Zap, DollarSign, Leaf, ShieldCheck, AlertTriangle, ArrowRight, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RelatedTools } from '../components/RelatedTools';

// ── Region detection ─────────────────────────────────────────
interface RegionProfile {
  currency: string; symbol: string; voltageSystem: string;
  avgSunHours: number; gridEmission: number; elecRate: number;
  label: string;
}

const REGIONS: Record<string, RegionProfile> = {
  IN: { currency: 'INR', symbol: '₹', voltageSystem: '230V / 50Hz', avgSunHours: 5.5, gridEmission: 0.82, elecRate: 8, label: 'India' },
  US: { currency: 'USD', symbol: '$', voltageSystem: '120/240V / 60Hz', avgSunHours: 4.5, gridEmission: 0.42, elecRate: 0.16, label: 'USA' },
  GB: { currency: 'GBP', symbol: '£', voltageSystem: '230V / 50Hz', avgSunHours: 3.0, gridEmission: 0.23, elecRate: 0.34, label: 'UK' },
  EU: { currency: 'EUR', symbol: '€', voltageSystem: '230V / 50Hz', avgSunHours: 3.8, gridEmission: 0.30, elecRate: 0.25, label: 'Europe' },
  AU: { currency: 'AUD', symbol: 'A$', voltageSystem: '230V / 50Hz', avgSunHours: 5.0, gridEmission: 0.79, elecRate: 0.30, label: 'Australia' },
  AE: { currency: 'AED', symbol: 'dh', voltageSystem: '230V / 50Hz', avgSunHours: 6.5, gridEmission: 0.50, elecRate: 0.08, label: 'UAE' },
};

function detectRegion(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'IN';
    if (tz.startsWith('America/')) return 'US';
    if (tz.startsWith('Europe/London')) return 'GB';
    if (tz.startsWith('Europe/')) return 'EU';
    if (tz.startsWith('Australia/')) return 'AU';
    if (tz.startsWith('Asia/Dubai')) return 'AE';
  } catch {}
  return 'US';
}

// ── Animated counter ─────────────────────────────────────────
const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>();

  useEffect(() => {
    const start = display;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * eased);
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);

  return <span>{prefix}{display.toFixed(decimals)}{suffix}</span>;
};

// ── Main Component ───────────────────────────────────────────
export const SolarROI: React.FC = () => {
  const [regionKey, setRegionKey] = useState(detectRegion);
  const region = REGIONS[regionKey];

  const [monthlyBill, setMonthlyBill] = useState<number | ''>(region.elecRate > 1 ? 3000 : 150);
  const [roofArea, setRoofArea] = useState<number | ''>(30);
  const [panelWp, setPanelWp] = useState(400);
  const [systemCost, setSystemCost] = useState<number | ''>(region.elecRate > 1 ? 350000 : 15000);
  const [existingLoad, setExistingLoad] = useState<number | ''>(5);
  const [panelCapacity, setPanelCapacity] = useState<number | ''>(10);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // When region changes, reset defaults
  useEffect(() => {
    const r = REGIONS[regionKey];
    setMonthlyBill(r.elecRate > 1 ? 3000 : 150);
    setSystemCost(r.elecRate > 1 ? 350000 : 15000);
  }, [regionKey]);

  const calculate = () => {
    if (!monthlyBill || !roofArea || !systemCost) return null;

    // Solar capacity from roof (≈ 10 W/ft² or 100 W/m² usable)
    const maxPanels = Math.floor((roofArea as number) / 2); // ~2 m² per panel
    const systemKw = (maxPanels * panelWp) / 1000;
    const sunHours = region.avgSunHours;

    // Energy production: E = P × h × 365 × η (system efficiency ~0.80)
    const eta = 0.80;
    const annualKwh = systemKw * sunHours * 365 * eta;

    // Financial
    const annualSavings = annualKwh * region.elecRate;
    const paybackYears = (systemCost as number) / annualSavings;
    const roi25 = (annualSavings * 25 - (systemCost as number)) / (systemCost as number) * 100;

    // Environmental
    const co2Saved = annualKwh * region.gridEmission; // kg CO₂/yr
    const treesEquiv = Math.round(co2Saved / 22); // ~22 kg CO₂ per tree per year

    // Safety check
    const totalLoadKw = (existingLoad as number || 0) + systemKw;
    const panelCap = panelCapacity as number || 10;
    const panelSafe = totalLoadKw <= panelCap * 0.8;

    return {
      systemKw: systemKw.toFixed(1),
      maxPanels,
      annualKwh: Math.round(annualKwh),
      annualSavings: Math.round(annualSavings),
      paybackYears: paybackYears.toFixed(1),
      roi25: roi25.toFixed(0),
      co2Saved: Math.round(co2Saved),
      treesEquiv,
      panelSafe,
      totalLoadKw: totalLoadKw.toFixed(1),
      panelCap,
      eta,
    };
  };

  const results = showResults ? calculate() : null;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I calculate solar panel ROI?', acceptedAnswer: { '@type': 'Answer', text: 'Solar ROI is calculated as: Annual Savings = System kW × Sun Hours × 365 × η × Electricity Rate. Payback Period = System Cost ÷ Annual Savings. A typical residential system pays for itself in 5-8 years.' } },
      { '@type': 'Question', name: 'Is my home wiring ready for solar panels?', acceptedAnswer: { '@type': 'Answer', text: 'Your electrical panel must have enough capacity to handle the back-feed from solar inverters. As per NEC 705 and IEC 62446, the total load plus solar should not exceed 80% of your panel rating.' } },
      { '@type': 'Question', name: 'How much CO₂ do solar panels save?', acceptedAnswer: { '@type': 'Answer', text: 'CO₂ savings depend on your grid\'s emission factor. In India (~0.82 kg/kWh), a 5kW system saves approximately 6,000 kg CO₂/year. In the UK (~0.23 kg/kWh), the same system saves about 1,700 kg CO₂/year.' } },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Solar ROI Calculator & Panel Ready Check"
        description="Calculate your solar panel return on investment, payback period, CO₂ savings, and check if your home's electrical panel is ready for solar. Free, globally applicable."
        path="/solar-roi"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Sun className="w-4 h-4" /> Solar Calculator
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          Solar ROI & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">"Ready Check"</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Should you go solar? Calculate your <strong>payback period</strong>, annual savings, and check if your home's electrical panel can safely handle solar back-feed.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> Based on IEC 62446 · NEC 690 · IS 732
        </div>
      </motion.div>

      {/* Region Selector */}
      <motion.div className="flex justify-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="inline-flex gap-1 bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-xl p-1">
          {Object.entries(REGIONS).map(([key, r]) => (
            <button key={key} onClick={() => { setRegionKey(key); setShowResults(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${regionKey === key ? 'bg-white dark:bg-gray-900 dark:bg-gray-900 shadow text-amber-700' : 'text-slate-500 dark:text-gray-400 dark:text-gray-400 hover:text-slate-700 dark:text-gray-300 dark:text-gray-300'}`}>
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-xl font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" /> Your Details
          </h2>

          <div className="space-y-5">
            {/* Monthly bill */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Monthly Electricity Bill ({region.symbol})</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-medium" placeholder={`e.g. ${region.elecRate > 1 ? '3000' : '150'}`} value={monthlyBill} onChange={e => setMonthlyBill(e.target.value === '' ? '' : Number(e.target.value))} />
              <p className="text-xs text-slate-400 mt-1">Average monthly electricity cost</p>
            </div>

            {/* Roof area */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Available Roof Area (m²)</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-medium" placeholder="e.g. 30" value={roofArea} onChange={e => setRoofArea(e.target.value === '' ? '' : Number(e.target.value))} />
              <p className="text-xs text-slate-400 mt-1">Unshaded, south-facing roof area · 1 panel ≈ 2 m²</p>
            </div>

            {/* Panel wattage */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Panel Wattage (Wp)</label>
              <select className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-medium appearance-none" value={panelWp} onChange={e => setPanelWp(Number(e.target.value))}>
                <option value={330}>330 Wp (Budget)</option>
                <option value={400}>400 Wp (Standard)</option>
                <option value={450}>450 Wp (Premium)</option>
                <option value={550}>550 Wp (High Efficiency)</option>
              </select>
            </div>

            {/* System cost */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Total System Cost ({region.symbol})</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-medium" placeholder="Including installation" value={systemCost} onChange={e => setSystemCost(e.target.value === '' ? '' : Number(e.target.value))} />
            </div>

            {/* Safety inputs */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Panel Safety Check</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-blue-700 font-medium block mb-1">Existing Load (kW)</label>
                  <input type="number" className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none" value={existingLoad} onChange={e => setExistingLoad(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-xs text-blue-700 font-medium block mb-1">Panel Capacity (kW)</label>
                  <input type="number" className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none" value={panelCapacity} onChange={e => setPanelCapacity(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
              </div>
            </div>

            <button onClick={() => setShowResults(true)}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" /> Calculate Solar ROI
            </button>
          </div>
        </motion.div>

        {/* Results Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                {/* ROI Card */}
                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden mb-6">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-400" /> Your Solar Returns
                  </h2>

                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    {/* System Size */}
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                      <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">System Size</div>
                      <div className="text-3xl font-extrabold text-white"><AnimatedNumber value={parseFloat(results.systemKw)} decimals={1} suffix=" kW" /></div>
                      <p className="text-slate-400 text-xs mt-1">{results.maxPanels} panels × {panelWp} Wp</p>
                    </div>

                    {/* Annual Production */}
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                      <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Annual Energy</div>
                      <div className="text-3xl font-extrabold text-white"><AnimatedNumber value={results.annualKwh} suffix=" kWh" /></div>
                      <p className="text-slate-400 text-xs mt-1">E = P × h × 365 × η</p>
                    </div>

                    {/* Annual Savings */}
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                      <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Annual Savings</div>
                      <div className="text-3xl font-extrabold text-white"><AnimatedNumber value={results.annualSavings} prefix={region.symbol} /></div>
                      <p className="text-slate-400 text-xs mt-1">Savings = E × rate</p>
                    </div>

                    {/* Payback */}
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                      <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Payback Period</div>
                      <div className="text-3xl font-extrabold text-white"><AnimatedNumber value={parseFloat(results.paybackYears)} decimals={1} suffix=" yrs" /></div>
                      <p className="text-slate-400 text-xs mt-1">T = Cost ÷ Savings</p>
                    </div>
                  </div>

                  {/* 25-year ROI bar */}
                  <div className="mt-6 relative z-10">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>25-Year ROI</span>
                      <span className="text-green-400 font-bold">+{results.roi25}%</span>
                    </div>
                    <div className="w-full h-3 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min(parseFloat(results.roi25) / 5, 100)}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />
                    </div>
                  </div>
                </div>

                {/* Environmental Card */}
                <motion.div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2"><Leaf className="w-5 h-5" /> Environmental Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-extrabold text-emerald-700"><AnimatedNumber value={results.co2Saved} suffix=" kg" /></div>
                      <p className="text-xs text-emerald-600">CO₂ saved per year · Grid factor: {region.gridEmission} kg/kWh</p>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-emerald-700">≈ <AnimatedNumber value={results.treesEquiv} /> 🌳</div>
                      <p className="text-xs text-emerald-600">Equivalent trees planted per year</p>
                    </div>
                  </div>
                </motion.div>

                {/* Safety Check Card */}
                <motion.div className={`border rounded-3xl p-6 ${results.panelSafe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <h3 className={`font-bold mb-3 flex items-center gap-2 ${results.panelSafe ? 'text-green-900' : 'text-red-900'}`}>
                    {results.panelSafe ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    Panel Safety: {results.panelSafe ? '✅ Ready for Solar' : '⚠️ Panel Upgrade Needed'}
                  </h3>
                  <p className={`text-sm ${results.panelSafe ? 'text-green-700' : 'text-red-700'}`}>
                    Total projected load: <strong>{results.totalLoadKw} kW</strong> on a <strong>{results.panelCap} kW</strong> panel.
                    {results.panelSafe
                      ? ` Within the 80% safety threshold per NEC 705 & IEC 62446.`
                      : ` Exceeds the 80% safety limit (NEC 705). You need a panel upgrade before solar installation.`
                    }
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 mt-2">Rule: Total Load + Solar ≤ 80% × Panel Rating</p>
                </motion.div>

                {/* Formula Reference */}
                <motion.div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">Formulas Used</h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400 font-mono">
                    <p>E = P<sub>kW</sub> × h<sub>sun</sub> × 365 × η &nbsp;&nbsp; <span className="text-slate-400">(η = {results.eta})</span></p>
                    <p>Savings = E × rate<sub>elec</sub></p>
                    <p>T<sub>payback</sub> = Cost<sub>system</sub> ÷ Savings<sub>annual</sub></p>
                    <p>CO₂ = E × EF<sub>grid</sub> &nbsp;&nbsp; <span className="text-slate-400">(EF = {region.gridEmission} kg/kWh)</span></p>
                  </div>
                </motion.div>

                <button onClick={() => { setShowResults(false); window.scrollTo(0, 0); }}
                  className="mt-6 w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Recalculate
                </button>
              </motion.div>
            ) : (
              <motion.div key="placeholder" className="bg-slate-900 rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <Sun className="w-16 h-16 text-amber-500/50 mb-6 animate-pulse" />
                <p className="text-slate-400 text-center font-medium text-lg">Enter your details to calculate<br />your solar investment returns</p>
                <div className="mt-6 text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 font-mono text-center space-y-1">
                  <p>ROI = (Savings × 25 − Cost) ÷ Cost × 100</p>
                  <p>T<sub>payback</sub> = Cost ÷ Savings<sub>annual</sub></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RelatedTools currentPath="/solar-roi" count={3} />
    </div>
  );
};
