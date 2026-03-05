import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Plus, Trash2, AlertTriangle, ShieldCheck, Info, RotateCcw, Zap, Check } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

// ── Device Library ──────────────────────────────────────────
interface WFHDevice { name: string; watts: number; category: string; }

const DEVICE_LIBRARY: WFHDevice[] = [
  // Monitors
  { name: '24" Monitor (60W)', watts: 60, category: 'Display' },
  { name: '27" Monitor (80W)', watts: 80, category: 'Display' },
  { name: '32" 4K Monitor (100W)', watts: 100, category: 'Display' },
  { name: '34" Ultrawide (110W)', watts: 110, category: 'Display' },
  // Computing
  { name: 'Laptop (charging)', watts: 65, category: 'Computing' },
  { name: 'Gaming Laptop', watts: 180, category: 'Computing' },
  { name: 'Desktop PC (standard)', watts: 250, category: 'Computing' },
  { name: 'Desktop PC (gaming)', watts: 500, category: 'Computing' },
  { name: 'Mac Mini / NUC', watts: 85, category: 'Computing' },
  // Peripherals
  { name: 'USB Dock / Hub', watts: 15, category: 'Peripherals' },
  { name: 'External HDD/SSD', watts: 10, category: 'Peripherals' },
  { name: 'Webcam + Ring Light', watts: 25, category: 'Peripherals' },
  { name: 'Laser Printer', watts: 600, category: 'Peripherals' },
  { name: 'Inkjet Printer', watts: 30, category: 'Peripherals' },
  { name: 'Speaker System', watts: 30, category: 'Peripherals' },
  // Comfort
  { name: 'Desk Fan', watts: 40, category: 'Comfort' },
  { name: 'Space Heater (small)', watts: 750, category: 'Comfort' },
  { name: 'Space Heater (large)', watts: 1500, category: 'Comfort' },
  { name: 'Desk Lamp (LED)', watts: 10, category: 'Comfort' },
  { name: 'Air Purifier', watts: 50, category: 'Comfort' },
  // UPS
  { name: 'UPS 600VA', watts: 360, category: 'Power' },
  { name: 'UPS 1000VA', watts: 600, category: 'Power' },
  { name: 'UPS 1500VA', watts: 900, category: 'Power' },
  { name: 'Power Strip (surge)', watts: 0, category: 'Power' },
  // Network
  { name: 'WiFi Router', watts: 12, category: 'Network' },
  { name: 'Mesh WiFi Node', watts: 8, category: 'Network' },
  { name: 'Network Switch', watts: 15, category: 'Network' },
];

import { useCurrencyStore } from '../store/currencyStore';

// ── Region mapping based on Currency ────────────────────────
const getRegionFromCurrency = (currCode: string) => {
  switch (currCode) {
    case 'USD': case 'CAD': return { voltage: 120, circuitAmps: 15, standard: 'NEC 210.23(a)' };
    case 'GBP': return { voltage: 230, circuitAmps: 13, standard: 'BS 1363 / BS 7671' };
    case 'EUR': return { voltage: 230, circuitAmps: 16, standard: 'IEC 60884' };
    case 'AUD': return { voltage: 230, circuitAmps: 10, standard: 'AS/NZS 3112' };
    case 'INR': return { voltage: 230, circuitAmps: 16, standard: 'IS 732 / IEC 60884' };
    case 'JPY': return { voltage: 100, circuitAmps: 15, standard: 'JIS C 8303' };
    default: return { voltage: 230, circuitAmps: 13, standard: 'IEC 60884' }; // default 230V system
  }
};

// Animated number
const AnimN: React.FC<{ value: number; suffix?: string; decimals?: number }> = ({ value, suffix = '', decimals = 0 }) => {
  const [d, setD] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const s = d, e = value, dur = 1000, st = performance.now();
    const fn = (n: number) => { const p = Math.min((n - st) / dur, 1); setD(s + (e - s) * (1 - Math.pow(1 - p, 3))); if (p < 1) ref.current = requestAnimationFrame(fn); };
    ref.current = requestAnimationFrame(fn);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);
  return <span>{d.toFixed(decimals)}{suffix}</span>;
};

// ── Component ───────────────────────────────────────────────
interface AddedDev { device: WFHDevice; qty: number; }

