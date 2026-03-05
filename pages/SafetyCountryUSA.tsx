import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, ArrowRight, Phone } from 'lucide-react';

const USA_TIPS = [
  { icon: '🔌', title: 'NEC 2023 AFCI Requirements', desc: 'The 2023 National Electrical Code requires AFCI breakers for virtually all bedroom, living room, dining room, and hallway circuits. If your home was built before 2002, you likely don\'t have these.' },
  { icon: '🛁', title: 'GFCI Code Compliance', desc: 'GFCI outlets are required within 6 feet of any sink, in garages, outdoors, unfinished basements, and near pools. Test all GFCI outlets monthly with the Test button.' },
  { icon: '📋', title: 'Electrical Panel Inspection', desc: 'If your home still has a Federal Pacific Electric (FPE) Stab-Lok or Zinsco panel, have it replaced immediately — these panels are known to fail to trip, causing house fires.' },
  { icon: '⚡', title: '120V vs 240V Safety', desc: 'US homes use 120V for outlets and 240V for large appliances (dryer, oven, EV charger). Never use 120V appliances on 240V circuits — they will fail and potentially catch fire.' },
  { icon: '🏠', title: 'Aluminum Wiring Alert', desc: 'Homes built 1965-1973 may have aluminum wiring, which expands/contracts differently than copper, causing loose connections and fire risk. Have an electrician inspect and add CO/ALR outlets.' },
  { icon: '🌩️', title: 'Whole-House Surge Protection', desc: 'Install a whole-house surge protection device (SPD) at the main panel. This protects all appliances from lightning and grid switching surges, not just devices with individual surge strips.' },
  { icon: '🔦', title: 'Smoke + CO Detectors', desc: 'Carbon monoxide detectors are required in all US homes with gas appliances or attached garages. Replace smoke detectors every 10 years. Interconnect all detectors.' },
  { icon: '🏗️', title: 'Permit Requirements', desc: 'Most US states require electrical permits for new circuit installation, panel replacement, or service upgrades. DIY work without permits voids homeowner\'s insurance and creates liability.' },
];

const EMERGENCY_NUMBERS = [
  { service: 'Emergency / Fire / Police', number: '911' },
  { service: 'Non-Emergency Poison Control', number: '1-800-222-1222' },
  { service: 'Electric Utility (local)', number: 'On your utility bill' },
];

export const SafetyCountryUSA: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is AFCI and is it required in US homes?', acceptedAnswer: { '@type': 'Answer', text: 'AFCI stands for Arc Fault Circuit Interrupter. Under NEC 2023, AFCI breakers are required for most rooms in new US home construction. They detect dangerous arcing inside walls that could cause fires even when no visible damage exists.' } },
      { '@type': 'Question', name: 'How do I know if I have GFCI protection in my home?', acceptedAnswer: { '@type': 'Answer', text: 'GFCI outlets have Test and Reset buttons on them. You may also have a GFCI breaker in your main panel labeled "GFCI." Press the Test button — power should cut off. Press Reset to restore. If outlets in kitchens, bathrooms, or garages don\'t have GFCI, have them upgraded.' } },
      { '@type': 'Question', name: 'Is aluminum wiring dangerous in US homes?', acceptedAnswer: { '@type': 'Answer', text: 'Aluminum wiring from 1965-1973 can be dangerous due to oxidation at connection points, causing loose joints that overheat. Solutions include CO/ALR rated outlets, copper pigtailing at every connection, or full rewiring. Have an electrician inspect it.' } },
      { '@type': 'Question', name: 'When should I upgrade my electrical panel in the USA?', acceptedAnswer: { '@type': 'Answer', text: 'Upgrade your panel if: it is a Federal Pacific, Zinsco, or pushmatic brand; it is under 100 amps capacity (most modern homes need 200A); breakers trip frequently; or you are adding an EV charger or major appliance.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Home Electrical Safety Guide for USA — NEC, GFCI, AFCI | ElectroSafe.homes</title>
        <meta name="description" content="Complete electrical safety guide for US homes. NEC 2023 requirements, AFCI and GFCI protection, aluminum wiring risks, panel upgrades, and 120V vs 240V safety." />
        <meta name="keywords" content="home electrical safety USA, NEC 2023, AFCI breaker, GFCI outlet, aluminum wiring, electrical panel upgrade, US home wiring" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          🇺🇸 USA — Electrical Safety Guide
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Home Electrical Safety in the United States</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">NEC 2023 compliance, AFCI/GFCI requirements, panel safety, and 120V/240V guidelines for US homes.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h2 className="font-bold text-blue-900 text-lg mb-1">Governing Standard: NEC 2023 (NFPA 70)</h2>
          <p className="text-blue-800 text-sm">The National Electrical Code (NFPA 70) is the baseline electrical safety standard adopted by most US states. Updated every 3 years. It governs wiring methods, outlet spacing, GFCI/AFCI requirements, and panel safety. Always ensure your electrician follows the currently adopted version in your state.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">🔑 USA-Specific Safety Tips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {USA_TIPS.map((tip, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{tip.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">{tip.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-8">
        <h2 className="flex items-center gap-2 font-bold text-red-900 text-lg mb-4"><Phone className="w-5 h-5" /> US Emergency Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_NUMBERS.map((e, i) => (
            <div key={i} className="flex justify-between items-center bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl px-4 py-2.5 border border-red-100">
              <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300 font-medium text-sm">{e.service}</span>
              <span className="font-black text-red-600 text-lg">{e.number}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">❓ Frequently Asked Questions</h2>
        {faqSchema.mainEntity.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">Q: {faq.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm">{faq.acceptedAnswer.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white text-center">
        <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
        <h2 className="font-bold text-xl mb-2">Check Your US Home's Safety Score</h2>
        <p className="text-gray-400 mb-4 text-sm">Our free assessment includes GFCI, AFCI, and NEC-aligned questions for American homes.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Free Safety Assessment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/quick-quiz" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 dark:bg-gray-900/10 text-white rounded-xl font-bold hover:bg-white dark:bg-gray-900 dark:bg-gray-900/20 transition border border-white/20">
            60-Second Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};
