
import React from 'react';
import { 
  Ruler, 
  ShoppingCart, 
  Eye, 
  Wifi, 
  CheckCircle2, 
  AlertOctagon, 
  Zap, 
  ArrowRight, 
  LayoutTemplate, 
  Globe, 
  PenTool, 
  Maximize,
  BatteryCharging,
  Video,
  DollarSign,
  Scissors,
  ShieldCheck,
  Activity,
  FileText,
  Sun,
  Cpu,
  HelpCircle,
  Car,
  Calculator,
  Camera,
  Flame
} from 'lucide-react';
import { StickyTOC, TOCItem } from '../components/StickyTOC';
import { RelatedTools } from '../components/RelatedTools';

const TOC_ITEMS: TOCItem[] = [
  { id: 'phase-0', label: 'Phase 0: Hiring & Money' },
  { id: 'phase-1', label: 'Phase 1: Planning & Layout' },
  { id: 'phase-2', label: 'Phase 2: Smart Shopping' },
  { id: 'phase-3', label: 'Phase 3: Supervision' },
  { id: 'phase-4', label: 'Phase 4: Future Proofing' },
  { id: 'phase-5', label: 'Phase 5: The Handover' },
];


export const NewHomeGuide = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <StickyTOC items={TOC_ITEMS} />

      {/* PREMIUM HERO SECTION */}
      <div className="relative rounded-3xl overflow-hidden mb-16 md:mb-24 shadow-2xl animate-fade-in group">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541888086225-b4618a8b16fa?auto=format&fit=crop&q=80&w=2000" 
            alt="New home blueprint" 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/80 to-slate-900/90 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 px-8 py-16 md:py-24 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-slide-up backdrop-blur-md">
            <LayoutTemplate className="w-4 h-4" /> For Homeowners & Builders
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-slide-up delay-100">
            The Master Plan for a <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Flawless Electrical Setup
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            Don't trust the contractor blindly. Use this guide to manage budget, spot common scams, and ensure your dream home is ready for the next 50 years.
          </p>
        </div>
      </div>

      {/* PHASE 0: MONEY & HIRING */}
      <section id="phase-0" className="mb-20 md:mb-32 relative animate-slide-up delay-300">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-transparent hidden lg:block opacity-30"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-600/20 -rotate-3 mb-4 z-10 relative group-hover:rotate-0 transition-transform">
              <DollarSign className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest pl-2 lg:pl-0">Phase 0</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Hiring & Money</h3>
          </div>

          <div className="flex-grow space-y-8">
            {/* Quote Guide */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Quote</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Electricians usually charge in two specific ways. Knowing the difference stops you from being cheated before work even begins.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
                  <div className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold text-xl mb-4">1</div>
                  <h4 className="font-bold text-green-900 mb-2 text-lg">The "Point" Rate</h4>
                  <p className="text-sm text-gray-600 mb-4 h-10">You pay per individual switch/socket box installed.</p>
                  <ul className="text-sm space-y-3">
                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="text-gray-700"><strong>Pros:</strong> Easy to calculate for small jobs.</span></li>
                    <li className="flex gap-2"><AlertOctagon className="w-5 h-5 text-red-500 shrink-0" /> <span className="text-gray-700"><strong>The Trap:</strong> They might count one large switchboard as 10 separate "points". Clarify the definition first.</span></li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-xl mb-4">2</div>
                  <h4 className="font-bold text-blue-900 mb-2 text-lg">The "Square Ft" Rate</h4>
                  <p className="text-sm text-gray-600 mb-4 h-10">Flat fee based on the total area of the house.</p>
                  <ul className="text-sm space-y-3">
                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="text-gray-700"><strong>Pros:</strong> Fixed budget with absolutely zero surprises.</span></li>
                    <li className="flex gap-2"><AlertOctagon className="w-5 h-5 text-red-500 shrink-0" /> <span className="text-gray-700"><strong>The Trap:</strong> They might do minimum work to maximize profit. Agree on a minimum socket count upfront.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* The Scam Detector */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-[2rem] p-8 md:p-10 border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Scissors className="w-48 h-48 text-red-900" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Red Flags
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  The "Cut Corners" Scam Detector
                </h3>
                <p className="text-red-800/80 mb-8 text-lg">If you see these happening on site, your electrician is cheating you on life-saving safety features.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 hover:-translate-y-1 transition-transform">
                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4"><Zap className="w-5 h-5" /></div>
                     <div className="font-bold text-gray-900 mb-2">The "Half Neutral"</div>
                     <p className="text-sm text-gray-600">
                       Using one thin neutral wire for 3-4 circuits to save copper. <br/><br/>
                       <strong className="text-red-600">Result:</strong> Voltage fluctuations and flickering lights across the house.
                     </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 hover:-translate-y-1 transition-transform delay-100">
                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4"><Activity className="w-5 h-5" /></div>
                     <div className="font-bold text-gray-900 mb-2">The "Fake Ground"</div>
                     <p className="text-sm text-gray-600">
                       Connecting the ground pin to the neutral pin inside the socket instead of running a real ground wire.<br/><br/>
                       <strong className="text-red-600">Result:</strong> Extremely deadly shock hazard.
                     </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 hover:-translate-y-1 transition-transform delay-200">
                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4"><ShoppingCart className="w-5 h-5" /></div>
                     <div className="font-bold text-gray-900 mb-2">The "Brand Mix"</div>
                     <p className="text-sm text-gray-600">
                       Showing you a roll of expensive wire but installing cheap generic wire inside the walls.<br/><br/>
                       <strong className="text-red-600">Result:</strong> Insulation melts, massive fire risk in 5 years.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 1: PLANNING & LAYOUT */}
      <section id="phase-1" className="mb-20 md:mb-32 relative animate-slide-up delay-400">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent hidden lg:block opacity-30"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 -rotate-3 mb-4 z-10 relative group-hover:rotate-0 transition-transform">
              <LayoutTemplate className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest pl-2 lg:pl-0">Phase 1</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Planning & Layout</h3>
          </div>

          <div className="flex-grow space-y-8">
            
            {/* 1.1 SOCKET DENSITY RULES */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Golden Rules
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-600" /> Socket Density Matrix
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Contractors install the bare minimum to finish fast. Use this matrix to ensure you never need a dangerous extension cord again.
              </p>
              
              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <table className="w-full text-left text-sm md:text-base">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 md:p-5 text-gray-900 font-bold w-1/4">Room</th>
                      <th className="p-4 md:p-5 text-gray-900 font-bold w-1/4">Density Rule</th>
                      <th className="p-4 md:p-5 text-gray-900 font-bold w-1/2">Critical Placements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-blue-900 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Kitchen</td>
                      <td className="p-4 md:p-5 font-mono text-sm text-gray-600 bg-gray-50/50">1 socket / 6 sq ft</td>
                      <td className="p-4 md:p-5 text-gray-600">Countertop (every 4ft), Island, Fridge, Micro, Chimney, RO</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-blue-900 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Living Room</td>
                      <td className="p-4 md:p-5 font-mono text-sm text-gray-600 bg-gray-50/50">1 socket / 10 sq ft</td>
                      <td className="p-4 md:p-5 text-gray-600">Near every corner, Behind TV (x4), Beside sofas (charging)</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-blue-900 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Bedroom</td>
                      <td className="p-4 md:p-5 font-mono text-sm text-gray-600 bg-gray-50/50">1 socket / 12 sq ft</td>
                      <td className="p-4 md:p-5 text-gray-600">Bedside (both sides), Desk area (x4), AC point</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-blue-900 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Hallways</td>
                      <td className="p-4 md:p-5 font-mono text-sm text-gray-600 bg-gray-50/50">1 per 15 ft</td>
                      <td className="p-4 md:p-5 text-gray-600">For vacuum cleaners and motion night lights</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.2 HIGH POWER FUTURE PROOFING */}
            <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black text-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 opacity-10 blur-2xl">
                <Zap className="w-64 h-64 text-yellow-400" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-yellow-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 backdrop-blur-md">
                  10-Year Horizon
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-2">
                   Future-Proofing: High Power
                </h3>
                <p className="text-indigo-200 mb-8 max-w-3xl text-lg">
                  Homes are becoming "All Electric". Your wiring must be ready for heavy persistent loads 10 years from now.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <span className="w-10 h-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center"><Car className="w-5 h-5" /></span>
                      Level 2 EV Charging
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex gap-3"><span className="text-green-400 mt-0.5">•</span> Install a <strong>40A or 63A dedicated circuit</strong> to the garage/driveway.</li>
                      <li className="flex gap-3"><span className="text-green-400 mt-0.5">•</span> Use heavy <strong>6.0mm² or 10.0mm²</strong> copper armored cable.</li>
                      <li className="flex gap-3"><span className="text-green-400 mt-0.5">•</span> No EV yet? Run the empty conduit now to save $1k later.</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <span className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center"><Flame className="w-5 h-5" /></span>
                      Induction Mastery
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex gap-3"><span className="text-orange-400 mt-0.5">•</span> Induction ranges draw massive continuous power (up to 7kW).</li>
                      <li className="flex gap-3"><span className="text-orange-400 mt-0.5">•</span> Run a dedicated <strong>1-inch conduit</strong> straight to the island/stove area.</li>
                      <li className="flex gap-3"><span className="text-orange-400 mt-0.5">•</span> Reserve a <strong>32A or 40A</strong> double-pole breaker space in the panel.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.3 Standard Heights BENTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                   Ergonomics
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-8 max-w-[200px]">
                   The "Golden Numbers"
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <div className="text-4xl font-extrabold text-blue-600 tracking-tighter mb-1">50"</div>
                     <div className="text-sm font-bold text-gray-900">Light Switches</div>
                     <div className="text-xs text-gray-500">(from floor)</div>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <div className="text-4xl font-extrabold text-indigo-600 tracking-tighter mb-1">12"</div>
                     <div className="text-sm font-bold text-gray-900">Power Sockets</div>
                     <div className="text-xs text-gray-500">(General Use)</div>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <div className="text-4xl font-extrabold text-purple-600 tracking-tighter mb-1">42"</div>
                     <div className="text-sm font-bold text-gray-900">Kitchen Counters</div>
                     <div className="text-xs text-gray-500">(Above slab)</div>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <div className="text-4xl font-extrabold text-slate-800 tracking-tighter mb-1">60"</div>
                     <div className="text-sm font-bold text-gray-900">Wall TV Center</div>
                     <div className="text-xs text-gray-500">(Mount center)</div>
                   </div>
                 </div>
              </div>

              {/* 1.4 The "Forgot-Me-Nots" */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[2rem] p-8 border border-yellow-200 shadow-sm relative overflow-hidden flex flex-col justify-center hover:-translate-y-1 transition-transform">
                <div className="absolute -right-8 -top-8 text-yellow-500/10">
                  <AlertOctagon className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    Common Mistakes
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-900 mb-6">
                    Don't Forget These Points
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Doorbell (Chime & Mux)', 'Central Ceiling WiFi Nodes', 'CCTV Corner Pre-Wires', 'Battery Inverter Prep', 'RO Water Purifier', 'Under-Sink Dishwasher', 'Smart Curtain Pelmets', 'Bathroom Vanity Mirrors'].map(item => (
                      <span key={item} className="px-3 py-1.5 bg-white text-yellow-800 border-b-2 border-yellow-200 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap hover:bg-yellow-100 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHASE 2: SHOPPING (Procurement) */}
      <section id="phase-2" className="mb-20 md:mb-32 relative animate-slide-up delay-500">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent hidden lg:block opacity-30"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-500/20 -rotate-3 mb-4 z-10 relative group-hover:rotate-0 transition-transform">
              <ShoppingCart className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest pl-2 lg:pl-0">Phase 2</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Smart Shopping</h3>
          </div>

          <div className="flex-grow space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Wire Quality Test */}
               <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group overflow-hidden relative">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg"><Flame className="w-6 h-6 text-purple-600" /></div> 
                      The "Lighter Test"
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                      Cheap insulation catches fire. Good insulation melts but self-extinguishes. Don't build a fuse into your walls.
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">1</div>
                        <p className="text-sm text-gray-700 pt-1">Take a 2-inch scrap piece of wire from the bulk roll.</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">2</div>
                        <p className="text-sm text-gray-700 pt-1">Hold a lighter flame to it directly for exactly 10 seconds.</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-500 shrink-0">3</div>
                        <p className="text-sm text-gray-700 pt-1"><strong>Result:</strong> If it keeps burning with a large flame after removing the lighter, <strong>REJECT IT</strong>. It must stop burning instantly (FR/FRLS Grade).</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Switch Quality Test */}
               <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group overflow-hidden relative">
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg"><CheckCircle2 className="w-6 h-6 text-blue-600" /></div> 
                      The "Heavy Box" Test
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                      Copper and Brass are dense and heavy. Cheap alloys are light. Your hands can feel the difference.
                    </p>
                    <ul className="space-y-5">
                      <li className="flex gap-3 items-start border-b border-gray-50 pb-4">
                        <span className="text-blue-500 mt-1">•</span>
                        <div className="text-sm text-gray-700">Pick up a retail box of 10 switches. It should feel <strong>surprisingly heavy</strong>. If it feels light like plastic toys, reject the brand.</div>
                      </li>
                      <li className="flex gap-3 items-start border-b border-gray-50 pb-4">
                        <span className="text-blue-500 mt-1">•</span>
                        <div className="text-sm text-gray-700">Look at the back terminal screws. You want to see thick <strong>Brass (Yellowing)</strong>, never thin Steel (Silver). Steel rusts and generates massive heat.</div>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-blue-500 mt-1">•</span>
                        <div className="text-sm text-gray-700">Click the rocker mechanism. It should be a <strong>crisp, loud snap</strong>, not a mushy slow slide which causes electrical arcing.</div>
                      </li>
                    </ul>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </section>

      {/* PHASE 3: EXECUTION (Supervision) */}
      <section id="phase-3" className="mb-20 md:mb-32 relative animate-slide-up delay-[600ms]">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-transparent hidden lg:block opacity-30"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
           <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20 -rotate-3 mb-4 z-10 relative group-hover:rotate-0 transition-transform">
              <Eye className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest pl-2 lg:pl-0">Phase 3</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Supervision</h3>
          </div>

          <div className="flex-grow space-y-8">
            
            {/* The Pre-Plaster Checklist */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">The "Pre-Plaster" Checklist</h3>
              <p className="text-gray-600 mb-8 text-lg">Once they cement the walls, it's too late. Force your contractor to show you these 5 things before the drywall goes up.</p>
              
              <div className="space-y-4">
                 {[
                   { icon: <Ruler className="w-5 h-5 text-orange-500" />, text: 'Conduits are strictly horizontal/vertical (diagonal pipes crack walls).' },
                   { icon: <Zap className="w-5 h-5 text-orange-500" />, text: 'Conduits have a "Pull Wire" (GI wire) inside them for pulling cables later.' },
                   { icon: <LayoutTemplate className="w-5 h-5 text-orange-500" />, text: 'Wall boxes are perfectly level (verify with a spirit level tool).' },
                   { icon: <ShieldCheck className="w-5 h-5 text-orange-500" />, text: 'Separate pipes for Power and Data (WiFi/TV). 1ft gap prevents interference.' },
                   { icon: <Camera className="w-5 h-5 text-orange-500" />, text: 'Photos taken of ALL wall runs (saves you from drilling into a wire later).' }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 hover:bg-orange-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-gray-800 font-medium">{item.text}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Wire Color Code */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <PenTool className="w-6 h-6 text-orange-500" /> Color Enforcement
                 </h3>
                 <p className="text-sm text-gray-600 mb-6">
                   Contractors love using one color (Red) for everything to save money on bulk rolls. <strong>Do not allow this.</strong> It makes future repairs a nightmare.
                 </p>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                      <div className="w-4 h-4 rounded-full bg-red-600"></div>
                      <span className="font-bold text-gray-900">Phase (Live)</span>
                      <span className="text-xs text-red-600 font-bold uppercase tracking-wider">Red / Brown</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="w-4 h-4 rounded-full bg-slate-800"></div>
                      <span className="font-bold text-gray-900">Neutral</span>
                      <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Black / Blue</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-4 h-4 rounded-full bg-green-600"></div>
                      <span className="font-bold text-gray-900">Earth</span>
                      <span className="text-xs text-green-700 font-bold uppercase tracking-wider">Green / Y-G</span>
                    </div>
                 </div>
              </div>

              {/* Inverter Logic */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2rem] p-8 border border-orange-200 shadow-sm relative overflow-hidden group">
                 <div className="absolute -right-4 -bottom-4 bg-orange-200/50 w-32 h-32 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="relative z-10">
                   <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                     <BatteryCharging className="w-6 h-6" /> The "Inverter Wire"
                   </h3>
                   <p className="text-base text-orange-900/80 leading-relaxed mb-4">
                     Force your electrician to run a separate <strong>White or Yellow</strong> wire to exactly ONE fan and ONE light in every room.
                   </p>
                   <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-orange-200 text-sm text-orange-900 font-medium">
                     This "Inverter Return" wire lets you power ONLY essential items during a blackout, keeping your expensive battery running 4x longer.
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHASE 4: FUTURE PROOFING */}
      <section id="phase-4" className="mb-20 md:mb-32 relative animate-slide-up delay-[700ms]">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent hidden lg:block opacity-30"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 -rotate-3 mb-4 z-10 relative group-hover:rotate-0 transition-transform">
              <Maximize className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest pl-2 lg:pl-0">Phase 4</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Automation</h3>
          </div>

          <div className="flex-grow space-y-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                   <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Sun className="w-8 h-8 text-indigo-600" /></div>
                   <h4 className="font-bold text-xl text-gray-900 mb-2">Solar Conduit</h4>
                   <p className="text-sm text-gray-500">Run an empty 1-inch pipe from the Roof to the Main Panel. Saves thousands on ugly external piping later when you go solar.</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 delay-75">
                   <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Wifi className="w-8 h-8 text-indigo-600" /></div>
                   <h4 className="font-bold text-xl text-gray-900 mb-2">Ceiling WiFi Nodes</h4>
                   <p className="text-sm text-gray-500">Provide power points directly on the ceiling of central hallways for seamless commercial-grade mesh WiFi coverage.</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 delay-100">
                   <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Video className="w-8 h-8 text-indigo-600" /></div>
                   <h4 className="font-bold text-xl text-gray-900 mb-2">Smart Curtains</h4>
                   <p className="text-sm text-gray-500">Hide a power point near the top corners of your windows (inside the pelmet) for future automated motorized blinds.</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 delay-150">
                   <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Cpu className="w-8 h-8 text-indigo-600" /></div>
                   <h4 className="font-bold text-xl text-gray-900 mb-2">Smart Neutral</h4>
                   <p className="text-sm text-gray-500">Ensure a 'Neutral' wire is looped to every single light switch box. Essential for 99% of modern smart-home dimmer switches.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PHASE 5: THE HANDOVER */}
      <section id="phase-5" className="relative mb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20 -rotate-3 mb-4 z-10 relative group-hover:rotate-0 transition-transform">
              <ShieldCheck className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2 lg:pl-0">Phase 5</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">The Handover</h3>
          </div>

          <div className="flex-grow">
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
               
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold mb-4 font-display">Before You Pay the Final Bill...</h3>
                 <p className="text-slate-300 mb-10 text-lg max-w-2xl">
                   Contractors run away once paid. Demand these three critical documents. If they hesitate, withhold final payment until they comply.
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                     <div className="bg-green-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4"><FileText className="w-6 h-6 text-green-400" /></div>
                     <h4 className="font-bold text-xl mb-2">1. The "As-Built" Diagram</h4>
                     <p className="text-sm text-slate-300">A drawing showing exactly where pipes run in the walls. Essential so you don't drill into a live wire while hanging a painting.</p>
                   </div>
                   
                   <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                     <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4"><Activity className="w-6 h-6 text-blue-400" /></div>
                     <h4 className="font-bold text-xl mb-2">2. Megger Test Report</h4>
                     <p className="text-sm text-slate-300">Insulation Resistance test proof. Guarantees there are no nicks, cuts, or copper exposed in the wire insulation hidden inside the pipes.</p>
                   </div>
                   
                   <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                     <div className="bg-orange-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4"><Camera className="w-6 h-6 text-orange-400" /></div>
                     <h4 className="font-bold text-xl mb-2">3. Panel Directory</h4>
                     <p className="text-sm text-slate-300">Every single breaker must be accurately labeled. "Master Bed AC", not just a meaningless "Switch 1".</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL STANDARDS FOOTER */}
      <div className="mt-20 pt-10 border-t border-gray-200 text-center">
        <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-600" /> Global Standards Compliance
        </h3>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          This guide aligns with best practices from <strong>IEC 60364</strong> (Electrical Installations for Buildings) and 
          <strong> NEC</strong> (National Electrical Code) principles for safety, capacity planning, and future-proofing.
        </p>
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/new-home" count={3} />
    </div>
  );
};
