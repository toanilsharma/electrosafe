import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, ArrowRight, AlertTriangle, CheckCircle2, Phone } from 'lucide-react';

const INDIA_TIPS = [
  { icon: '🔌', title: 'IS 732 Compliance', desc: 'Indian Standard IS 732 governs all residential wiring. Ensure your electrician uses IS-certified wires, MCBs, and outlets.' },
  { icon: '⛈️', title: 'Monsoon Preparedness', desc: 'During monsoon season (Jun-Sep), water seeping into outdoor outlets and switches causes electrocution. Use IP44+ rated outdoor fixtures.' },
  { icon: '🔋', title: 'Inverter Battery Safety', desc: 'Lead-acid UPS batteries release hydrogen gas during charging. Always install in ventilated areas — never in bedrooms or cupboards.' },
  { icon: '⭐', title: 'BEE Star Ratings', desc: 'Choose 5-star BEE-rated appliances. Not only do they save electricity, they run cooler and have lower fire risk from heat buildup.' },
  { icon: '📋', title: 'RCCB Mandatory', desc: 'IS 732 and IE Rules require RCCB (Residual Current Circuit Breaker) protection in all new residential installations. Test yours monthly.' },
  { icon: '\uD83C\uDF21\uFE0F', title: 'High Voltage Fluctuation', desc: "India's grid often experiences 10-20% voltage fluctuation. Use voltage stabilizers for ACs, refrigerators, and washing machines." },
  { icon: '🐀', title: 'Rodent-Proof Wiring', desc: 'Rats chew PVC wiring insulation, especially in false ceilings. Use armoured or conduit wiring and inspect lofts annually.' },
  { icon: '☀️', title: 'Solar DC Arc Fault Risk', desc: 'Solar panel DC wiring is high-voltage and requires AFCI/DC arc fault protection. Do not allow DIY solar installations.' },
];

const EMERGENCY_NUMBERS = [
  { service: 'Fire', number: '101' },
  { service: 'Police', number: '100' },
  { service: 'Ambulance', number: '108' },
  { service: 'Electricity Emergency', number: '1912 (most states)' },
  { service: 'BESCOM (Bengaluru)', number: '1912' },
  { service: 'MSEDCL (Maharashtra)', number: '1800-102-3435' },
];

