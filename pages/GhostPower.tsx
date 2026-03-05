import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Plus, Trash2, DollarSign, AlertTriangle, Info, RotateCcw, Zap, Wifi, Tv, Monitor, Speaker, Smartphone, Gamepad2 } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

// ── Device Library ──────────────────────────────────────────
interface Device { name: string; standbyW: number; category: string; icon: React.ElementType; }

const DEVICE_LIBRARY: Device[] = [
  { name: 'Smart TV (LED)', standbyW: 1.3, category: 'Entertainment', icon: Tv },
  { name: 'Smart TV (OLED)', standbyW: 0.5, category: 'Entertainment', icon: Tv },
  { name: 'Sound Bar', standbyW: 3.0, category: 'Entertainment', icon: Speaker },
  { name: 'Gaming Console', standbyW: 8.5, category: 'Entertainment', icon: Gamepad2 },
  { name: 'Streaming Stick', standbyW: 2.0, category: 'Entertainment', icon: Tv },
  { name: 'Set-Top Box / DVR', standbyW: 18.0, category: 'Entertainment', icon: Tv },
  { name: 'WiFi Router', standbyW: 6.0, category: 'Network', icon: Wifi },
  { name: 'Mesh WiFi Node', standbyW: 4.5, category: 'Network', icon: Wifi },
  { name: 'Smart Speaker (Alexa/Google)', standbyW: 2.0, category: 'Smart Home', icon: Speaker },
  { name: 'Smart Display', standbyW: 3.5, category: 'Smart Home', icon: Monitor },
  { name: 'Smart Plug × 1', standbyW: 1.0, category: 'Smart Home', icon: Zap },
  { name: 'Smart Light Bulb × 1', standbyW: 0.5, category: 'Smart Home', icon: Zap },
  { name: 'Laptop Charger (plugged, no laptop)', standbyW: 0.5, category: 'Chargers', icon: Monitor },
  { name: 'Phone Charger (no phone)', standbyW: 0.3, category: 'Chargers', icon: Smartphone },
  { name: 'Desktop PC (sleep)', standbyW: 5.0, category: 'Office', icon: Monitor },
  { name: 'Monitor (standby)', standbyW: 1.0, category: 'Office', icon: Monitor },
  { name: 'Laser Printer (sleep)', standbyW: 5.5, category: 'Office', icon: Monitor },
  { name: 'Microwave (clock)', standbyW: 3.0, category: 'Kitchen', icon: Zap },
  { name: 'Coffee Machine (standby)', standbyW: 2.0, category: 'Kitchen', icon: Zap },
  { name: 'Washing Machine (standby)', standbyW: 1.0, category: 'Laundry', icon: Zap },
  { name: 'Air Conditioner (standby)', standbyW: 1.5, category: 'Climate', icon: Zap },
  { name: 'Electric Toothbrush Charger', standbyW: 1.5, category: 'Chargers', icon: Zap },
];

import { useCurrencyStore } from '../store/currencyStore';

// Animated counter
const AnimN: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [d, setD] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const s = d, e = value, dur = 1000, st = performance.now();
    const anim = (n: number) => { const p = Math.min((n - st) / dur, 1); setD(s + (e - s) * (1 - Math.pow(1 - p, 3))); if (p < 1) ref.current = requestAnimationFrame(anim); };
    ref.current = requestAnimationFrame(anim);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);
  return <span>{prefix}{d.toFixed(decimals)}{suffix}</span>;
};

// ── Component ───────────────────────────────────────────────
interface AddedDevice { device: Device; qty: number; hoursOff: number; }

