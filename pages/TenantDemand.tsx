import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, ShieldAlert, ArrowRight, Gavel, FileWarning } from 'lucide-react';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <link rel="canonical" href="https://electrosafe.homes/tenant-demand" />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Gavel className="w-4 h-4 text-red-600" /> Tenant Protection
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          The Renters' <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Revenge</span> Generator
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Slumlords ignore texts. They don't ignore formal liability notices. Generate a legal-sounding "Notice of Electrical Hazard" to force your landlord to fix deadly code violations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 h-fit">
           <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
             <FileWarning className="w-6 h-6 text-red-500" /> Case Details
           </h2>

           <div className="space-y-5">
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
                 <input 
                   type="text" 
                   placeholder="Jane Doe"
                   value={tenantName}
                   onChange={(e) => setTenantName(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                 />
              </div>
              
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Landlord / Management Co. Name</label>
                 <input 
                   type="text" 
                   placeholder="123 Property Management LLC"
                   value={landlordName}
                   onChange={(e) => setLandlordName(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                 />
              </div>

              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Property Address</label>
                 <input 
                   type="text" 
                   placeholder="456 Danger Ave, Apt 4B"
                   value={propertyAddress}
                   onChange={(e) => setPropertyAddress(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                 />
              </div>

              <div className="pt-4 border-t border-slate-100">
                 <label className="block text-sm font-bold text-slate-700 mb-3">Select the Hazards Present:</label>
                 <div className="grid grid-cols-1 gap-2">
                    {COMMON_ISSUES.map(issue => (
                      <label key={issue} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedIssues.includes(issue) ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200 hover:border-red-200 hover:bg-slate-50'
                      }`}>
                         <input 
                           type="checkbox" 
                           checked={selectedIssues.includes(issue)}
                           onChange={() => toggleIssue(issue)}
                           className="mt-1 flex-shrink-0 w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                         />
                         <span className={`text-sm ${selectedIssues.includes(issue) ? 'font-bold text-red-900' : 'text-slate-700'}`}>{issue}</span>
                      </label>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Other Custom Hazard (Optional)</label>
                 <input 
                   type="text" 
                   placeholder="e.g. Breaker panel makes buzzing noise"
                   value={customIssue}
                   onChange={(e) => setCustomIssue(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                 />
              </div>

           </div>
        </div>

        {/* Live Preview Container */}
        <div className="flex flex-col">
           <div className="bg-slate-50 rounded-t-3xl border border-slate-200 p-4 border-b-0 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="font-bold text-slate-700">Document Preview</span>
              </div>
              <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
           </div>
           
           <div className="bg-white border border-slate-200 flex-1 shadow-inner relative">
              <div className="absolute top-0 left-0 w-8 h-full bg-red-50/50 border-r border-red-100 hidden sm:block"></div>
              <pre className="p-6 sm:pl-14 text-sm font-serif text-slate-800 whitespace-pre-wrap leading-relaxed">
                 {generateLetterContent()}
              </pre>
           </div>
           
           <div className="bg-slate-900 rounded-b-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-xs max-w-xs">
                * This document generates a plain-text template. It does not constitute legal advice. Review local tenant laws.
              </p>
              
              <button 
                onClick={downloadLetter}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-lg shadow-red-500/30 flex-shrink-0"
              >
                 <Download className="w-5 h-5" /> Download Notice
              </button>
           </div>
           
           <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
             <div className="flex gap-3">
               <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0" />
               <p className="text-sm text-amber-900">
                 <strong>Pro Tip:</strong> Send this via Certified Mail (USPS) with a Return Receipt. If a fire occurs after you send this, the landlord is massively liable. Just the threat of that liability usually forces immediate repair.
               </p>
             </div>
           </div>

        </div>

      </div>

    </div>
  );
};
