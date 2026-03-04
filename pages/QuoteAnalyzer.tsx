import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { ShieldCheck, DollarSign, AlertCircle, HardHat, Check, AlertTriangle } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

type JobCategory = 'Panel Upgrade' | 'EV Charger' | 'Whole Home Rewire' | 'Add Dedicated Circuit' | 'Basic Repairs (Switches/Outlets)';

const JOBS_DATA: Record<JobCategory, { 
    priceRange: string, 
    timeframe: string, 
    permitRequired: boolean,
    BSDetectorQuestions: { q: string, why: string }[],
    commonScam: string
}> = {
  'Panel Upgrade': {
    priceRange: '$2,500 - $4,500',
    timeframe: '1-2 Days',
    permitRequired: true,
    BSDetectorQuestions: [
      { q: "Will you be pulling a city permit for this?", why: "A panel upgrade legally requires a permit and inspection in almost every jurisdiction. If they say 'we don't need one to save you money,' hang up." },
      { q: "Are you installing a whole-home surge protector as part of the new panel?", why: "NEC 2020 requires surge protection on all new and replaced panels. If they don't know this, they aren't up to code." },
      { q: "Does this quote include coordinating the disconnect with the utility company?", why: "The power company must cut the power to the house before the swap. Shady contractors do it 'hot' or illegally pull the meter themselves." }
    ],
    commonScam: "The 'Invisible Grounding' Scam: Charging $500 extra for 'new grounding rods' but secretly just tying into a rusty water pipe."
  },
  'EV Charger': {
    priceRange: '$800 - $2,000 (Install only, not including charger hardware)',
    timeframe: '4-8 Hours',
    permitRequired: true,
    BSDetectorQuestions: [
      { q: "What gauge copper and what receptacle are you using?", why: "For a 50A circuit, they MUST use 6 AWG copper (or 4 AWG aluminum). They must use an industrial-grade receptacle (like Hubbell/Bryant), not a cheap $15 box-store one which will melt." },
      { q: "Did you perform a formal load calculation on my main panel?", why: "If your panel is only 100A, adding a 50A EV charger might overload the main breaker entirely and burn your house down. A load calc is legally required." },
      { q: "Are you using copper or aluminum wire?", why: "Aluminum is fine IF sized correctly and torqued to spec with anti-oxidant compound, but shaded contractors will use cheap aluminum wire on terminals only rated for copper." }
    ],
    commonScam: "Installing a cheap $12 dryer outlet (NEMA 14-50) from a hardware store instead of a $50+ commercial-grade one. The cheap ones melt after 6 months of continuous EV charging."
  },
  'Whole Home Rewire': {
    priceRange: '$10,000 - $25,000+',
    timeframe: '1-3 Weeks',
    permitRequired: true,
    BSDetectorQuestions: [
      { q: "How much drywall patching is included in this quote?", why: "Rewiring inevitably destroys drywall. Many quotes omit this, leaving you with a $5,000 surprise bill for a plasterer." },
      { q: "Will every bedroom have AFCI protection?", why: "Modern code requires Arc-Fault Circuit Interrupters in living spaces. Old ungrounded wiring doesn't have this." },
      { q: "Are you removing the old knob-and-tube/aluminum wire, or just abandoning it in the walls?", why: "Abandoning it is standard practice, but they must properly cut and safe off the old wires so they can never accidentally be re-energized." }
    ],
    commonScam: "The 'Pigtail Hack': Quoting for a 'rewire' but simply adding copper tips to old aluminum wire inside the outlets and calling it 'updated'."
  },
  'Add Dedicated Circuit': {
    priceRange: '$300 - $800',
    timeframe: '2-4 Hours',
    permitRequired: false, // Often not required for a single circuit depending on locale, but varies
    BSDetectorQuestions: [
      { q: "Is this going to be on an AFCI or GFCI breaker?", why: "Depending on where the circuit is going (Kitchen/Bath = GFCI, Bedroom = AFCI), special expensive breakers are required. Shady contractors use cheap standard breakers to pocket the difference." },
      { q: "Will the wire be run inside conduit or through the walls?", why: "Running conduit on the outside of your walls is ugly but cheap. Hiding it in the walls takes skill. Know what you are paying for." },
      { q: "Do I have enough physical space in my panel?", why: "If the panel is full, they might try to use 'tandem' or 'cheater' breakers illegally to squeeze it in." }
    ],
    commonScam: "Tapping into an existing heavily-loaded circuit (like the kitchen) instead of running a true 'dedicated' line back to the main box."
  },
  'Basic Repairs (Switches/Outlets)': {
    priceRange: '$150 - $400 (Minimum visit fee applies)',
    timeframe: '1-2 Hours',
    permitRequired: false,
    BSDetectorQuestions: [
      { q: "Do you use the 'backstab' holes on the back of the outlets, or wrap the wire around the side screws?", why: "Backstabbing is fast but notoriously unreliable and causes fires. A good electrician takes the extra 30 seconds to loop the wire around the screw terminal." },
      { q: "Are you licensed and insured?", why: "Basic repairs attract handymen. A handyman fixing drywall is fine. A handyman wiring a 240V dryer outlet is illegal and dangerous." },
      { q: "What is your call-out or diagnostic fee?", why: "Many companies charge a hidden $150 just to show up, plus the hourly rate." }
    ],
    commonScam: "Handymen quoting by the hour and taking 4 hours to change 5 outlets to milk the clock, using cheap 50-cent builder-grade outlets."
  }
};

