import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BatteryCharging, AlertTriangle, Info, ShieldAlert, ArrowRight } from 'lucide-react';

export const EVChargerSizer: React.FC = () => {
  const [chargerAmps, setChargerAmps] = useState<number | ''>(48);
  const [distanceFt, setDistanceFt] = useState<number | ''>(50);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateWireSizing = () => {
    if (!chargerAmps || !distanceFt) return null;

    // NEC 625.40 requires EV chargers to be considered continuous loads
    // which means the breaker and wire must be sized at 125% of the charger's max output.
    const continuousLoadAmps = chargerAmps * 1.25;
    
    // Choose Breaker Size (rounding up to next standard size)
    let breakerChoice = 0;
    const stdBreakers = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100];
    for (const b of stdBreakers) {
      if (b >= continuousLoadAmps) {
        breakerChoice = b;
        break;
      }
    }
    if (breakerChoice === 0) breakerChoice = 100; // Cap for this simple calc

    // Rough wire gauge based on NEC 310.15(B)(16) 75C column for copper (Romex NM-B uses 60C column, but THHN uses 75C)
    let baseGaugeAwg = "14";
    if (continuousLoadAmps > 15 && continuousLoadAmps <= 20) baseGaugeAwg = "12";
    else if (continuousLoadAmps > 20 && continuousLoadAmps <= 30) baseGaugeAwg = "10";
    else if (continuousLoadAmps > 30 && continuousLoadAmps <= 40) baseGaugeAwg = "8"; // Assuming THHN, NM-B would need 6
    else if (continuousLoadAmps > 40 && continuousLoadAmps <= 55) baseGaugeAwg = "6";
    else if (continuousLoadAmps > 55 && continuousLoadAmps <= 70) baseGaugeAwg = "4";
    else if (continuousLoadAmps > 70 && continuousLoadAmps <= 95) baseGaugeAwg = "3";
    else if (continuousLoadAmps > 95) baseGaugeAwg = "2";

    // Voltage Drop Calculation (Simplified Single Phase 240V AC)
    // VD = (2 * L * R * I) / 1000
    // Resistance ohms per 1000ft for uncoated copper
    const resistanceMap: Record<string, number> = {
      "14": 3.07, "12": 1.93, "10": 1.21, "8": 0.764, "6": 0.491, "4": 0.308, "3": 0.245, "2": 0.194
    };
    
    let currentGauge = baseGaugeAwg;
    let voltageDropPercent = 0;
    
    // Upsize for voltage drop if needed (> 3%)
    while (true) {
      const R = resistanceMap[currentGauge] || 0.194;
      const VD = (2 * distanceFt * R * chargerAmps) / 1000;
      voltageDropPercent = (VD / 240) * 100;

      if (voltageDropPercent > 3.0) {
        // Drop by one wire size (e.g. 8 to 6)
        if (currentGauge === "14") currentGauge = "12";
        else if (currentGauge === "12") currentGauge = "10";
        else if (currentGauge === "10") currentGauge = "8";
        else if (currentGauge === "8") currentGauge = "6";
        else if (currentGauge === "6") currentGauge = "4";
        else if (currentGauge === "4") currentGauge = "3";
        else if (currentGauge === "3") currentGauge = "2";
        else break; // Max size supported by this calc
      } else {
        break;
      }
    }

    return {
      continuousLoadAmps,
      breakerChoice,
      baseGaugeAwg,
      finalGaugeAwg: currentGauge,
      voltageDropPercent: voltageDropPercent.toFixed(1),
      upsized: baseGaugeAwg !== currentGauge
    };
  };

  const results = calculateWireSizing();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>EV Charger Wire Sizer & NEMA 14-50 Warning | ElectroSafe.homes</title>
        <meta name="description" content="Calculate the correct wire gauge and breaker size for your home EV charger installed at a specific distance. Understand the 125% continuous load rule." />
        <link rel="canonical" href="https://electrosafe.homes/ev-charger" />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <BatteryCharging className="w-4 h-4" /> Garage Safety
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          The EV Charger <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">"Wire Sizer"</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          EV chargers push your home's electrical panel to its absolute limit for 8+ hours a day. Find exactly what gauge wire and breaker your contractor <strong>should</strong> be using.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Panel */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 h-fit">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Enter Your Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Charger Output Setting (Amps)</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none font-medium"
                  value={chargerAmps}
                  onChange={(e) => setChargerAmps(Number(e.target.value))}
                >
                  <option value={12}>12A (Level 1 / Slow plug)</option>
                  <option value={16}>16A (Low Level 2)</option>
                  <option value={24}>24A (Medium Level 2)</option>
                  <option value={32}>32A (Standard Level 2)</option>
                  <option value={40}>40A (NEMA 14-50 plug max)</option>
                  <option value={48}>48A (Hardwired unit default)</option>
                  <option value={60}>60A (High power hardwired)</option>
                  <option value={80}>80A (Ford/Rivian max)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Check the sticker on your Tesla/ChargePoint wall box.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Wire Distance (Feet)</label>
              <div className="relative">
                <input 
                  type="number"
                  placeholder="e.g. 50"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-medium"
                  value={distanceFt}
                  onChange={(e) => setDistanceFt(e.target.value === '' ? '' : Number(e.target.value))}
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold">
                  ft
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Distance from breaker panel to the charger location.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
               <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-blue-900">
                 Did you know? Under NEC rules, a charger cannot pull 50 Amps from a 50 Amp breaker. It must use the "125% rule" for continuous loads.
               </p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
           {/* Decorator */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

           <h2 className="text-xl font-bold text-white mb-6 relative z-10">Contractor Requirements</h2>
           
           {results ? (
             <div className="space-y-6 relative z-10">
               
               {/* Breaker Output */}
               <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                 <div className="text-green-400 text-sm font-bold uppercase tracking-wider mb-1">Required Breaker Size</div>
                 <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-white">{results.breakerChoice}</span>
                    <span className="text-xl text-slate-400 font-medium pb-1">Amp</span>
                 </div>
                 <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                   Because EV charging is a "continuous load" (runs for &gt; 3 hrs), the breaker must be sized at 125% of the charger output ({results.continuousLoadAmps}A minimum).
                 </p>
               </div>

               {/* Wire Output */}
               <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                 <div className="text-green-400 text-sm font-bold uppercase tracking-wider mb-1">Minimum Copper Wire</div>
                 <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-white">{results.finalGaugeAwg}</span>
                    <span className="text-xl text-slate-400 font-medium pb-1">AWG</span>
                 </div>

                 {results.upsized && (
                   <div className="mt-3 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm rounded-lg p-3">
                     <strong>Notice:</strong> Automatically upsized from {results.baseGaugeAwg} AWG because a {distanceFt}ft run causes a {results.voltageDropPercent}% voltage drop.
                   </div>
                 )}
                 <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                   Must be THHN wire in conduit or appropriately rated NM-B cable (NM-B limits sizing to 60°C column, requiring thicker wire).
                 </p>
               </div>
               
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center py-10 opacity-50 relative z-10">
               <BatteryCharging className="w-12 h-12 text-slate-500 mb-4 animate-pulse" />
               <p className="text-slate-400 text-center font-medium">Enter your charger details<br/>to generate requirements.</p>
             </div>
           )}
        </div>
      </div>

      {/* Critical NEMA 14-50 Warning */}
      <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-red-200">
         <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-red-50 p-4 rounded-full flex-shrink-0">
               <ShieldAlert className="w-10 h-10 text-red-600" />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">The "Cheap NEMA 14-50" Fire Trap</h3>
               <p className="text-slate-600 leading-relaxed mb-4">
                 If you are installing a plug-in EV charger using a NEMA 14-50 outlet (RV plug) instead of hardwiring, <strong>DO NOT</strong> let your electrician buy a $12 builder-grade receptacle from a hardware store (like Leviton).
               </p>
               <p className="text-slate-600 leading-relaxed mb-4">
                 Cheap outlets are meant for ovens that cycle on and off. EV chargers pull maximum heat for 10 straight hours, literally melting cheap plastic outlets and causing garage fires.
               </p>
               
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
                  <h4 className="font-bold text-slate-900 mb-2">You MUST specify an industrial-grade outlet:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                     <li><strong>Hubbell HBL9450A</strong> (approx. $80)</li>
                     <li><strong>Bryant 9450FR</strong> (approx. $60)</li>
                  </ul>
               </div>
               
               <div className="inline-block px-4 py-2 bg-green-100 text-green-800 font-bold rounded-lg text-sm">
                 💡 Or better yet: Save money on the GFCI breaker and outlet by having the electrician <strong>Hardwire</strong> the charger directly!
               </div>
            </div>
         </div>
      </div>
      
    </div>
  );
};
