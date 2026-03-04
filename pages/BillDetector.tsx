import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp, Minus, AlertTriangle, ArrowRight, DollarSign, Zap, CheckCircle2 } from 'lucide-react';

interface MonthEntry { label: string; amount: string; units: string; }

const CAUSES = [
  { pct: 20, title: 'New High-Load Appliance', desc: 'Air conditioner, water heater, or tumble dryer added recently.', link: '/load-calc' },
  { pct: 25, title: 'Faulty Appliance / Motor', desc: 'A failing compressor (fridge, AC) draws excess current. Check appliance age.', link: '/appliances' },
  { pct: 30, title: 'Heating Element Issue', desc: 'Electric water heater or geysers with scale buildup use 30% more energy.', link: '/rooms' },
  { pct: 20, title: 'Wiring or meter tampering', desc: 'Shared meter issue, billing error, or wiring fault. Contact your electricity provider.', link: '/assessment' },
  { pct: 25, title: 'Standby/phantom loads', desc: 'Multiple devices left on standby. Smart power strips can help.', link: '/load-calc' },
  { pct: 15, title: 'Change in usage patterns', desc: 'More people at home, new appliance habits, or seasonal temperature changes.', link: '/everyday-safety' },
];

export const BillDetector: React.FC = () => {
  const [months, setMonths] = useState<MonthEntry[]>([
    { label: 'Month 1 (oldest)', amount: '', units: '' },
    { label: 'Month 2', amount: '', units: '' },
    { label: 'Month 3 (latest)', amount: '', units: '' },
  ]);
  const [result, setResult] = useState<'idle' | 'ok' | 'spike'>('idle');
  const [spikePercent, setSpikePercent] = useState(0);

  const update = (idx: number, field: keyof MonthEntry, val: string) => {
    const updated = [...months];
    updated[idx][field] = val;
    setMonths(updated);
  };

  const analyze = () => {
    const amounts = months.map(m => parseFloat(m.amount)).filter(n => !isNaN(n) && n > 0);
    if (amounts.length < 2) return;
    const avg = amounts.slice(0, amounts.length - 1).reduce((a, b) => a + b, 0) / (amounts.length - 1);
    const latest = amounts[amounts.length - 1];
    const increase = ((latest - avg) / avg) * 100;
    setSpikePercent(Math.round(increase));
    setResult(increase >= 15 ? 'spike' : 'ok');
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Why is my electricity bill suddenly higher?', acceptedAnswer: { '@type': 'Answer', text: 'Sudden electricity bill spikes are usually caused by a new high-power appliance, a failing appliance motor, a faulty water heater, or seasonal changes. Enter your last 3 bills in the Bill Spike Detector to identify the likely cause.' } },
      { '@type': 'Question', name: 'How much electricity bill increase is normal?', acceptedAnswer: { '@type': 'Answer', text: 'A 5-10% increase between months is normal due to seasonal changes or usage variations. Increases above 15-20% warrant investigation. Our bill spike detector flags increases above this threshold.' } },
      { '@type': 'Question', name: 'Can a wiring fault increase my electricity bill?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Ground faults or leakage currents in old wiring can cause meters to register higher usage. A professional electrical inspection can identify these hidden faults.' } },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Helmet>
        <title>Electricity Bill Spike Detector — Why Is My Bill High? | ElectroSafe.homes</title>
        <meta name="description" content="Find out why your electricity bill spiked suddenly. Enter your last 3 months of bills and we'll identify the likely electrical cause — free tool, no sign-up." />
        <link rel="canonical" href="https://electrosafe.homes/bill-detector" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <DollarSign className="w-3.5 h-3.5" /> Bill Spike Detector
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Why Is My Bill So High?</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Enter your last 3 months of electricity bills. We'll instantly tell you if there's a spike — and explain the likely electrical cause.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> Enter Your Bills</h2>
        <div className="space-y-4">
          {months.map((m, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="sm:col-span-1">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-1">{m.label}</label>
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1 block">Bill Amount (₹/$/-)</label>
                <input type="number" placeholder="e.g. 1500" min="0"
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={m.amount} onChange={e => update(i, 'amount', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1 block">Units used (kWh)</label>
                <input type="number" placeholder="e.g. 280" min="0"
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={m.units} onChange={e => update(i, 'units', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={analyze}
          className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition shadow-md">
          Analyze My Bill
        </button>
      </div>

      {/* Results */}
      {result !== 'idle' && (
        <div className={`rounded-2xl p-6 mb-6 ${result === 'spike' ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            {result === 'spike'
              ? <><TrendingUp className="w-8 h-8 text-red-600" /><div><div className="text-2xl font-black text-red-700">⚠️ Spike Detected: +{spikePercent}%</div><div className="text-sm text-red-600">Your latest bill is significantly higher than average.</div></div></>
              : <><CheckCircle2 className="w-8 h-8 text-green-600" /><div><div className="text-2xl font-black text-green-700">✅ Bills Look Normal</div><div className="text-sm text-green-600">No significant spike detected. Variation is within normal range.</div></div></>
            }
          </div>

          {result === 'spike' && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Likely Causes to Investigate:</h3>
              <div className="space-y-3">
                {CAUSES.filter(c => c.pct <= Math.abs(spikePercent) + 10).map((c, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 dark:border-gray-800">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-sm">{c.title}</p>
                      <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-xs mt-0.5">{c.desc}</p>
                    </div>
                    <Link to={c.link} className="text-blue-600 hover:text-blue-800 flex-shrink-0"><ArrowRight className="w-4 h-4" /></Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white text-center">
        <h2 className="font-bold text-lg mb-2">Find energy-draining issues</h2>
        <p className="text-gray-400 text-sm mb-4">Our full assessment identifies overloaded circuits and faulty appliance connections.</p>
        <Link to="/load-calc" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition">
          Open Load Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
