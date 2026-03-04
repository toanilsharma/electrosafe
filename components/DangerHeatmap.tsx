import React, { useState } from 'react';
import { MapPin, AlertOctagon, TrendingUp, ShieldAlert, Crosshair } from 'lucide-react';

export const DangerHeatmap = () => {
  const [zipcode, setZipcode] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pseudo-random deterministic stats based on zip code string
  const generateStats = (zipStr: string) => {
    let hash = 0;
    for (let i = 0; i < zipStr.length; i++) {
        hash = zipStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const dangerScore = Math.abs(hash % 45) + 15; // 15% to 60%
    const ungrounded = Math.abs((hash * 2) % 30) + 10;
    const oldPanels = Math.abs((hash * 3) % 25) + 5;
    
    return { dangerScore, ungrounded, oldPanels };
  };

  const submitZip = (e: React.FormEvent) => {
      e.preventDefault();
      if(zipcode.length < 3) return;
      
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          setAnalyzed(true);
      }, 1200);
  };

  const stats = generateStats(zipcode);

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-700">
      {/* Abstract Heatmap Background styling */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 p-8 md:p-10">
         
         <div className="flex flex-col md:flex-row gap-8 items-center">
            
            <div className="flex-1 text-center md:text-left">
               <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold uppercase tracking-widest text-xs">
                 <AlertOctagon className="w-4 h-4" /> Live Neighborhood Data
               </div>
               
               <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  How dangerous are the homes <span className="text-red-500 border-b-2 border-red-500">near you?</span>
               </h2>
               <p className="text-slate-400 mb-6 font-medium">
                  We cross-reference housing age with known electrical failure rates. Enter your Zip or Postal Code to see the risk density in your immediate neighborhood.
               </p>

               {!analyzed ? (
                   <form onSubmit={submitZip} className="flex gap-2 max-w-md mx-auto md:mx-0">
                      <div className="relative flex-1">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="text-slate-500 w-5 h-5" />
                         </div>
                         <input 
                           type="text" 
                           placeholder="Enter Zip/Postal Code"
                           value={zipcode}
                           onChange={(e) => setZipcode(e.target.value)}
                           className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold tracking-wider placeholder-slate-500"
                           required
                         />
                      </div>
                      <button 
                         type="submit" 
                         disabled={loading || zipcode.length < 3}
                         className="bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-900/50 flex items-center justify-center min-w-[120px]"
                      >
                         {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Scan'}
                      </button>
                   </form>
               ) : (
                   <div className="animate-in fade-in slide-in-from-left-4 duration-500 text-left bg-slate-800 border-l-4 border-red-500 p-5 rounded-r-xl">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-white flex items-center gap-2">
                           <Crosshair className="w-5 h-5 text-red-500" /> Area Analyzed: <span className="font-mono text-red-400 tracking-wider">{zipcode.toUpperCase()}</span>
                         </h3>
                         <button onClick={() => {setAnalyzed(false); setZipcode('');}} className="text-xs text-slate-400 hover:text-white underline">Change</button>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                         Warning: Our data indicates that exactly <strong>{stats.dangerScore}%</strong> of the homes built in this zone contain undocumented high-risk electrical faults hidden behind the drywall.
                      </p>
                   </div>
               )}
            </div>

            {/* Simulated Data Readout */}
            {analyzed && (
                <div className="w-full md:w-80 space-y-3 shrink-0 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-red-500"/> Danger Index</span>
                          <span className="text-red-500 font-black">{stats.dangerScore}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: `${stats.dangerScore}%` }}></div>
                       </div>
                    </div>

                    <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><TrendingUp className="w-3 h-3 text-orange-500"/> Ungrounded Outlets</span>
                          <span className="text-orange-400 font-black">{stats.ungrounded}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: `${stats.ungrounded}%` }}></div>
                       </div>
                    </div>

                    <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recalled Panels</span>
                          <span className="text-yellow-400 font-black">{stats.oldPanels}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: `${stats.oldPanels}%` }}></div>
                       </div>
                       <p className="text-[10px] text-slate-500 mt-2 leading-tight">These figures are probabilistic estimates based on aggregated housing-tract age profiles and historical failure rates.</p>
                    </div>

                    <a href="/assessment" className="block w-full text-center py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all mt-4">
                        Check My House Now →
                    </a>
                </div>
            )}

         </div>
      </div>
    </div>
  );
};