export const GhostPower: React.FC = () => {
  const { currency, format, convert } = useCurrencyStore();
  const [added, setAdded] = useState<AddedDevice[]>([]);
  const [monthlyBill, setMonthlyBill] = useState<number | ''>(Math.round(convert(150)));
  const [showResults, setShowResults] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setMonthlyBill(Math.round(convert(150))); }, [currency.code]);

  const addDevice = (dev: Device) => {
    setAdded(prev => {
      const exists = prev.findIndex(a => a.device.name === dev.name);
      if (exists >= 0) {
        const n = [...prev]; n[exists].qty += 1; return n;
      }
      return [...prev, { device: dev, qty: 1, hoursOff: 16 }];
    });
    setShowResults(false);
  };

  const removeDevice = (idx: number) => { setAdded(prev => prev.filter((_, i) => i !== idx)); setShowResults(false); };
  const updateQty = (idx: number, qty: number) => { const n = [...added]; n[idx].qty = Math.max(1, qty); setAdded(n); setShowResults(false); };
  const updateHours = (idx: number, hrs: number) => { const n = [...added]; n[idx].hoursOff = Math.min(24, Math.max(0, hrs)); setAdded(n); setShowResults(false); };

  const calculate = () => {
    if (added.length === 0) return null;

    const localElecRate = Number(convert(0.16).toFixed(2));

    // P_ghost = Σ(W_standby × qty × hours_off_per_day)
    const dailyWh = added.reduce((sum, a) => sum + (a.device.standbyW * a.qty * a.hoursOff), 0);
    const annualKwh = (dailyWh * 365) / 1000;
    const annualCost = annualKwh * localElecRate;
    const monthlyGhost = annualCost / 12;
    const billPercent = monthlyBill ? (monthlyGhost / (monthlyBill as number)) * 100 : 0;

    // Device breakdown
    const breakdown = added.map(a => ({
      name: a.device.name,
      qty: a.qty,
      dailyWh: a.device.standbyW * a.qty * a.hoursOff,
      annualCost: (a.device.standbyW * a.qty * a.hoursOff * 365 / 1000) * localElecRate,
    })).sort((a, b) => b.annualCost - a.annualCost);

    // Fire risk devices (cheap chargers drawing > 3W standby)
    const fireRisk = added.filter(a => a.device.standbyW >= 5.0).map(a => a.device.name);

    return { dailyWh, annualKwh, annualCost, monthlyGhost, billPercent, breakdown, fireRisk, localElecRate };
  };

  const results = showResults ? calculate() : null;
  const categories = [...new Set(DEVICE_LIBRARY.map(d => d.category))];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How much does standby power cost per year?', acceptedAnswer: { '@type': 'Answer', text: 'The average home wastes 5-10% of its electricity bill on standby (phantom) power. Smart home devices, gaming consoles, and set-top boxes are the worst offenders, consuming 5-18W even when "off".' } },
      { '@type': 'Question', name: 'Which devices use the most standby power?', acceptedAnswer: { '@type': 'Answer', text: 'Set-top boxes/DVRs (18W), gaming consoles (8.5W), desktop PCs in sleep mode (5W), and laser printers (5.5W) are the biggest phantom load offenders according to IEC 62301 measurements.' } },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <SEOHead
        title="Ghost Power Calculator — Standby Energy Cost Finder"
        description="Discover how much your smart home devices cost you in standby 'ghost power'. Calculate phantom loads and annual waste. Free tool based on IEC 62301."
        path="/ghost-power"
        jsonLd={faqSchema}
      />

      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Ghost className="w-4 h-4" /> Phantom Load
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500">"Ghost Power"</span> Standby Finder
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Your devices are silently draining power <strong>even when off</strong>. Find out exactly how much your "smart" home costs in phantom electricity.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Info className="w-3.5 h-3.5" /> Standby values per IEC 62301
        </div>
      </motion.div>

      {/* Global Currency applies; removed local Region Selector */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Device Library (left) */}
        <motion.div className="lg:col-span-2 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800 h-fit" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">Add Your Devices</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {categories.map(cat => (
              <div key={cat}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{cat}</p>
                <div className="space-y-1.5">
                  {DEVICE_LIBRARY.filter(d => d.category === cat).map(dev => {
                    const Icon = dev.icon;
                    return (
                      <button key={dev.name} onClick={() => addDevice(dev)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 hover:bg-purple-50 border border-slate-100 dark:border-gray-800 dark:border-gray-800 hover:border-purple-200 rounded-xl transition-all text-left group">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-purple-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{dev.name}</p>
                          <p className="text-[10px] text-slate-400">{dev.standbyW} W standby</p>
                        </div>
                        <Plus className="w-4 h-4 text-slate-300 group-hover:text-purple-500 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Devices + Results (right) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Selected devices */}
          <motion.div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">Your Devices ({added.length})</h2>
            {added.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Ghost className="w-10 h-10 mx-auto mb-3 animate-pulse opacity-40" />
                <p className="text-sm">Click devices from the library to add them</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {added.map((a, idx) => {
                  const Icon = a.device.icon;
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl px-4 py-3">
                      <Icon className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300 truncate">{a.device.name}</p>
                        <p className="text-[10px] text-slate-400">{a.device.standbyW} W × {a.qty} × {a.hoursOff} h/day</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" min={1} max={20} value={a.qty} onChange={e => updateQty(idx, Number(e.target.value))}
                          className="w-12 text-center text-xs border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-lg py-1 focus:ring-1 focus:ring-purple-400 outline-none" />
                        <input type="number" min={0} max={24} value={a.hoursOff} onChange={e => updateHours(idx, Number(e.target.value))}
                          className="w-14 text-center text-xs border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-lg py-1 focus:ring-1 focus:ring-purple-400 outline-none" title="Hours in standby per day" />
                        <span className="text-[10px] text-slate-400">h</span>
                        <button onClick={() => removeDevice(idx)} className="text-slate-300 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Monthly bill + calculate */}
            <div className="flex items-end gap-3 mt-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 dark:text-gray-400 block mb-1">Monthly Bill ({currency.symbol})</label>
                <input type="number" className="w-full border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-purple-400 outline-none" value={monthlyBill} onChange={e => setMonthlyBill(e.target.value === '' ? '' : Number(e.target.value))} />
              </div>
              <button onClick={() => setShowResults(true)} disabled={added.length === 0}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 disabled:opacity-40 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl">
                Reveal Ghost Cost
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {results && (
              <motion.div key="ghost-results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {/* Ghost Meter */}
                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-52 h-52 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                  <h3 className="text-white font-bold text-lg mb-6 relative z-10 flex items-center gap-2">
                    <Ghost className="w-5 h-5 text-purple-400" /> Your Phantom Load
                  </h3>
                  <div className="grid grid-cols-3 gap-4 relative z-10 mb-6">
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                      <div className="text-purple-400 text-xs font-bold uppercase mb-1">Daily Waste</div>
                      <div className="text-2xl font-extrabold text-white"><AnimN value={results.dailyWh} decimals={0} suffix=" Wh" /></div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                      <div className="text-purple-400 text-xs font-bold uppercase mb-1">Annual Cost</div>
                      <div className="text-2xl font-extrabold text-white">{format(results.annualCost)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                      <div className="text-purple-400 text-xs font-bold uppercase mb-1">% of Bill</div>
                      <div className="text-2xl font-extrabold text-white"><AnimN value={results.billPercent} decimals={1} suffix="%" /></div>
                    </div>
                  </div>

                  {/* Ghost meter bar */}
                  <div className="relative z-10">
                    <div className="flex justify-between text-xs text-slate-400 mb-1"><span>0%</span><span>5%</span><span>10%+</span></div>
                    <div className="w-full h-4 bg-white dark:bg-gray-900 dark:bg-gray-900/10 rounded-full overflow-hidden">
                      <motion.div className={`h-full rounded-full ${results.billPercent > 8 ? 'bg-gradient-to-r from-purple-500 to-red-500' : results.billPercent > 4 ? 'bg-gradient-to-r from-purple-500 to-amber-400' : 'bg-gradient-to-r from-purple-500 to-green-400'}`}
                        initial={{ width: 0 }} animate={{ width: `${Math.min(results.billPercent * 10, 100)}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-800 dark:border-gray-800">
                  <h3 className="font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">Device Breakdown <span className="text-xs text-slate-400 font-normal">(sorted by waste)</span></h3>
                  <div className="space-y-2">
                    {results.breakdown.map((d, i) => (
                      <motion.div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl px-4 py-3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700 dark:text-gray-300 dark:text-gray-300">{d.name} {d.qty > 1 && <span className="text-xs text-slate-400">×{d.qty}</span>}</p>
                          <p className="text-[10px] text-slate-400">{d.dailyWh.toFixed(0)} Wh/day standby</p>
                        </div>
                        <span className="text-sm font-bold text-purple-700">{format(d.annualCost)}/yr</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Fire risk */}
                {results.fireRisk.length > 0 && (
                  <motion.div className="bg-red-50 border border-red-200 rounded-3xl p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Fire Risk Warning</h3>
                    <p className="text-sm text-red-700 mb-3">These devices draw significant standby power. Cheap, unbranded power strips can overheat under sustained phantom loads:</p>
                    <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                      {results.fireRisk.map((name, i) => <li key={i}><strong>{name}</strong> — use a fused power strip with overload protection</li>)}
                    </ul>
                  </motion.div>
                )}

                {/* Formulas Transparency */}
                <div className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wider mb-3">Mathematical Breakdown</h4>
                  <p className="text-xs font-medium text-slate-500 mb-4 pb-2 border-b border-slate-200 dark:border-gray-700">Displaying transparent calculations according to IEC 62301 measurements.</p>
                  
                  <div className="space-y-3 text-sm text-slate-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 rounded-xl p-4 shadow-inner">
                    <div>
                      <span className="text-slate-400">Step 1: Total Phantom Load</span><br/>
                      <span className="text-purple-600 dark:text-purple-400">P<sub>ghost</sub> = Σ(W<sub>standby</sub> × qty × h<sub>off</sub>) = {results.dailyWh.toFixed(0)} Wh/day</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Step 2: Annual Energy Wasted</span><br/>
                      <span className="text-purple-600 dark:text-purple-400">E<sub>annual</sub> = ({results.dailyWh.toFixed(0)} Wh × 365) ÷ 1000 = {results.annualKwh.toFixed(1)} kWh/yr</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Step 3: Financial Drain</span><br/>
                      <span className="text-purple-600 dark:text-purple-400">Cost = {results.annualKwh.toFixed(1)} kWh × {format(results.localElecRate)}/kWh = {format(results.annualCost)}/yr</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => { setShowResults(false); window.scrollTo(0, 0); }}
                  className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Recalculate
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RelatedTools currentPath="/ghost-power" count={3} />
    </div>
  );
};
