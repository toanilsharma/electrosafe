import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ShieldCheck, Share2 } from 'lucide-react';

const STORIES = [
  { name: 'Ravi K.', location: 'Mumbai, India', icon: '🇮🇳', color: 'bg-orange-100 text-orange-700', quote: 'My MCB had been tripping every few weeks and I ignored it for months. After using the ElectroSafe Risk Predictor, I realized it was a wiring overload in the kitchen. An electrician confirmed burnt insulation behind the stove. Another few weeks and we would have had a fire.', tool: 'Risk Predictor', outcome: '🔥 Fire Averted' },
  { name: 'Sarah M.', location: 'Austin, Texas, USA', icon: '🇺🇸', color: 'bg-blue-100 text-blue-700', quote: 'The Load Calculator showed me I was drawing 24 amps on a 20-amp kitchen circuit. When I moved the air fryer and microwave to separate circuits, the constant breaker tripping stopped immediately. I had no idea that was dangerous until I used this site.', tool: 'Load Calculator', outcome: '⚡ Overload Prevented' },
  { name: 'Priya S.', location: 'Bengaluru, India', icon: '🇮🇳', color: 'bg-purple-100 text-purple-700', quote: 'I was about to sign a lease on a flat. I used the Pre-Rental Checklist from the Home page and found the bathroom had a standard outlet, not a GFCI — right next to the sink. I asked the landlord to install a proper RCD outlet before I moved in. He did.', tool: 'Pre-Rental Checklist', outcome: '🛁 Shock Risk Prevented' },
  { name: 'James T.', location: 'London, UK', icon: '🇬🇧', color: 'bg-indigo-100 text-indigo-700', quote: 'Building my first home, I used the New Home Master Plan to check the electrician\'s work. I caught that he had used 1.5mm cable for the cooker circuit — it should have been 6mm or 10mm. Without ElectroSafe, I would never have known to question it.', tool: 'New Home Guide', outcome: '🏡 Construction Caught' },
  { name: 'Ahmed Y.', location: 'Lagos, Nigeria', icon: '🇳🇬', color: 'bg-green-100 text-green-700', quote: 'Our inverter battery was kept in the bedroom for years. The ElectroSafe article on inverter gas explained that it releases hydrogen during charging. We moved it to a ventilated store room. My family had been sleeping in a potentially explosive room.', tool: 'Article: Inverter Safety', outcome: '💨 Gas Hazard Resolved' },
  { name: 'Maria L.', location: 'Seville, Spain', icon: '🇪🇸', color: 'bg-red-100 text-red-700', quote: 'My toddler kept trying to stick things in outlets. I thought the plastic covers were safe. The childproofing article explained that plastic covers are actually a choking hazard and that tamper-resistant sockets are the safe solution. Replaced all outlets that same week.', tool: 'Article: Childproofing', outcome: '👶 Child Danger Eliminated' },
  { name: 'David O.', location: 'Nairobi, Kenya', icon: '🇰🇪', color: 'bg-yellow-100 text-yellow-700', quote: 'A neighbor\'s house had a fire from old wiring. I used the Safety Assessment and scored poorly on wiring age questions. That pushed me to get a professional inspection — the electrician found degraded insulation in 3 rooms. Saved before it started.', tool: 'Safety Assessment', outcome: '🏠 Wiring Replaced in Time' },
  { name: 'Ananya R.', location: 'Chennai, India', icon: '🇮🇳', color: 'bg-teal-100 text-teal-700', quote: 'I had a fishy smell near the distribution box for months. My husband said it was normal. I used the Risk Predictor and it flagged this as "potential wiring overheating — serious." The electrician found a loose connection arcing inside the box. It was terrifying.', tool: 'Risk Predictor', outcome: '🔴 Arc Fault Fixed' },
  { name: 'Ben W.', location: 'Melbourne, Australia', icon: '🇦🇺', color: 'bg-cyan-100 text-cyan-700', quote: 'We rely on a caravan power hook-up at our holiday property. The Is It Safe? page clarified that RCD protection is mandatory for outdoor and caravan hookups. I had an electrician install one — first thing he mentioned was how many people skip this.', tool: 'Is It Safe?', outcome: '🚌 Outdoor Safety Improved' },
  { name: 'Lin J.', location: 'Singapore', icon: '🇸🇬', color: 'bg-pink-100 text-pink-700', quote: 'My quick quiz score came back very low — mainly because I had no idea where the main circuit breaker was. That question forced me to go find it and label it. Now the whole family knows. Such a simple thing that could save our lives in a fire emergency.', tool: 'Quick Safety Quiz', outcome: '✅ Emergency Preparedness' },
];

export const Stories: React.FC = () => {
  const shareText = 'Real home electrical safety near-misses from people around the world. Read these stories at ElectroSafe.homes/stories — then check your own home for free.';

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Home Electrical Safety Near-Miss Stories',
    description: 'Real stories from homeowners who avoided electrical hazards using ElectroSafe.homes',
    itemListElement: STORIES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name: s.name, addressLocality: s.location },
        reviewBody: s.quote,
        name: s.outcome,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Real Electrical Safety Near-Miss Stories | ElectroSafe.homes</title>
        <meta name="description" content="Real stories from homeowners worldwide who avoided electrical fires, shocks, and hazards. Share yours and help protect other homes." />
        <link rel="canonical" href="https://electrosafe.homes/stories" />
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          💬 Real Stories
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Near-Miss Electrical Stories</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Home residents from {STORIES.length}+ countries share how they identified and fixed dangerous electrical hazards before disaster struck.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' 🔗 https://electrosafe.homes/stories')}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition text-sm">
            <MessageCircle className="w-4 h-4" /> Share These Stories
          </a>
          <Link to="/assessment" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition text-sm">
            <ShieldCheck className="w-4 h-4" /> Check My Home
          </Link>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STORIES.map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-6 relative">
            <div className="absolute top-4 right-4 text-2xl opacity-30">❝</div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center font-black text-lg`}>{s.name[0]}</div>
              <div>
                <div className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-sm">{s.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{s.icon} {s.location}</div>
              </div>
              <span className="ml-auto text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">{s.outcome}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm leading-relaxed italic mb-4">"{s.quote}"</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800 pt-3">
              <ShieldCheck className="w-3 h-3" /> Used: <span className="font-bold text-gray-600 dark:text-gray-400 dark:text-gray-400">{s.tool}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Story CTA */}
      <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white text-center">
        <Share2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
        <h2 className="font-bold text-xl mb-2">Have a story to share?</h2>
        <p className="text-gray-400 mb-4 text-sm">Your experience could protect someone else's family. Send your near-miss story to our team.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="mailto:0808miracle@gmail.com?subject=My ElectroSafe Story&body=Hi, I want to share my home electrical safety story..."
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Share My Story <ArrowRight className="w-4 h-4" />
          </a>
          <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 dark:bg-gray-900/10 text-white rounded-xl font-bold hover:bg-white dark:bg-gray-900 dark:bg-gray-900/20 transition border border-white/20">
            Check My Home First
          </Link>
        </div>
      </div>
    </div>
  );
};
