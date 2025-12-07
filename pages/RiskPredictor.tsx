
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, ShieldAlert, CheckSquare, Flame, Zap } from 'lucide-react';

export const RiskPredictor = () => {
  const [factors, setFactors] = useState<string[]>([]);
  const [subAnswers, setSubAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<'low' | 'medium' | 'high' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [riskDetails, setRiskDetails] = useState<string[]>([]);

  // Refined risk factors with weights, critical flags, and educational descriptions
  const riskFactors = [
    { 
      id: 'wiring_age', 
      label: 'Home wiring is older than 30 years', 
      description: 'Old insulation becomes brittle and cracks, exposing live wires to potential short circuits.',
      weight: 3 
    },
    { 
      id: 'moisture', 
      label: 'Moisture or water exposure near outlets/switches', 
      description: 'Water conducts electricity, creating a direct path for lethal shocks and short circuits.',
      weight: 4 
    },
    { 
      id: 'loose_sockets', 
      label: 'Loose sockets (plugs fall out easily)', 
      description: 'Poor contact area increases resistance, causing heat buildup and potential arcing.',
      weight: 4 
    },
    { 
      id: 'overheating', 
      label: 'Outlets or switches feel warm to the touch', 
      description: 'Heat indicates active electrical resistance, a direct precursor to melting and fire.',
      weight: 10, 
      isCritical: true 
    },
    { 
      id: 'breaker_trips', 
      label: 'Circuit breakers trip frequently', 
      description: 'The safety mechanism is detecting sustained overloads or faults that strain your wiring.',
      weight: 4 
    },
    { 
      id: 'no_gfci', 
      label: 'No Ground Fault Protection (RCD/GFCI)', 
      description: 'Without RCDs, there is no automatic shutoff to prevent fatal electric shocks.',
      weight: 5 
    },
    { 
      id: 'smell', 
      label: 'Occasional burning or fishy smell', 
      description: 'Chemical odors indicate wire insulation is actively melting, posing an immediate fire risk.',
      weight: 10, 
      isCritical: true 
    },
    { 
      id: 'sparks', 
      label: 'Visible sparks when plugging in devices', 
      description: 'Visible arcing generates intense heat (thousands of degrees) capable of igniting dust or covers.',
      weight: 4 
    },
    { 
      id: 'flicker', 
      label: 'Lights flicker when major appliances start', 
      description: 'Flickering indicates loose connections or voltage drops, both of which generate dangerous heat.',
      weight: 2 
    },
    { 
      id: 'adapters', 
      label: 'Heavy reliance on adapters/extension cords', 
      description: 'Every additional connection point adds resistance and is a potential failure point for overheating.',
      weight: 3 
    }
  ];

  const toggleFactor = (id: string) => {
    setFactors(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        // Deselecting: Remove factor and any sub-answers
        const newSub = { ...subAnswers };
        delete newSub[id];
        setSubAnswers(newSub);
        return prev.filter(f => f !== id);
      } else {
        // Selecting
        return [...prev, id];
      }
    });
  };

  const handleSubAnswer = (factorId: string, value: string) => {
    setSubAnswers(prev => ({ ...prev, [factorId]: value }));
  };

  const calculateRisk = () => {
    let currentScore = 0;
    let criticalTriggered = false;
    const details: string[] = [];

    // 1. Base Score Calculation
    factors.forEach(id => {
      const factor = riskFactors.find(f => f.id === id);
      if (factor) {
        currentScore += factor.weight;
        
        // Smell Sub-logic
        if (id === 'smell' && subAnswers['smell']) {
          const loc = subAnswers['smell'];
          if (loc === 'panel') {
            currentScore += 5; // Main panel is critical
            details.push("CRITICAL DANGER: Burning smell at Main Panel suggests main service wiring failure.");
          } else if (loc === 'outlet') {
            currentScore += 3;
            details.push("HIGH RISK: Burning smell at outlet indicates internal arcing/melting.");
          } else if (loc === 'appliance') {
            currentScore += 1; // Less risk to house structure, but still bad
            details.push("Appliance Failure: Unplug the specific appliance immediately.");
          }
        }

        if (factor.isCritical) {
          criticalTriggered = true;
          details.push(`CRITICAL: "${factor.label}" is an immediate fire hazard.`);
        }
      }
    });

    // 2. Compound Logic (The "Nuanced" Scoring)
    
    // Water + No Protection = Lethal Shock Risk
    if (factors.includes('moisture') && factors.includes('no_gfci')) {
      currentScore += 10;
      details.push("AMPLIFIED RISK: Water exposure without GFCI/RCD protection creates a lethal shock hazard.");
    }

    // Loose Sockets + Sparks = Arcing Fire Risk
    if (factors.includes('loose_sockets') && factors.includes('sparks')) {
      currentScore += 6;
      details.push("AMPLIFIED RISK: Loose contacts causing sparks indicates active arcing (fire starter).");
    }

    // Old Wiring + Tripping = System Failure
    if (factors.includes('wiring_age') && factors.includes('breaker_trips')) {
      currentScore += 5;
      details.push("SYSTEM STRESS: Aging infrastructure cannot handle your current electrical load.");
    }

    setScore(currentScore);
    setRiskDetails(details);

    if (criticalTriggered || currentScore >= 15) {
      setResult('high');
    } else if (currentScore >= 5) {
      setResult('medium');
    } else {
      setResult('low');
    }
  };

  const getActionPlan = () => {
    const actions = [];
    
    // Immediate Critical Actions
    if (factors.includes('smell') || factors.includes('overheating')) {
      actions.push("EMERGENCY: Switch off the main power to affected circuits immediately.");
      actions.push("Do not use the outlet/switch until replaced by a professional.");
    }

    // Specific factor-based advice
    if (factors.includes('moisture') || factors.includes('no_gfci')) {
      actions.push("Install GFCI/RCD protection immediately in all wet areas (kitchen, bath, outdoors).");
    }
    if (factors.includes('loose_sockets')) {
      actions.push("Replace worn receptacles immediately. Loose contacts cause arcing and heat.");
    }
    if (factors.includes('breaker_trips')) {
      actions.push("Identify overloaded circuits. Redistribute high-power appliances to different outlets.");
    }
    if (factors.includes('wiring_age')) {
      actions.push("Schedule a professional insulation resistance test to check wire health.");
    }

    // General advice if few specific factors selected but score is low/med
    if (actions.length === 0) {
      actions.push("Maintain regular visual inspections of cords and plugs.");
      actions.push("Test your smoke detectors monthly.");
    }

    return actions;
  };

  const getPreventionChecklist = () => {
    // Base checklist
    const steps = [
      "Test all GFCI/RCD buttons monthly.",
      "Ensure 3 feet (1m) clearance around electrical panels.",
      "Install smoke alarms in every sleeping room."
    ];

    // Dynamic additions based on factors
    factors.forEach(id => {
      switch(id) {
        case 'wiring_age':
          steps.push("Schedule an insulation resistance test every 3-5 years.");
          steps.push("Avoid high-wattage loads on old branch circuits.");
          break;
        case 'moisture':
          steps.push("Install weatherproof covers on outlets near water.");
          steps.push("Ensure hands are dry before operating switches.");
          break;
        case 'loose_sockets':
          steps.push("Check socket tightness; if plug sags, contact is poor.");
          steps.push("Replace receptacle mechanism if grip is weak.");
          break;
        case 'overheating':
          steps.push("Check faceplate temperature during heavy usage.");
          steps.push("Reduce load on the heating circuit immediately.");
          break;
        case 'breaker_trips':
          steps.push("Map circuits to separate high-load appliances.");
          steps.push("Check for pinched wires causing intermittent shorts.");
          break;
        case 'no_gfci':
          steps.push("Retrofit GFCI/RCD outlets in kitchen and bathrooms.");
          break;
        case 'smell':
          steps.push("Inspect panel wire terminals for discoloration/melting.");
          break;
        case 'sparks':
          steps.push("Inspect plug pins for pitting or black burns.");
          steps.push("Replace outlets that flash visibly on connection.");
          break;
        case 'flicker':
          steps.push("Check for loose neutral connections in the panel.");
          steps.push("Tighten light bulbs and switch terminals.");
          break;
        case 'adapters':
          steps.push("Install additional wall sockets to reduce adapter use.");
          steps.push("Use fused power strips with overload protection.");
          break;
      }
    });

    return steps;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Zap className="text-yellow-500" /> Shock & Fire Risk Predictor
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Identify potential electrical hazards using our weighted risk algorithm. We analyze combinations of symptoms to predict failure points.
        </p>
      </div>

      {!result ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" /> Select all that apply:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskFactors.map(f => (
                <div key={f.id} className={`p-4 border rounded-lg transition-all ${factors.includes(f.id) ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'hover:bg-gray-50 border-gray-200'}`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 flex-shrink-0"
                      checked={factors.includes(f.id)}
                      onChange={() => toggleFactor(f.id)}
                    />
                    <div className="ml-3">
                      <span className="block text-gray-800 font-medium">{f.label}</span>
                      <span className="block text-xs text-gray-500 mt-1 leading-snug">{f.description}</span>
                      {f.isCritical && <span className="inline-block mt-1 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Critical Indicator</span>}
                    </div>
                  </label>

                  {/* Sub Question for Smell */}
                  {f.id === 'smell' && factors.includes('smell') && (
                    <div className="ml-8 mt-3 p-3 bg-red-50/50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                      <p className="text-xs font-bold text-red-800 mb-2 uppercase">Where do you smell it?</p>
                      <div className="space-y-2">
                        {[
                          { val: 'outlet', text: 'Near outlets/switches' },
                          { val: 'panel', text: 'Near the main panel' },
                          { val: 'appliance', text: 'Near appliances' }
                        ].map(opt => (
                          <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="smell_loc"
                              value={opt.val}
                              checked={subAnswers['smell'] === opt.val}
                              onChange={(e) => handleSubAnswer('smell', e.target.value)}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-800">{opt.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={calculateRisk}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-6 h-6" /> Calculate Risk Level
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in zoom-in-50 duration-500">
          <div className={`p-8 rounded-xl border-2 text-center shadow-md ${
            result === 'low' ? 'bg-green-50 border-green-200' :
            result === 'medium' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            <div className="flex justify-center mb-4">
              {result === 'low' && <CheckCircle className="w-16 h-16 text-green-600" />}
              {result === 'medium' && <AlertTriangle className="w-16 h-16 text-yellow-600" />}
              {result === 'high' && <Flame className="w-16 h-16 text-red-600 animate-pulse" />}
            </div>
            
            <h2 className={`text-4xl font-extrabold uppercase mb-2 ${
              result === 'low' ? 'text-green-700' :
              result === 'medium' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {result} RISK
            </h2>

            {/* Visual Gauge */}
            <div className="max-w-md mx-auto mt-6 mb-8">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-1 uppercase">
                <span>Safe</span>
                <span>Warning</span>
                <span>Critical</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 opacity-30"></div>
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${
                    result === 'low' ? 'bg-green-500' : result === 'medium' ? 'bg-yellow-500' : 'bg-red-600'
                  }`}
                  style={{ width: `${Math.min((score / 25) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">Risk Score: {score}</p>
            </div>
            
            <p className="text-gray-700 text-lg font-medium max-w-xl mx-auto mb-4">
              {result === 'low' && "Your home shows minimal signs of electrical stress. Maintain your safety habits."}
              {result === 'medium' && "There are clear warning signs. Preventative maintenance is needed soon to avoid failure."}
              {result === 'high' && "CRITICAL DANGER DETECTED. The combination of factors indicates a high probability of fire or shock hazard."}
            </p>

            {/* Risk Details / Why is it high? */}
            {riskDetails.length > 0 && (
               <div className="bg-white/60 p-4 rounded-lg text-left max-w-lg mx-auto border border-black/5">
                 <h4 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Analysis Breakdown:</h4>
                 <ul className="list-disc pl-4 space-y-1">
                   {riskDetails.map((detail, idx) => (
                     <li key={idx} className="text-sm text-red-700 font-medium">{detail}</li>
                   ))}
                 </ul>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" /> Immediate Actions
              </h3>
              <ul className="space-y-3">
                {getActionPlan().map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="mt-0.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-green-600" /> Detailed Prevention Checklist
              </h3>
              <ul className="space-y-3">
                {getPreventionChecklist().map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => { setResult(null); setFactors([]); setRiskDetails([]); setScore(0); setSubAnswers({}); window.scrollTo(0,0); }}
              className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition shadow-md"
            >
              <RefreshCw className="w-4 h-4" /> Start New Prediction
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
