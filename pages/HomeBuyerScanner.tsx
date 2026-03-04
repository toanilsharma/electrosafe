import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { Home, AlertTriangle, CheckCircle, Search, Info, MapPin, Zap, Eye, MousePointerClick, Activity, ShieldAlert, ArrowRight, ShieldCheck, Download, Globe, DollarSign } from 'lucide-react';
import { RelatedTools } from '../components/RelatedTools';

const getCurrency = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (/Asia\/Kolkata|Asia\/Calcutta/.test(tz)) return { symbol: '₹', multiplier: 25 };
    if (/Europe\/London|Europe\/Dublin/.test(tz)) return { symbol: '£', multiplier: 0.8 };
    if (/Australia/.test(tz)) return { symbol: 'A$', multiplier: 1.5 };
    if (/Europe/.test(tz)) return { symbol: '€', multiplier: 0.9 };
    if (/America\/Toronto|America\/Vancouver/.test(tz)) return { symbol: 'C$', multiplier: 1.35 };
  } catch {}
  return { symbol: '$', multiplier: 1 };
};

const SCAN_ITEMS: any[] = [
  {
    category: 'The Electrical Panel (Main Consumer Unit)',
    icon: <Activity className="w-5 h-5" />,
    items: [
      { id: 'p1', question: 'Does the panel look obsolete (e.g., uses older ceramic screw-in fuses, or known hazardous vintage brands)?', danger: true, costVal: 2000, why: 'Obsolete panels and fuse boxes often lack modern safety mechanisms and can fail to trip during an overload, creating a huge fire hazard. They usually must be replaced.' },
      { id: 'p2', question: 'Are there any empty slots where you can see live metal components inside the panel?', danger: true, costVal: 150, why: 'Missing blanking plates mean a child or mouse could easily access the lethal live bus bar.' },
      { id: 'p4', question: 'If you touch the metal face of the panel with the back of your hand, does it feel hot?', danger: true, costVal: 1000, why: 'A hot electrical panel indicates severely loose connections or an overloaded main breaker. This is a critical pre-fire condition.' },
      { id: 'p3', question: 'Is the main supply rating unusually low for a modern home (e.g., 60 Amps or under)?', type: 'info', costVal: 3000, why: 'A low incoming supply limits your ability to add modern high-draw appliances like AC units, heat pumps, or EV chargers without an expensive main intake upgrade.' },
      { id: 'p5', question: 'Are there signs of rust, water damage, or white corrosion powder inside the panel box?', danger: true, costVal: 2000, why: 'Water inside the panel destroys the bus bars and breakers, creating a massive short-circuit and fire hazard. The panel must be replaced.' },
      { id: 'p6', question: 'Do the breakers have visibly mismatched brands (e.g. Siemens breakers squeezed into a Square D panel)?', danger: true, costVal: 300, why: 'Mismatched breakers often do not seat correctly onto the bus bar. They will arc, overheat, and cause panel fires.' }
    ]
  },
  {
    category: 'Kitchen & Wet Areas',
    icon: <Zap className="w-5 h-5" />,
    items: [
      { id: 'k1', question: 'Are the wet areas missing RCD, RCBO, or GFCI shock protection (either via "Test" buttons on the socket, or marked in the main panel)?', danger: true, textIfNo: true, costVal: 300, why: 'Modern safety codes worldwide require ground-fault/residual-current protection near water to prevent fatal shocks. If missing, the house may not have been updated in decades.' },
      { id: 'k2', question: 'If you push the RCD/GFCI "Test" button (on the socket or main panel), does it fail to instantly cut the power?', danger: true, textIfNo: true, costVal: 50, why: 'These life-saving devices degrade over time. A faulty RCD/GFCI provides zero shock protection.' },
      { id: 'k3', question: 'Turn on the bathroom exhaust fans. Do they sound like they are grinding, scraping, or struggling to spin?', danger: true, costVal: 100, why: 'Bathroom fan fires are incredibly common. A seized or struggling motor will overheat and can ignite the dust clogs inside the housing.' },
      { id: 'k4', question: 'Do you see multiple major appliances (e.g. Fridge, Microwave, Kettle) plugged into a single outlet or power strip instead of dedicated wall sockets?', danger: true, costVal: 800, why: 'Kitchens require multiple dedicated high-amp circuits. Daisy-chaining power-hungry appliances causes severe overloads behind the walls.' },
      { id: 'k5', question: 'Is the garbage disposal or dishwasher hardwired with exposed plastic cable instead of protected in metal conduit/armored casing?', danger: true, costVal: 250, why: 'Cables in accessible cabinet areas must be armored. Exposed plastic cables get easily damaged by pots and pans, leading to short circuits under the sink.' }
    ]
  },
  {
    category: 'Living Areas & Bedrooms',
    icon: <Home className="w-5 h-5" />,
    items: [
      { id: 'l1', question: 'Do the wall outlets lack a grounding pin/hole (e.g., older 2-pin ungrounded styles)?', danger: true, costVal: 5000, why: 'Ungrounded outlets indicate obsolete wiring. Plugging metal-cased modern appliances into them risks severe electric shock. Rewiring a house is incredibly expensive.' },
      { id: 'l2', question: 'Do any light switches feel "spongy" or make a crackling sound when flipped?', danger: true, costVal: 20, why: 'Crackling (arcing) inside a switch is a fire hazard physically wearing down the internal contacts.' },
      { id: 'l3', question: 'Are there burn marks, melted plastic, or brown streaks on any outlet or switch faces?', danger: true, costVal: 150, why: 'This is evidence of extreme overheating and a near-miss fire. The wiring behind the wall must be rigorously inspected.' },
      { id: 'l4', question: 'Turn on the lights, then ask the seller to briefly turn on the AC or oven. Do the house lights dim significantly?', type: 'info', costVal: 1500, why: 'Severe dimming indicates an over-stressed electrical panel, undersized supply wires, or poor connections in the neutral grid.' },
      { id: 'l5', question: 'Do the outlets feel loose when you plug a standard charger in, allowing the plug to sag or fall out easily?', danger: true, costVal: 300, why: 'Loose internal contacts create electrical arcing and extreme heat. This is a very common cause of bedroom curtain fires.' }
    ]
  },
  {
    category: 'Exposed Areas & The Outside',
    icon: <Eye className="w-5 h-5" />,
    items: [
      { id: 'e1', question: 'In the loft/attic or basement ceiling, can you see wires that look like they\'ve been chewed by rodents or are dangling haphazardly?', danger: true, costVal: 800, why: 'Rodent damage destroys wire insulation, leaving bare copper exposed to wood framing. Haphazard wires indicate unpermitted amateur electrical work.' },
      { id: 'o1', question: 'Is the exterior electrical meter or main intake enclosure severely rusted, cracked, or pulling away from the wall?', danger: true, costVal: 1500, why: 'Water entering the meter base or main intake can cause a massive short circuit before the main breaker, creating a devastating fire.' },
      { id: 'o2', question: 'If you have overhead power lines, are tree branches actively resting on or rubbing against them?', danger: true, costVal: 500, why: 'Branches abrade the insulation over time, tearing the wire open and creating a serious hazard.' },
      { id: 'o3', question: 'Are exterior outdoor outlets missing weatherproof "in-use" bubble covers?', danger: true, costVal: 150, why: 'Standard flat covers do not protect cords when they are actively plugged in, leading to water ingress and tripped circuits in the rain.' },
      { id: 'o4', question: 'Look at the weatherhead (where power lines attach to the roof/house). Are the main wires severely frayed, cracking, or exposed to the elements?', danger: true, costVal: 1200, why: 'UV damage degrades the heavy incoming utility wires over decades. If they short together before the meter, there is no breaker to stop the explosion.' }
    ]
  }
];

