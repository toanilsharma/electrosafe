import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Zap, Fuel, DollarSign, Leaf, Info, RotateCcw, TrendingDown } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

// ── Region & Defaults ────────────────────────────────────────
interface RegionProfile {
  currency: string; symbol: string; label: string;
  elecRate: number; petrolPrice: number; publicChargeRate: number;
  distanceUnit: string; volumeUnit: string; efficiencyUnit: string;
  co2Petrol: number; co2Grid: number;
}

const REGIONS: Record<string, RegionProfile> = {
  IN: { currency: 'INR', symbol: '₹', label: 'India', elecRate: 8, petrolPrice: 105, publicChargeRate: 18, distanceUnit: 'km', volumeUnit: 'L', efficiencyUnit: 'Wh/km', co2Petrol: 2.31, co2Grid: 0.82 },
  US: { currency: 'USD', symbol: '$', label: 'USA', elecRate: 0.16, petrolPrice: 3.50, publicChargeRate: 0.40, distanceUnit: 'mi', volumeUnit: 'gal', efficiencyUnit: 'Wh/mi', co2Petrol: 8.89, co2Grid: 0.42 },
  GB: { currency: 'GBP', symbol: '£', label: 'UK', elecRate: 0.34, petrolPrice: 1.50, publicChargeRate: 0.60, distanceUnit: 'mi', volumeUnit: 'L', efficiencyUnit: 'Wh/mi', co2Petrol: 2.31, co2Grid: 0.23 },
  EU: { currency: 'EUR', symbol: '€', label: 'Europe', elecRate: 0.25, petrolPrice: 1.80, publicChargeRate: 0.55, distanceUnit: 'km', volumeUnit: 'L', efficiencyUnit: 'Wh/km', co2Petrol: 2.31, co2Grid: 0.30 },
  AU: { currency: 'AUD', symbol: 'A$', label: 'Australia', elecRate: 0.30, petrolPrice: 2.00, publicChargeRate: 0.50, distanceUnit: 'km', volumeUnit: 'L', efficiencyUnit: 'Wh/km', co2Petrol: 2.31, co2Grid: 0.79 },
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

// Animated counter
const AnimCount: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [d, setD] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const s = d, e = value, dur = 1200, st = performance.now();
    const anim = (now: number) => {
      const p = Math.min((now - st) / dur, 1);
      setD(s + (e - s) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) ref.current = requestAnimationFrame(anim);
    };
    ref.current = requestAnimationFrame(anim);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);
  return <span>{prefix}{d.toFixed(decimals)}{suffix}</span>;
};

