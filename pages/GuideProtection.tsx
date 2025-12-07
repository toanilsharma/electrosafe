import React, { useState } from 'react';
import { Shield, ShieldCheck, AlertCircle, RefreshCw, Settings, Sliders, Info, Zap, Globe, Activity, Calculator, ArrowRightCircle, Search } from 'lucide-react';

interface ProtectionResult {
  level: string;
  devices: string[];
  warnings: string[];
}

export const GuideProtection = () => {
  const [inputs, setInputs] = useState({
    homeSize: 'medium',
    circuitCount: 6,
    highPower: false,
    childSafety: false,
    wetAreas: false,
    sensitivity: 'standard'
  });
  const [result, setResult] = useState<ProtectionResult | null>(null);

  // State for Voltage Drop Calculator
  const [calc, setCalc] = useState({
    voltage: 230,
    amps: 16,
    length: 20, // meters
    wireSize: 2.5 // mm2
  });
  
  // State for Breaker Decoder
  const [breakerType, setBreakerType] = useState('B');
  const [breakerAmps, setBreakerAmps] = useState('16');
  const [breakerCap, setBreakerCap] = useState('6000');

  const generateGuide = () => {
    let protectionLevel = "Standard";
    let devices: string[] = [];
    let warnings: string[] = [];

    // Logic for protection recommendations
    devices.push("Main Isolation Switch / Main Breaker");

    if (inputs.wetAreas) {
      devices.push("Ground-Fault Protection (RCD/GFCI) for bathrooms, kitchens, and outdoors");
      protectionLevel = "Enhanced";
    }

    if (inputs.childSafety) {
      devices.push("Tamper-Resistant Outlets (Shutters)");
      warnings.push("Ensure all outlets have internal shutters to prevent insertion of foreign objects.");
    }

    if (inputs.highPower) {
      devices.push("Dedicated High-Amperage Circuit Breakers for heavy loads");
      warnings.push("Heavy appliances (AC, Induction, EV) must not share circuits.");
    }

    // Logic based on Home Size vs Circuit Count
    let minCircuits = 4;
    if (inputs.homeSize === 'medium') minCircuits = 8;
    if (inputs.homeSize === 'large') minCircuits = 15;

    if (inputs.circuitCount < minCircuits) {
      warnings.push(`Your circuit count (${inputs.circuitCount}) is likely too low for a ${inputs.homeSize} home. This causes overloading. Consider adding a sub-panel.`);
    }

    if (inputs.homeSize === 'large' || inputs.circuitCount > 12) {
      devices.push("Split-Load Distribution Board (Dual RCD or RCBOs) for better isolation");
    } else {
      devices.push("Standard Distribution Board");
    }

    // Sensitivity Logic
    if (inputs.sensitivity === 'high') {
      devices.push("AFCI (Arc Fault Circuit Interrupter) for bedrooms/living areas");
      devices.push("Surge Protection Device (SPD) Type 2 at main panel");
      protectionLevel = "Maximum / Sensitive";
    } else {
      devices.push("Overcurrent Protective Devices (MCBs) for each circuit");
    }

    setResult({
      level: protectionLevel,
      devices,
      warnings
    });
  };

  // Logic for Voltage Drop Calculation
  const calculateDrop = () => {
    // Resistivity of Copper approx 0.01724 ohm mm^2/m
    const rho = 0.01724;
    // V_drop = (2 * L * I * rho) / A  (2-wire single phase)
    const drop = (2 * calc.length * calc.amps * rho) / calc.wireSize;
    const percent = (drop / calc.voltage) * 100;
    
    // Status Logic
    let status = 'good';
    if (percent > 3) status = 'warning';
    if (percent > 5) status = 'critical';

    // Breaker Curve Logic
    let breakerRec = "Standard C-Curve MCB";
    if (calc.length > 30 && status !== 'critical') {
      breakerRec = "Consider B-Curve MCB (Faster Trip)";
    }
    if (percent > 3) {
      breakerRec = "UPSIZE WIRE to Fix Drop";
    }

    return { drop: drop.toFixed(2), percent: percent.toFixed(2), status, breakerRec };
  };

  const dropResult = calculateDrop();
  
  // Breaker Decoder Content
  const getBreakerInfo = () => {
    let usage = "";
    if (breakerType === 'B') usage = "Standard Domestic. Trips fast (3-5x current). Best for lights & sockets.";
    if (breakerType === 'C') usage = "Inductive Loads. Trips slower (5-10x current). Best for ACs, Motors, Fans.";
    if (breakerType === 'D') usage = "Industrial. High surge tolerance (10-20x current). Welding machines, X-Ray.";

    return {
      usage,
      capacity: `Can safely interrupt a short circuit of ${parseInt(breakerCap).toLocaleString()} Amps without exploding.`
    };
  };
  
  const breakerInfo = getBreakerInfo();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Shield className="text-blue-600" /> Universal Protection Guide
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Determine the right safety devices for your home. We use globally neutral terms applicable to any electrical standard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" /> Configuration
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Size</label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                value={inputs.homeSize}
                onChange={(e) => setInputs({...inputs, homeSize: e.target.value})}
              >
                <option value="small">Small (Apartment / Studio)</option>
                <option value="medium">Medium (2-3 Bedroom House)</option>
                <option value="large">Large (Multi-story / 4+ Bedrooms)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Existing Circuits</label>
              <input 
                type="number"
                min="1"
                max="50"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                value={inputs.circuitCount}
                onChange={(e) => setInputs({...inputs, circuitCount: parseInt(e.target.value) || 0})}
              />
              <p className="text-xs text-gray-500 mt-1">Count the switches/breakers in your main panel.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sensitivity Preference</label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                value={inputs.sensitivity}
                onChange={(e) => setInputs({...inputs, sensitivity: e.target.value})}
              >
                <option value="standard">Standard (Basic Safety)</option>
                <option value="high">High Sensitivity (Max Protection / Sensitive Electronics)</option>
              </select>
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={inputs.wetAreas}
                  onChange={(e) => setInputs({...inputs, wetAreas: e.target.checked})}
                />
                <span className="text-gray-700 text-sm">Has wet areas (Garden, Pool, Balcony)?</span>
              </label>

              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={inputs.highPower}
                  onChange={(e) => setInputs({...inputs, highPower: e.target.checked})}
                />
                <span className="text-gray-700 text-sm">Using high-power appliances (EV, Induction)?</span>
              </label>

              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={inputs.childSafety}
                  onChange={(e) => setInputs({...inputs, childSafety: e.target.checked})}
                />
                <span className="text-gray-700 text-sm">Need child safety protection?</span>
              </label>
            </div>

            <button 
              onClick={generateGuide}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Generate Recommendations
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
              <p>Enter details to see safety recommendations.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <ShieldCheck className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Recommended Configuration</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                    result.level.includes("Maximum") ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {result.level}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Sliders className="w-4 h-4" /> Essential Safety Devices:
                </h4>
                <ul className="space-y-3">
                  {result.devices.map((dev: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-800 text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
                      <div className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-1.5"></div>
                      {dev}
                    </li>
                  ))}
                </ul>
              </div>

              {result.warnings.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Analysis & Warnings
                  </h4>
                  <ul className="space-y-2">
                    {result.warnings.map((warn: string, idx: number) => (
                      <li key={idx} className="text-sm text-yellow-900 flex items-start gap-2">
                        <span className="text-yellow-600">•</span> {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button 
                onClick={() => setResult(null)} 
                className="text-gray-500 text-sm hover:text-gray-800 flex items-center gap-1 mt-4"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NEW SECTION: Breaker Decoder */}
      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Search className="text-green-400" /> Breaker Code Decoder
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl">
          Breakers have codes printed on them like "C16" or "6000". Use this tool to understand what they mean.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Curve Type (Letter)</label>
             <div className="flex gap-2">
               {['B', 'C', 'D'].map(type => (
                 <button 
                   key={type}
                   onClick={() => setBreakerType(type)}
                   className={`flex-1 py-2 rounded-lg font-bold transition-all ${breakerType === type ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
                 >
                   {type}
                 </button>
               ))}
             </div>
           </div>
           
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Current Rating (Number)</label>
             <select 
               className="w-full bg-white/10 border border-white/20 rounded-lg p-2.5 text-white"
               value={breakerAmps}
               onChange={(e) => setBreakerAmps(e.target.value)}
             >
               <option value="6">6A (Lights)</option>
               <option value="10">10A (Lights/Fan)</option>
               <option value="16">16A (Sockets)</option>
               <option value="20">20A (AC/Heater)</option>
               <option value="32">32A (Main/Cooker)</option>
               <option value="63">63A (Main)</option>
             </select>
           </div>

           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Capacity (Box Number)</label>
             <select 
               className="w-full bg-white/10 border border-white/20 rounded-lg p-2.5 text-white"
               value={breakerCap}
               onChange={(e) => setBreakerCap(e.target.value)}
             >
               <option value="3000">3000 (3kA) - Old</option>
               <option value="4500">4500 (4.5kA) - Standard</option>
               <option value="6000">6000 (6kA) - Home</option>
               <option value="10000">10000 (10kA) - Premium</option>
             </select>
           </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
           <h3 className="text-xl font-bold mb-4 text-green-400">What does "{breakerType}{breakerAmps}" mean?</h3>
           <ul className="space-y-3">
             <li className="flex gap-3">
               <span className="font-bold text-gray-400">Usage:</span>
               <span>{breakerInfo.usage}</span>
             </li>
             <li className="flex gap-3">
               <span className="font-bold text-gray-400">Limit:</span>
               <span>It will trip if you use more than <strong>{breakerAmps} Amps</strong> for a long time.</span>
             </li>
             <li className="flex gap-3">
               <span className="font-bold text-gray-400">Safety:</span>
               <span>{breakerInfo.capacity}</span>
             </li>
           </ul>
        </div>
      </div>

      {/* NEW SECTION: Voltage Drop Calculator */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Calculator className="text-blue-600" /> Circuit Distance Analyzer
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Long wires cause <strong>Voltage Drop</strong>. If the drop is too high, appliances might fail, and breakers might not trip during a fault. Use this for outdoor lights, sheds, or EV chargers far from the panel.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
             <div>
               <label className="text-xs font-bold text-gray-500 uppercase">System Voltage</label>
               <select 
                 className="w-full mt-1 border-gray-300 rounded-md"
                 value={calc.voltage}
                 onChange={(e) => setCalc({...calc, voltage: parseInt(e.target.value)})}
               >
                 <option value={230}>230V (EU/Asia/UK)</option>
                 <option value={110}>110V (USA/Canada)</option>
               </select>
             </div>
             <div>
               <label className="text-xs font-bold text-gray-500 uppercase">Load Current (Amps)</label>
               <input 
                 type="number"
                 className="w-full mt-1 border-gray-300 rounded-md"
                 value={calc.amps}
                 onChange={(e) => setCalc({...calc, amps: parseFloat(e.target.value) || 0})}
               />
               <p className="text-xs text-gray-400 mt-1">e.g., 16A for a Heater</p>
             </div>
             <div>
               <label className="text-xs font-bold text-gray-500 uppercase">Distance (Meters)</label>
               <input 
                 type="number"
                 className="w-full mt-1 border-gray-300 rounded-md"
                 value={calc.length}
                 onChange={(e) => setCalc({...calc, length: parseFloat(e.target.value) || 0})}
               />
             </div>
             <div>
               <label className="text-xs font-bold text-gray-500 uppercase">Wire Size (mm²)</label>
               <select 
                 className="w-full mt-1 border-gray-300 rounded-md"
                 value={calc.wireSize}
                 onChange={(e) => setCalc({...calc, wireSize: parseFloat(e.target.value)})}
               >
                 <option value={1.5}>1.5 mm² (Lights)</option>
                 <option value={2.5}>2.5 mm² (Sockets)</option>
                 <option value={4.0}>4.0 mm² (AC/Heater)</option>
                 <option value={6.0}>6.0 mm² (Cooker)</option>
                 <option value={10.0}>10.0 mm² (Main)</option>
               </select>
             </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 flex flex-col justify-center">
             <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-400 font-bold uppercase mb-1">Voltage Drop</div>
                  <div className={`text-5xl font-extrabold ${
                    dropResult.status === 'good' ? 'text-green-400' :
                    dropResult.status === 'warning' ? 'text-yellow-400' : 'text-red-500'
                  }`}>
                    {dropResult.percent}%
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{dropResult.drop} Volts lost</div>
                </div>

                <div className="h-12 w-px bg-gray-700 hidden md:block"></div>

                <div className="text-center md:text-left flex-1">
                   <div className="text-sm text-gray-400 font-bold uppercase mb-2">Recommendation</div>
                   <div className="text-lg font-bold flex items-center gap-2 justify-center md:justify-start">
                     <ArrowRightCircle className="w-5 h-5 text-blue-400" />
                     {dropResult.status === 'good' ? (
                       <span className="text-green-300">Wire size is sufficient.</span>
                     ) : (
                       <span className="text-red-300">UPSIZE WIRE IMMEDIATELY.</span>
                     )}
                   </div>
                   <p className="text-xs text-gray-500 mt-2">
                     Ideally, drop should be under 3% for lighting and 5% for sockets.
                   </p>
                </div>
             </div>

             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-xl flex items-start gap-3">
                  <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${dropResult.status === 'good' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <strong className="text-gray-900 text-sm block mb-1">Status</strong>
                    <p className="text-xs text-gray-600">
                      {dropResult.status === 'good' && 'Safe. Efficiency loss is minimal.'}
                      {dropResult.status === 'warning' && 'Borderline. Lights may dim slightly. Acceptable for general power.'}
                      {dropResult.status === 'critical' && 'Dangerous. Voltage loss is too high. Equipment may overheat or fail to start.'}
                    </p>
                  </div>
                </div>
                <div className="border border-gray-200 p-4 rounded-xl flex items-start gap-3">
                  <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 text-sm block mb-1">Breaker Recommendation</strong>
                    <p className="text-xs text-gray-600">{dropResult.breakerRec}</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      (Long runs increase impedance, potentially stopping standard C-Curve breakers from tripping instantly during a short.)
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Educational Section - GFCI/RCD */}
      <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
             <Info className="text-indigo-600" /> Understanding Life-Saving Tech: GFCI / RCD
           </h2>
           <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
             Standard breakers only protect wires from fire. These specialized devices protect <strong>YOU</strong> from electrocution.
           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-50">
            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Global Terminology</h3>
             <ul className="space-y-2 text-sm text-gray-600">
              <li className="border-b border-gray-100 pb-1"><strong>GFCI:</strong> Ground Fault Circuit Interrupter (USA/Canada)</li>
              <li className="border-b border-gray-100 pb-1"><strong>RCD:</strong> Residual Current Device (UK/EU/Asia/Aus)</li>
              <li><strong>RCBO:</strong> A Breaker + RCD combined in one unit.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-50">
            <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">How It Works</h3>
            <p className="text-sm text-gray-600 leading-snug">
              Think of it as a scale. It monitors current going out vs coming back. If there is a tiny difference (meaning current is leaking through water or a person), it snaps the power off in milliseconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-50">
            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Sensitivity (mA)</h3>
            <p className="text-sm text-gray-600 mb-2">Rated in milliamps. The lower, the safer.</p>
            <ul className="space-y-1 text-sm">
               <li className="flex justify-between"><span className="text-gray-500">Human Safety:</span> <span className="font-bold text-indigo-700">30mA (standard)</span></li>
               <li className="flex justify-between"><span className="text-gray-500">Fire Safety:</span> <span className="font-bold text-gray-700">100mA / 300mA</span></li>
            </ul>
            <p className="text-xs text-orange-800 mt-2">Only 30mA or less prevents lethal shock.</p>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-50">
            <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Crucial Testing</h3>
            <p className="text-sm text-gray-600 mb-2">
              The internal mechanism can get stuck over time.
            </p>
            <div className="bg-red-50 text-red-800 text-xs font-bold p-2 rounded text-center border border-red-100">
              Press the "Test" (T) Button monthly. If it doesn't snap off instantly, you have NO protection. Replace it.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
