import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GLOSSARY_TERMS = [
  { term: 'GFCI', full: 'Ground Fault Circuit Interrupter', def: 'A device that shuts off power within 1/40th of a second when it detects ground faults. Mandatory near water sources (kitchens, bathrooms). Prevents electrocution.', link: '/protection-guide', badge: 'Critical' },
  { term: 'RCD', full: 'Residual Current Device', def: 'The UK/EU/Indian equivalent of a GFCI. Detects leakage current and cuts power instantly. A life-saving device required by BS 7671 and IS 732.', link: '/protection-guide', badge: 'Critical' },
  { term: 'MCB', full: 'Miniature Circuit Breaker', def: 'Replaces fuses in modern homes. Automatically trips on overload or short circuit and can be reset without replacing. Each circuit in your home should have one.', link: '/hardware', badge: 'Essential' },
  { term: 'RCCB', full: 'Residual Current Circuit Breaker', def: 'Combines RCD protection with MCB overcurrent protection. The safest type of breaker for home circuits, especially wet areas.', link: '/hardware', badge: 'Essential' },
  { term: 'AFCI', full: 'Arc Fault Circuit Interrupter', def: 'Required by NEC 2023 for US bedrooms. Detects dangerous arcing (sparking inside walls) that regular breakers miss. Prevents hidden electrical fires.', link: '/protection-guide', badge: 'USA' },
  { term: 'NEC', full: 'National Electrical Code', def: "The USA's primary electrical safety standard (NFPA 70). Adopted by most US states and updated every 3 years. Governs wiring, outlets, panels, and more.", link: '/safety/usa', badge: 'USA' },
  { term: 'BS 7671', full: 'British Standard 7671', def: "The UK's wiring regulations (IET Wiring Regulations, 18th Edition). Mandatory for all new electrical installations in the UK. Covers earthing, bonding, and protection.", link: '/safety/uk', badge: 'UK' },
  { term: 'IS 732', full: 'Indian Standard 732', def: 'The Indian code of practice for electrical wiring of buildings. Governs residential and commercial wiring in India. Updated regularly by the Bureau of Indian Standards.', link: '/safety/india', badge: 'India' },
  { term: 'IEC 60364', full: 'International Electrotechnical Commission Standard', def: 'The international baseline for low-voltage electrical installation safety. Most country standards (BS 7671, IS 732) are derived from this global framework.', link: '/standards-and-sources', badge: 'Global' },
  { term: 'Earthing', full: 'Earthing / Grounding', def: 'A safety mechanism that connects the electrical system to the ground, providing a safe path for fault current. Prevents shock from appliance faults. Also called "grounding" in the USA.', link: '/protection-guide', badge: 'Critical' },
  { term: 'Bonding', full: 'Equipotential Bonding', def: 'Connecting all metallic parts (pipes, frames, ducts) to earth to ensure they are all at the same electrical potential. Preventing shock if two metal objects are touched simultaneously.', link: '/protection-guide', badge: 'Safety' },
  { term: 'Load Factor', full: 'Electrical Load Factor', def: 'The ratio of average power demand to peak power demand. A high load factor means efficient usage. Used to size circuits and breakers.', link: '/load-calc', badge: 'Design' },
  { term: 'Short Circuit', full: 'Short Circuit Fault', def: 'A fault where current flows through an unintended low-resistance path, bypassing the load. Causes extreme heat and fire risk. MCBs/fuses protect against this.', link: '/risk-predictor', badge: 'Hazard' },
  { term: 'Arc Fault', full: 'Electrical Arc Fault', def: 'Unintended electrical discharge between conductors. Creates temperatures over 5000°F. A leading cause of house fires, especially from damaged wiring inside walls.', link: '/articles/circuit-breaker-tripping', badge: 'Hazard' },
  { term: 'Voltage Drop', full: 'Voltage Drop', def: 'The reduction in voltage along a wire due to resistance. Too much voltage drop (>5%) damages appliances and causes fires. Use thicker wire for longer runs.', link: '/articles/appliance-voltage-drop', badge: 'Design' },
  { term: 'Overload', full: 'Circuit Overload', def: 'When more current is drawn than a circuit can safely handle. Causes wires to overheat. Protected by MCBs. Common when plugging too many appliances into one outlet.', link: '/load-calc', badge: 'Hazard' },
  { term: 'Surge Protection', full: 'Surge Protection Device (SPD)', def: 'Protects appliances from sudden voltage spikes (surges) caused by lightning or grid switching. Essential for electronics, ACs, and home appliances.', link: '/articles/lightning-surge-protection', badge: 'Essential' },
  { term: 'TRR', full: 'Tamper-Resistant Receptacle', def: 'An outlet with internal shutters that only open when equal pressure is applied to both slots simultaneously. Prevents children from inserting objects. Required by NEC for childproofing.', link: '/articles/childproofing-outlets-hazard', badge: 'Child Safety' },
  { term: 'IP Rating', full: 'Ingress Protection Rating', def: 'A rating (e.g., IP44, IP65) indicating how well a device is sealed against dust and water. Outdoor outlets need IP44+. Bathroom fans need IP44. Outdoor fixtures need IP65.', link: '/rooms', badge: 'Design' },
  { term: 'Phase', full: 'Single Phase / Three Phase', def: 'Single-phase power (most homes) uses one live wire. Three-phase uses three live wires for higher loads. Most home appliances use single-phase; large motors use three-phase.', link: '/hardware', badge: 'Design' },
  { term: 'Neutral Wire', full: 'Neutral Wire', def: 'The return path for current in an AC circuit (usually blue in EU, white in USA, black in India). NOT at zero voltage during faults. Required for smart switches.', link: '/articles/smart-switch-neutral-wire', badge: 'Wiring' },
  { term: 'Live Wire', full: 'Live / Hot Wire', def: 'The wire carrying the active voltage. Red or brown in most standards (USA: black). Always dangerous to touch. Always switch off before working on any circuit.', link: '/hardware', badge: 'Wiring' },
  { term: 'Earth Wire', full: 'Earth / Ground Wire', def: 'Green/yellow striped (EU/India) or bare copper (USA). Provides a path for fault current directly to the ground, tripping protection devices if a fault occurs.', link: '/hardware', badge: 'Wiring' },
  { term: 'MCB Tripping', full: 'MCB / Breaker Tripping', def: 'When your circuit breaker repeatedly shuts off, it warns of overload, short circuit, or ground fault. Never force it back on without investigating the cause.', link: '/articles/circuit-breaker-tripping', badge: 'Troubleshooting' },
  { term: 'Inverter', full: 'Home Inverter / UPS', def: 'A device that converts DC (battery) power to AC for home use during power cuts. Stores hydrogen gas — must be kept ventilated. Batteries can overheat and explode if overcharged.', link: '/articles/inverter-battery-gas', badge: 'Appliance' },
  { term: 'BEE Star Rating', full: 'Bureau of Energy Efficiency Star Rating', def: 'Indian energy efficiency rating (1–5 stars) for appliances. 5 stars = most efficient. Higher ratings mean lower electricity bills and less heat/fire risk from inefficiency.', link: '/safety/india', badge: 'India' },
  { term: 'Consumer Unit', full: 'Consumer Unit (Fuse Box)', def: 'The UK term for the main distribution panel containing MCBs/RCCBs. Modern units must include RCD protection under BS 7671. Often called a "fuse board."', link: '/safety/uk', badge: 'UK' },
  { term: 'Pigtail Connection', full: 'Pigtail Wire Connection', def: 'A short connector wire used to join multiple wires to a single terminal. Prevents multiple wires from sitting under one screw — a fire hazard.', link: '/hardware', badge: 'Wiring' },
  { term: 'Wattage', full: 'Electrical Wattage (W)', def: 'The rate of electricity consumption. Watts = Volts × Amps. A 1500W appliance on a 230V system draws about 6.5A. Used to calculate circuit loads.', link: '/load-calc', badge: 'Basic' },
  { term: 'Ampere (Amp)', full: 'Electrical Current — Ampere (A)', def: 'The unit of electric current. Higher amps = more current flow. Wires are rated by how many amps they can safely carry. Always match cable rating to breaker rating.', link: '/hardware', badge: 'Basic' },
  { term: 'Volt', full: 'Electrical Voltage (V)', def: 'The "pressure" that drives electrical current. Standard household voltage: 120V (USA/Canada), 230V (EU/India/UK/Australia). Higher voltage = more dangerous shock.', link: '/articles/110v-vs-230v-danger', badge: 'Basic' },
  { term: 'kWh', full: 'Kilowatt-Hour', def: 'The unit used on your electricity bill. 1 kWh = a 1000W appliance running for 1 hour. A 1.5-ton AC uses approx 1.5 kWh/hour.', link: '/load-calc', badge: 'Basic' },
  { term: 'Busbar', full: 'Busbar', def: 'A thick copper/aluminium bar in the distribution panel that distributes incoming power to all circuit breakers. Never touch it — it remains live even when the main switch is off.', link: '/hardware', badge: 'Advanced' },
  { term: 'CFL', full: 'Compact Fluorescent Lamp', def: 'A power-saving spiral bulb. Contains mercury — dispose properly. Avoid in enclosed fixtures as they overheat. Being replaced by LEDs in most homes.', link: '/everyday-safety', badge: 'Lighting' },
  { term: 'LED', full: 'Light Emitting Diode', def: 'The most efficient and safe modern light source. 80% less energy than incandescent. No mercury, low heat, up to 25,000-hour lifespan. Preferred for all home fixtures.', link: '/articles/light-bulb-wattage', badge: 'Lighting' },
  { term: 'Power Factor', full: 'Power Factor (PF)', def: 'A ratio (0–1) of real power vs apparent power. Low PF means wasted electricity. Motors and older ACs often have poor power factor. Capacitor banks can correct it.', link: '/hardware', badge: 'Advanced' },
  { term: 'Conduit', full: 'Electrical Conduit', def: 'A protective tube (PVC or metal) through which wires are run inside walls and ceilings. Prevents mechanical damage to wiring and reduces fire spread.', link: '/new-home', badge: 'Construction' },
  { term: 'Conductor', full: 'Electrical Conductor', def: 'A material that allows electricity to flow freely — copper, aluminium, gold. Copper is standard for home wiring due to its high conductivity and reliability.', link: '/hardware', badge: 'Basic' },
  { term: 'Insulation', full: 'Wire Insulation', def: 'PVC or rubber coating around conductors that prevents shocked contact. Degrades over time, from heat, rodents, or age. Cracked insulation = fire and shock risk.', link: '/articles/old-wiring-dangers', badge: 'Safety' },
];

