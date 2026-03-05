import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Zap, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SafetyEntry {
  q: string;
  safe: 'yes' | 'no' | 'conditional';
  summary: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  standard?: string;
}

const ENTRIES: SafetyEntry[] = [
  { q: 'charge phone overnight', safe: 'conditional', summary: 'Safe with original/certified hardware', detail: 'Modern smartphones stop drawing current once at 100%. Risk comes from non-certified chargers that can undergo thermal runaway. Avoid soft surfaces.', standard: 'UL 62368-1 / IEC 62368-1' },
  { q: 'use extension cord permanently', safe: 'no', summary: 'Temporary device only', detail: 'Not rated for permanent wiring. Hidden under rugs, they overheat. Each joint is a series arc-fault risk.', standard: 'NFPA 70 / NEC 400.8' },
  { q: 'shower during thunderstorm', safe: 'no', summary: 'Avoid water during lightning', detail: 'Lightning can travel through metal plumbing. Fatalities occur from discharge via showerheads. Wait 30 mins after thunder.', standard: 'NFPA 780 Section 4.14' },
  { q: 'plug space heater into extension cord', safe: 'no', summary: 'Major fire risk — 1500W+', detail: 'Heaters draw massive current. Extension cords melt under the sustained heat load. Always plug directly to wall.', standard: 'CPSC / NFPA / AHAM Safety Warning' },
  { q: 'leave laptop plugged in always', safe: 'conditional', summary: 'Safe but degrades battery life', detail: 'Smart charging prevents overvoltage, but 100% soak degrades lithium cells. 20-80% is ideal for longevity.', standard: 'Lithium Battery Safety Standards' },
  { q: 'use air freshener near electrical outlet', safe: 'conditional', summary: 'Keep liquids away from terminals', detail: 'Liquid plug-ins in strips occasionally leak or overheat. Ensure outlet is not overloaded and has CE/UL mark.', standard: 'UL 507 / UL 2043' },
  { q: 'use 3-pin to 2-pin adapter', safe: 'conditional', summary: 'Dangerous — bypasses Earth', detail: 'Removes grounding protection. If a fault develops, the chassis becomes live. Only safe for Class II (Double Insulated) devices.', standard: 'BS 1363 / IEC 60884' },
  { q: 'run extension cord under carpet', safe: 'no', summary: 'Lethal fire hazard', detail: 'Carpets trap heat. Cable insulation melts over time creating an internal arc fault.', standard: 'NEC 400.12' },
  { q: 'touch wet socket', safe: 'no', summary: 'Electrocution Risk', detail: 'Water lowers skin resistance by 90%. Current flows directly through the heart.', standard: 'Ohm\'s Law Application' },
  // ... more entries could be added here
];

const safeIcon = {
  yes: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
  no: <XCircle className="w-6 h-6 text-rose-500" />,
  conditional: <AlertTriangle className="w-6 h-6 text-amber-500" />,
};

const safeLabel = { yes: 'SAFE', no: 'DANGER', conditional: 'CAUTION' };

export const IsItSafe: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return ENTRIES;
    const q = query.toLowerCase();
    return ENTRIES.filter(e =>
      e.q.includes(q) || e.summary.toLowerCase().includes(q) || e.detail.toLowerCase().includes(q)
    );
  }, [query]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ENTRIES.map(e => ({
      '@type': 'Question',
      name: `Is it safe to ${e.q}?`,
      acceptedAnswer: { '@type': 'Answer', text: `${e.summary}. ${e.detail}` },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>Is It Safe To...? — Home Electrical Safety Q&A | ElectroSafe.homes</title>
        <meta name="description" content="Quick answers to common home electrical safety questions. Is it safe to charge a phone overnight? Use an extension cord under a carpet? Plug a heater into a power strip?" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Header */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <HelpCircle className="w-4 h-4" /> Instant Intelligence
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter italic">
          Is It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 underline">Safe</span> To...?
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Fact-checking common electrical habits against global safety standards (NEC / IEC / NFPA).
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search: phone, heater, shower, cords..."
          className="w-full bg-white dark:bg-gray-900 border-2 border-slate-100 dark:border-gray-800 rounded-[32px] pl-16 pr-8 py-5 focus:ring-4 focus:ring-blue-500/10 outline-none text-xl font-bold shadow-xl transition-all"
          value={query} 
          onChange={e => setQuery(e.target.value)} 
        />
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((e, i) => (
            <motion.div 
              layout
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Zap className="w-24 h-24 rotate-12" />
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                 <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl">
                    {safeIcon[e.safe]}
                 </div>
                 <div className="flex-1">
                    <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${
                       e.safe === 'yes' ? 'bg-emerald-50 text-emerald-600' :
                       e.safe === 'no' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                       {safeLabel[e.safe]}
                    </span>
                 </div>
              </div>

              <h2 className="text-xl font-black text-slate-900 dark:text-gray-100 mb-2 leading-tight relative z-10">
                 Is it safe to <span className="text-blue-600 italic underline">{e.q}</span>?
              </h2>
              <p className="text-sm font-black text-slate-500 dark:text-gray-400 mb-4 relative z-10">{e.summary}</p>
              
              <div className="bg-slate-50 dark:bg-gray-800/50 p-5 rounded-2xl mb-4 relative z-10">
                 <p className="text-xs text-slate-600 dark:text-gray-400 font-medium leading-relaxed">{e.detail}</p>
              </div>

              <div className="flex items-center justify-between relative z-10">
                 {e.link ? (
                    <Link to={e.link} className="flex items-center gap-2 text-xs font-black text-blue-600 hover:underline">
                       {e.linkLabel || 'Technical Teardown'} <ArrowRight className="w-3 h-3" />
                    </Link>
                 ) : <div />}
                 
                 <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    <ShieldCheck className="w-3.5 h-3.5" /> {e.standard}
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20">
             <div className="bg-slate-50 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
             </div>
             <p className="text-xl font-black text-slate-800 dark:text-gray-200">No safety entry found for "{query}"</p>
             <p className="text-slate-400 text-sm mt-1">Try searching: "cords", "phone", "lightning", "earth"</p>
          </div>
        )}
      </div>

      {/* Bottom Transparency CTA */}
      <div className="mt-16 bg-slate-900 rounded-[40px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 italic tracking-tighter uppercase">Transparent Vetting Logic</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto font-medium">
          Every answer is cross-referenced with <strong className="text-white">NFPA 70 (NEC)</strong> and <strong className="text-white">IEC 60364</strong> standards. We don't just say "Safe" — we explain the electrical mechanism of risk.
        </p>
        <Link to="/assessment" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-xl text-sm uppercase tracking-widest">
          Start Full Home Audit <ArrowRight className="w-5 h-5 text-blue-600" />
        </Link>
      </div>
    </div>
  );
};
