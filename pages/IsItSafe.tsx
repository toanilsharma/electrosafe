import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Zap } from 'lucide-react';

interface SafetyEntry {
  q: string;
  safe: 'yes' | 'no' | 'conditional';
  summary: string;
  detail: string;
  link?: string;
  linkLabel?: string;
}

const ENTRIES: SafetyEntry[] = [
  { q: 'charge phone overnight', safe: 'conditional', summary: 'Usually safe with original/certified charger', detail: 'Modern smartphones stop charging at 100%. Risk comes from cheap uncertified chargers that can overheat. Use original or MFi/CE-certified chargers. Never charge on soft surfaces like beds or pillows.', link: '/articles/cheap-charger-damage', linkLabel: 'Cheap charger dangers' },
  { q: 'use extension cord permanently', safe: 'no', summary: 'Extension cords are temporary — not permanent wiring', detail: 'Extension cords are not rated for continuous heavy use and degrade over time. Hidden under rugs, they overheat without you knowing. Each connection joint is a fire risk point. Install a proper outlet instead.', link: '/articles/extension-cord-dangers', linkLabel: 'Extension cord dangers' },
  { q: 'leave TV on standby all night', safe: 'yes', summary: 'Generally safe, uses small "phantom" power', detail: 'Modern electronics are designed for standby mode. Risk is minimal. However, switching your TV off at the wall saves 5-10W per hour in "phantom load" electricity — worth doing nightly.', link: '/load-calc', linkLabel: 'Calculate your standby load' },
  { q: 'use 3-pin to 2-pin adapter', safe: 'conditional', summary: 'Risky — bypasses earth protection', detail: '3-to-2 pin adapters remove your earthing (grounding) protection. If the appliance develops a fault, you could receive a fatal shock. Only use appliances rated "double insulated" (Class II, shown as □□ symbol) without earth.', link: '/protection-guide', linkLabel: 'Earthing protection guide' },
  { q: 'run extension cord under carpet', safe: 'no', summary: 'Dangerous — heat cannot escape and cord degrades', detail: 'Carpets trap heat from the cord. Over time the cable insulation melts, creating an arc fault inside your wall or floor. This is a leading cause of unexplained home fires — especially in bedrooms.', link: '/articles/extension-cord-dangers', linkLabel: 'Extension cord fire risks' },
  { q: 'use phone while charging', safe: 'yes', summary: 'Safe with certified charger and cable', detail: 'Using a phone while charging is fine with quality cables. Avoid gaming at maximum brightness for extended periods as this stresses the battery and generates extra heat. Never use under blankets while charging.' },
  { q: 'shower during thunderstorm', safe: 'no', summary: 'Avoid showering during lightning storms', detail: 'Lightning can travel through metal plumbing pipes. If lightning strikes near your home, it can pass through water. While rare, fatal incidents occur globally. Wait until 30 minutes after the last thunder.', link: '/articles/bathroom-shock-myth', linkLabel: 'Bathroom electrical myths' },
  { q: 'plug space heater into extension cord', safe: 'no', summary: 'Very dangerous — major fire risk', detail: 'Space heaters draw 1500W+ and generate enough heat to melt an extension cord over time. Always plug directly into a wall outlet. The NFPA reports extension cord connections cause thousands of fires annually.', link: '/assessment', linkLabel: 'Check your home safety' },
  { q: 'use electric blanket on high all night', safe: 'no', summary: 'Risk of overheating — turn off before sleeping', detail: 'Electric blankets should be used to warm the bed, then turned off before you sleep. Folding or scrunching them while on concentrates heat, degrading insulation. Replace any blanket older than 10 years.', link: '/articles/electric-blanket-burns', linkLabel: 'Electric blanket safety' },
  { q: 'leave laptop plugged in always', safe: 'conditional', summary: 'Mostly fine, but reduces battery longevity', detail: 'Modern laptops have smart charging that prevents true overcharge. However, keeping a laptop at 100% all the time degrades lithium battery faster. For longevity, charge between 20–80%. Safety-wise, use on hard flat surfaces for ventilation.' },
  { q: 'use air freshener near electrical outlet', safe: 'conditional', summary: 'Keep liquid plug-ins away from overloaded outlets', detail: 'Plug-in air fresheners in outlet strips or adapters occasionally overheat. Ensure the outlet is not overloaded and the device has CE/UL certification. Keep flammable sprays away from any outlet area.' },
  { q: 'use outdoor extension cord indoors', safe: 'conditional', summary: 'Yes — outdoor-rated cords are safe indoors too', detail: 'Outdoor-rated extension cords (heavier insulation, 3-prong grounded) can safely be used indoors. Indoor cords should NEVER be used outdoors — they lack weatherproofing and UV resistance.' },
  { q: 'leave fridge door open accidentally', safe: 'yes', summary: 'Motor works harder but no fire risk', detail: 'An open fridge door causes the compressor to run more frequently (higher electricity) but poses no electrical danger. Close it promptly to save energy.' },
  { q: 'use old wiring in house', safe: 'conditional', summary: 'Depends on wiring type and condition — get inspected', detail: 'Wiring over 25 years old may have degraded insulation. Homes with aluminum wiring (1965-1973 in USA), knob-and-tube wiring, or UK lead-sheathed cables need professional inspection. Do not DIY electrical work on old wiring.', link: '/articles/old-wiring-dangers', linkLabel: 'Old wiring dangers' },
  { q: 'plug multiple devices into one outlet', safe: 'conditional', summary: 'Depends on total load — calculate before plugging', detail: 'Each outlet has a maximum amperage (typically 13A-16A in most countries). Adding multiple high-power devices causes overload. Use our load calculator to check if your outlet can handle the combined load.', link: '/load-calc', linkLabel: 'Load Calculator' },
  { q: 'reset tripped circuit breaker yourself', safe: 'conditional', summary: 'Once is OK, but repeated tripping needs investigation', detail: 'Resetting a tripped breaker once is fine. If it trips again immediately, there is a fault that needs electrical inspection. Never force a breaker back on or tape it in the ON position.', link: '/articles/circuit-breaker-tripping', linkLabel: 'Why breakers trip' },
  { q: 'use cheap power strip', safe: 'conditional', summary: 'Low-quality strips without surge protection are risky', detail: 'Cheap power strips without surge protection or thermal fuses can overheat. Look for strips with a UL, CE, or BIS mark, built-in surge protection, and a visible circuit breaker. Avoid strips with no markings.' },
  { q: 'leave air conditioner on all day', safe: 'yes', summary: 'Safe if AC is properly installed and maintained', detail: 'Modern ACs are designed for continuous operation. Ensure the AC is on a dedicated circuit (not shared), the outdoor unit has clearance, and filters are cleaned every 3 months. Running continuously is better for the compressor than frequent on/off cycles.' },
  { q: 'touch wet socket', safe: 'no', summary: 'Never — water conducts electricity and causes electrocution', detail: 'Water drastically lowers skin resistance and allows current to flow through your body. Turn off the circuit breaker first. If a socket gets wet, do not use it until a qualified electrician inspects it.' },
  { q: 'use LED strip lights under bed', safe: 'conditional', summary: 'Safe with proper 12V DC supplies — verify the adapter', detail: 'LED strips run on 12V DC (from an adapter) so the strip itself is safe. Ensure the power adapter is quality-rated and not taped or stacked under the mattress. Use official grade adapters with thermal cutoff protection.' },
  { q: 'charge electric scooter inside home', safe: 'conditional', summary: 'Possible but requires care — monitor while charging', detail: 'Li-ion batteries in scooters can fail catastrophically. Charge in a ventilated area away from combustibles. Never charge overnight unattended. Use only the manufacturer-supplied charger. A fire-rated charging bag reduces risk significantly.' },
  { q: 'use bathroom outlet for hairdryer', safe: 'conditional', summary: 'Only if outlet is GFCI/RCD protected', detail: 'Bathroom hairdryers are safe when using a GFCI/RCD-protected outlet specifically designed for hairdryer use (shaver/shaver point outlets). Never use a standard extension cord in the bathroom. Never use a hairdryer near a filled bath.', link: '/articles/bathroom-shock-myth' },
  { q: 'plug washing machine into extension cord', safe: 'no', summary: 'Always plug washing machines directly into the wall', detail: 'Washing machines draw 1500-2200W on heat cycles. An extension cord will overheat. The machine also needs a grounded outlet for vibration protection. Always use a direct, dedicated outlet for washing machines.' },
  { q: 'keep inverter battery in bedroom', safe: 'no', summary: 'Lead-acid batteries release hydrogen gas — ventilation required', detail: 'Lead-acid inverter batteries release hydrogen gas during charging, which is explosive and also causes respiratory issues. Always install in a well-ventilated area like a balcony or utility room. Sealed VRLA batteries are safer for indoor use.', link: '/articles/inverter-battery-gas' },
];

