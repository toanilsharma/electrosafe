
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

export const NewHomeGuide = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* HERO SECTION */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          For Homeowners & Builders
        </div>
        <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          The Non-Expert’s Guide to a <br className="hidden md:block"/> <span className="text-blue-600">Perfect Electrical Setup</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
          Building your dream home? Don't just trust the contractor blindly. 
          Use this <strong>Master Plan</strong> to manage budget, spot scams, and ensure your home is ready for the next 50 years.
        </p>
      </div>

      {/* PHASE 0: MONEY & HIRING */}
      <section className="mb-16 md:mb-24 relative">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 hidden lg:block"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 mb-4 z-10 relative">
              <DollarSign className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-green-900 uppercase tracking-widest pl-2 lg:pl-0">Phase 0</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Hiring & Money</h3>
          </div>

          <div className="flex-grow space-y-8">
            {/* Quote Guide */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Understanding the Quote</h3>
              <p className="text-gray-600 mb-6">
                Electricians usually charge in two ways. Know the difference so you don't get cheated.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-5 md:p-6 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-900 mb-2 text-lg">1. The "Point" Rate</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    You pay per switch/socket box.
                  </p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li><span className="text-green-600 font-bold">Pros:</span> Easy to calculate for small jobs.</li>
                    <li><span className="text-red-600 font-bold">The Trap:</span> They might count one switchboard as 10 separate "points". <strong>Clarify definition of a 'Point' first.</strong></li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-5 md:p-6 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2 text-lg">2. The "Square Ft" Rate</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Flat fee based on house size.
                  </p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li><span className="text-green-600 font-bold">Pros:</span> Fixed budget. No surprises.</li>
                    <li><span className="text-red-600 font-bold">The Trap:</span> They might do minimum work to save time. <strong>Agree on minimum socket count upfront.</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* The Scam Detector */}
            <div className="bg-red-50 rounded-3xl p-6 md:p-8 border border-red-100">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <Scissors className="w-6 h-6" /> The "Cut Corners" Scam Detector
              </h3>
              <p className="text-red-800 mb-6 text-sm md:text-base">If you see these happening, your electrician is cheating you on safety.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100">
                   <div className="font-bold text-gray-900 mb-2">The "Half Neutral"</div>
                   <p className="text-xs md:text-sm text-gray-600">
                     Using one thin neutral wire for 3-4 circuits to save copper. <br/>
                     <strong>Result:</strong> Voltage fluctuations and flickering lights.
                   </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100">
                   <div className="font-bold text-gray-900 mb-2">The "Fake Ground"</div>
                   <p className="text-xs md:text-sm text-gray-600">
                     Connecting the ground pin to the neutral pin inside the socket instead of running a real ground wire.<br/>
                     <strong>Result:</strong> Deadly shock hazard.
                   </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100">
                   <div className="font-bold text-gray-900 mb-2">The "Brand Mix"</div>
                   <p className="text-xs md:text-sm text-gray-600">
                     Showing you a roll of expensive wire (e.g., Finolex/Polycab) but installing cheap generic wire inside the walls.<br/>
                     <strong>Result:</strong> Fire risk in 5 years.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 1: PLANNING & LAYOUT */}
      <section className="mb-16 md:mb-24 relative">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 hidden lg:block"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 mb-4 z-10 relative">
              <LayoutTemplate className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-blue-900 uppercase tracking-widest pl-2 lg:pl-0">Phase 1</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Planning & Layout</h3>
          </div>

          <div className="flex-grow space-y-8">
            
            {/* 1.1 SOCKET DENSITY RULES */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-600" /> Socket Density Rules
              </h3>
              <p className="text-gray-600 mb-6">
                Contractors often install the bare minimum to finish quickly. Use these "Golden Rules" to ensure you never need an extension cord.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-gray-900 font-bold">Room</th>
                      <th className="p-4 text-gray-900 font-bold">Density Rule</th>
                      <th className="p-4 text-gray-900 font-bold">Critical Placements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-bold text-blue-800">Kitchen</td>
                      <td className="p-4 font-mono">1 socket per 6 sq ft</td>
                      <td className="p-4 text-gray-600">Countertop (every 4ft), Island, Fridge, Micro, Chimney, RO</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-blue-800">Living Room</td>
                      <td className="p-4 font-mono">1 socket per 10 sq ft</td>
                      <td className="p-4 text-gray-600">Near every corner, Behind TV (x4), Beside sofas (charging)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-blue-800">Bedroom</td>
                      <td className="p-4 font-mono">1 socket per 12 sq ft</td>
                      <td className="p-4 text-gray-600">Bedside (both sides), Desk area (x4), AC point</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-blue-800">Hallways</td>
                      <td className="p-4 font-mono">1 socket every 15 ft</td>
                      <td className="p-4 text-gray-600">For vacuum cleaners and night lights</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.2 HIGH POWER FUTURE PROOFING */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" /> Future-Proofing: High Power
              </h3>
              <p className="text-indigo-200 mb-8 max-w-3xl">
                Homes are becoming "All Electric". Gas stoves and petrol cars are disappearing. Your wiring must be ready for heavy loads 10 years from now.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Car className="w-5 h-5 text-green-400" /> EV Charging Prep
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Install a <strong>40A or 63A dedicated circuit</strong> to the garage/driveway.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Use <strong>6.0mm² or 10.0mm²</strong> armored cable.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Even if you don't have an EV yet, run the conduit now.</li>
                  </ul>
                </div>

                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" /> Induction Cooking
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> Induction cooktops draw massive power (up to 7kW).</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> Run an empty <strong>1-inch conduit</strong> to the kitchen island/stove area.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> Plan for a <strong>32A or 40A</strong> breaker space in your panel.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1.3 Standard Heights */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
               <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <Ruler className="w-6 h-6 text-orange-500" /> The "Golden Numbers" (Heights)
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                 <div className="p-4 bg-gray-50 rounded-xl">
                   <div className="text-3xl font-extrabold text-gray-900 mb-1">50"</div>
                   <div className="text-xs uppercase font-bold text-gray-500">Light Switches</div>
                   <div className="text-xs text-gray-400">(from floor)</div>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl">
                   <div className="text-3xl font-extrabold text-gray-900 mb-1">12"</div>
                   <div className="text-xs uppercase font-bold text-gray-500">Power Sockets</div>
                   <div className="text-xs text-gray-400">(General Use)</div>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl">
                   <div className="text-3xl font-extrabold text-gray-900 mb-1">42"</div>
                   <div className="text-xs uppercase font-bold text-gray-500">Kitchen Counter</div>
                   <div className="text-xs text-gray-400">(Above slab)</div>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl">
                   <div className="text-3xl font-extrabold text-gray-900 mb-1">60"</div>
                   <div className="text-xs uppercase font-bold text-gray-500">Wall TV</div>
                   <div className="text-xs text-gray-400">(Center point)</div>
                 </div>
               </div>
            </div>

            {/* 1.4 The "Forgot-Me-Nots" */}
            <div className="bg-yellow-50 rounded-3xl p-6 md:p-8 border border-yellow-100">
              <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5" /> Don't Forget These Points!
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Doorbell (Chime & Button)', 'WiFi Router (Central ceiling point)', 'CCTV Cameras (Corners)', 'Inverter/Battery location', 'Water Purifier (RO)', 'Dishwasher (Under sink)', 'Curtain Motors', 'Mirror Lights'].map(item => (
                  <span key={item} className="px-3 py-1.5 bg-white text-yellow-800 border border-yellow-200 rounded-lg text-sm font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHASE 2: SHOPPING (Procurement) */}
      <section className="mb-16 md:mb-24 relative">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 hidden lg:block"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 mb-4 z-10 relative">
              <ShoppingCart className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-purple-900 uppercase tracking-widest pl-2 lg:pl-0">Phase 2</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Smart Shopping</h3>
          </div>

          <div className="flex-grow space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Wire Quality Test */}
               <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" /> The "Lighter Test" for Wires
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Cheap insulation catches fire. Good insulation melts but self-extinguishes.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                    <li>Take a scrap piece of wire.</li>
                    <li>Hold a lighter flame to it for 10 seconds.</li>
                    <li>Remove flame.</li>
                    <li><strong>Result:</strong> If it keeps burning with a large flame, <strong>REJECT IT</strong>. It must stop burning instantly (FR/FRLS Grade).</li>
                  </ol>
               </div>

               {/* Switch Quality Test */}
               <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" /> The "Heavy Box" Test
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Copper and Brass are heavy. Cheap alloys are light.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Pick up a box of switches/sockets. It should feel surprisingly heavy.</li>
                    <li>Look at the back terminals. You want to see <strong>Brass (Yellow)</strong>, not Steel (Silver). Steel rusts and causes fires.</li>
                    <li>Click the switch. It should be a crisp snap, not a mushy slide.</li>
                  </ul>
               </div>

            </div>
          </div>
        </div>
      </section>

      {/* PHASE 3: EXECUTION (Supervision) */}
      <section className="mb-16 md:mb-24 relative">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 hidden lg:block"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
           <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 mb-4 z-10 relative">
              <Eye className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-orange-900 uppercase tracking-widest pl-2 lg:pl-0">Phase 3</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Supervision</h3>
          </div>

          <div className="flex-grow space-y-8">
            
            {/* The Pre-Plaster Checklist */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">The "Pre-Plaster" Checklist</h3>
              <p className="text-gray-600 mb-6">Once they cement the walls, it's too late. Check these before the plaster/drywall goes up.</p>
              
              <div className="space-y-3">
                 {[
                   'Conduits are straight (diagonal pipes crack walls).',
                   'Conduits have a "Pull Wire" (GI wire) inside them for pulling cables later.',
                   'Wall boxes are level (use a spirit level).',
                   'Separate pipes for Power and Data (WiFi/TV). Keeping them 1ft apart prevents interference.',
                   'Photos taken of all wall runs (for future drilling reference).'
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="mt-1 w-5 h-5 rounded-full border-2 border-orange-400 flex-shrink-0"></div>
                      <span className="text-gray-800 font-medium text-sm">{item}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Wire Color Code */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <PenTool className="w-5 h-5 text-orange-500" /> Color Code Enforcement
               </h3>
               <p className="text-sm text-gray-600 mb-4">
                 Contractors love using one color (Red) for everything to save money on buying rolls. <strong>Do not allow this.</strong> It makes future repairs a nightmare.
               </p>
               <div className="grid grid-cols-3 gap-2 text-center text-xs md:text-sm font-bold text-white">
                  <div className="bg-red-600 py-3 rounded-lg">RED / BROWN<br/><span className="font-normal opacity-80">Phase (Live)</span></div>
                  <div className="bg-black py-3 rounded-lg">BLACK / BLUE<br/><span className="font-normal opacity-80">Neutral</span></div>
                  <div className="bg-green-600 py-3 rounded-lg">GREEN<br/><span className="font-normal opacity-80">Earth/Ground</span></div>
               </div>
            </div>

            {/* Inverter Logic */}
            <div className="bg-orange-50 rounded-3xl p-6 md:p-8 border border-orange-100">
               <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                 <BatteryCharging className="w-5 h-5" /> The "Inverter Wire"
               </h3>
               <p className="text-sm text-orange-800">
                 Ask your electrician to run a separate <strong>White or Yellow</strong> wire to every room's fan and one light. <br/><br/>
                 This "Inverter Return" wire lets you power ONLY essential items during a blackout, keeping your battery running longer. Without this, you have to power the whole house or nothing.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 4: FUTURE PROOFING */}
      <section className="mb-16 md:mb-24 relative">
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 hidden lg:block"></div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 mb-4 z-10 relative">
              <Maximize className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-indigo-900 uppercase tracking-widest pl-2 lg:pl-0">Phase 4</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">Future Proofing</h3>
          </div>

          <div className="flex-grow space-y-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                   <div className="bg-indigo-50 p-3 rounded-full"><Sun className="w-6 h-6 text-indigo-600" /></div>
                   <div>
                     <h4 className="font-bold text-gray-900">Solar Conduit</h4>
                     <p className="text-xs text-gray-500 mt-1">Run an empty 1-inch pipe from the Roof to the Main Panel. Saves ugly external piping later.</p>
                   </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                   <div className="bg-indigo-50 p-3 rounded-full"><Wifi className="w-6 h-6 text-indigo-600" /></div>
                   <div>
                     <h4 className="font-bold text-gray-900">Ceiling WiFi</h4>
                     <p className="text-xs text-gray-500 mt-1">Power points on the ceiling of central hallways for mesh WiFi nodes.</p>
                   </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                   <div className="bg-indigo-50 p-3 rounded-full"><Video className="w-6 h-6 text-indigo-600" /></div>
                   <div>
                     <h4 className="font-bold text-gray-900">Smart Curtains</h4>
                     <p className="text-xs text-gray-500 mt-1">Power point near the curtain rod box (pelmet) for future motorized blinds.</p>
                   </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                   <div className="bg-indigo-50 p-3 rounded-full"><Cpu className="w-6 h-6 text-indigo-600" /></div>
                   <div>
                     <h4 className="font-bold text-gray-900">Neutral at Switch</h4>
                     <p className="text-xs text-gray-500 mt-1">Ensure Neutral wire is available at every switchboard for Smart Home automation.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PHASE 5: THE HANDOVER */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-center items-start">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 mb-4 z-10 relative">
              <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-slate-800 uppercase tracking-widest pl-2 lg:pl-0">Phase 5</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 pl-2 lg:pl-0">The Handover</h3>
          </div>

          <div className="flex-grow">
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl">
               <h3 className="text-2xl font-bold mb-4">Before You Pay the Final Bill...</h3>
               <p className="text-slate-300 mb-8">
                 Ask for these three things. If they hesitate, something is wrong.
               </p>

               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="bg-green-500/20 p-2 rounded-lg h-fit"><FileText className="w-6 h-6 text-green-400" /></div>
                   <div>
                     <h4 className="font-bold text-lg">1. The "As-Built" Diagram</h4>
                     <p className="text-sm text-slate-400 mt-1">A drawing showing exactly where pipes run in the walls. Essential so you don't drill into a wire while hanging a painting.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="bg-blue-500/20 p-2 rounded-lg h-fit"><Activity className="w-6 h-6 text-blue-400" /></div>
                   <div>
                     <h4 className="font-bold text-lg">2. Insulation Resistance Test Report</h4>
                     <p className="text-sm text-slate-400 mt-1">Proof that there are no nicks or cuts in the wire insulation inside the pipes.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="bg-orange-500/20 p-2 rounded-lg h-fit"><Camera className="w-6 h-6 text-orange-400" /></div>
                   <div>
                     <h4 className="font-bold text-lg">3. Panel Labels</h4>
                     <p className="text-sm text-slate-400 mt-1">Every breaker must be labeled. "AC Bedroom 1", not just "Switch 1".</p>
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

    </div>
  );
};
