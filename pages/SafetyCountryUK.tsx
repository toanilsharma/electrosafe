import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, ArrowRight, Phone } from 'lucide-react';

const UK_TIPS = [
  { icon: '📋', title: 'BS 7671 (18th Edition) Wiring Regs', desc: 'All new UK electrical work must comply with BS 7671:2018 (18th Edition). The 2022 Amendment 2 introduced new surge protection and EV charging requirements. Ask for a Minor Electrical Installation Works Certificate for any new circuit.' },
  { icon: '🏠', title: 'Part P Building Regulations', desc: 'Most electrical work in kitchens, bathrooms, and consumer unit replacement requires notification to your local Building Control (Part P). Use a Part P registered electrician — they self-certify and can issue a Building Regulation Compliance Certificate.' },
  { icon: '🔒', title: 'Consumer Unit (Fuse Board) Safety', desc: 'Consumer units installed from 2016 must have metal enclosures (to prevent fire spread). RCDs are required for all socket and cable circuits. If yours is plastic and old, upgrade it — this is low cost and high safety impact.' },
  { icon: '🌡️', title: 'EICR Required for Rentals', desc: 'Landlords in England and Scotland must provide an Electrical Installation Condition Report (EICR) every 5 years. New tenants must receive this before or at start of tenancy. Non-compliance can result in £30,000 fines.' },
  { icon: '🔌', title: 'RCD Protection Standard', desc: 'BS 7671 requires RCD protection for all socket circuits and cable in walls. Test your RCD quarterly using the Test button. A healthy RCD trips instantly. A slow or non-tripping RCD must be replaced immediately.' },
  { icon: '⚡', title: 'UK 230V System', desc: 'UK mains voltage is 230V (previously 240V toleranced). This is significantly more dangerous than US 120V. Even brief contact with live UK wiring is potentially fatal. Never work on live circuits.' },
  { icon: '🚿', title: 'Bathroom Zone Requirements', desc: 'UK law divides bathrooms into zones (0, 1, 2). All light fittings, fans, and wiring in Zone 1 (inside shower enclosure) must be rated IP65. No socket outlets are permitted in most bathroom areas.' },
  { icon: '🔋', title: 'EV Charging Installation', desc: 'UK EV home chargers must be installed by an OZEV-approved installer. They must comply with BS 7671 Amendment 2 and use Mode 3 charging with proper earthing. Never use a 3-pin socket for regular EV charging.' },
];

const EMERGENCY_NUMBERS = [
  { service: 'Emergency (Fire/Police/Ambulance)', number: '999' },
  { service: 'Non-emergency Police', number: '101' },
  { service: 'NHS Non-emergency Medical', number: '111' },
  { service: 'Gas Emergency (National Grid)', number: '0800 111 999' },
  { service: 'Power Cut Helpline', number: '105' },
];

export const SafetyCountryUK: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is an EICR and do I need one in the UK?', acceptedAnswer: { '@type': 'Answer', text: 'An Electrical Installation Condition Report (EICR) is a formal inspection of your home\'s wiring by a registered electrician. It is legally required for landlords in England and Scotland every 5 years. Homeowners are recommended to get one every 10 years or when buying/selling a property.' } },
      { '@type': 'Question', name: 'What is Part P building regulations in the UK?', acceptedAnswer: { '@type': 'Answer', text: 'Part P of the Building Regulations requires that all electrical work in kitchens, bathrooms, gardens, and consumer unit replacements is either carried out or certified by a Part P registered electrician. Self-certification avoids the need for Building Control inspection.' } },
      { '@type': 'Question', name: 'When should I replace my UK consumer unit (fuse board)?', acceptedAnswer: { '@type': 'Answer', text: 'Replace your consumer unit if: it has a plastic enclosure (required to be metal since 2016); it does not have full RCD protection; circuit breakers trip frequently; it uses old-style rewireable fuses rather than modern MCBs; or it is over 25 years old.' } },
      { '@type': 'Question', name: 'How do I report a power cut in the UK?', acceptedAnswer: { '@type': 'Answer', text: 'Call the UK Power Cut Helpline on 105 (free, 24/7) to report power outages. This connects you to your local Distribution Network Operator (DNO). For electrical emergencies inside your home, call 999.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Home Electrical Safety Guide for UK — BS 7671, EICR, RCD | ElectroSafe.homes</title>
        <meta name="description" content="Complete electrical safety guide for UK homes. BS 7671 18th Edition, Part P regulations, EICR requirements, consumer unit safety, RCD testing, and bathroom zone rules." />
        <link rel="canonical" href="https://electrosafe.homes/safety/uk" />
        <meta name="keywords" content="home electrical safety UK, BS 7671, EICR report, Part P regulations, RCD protection, consumer unit upgrade, UK wiring regulations" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          🇬🇧 United Kingdom — Electrical Safety Guide
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Home Electrical Safety in the United Kingdom</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">BS 7671 18th Edition, Part P, EICR requirements, and UK-specific electrical safety guidelines.</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
        <div>
          <h2 className="font-bold text-purple-900 text-lg mb-1">Governing Standard: BS 7671:2018 + Amendment 2 (IET Wiring Regulations)</h2>
          <p className="text-purple-800 text-sm">BS 7671 (18th Edition) is the UK's national standard for electrical installations. The 2022 Amendment 2 added requirements for surge protection, PV installations, and EV charging. All registered electricians must comply. Look for NICEIC, NAPIT, or ELECSA registered contractors.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">🔑 UK-Specific Safety Tips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {UK_TIPS.map((tip, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{tip.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">{tip.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-8">
        <h2 className="flex items-center gap-2 font-bold text-red-900 text-lg mb-4"><Phone className="w-5 h-5" /> UK Emergency Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_NUMBERS.map((e, i) => (
            <div key={i} className="flex justify-between items-center bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl px-4 py-2.5 border border-red-100">
              <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300 font-medium text-sm">{e.service}</span>
              <a href={`tel:${e.number}`} className="font-black text-red-600 text-base hover:text-red-800 transition">{e.number}</a>
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
        <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
        <h2 className="font-bold text-xl mb-2">Check Your UK Home's Safety Score</h2>
        <p className="text-gray-400 mb-4 text-sm">Our assessment covers RCD, consumer unit, and bathroom zone questions aligned with BS 7671.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition">
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