const safeIcon = {
  yes: <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />,
  no: <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />,
  conditional: <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />,
};
const safeBadge = {
  yes: 'bg-green-100 text-green-700',
  no: 'bg-red-100 text-red-700',
  conditional: 'bg-amber-100 text-amber-700',
};
const safeLabel = { yes: '✅ Yes', no: '⛔ No', conditional: '⚠️ Conditional' };

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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Helmet>
        <title>Is It Safe To...? — Home Electrical Safety Q&A | ElectroSafe.homes</title>
        <meta name="description" content="Quick answers to common home electrical safety questions. Is it safe to charge a phone overnight? Use an extension cord under a carpet? Plug a heater into a power strip?" />
        <link rel="canonical" href="https://electrosafe.homes/is-it-safe" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" /> Quick Answers
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Is It Safe To...?</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Instant answers to {ENTRIES.length}+ common home electrical questions — from charging habits to storm safety.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <span className="flex items-center gap-1.5 text-sm font-bold text-green-700"><CheckCircle2 className="w-4 h-4" /> Yes — Safe</span>
        <span className="flex items-center gap-1.5 text-sm font-bold text-amber-700"><AlertTriangle className="w-4 h-4" /> Conditional</span>
        <span className="flex items-center gap-1.5 text-sm font-bold text-red-700"><XCircle className="w-4 h-4" /> No — Avoid</span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search: extension cord, heater, phone, charging..."
          className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
          value={query} onChange={e => setQuery(e.target.value)} />
        {query && <button onClick={() => setQuery('')} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 font-bold">✕</button>}
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {filtered.map((e, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-2">
              {safeIcon[e.safe]}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="font-bold text-gray-900 text-base">Is it safe to <span className="text-blue-700">{e.q}</span>?</h2>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${safeBadge[e.safe]}`}>{safeLabel[e.safe]}</span>
                </div>
                <p className="font-semibold text-gray-700 text-sm mb-1">{e.summary}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{e.detail}</p>
                {e.link && <Link to={e.link} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-bold mt-2"><ArrowRight className="w-3 h-3" />{e.linkLabel || 'Learn more'}</Link>}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No answers found for "{query}"</p>
            <p className="text-sm mt-1">Try: extension cord, heater, charging, storm, shower</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-slate-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Get a full picture of your home's safety</h2>
        <p className="text-gray-400 mb-4 text-sm">Our free 25-point assessment gives you a precise risk score for your entire home.</p>
        <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
          Start Free Assessment <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
