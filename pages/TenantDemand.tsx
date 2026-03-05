import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, ShieldAlert, ArrowRight, Gavel, FileWarning, ShieldCheck, Info, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMON_ISSUES = [
  "Sparking or warm outlets",
  "Flickering lights when appliances run",
  "Frequent tripped breakers",
  "Two-prong outlets used without grounding",
  "No GFCI outlets near water (kitchen/bath)",
  "Exposed wiring or missing junction box covers"
];

export const TenantDemand: React.FC = () => {
  const [tenantName, setTenantName] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [customIssue, setCustomIssue] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const generateLetterContent = () => {
    const allIssues = [...selectedIssues];
    if (customIssue) allIssues.push(customIssue);

    return `
NOTICE OF ELECTRICAL HAZARD AND DEMAND FOR REPAIR

Date: ${getTodayDate()}

To: ${landlordName || '[Landlord/Property Manager Name]'}
From: ${tenantName || '[Your Name]'}
Regarding Property at: ${propertyAddress || '[Property Address]'}

Dear ${landlordName || '[Landlord Name]'},

This letter serves as formal written notice regarding critical electrical hazards present at the property listed above. Under the implied warranty of habitability and state/local building codes, landlords are legally obligated to maintain electrical systems in a safe, working condition and free from fire hazards.

I am formally reporting the following unsafe electrical conditions:

${allIssues.length > 0 ? allIssues.map(i => `• ${i}`).join('\n') : '• [List specific electrical issues here]'}

These conditions pose a severe and immediate risk of electrical fire or shock. Electrical faults are a leading cause of residential fires, and these specific issues indicate a systemic failure that requires immediate evaluation by a licensed electrician.

DEMAND FOR ACTION:
I request that you arrange for a licensed, insured electrical contractor—not a general handyman—to inspect and repair these hazards within the time frame prescribed by law for urgent life-safety repairs (as governed by local tenant/landlord statutes).

If these critical safety hazards are not addressed promptly, I will be forced to report the code violations to the local housing authority and code enforcement office for inspection, and pursue further remedies available to me under tenant protection laws, including but not limited to rent withholding or lease termination, as permitted by jurisdiction.

Please contact me immediately to schedule the repairs. I expect a written response outlining your plan of action within 48 hours of receiving this notice.

Sincerely,

${tenantName || '[Your Printed Name]'}
Tenant
    `.trim();
  };

  const downloadLetter = () => {
    const content = generateLetterContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Notice_of_Electrical_Hazard_${getTodayDate().replace(/ |,/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>Renters' Revenge: Electrical Hazard Demand Letter | ElectroSafe.homes</title>
        <meta name="description" content="Landlord ignoring your sparking outlets? Generate a formal, legal-sounding Notice of Electrical Hazard to force them to fix dangerous code violations." />
      </Helmet>

      {/* Header */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Gavel className="w-4 h-4" /> Legal Enforcement
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter italic">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 underline">Demand</span> Generator
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Slumlords ignore texts. They don't ignore formal liability notices citing the Implied Warranty of Habitability. Generate your legal-weighted notice now.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 dark:text-gray-100 mb-8 flex items-center gap-3">
                <FileWarning className="w-6 h-6 text-rose-500" /> Case Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notice Date</label>
                  <p className="text-lg font-black text-slate-800 dark:text-gray-200">{getTodayDate()}</p>
                </div>

                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Tenant Full Name"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-500 outline-none font-bold"
                  />
                  <input 
                    type="text" 
                    placeholder="Landlord / Management Name"
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-500 outline-none font-bold"
                  />
                  <input 
                    type="text" 
                    placeholder="Full Property Address"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-500 outline-none font-bold"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-gray-700">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Evidence & Hazard Checklist</label>
                  <div className="grid grid-cols-1 gap-2 mx-1">
                    {COMMON_ISSUES.map(issue => (
                      <label key={issue} onClick={() => toggleIssue(issue)} 
                        className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedIssues.includes(issue) ? 'bg-rose-50 border-rose-500 shadow-sm' : 'bg-white dark:bg-gray-900 border-slate-50 dark:border-gray-800 hover:border-rose-200'
                      }`}>
                         <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-colors ${selectedIssues.includes(issue) ? 'bg-rose-500 border-rose-500' : 'border-slate-200'}`}>
                            {selectedIssues.includes(issue) && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
                         </div>
                         <span className={`text-sm font-bold ${selectedIssues.includes(issue) ? 'text-rose-900' : 'text-slate-600 dark:text-gray-300'}`}>{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Custom Evidence Entry</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Breaker makes arcing noises at night"
                    value={customIssue}
                    onChange={(e) => setCustomIssue(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-500 outline-none font-bold"
                  />
                </div>
              </div>
           </div>
        </div>

        {/* Right: Document Preview */}
        <div className="lg:col-span-7 flex flex-col h-full gap-6">
           <div className="bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full border border-slate-800">
              <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-white/5">
                 <h2 className="text-white font-black text-lg flex items-center gap-3 italic">
                    <FileText className="w-6 h-6 text-rose-500" /> Formal Notice Preview
                 </h2>
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-900/50" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                 </div>
              </div>
              
              <div className="p-10 flex-grow relative">
                 <div className="absolute top-0 left-0 w-12 h-full bg-white/5 border-r border-white/5 transition-opacity" />
                 <pre className="relative z-10 w-full h-[600px] bg-transparent text-slate-300 font-serif text-sm leading-relaxed border-0 focus:ring-0 resize-none custom-scrollbar whitespace-pre-wrap">
                    {generateLetterContent()}
                 </pre>
              </div>

              <div className="p-10 bg-white/5 border-t border-white/5 text-center">
                 <button 
                    onClick={downloadLetter}
                    className="w-full py-5 bg-rose-600 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/50 flex items-center justify-center gap-4 active:scale-95"
                 >
                    <Download className="w-6 h-6" /> Export Formal Demand (.txt)
                 </button>
              </div>
           </div>

           {/* Legal Weight Footer */}
           <div className="bg-slate-50 dark:bg-gray-800/50 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-rose-600 shrink-0">
                 <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="flex-1">
                 <h3 className="font-black text-slate-900 dark:text-gray-100 mb-2 italic">Why Formal Notices Matter</h3>
                 <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                    Under the <strong className="font-black text-rose-600">Implied Warranty of Habitability</strong>, a landlord's failure to address "life-safety" hazards (like sparking wires) creates immediate legal liability. By sending this via Certified Mail, you establish a chain of custody that makes it nearly impossible for insurance or courts to side with the landlord in the event of a fire.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Transparency CTA */}
      <div className="mt-16 bg-slate-900 rounded-[40px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 italic tracking-tighter uppercase">Transparent Vetting Logic</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto font-medium">
          The structure of this notice aligns with <strong className="text-white">Housing Court standards</strong> and <strong className="text-white">Landlord-Tenant Statutes</strong> found in most major jurisdictions. It prioritizes "Life Safety" language to maximize urgency.
        </p>
        <Link to="/tools" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-xl text-sm uppercase tracking-widest">
          Explore More Tools <ArrowRight className="w-5 h-5 text-red-600" />
        </Link>
      </div>
    </div>
  );
};
