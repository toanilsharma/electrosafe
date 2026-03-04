import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
      {/* Hero Header */}
      <div className="text-center mb-16 relative py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-transparent blur-3xl rounded-[3rem] -z-10"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6 font-display tracking-tight flex items-center justify-center gap-4">
          <Shield className="w-12 h-12 md:w-16 md:h-16 text-blue-600" /> Universal Protection Index
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Determine the exact safety devices required for your home's profile. We use globally neutral engineering terms applicable to any standard (NEC, IEC, BS).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 animate-slide-up">
        {/* Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 dark:bg-gray-900 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 dark:border-gray-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-8 flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-500" /> Home Profile
          </h2>
          
          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 dark:text-gray-300 uppercase tracking-wider mb-2">Home Size</label>
              <div className="relative">
                <select
                  className="w-full bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-700 text-gray-900 dark:text-gray-100 dark:text-gray-100 rounded-xl p-3.5 appearance-none font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={inputs.homeSize}
                  onChange={(e) => setInputs({ ...inputs, homeSize: e.target.value })}
                >
                  <option value="small">Small (Apartment / Studio)</option>
                  <option value="medium">Medium (2-3 Bedroom House)</option>
                  <option value="large">Large (Multi-story / 4+ Bedrooms)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 dark:text-gray-300 uppercase tracking-wider mb-2 flex justify-between">
                <span>Existing Circuits</span>
                <span className="text-gray-400 font-normal normal-case text-xs">(Count your breakers)</span>
              </label>
              <input
                type="number"
                min="1"
                max="50"
                className="w-full bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-700 text-gray-900 dark:text-gray-100 dark:text-gray-100 rounded-xl p-3.5 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={inputs.circuitCount}
                onChange={(e) => setInputs({ ...inputs, circuitCount: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 dark:text-gray-300 uppercase tracking-wider mb-2">Sensitivity Class</label>
              <div className="relative">
                <select
                  className="w-full bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-700 text-gray-900 dark:text-gray-100 dark:text-gray-100 rounded-xl p-3.5 appearance-none font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={inputs.sensitivity}
                  onChange={(e) => setInputs({ ...inputs, sensitivity: e.target.value })}
                >
                  <option value="standard">Standard (Basic Fire & Shock Safety)</option>
                  <option value="high">Maximum (Hospital-Grade / Sensitive Electronics)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800">
              <label className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                    checked={inputs.wetAreas}
                    onChange={(e) => setInputs({ ...inputs, wetAreas: e.target.checked })}
                  />
                </div>
                <div>
                  <span className="text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold block">Wet Areas Present</span>
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs">Garden, pool, open balcony, basement</span>
                </div>
              </label>

              <label className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                    checked={inputs.highPower}
                    onChange={(e) => setInputs({ ...inputs, highPower: e.target.checked })}
                  />
                </div>
                <div>
                  <span className="text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold block">Heavy Loads</span>
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs">EV Chargers, Induction stoves, multiple ACs</span>
                </div>
              </label>

              <label className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-200 dark:border-gray-700 dark:border-gray-700">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                    checked={inputs.childSafety}
                    onChange={(e) => setInputs({ ...inputs, childSafety: e.target.checked })}
                  />
                </div>
                <div>
                  <span className="text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold block">Child Safety</span>
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs">Toddlers or infants present in the home</span>
                </div>
              </label>
            </div>

            <button
              onClick={generateGuide}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/25 mt-4"
            >
              Analyze Protection Needs
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-50 to-gray-100 p-8 rounded-[2rem] border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-inner flex flex-col">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
              <div className="w-24 h-24 bg-gray-200/50 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-12 h-12 text-gray-400 opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-2">Awaiting Blueprint</h3>
              <p className="max-w-xs text-center">Configure your home profile on the left to generate an engineering-grade protection plan.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700 pb-6">
                <div className="flex items-center gap-4 bg-white dark:bg-gray-900 dark:bg-gray-900 p-3 pr-6 border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-sm rounded-2xl">
                  <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-1">Protection Tier</h3>
                    <div className="font-extrabold text-xl text-gray-900 dark:text-gray-100 dark:text-gray-100">{result.level}</div>
                  </div>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="bg-white dark:bg-gray-900 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 text-gray-600 dark:text-gray-400 dark:text-gray-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Profile
                </button>
              </div>

              <div>
                <h4 className="font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-xl mb-6 flex items-center gap-3">
                  <Sliders className="w-6 h-6 text-blue-500" /> Mandatory Switchgear:
                </h4>
                <ul className="space-y-4">
                  {result.devices.map((dev: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-800 dark:text-gray-200 dark:text-gray-200 bg-white dark:bg-gray-900 dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 group hover:border-blue-100 transition-colors">
                      <div className="min-w-[8px] h-[8px] rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="font-medium text-lg leading-snug">{dev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.warnings.length > 0 && (
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm relative overflow-hidden mt-8">
                  <div className="absolute -right-4 -top-4 text-amber-500/10">
                    <AlertCircle className="w-32 h-32" />
                  </div>
                  <h4 className="font-extrabold text-amber-900 text-lg mb-4 flex items-center gap-2 relative z-10">
                    <AlertCircle className="w-6 h-6" /> Critical Safety Warnings
                  </h4>
                  <ul className="space-y-3 relative z-10">
                    {result.warnings.map((warn: string, idx: number) => (
                      <li key={idx} className="text-sm md:text-base text-amber-900 flex items-start gap-3 bg-white dark:bg-gray-900 dark:bg-gray-900/50 p-3 rounded-xl">
                        <span className="text-amber-600 mt-0.5">•</span> <span className="font-medium">{warn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NEW SECTION: Breaker Decoder */}
      <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-white mb-20 relative overflow-hidden ring-1 ring-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-900 dark:bg-gray-900/10 text-green-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10 backdrop-blur-md">
            Decryption Tool
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3">
            <Search className="w-8 h-8 text-green-400" /> Breaker Code Decoder
          </h2>
          <p className="text-slate-300 mb-10 max-w-2xl text-lg">
            Breakers have codes printed on them like <code className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 px-2 py-1 rounded text-green-300">C16</code> or <code className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 px-2 py-1 rounded text-green-300">6000</code>. These specify how and when the breaker trips. Select your codes below to reveal their meaning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-6 bg-white dark:bg-gray-900 dark:bg-gray-900/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div>
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 block">Trigger Curve (Letter)</label>
              <div className="flex gap-2 p-1 bg-white dark:bg-gray-900 dark:bg-gray-900/5 rounded-xl border border-white/10">
                {['B', 'C', 'D'].map(type => (
                  <button
                    key={type}
                    onClick={() => setBreakerType(type)}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${breakerType === type ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' : 'bg-transparent text-slate-300 hover:bg-white dark:bg-gray-900 dark:bg-gray-900/10'}`}
                  >
                    Type {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 block">Current Limit (Number)</label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-gray-900 dark:bg-gray-900/10 border border-white/20 rounded-xl p-4 text-white font-bold appearance-none focus:ring-2 focus:ring-green-500 transition-all outline-none"
                  value={breakerAmps}
                  onChange={(e) => setBreakerAmps(e.target.value)}
                >
                  <option value="6" className="bg-slate-800">6 Amps (Lights)</option>
                  <option value="10" className="bg-slate-800">10 Amps (Lights/Fan)</option>
                  <option value="16" className="bg-slate-800">16 Amps (Sockets/Small AC)</option>
                  <option value="20" className="bg-slate-800">20 Amps (Large AC/Heater)</option>
                  <option value="32" className="bg-slate-800">32 Amps (Main/Stove)</option>
                  <option value="63" className="bg-slate-800">63 Amps (Whole House Main)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 block">Fault Capacity (Box)</label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-gray-900 dark:bg-gray-900/10 border border-white/20 rounded-xl p-4 text-white font-bold appearance-none focus:ring-2 focus:ring-green-500 transition-all outline-none"
                  value={breakerCap}
                  onChange={(e) => setBreakerCap(e.target.value)}
                >
                  <option value="3000" className="bg-slate-800">3000 (3kA) - Legacy</option>
                  <option value="4500" className="bg-slate-800">4500 (4.5kA) - Bare Minimum</option>
                  <option value="6000" className="bg-slate-800">6000 (6kA) - Modern Standard</option>
                  <option value="10000" className="bg-slate-800">10000 (10kA) - Premium/Industrial</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-transparent rounded-2xl p-8 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-[120px] font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">
              {breakerType}{breakerAmps}
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-green-400 relative z-10">Translation: "{breakerType}{breakerAmps}" @ {breakerCap}</h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex gap-4 items-start">
                <div className="bg-green-500/20 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"><Activity className="w-5 h-5 text-green-400" /></div>
                <div>
                  <div className="font-extrabold text-slate-300 uppercase tracking-widest text-xs mb-1">Target Application</div>
                  <div className="text-lg text-white font-medium bg-black/20 inline-block px-3 py-1 rounded-lg border border-white/10 shadow-inner">{breakerInfo.usage}</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-orange-500/20 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"><Info className="w-5 h-5 text-orange-400" /></div>
                <div>
                  <div className="font-extrabold text-slate-300 uppercase tracking-widest text-xs mb-1">Overload Limit</div>
                  <div className="text-lg text-white font-medium">Trips permanently if constant draw exceeds <strong className="text-orange-400 text-xl">{breakerAmps} Amps</strong>.</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-red-500/20 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"><Zap className="w-5 h-5 text-red-400" /></div>
                <div>
                  <div className="font-extrabold text-slate-300 uppercase tracking-widest text-xs mb-1">Catastrophic Fault Rating</div>
                  <div className="text-lg text-white font-medium">{breakerInfo.capacity}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Voltage Drop Calculator */}
      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-3 relative z-10">
          <Calculator className="w-8 h-8 text-blue-600" /> Circuit Distance Analyzer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg mb-12 max-w-3xl relative z-10 leading-relaxed font-medium">
          Long wires behave like resistors, causing <strong>Voltage Drop</strong>. If the drop is too high, appliances stall, overheat, and breakers might fail to trip during a short circuit. Use this calculator for outdoor sheds, garden lights, or EV chargers located far from the main panel.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
          {/* Inputs */}
          <div className="xl:col-span-5 space-y-5 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800/80 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-inner">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" /> Circuit Parameters
            </h3>
            
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">System Voltage</label>
              <select
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold appearance-none cursor-pointer"
                value={calc.voltage}
                onChange={(e) => setCalc({ ...calc, voltage: parseInt(e.target.value) })}
              >
                <option value={230}>230 Volts (EU/Asia/UK/Aus)</option>
                <option value={110}>110 Volts (USA/Canada)</option>
              </select>
            </div>
            
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block flex justify-between">
                <span>Load Current (Amps)</span>
                <span className="text-gray-400 font-normal normal-case text-xs">e.g. 16A heater</span>
              </label>
              <input
                type="number"
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold"
                value={calc.amps}
                onChange={(e) => setCalc({ ...calc, amps: parseFloat(e.target.value) || 0 })}
              />
            </div>
            
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">One-Way Distance (Meters)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold flex-1"
                  value={calc.length}
                  onChange={(e) => setCalc({ ...calc, length: parseFloat(e.target.value) || 0 })}
                />
                <span className="text-gray-400 font-bold pr-2">m</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Wire Cross-Section (mm²)</label>
              <select
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold appearance-none cursor-pointer"
                value={calc.wireSize}
                onChange={(e) => setCalc({ ...calc, wireSize: parseFloat(e.target.value) })}
              >
                <option value={1.5}>1.5 mm² (15 Amps MAX / Lights)</option>
                <option value={2.5}>2.5 mm² (20 Amps MAX / Sockets)</option>
                <option value={4.0}>4.0 mm² (25 Amps MAX / AC Units)</option>
                <option value={6.0}>6.0 mm² (32 Amps MAX / Stoves)</option>
                <option value={10.0}>10.0 mm² (40+ Amps MAX / Mains)</option>
              </select>
            </div>
          </div>

          {/* Visualization */}
          <div className="xl:col-span-7 flex flex-col justify-center">
            <div className="bg-gradient-to-br from-slate-900 to-gray-900 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white dark:bg-gray-900 dark:bg-gray-900/5 rounded-full blur-2xl"></div>
              
              <div className="text-center md:text-left relative z-10 w-full md:w-auto">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 flex justify-center md:justify-start items-center gap-2"><Zap className="w-4 h-4" /> Voltage Loss</div>
                <div className={`text-6xl md:text-7xl font-black font-display tracking-tighter ${
                    dropResult.status === 'good' ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]' :
                    dropResult.status === 'warning' ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  }`}>
                  {dropResult.percent}<span className="text-3xl md:text-4xl opacity-50">%</span>
                </div>
                <div className="text-base text-gray-400 mt-2 font-medium bg-black/30 inline-block px-3 py-1 rounded-lg">- {dropResult.drop} Volts vanished as heat</div>
              </div>

              <div className="h-24 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden md:block relative z-10"></div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent block md:hidden relative z-10"></div>

              <div className="text-center md:text-left flex-1 relative z-10">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Engineering Verdict</div>
                <div className="text-xl md:text-2xl font-bold flex items-center justify-center md:justify-start gap-3 mb-3">
                  {dropResult.status === 'good' ? (
                    <><span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span> <span className="text-white">Wire size is safe.</span></>
                  ) : dropResult.status === 'warning' ? (
                    <><span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span> <span className="text-white">Borderline Loss.</span></>
                  ) : (
                    <><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span> <span className="text-red-300">DANGEROUS. UPSIZE NOW.</span></>
                  )}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {dropResult.status === 'good' && 'Energy efficiency remains high. No risk of appliance stalling or wire overheating.'}
                  {dropResult.status === 'warning' && 'Lights may dim when compressor starts. Acceptable for general sockets, but bad for sensitive AC motors.'}
                  {dropResult.status === 'critical' && 'Fire risk. Wires will get hot. Motors will burn out. Breakers may lose their ability to trip fast.'}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <strong className="text-gray-900 dark:text-gray-100 dark:text-gray-100 text-lg block mb-1 font-bold">Breaker Behavior & Safety</strong>
                <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm font-medium mb-2 bg-white dark:bg-gray-900 dark:bg-gray-900 inline-block px-3 py-1 rounded-lg border border-blue-50 shadow-sm">{dropResult.breakerRec}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                  <strong>The Hidden Danger:</strong> Very long wire runs increase electrical resistance (impedance). If a short circuit happens 50 meters away, the resistance limits the fault current. It might limit it so much that a standard C-Curve breaker <em>doesn't realize it's a short circuit</em>, and takes a full minute to trip instead of 0.1 seconds, sparking a fire.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Disclaimer */}
        <div className="mt-12 text-center text-xs text-gray-400 max-w-3xl mx-auto relative z-10 px-4">
          <p><strong>Engineering Disclaimer:</strong> This calculator uses standard NEC Chapter 9, Table 8 DC resistance approximations. Real-world voltage drop depends on power factor and ambient temperature. Always consult a professional for critical runs.</p>
        </div>
      </div>

      {/* Educational Section - GFCI/RCD */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-indigo-500/30 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30 backdrop-blur-md">
            Lifesaving Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-4">
            <Info className="text-indigo-400 w-8 h-8 md:w-10 md:h-10" /> The Secret to Preventing Shocks
          </h2>
          <p className="text-indigo-200 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
            Standard breakers ONLY protect wires from melting and causing fires. They DO NOT protect humans. To prevent lethal electric shocks, you absolutely must install a <strong>GFCI, RCD, or RCBO</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Card 1: Terminology */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-indigo-400/50 transition-colors group">
            <div className="bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="font-extrabold text-xl text-white mb-4">Global Glossary</h3>
            <ul className="space-y-3 text-sm text-indigo-100 font-medium">
              <li className="pb-2 border-b border-white/10 flex flex-col gap-1">
                <strong className="text-blue-300 tracking-wider">GFCI</strong>
                <span>Ground Fault Circuit Interrupter (USA/CAN)</span>
              </li>
              <li className="pb-2 border-b border-white/10 flex flex-col gap-1">
                <strong className="text-blue-300 tracking-wider">RCD / RCCB</strong>
                <span>Residual Current Device (UK/EU/AUS/IN)</span>
              </li>
              <li className="flex flex-col gap-1">
                <strong className="text-blue-300 tracking-wider">RCBO</strong>
                <span>The ultimate combo: Standard Breaker + RCD in one unit.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Mechanism */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-green-400/50 transition-colors group">
            <div className="bg-green-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="font-extrabold text-xl text-white mb-4">The Invisible Scale</h3>
            <p className="text-sm text-indigo-100 leading-relaxed font-medium">
              A standard breaker trips at 16,000 milliamps. A human heart stops at just 50 milliamps.<br/><br/>
              An RCD/GFCI acts like a perfect scale, measuring current going IN versus OUT. If even 30 milliamps go missing (meaning it's leaking through water or a human body), the device snaps the power off in less than 40 milliseconds, saving your life.
            </p>
          </div>

          {/* Card 3: Ratings */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-colors group">
            <div className="bg-amber-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="font-extrabold text-xl text-white mb-2">Sensitivity (mA)</h3>
            <p className="text-xs text-indigo-200 mb-6 font-medium">Lower number = Faster trip.</p>
            <div className="space-y-4 text-sm font-medium">
              <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                <div className="text-xs text-indigo-300 uppercase tracking-widest mb-1">Human Protection</div>
                <div className="text-xl font-black text-amber-400">30 mA</div>
                <div className="text-xs text-indigo-100 mt-1">Mandatory for bathrooms & sockets.</div>
              </div>
               <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                <div className="text-xs text-indigo-300 uppercase tracking-widest mb-1">Fire Protection Only</div>
                <div className="text-xl font-black text-white">100 / 300 mA</div>
                <div className="text-xs text-indigo-100 mt-1">Used for whole-house main switches. Will NOT save a human.</div>
              </div>
            </div>
          </div>

          {/* Card 4: Action */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 p-8 rounded-3xl backdrop-blur-xl border border-red-500/30 hover:border-red-500/80 transition-colors group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="bg-red-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-extrabold text-xl text-white mb-4">The "T" Button Test</h3>
              <p className="text-sm text-indigo-100 mb-6 font-medium leading-relaxed">
                The internal magnetic mechanism can get stuck due to dust or age. A stuck RCD provides ZERO protection.
              </p>
              <div className="bg-red-500 text-white font-bold p-4 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] text-sm animate-pulse">
                ACTION: Press the "T" (Test) button on your breaker box monthly. If it doesn't instantly violently snap off, REPLACE IT IMMEDIATELY.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
