
import React, { useState } from 'react';
import { HARDWARE_DATA, STANDARDS_GUIDE } from '../data';
import { Settings, Zap, CheckCircle2, AlertTriangle, BookOpen, ShoppingCart, Plus, Trash2, Copy, Printer, CheckCircle, Globe, Layout, ArrowRight, BatteryCharging } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RelatedTools } from '../components/RelatedTools';
import { StickyTOC, TOCItem } from '../components/StickyTOC';

const HW_TOC: TOCItem[] = [
  { id: 'hw-spec-selector', label: 'Quick Spec Selector' },
  { id: 'hw-components', label: 'Component Cards' },
  { id: 'hw-standards', label: 'Global Standards' },
];



export const HardwareGuide = () => {
  const navigate = useNavigate();
  const [selectedLoad, setSelectedLoad] = useState('light');
  const [shoppingList, setShoppingList] = useState<Array<{ device: string; wire: string; breaker: string; socket: string }>>(() => {
    const saved = localStorage.getItem('hw_shopping_list');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [listCopied, setListCopied] = useState(false);

  const addToList = (rec: { device: string; wire: string; breaker: string; switch: string }) => {
    const exists = shoppingList.some(i => i.device === rec.device);
    if (exists) return;
    const newList = [...shoppingList, { device: rec.device, wire: rec.wire, breaker: rec.breaker, socket: rec.switch }];
    setShoppingList(newList);
    localStorage.setItem('hw_shopping_list', JSON.stringify(newList));
    setShowCart(true);
  };

  const removeFromList = (device: string) => {
    const newList = shoppingList.filter(i => i.device !== device);
    setShoppingList(newList);
    localStorage.setItem('hw_shopping_list', JSON.stringify(newList));
  };

  const copyList = () => {
    const text = 'Project Materials List (from ElectroSafe.homes)\n' +
      '='.repeat(45) + '\n' +
      shoppingList.map((item, i) =>
        `${i + 1}. ${item.device}\n   Wire: ${item.wire}\n   Breaker: ${item.breaker}\n   Socket: ${item.socket}`
      ).join('\n\n');
    navigator.clipboard.writeText(text);
    setListCopied(true);
    setTimeout(() => setListCopied(false), 2000);
  };

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
        note: 'Requires specialized Type-A or Type-B RCD protection. Important: See the full EV Sizer for exact wire gauge based on cable distance.',
        link: '/ev-charger'
      };
      default: return null;
    }
  };

  const rec = getRecommendation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <StickyTOC items={HW_TOC} />
      {/* Header */}
      <div className="text-center mb-16 relative py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-3xl rounded-[3rem] -z-10"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6 font-display tracking-tight">
          Electrical Hardware Encyclopedia
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Don't just buy what the electrician asks for. Understand what you're paying for, how to verify true quality, and what the global safety ratings mean.
        </p>
      </div>

      {/* 1. THE SPEC SELECTOR TOOL */}
      <div id="hw-spec-selector" className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white rounded-[2.5rem] p-8 md:p-12 mb-20 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10 backdrop-blur-md">
            Interactive Tool
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-400" /> Smart Spec Selector
          </h2>
          <p className="text-slate-300 mb-10 text-lg max-w-3xl">Tap any household device below to instantly see the engineering-grade wire size, breaker rating, and socket type required for 100% safety.</p>
          
          <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
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
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm md:text-base border ${
                  selectedLoad === type.id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-400 scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {rec && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-8 duration-500">
              <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl backdrop-blur-xl border border-white/10 group hover:border-white/30 transition-colors">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><Zap className="w-3 h-3" /> Target Device</div>
                <div className="text-xl font-bold text-white tracking-tight">{rec.device}</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl backdrop-blur-xl border border-white/10 group hover:border-yellow-500/30 transition-colors">
                <div className="text-xs text-yellow-500/70 uppercase font-bold tracking-widest mb-2">Wire Gauge</div>
                <div className="text-xl font-bold text-yellow-400 tracking-tight">{rec.wire}</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl backdrop-blur-xl border border-white/10 group hover:border-emerald-500/30 transition-colors">
                <div className="text-xs text-emerald-500/70 uppercase font-bold tracking-widest mb-2">Breaker (MCB)</div>
                <div className="text-xl font-bold text-emerald-400 tracking-tight">{rec.breaker}</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl backdrop-blur-xl border border-white/10 group hover:border-blue-500/30 transition-colors">
                <div className="text-xs text-blue-500/70 uppercase font-bold tracking-widest mb-2">Socket Spec</div>
                <div className="text-xl font-bold text-blue-400 tracking-tight">{rec.switch}</div>
              </div>
            </div>
          )}

          {(rec as any)?.link && (
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => navigate((rec as any).link)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
              >
                {rec.device.includes('EV') ? <BatteryCharging className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                Open Dedicated {(rec as any).device} Analyzer <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {rec?.note && (
             <div className="mt-6 bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl text-base text-amber-200 flex items-start sm:items-center gap-3 animate-in fade-in duration-700">
               <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
               <span className="leading-relaxed"><strong>Crucial Note:</strong> {rec.note}</span>
             </div>
          )}

          {/* Add to Shopping List Button */}
          {rec && (
            <button
              onClick={() => addToList(rec)}
              className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                shoppingList.some(i => i.device === rec.device)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 hover:scale-105'
              }`}
            >
              {shoppingList.some(i => i.device === rec.device) ? (
                <><CheckCircle className="w-4 h-4" /> Added to Project List</>
              ) : (
                <><Plus className="w-4 h-4" /> Add to Project Materials List</>
              )}
            </button>
          )}

          <p className="text-xs text-gray-500 mt-4">* General recommendations only. Always consult a certified electrician for cable lengths over 20 meters.</p>
        </div>
      </div>

      {/* 2. COMPONENT CARDS */}
      <div id="hw-components" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 animate-slide-up delay-200">
        {HARDWARE_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-display">{item.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mt-2 inline-block border border-blue-100">
                    AKA: {item.aka}
                  </span>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl shadow-sm border border-gray-200 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 min-h-[48px] text-lg leading-relaxed">{item.description}</p>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Common Ratings</div>
                  <div className="flex flex-wrap gap-2">
                    {item.ratings.map((r, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-sm font-bold shadow-sm rounded-lg text-slate-700">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {item.standards && (
                  <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                    <div className="bg-indigo-100 p-2 rounded-xl flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-1">Applicable Standards</div>
                      <div className="text-sm text-indigo-700 font-mono font-bold">
                        {item.standards.join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                   <div className="bg-emerald-50 p-2 rounded-xl flex-shrink-0">
                     <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-gray-900 mb-1">Selection Rule</div>
                     <div className="text-sm text-gray-600 leading-relaxed">{item.selectionRule}</div>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="bg-orange-50 p-2 rounded-xl flex-shrink-0 mt-0.5">
                     <AlertTriangle className="w-5 h-5 text-orange-600" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-gray-900 mb-1">Expert Pro Tip</div>
                     <div className="text-sm text-gray-600 leading-relaxed">{item.tip}</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 3. STANDARDS GUIDE */}
      <div id="hw-standards" className="bg-gradient-to-r from-gray-50 to-indigo-50/50 rounded-[2.5rem] p-8 md:p-12 border border-indigo-100/50 mb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Global Compliance
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
            <BookOpen className="text-indigo-600 w-8 h-8" /> Decoding Global Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STANDARDS_GUIDE.map((std, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe className="w-16 h-16 text-indigo-900" />
                </div>
                <div className="relative z-10">
                  <div className="inline-block bg-indigo-50 px-3 py-1 rounded-lg font-mono text-lg font-bold text-indigo-700 mb-3 border border-indigo-100">{std.code}</div>
                  <div className="font-bold text-gray-900 text-lg mb-2">{std.title}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{std.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/hardware" count={3} />

      {/* Floating Shopping Cart */}
      {shoppingList.length > 0 && (
        <>
          {/* Toggle Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="fixed bottom-20 md:bottom-6 right-16 md:right-6 z-40 bg-yellow-400 hover:bg-yellow-300 text-gray-900 p-3.5 rounded-full shadow-xl transition-all hover:scale-110"
            title="Project Materials List"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {shoppingList.length}
            </span>
          </button>

          {/* Cart Panel */}
          {showCart && (
            <div className="fixed bottom-36 md:bottom-20 right-4 z-50 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
              <div className="bg-gray-900 dark:bg-gray-800 text-white p-4 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Project Materials</h3>
                <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold">{shoppingList.length} items</span>
              </div>
              <div className="max-h-60 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {shoppingList.map((item, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{item.device}</p>
                      <p className="text-gray-500 dark:text-gray-400">Wire: {item.wire}</p>
                      <p className="text-gray-500 dark:text-gray-400">MCB: {item.breaker}</p>
                      <p className="text-gray-500 dark:text-gray-400">Socket: {item.socket}</p>
                    </div>
                    <button onClick={() => removeFromList(item.device)} className="text-gray-400 hover:text-red-500 mt-0.5">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <button onClick={copyList} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold text-xs transition ${listCopied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {listCopied ? <><CheckCircle className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy List</>}
                </button>
                <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-bold text-xs hover:bg-gray-200 transition">
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