const BADGE_COLORS: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700',
  Essential: 'bg-orange-100 text-orange-700',
  Hazard: 'bg-red-50 text-red-600',
  Safety: 'bg-emerald-100 text-emerald-700',
  Design: 'bg-blue-100 text-blue-700',
  USA: 'bg-flag-blue bg-blue-50 text-blue-700',
  UK: 'bg-purple-50 text-purple-700',
  India: 'bg-orange-50 text-orange-700',
  Global: 'bg-teal-50 text-teal-700',
  Basic: 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 dark:text-gray-400',
  Advanced: 'bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-slate-700 dark:text-gray-300 dark:text-gray-300',
  Wiring: 'bg-yellow-100 text-yellow-700',
  Troubleshooting: 'bg-amber-100 text-amber-700',
  Appliance: 'bg-pink-100 text-pink-700',
  Lighting: 'bg-lime-100 text-lime-700',
  Construction: 'bg-stone-100 text-stone-700',
  'Child Safety': 'bg-rose-100 text-rose-700',
};

export const Glossary: React.FC = () => {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = GLOSSARY_TERMS.filter(t =>
    !query || t.term.toLowerCase().includes(query.toLowerCase()) || t.full.toLowerCase().includes(query.toLowerCase()) || t.def.toLowerCase().includes(query.toLowerCase())
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GLOSSARY_TERMS.slice(0, 10).map(t => ({
      '@type': 'Question',
      name: `What is ${t.term} in electrical safety?`,
      acceptedAnswer: { '@type': 'Answer', text: `${t.full}: ${t.def}` },
    })),
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Electrical Safety Glossary',
    inDefinedTermSet: 'https://electrosafe.homes/glossary',
    hasDefinedTerm: GLOSSARY_TERMS.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.def,
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Electrical Safety Glossary — 40+ Terms Explained Simply | ElectroSafe.homes</title>
        <meta name="description" content="Plain-English definitions of electrical safety terms: GFCI, RCD, MCB, AFCI, earthing, arc fault, voltage drop and more. Free electrical glossary for homeowners." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(definedTermSchema)}</script>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          📖 Electrical Glossary
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Speak "Electrician"</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {GLOSSARY_TERMS.length} plain-English definitions. Search any term an electrician, inspector, or your electricity bill might use.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search: GFCI, earthing, arc fault, MCB..."
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:text-gray-400 font-bold">✕</button>
        )}
      </div>

      {/* Count */}
      {query && (
        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-sm mb-4">{filtered.length} term{filtered.length !== 1 ? 's' : ''} found for "{query}"</p>
      )}

      {/* Terms Grid */}
      <div className="space-y-4">
        {filtered.map(t => (
          <div key={t.term} id={t.term.toLowerCase().replace(/\s+/g, '-')} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 dark:text-gray-100">{t.term}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 font-medium">{t.full}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_COLORS[t.badge] || 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 dark:text-gray-400'}`}>{t.badge}</span>
                <Link to={t.link} className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1">
                  Learn more <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed">{t.def}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No terms found for "{query}"</p>
            <p className="text-sm mt-1">Try searching for: GFCI, earthing, MCB, arc fault</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-blue-50 rounded-2xl p-8 text-center border border-blue-100">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">Put your knowledge to the test</h2>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-4 text-sm">Now that you know the terms, check how safe your home actually is.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/quick-quiz" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Take 60-sec Quiz <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/assessment" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 dark:bg-gray-900 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 transition border border-gray-200 dark:border-gray-700 dark:border-gray-700">
            Full Safety Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