export const QuoteAnalyzer = () => {
  const [selectedJob, setSelectedJob] = useState<JobCategory | null>(null);

  const jobKeys = Object.keys(JOBS_DATA) as JobCategory[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Contractor B.S. Detector | Quote Analyzer | ElectroSafe.homes</title>
        <meta name="description" content="Don't get scammed by an electrician. Use our Contractor B.S. Detector to find fair pricing and the 3 questions you MUST ask them before hiring." />
        <link rel="canonical" href="https://electrosafe.homes/quote-analyzer" />
      </Helmet>

      <div className="text-center mb-12">
         <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold uppercase tracking-widest text-xs">
          <HardHat className="w-4 h-4" /> Hiring Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
          The Contractor <span className="text-indigo-600">B.S. Detector</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-medium">
          Electricians know you don't know electrical code. Our Quote Analyzer gives you the fair price and the exact vetting questions you need to text them to weed out the scammers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Job Selection Sidebar */}
        <div className="md:col-span-1 space-y-3">
           <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-4">Select Your Job</h3>
           {jobKeys.map(job => (
             <button
               key={job}
               onClick={() => setSelectedJob(job)}
               className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all border-2 ${
                 selectedJob === job 
                 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                 : 'bg-white text-gray-700 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50'
               }`}
             >
               {job}
             </button>
           ))}

           <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
             <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5"/> How to use this</h4>
             <p className="text-sm text-blue-900 leading-relaxed">
               Select the job you are receiving quotes for. We will provide the national average cost. <strong>Copy and paste the 3 vetting questions</strong> into a text message to the contractor. Their response will immediately tell you if they are a professional or a hack.
             </p>
           </div>
        </div>

        {/* Results Area */}
        <div className="md:col-span-2">
          {selectedJob ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
              
              {/* Header Stats */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 opacity-10">
                   <DollarSign className="w-64 h-64" />
                 </div>
                 <h2 className="text-3xl font-black mb-6 relative z-10">{selectedJob}</h2>
                 
                 <div className="grid grid-cols-2 gap-6 relative z-10">
                   <div>
                     <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Fair Price Range</p>
                     <p className="text-2xl font-black text-green-400">{JOBS_DATA[selectedJob].priceRange}</p>
                   </div>
                   <div>
                     <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Permit Required?</p>
                     <p className={`text-xl font-black ${JOBS_DATA[selectedJob].permitRequired ? 'text-red-400' : 'text-gray-300'}`}>
                        {JOBS_DATA[selectedJob].permitRequired ? 'YES — Legally Required' : 'Depends on city'}
                     </p>
                   </div>
                 </div>
              </div>

              {/* Body Content */}
              <div className="p-8">
                 
                 <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-indigo-600" />
                      The 3 Questions to Ask (Copy/Paste this)
                    </h3>
                    
                    <div className="space-y-6">
                      {JOBS_DATA[selectedJob].BSDetectorQuestions.map((q, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                           <div className="flex gap-4">
                             <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-black">
                               {i + 1}
                             </div>
                             <div>
                               <p className="font-bold text-gray-900 text-lg mb-3">"{q.q}"</p>
                               <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm text-gray-600 relative">
                                  <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-indigo-500 uppercase">Why you ask this</div>
                                  {q.why}
                               </div>
                             </div>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                   <h4 className="font-bold text-red-800 flex items-center gap-2 mb-2">
                     <AlertTriangle className="w-5 h-5"/> Common Scam Alert
                   </h4>
                   <p className="text-red-900 font-medium">{JOBS_DATA[selectedJob].commonScam}</p>
                 </div>

              </div>

            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center bg-gray-50">
               <div className="text-center">
                 <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                 <p className="text-gray-500 font-medium text-lg">Select a job from the menu to analyze quotes.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 text-center text-xs text-gray-400 max-w-2xl mx-auto">
        <p><strong>Disclaimer:</strong> Price ranges presented are national generalizations for typical scenarios. Costs in expensive metro areas or complex layouts will be higher. Always solicit three written quotes before hiring.</p>
      </div>

      {selectedJob && (
        <div className="mt-12 animate-in fade-in duration-700">
           <TrustBadge />
           <RelatedTools currentPath="/quote-analyzer" count={2} />
        </div>
      )}
    </div>
  );
};
