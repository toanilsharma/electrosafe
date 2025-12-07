import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GLOSSARY, LIGHTBULB_GUIDE } from '../data';
import { Lightbulb, CloudLightning, Activity, HelpCircle, Baby, Wifi, Search, AlertCircle, ArrowRight, CheckCircle2, Thermometer, Box, Ruler, Info } from 'lucide-react';

export const EverydaySafety = () => {
  const [activeTab, setActiveTab] = useState('lightbulb');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Everyday Safety Toolkit</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Simple tools for non-experts. From choosing the right lightbulb to handling a power outage.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            {[
              { id: 'lightbulb', label: 'Lightbulb Guide', icon: Lightbulb },
              { id: 'outage', label: 'Outage Detective', icon: HelpCircle },
              { id: 'firstaid', label: 'Shock First Aid', icon: Activity },
              { id: 'storm', label: 'Storm Mode', icon: CloudLightning },
              { id: 'smart', label: 'Smart Home Check', icon: Wifi },
              { id: 'baby', label: 'Baby Proofing', icon: Baby },
              { id: 'glossary', label: 'Speak "Electrician"', icon: Search },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-l-blue-600' : 'text-gray-700'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4">
          {activeTab === 'lightbulb' && <LightbulbTool />}
          {activeTab === 'outage' && <OutageTool />}
          {activeTab === 'firstaid' && <FirstAidTool />}
          {activeTab === 'storm' && <StormTool />}
          {activeTab === 'smart' && <SmartCheckTool />}
          {activeTab === 'baby' && <BabyProofTool />}
          {activeTab === 'glossary' && <GlossaryTool />}
        </div>
      </div>
    </div>
  );
};

const LightbulbTool = () => {
  const [kelvin, setKelvin] = useState(2700);
  const [mode, setMode] = useState<'color' | 'brightness' | 'fitting'>('color');

  const getCurrentGuide = () => {
    return LIGHTBULB_GUIDE.reduce((prev, curr) => {
      return (Math.abs(curr.k - kelvin) < Math.abs(prev.k - kelvin) ? curr : prev);
    });
  };

  const guide = getCurrentGuide();

  const WATT_CONVERTER = [
    { inc: 40, led: '5-6W', lumens: '450', room: 'Bedside Lamp' },
    { inc: 60, led: '8-10W', lumens: '800', room: 'Living Room / Hall' },
    { inc: 75, led: '11-13W', lumens: '1100', room: 'Kitchen / Task' },
    { inc: 100, led: '14-16W', lumens: '1600', room: 'Garage / Exterior' },
  ];

  const FITTINGS = [
    { id: 'E27', name: 'E27 (Large Screw)', desc: 'The standard screw base (27mm). Common in ceiling fixtures and lamps.' },
    { id: 'E14', name: 'E14 (Small Screw)', desc: 'Smaller 14mm screw. Common in chandeliers and night lights.' },
    { id: 'B22', name: 'B22 (Bayonet)', desc: 'Push-and-twist pin base. Standard in UK, India, Australia.' },
    { id: 'GU10', name: 'GU10 (Spotlight)', desc: 'Two pins with feet. Twist-lock. Common in recessed ceiling lights.' },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> Lightbulb Translator
      </h2>
      
      <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
        {['color', 'brightness', 'fitting'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m as any)}
            className={`flex-1 py-2 rounded-md text-sm font-bold capitalize transition-all ${mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'color' && (
        <div className="animate-in fade-in">
          <p className="text-gray-600 mb-8">Stop guessing at the supermarket. Slide to find the perfect light mood.</p>
          <div className="mb-12">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase">
              <span>Warm (Cozy)</span>
              <span>Cool (Focus)</span>
            </div>
            <input 
              type="range" 
              min="2700" 
              max="6500" 
              step="100"
              value={kelvin}
              onChange={(e) => setKelvin(parseInt(e.target.value))}
              className="w-full h-4 bg-gradient-to-r from-orange-300 via-yellow-100 to-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-4 font-mono font-bold text-xl text-gray-800">{kelvin}K</div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100">
            <div className="text-sm text-gray-500 uppercase font-bold mb-1">Best For</div>
            <div className="text-2xl font-bold text-gray-900 mb-4">{guide.use}</div>
            
            <div className="grid grid-cols-2 gap-4 text-left">
               <div className="bg-white p-4 rounded-lg shadow-sm">
                 <div className="text-xs text-gray-400 font-bold uppercase">Mood</div>
                 <div className="font-medium text-gray-800">{guide.mood}</div>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm">
                 <div className="text-xs text-gray-400 font-bold uppercase">Look for label</div>
                 <div className="font-medium text-gray-800">{guide.label}</div>
               </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'brightness' && (
        <div className="animate-in fade-in">
          <p className="text-gray-600 mb-6">Watts used to measure brightness. Now, <strong>Lumens</strong> measure brightness. Use this to replace old bulbs.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3">Old Bulb</th>
                  <th className="p-3 text-green-600">Buy LED</th>
                  <th className="p-3">Lumens (Brightness)</th>
                  <th className="p-3">Typical Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {WATT_CONVERTER.map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 font-bold text-gray-500">{row.inc} Watts</td>
                    <td className="p-3 font-bold text-green-600 text-lg">{row.led}</td>
                    <td className="p-3 font-mono">{row.lumens} lm</td>
                    <td className="p-3 text-gray-600">{row.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mode === 'fitting' && (
        <div className="animate-in fade-in grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FITTINGS.map((fit) => (
             <div key={fit.id} className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition">
               <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 font-bold text-gray-500">
                 {fit.id}
               </div>
               <h3 className="font-bold text-gray-900">{fit.name}</h3>
               <p className="text-sm text-gray-600 mt-1">{fit.desc}</p>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OutageTool = () => {
  const [step, setStep] = useState(0);

  const reset = () => setStep(0);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle className="text-purple-500" /> Power Outage Detective
      </h2>
      
      {step === 0 && (
        <div className="animate-in fade-in">
          <h3 className="text-xl font-bold mb-4">Question 1: Look out the window.</h3>
          <p className="mb-6 text-gray-600">Are the neighbors' lights on?</p>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 p-4 rounded-xl hover:bg-gray-200 font-bold text-left">No, entire street is dark.</button>
            <button onClick={() => setStep(2)} className="flex-1 bg-blue-50 p-4 rounded-xl hover:bg-blue-100 font-bold text-blue-800 text-left">Yes, neighbors have power.</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-in fade-in">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center mb-6">
            <div className="text-4xl mb-4">🏙️</div>
            <h3 className="text-xl font-bold mb-2">It's a Grid Failure.</h3>
            <p className="text-gray-600">The problem is with the utility company, not you.</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
             <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
               <Thermometer className="w-5 h-5" /> Food Safety Timer
             </h4>
             <div className="space-y-4">
               <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                 <span className="text-orange-900 font-medium">Fridge (Closed)</span>
                 <span className="text-orange-700 font-bold">Safe for 4 Hours</span>
               </div>
               <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                 <span className="text-orange-900 font-medium">Freezer (Half Full)</span>
                 <span className="text-orange-700 font-bold">Safe for 24 Hours</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-orange-900 font-medium">Freezer (Full)</span>
                 <span className="text-orange-700 font-bold">Safe for 48 Hours</span>
               </div>
             </div>
             <p className="text-xs text-orange-800 mt-4">
               <strong>Tip:</strong> Do NOT open the door to check. Every opening loses 30 mins of cold.
             </p>
          </div>
          <button onClick={reset} className="text-blue-600 underline mt-4 block text-center">Start Over</button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in">
           <h3 className="text-xl font-bold mb-4">Question 2: Check your home.</h3>
           <p className="mb-6 text-gray-600">Is the power out in the whole house, or just some rooms?</p>
           <div className="flex gap-4">
             <button onClick={() => setStep(3)} className="flex-1 bg-gray-100 p-4 rounded-xl hover:bg-gray-200 font-bold text-left">Whole House</button>
             <button onClick={() => setStep(4)} className="flex-1 bg-blue-50 p-4 rounded-xl hover:bg-blue-100 font-bold text-blue-800 text-left">Just One Room / Area</button>
           </div>
           <div className="mt-4 text-center"><button onClick={reset} className="text-sm text-gray-400">Back</button></div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center animate-in fade-in">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2 text-red-900">Main Breaker Tripped</h3>
          <p className="text-gray-700 mb-6">Your main safety switch has cut power to the whole house.</p>
          <div className="text-left bg-white p-4 rounded-lg shadow-sm mb-6">
            <h4 className="font-bold text-sm mb-2">Steps:</h4>
            <ol className="list-decimal pl-4 text-sm space-y-1">
              <li>Go to your electrical panel.</li>
              <li>Look for the largest switch (usually at top or bottom).</li>
              <li>If it's in the middle/off position, flip it OFF, then firmly ON.</li>
            </ol>
          </div>
          <button onClick={reset} className="text-blue-600 underline">Start Over</button>
        </div>
      )}

      {step === 4 && (
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center animate-in fade-in">
          <div className="text-4xl mb-4">🔌</div>
          <h3 className="text-xl font-bold mb-2 text-yellow-900">Local Circuit Overload</h3>
          <p className="text-gray-700 mb-6">You likely plugged in too many things in that room.</p>
           <div className="text-left bg-white p-4 rounded-lg shadow-sm mb-6">
            <h4 className="font-bold text-sm mb-2">Steps:</h4>
            <ol className="list-decimal pl-4 text-sm space-y-1">
              <li>Unplug the last thing you turned on (Hairdryer? Heater?).</li>
              <li>Go to panel. Look for one small switch that is out of line.</li>
              <li>Flip it OFF, then ON.</li>
            </ol>
          </div>
          <button onClick={reset} className="text-blue-600 underline">Start Over</button>
        </div>
      )}
    </div>
  );
};

const FirstAidTool = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="text-red-500" /> Post-Shock First Aid
      </h2>
      <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6 text-sm text-red-800 font-medium">
        Disclaimer: This is for educational purposes. If the victim is unconscious, call Emergency Services immediately.
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 items-start">
           <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">1</div>
           <div>
             <h3 className="font-bold text-gray-900">Do NOT touch them</h3>
             <p className="text-sm text-gray-600">If they are still holding the appliance, you will get shocked too. Turn off the Main Breaker or use a wooden broom to knock the wire away.</p>
           </div>
        </div>
        <div className="flex gap-4 items-start">
           <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">2</div>
           <div>
             <h3 className="font-bold text-gray-900">The "Feel Fine" Trap</h3>
             <p className="text-sm text-gray-600 mb-3">Even a small shock can disrupt heart rhythm. Watch for these <strong>Red Flag Symptoms</strong>:</p>
             <ul className="grid grid-cols-2 gap-2 text-sm text-red-700 bg-red-50 p-3 rounded">
               <li>• Irregular Heartbeat</li>
               <li>• Muscle Pain / Cramps</li>
               <li>• Confusion</li>
               <li>• Dark Urine (Kidney issue)</li>
             </ul>
           </div>
        </div>
        <div className="flex gap-4 items-start">
           <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">3</div>
           <div>
             <h3 className="font-bold text-gray-900">Check for Burns</h3>
             <p className="text-sm text-gray-600">Look at the entry point (hand) and exit point (feet). Electric burns happen from the inside out and can be deeper than they look.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const StormTool = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CloudLightning className="text-indigo-600" /> Storm Mode Protocol
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h3 className="font-bold text-red-600 mb-4 border-b border-red-100 pb-2">UNPLUG NOW</h3>
           <ul className="space-y-3">
             {['Desktop Computers', 'Game Consoles', 'Expensive TVs', 'Modem / Router'].map(i => (
               <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                 <AlertCircle className="w-4 h-4 text-red-400" /> {i}
               </li>
             ))}
           </ul>
        </div>
        <div>
           <h3 className="font-bold text-green-600 mb-4 border-b border-green-100 pb-2">SAFE TO USE</h3>
           <ul className="space-y-3">
             {['Battery Laptops', 'Cell Phones (Not charging)', 'LED Lights', 'Battery Radio'].map(i => (
               <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                 <CheckCircle2 className="w-4 h-4 text-green-400" /> {i}
               </li>
             ))}
           </ul>
        </div>
      </div>
      <div className="mt-8 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
        <strong>The Shower Myth:</strong> It is TRUE. Do not shower during a severe lightning storm. Metal pipes conduct lightning from the ground up.
      </div>
    </div>
  );
};

const SmartCheckTool = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Wifi className="text-blue-500" /> Smart Home Reality Check
      </h2>
      <p className="text-gray-600 mb-6">Before you buy smart switches, check if your house is compatible.</p>

      <div className="space-y-6">
        {/* Test 1: Neutral Wire */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Test 1: The "Neutral Wire"
          </h3>
          <p className="text-sm text-blue-800 mb-4">Smart switches need power 24/7. Old light switches usually only have a Live wire.</p>
          <div className="bg-white p-4 rounded-lg text-sm border border-blue-100">
             <strong>Check:</strong> Open the switchboard. Do you see a bundle of Black/White wires capped off in the back? <br/>
             <span className="text-green-600 font-bold">Yes:</span> Compatible. <br/>
             <span className="text-red-600 font-bold">No:</span> Buy "No-Neutral" switches.
          </div>
        </div>

        {/* Test 2: Box Depth */}
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
           <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Box className="w-5 h-5" /> Test 2: Wall Box Depth
          </h3>
          <p className="text-sm text-indigo-800 mb-4">Smart switches are much fatter than normal switches. They need space.</p>
           <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-indigo-100">
             <Ruler className="w-8 h-8 text-indigo-400" />
             <div className="text-sm">
               <strong>Requirement:</strong> You need at least <strong>50mm (2 inches)</strong> depth inside the wall box. <br/>
               Standard boxes are often only 35mm. Measure before buying!
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BabyProofTool = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
       <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Baby className="text-pink-500" /> Baby Proofing Guide
      </h2>
      
      <p className="text-gray-600 mb-6">Not all protection is created equal. Upgrade your strategy.</p>

      <div className="space-y-4">
        {/* Level 1: Bad */}
        <div className="flex items-start gap-4 p-4 border border-red-200 bg-red-50 rounded-xl">
          <div className="text-2xl">🚫</div>
          <div>
            <h3 className="font-bold text-red-900">Level 1: Plastic Plugs</h3>
            <p className="text-sm text-red-800">
              <strong>Verdict: Dangerous.</strong><br/>
              Toddlers can pry them off. They become choking hazards. Parents forget to replace them.
            </p>
          </div>
        </div>
        
        {/* Level 2: Better */}
        <div className="flex items-start gap-4 p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
          <div className="text-2xl">⚠️</div>
          <div>
             <h3 className="font-bold text-yellow-900">Level 2: Sliding Plate Covers</h3>
            <p className="text-sm text-yellow-800">
              <strong>Verdict: Okay.</strong><br/>
              These stick over the existing outlet. The plate slides shut automatically. Good for rental homes.
            </p>
          </div>
        </div>

        {/* Level 3: Best */}
         <div className="flex items-start gap-4 p-4 border border-green-200 bg-green-50 rounded-xl">
          <div className="text-2xl">✅</div>
          <div>
             <h3 className="font-bold text-green-900">Level 3: TRR Outlets</h3>
            <p className="text-sm text-green-800">
              <strong>Verdict: Expert.</strong><br/>
              "Tamper Resistant Receptacles" have built-in internal shutters. They look like normal outlets but physically block anything unless two prongs enter simultaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlossaryTool = () => {
  const [query, setQuery] = useState('');
  
  const filtered = GLOSSARY.filter(t => t.term.toLowerCase().includes(query.toLowerCase()));

  return (
     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
       <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Search className="text-gray-600" /> Speak "Electrician"
      </h2>
      <input 
        type="text" 
        placeholder="Search term (e.g. Short, Trip, Phase)..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="space-y-4">
        {filtered.length === 0 ? <p className="text-gray-500 text-center">No terms found.</p> : filtered.map((item, i) => (
          <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <h3 className="font-bold text-lg text-gray-900">{item.term}</h3>
            <p className="text-gray-700 text-sm mt-1">{item.definition}</p>
            <div className="mt-2 text-sm bg-blue-50 text-blue-800 p-2 rounded inline-block">
              <strong>Simple English:</strong> {item.simple}
            </div>
          </div>
        ))}
      </div>
     </div>
  );
};