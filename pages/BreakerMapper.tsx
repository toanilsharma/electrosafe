import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { Map, Printer, Plus, Trash2, ShieldCheck, Zap } from 'lucide-react';

interface Breaker {
  id: string;
  number: number;
  label: string;
  amps: number;
  type: 'Single' | 'Double (240V)';
}

export const BreakerMapper = () => {
  const [breakers, setBreakers] = useState<Breaker[]>([
    { id: 'b1', number: 1, label: 'Kitchen Refrigerator & Lights', amps: 20, type: 'Single' },
    { id: 'b2', number: 2, label: 'Living Room Outlets', amps: 15, type: 'Single' },
    { id: 'b3', number: 3, label: 'A/C Compressor (Outside)', amps: 40, type: 'Double (240V)' },
    { id: 'b4', number: 4, label: 'A/C Compressor (Outside)', amps: 40, type: 'Double (240V)' },
    { id: 'b5', number: 5, label: 'Master Bedroom AFCI', amps: 15, type: 'Single' },
  ]);

  const [isPrintMode, setIsPrintMode] = useState(false);

  const addBreaker = () => {
    const nextNumber = Math.max(...breakers.map(b => b.number), 0) + 1;
    setBreakers([...breakers, { 
      id: Math.random().toString(36).substring(7), 
      number: nextNumber, 
      label: 'New Circuit...', 
      amps: 15, 
      type: 'Single' 
    }]);
  };

  const updateBreaker = (id: string, field: keyof Breaker, value: any) => {
    setBreakers(breakers.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const removeBreaker = (id: string) => {
    setBreakers(breakers.filter(b => b.id !== id));
  };

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 100);
  };

  const handleDoubleCircuit = (id: string) => {
      const bIndex = breakers.findIndex(b => b.id === id);
      const b = breakers[bIndex];
      if (!b) return;

      if (b.type === 'Single') {
          // Change to double, add the linked breaker right after
          updateBreaker(id, 'type', 'Double (240V)');
          const newId = Math.random().toString(36).substring(7);
          const linkedBreaker: Breaker = {
             id: newId,
             number: b.number + 1,
             label: b.label + ' (Linked)',
             amps: b.amps,
             type: 'Double (240V)'
          };
          
          const newBreakers = [...breakers];
          newBreakers.splice(bIndex + 1, 0, linkedBreaker);
          setBreakers(newBreakers.map((bk, i) => ({...bk, number: i + 1}))); // renumber
      } else {
          // Change to single, remove linked (overly simplified logic for MVP)
          updateBreaker(id, 'type', 'Single');
      }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Visual Breaker Box Mapper | Print Electrical Panel Labels | ElectroSafe</title>
        <meta name="description" content="Map out your home's messy electrical panel. Generate beautiful, perfectly sized printable PDF label sheets to tape inside your breaker box door." />
        <link rel="canonical" href="https://electrosafe.homes/breaker-mapper" />
        {/* Force page styling for print mode */}
        <style>
          {`
            @media print {
              @page { margin: 0.5in; size: letter; }
              body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none !important; }
              .print-only { display: block !important; }
            }
          `}
        </style>
      </Helmet>

      {/* WEB UI (Hidden on Print) */}
      <div className="no-print">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-bold uppercase tracking-widest text-xs">
            <Map className="w-4 h-4" /> Organization Tool
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            Visual <span className="text-purple-600">Breaker Mapper</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-medium">
            Stop guessing which breaker turns off the kitchen. Map your circuits here and print a perfectly formatted label sheet to tape inside your panel door.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
               <div>
                 <h2 className="text-xl font-bold text-gray-900">Map Your Circuits</h2>
                 <p className="text-sm text-gray-500">Edit the labels below. Add breakers to match your real panel.</p>
               </div>
               <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700 hover:shadow-lg transition-all"
               >
                 <Printer className="w-5 h-5" /> Generate Printable Label
               </button>
            </div>

            <div className="space-y-3">
              {breakers.map((breaker, index) => (
                <div key={breaker.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-black text-gray-600 shrink-0 shadow-inner">
                    {breaker.number}
                  </div>
                  
                  <div className="flex-grow grid grid-cols-12 gap-3">
                     <div className="col-span-8">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Circuit Description</label>
                        <input 
                           type="text" 
                           value={breaker.label}
                           onChange={(e) => updateBreaker(breaker.id, 'label', e.target.value)}
                           className="w-full bg-white border border-gray-300 px-3 py-2 rounded-lg font-medium text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                     </div>
                     <div className="col-span-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Amps</label>
                        <select
                           value={breaker.amps}
                           onChange={(e) => updateBreaker(breaker.id, 'amps', Number(e.target.value))}
                           className="w-full bg-white border border-gray-300 px-3 py-2 rounded-lg font-medium text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        >
                           <option value={15}>15A</option>
                           <option value={20}>20A</option>
                           <option value={30}>30A</option>
                           <option value={40}>40A</option>
                           <option value={50}>50A</option>
                           <option value={60}>60A</option>
                           <option value={100}>100A (Main)</option>
                        </select>
                     </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                     <button
                        onClick={() => handleDoubleCircuit(breaker.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${breaker.type === 'Double (240V)' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-white text-gray-500 hover:bg-gray-100 border-gray-200'}`}
                        title="Toggle 240V Double Breaker"
                     >
                        {breaker.type === 'Double (240V)' ? '240V' : '120V'}
                     </button>
                     <button
                        onClick={() => removeBreaker(breaker.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete breaker"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              ))}
            </div>

            <button
               onClick={addBreaker}
               className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
               <Plus className="w-5 h-5" /> Add Breaker
            </button>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
           <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
           <p className="max-w-md mx-auto">Safety tip: If you don't know what a breaker controls, turn it off and walk around with a lamp to see what died. Update the label here immediately.</p>
        </div>
      </div>

      {/* PRINT UI (Hidden on Web) */}
      <div className="hidden print-only">
         <div className="mb-4 pb-2 border-b-2 border-black flex justify-between items-end">
            <div>
               <h1 className="text-2xl font-black font-sans uppercase">Electrical Panel Directory</h1>
               <p className="text-sm">Generated on {new Date().toLocaleDateString()} via ElectroSafe.homes</p>
            </div>
            <div className="text-right text-xs border border-black p-2 rounded">
               <strong>WARNING:</strong> Always verify power is off with a tester before performing work.
            </div>
         </div>

         {/* Grid Layout designed to be taped to the panel door */}
         <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-6">
            <div className="col-span-2 grid grid-cols-2 gap-x-8 mb-2 font-bold text-xs uppercase border-b border-gray-400 pb-1">
               <div className="flex px-2"><span className="w-8">#</span> <span className="flex-grow">Description</span> <span className="text-right">Amps</span></div>
               <div className="flex px-2"><span className="w-8">#</span> <span className="flex-grow">Description</span> <span className="text-right">Amps</span></div>
            </div>

            {/* Split logic for Left/Right columns simulating a real panel box */}
            {(() => {
                const rows = [];
                for(let i=0; i<breakers.length; i+=2) {
                    const left = breakers[i];
                    const right = breakers[i+1];
                    rows.push(
                        <React.Fragment key={i}>
                            <div className="flex border border-gray-300 p-2 items-center bg-gray-50 bg-opacity-50 !bg-white">
                                <span className="w-8 font-black text-gray-500">{left?.number || ''}</span>
                                <span className="flex-grow font-bold truncate pr-2">{left?.label || ''}</span>
                                <span className="text-xs font-mono font-bold">{left?.amps ? `${left.amps}A` : ''}</span>
                            </div>
                            <div className="flex border border-gray-300 p-2 items-center bg-gray-50 bg-opacity-50 !bg-white">
                                <span className="w-8 font-black text-gray-500">{right?.number || ''}</span>
                                <span className="flex-grow font-bold truncate pr-2">{right?.label || ''}</span>
                                <span className="text-xs font-mono font-bold">{right?.amps ? `${right.amps}A` : ''}</span>
                            </div>
                        </React.Fragment>
                    );
                }
                return rows;
            })()}
         </div>
         
         <div className="mt-12 text-center text-xs text-gray-500">
            --- Cut along the line and tape inside your metal breaker box door ---
            <div className="border-t border-dashed border-gray-400 mt-2"></div>
         </div>
      </div>
    </div>
  );
};