export const SafetyCountryIndia: React.FC = () => {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Ensure Home Electrical Safety in India',
    description: 'Step-by-step guide to making your Indian home electrically safe according to IS 732 and BEE standards.',
    step: [
      { '@type': 'HowToStep', name: 'Test your RCCB/ELCB', text: 'Press the Test button on your main distribution board monthly. It should cut power immediately. If it does not trip, call an electrician — you have no shock protection.' },
      { '@type': 'HowToStep', name: 'Inspect for monsoon damage', text: 'After every monsoon season, inspect outdoor switches, meters, and meter boxes for water entry, corrosion, or moisture. Replace damaged components immediately.' },
      { '@type': 'HowToStep', name: 'Move inverter battery to ventilated area', text: 'Lead-acid batteries emit hydrogen gas — highly flammable and toxic. Move any battery stored in a bedroom or closed room to a ventilated balcony or utility room.' },
      { '@type': 'HowToStep', name: 'Install voltage stabilizers for key appliances', text: 'India\'s voltage can fluctuate ±10-20%. Install reputable voltage stabilizers for your AC, refrigerator, and washing machine to prevent motor damage and overheating.' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is IS 732 electrical standard in India?', acceptedAnswer: { '@type': 'Answer', text: 'IS 732 is the Indian Standard for Code of Practice for Electrical Wiring Installations. It governs all aspects of residential and commercial wiring in India, including wire sizing, outlet placement, earthing requirements, and protection devices like MCBs and RCCBs.' } },
      { '@type': 'Question', name: 'Is earthing required for home wiring in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Earthing (grounding) is mandatory under IS 3043 and IS 732 for all residential installations in India. Without proper earthing, there is no protection against electric shock from faulty appliances.' } },
      { '@type': 'Question', name: 'What safety precautions should I take during monsoon season?', acceptedAnswer: { '@type': 'Answer', text: 'During monsoon: avoid using outdoor outlets in rain, inspect outdoor switches for water damage, ensure your RCCB is tested and working, use IP44+ splash-proof fittings outdoors, and never use electrical appliances near standing water.' } },
      { '@type': 'Question', name: 'Which BEE star rating is safest for appliances?', acceptedAnswer: { '@type': 'Answer', text: '5-star BEE-rated appliances are the most energy-efficient and run the coolest, reducing overheating risk. Always check for the BEE star label when buying ACs, refrigerators, and washing machines.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Home Electrical Safety Guide for India — IS 732, RCCB, Monsoon Safety | ElectroSafe.homes</title>
        <meta name="description" content="Complete electrical safety guide for Indian homes. IS 732 compliance, RCCB testing, monsoon safety, inverter battery precautions, BEE star ratings, and emergency numbers." />
        <link rel="canonical" href="https://electrosafe.homes/safety/india" />
        <meta name="keywords" content="home electrical safety India, IS 732, RCCB India, monsoon electrical safety, inverter battery safety, BEE star rating, electrical safety guide India" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          🇮🇳 India — Electrical Safety Guide
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Home Electrical Safety in India</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">IS 732 standards, monsoon preparedness, inverter safety, and BEE ratings — tailored for Indian homes.</p>
      </div>

      {/* Key Standard Badge */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
        <div>
          <h2 className="font-bold text-orange-900 text-lg mb-1">Governing Standard: IS 732 (Bureau of Indian Standards)</h2>
          <p className="text-orange-800 text-sm">All residential wiring in India must comply with IS 732: Code of Practice for Electrical Wiring Installations. This requires RCCB protection, proper earthing, IS-marked wires, and certified MCBs. Your electrician should follow this standard for every job.</p>
        </div>
      </div>

      {/* Tips Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🔑 India-Specific Safety Tips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {INDIA_TIPS.map((tip, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{tip.icon}</div>
            <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* Emergency Numbers */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-8">
        <h2 className="flex items-center gap-2 font-bold text-red-900 text-lg mb-4"><Phone className="w-5 h-5" /> India Emergency Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_NUMBERS.map((e, i) => (
            <div key={i} className="flex justify-between items-center bg-white rounded-xl px-4 py-2.5 border border-red-100">
              <span className="text-gray-700 font-medium text-sm">{e.service}</span>
              <a href={`tel:${e.number}`} className="font-black text-red-600 text-lg hover:text-red-800 transition">{e.number}</a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">❓ Frequently Asked Questions</h2>
        {[
          { q: 'Do I need a licensed electrician for home wiring in India?', a: 'Yes. Under the Indian Electricity Act, all electrical work in homes must be done by a licensed wireman or supervisor. Unlicensed DIY electrical work is illegal and voids insurance.' },
          { q: 'Is earthing mandatory in Indian homes?', a: 'Yes. IS 3043 and IS 732 both require proper earthing for all residential installations. Without earthing, there is no protection from shock if an appliance develops a fault.' },
          { q: 'Why does my trip switch keep tripping during monsoon?', a: 'Water seeping into faulty outdoor outlets or damp wall switches causes a ground fault, which the RCCB/ELCB detects and trips. Waterproof your outdoor electrical points and have them inspected.' },
        ].map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Q: {faq.q}</h3>
            <p className="text-gray-700 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white text-center">
        <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
        <h2 className="font-bold text-xl mb-2">Check Your Indian Home's Safety Score</h2>
        <p className="text-gray-400 mb-4 text-sm">Our free assessment tool works for Indian homes — covering IS 732, monsoon risks, and inverter safety.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Free Safety Assessment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/quick-quiz" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition border border-white/20">
            60-Second Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};
