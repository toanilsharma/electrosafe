
import React, { useState } from 'react';
import { Printer, FileText, CheckCircle, ChevronRight, Download, ClipboardCheck } from 'lucide-react';

const templates = [
  { id: 'audit', name: 'Universal Home Electrical Safety Audit' },
  { id: 'fire', name: 'Fire Hazard Prevention Sheet' },
  { id: 'room', name: 'Room-by-Room Safety Checklist' },
  { id: 'gfci', name: 'Grounding/GFCI Testing Log' },
  { id: 'label', name: 'Circuit Label Template' },
  { id: 'night', name: 'Night Safety Checklist' },
  { id: 'log', name: 'Appliance Health Log Sheet' },
];

export const Downloads = () => {
  const [activeTemplate, setActiveTemplate] = useState('room');

  const print = () => window.print();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10 no-print">
        <h1 className="text-3xl font-bold text-gray-900">Downloadable Safety Checklists</h1>
        <p className="mt-2 text-gray-600 mb-8">Professional-grade printable templates. Select a checklist below to view and print.</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeTemplate === t.id 
                  ? 'bg-blue-900 text-white border-blue-900 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <button 
          onClick={print}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <Printer className="w-5 h-5 mr-2" /> Print This Checklist
        </button>
      </div>

      {/* Printable Area Container */}
      <div className="bg-white p-8 md:p-16 shadow-lg border border-gray-200 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full max-w-4xl mx-auto min-h-[800px]">
        
        {/* Header (Universal) */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b-2 border-gray-900">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
              {templates.find(t => t.id === activeTemplate)?.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Global Residential Safety Standard</p>
          </div>
          <div className="text-right">
             <div className="flex items-center justify-end gap-2 mb-1">
               <ClipboardCheck className="w-6 h-6 text-blue-600" />
               <span className="text-gray-900 font-bold text-xl tracking-tight">
                  ElectroSafe<span className="text-blue-600">.homes</span>
                </span>
             </div>
             <p className="text-xs text-gray-400">Date: __________________</p>
          </div>
        </div>

        {/* Dynamic Content based on Selection */}
        <div className="space-y-8">
          
          {activeTemplate === 'audit' && (
            <>
              <p className="text-gray-600 italic mb-6">A comprehensive annual check of your home's main electrical infrastructure.</p>
              <ChecklistSection title="1. Main Electrical Panel">
                <CheckItem label="Panel door opens/closes smoothly and latches securely" />
                <CheckItem label="All breakers are clearly labeled (no 'Unknown' switches)" />
                <CheckItem label="No buzzing, crackling sounds, or burning smells" />
                <CheckItem label="No rust/corrosion visible on casing or bottom edge" />
                <CheckItem label="Panel is accessible (3ft clearance, no blockage)" />
              </ChecklistSection>
              <ChecklistSection title="2. Wall Outlets & Switches">
                <CheckItem label="Cover plates are intact (no cracks/missing screws)" />
                <CheckItem label="Plugs fit tightly into receptacles (no sagging)" />
                <CheckItem label="No discoloration/scorch marks around holes" />
                <CheckItem label="Switches operate smoothly (no flickering lights)" />
              </ChecklistSection>
              <ChecklistSection title="3. Safety Systems">
                 <CheckItem label="Smoke detectors present on every level & bedrooms" />
                 <CheckItem label="Smoke detectors tested (Audio test pass)" />
                 <CheckItem label="Carbon monoxide detectors active (if gas present)" />
                 <CheckItem label="Fire extinguisher accessible in Kitchen" />
              </ChecklistSection>
            </>
          )}

          {activeTemplate === 'fire' && (
             <>
              <p className="text-gray-600 italic mb-6">Focus on high-heat appliances and habits to prevent residential electrical fires.</p>
              <ChecklistSection title="High-Risk Appliances">
                <CheckItem label="Clothes Dryer: Lint trap cleaned after EVERY load" />
                <CheckItem label="Clothes Dryer: Vent hose not kinked or clogged" />
                <CheckItem label="Space Heater: Kept 3ft (1m) away from curtains/beds" />
                <CheckItem label="Space Heater: Plugged directly into wall (NO strips)" />
                <CheckItem label="Electric Blanket: Lying flat (not bunched/folded)" />
              </ChecklistSection>
              <ChecklistSection title="Kitchen Fire Safety">
                <CheckItem label="Toaster/Kettle unplugged when not in use" />
                <CheckItem label="No power cords dangling near stove burners" />
                <CheckItem label="Microwave vents are clear of obstruction" />
                <CheckItem label="Range hood filter cleaned of grease" />
              </ChecklistSection>
              <ChecklistSection title="General Prevention">
                <CheckItem label="No cords running under rugs, mats, or furniture" />
                <CheckItem label="No daisy-chained power strips (Strip plugged into strip)" />
                <CheckItem label="Extension cords feel cool to touch during use" />
              </ChecklistSection>
            </>
          )}

          {activeTemplate === 'gfci' && (
             <>
              <p className="text-gray-600 italic mb-6">Log your monthly safety device tests. Devices: GFCI (USA), RCD (UK/EU), ELCB (Old).</p>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-blue-900 mb-2">Instructions:</h4>
                <ol className="list-decimal pl-5 text-sm text-blue-800 space-y-1">
                  <li>Press the "TEST" or "T" button on the breaker or outlet.</li>
                  <li>Power should cut INSTANTLY (Snap sound).</li>
                  <li>Press "RESET" to restore power.</li>
                  <li>If it does not trip, or does not reset, <strong>replace immediately</strong>.</li>
                </ol>
              </div>

              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="p-3 border-r w-32">Date</th>
                      <th className="p-3 border-r">Device Location</th>
                      <th className="p-3 border-r w-32">Test Button Result</th>
                      <th className="p-3 w-32">Reset OK?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(12)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-200">
                         <td className="p-3 border-r h-12"></td>
                         <td className="p-3 border-r"></td>
                         <td className="p-3 border-r text-gray-400">Trip / Fail</td>
                         <td className="p-3 text-gray-400">Yes / No</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTemplate === 'room' && (
             <>
              <p className="text-gray-600 italic mb-6">Detailed inspection points for specific rooms. Perform this audit every 6 months.</p>
              
              <div className="grid grid-cols-1 print:grid-cols-2 gap-8">
                {/* Kitchen */}
                <div className="border border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
                  <div className="bg-gray-100 p-3 border-b border-gray-800 font-bold flex justify-between">
                    <span>KITCHEN Audit</span>
                    <span>Pass / Fail</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <CheckItem label="GFCI/RCD protection active on all countertop outlets" />
                    <CheckItem label="Outlets within 6ft of sink have waterproof covers" />
                    <CheckItem label="Fridge is on a dedicated circuit (if possible)" />
                    <CheckItem label="Appliance cords kept away from hot surfaces (Toaster/Stove)" />
                    <CheckItem label="Under-cabinet lighting wiring is concealed/secure" />
                  </div>
                </div>

                {/* Bathroom */}
                <div className="border border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
                  <div className="bg-gray-100 p-3 border-b border-gray-800 font-bold flex justify-between">
                    <span>BATHROOM Audit</span>
                    <span>Pass / Fail</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <CheckItem label="ALL outlets have active GFCI/RCD protection" />
                    <CheckItem label="Wall heaters/dryers free of rust/corrosion" />
                    <CheckItem label="Exhaust fan grill clean (no dust blocking airflow)" />
                    <CheckItem label="No appliances (Hairdryer/Razor) plugged in near water" />
                  </div>
                </div>

                {/* Living / Bedroom */}
                <div className="border border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
                  <div className="bg-gray-100 p-3 border-b border-gray-800 font-bold flex justify-between">
                    <span>LIVING & BEDROOM Audit</span>
                    <span>Pass / Fail</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <CheckItem label="Lamp cords not pinched behind heavy furniture" />
                    <CheckItem label="No power strips daisy-chained (one per outlet)" />
                    <CheckItem label="Wall outlets hold plugs firmly (no loose connections)" />
                    <CheckItem label="Electric blankets checked for frayed wires/burn marks" />
                    <CheckItem label="Smoke detector batteries fresh" />
                  </div>
                </div>

                {/* Home Office */}
                <div className="border border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
                  <div className="bg-gray-100 p-3 border-b border-gray-800 font-bold flex justify-between">
                    <span>HOME OFFICE Audit</span>
                    <span>Pass / Fail</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <CheckItem label="Computer equipment plugged into Surge Protectors" />
                    <CheckItem label="Cables organized (not a tripping hazard)" />
                    <CheckItem label="Air vents on PC/Monitors are clear of dust" />
                    <CheckItem label="No heaters plugged into UPS or Power Strips" />
                  </div>
                </div>

                {/* Garage / Outdoor */}
                <div className="border border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
                  <div className="bg-gray-100 p-3 border-b border-gray-800 font-bold flex justify-between">
                    <span>GARAGE & OUTDOOR Audit</span>
                    <span>Pass / Fail</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <CheckItem label="Outdoor outlets have weather-proof 'In-Use' covers" />
                    <CheckItem label="Extension cords rated for Outdoor Use (Heavy Duty)" />
                    <CheckItem label="Power tools inspected for cord damage" />
                    <CheckItem label="Electrical panel path is clear (no boxes blocking it)" />
                    <CheckItem label="Garden lighting cables buried or secured" />
                  </div>
                </div>

                {/* Balcony / Patio */}
                <div className="border border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
                  <div className="bg-gray-100 p-3 border-b border-gray-800 font-bold flex justify-between">
                    <span>BALCONY / PATIO Audit</span>
                    <span>Pass / Fail</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <CheckItem label="No indoor electronics used outside" />
                    <CheckItem label="Decorative lights rated for outdoor use" />
                    <CheckItem label="Outlet covers seal tightly" />
                    <CheckItem label="No standing water near electrical points" />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTemplate === 'label' && (
             <>
              <p className="text-gray-600 italic mb-6">Cut out these labels and tape them next to your breakers. Clear labeling saves lives in emergencies.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                 {['MAIN DISCONNECT', 'KITCHEN (General)', 'FRIDGE / FREEZER', 'LIGHTS (Upper)', 'LIGHTS (Lower)', 'LIVING ROOM', 'BEDROOM 1', 'BEDROOM 2', 'BATHROOM (GFI)', 'WATER HEATER', 'AC / HVAC', 'WASHER / DRYER', 'GARAGE', 'OUTDOOR', 'SPARE'].map(label => (
                   <div key={label} className="border-2 border-black p-4 rounded-lg bg-white font-bold text-lg uppercase flex items-center justify-center min-h-[80px]">
                     {label}
                   </div>
                 ))}
                 <div className="border-2 border-black p-4 rounded-lg bg-white border-dashed text-gray-400 flex items-center justify-center min-h-[80px]">
                   (Custom)
                 </div>
              </div>
            </>
          )}

          {activeTemplate === 'night' && (
             <>
              <p className="text-gray-600 italic mb-6">A quick routine before going to bed. Print and keep on your nightstand.</p>
              <ChecklistSection title="Pre-Sleep Routine">
                <CheckItem label="Space heaters turned OFF and unplugged" />
                <CheckItem label="Electric blankets turned OFF (unless timer set)" />
                <CheckItem label="Phone/Tablet chargers unplugged from bedside" />
                <CheckItem label="Dishwasher/Dryer cycles completed (Don't run while sleeping)" />
                <CheckItem label="Candles extinguished" />
                <CheckItem label="Security lights active" />
                <CheckItem label="Laptop charging brick not covered by blankets/pillows" />
              </ChecklistSection>
            </>
          )}

           {activeTemplate === 'log' && (
             <>
              <p className="text-gray-600 italic mb-6">Track the condition of your major appliances. Helps in warranty claims and fire prevention.</p>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="p-3 border-r">Appliance</th>
                      <th className="p-3 border-r w-24">Year Bought</th>
                      <th className="p-3 border-r">Plug/Cord Condition</th>
                      <th className="p-3 border-r">Noise/Heat Issues</th>
                      <th className="p-3">Next Clean/Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Refrigerator', 'Washing Machine', 'Clothes Dryer', 'Microwave', 'AC Unit 1', 'AC Unit 2', 'Water Heater', 'Dishwasher'].map((app, i) => (
                      <tr key={i} className="border-b border-gray-200">
                         <td className="p-3 border-r font-medium">{app}</td>
                         <td className="p-3 border-r"></td>
                         <td className="p-3 border-r"></td>
                         <td className="p-3 border-r"></td>
                         <td className="p-3"></td>
                      </tr>
                    ))}
                    <tr className="border-b border-gray-200">
                       <td className="p-3 border-r font-medium text-gray-400">(Other)</td>
                       <td className="p-3 border-r"></td>
                       <td className="p-3 border-r"></td>
                       <td className="p-3 border-r"></td>
                       <td className="p-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500 flex justify-between">
           <div>Inspector Signature: _______________________</div>
           <div>Date: _______________________</div>
        </div>
      </div>
    </div>
  );
};

const ChecklistSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <section className="mb-6 break-inside-avoid">
    <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-gray-800 uppercase tracking-wide">{title}</h3>
    <div className="grid grid-cols-1 gap-0 border-t border-gray-200">
      {children}
    </div>
  </section>
);

const CheckItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 py-3 border-b border-gray-100">
    <div className="w-6 h-6 border-2 border-gray-400 rounded flex-shrink-0 bg-white"></div>
    <span className="text-gray-800 text-sm font-medium">{label}</span>
  </div>
);