const PROPERTY_SIZES = [
  { id: 'small', label: '1-2 Beds (Apartment/Small)', multiplier: 0.7 },
  { id: 'medium', label: '3-4 Beds (Average Home)', multiplier: 1.0 },
  { id: 'large', label: '5+ Beds (Large/Estate)', multiplier: 1.6 }
];

export const HomeBuyerScanner = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [propertySize, setPropertySize] = useState('medium');
  const [showScore, setShowScore] = useState(false);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [currencyConfig, setCurrencyConfig] = useState({ symbol: '$', multiplier: 1 });
  const [isLivePulse, setIsLivePulse] = useState(true);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showScore && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showScore]);

  useEffect(() => {
    setCurrencyConfig(getCurrency());
    const interval = setInterval(() => setIsLivePulse(prev => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('homebuyer_scanner', JSON.stringify({ answers, propertySize }));
  }, [answers, propertySize]);

  // Handle old localStorage format (just answers object) or new format
  useEffect(() => {
    const saved = localStorage.getItem('homebuyer_scanner');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers && parsed.propertySize) {
           setAnswers(parsed.answers);
           setPropertySize(parsed.propertySize);
        } else {
           setAnswers(parsed); // Fallback for old save data
        }
      } catch (e) {
        console.error("Failed to parse scanner save data", e);
      }
    }
  }, []);

  const handleSelect = (id: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateScore = () => {
    let redFlags = 0;
    let totalQuestions = 0;
    let estimatedCost = 0;
    const itemizedCosts: { desc: string, cost: number }[] = [];
    const sizeMultiplier = PROPERTY_SIZES.find(s => s.id === propertySize)?.multiplier || 1.0;

    SCAN_ITEMS.forEach(category => {
      category.items.forEach(item => {
        totalQuestions++;
        const val = answers[item.id];
        if (val !== null && val !== undefined) {
          const isRedFlag = item.textIfNo ? !val : val;
          if (item.danger && isRedFlag) {
            redFlags++;
            if (item.costVal) {
              const adjustedCost = item.costVal * sizeMultiplier;
              estimatedCost += adjustedCost;
              itemizedCosts.push({ desc: item.question, cost: adjustedCost });
            }
          }
          if (item.type === 'info' && isRedFlag && item.costVal) {
             const adjustedCost = item.costVal * sizeMultiplier;
             estimatedCost += adjustedCost; // Info constraints that still cost money
             itemizedCosts.push({ desc: item.question, cost: adjustedCost });
          }
        }
      });
    });

    return { redFlags, totalQuestions, estimatedCost, itemizedCosts };
  };

  const { redFlags, totalQuestions, estimatedCost, itemizedCosts } = calculateScore();
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const resultStatus = redFlags === 0 ? 'Certified Safe to Offer' : redFlags <= 2 ? 'Negotiation Leverage Present' : 'CRITICAL WARNING: Walk Away or Renegotiate';
  const resultColor = redFlags === 0 ? 'text-emerald-500' : redFlags <= 2 ? 'text-amber-500' : 'text-rose-500';
  const bgGlow = redFlags === 0 ? 'bg-emerald-500/10' : redFlags <= 2 ? 'bg-amber-500/10' : 'bg-rose-500/10';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 overflow-hidden relative pb-32">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px] mix-blend-multiply pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-[100px] mix-blend-multiply pointer-events-none translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <Helmet>
          <title>Open House 15-Minute Electrical Scanner | ElectroSafe.homes</title>
          <meta name="description" content="Buying a house? Use our premium 15-minute open house electrical scanner to find hidden red flags, avoid money pits, and negotiate thousands off the asking price." />
          <link rel="canonical" href="https://electrosafe.homes/home-buyer-scanner" />
        </Helmet>

        {/* Premium Hero Section */}
        <div className="text-center mb-16 no-print">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-white dark:bg-gray-900 dark:bg-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 dark:border-gray-800 dark:border-gray-800 rounded-full font-bold uppercase tracking-widest text-xs text-blue-600 animate-fade-in">
            <Search className="w-4 h-4" /> Live Property Auditing Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-gray-100 dark:text-gray-100 leading-tight mb-6 tracking-tight font-display drop-shadow-sm">
            The 15-Minute <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Open House Scanner
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Don't buy a money pit. Keep this open on your phone as you walk through the house to instantly spot <strong className="text-gray-900 dark:text-gray-100 dark:text-gray-100">{currencyConfig.symbol}10,000+</strong> electrical red flags before making an offer.
          </p>

          <div className="flex justify-center gap-6 text-sm font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400">
            <span className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded-full bg-red-500 ${isLivePulse ? 'shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'shadow-none'} transition-all duration-700`}></div> Live Threat Detection</span>
            <span className="flexItems-center gap-2 hidden md:flex"><CheckCircle className="w-4 h-4 text-green-500" /> Auto-Saving Progress</span>
            <span className="flex items-center gap-2 hidden sm:flex"><Globe className="w-4 h-4 text-blue-500" /> Universal Standards</span>
          </div>
        </div>

        {!showScore ? (
          <div className="space-y-12">
            
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-slide-up relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2 flex items-center gap-3 relative z-10"><Home className="w-6 h-6 text-indigo-500" /> Select Property Size</h3>
               <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-6 font-medium relative z-10">Electrical liability scales with the footprint of the home. Select the approximate size to calibrate the pricing engine accurately.</p>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                  {PROPERTY_SIZES.map(size => (
                     <button
                       key={size.id}
                       onClick={() => setPropertySize(size.id)}
                       className={`py-4 px-4 rounded-2xl font-bold transition-all border-2 text-sm flex flex-col items-center justify-center gap-1 ${
                         propertySize === size.id 
                         ? 'bg-indigo-50 text-indigo-700 border-indigo-500 shadow-md transform scale-[1.02]'
                         : 'bg-white dark:bg-gray-900 dark:bg-gray-900 text-gray-500 dark:text-gray-400 dark:text-gray-400 border-gray-100 dark:border-gray-800 dark:border-gray-800 hover:border-indigo-200 hover:bg-indigo-50/50'
                       }`}
                     >
                       <span className="text-base">{size.label.split('(')[0].trim()}</span>
                       <span className={`text-xs ${propertySize === size.id ? 'text-indigo-500/80' : 'text-gray-400'} font-medium`}>({size.label.split('(')[1]}</span>
                     </button>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-2xl flex gap-4 text-amber-900 shadow-sm relative overflow-hidden">
               <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-amber-100/50 to-transparent pointer-events-none"></div>
               <MapPin className="w-7 h-7 flex-shrink-0 text-amber-600 mt-0.5" />
               <div>
                  <h3 className="font-extrabold mb-1">Use this tool live during the viewing</h3>
                  <p className="text-sm font-medium opacity-90 leading-relaxed">Your progress saves automatically directly to your browser, even if you lose cellular connection inside the house or basement.</p>
               </div>
            </div>

            <div className="space-y-12">
              {SCAN_ITEMS.map((category, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 dark:bg-gray-900/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-8 animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-8 flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                      {category.icon}
                    </div>
                    {category.category}
                  </h2>

                  <div className="space-y-5">
                    {category.items.map((item: any) => (
                      <div key={item.id} className="group relative bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
                        {/* Status Indicator */}
                        <div className="absolute right-4 top-4">
                           {answers[item.id] !== undefined && answers[item.id] !== null && (
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                           )}
                        </div>

                        <div className="flex justify-between items-start mb-4 pr-6">
                          <p className="font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200 text-lg leading-snug">{item.question}</p>
                        </div>

                        <button 
                            onClick={() => setActiveInfo(activeInfo === item.id ? null : item.id)}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mb-5"
                          >
                            <Info className="w-4 h-4" /> Why does this matter?
                        </button>

                        {activeInfo === item.id && (
                          <div className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 p-5 mb-6 rounded-xl text-sm text-slate-700 dark:text-gray-300 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                            <p className="mb-3 leading-relaxed"><strong>The Risk:</strong> {item.why}</p>
                            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 dark:border-gray-700 font-bold text-slate-900 dark:text-gray-100 dark:text-gray-100 shadow-sm">
                               <AlertTriangle className="w-4 h-4 text-amber-500" />
                               Est. Repair: {item.costVal ? <span className="text-red-600">{currencyConfig.symbol}{Math.round(item.costVal * currencyConfig.multiplier).toLocaleString()}+</span> : 'Variable'}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <button
                             onClick={() => handleSelect(item.id, true)}
                             className={`py-4 rounded-xl font-bold border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                                answers[item.id] === true 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] filter-none' 
                                : 'bg-transparent text-gray-500 dark:text-gray-400 dark:text-gray-400 border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
                             }`}
                          >
                             {answers[item.id] === true && <CheckCircle className="w-5 h-5" />}
                             YES
                          </button>
                          <button
                             onClick={() => handleSelect(item.id, false)}
                             className={`py-4 rounded-xl font-bold border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                                answers[item.id] === false 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] filter-none' 
                                : 'bg-transparent text-gray-500 dark:text-gray-400 dark:text-gray-400 border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
                             }`}
                          >
                             {answers[item.id] === false && <CheckCircle className="w-5 h-5" />}
                             NO
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Floating Action Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none fade-in slide-in-from-bottom-5">
              <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-3xl p-4 md:px-8 md:py-5 flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto transition-transform hover:-translate-y-1">
                 
                 <div className="flex items-center gap-5 w-full md:w-auto">
                   {/* Radial Progress visually */}
                   <div className="relative flex shrink-0 items-center justify-center w-14 h-14 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-inner">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125" strokeDashoffset={125 - (125 * progressPercent) / 100} className="text-blue-600 transition-all duration-1000 ease-out" />
                      </svg>
                      <span className="absolute text-xs font-black text-gray-800 dark:text-gray-200 dark:text-gray-200">{progressPercent}%</span>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Audit Progress</p>
                     <p className="text-lg font-black text-gray-900 dark:text-gray-100 dark:text-gray-100 leading-none">{answeredCount} of {totalQuestions} Queries</p>
                   </div>
                 </div>

                 <button
                   onClick={() => setShowScore(true)}
                   disabled={!isComplete}
                   className={`w-full md:w-auto px-8 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                     isComplete 
                     ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 group border border-transparent' 
                     : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700 dark:border-gray-700'
                   }`}
                 >
                   Generate Intelligence Report
                   {isComplete && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                 </button>
              </div>
            </div>
            
            {/* Pad the bottom for the fixed bar */}
            <div className="h-20"></div>
          </div>
        ) : (
          <div ref={resultRef} className="animate-in fade-in zoom-in-95 duration-700 max-w-3xl mx-auto scroll-mt-24">
             
             {/* Certificate Style Report heading */}
             <div className="text-center mb-8">
               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-900 dark:bg-gray-900 shadow-xl mb-6 relative">
                 <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-gray-800 dark:border-gray-800"></div>
                 {redFlags === 0 ? <ShieldCheck className="w-10 h-10 text-emerald-500" /> : <ShieldAlert className={`w-10 h-10 ${resultColor}`} />}
               </div>
               <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 dark:text-gray-100 tracking-tight font-display mb-2">Final Diagnostic Report</h1>
               <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 font-medium">Property Electrical Assessment Summary</p>
             </div>

             <div className={`relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-gray-900 dark:bg-gray-900 border shadow-2xl mb-12 ${redFlags > 0 ? 'border-red-100 shadow-red-900/5' : 'border-emerald-100 shadow-emerald-900/5'}`}>
                {/* Background glow in report */}
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-multiply opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3 ${bgGlow}`}></div>

                <div className="relative z-10 text-center border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 pb-10 mb-10">
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Threat Level Declaration</h2>
                  <h3 className={`text-4xl md:text-5xl font-black ${resultColor} drop-shadow-sm`}>{resultStatus}</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 mb-8">
                  <div className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                    <p className="text-slate-500 dark:text-gray-400 dark:text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Identified Red Flags</p>
                    <p className={`text-7xl font-black font-display tracking-tighter ${redFlags > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{redFlags}</p>
                    <p className="text-slate-400 text-sm font-bold mt-2">Out of {totalQuestions} checked areas</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                    <p className="text-slate-500 dark:text-gray-400 dark:text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Liability Estimation</p>
                    <p className="text-5xl font-black text-slate-900 dark:text-gray-100 dark:text-gray-100 font-display tracking-tighter mt-2">{currencyConfig.symbol}{Math.round(estimatedCost * currencyConfig.multiplier).toLocaleString()}<span className="text-3xl text-slate-400">+</span></p>
                    <p className="text-slate-400 text-sm font-bold mt-2">Hardware & Labor Minimums</p>
                  </div>
                </div>

                {itemizedCosts.length > 0 && (
                  <div className="w-full text-left bg-slate-50 dark:bg-gray-800 dark:bg-gray-800/80 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-gray-700 dark:border-gray-700 shadow-inner relative z-10">
                    <h4 className="text-lg font-black text-slate-800 dark:text-gray-200 dark:text-gray-200 mb-6 flex items-center gap-2">
                       <DollarSign className="w-6 h-6 text-slate-400" />
                       Itemized Liability Breakdown
                    </h4>
                    <ul className="space-y-4">
                      {itemizedCosts.map((item, idx) => (
                        <li key={idx} className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 dark:border-gray-700 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                           <span className="text-slate-700 dark:text-gray-300 dark:text-gray-300 text-sm font-medium leading-relaxed max-w-xl">{item.desc}</span>
                           <span className="font-black text-rose-600 text-lg shrink-0 sm:text-right">{currencyConfig.symbol}{Math.round(item.cost * currencyConfig.multiplier).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {redFlags > 0 ? (
                  <div className="mt-10 bg-gradient-to-br from-rose-50 to-white p-8 rounded-3xl border border-rose-100 shadow-inner relative z-10">
                    <h4 className="font-extrabold text-rose-800 flex items-center gap-3 mb-5 text-xl">
                      <AlertTriangle className="w-6 h-6 text-rose-600" />
                      Tactical Negotiation Strategy
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-6 leading-relaxed font-medium">
                      You have identified <strong>{redFlags} severe electrical hazards</strong>. Do not absorb this liability blindly. Provide this diagnostic directly to your real estate agent and enforce one of the following contingencies:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-rose-50 flex gap-4 items-start">
                        <div className="bg-rose-100 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center font-black shrink-0 mt-0.5">1</div>
                        <p className="text-gray-800 dark:text-gray-200 dark:text-gray-200 font-medium">Require the seller to hire a certified & licensed electrician to rectify these specific issues prior to closing.</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-rose-50 flex gap-4 items-start">
                        <div className="bg-rose-100 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center font-black shrink-0 mt-0.5">2</div>
                        <p className="text-gray-800 dark:text-gray-200 dark:text-gray-200 font-medium">Demand a price deduction of <strong>{currencyConfig.symbol}{Math.round((estimatedCost + 1000) * currencyConfig.multiplier).toLocaleString()}</strong> as a contingency credit to commission the repairs yourself post-purchase.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-10 bg-gradient-to-br from-emerald-50 to-white p-8 rounded-3xl border border-emerald-100 shadow-inner relative z-10 flex gap-5 items-start">
                    <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-extrabold text-emerald-900 mb-3 text-xl">No Obvious Visual Threats Detected</h4>
                      <p className="text-emerald-800/80 leading-relaxed font-medium">
                        Based on this visual perimeter scan, the property's visible electrical facade appears robust. While this is an excellent sign, ensure a formalized home inspector still verifies the internal and hidden infrastructure prior to finalizing.
                      </p>
                    </div>
                  </div>
                )}
             </div>

             {/* Actions */}
             <div className="flex flex-col gap-8 max-w-md mx-auto relative z-10 bg-white dark:bg-gray-900 dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800">
                <ShareableScoreCard 
                  score={totalQuestions - redFlags}
                  maxScore={totalQuestions}
                  rating={resultStatus}
                  riskLevel={redFlags === 0 ? 'low' : redFlags <= 2 ? 'medium' : 'high'}
                  toolName="Home Buyer Scanner"
                  toolPath="/home-buyer-scanner"
                />
                
                <div className="h-px w-full bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50"></div>

                <button
                  onClick={() => navigate('/quote-analyzer')}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-5 h-5" /> Negotiating? Analyze Their Quote
                </button>

                <button
                  onClick={() => {
                    setAnswers({});
                    setPropertySize('medium');
                    localStorage.removeItem('homebuyer_scanner');
                    setShowScore(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 dark:text-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Scan Another Property
                </button>
             </div>

             <div className="mt-20">
               <TrustBadge />
             </div>
             <div className="mt-8">
               <RelatedTools currentPath="/home-buyer-scanner" count={2} />
             </div>
             
             <div className="mt-12 text-center text-xs text-slate-400 max-w-lg mx-auto">
               <p><strong>Disclaimer:</strong> This tool provides probabilistic visual estimates based on regional averages. It does NOT replace a licensed home inspection or a certified electrician's quote. Prices vary wildly by contractor and exact location.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

