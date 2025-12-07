
import React, { useState } from 'react';
import { HARDWARE_DATA, STANDARDS_GUIDE } from '../data';
import { Settings, Zap, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

export const HardwareGuide = () => {
  const [selectedLoad, setSelectedLoad] = useState('light');
  
  // Logic for the simple spec selector
  const getRecommendation = () => {
    switch(selectedLoad) {
      case 'light': return {
        device: 'LED Lights / Ceiling Fan',
        wire: '1.5mm² Copper Wire',
        breaker: 'B6 or B10 (6A/10A) MCB',
        switch: '6A Switch',
        note: 'Lighting circuits should be separate from power sockets.'
      };
      case 'socket': return {
        device: 'General TV / Floor Lamp',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 or B20 (16A/20A) MCB',
        switch: '6A/10A Shuttered Socket',
        note: 'Use shuttered sockets to protect children from touching live parts.'
      };
      case 'computer': return {
        device: 'Gaming PC / Router / Office',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: 'Surge Protected Socket',
        note: 'Sensitive Electronics: Surge Protection Device (SPD) is highly recommended.'
      };
      case 'console': return {
        device: 'Gaming Console (PS5/Xbox)',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: 'Surge Protected Socket',
        note: 'Expensive electronics. Use a surge protector to prevent damage from grid spikes.'
      };
      case 'projector': return {
        device: 'Home Theater Projector',
        wire: '2.5mm² Copper Wire',
        breaker: 'B10 or B16 MCB',
        switch: 'Surge Protected Socket',
        note: 'Expensive bulb/electronics. UPS recommended for cooling cycle during outage.'
      };
      case 'printer': return {
        device: 'Laser Printer',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 (16A) MCB',
        switch: '16A Socket',
        note: 'Fuser units create high current spikes. Lights might flicker if on the same circuit.'
      };
      case 'hometheater': return {
        device: 'AV Receiver / Subwoofer',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 (16A) MCB',
        switch: 'Surge Protected Socket',
        note: 'Subwoofers draw high peak current. Avoid sharing with lights (flicker risk).'
      };
      case 'cctv': return {
        device: 'CCTV / Security Hub',
        wire: '1.5mm² or 2.5mm²',
        breaker: 'B6 or B10 MCB',
        switch: 'UPS Protected Socket',
        note: 'Security system. Must be on UPS/Battery backup to function during cuts.'
      };
      case 'fridge': return {
        device: 'Refrigerator / Freezer',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 (16A) MCB',
        switch: '16A Socket (Dedicated)',
        note: 'Ideally on a dedicated circuit so other faults don’t spoil food.'
      };
      case 'washing': return {
        device: 'Washing Machine',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 or C20 MCB + RCD',
        switch: '16A Socket (Away from water)',
        note: 'Must have GFCI/RCD protection due to water proximity.'
      };
      case 'dishwasher': return {
        device: 'Dishwasher',
        wire: '2.5mm² or 4.0mm² Copper Wire',
        breaker: 'C20 (20A) MCB + RCD',
        switch: '16A Socket (Under counter)',
        note: 'Water hazard. GFCI/RCD mandatory. Ensure socket is accessible for isolation.'
      };
      case 'microwave': return {
        device: 'Microwave / OTG Oven',
        wire: '2.5mm² or 4.0mm² Copper Wire',
        breaker: 'C20 (20A) MCB',
        switch: '16A Power Socket',
        note: 'High continuous load. Check plug temperature regularly.'
      };
      case 'toaster': return {
        device: 'Toaster / Sandwich Maker',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: '16A Socket',
        note: 'Heating element draws high current. Keep crumb tray clean to prevent internal shorts.'
      };
      case 'rice': return {
        device: 'Rice Cooker / Slow Cooker',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: '16A Socket',
        note: 'Long duration heating. Ensure plug fits tightly to avoid melting during 8hr cooks.'
      };
      case 'airfryer': return {
        device: 'Air Fryer',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: '16A Socket',
        note: 'High continuous heat (1500W+). Do not plug into shared power strips.'
      };
      case 'coffee': return {
        device: 'Coffee Machine / Espresso',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: '16A Socket',
        note: 'Combines Water + Heat. Grounding must be perfect.'
      };
      case 'blender': return {
        device: 'Blender / Mixer Grinder',
        wire: '1.5mm² or 2.5mm²',
        breaker: 'C10 or C16 MCB',
        switch: '10A/16A Socket',
        note: 'High speed motor. Short duration usage.'
      };
      case 'disposal': return {
        device: 'Garbage Disposal',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 MCB + RCD',
        switch: 'Switched Fused Spur (Above Counter)',
        note: 'Under-sink vibration can loosen wires. Check connections yearly.'
      };
      case 'grill': return {
        device: 'Electric Grill / BBQ',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: '16A Socket',
        note: 'Outdoor use? Ensure socket is weather-rated (IP65).'
      };
      case 'iron': return {
        device: 'Electric Iron / Kettle',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 (16A) MCB',
        switch: '16A High-Quality Socket',
        note: 'High wattage resistive load. Use branded sockets to prevent melting.'
      };
      case 'hairdryer': return {
        device: 'Hair Dryer / Curler',
        wire: '2.5mm² Copper Wire',
        breaker: 'B16 MCB + RCD',
        switch: '16A Socket (Bathroom)',
        note: 'High shock risk. Must be used with GFCI/RCD protection.'
      };
      case 'vacuum': return {
        device: 'Vacuum Cleaner',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 (16A) MCB',
        switch: '16A Socket',
        note: 'High motor start current. Avoid plugging into cheap extension cords.'
      };
      case 'heater': return {
        device: 'Space Heater / Oil Heater',
        wire: '2.5mm² (Short run) or 4.0mm²',
        breaker: 'C20 (20A) MCB',
        switch: 'Direct Wall Socket ONLY',
        note: 'Fire Hazard: NEVER use with extension cords or adapters.'
      };
      case 'blanket': return {
        device: 'Electric Blanket',
        wire: '1.5mm² or 2.5mm²',
        breaker: 'B6 or B10 MCB',
        switch: 'Standard Socket',
        note: 'Inspect cord for fraying. Never tuck cord under mattress. Unplug when not in use.'
      };
      case 'heavy': return {
        device: 'Geyser (Water Heater) / 1.5T AC',
        wire: '4.0mm² Copper Wire',
        breaker: 'C25 (25A) MCB',
        switch: '20A/32A Double Pole (DP) Switch',
        note: 'Use a DP switch to isolate both Live and Neutral for safety.'
      };
      case 'dehumidifier': return {
        device: 'Dehumidifier',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 (16A) MCB',
        switch: '16A Socket',
        note: 'Compressor load. Keep upright. Empty tank regularly to prevent spills near power.'
      };
      case 'humidifier': return {
        device: 'Humidifier',
        wire: '1.5mm² Copper Wire',
        breaker: 'B10 MCB + RCD',
        switch: 'Standard Socket',
        note: 'Water reservoir sits on top of electronics. Keep away from curtains.'
      };
      case 'treadmill': return {
        device: 'Treadmill / Exercise Bike',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 (16A) MCB',
        switch: '16A Socket + Surge Protector',
        note: 'Motors cause surges. Use a dedicated circuit to stop lights flickering.'
      };
      case 'aquarium': return {
        device: 'Aquarium / Fish Tank',
        wire: '1.5mm² or 2.5mm²',
        breaker: 'B10 or B16 MCB + RCD',
        switch: 'Standard Socket (Drip Loop)',
        note: 'Crucial: Create a "drip loop" in the cord so water cannot run down into the socket.'
      };
      case 'cpap': return {
        device: 'CPAP Machine (Medical)',
        wire: '2.5mm² Copper Wire',
        breaker: 'B10 or B16 MCB',
        switch: 'UPS Protected Socket',
        note: 'Critical Life Support. Use a UPS to ensure breathing support during power cuts.'
      };
      case 'tool': return {
        device: 'Power Tools (Drill/Saw)',
        wire: '2.5mm² Heavy Duty Ext Cord',
        breaker: 'C20 (20A) MCB',
        switch: '16A/20A Industrial Socket',
        note: 'Use heavy-gauge extension cords to prevent voltage drop and motor burnout.'
      };
      case 'saw': return {
        device: 'Table Saw / Miter Saw',
        wire: '4.0mm² Copper Wire',
        breaker: 'C20 or C25 MCB',
        switch: 'Dedicated 20A Circuit',
        note: 'Very high startup current. Will trip standard B-curve breakers immediately.'
      };
      case 'welder': return {
        device: 'Welding Machine (Inverter)',
        wire: '4.0mm² or 6.0mm²',
        breaker: 'D32 or C32 MCB',
        switch: 'Industrial 32A Socket',
        note: 'Huge inrush current. Standard B-curve breakers will trip instantly.'
      };
      case 'sump': return {
        device: 'Sump Pump',
        wire: '2.5mm² Copper Wire',
        breaker: 'C16 MCB + RCD',
        switch: 'Dedicated Waterproof Socket',
        note: 'Critical flood prevention. Recommend dedicated circuit so other faults don\'t trip it.'
      };
      case 'outdoor': return {
        device: 'Garden Lights / Mower',
        wire: '2.5mm² Armored Cable',
        breaker: 'C16 (16A) RCBO (30mA)',
        switch: 'IP65 Weatherproof Socket',
        note: 'Must be waterproof (IP Rated) and RCD protected.'
      };
      case 'pressure': return {
        device: 'Pressure Washer',
        wire: '2.5mm² Outdoor Cord',
        breaker: 'C16 MCB + RCD',
        switch: 'IP66 Outdoor Socket',
        note: 'Combines high pressure water and electricity. NEVER use without RCD protection.'
      };
      case 'pool': return {
        device: 'Pool / Spa Pump',
        wire: '4.0mm² or 6.0mm²',
        breaker: 'C20/C32 RCBO (30mA)',
        switch: 'Rotary Isolator Switch',
        note: 'Hardwired connection preferred. Bond all metal parts (railing/ladder) to ground.'
      };
      case 'gate': return {
        device: 'Electric Gate Motor',
        wire: '2.5mm² Armored Cable (Underground)',
        breaker: 'C16 MCB + RCD',
        switch: 'Weatherproof Junction Box',
        note: 'Cable must be buried 600mm deep with warning tape.'
      };
      case 'ev': return {
        device: 'EV Charger (7kW)',
        wire: '6.0mm² or 10.0mm² Armored Cable',
        breaker: '32A/40A RCBO (Type A)',
        switch: 'Dedicated Industrial Socket',
        note: 'Requires specialized Type-A or Type-B RCD protection.'
      };
      default: return null;
    }
  };

  const rec = getRecommendation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Electrical Hardware Encyclopedia</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't just buy what the electrician asks for. Understand what you are paying for, how to check quality, and what the global safety ratings mean.
        </p>
      </div>

      {/* 1. THE SPEC SELECTOR TOOL */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 mb-16 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-20 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6 text-green-400" /> Quick Spec Selector
          </h2>
          <p className="text-gray-300 mb-8">Select a device to see the recommended wire size and breaker rating.</p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { id: 'light', label: 'Light/Fan' },
              { id: 'socket', label: 'General TV' },
              { id: 'computer', label: 'PC / Router' },
              { id: 'console', label: 'Gaming Console' },
              { id: 'printer', label: 'Laser Printer' },
              { id: 'cctv', label: 'CCTV / Security' },
              { id: 'projector', label: 'Projector' },
              { id: 'hometheater', label: 'Home Theater' },
              { id: 'fridge', label: 'Refrigerator' },
              { id: 'microwave', label: 'Microwave' },
              { id: 'airfryer', label: 'Air Fryer' },
              { id: 'toaster', label: 'Toaster' },
              { id: 'rice', label: 'Rice Cooker' },
              { id: 'disposal', label: 'Garbage Disposal' },
              { id: 'blender', label: 'Blender' },
              { id: 'coffee', label: 'Coffee Machine' },
              { id: 'washing', label: 'Washing Machine' },
              { id: 'dishwasher', label: 'Dishwasher' },
              { id: 'iron', label: 'Iron / Kettle' },
              { id: 'hairdryer', label: 'Hair Dryer' },
              { id: 'vacuum', label: 'Vacuum Cleaner' },
              { id: 'cpap', label: 'CPAP (Medical)' },
              { id: 'treadmill', label: 'Treadmill' },
              { id: 'aquarium', label: 'Aquarium' },
              { id: 'heater', label: 'Space Heater' },
              { id: 'blanket', label: 'Electric Blanket' },
              { id: 'dehumidifier', label: 'Dehumidifier' },
              { id: 'humidifier', label: 'Humidifier' },
              { id: 'heavy', label: 'AC / Geyser' },
              { id: 'tool', label: 'Power Tools' },
              { id: 'saw', label: 'Table Saw' },
              { id: 'welder', label: 'Welding Machine' },
              { id: 'sump', label: 'Sump Pump' },
              { id: 'pressure', label: 'Pressure Washer' },
              { id: 'grill', label: 'Electric Grill' },
              { id: 'outdoor', label: 'Outdoor/Garden' },
              { id: 'pool', label: 'Pool Pump' },
              { id: 'gate', label: 'Gate Motor' },
              { id: 'ev', label: 'EV Charger' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedLoad(type.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                  selectedLoad === type.id 
                    ? 'bg-blue-500 text-white shadow-lg scale-105' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {rec && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-2">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Target Device</div>
                <div className="text-lg font-bold text-white leading-tight">{rec.device}</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Wire Size</div>
                <div className="text-lg font-bold text-yellow-400 leading-tight">{rec.wire}</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Breaker (MCB)</div>
                <div className="text-lg font-bold text-green-400 leading-tight">{rec.breaker}</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Switch/Socket</div>
                <div className="text-lg font-bold text-blue-400 leading-tight">{rec.switch}</div>
              </div>
            </div>
          )}
          
          {rec?.note && (
             <div className="mt-4 bg-blue-900/40 border border-blue-500/30 p-3 rounded-lg text-sm text-blue-200 flex items-center gap-2">
               <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
               <span><strong>Safety Note:</strong> {rec.note}</span>
             </div>
          )}

          <p className="text-xs text-gray-500 mt-4">* General recommendations only. Always consult a certified electrician for cable lengths over 20 meters.</p>
        </div>
      </div>

      {/* 2. COMPONENT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {HARDWARE_DATA.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded mt-1 inline-block">
                  AKA: {item.aka}
                </span>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-gray-500" />
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 min-h-[48px]">{item.description}</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Common Ratings</div>
                <div className="flex flex-wrap gap-2">
                  {item.ratings.map((r, i) => (
                    <span key={i} className="px-2 py-1 bg-white border border-gray-200 text-xs font-mono rounded text-gray-700">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {item.standards && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Applicable Standards</div>
                    <div className="text-sm text-indigo-700 font-mono">
                      {item.standards.join(', ')}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                 <div>
                   <div className="text-sm font-bold text-gray-900">Selection Rule</div>
                   <div className="text-sm text-gray-600">{item.selectionRule}</div>
                 </div>
              </div>

              <div className="flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                 <div>
                   <div className="text-sm font-bold text-gray-900">Pro Tip</div>
                   <div className="text-sm text-gray-600">{item.tip}</div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 3. STANDARDS GUIDE */}
      <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <BookOpen className="text-indigo-600" /> Decoding Global Standards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STANDARDS_GUIDE.map((std, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="font-mono text-lg font-bold text-indigo-700 mb-1">{std.code}</div>
              <div className="font-bold text-gray-900 text-sm mb-2">{std.title}</div>
              <p className="text-xs text-gray-600">{std.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
