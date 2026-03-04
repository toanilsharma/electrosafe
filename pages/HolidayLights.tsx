import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Minus, AlertTriangle, ShieldCheck, Info, RotateCcw, Zap, CheckCircle2 } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

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

// ── Regions ─────────────────────────────────────────────────
interface RegionProfile { voltage: number; circuitAmps: number; standard: string; label: string; }
const REGIONS: Record<string, RegionProfile> = {
  US: { voltage: 120, circuitAmps: 15, standard: 'NEC 210.23 · UL 588', label: 'USA (120V)' },
  CA: { voltage: 120, circuitAmps: 15, standard: 'CSA C22.1 · UL 588', label: 'Canada (120V)' },
  GB: { voltage: 230, circuitAmps: 13, standard: 'BS 1363 · BS EN 60598', label: 'UK (230V)' },
  EU: { voltage: 230, circuitAmps: 16, standard: 'IEC 60598 · EN 60598', label: 'Europe (230V)' },
  AU: { voltage: 230, circuitAmps: 10, standard: 'AS/NZS 60598', label: 'Australia (230V)' },
  IN: { voltage: 230, circuitAmps: 16, standard: 'IS 10322 · IEC 60598', label: 'India (230V)' },
};

function detectRegion(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'IN';
    if (tz.startsWith('America/Toronto') || tz.startsWith('America/Vancouver')) return 'CA';
    if (tz.startsWith('America/')) return 'US';
    if (tz.startsWith('Europe/London')) return 'GB';
    if (tz.startsWith('Europe/')) return 'EU';
    if (tz.startsWith('Australia/')) return 'AU';
  } catch {}
  return 'US';
}

// ── Component ───────────────────────────────────────────────
interface AddedLight { type: LightType; qty: number; }

