import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Bell, AlertTriangle, ShieldAlert, ArrowRight, Download, Search, Zap, Calculator, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RECALLED_PRODUCTS = [
  { id: 1, brand: 'Kidde', type: 'Smoke/Carbon Monoxide Alarm', issue: 'Alarm can fail to alert consumers to a fire or CO incident.', year: '2021', model: 'TruSense Series' },
  { id: 2, brand: 'Schneider Electric', type: 'Electrical Panel', issue: 'Overheating leading to thermal burn and fire hazards.', year: '2022', model: 'Square D QO Plug-on Neutral' },
  { id: 3, brand: 'Eaton', type: 'Circuit Breaker', issue: 'Breaker can misfire and fail to trip during an overload.', year: '2020', model: 'BR Series 15A & 20A' },
  { id: 4, brand: 'Dehumidifiers', type: 'Various Brands (Midea, GE, etc.)', issue: 'Units can overheat, smoke, and catch fire.', year: '2021', model: 'Over 2 million units' },
  { id: 5, brand: 'Generac', type: 'Portable Generator', issue: 'Fingers can get amputated by the folding handle.', year: '2022', model: '6500W & 8000W' },
];

export const AlarmCalendar: React.FC = () => {
  const [installDate, setInstallDate] = useState<string>('');
  const [alarmType, setAlarmType] = useState<string>('smoke'); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const getExpirationDetails = () => {
    if (!installDate) return null;
    const start = new Date(installDate);
    const yearsToLive = alarmType === 'smoke' ? 10 : 7;
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + yearsToLive);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isExpired = diffDays <= 0;
    return { expirationDate: end.toLocaleDateString(), isExpired, daysLeft: isExpired ? 0 : diffDays, yearsToLive, endObj: end };
  };

  const generateICS = (endObj: Date, typeStr: string) => {
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    const start = formatDate(endObj);
    const end = new Date(endObj.getTime() + 60 * 60 * 1000);
    const endFormated = formatDate(end);
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ElectroSafe.homes//Alarm Calendar//EN\nBEGIN:VEVENT\nUID:${new Date().getTime()}@electrosafe.homes\nDTSTAMP:${formatDate(new Date())}\nDTSTART:${start}\nDTEND:${endFormated}\nSUMMARY:CRITICAL: Replace ${typeStr} Alarm\nDESCRIPTION:Your ${typeStr} alarm has reached its manufacturer end-of-life. (Generated via ElectroSafe.homes)\nBEGIN:VALARM\nTRIGGER:-PT24H\nACTION:DISPLAY\nDESCRIPTION:Reminder: Replace ${typeStr} Alarm tomorrow!\nEND:VALARM\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `replace_${alarmType}_alarm.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const details = getExpirationDetails();
  const filteredRecalls = RECALLED_PRODUCTS.filter(p => 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>Recall Radar & Smoke Alarm Calendar | ElectroSafe.homes</title>
        <meta name="description" content="Generate a 10-year calendar reminder for your smoke alarms and check our database for dangerous, recalled electrical panels and products." />
      </Helmet>

      {/* Header */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Bell className="w-4 h-4" /> Component EOL Audit
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter italic">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600 underline">Alarm Lifespan</span> Tracker
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Sensors chemically degrade at a predictable rate. Track your home's "Silent Sentinels" using manufacturer decay standards and NFPA safety codes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left: Tracker */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 dark:text-gray-100 mb-8 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-rose-500" /> Sensor Audit
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Alarm Technology</label>
                  <div className="grid grid-cols-2 gap-4 p-1 bg-slate-50 dark:bg-gray-800 rounded-2xl border-2 border-slate-100 dark:border-gray-700">
                    <button 
                      onClick={() => setAlarmType('smoke')}
                      className={`py-3 rounded-xl text-xs font-black transition-all ${alarmType === 'smoke' ? 'bg-white dark:bg-gray-700 text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Smoke (10 Yr)
                    </button>
                    <button 
                      onClick={() => setAlarmType('co')}
                      className={`py-3 rounded-xl text-xs font-black transition-all ${alarmType === 'co' ? 'bg-white dark:bg-gray-700 text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      CO (7 Yr)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Manufacture Date (From Sticker)</label>
                  <input 
                    type="date"
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-rose-500 outline-none font-bold"
                    value={installDate}
                    onChange={(e) => setInstallDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <div className="mt-3 flex gap-2 items-start text-[10px] text-slate-400 font-bold uppercase tracking-tight italic">
                     <Info className="w-3.5 h-3.5 shrink-0" /> Date is usually printed on the back plate. Unmount to verify.
                  </div>
                </div>
              </div>
           </div>

           {/* Math Panel */}
           <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
              <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                 <Calculator className="w-6 h-6 text-rose-400" /> Decay Logic
              </h3>
              <div className="space-y-4">
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Chemical Half-Life Audit</p>
                    <p className="text-sm font-medium leading-relaxed leading-relaxed font-mono">
                      t_expiry = t_mfg + (Δy × 365.25)
                    </p>
                 </div>
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                       Ionization and photoelectric chambers degrade due to humidity and particulate accumulation. 10 years is the <strong className="text-white underline">absolute failure horizon</strong> per UL 217.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Status Output */}
        <div className="lg:col-span-7">
           <AnimatePresence mode="wait">
              {details ? (
                 <motion.div 
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-[40px] p-10 shadow-2xl overflow-hidden relative border-4 ${
                       details.isExpired ? 'bg-red-950 border-red-500' : 'bg-slate-900 border-white/5'
                    }`}
                 >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    
                    <div className="relative z-10 text-center">
                       {details.isExpired ? (
                          <>
                             <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-500/50">
                                <ShieldAlert className="w-12 h-12 text-white animate-pulse" />
                             </div>
                             <h3 className="text-5xl font-black text-white mb-4 tracking-tighter italic">LIFESPAN EXHAUSTED</h3>
                             <p className="text-red-300 text-lg font-bold mb-8">
                                This sensor expired on <span className="underline decoration-red-500 decoration-4 underline-offset-4">{details.expirationDate}</span>. No longer life-safe.
                             </p>
                          </>
                       ) : (
                          <>
                             <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/50">
                                <ShieldCheck className="w-12 h-12 text-white" />
                             </div>
                             <div className="text-7xl font-black text-white mb-2 tracking-tighter">{details.daysLeft}</div>
                             <p className="text-emerald-400 font-black uppercase tracking-[0.2em] text-xs mb-8">Days of Reliable Detection Remaining</p>
                             <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-8">
                                <p className="text-slate-300 font-medium">EOL Date: <strong className="text-white">{details.expirationDate}</strong></p>
                             </div>
                          </>
                       )}

                       {!details.isExpired && (
                          <button 
                             onClick={() => generateICS(details.endObj, alarmType.toUpperCase())}
                             className="w-full py-5 bg-rose-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/50 flex items-center justify-center gap-3"
                          >
                             <Download className="w-5 h-5" /> Sync To Calendar
                          </button>
                       )}
                    </div>
                 </motion.div>
              ) : (
                 <div className="h-full min-h-[500px] bg-slate-100 dark:bg-gray-800/50 rounded-[40px] border-4 border-dashed border-slate-200 dark:border-gray-800 flex flex-center items-center justify-center p-12 italic text-slate-400 font-bold text-center">
                    Enter Manufacture Date to Begin Lifespan Audit
                 </div>
              )}
           </AnimatePresence>
        </div>
      </div>

      {/* Recall Radar */}
      <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-gray-800">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
               <h2 className="text-3xl font-black text-slate-900 dark:text-gray-100 italic tracking-tighter">The Recall Radar</h2>
               <p className="text-slate-500 dark:text-gray-400 font-medium mt-2">Database of documented catastrophic electrical component failures.</p>
            </div>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
               <input 
                 type="text"
                 placeholder="Search Brand (Kidde, Eaton...)"
                 className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl outline-none font-bold focus:border-rose-300"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecalls.map(item => (
               <div key={item.id} className="bg-slate-50 dark:bg-gray-800/50 rounded-3xl p-6 border border-transparent hover:border-red-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h4 className="font-black text-slate-900 dark:text-gray-100">{item.brand}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.model}</p>
                     </div>
                     <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-lg">RECALLED</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">{item.issue}</p>
                  <div className="pt-4 border-t border-slate-200 dark:border-gray-700 flex justify-between items-center text-[10px] font-black text-slate-400">
                     <span>{item.type}</span>
                     <span>{item.year}</span>
                  </div>
               </div>
            ))}
         </div>
         <div className="mt-12 text-center">
            <a href="https://www.cpsc.gov/Recalls" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-700 border-b-2 border-transparent hover:border-blue-600 pb-1">
               Official Government CPSC Database <ArrowRight className="w-4 h-4" />
            </a>
         </div>
      </div>
    </div>
  );
};