// ── Main Component ───────────────────────────────────────────
export const EVCostCompare: React.FC = () => {
  const [regionKey, setRegionKey] = useState(detectRegion);
  const region = REGIONS[regionKey];

  const [dailyDist, setDailyDist] = useState<number | ''>(50);
  const [evEfficiency, setEvEfficiency] = useState<number | ''>(150); // Wh/km or Wh/mi
  const [elecRate, setElecRate] = useState<number | ''>(region.elecRate);
  const [petrolPrice, setPetrolPrice] = useState<number | ''>(region.petrolPrice);
  const [petrolEfficiency, setPetrolEfficiency] = useState<number | ''>(regionKey === 'US' ? 30 : 15); // mpg or km/L
  const [publicRate, setPublicRate] = useState<number | ''>(region.publicChargeRate);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const r = REGIONS[regionKey];
    setElecRate(r.elecRate);
    setPetrolPrice(r.petrolPrice);
    setPublicRate(r.publicChargeRate);
    setPetrolEfficiency(regionKey === 'US' ? 30 : 15);
    setShowResults(false);
  }, [regionKey]);

  const calculate = () => {
    if (!dailyDist || !evEfficiency || !elecRate || !petrolPrice || !petrolEfficiency || !publicRate) return null;

    const d = dailyDist as number;
    const eff = evEfficiency as number;
    const rElec = elecRate as number;
    const rPetrol = petrolPrice as number;
    const pEff = petrolEfficiency as number;
    const rPublic = publicRate as number;

    // Daily costs
    // Home EV: Cost = (distance × efficiency_Wh) / 1000 × electricity_rate
    const dailyHome = (d * eff / 1000) * rElec;

    // Public EV: Cost = (distance × efficiency_Wh) / 1000 × public_rate
    const dailyPublic = (d * eff / 1000) * rPublic;

    // Petrol: Cost = (distance / fuel_efficiency) × fuel_price
    // For US: distance_mi / mpg × price_per_gal
    // For others: distance_km / km_per_L × price_per_L
    const dailyPetrol = (d / pEff) * rPetrol;

    const annualHome = dailyHome * 365;
    const annualPublic = dailyPublic * 365;
    const annualPetrol = dailyPetrol * 365;

    const savingsVsPetrol = annualPetrol - annualHome;
    const percentSaved = (savingsVsPetrol / annualPetrol) * 100;

    // CO₂
    const annualKwh = (d * eff / 1000) * 365;
    const co2EV = annualKwh * region.co2Grid;
    const annualFuel = (d / pEff) * 365;
    const co2Petrol = annualFuel * region.co2Petrol;
    const co2Saved = co2Petrol - co2EV;

    // Find max for bar sizing
    const maxCost = Math.max(annualHome, annualPublic, annualPetrol);

    return {
      dailyHome, dailyPublic, dailyPetrol,
      annualHome, annualPublic, annualPetrol,
      savingsVsPetrol, percentSaved,
      co2EV: Math.round(co2EV), co2Petrol: Math.round(co2Petrol), co2Saved: Math.round(co2Saved),
      maxCost,
    };
  };

  const results = showResults ? calculate() : null;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is it cheaper to charge an EV at home or at a public station?', acceptedAnswer: { '@type': 'Answer', text: 'Home charging is typically 2-4× cheaper than public charging. Home electricity rates average $0.16/kWh (US) vs. $0.40+/kWh for public DC fast chargers. Use our calculator to compare exact costs for your situation.' } },
      { '@type': 'Question', name: 'How much money do you save driving an EV vs petrol?', acceptedAnswer: { '@type': 'Answer', text: 'EV owners save 60-80% on fuel costs compared to petrol vehicles. A typical EV costs $0.04/mile to drive vs. $0.12/mile for a petrol car. Annual savings can exceed $1,500-2,000 depending on driving habits.' } },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="EV vs Petrol Cost Calculator — Home Charging Savings"
        description="Compare the cost of home EV charging vs public charging vs petrol/gas. Calculate your annual savings and CO₂ reduction. Free, globally applicable calculator."
        path="/ev-cost-compare"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Car className="w-4 h-4" /> EV Calculator
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          EV Charging <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Cost Comparison</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          How much do you <strong>really</strong> save driving electric? Compare home charging, public stations, and petrol costs side by side.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> Based on SAE J1772 · IEC 61851
        </div>
      </motion.div>

      {/* Region Selector */}
      <motion.div className="flex justify-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="inline-flex gap-1 bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-xl p-1">
          {Object.entries(REGIONS).map(([key, r]) => (
            <button key={key} onClick={() => setRegionKey(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${regionKey === key ? 'bg-white dark:bg-gray-900 dark:bg-gray-900 shadow text-blue-700' : 'text-slate-500 dark:text-gray-400 dark:text-gray-400 hover:text-slate-700 dark:text-gray-300 dark:text-gray-300'}`}>
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" /> Your Driving Profile
          </h2>
          <div className="space-y-5">

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 dark:text-gray-300 mb-1.5">Daily Distance ({region.distanceUnit})</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium" value={dailyDist} onChange={e => setDailyDist(e.target.value === '' ? '' : Number(e.target.value))} />
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
              <p className="text-xs font-bold text-cyan-800 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> EV Parameters</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-cyan-700 font-medium block mb-1">EV Efficiency ({region.efficiencyUnit})</label>
                  <input type="number" className="w-full border border-cyan-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none" value={evEfficiency} onChange={e => setEvEfficiency(e.target.value === '' ? '' : Number(e.target.value))} />
                  <p className="text-[10px] text-cyan-500 mt-0.5">Typical: 130-200 Wh/km · Tesla ≈ 150 · SUV ≈ 200</p>
                </div>
                <div>
                  <label className="text-xs text-cyan-700 font-medium block mb-1">Home Rate ({region.symbol}/kWh)</label>
                  <input type="number" step="0.01" className="w-full border border-cyan-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none" value={elecRate} onChange={e => setElecRate(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-xs text-cyan-700 font-medium block mb-1">Public Charging Rate ({region.symbol}/kWh)</label>
                  <input type="number" step="0.01" className="w-full border border-cyan-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none" value={publicRate} onChange={e => setPublicRate(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> Petrol/Gas Vehicle</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-orange-700 font-medium block mb-1">Fuel Economy ({regionKey === 'US' ? 'mpg' : `${region.distanceUnit}/${region.volumeUnit}`})</label>
                  <input type="number" className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none" value={petrolEfficiency} onChange={e => setPetrolEfficiency(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-xs text-orange-700 font-medium block mb-1">Fuel Price ({region.symbol}/{region.volumeUnit})</label>
                  <input type="number" step="0.01" className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none" value={petrolPrice} onChange={e => setPetrolPrice(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
              </div>
            </div>

            <button onClick={() => setShowResults(true)}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <TrendingDown className="w-5 h-5" /> Compare Costs
            </button>
          </div>
        </motion.div>

        {/* Results Panel */}
        <div>
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-6">

                {/* Cost Comparison Bars */}
                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  <h2 className="text-xl font-bold text-white mb-6 relative z-10">Annual Cost Comparison</h2>

                  <div className="space-y-5 relative z-10">
                    {/* Home Charging */}
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-green-400 font-bold flex items-center gap-1.5"><Zap className="w-4 h-4" /> Home Charging</span>
                        <span className="text-white font-extrabold"><AnimCount value={Math.round(results.annualHome)} prefix={region.symbol} /></span>
                      </div>
                      <div className="h-8 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-end pr-3" initial={{ width: 0 }} animate={{ width: `${(results.annualHome / results.maxCost) * 100}%` }} transition={{ duration: 1, delay: 0.2 }}>
                          <span className="text-[10px] font-bold text-white/80">{region.symbol}{results.dailyHome.toFixed(2)}/day</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Public Charging */}
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-blue-400 font-bold flex items-center gap-1.5"><Zap className="w-4 h-4" /> Public Charging</span>
                        <span className="text-white font-extrabold"><AnimCount value={Math.round(results.annualPublic)} prefix={region.symbol} /></span>
                      </div>
                      <div className="h-8 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-end pr-3" initial={{ width: 0 }} animate={{ width: `${(results.annualPublic / results.maxCost) * 100}%` }} transition={{ duration: 1, delay: 0.4 }}>
                          <span className="text-[10px] font-bold text-white/80">{region.symbol}{results.dailyPublic.toFixed(2)}/day</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Petrol */}
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-orange-400 font-bold flex items-center gap-1.5"><Fuel className="w-4 h-4" /> Petrol / Gas</span>
                        <span className="text-white font-extrabold"><AnimCount value={Math.round(results.annualPetrol)} prefix={region.symbol} /></span>
                      </div>
                      <div className="h-8 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-end pr-3" initial={{ width: 0 }} animate={{ width: `${(results.annualPetrol / results.maxCost) * 100}%` }} transition={{ duration: 1, delay: 0.6 }}>
                          <span className="text-[10px] font-bold text-white/80">{region.symbol}{results.dailyPetrol.toFixed(2)}/day</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Banner */}
                  <motion.div className="mt-6 bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                    <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">You Save With Home Charging</div>
                    <div className="text-3xl font-extrabold text-white"><AnimCount value={Math.round(results.savingsVsPetrol)} prefix={region.symbol} /><span className="text-lg text-green-400">/yr</span></div>
                    <p className="text-green-300/80 text-xs mt-1">That's <strong>{results.percentSaved.toFixed(0)}%</strong> less than petrol</p>
                  </motion.div>
                </div>

                {/* CO₂ Card */}
                <motion.div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2"><Leaf className="w-5 h-5" /> Carbon Footprint</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xl font-extrabold text-emerald-700"><AnimCount value={results.co2EV} /> kg</div>
                      <p className="text-[10px] text-emerald-600 font-medium">EV CO₂/yr</p>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-orange-600"><AnimCount value={results.co2Petrol} /> kg</div>
                      <p className="text-[10px] text-orange-600 font-medium">Petrol CO₂/yr</p>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-green-600">−<AnimCount value={results.co2Saved} /> kg</div>
                      <p className="text-[10px] text-green-600 font-medium">CO₂ Saved/yr</p>
                    </div>
                  </div>
                </motion.div>

                {/* Formulas */}
                <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">Formulas Used</h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400 font-mono">
                    <p>C<sub>home</sub> = (d × ε) ÷ 1000 × r<sub>elec</sub></p>
                    <p>C<sub>petrol</sub> = d ÷ η<sub>fuel</sub> × r<sub>fuel</sub></p>
                    <p>ΔC = C<sub>petrol</sub> − C<sub>home</sub></p>
                    <p>CO₂ = E × EF<sub>source</sub></p>
                  </div>
                </div>

                <button onClick={() => { setShowResults(false); window.scrollTo(0, 0); }}
                  className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Recalculate
                </button>
              </motion.div>
            ) : (
              <motion.div key="placeholder" className="bg-slate-900 rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <Car className="w-16 h-16 text-blue-500/50 mb-6 animate-pulse" />
                <p className="text-slate-400 text-center font-medium text-lg">Enter your driving details to compare<br />EV vs Petrol running costs</p>
                <div className="mt-6 text-xs text-slate-500 dark:text-gray-400 dark:text-gray-400 font-mono text-center space-y-1">
                  <p>C = (d × ε) ÷ 1000 × rate</p>
                  <p>ΔSavings = C<sub>petrol</sub> − C<sub>home</sub></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RelatedTools currentPath="/ev-cost-compare" count={3} />
    </div>
  );
};