export const HolidayLights: React.FC = () => {
  const [regionKey, setRegionKey] = useState(detectRegion);
  const region = REGIONS[regionKey];
  const [added, setAdded] = useState<AddedLight[]>([]);
  const [otherLoad, setOtherLoad] = useState<number | ''>(200); // W for other devices on circuit

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const addLight = (lt: LightType) => {
    setAdded(prev => {
      const idx = prev.findIndex(a => a.type.label === lt.label);
      if (idx >= 0) { const n = [...prev]; n[idx].qty += 1; return n; }
      return [...prev, { type: lt, qty: 1 }];
    });
  };
  const removeLight = (idx: number) => setAdded(prev => prev.filter((_, i) => i !== idx));
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
  const circuitCapacity = region.voltage * region.circuitAmps;
  const safeCapacity = circuitCapacity * 0.8; // NEC 80% rule
  const usagePercent = (totalWatts / circuitCapacity) * 100;
  const remainingW = Math.max(0, safeCapacity - totalWatts);
  const isOverloaded = totalWatts > safeCapacity;
  const isCritical = totalWatts > circuitCapacity;

  // How many more strings of the most common LED type can fit
  const ledMiniW = 4.8;
  const moreStrings = Math.floor(remainingW / ledMiniW);

  // Total bulb count
  const totalBulbs = added.reduce((s, a) => s + a.type.bulbCount * a.qty, 0);

  // Incandescent warning
  const hasIncandescent = added.some(a => a.type.type === 'incandescent');

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many Christmas light strings can I connect together?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on type and circuit capacity. On a standard 15A/120V circuit (1,800W capacity, 1,440W safe limit per NEC 80% rule), you can safely run up to 300 strings of LED mini lights (4.8W each) or only 8 strings of incandescent C9s (175W each). Always leave headroom for other devices on the circuit.' } },
      { '@type': 'Question', name: 'Are LED Christmas lights safer than incandescent?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LED holiday lights use 80-90% less power, generate almost no heat, and are rated to UL 588. Incandescent lights generate significant heat that can ignite dry trees and overload circuits much faster.' } },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Holiday Lights Safety Planner — Circuit Load Calculator"
        description="Calculate how many holiday light strings your circuit can handle. LED vs incandescent comparison, fire safety tips, and maximum capacity calculator. Based on UL 588 and NEC."
        path="/holiday-lights"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" /> Seasonal Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          Holiday Lights <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500">Safety Planner</span> 🎄
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          How many strings can you hang before your fuses pop? Find out how much capacity your outdoor circuit really has.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> {region.standard}
        </div>
      </motion.div>

      {/* Region */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex gap-1 bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-xl p-1 flex-wrap justify-center">
          {Object.entries(REGIONS).map(([key, r]) => (
            <button key={key} onClick={() => setRegionKey(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${regionKey === key ? 'bg-white dark:bg-gray-900 dark:bg-gray-900 shadow text-red-700' : 'text-slate-500 dark:text-gray-400 dark:text-gray-400 hover:text-slate-700 dark:text-gray-300 dark:text-gray-300'}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Light Types */}
        <motion.div className="lg:col-span-2 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800 h-fit" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">Add Your Lights</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {/* LEDs */}
            <p className="text-xs font-bold text-green-600 uppercase tracking-wider">LED (Recommended)</p>
            <div className="space-y-1.5">
              {LIGHT_TYPES.filter(l => l.type === 'led').map(lt => (
                <button key={lt.label} onClick={() => addLight(lt)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-green-50 hover:bg-green-100 border border-green-100 hover:border-green-200 rounded-xl transition-all text-left group">
                  <Sparkles className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{lt.label}</p>
                  </div>
                  <span className="text-xs text-green-600 font-mono font-bold">{lt.wattsPerString}W</span>
                  <Plus className="w-4 h-4 text-green-300 group-hover:text-green-600 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Incandescent */}
            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mt-4">Incandescent ⚠️</p>
            <div className="space-y-1.5">
              {LIGHT_TYPES.filter(l => l.type === 'incandescent').map(lt => (
                <button key={lt.label} onClick={() => addLight(lt)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-orange-50 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 rounded-xl transition-all text-left group">
                  <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{lt.label}</p>
                  </div>
                  <span className="text-xs text-orange-600 font-mono font-bold">{lt.wattsPerString}W</span>
                  <Plus className="w-4 h-4 text-orange-300 group-hover:text-orange-600 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Live Circuit Gauge */}
          <motion.div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-white font-bold text-lg mb-2 relative z-10 flex items-center gap-2">
              <Zap className={`w-5 h-5 ${isCritical ? 'text-red-500 animate-pulse' : isOverloaded ? 'text-orange-500' : 'text-green-500'}`} /> Circuit Load — Live
            </h3>
            <p className="text-xs text-slate-400 mb-6 relative z-10">{region.voltage}V × {region.circuitAmps}A = {circuitCapacity}W · Safe limit (80%): {Math.round(safeCapacity)}W</p>

            {/* Gauge bar */}
            <div className="relative z-10 mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>0W</span>
                <span>{Math.round(safeCapacity)}W (80%)</span>
                <span>{circuitCapacity}W</span>
              </div>
              <div className="w-full h-6 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden relative">
                <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-yellow-400/50 z-10" />
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${isCritical ? 'from-red-500 to-red-700' : isOverloaded ? 'from-orange-400 to-red-500' : 'from-green-400 to-emerald-400'}`}
                  animate={{ width: `${Math.min(usagePercent, 100)}%` }} transition={{ type: 'spring', stiffness: 100 }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 relative z-10">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-white"><AnimN value={totalWatts} suffix="W" /></div>
                <p className="text-[10px] text-slate-400">P<sub>total</sub></p>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-extrabold ${isCritical ? 'text-red-500' : isOverloaded ? 'text-orange-500' : 'text-green-500'}`}>
                  <AnimN value={usagePercent} decimals={1} suffix="%" />
                </div>
                <p className="text-[10px] text-slate-400">of circuit</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-green-400">{remainingW > 0 ? <AnimN value={remainingW} suffix="W" /> : <span className="text-red-400">0W</span>}</div>
                <p className="text-[10px] text-slate-400">remaining</p>
              </div>
            </div>

            {/* Status + Max strings */}
            <motion.div className={`mt-5 rounded-xl p-3 text-center relative z-10 ${isCritical ? 'bg-red-500/20 border border-red-500/30' : isOverloaded ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-green-500/20 border border-green-500/30'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {isCritical ? (
                <p className="text-red-400 text-sm font-bold">🔥 OVERLOADED! Remove lights or use a separate circuit.</p>
              ) : isOverloaded ? (
                <p className="text-orange-400 text-sm font-bold">⚠️ Above 80% safe limit. Risk of breaker tripping.</p>
              ) : (
                <p className="text-green-400 text-sm font-bold">✅ You can still add <strong>~{moreStrings}</strong> more LED mini strings!</p>
              )}
            </motion.div>
          </motion.div>

          {/* Selected lights */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800">
            <h3 className="font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" /> Your Display ({totalBulbs.toLocaleString()} bulbs)
            </h3>

            {/* Other load input */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 block mb-1">Other Devices on This Circuit (W)</label>
              <input type="number" min={0} className="w-full border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-400 outline-none" value={otherLoad} onChange={e => setOtherLoad(e.target.value === '' ? '' : Number(e.target.value))} placeholder="e.g. 200 (porch light, timer, outlet)" />
            </div>

            {added.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Add lights from the library to build your display</p>
              </div>
            ) : (
              <div className="space-y-2">
                {added.map((a, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl px-4 py-3">
                    <Sparkles className={`w-4 h-4 flex-shrink-0 ${a.type.type === 'led' ? 'text-green-500' : 'text-orange-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{a.type.label}</p>
                      <p className="text-[10px] text-slate-400">{a.type.wattsPerString}W × {a.qty} = {(a.type.wattsPerString * a.qty).toFixed(1)}W</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(idx, -1)} className="w-7 h-7 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm font-bold">{a.qty}</span>
                      <button onClick={() => updateQty(idx, 1)} className="w-7 h-7 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Incandescent warning */}
          {hasIncandescent && (
            <motion.div className="bg-orange-50 border border-orange-200 rounded-3xl p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Incandescent Warning</h3>
              <p className="text-sm text-orange-700">
                Incandescent holiday lights use <strong>8–30× more power</strong> than LED equivalents and generate significant heat. They are the leading cause of holiday decoration fires. Switch to LED to dramatically reduce load and fire risk.
              </p>
            </motion.div>
          )}

          {/* Safety tips */}
          <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Holiday Light Safety</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Use only lights rated UL 588 or equivalent (CE/ISI mark)</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Outdoor lights must be rated "outdoor use" — indoor lights can short in rain</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Use GFCI-protected outdoor outlets — prevents shock hazards</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Don't connect more than 3 strings end-to-end (manufacturer limit)</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Use outdoor-rated extension cords — never indoor cords outside</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Turn off all lights before bed or leaving — use a timer</li>
            </ul>
          </div>

          {/* Formulas */}
          <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">Formulas Used</h4>
            <div className="space-y-2 text-sm text-slate-600 dark:text-gray-400 dark:text-gray-400 font-mono">
              <p>P<sub>total</sub> = Σ(W<sub>string</sub> × n) + P<sub>other</sub></p>
              <p>Load% = P<sub>total</sub> ÷ (V × I<sub>breaker</sub>) × 100</p>
              <p>P<sub>safe</sub> = V × I<sub>breaker</sub> × 0.8</p>
              <p>Max strings = (P<sub>safe</sub> − P<sub>other</sub>) ÷ W<sub>string</sub></p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/holiday-lights" count={3} />
    </div>
  );
};