export const WFHLoadAudit: React.FC = () => {
  const { currency } = useCurrencyStore();
  const region = getRegionFromCurrency(currency.code);
  const [added, setAdded] = useState<AddedDev[]>([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const addDevice = (dev: WFHDevice) => {
    setAdded(prev => {
      const idx = prev.findIndex(a => a.device.name === dev.name);
      if (idx >= 0) { const n = [...prev]; n[idx].qty += 1; return n; }
      return [...prev, { device: dev, qty: 1 }];
    });
  };
  const removeDevice = (idx: number) => setAdded(prev => prev.filter((_, i) => i !== idx));
  const updateQty = (idx: number, qty: number) => { const n = [...added]; n[idx].qty = Math.max(1, qty); setAdded(n); };

  // Calculate in real time
  const totalWatts = added.reduce((sum, a) => sum + a.device.watts * a.qty, 0);
  const circuitCapacity = region.voltage * region.circuitAmps;
  const usagePercent = (totalWatts / circuitCapacity) * 100;
  const isOverloaded = usagePercent > 80;
  const isCritical = usagePercent > 100;
  const currentDraw = totalWatts / region.voltage;

  const categories = [...new Set(DEVICE_LIBRARY.map(d => d.category))];

  const getStatusColor = () => {
    if (isCritical) return { bg: 'from-red-500 to-red-700', label: 'OVERLOADED', color: 'text-red-500' };
    if (isOverloaded) return { bg: 'from-orange-400 to-red-500', label: 'WARNING: >80%', color: 'text-orange-500' };
    if (usagePercent > 50) return { bg: 'from-yellow-400 to-orange-400', label: 'MODERATE', color: 'text-yellow-500' };
    return { bg: 'from-green-400 to-emerald-400', label: 'SAFE', color: 'text-green-500' };
  };
  const status = getStatusColor();

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How much power does a home office use?', acceptedAnswer: { '@type': 'Answer', text: 'A typical home office with a laptop, monitor, and peripherals uses 150-300W. Adding a space heater (1500W) or laser printer (600W peak) can easily overload a bedroom circuit. Our WFH Load Auditor calculates your exact usage.' } },
      { '@type': 'Question', name: 'Can I overload a bedroom circuit with work-from-home equipment?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most bedroom circuits are rated for 15A (USA) or 16A (UK/EU/India). NEC 210.23 limits a 15A circuit to 1,800W total. A desktop PC + monitors + heater can exceed this easily.' } },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Work-From-Home Load Auditor — Home Office Circuit Check"
        description="Check if your home office is overloading your bedroom circuit. Calculate total power draw from monitors, PCs, heaters, and UPS systems. Based on NEC and IEC standards."
        path="/wfh-load-audit"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Monitor className="w-4 h-4" /> Home Office Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          WFH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">Load Auditor</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Is your home office a <strong>fire hazard</strong>? Most bedroom circuits weren't designed for dual monitors, gaming PCs and space heaters.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> {region.standard} · {region.voltage}V / {region.circuitAmps}A circuit
        </div>
      </motion.div>

      {/* Global Currency applies; removed local Region Selector */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Device Library */}
        <motion.div className="lg:col-span-2 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800 h-fit" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">Add Office Equipment</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {categories.map(cat => (
              <div key={cat}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{cat}</p>
                <div className="space-y-1.5">
                  {DEVICE_LIBRARY.filter(d => d.category === cat).map(dev => (
                    <button key={dev.name} onClick={() => addDevice(dev)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 hover:bg-indigo-50 border border-slate-100 dark:border-gray-800 dark:border-gray-800 hover:border-indigo-200 rounded-xl transition-all text-left group">
                      <Zap className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{dev.name}</p>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{dev.watts}W</span>
                      <Plus className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Load Meter + Devices */}
        <div className="lg:col-span-3 space-y-6">
          {/* Live Circuit Meter */}
          <motion.div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-white font-bold text-lg mb-2 relative z-10 flex items-center gap-2">
              <Zap className={`w-5 h-5 ${status.color}`} /> Circuit Load — Live
            </h3>
            <p className="text-xs text-slate-400 mb-6 relative z-10">Circuit: {region.voltage}V × {region.circuitAmps}A = {circuitCapacity}W capacity</p>

            {/* Gauge */}
            <div className="relative z-10 mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>0W</span>
                <span>{Math.round(circuitCapacity * 0.8)}W (80%)</span>
                <span>{circuitCapacity}W</span>
              </div>
              <div className="w-full h-6 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden relative">
                {/* 80% warning line */}
                <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-yellow-400/50 z-10" />
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${status.bg}`}
                  animate={{ width: `${Math.min(usagePercent, 100)}%` }} transition={{ type: 'spring', stiffness: 100 }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 relative z-10">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-white"><AnimN value={totalWatts} suffix="W" /></div>
                <p className="text-[10px] text-slate-400">P<sub>total</sub> = Σ(P<sub>i</sub> × n<sub>i</sub>)</p>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-extrabold ${status.color}`}><AnimN value={usagePercent} decimals={1} suffix="%" /></div>
                <p className="text-[10px] text-slate-400">% = P ÷ (V × I) × 100</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-white"><AnimN value={currentDraw} decimals={1} suffix="A" /></div>
                <p className="text-[10px] text-slate-400">I = P ÷ V</p>
              </div>
            </div>

            {/* Status banner */}
            {totalWatts > 0 && (
              <motion.div className={`mt-5 rounded-xl p-3 text-center relative z-10 ${isCritical ? 'bg-red-500/20 border border-red-500/30' : isOverloaded ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-green-500/20 border border-green-500/30'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className={`text-sm font-bold ${isCritical ? 'text-red-400' : isOverloaded ? 'text-orange-400' : 'text-green-400'}`}>
                  {isCritical ? '🔥 CIRCUIT OVERLOADED — Breaker will trip. Reduce load or upgrade circuit.' :
                   isOverloaded ? '⚠️ Above 80% — NEC recommends max 80% continuous load. Risk of overheating.' :
                   '✅ Within safe limits for continuous use.'}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Selected Devices */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800">
            <h3 className="font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">Your Setup ({added.length} devices)</h3>
            {added.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Monitor className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Add your WFH equipment from the library</p>
              </div>
            ) : (
              <div className="space-y-2">
                {added.map((a, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl px-4 py-3">
                    <Zap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{a.device.name}</p>
                      <p className="text-[10px] text-slate-400">{a.device.watts}W × {a.qty} = {a.device.watts * a.qty}W</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button onClick={() => updateQty(idx, Math.max(1, a.qty - 1))} className="w-6 h-6 border border-slate-200 dark:border-gray-700 rounded text-slate-500">-</button>
                      <span className="w-4 text-center text-sm font-bold">{a.qty}</span>
                      <button onClick={() => updateQty(idx, a.qty + 1)} className="w-6 h-6 border border-slate-200 dark:border-gray-700 rounded text-slate-500">+</button>
                    </div>
                    <button onClick={() => removeDevice(idx)} className="text-slate-300 hover:text-red-500 transition ml-2"><Trash2 className="w-4 h-4" /></button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Safety Tips */}
          {totalWatts > 0 && (
            <motion.div className="bg-blue-50 border border-blue-200 rounded-3xl p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Safety Recommendations</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                {isOverloaded && <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /> Move the space heater to a <strong>different circuit</strong> — never on same circuit as PC</li>}
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> Use a <strong>surge protector</strong>, not a plain power strip, for electronics</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> Plug space heaters <strong>directly into wall outlets</strong> — never through extension cords</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> Don't daisy-chain power strips — each creates additional resistance</li>
                {currentDraw > region.circuitAmps * 0.6 && <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /> Consider a <strong>dedicated 20A circuit</strong> for your home office (per {region.standard})</li>}
              </ul>
            </motion.div>
          )}

          {/* Formulas Transparency */}
          <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wider mb-3">Mathematical Breakdown</h4>
            <p className="text-xs font-medium text-slate-500 mb-4 pb-2 border-b border-slate-200 dark:border-gray-700">Displaying transparent calculations according to {region.standard}.</p>
            <div className="space-y-3 text-sm text-slate-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 rounded-xl p-4 shadow-inner">
              <div>
                <span className="text-slate-400">Step 1: Total Power Draw</span><br/>
                <span className="text-indigo-600 dark:text-indigo-400">P<sub>total</sub> = Σ(Watts × Qty) = {totalWatts} W</span>
              </div>
              <div>
                <span className="text-slate-400">Step 2: Circuit Capacity</span><br/>
                <span className="text-indigo-600 dark:text-indigo-400">P<sub>max</sub> = {region.voltage}V × {region.circuitAmps}A = {circuitCapacity} W</span>
              </div>
              <div>
                <span className="text-slate-400">Step 3: Load Percentage</span><br/>
                <span className="text-indigo-600 dark:text-indigo-400">Load = ({totalWatts} W ÷ {circuitCapacity} W) × 100 = {usagePercent.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/wfh-load-audit" count={3} />
    </div>
  );
};
