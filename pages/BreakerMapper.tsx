import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { Map, Printer, Plus, Trash2, ShieldCheck, Zap, Calculator, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          setBreakers(newBreakers.map((bk, i) => ({...bk, number: i + 1}))); 
      } else {
          updateBreaker(id, 'type', 'Single');
      }
  };

  const totalLoadCapacity = breakers.reduce((s, b) => s + b.amps, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>Visual Breaker Box Mapper | Print Electrical Panel Labels | ElectroSafe</title>
        <meta name="description" content="Map out your home's messy electrical panel. Generate beautiful, perfectly sized printable PDF label sheets to tape inside your breaker box door." />
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

      {/* WEB UI */}
      <div className="no-print">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Map className="w-4 h-4" /> System Organization
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter italic">
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Panel Mapper</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Stop guessing which breaker controls which room. Map your panel here and print a professional directory for your service door.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           
           {/* Left: Editor */}
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 shadow-xl overflow-hidden relative">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                       <h2 className="text-xl font-black text-slate-900 dark:text-gray-100">Circuit Directory</h2>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Total Panel Sum: {totalLoadCapacity}A</p>
                    </div>
                    <button
                       onClick={handlePrint}
                       className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg active:scale-95"
                    >
                       <Printer className="w-4 h-4" /> PRINT LABEL
                    </button>
                 </div>

                 <div className="space-y-3">
                    {breakers.map((breaker, index) => (
                       <motion.div 
                          key={breaker.id} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-4 items-center bg-slate-50 dark:bg-gray-800 p-4 rounded-2xl border-2 border-transparent hover:border-purple-200 transition-all group"
                       >
                          <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center font-black text-slate-400 shadow-sm border border-slate-100 dark:border-gray-700">
                             {breaker.number}
                          </div>
                          
                          <div className="flex-grow grid grid-cols-12 gap-4">
                             <div className="col-span-8 md:col-span-9">
                                <input 
                                   type="text" 
                                   value={breaker.label}
                                   onChange={(e) => updateBreaker(breaker.id, 'label', e.target.value)}
                                   className="w-full bg-transparent border-b-2 border-slate-200 dark:border-gray-700 px-1 py-1 font-bold text-slate-800 dark:text-gray-200 focus:border-purple-500 outline-none transition-all"
                                   placeholder="Description..."
                                />
                             </div>
                             <div className="col-span-4 md:col-span-3">
                                <select
                                   value={breaker.amps}
                                   onChange={(e) => updateBreaker(breaker.id, 'amps', Number(e.target.value))}
                                   className="w-full bg-transparent border-b-2 border-slate-200 dark:border-gray-700 px-1 py-1 font-black text-slate-500 focus:border-purple-500 outline-none cursor-pointer"
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

                          <div className="flex items-center gap-2">
                             <button
                                onClick={() => handleDoubleCircuit(breaker.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black border-2 transition-all ${breaker.type === 'Double (240V)' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'text-slate-400 border-slate-200 hover:border-purple-200'}`}
                             >
                                {breaker.type === 'Double (240V)' ? '240V' : '120V'}
                             </button>
                             <button
                                onClick={() => removeBreaker(breaker.id)}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                             >
                                <Trash2 className="w-5 h-5" />
                             </button>
                          </div>
                       </motion.div>
                    ))}
                 </div>

                 <button
                    onClick={addBreaker}
                    className="mt-6 w-full py-4 border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-[20px] text-slate-400 font-black text-xs hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                 >
                    <Plus className="w-4 h-4" /> Expand Panel
                 </button>
              </div>
           </div>

           {/* Right: Technical Notes */}
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
                 <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-purple-400" /> Vetting Logic
                 </h3>
                 <div className="space-y-4">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Calculator className="w-3 h-3" /> Panel Calculation
                       </h4>
                       <p className="text-sm font-medium leading-relaxed">
                          Your total branch amperage ({totalLoadCapacity}A) naturally exceeds your main breaker capacity. This is normal "diversity" factor per NEC Article 220.
                       </p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Info className="w-3 h-3" /> Standard Applied
                       </h4>
                       <p className="text-sm font-medium leading-relaxed">
                          Labels designed to comply with NFPA 70 Section 408.4 (Circuit Directory Requirement).
                       </p>
                    </div>
                 </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[32px] border-2 border-indigo-100 dark:border-indigo-800">
                 <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Pro Tip
                 </h4>
                 <p className="text-sm text-indigo-800 dark:text-indigo-300 font-medium leading-relaxed italic">
                    "If you don't know what a breaker controls, turn it off and see which lights went out. Map it immediately while you're in 'debugging' mode!"
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* PRINT UI (Hidden on Web) */}
      <div className="hidden print-only">
         <div className="mb-4 pb-4 border-b-4 border-black flex justify-between items-end">
            <div>
               <h1 className="text-3xl font-black font-sans uppercase tracking-tighter">Electrical Panel Directory</h1>
               <p className="text-sm font-bold">Verified on {new Date().toLocaleDateString()} — ElectroSafe Visual Mapper</p>
            </div>
            <div className="text-right text-[10px] border-2 border-black p-3 font-black uppercase leading-tight max-w-[250px]">
               CAUTION: TURN OFF MAIN BEFORE WORK. VERIFY WITH TESTER.
            </div>
         </div>

         <div className="grid grid-cols-2 gap-x-12 mt-8">
            <div className="col-span-1 border-b-2 border-black pb-2 mb-2 flex font-black text-xs uppercase">
               <span className="w-10">POS</span>
               <span className="flex-grow">CIRCUIT DESCRIPTION</span>
               <span className="w-12 text-right">AMPS</span>
            </div>
            <div className="col-span-1 border-b-2 border-black pb-2 mb-2 flex font-black text-xs uppercase">
               <span className="w-10">POS</span>
               <span className="flex-grow">CIRCUIT DESCRIPTION</span>
               <span className="w-12 text-right">AMPS</span>
            </div>

            {(() => {
                const rows = [];
                for(let i=0; i<breakers.length; i+=2) {
                    const l = breakers[i];
                    const r = breakers[i+1];
                    rows.push(
                        <React.Fragment key={i}>
                            <div className="flex border-b border-slate-300 py-3 items-center font-bold text-sm">
                                <span className="w-10 text-slate-400">#{l?.number || i+1}</span>
                                <span className="flex-grow truncate">{l?.label.toUpperCase() || '---'}</span>
                                <span className="w-12 text-right font-black">{l?.amps || '--'}A</span>
                            </div>
                            <div className="flex border-b border-slate-300 py-3 items-center font-bold text-sm">
                                <span className="w-10 text-slate-400">#{r?.number || i+2}</span>
                                <span className="flex-grow truncate">{r?.label.toUpperCase() || '---'}</span>
                                <span className="w-12 text-right font-black">{r?.amps || '--'}A</span>
                            </div>
                        </React.Fragment>
                    );
                }
                return rows;
            })()}
         </div>
         
         <div className="mt-20 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            --- CUT & TAPE TO SERVICE DOOR PANEL ---
         </div>
      </div>
    </div>
  );
};
