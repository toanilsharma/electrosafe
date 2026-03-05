import React, { useState, useEffect } from 'react';
import { TENANT_ISSUES } from '../data';
import { Copy, CheckCircle, MessageSquare, AlertTriangle, Send, Printer, Gavel, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RelatedTools } from '../components/RelatedTools';
import { motion, AnimatePresence } from 'framer-motion';

export const ToolTenantRequest = () => {
  const navigate = useNavigate();
  const [selectedIssueId, setSelectedIssueId] = useState(() => localStorage.getItem('tenant_issue') || TENANT_ISSUES[0].id);
  const [location, setLocation] = useState(() => localStorage.getItem('tenant_location') || '');
  const [recipient, setRecipient] = useState(() => localStorage.getItem('tenant_recipient') || 'Landlord');
  const [copied, setCopied] = useState(false);

  // Auto-save form state
  useEffect(() => { localStorage.setItem('tenant_issue', selectedIssueId); }, [selectedIssueId]);
  useEffect(() => { localStorage.setItem('tenant_location', location); }, [location]);
  useEffect(() => { localStorage.setItem('tenant_recipient', recipient); }, [recipient]);

  const selectedIssue = TENANT_ISSUES.find(i => i.id === selectedIssueId) || TENANT_ISSUES[0];

  const generateMessage = () => {
    return `Hello,

I am writing to formally report an electrical safety hazard in ${location || '[Room Name]'}.

I have observed: ${selectedIssue.label}.

This is technically classified as "${selectedIssue.technicalTerm}". Per electrical safety standards, this poses a ${selectedIssue.riskDescription.toLowerCase()}

Given the urgency (${selectedIssue.urgency}), please arrange for a certified electrician to inspect and rectify this immediately. Retaining this hazard may violate local habitability laws and increases fire/shock liability.

Thank you,
[Your Name]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Gavel className="w-4 h-4" /> Rights Advocate
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter italic">
          Tenant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Request Architect</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Generate professional, legally-weighted requests to your landlord. Use technical terminology to ensure your safety concerns are taken seriously.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Side */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 dark:text-gray-100 mb-8 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-indigo-600" /> Hazard Details
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hazard Type</label>
                  <div className="relative">
                    <select
                      className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold appearance-none transition-all"
                      value={selectedIssueId}
                      onChange={(e) => setSelectedIssueId(e.target.value)}
                    >
                      {TENANT_ISSUES.map(issue => (
                        <option key={issue.id} value={issue.id}>
                          {issue.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                       <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Location in Property</label>
                  <input
                    type="text"
                    placeholder="e.g. Kitchen outlet near sink"
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recipient</label>
                  <div className="flex gap-4 p-1 bg-slate-50 dark:bg-gray-800 rounded-2xl border-2 border-slate-100 dark:border-gray-700">
                    <button
                      onClick={() => setRecipient('Landlord')}
                      className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${recipient === 'Landlord' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Landlord
                    </button>
                    <button
                       onClick={() => setRecipient('Warden')}
                       className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${recipient === 'Warden' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Hostel Warden
                    </button>
                  </div>
                </div>
              </div>
           </div>

           {/* Technical Intelligence Panel */}
           <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                 <ShieldCheck className="w-6 h-6 text-blue-200" /> Technical Insight
              </h3>
              <div className="space-y-4">
                 <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Observation</p>
                    <p className="text-sm font-bold">{selectedIssue.label}</p>
                 </div>
                 <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Root Cause Mechanism</p>
                    <p className="text-sm font-bold">{selectedIssue.technicalTerm}</p>
                 </div>
                 <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Standard Violation Risk</p>
                    <p className="text-sm font-bold italic">{selectedIssue.riskDescription}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Output Side */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full border border-slate-800">
              <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-white/5">
                 <h2 className="text-white font-black text-lg flex items-center gap-3 italic">
                    <MessageSquare className="w-6 h-6 text-blue-500" /> Official Request
                 </h2>
                 <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    selectedIssue.urgency === 'Emergency' ? 'bg-red-500 text-white' : 
                    selectedIssue.urgency === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                 }`}>
                    Priority: {selectedIssue.urgency}
                 </div>
              </div>
              
              <div className="p-8 flex-grow">
                 <textarea
                    readOnly
                    className="w-full h-[400px] bg-transparent text-slate-300 font-mono text-sm leading-relaxed border-0 focus:ring-0 resize-none custom-scrollbar"
                    value={generateMessage()}
                 />
              </div>

              <div className="p-8 bg-white/5 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
                 <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all transform active:scale-95 ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                    }`}
                 >
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied' : 'Copy Text'}
                 </button>
                 <a
                    href={`mailto:?subject=Urgent%3A%20Electrical%20Safety%20Issue%20in%20${encodeURIComponent(location || 'Property')}&cc=&body=${encodeURIComponent(generateMessage())}`}
                    className="flex items-center justify-center gap-2 py-4 bg-slate-800 text-slate-300 rounded-2xl font-black text-sm hover:bg-slate-700 transition shadow-lg border border-slate-700"
                 >
                    <Send className="w-4 h-4" /> Email Gen
                 </a>
                 <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-50 transition shadow-lg"
                 >
                    <Printer className="w-4 h-4" /> Print / PDF
                 </button>
              </div>
           </div>

           {/* Legal Context Footer */}
           <div className="bg-slate-50 dark:bg-gray-800/50 p-8 rounded-[32px] border border-slate-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-blue-600 shrink-0">
                 <Info className="w-8 h-8" />
              </div>
              <div className="flex-1">
                 <h3 className="font-black text-slate-900 dark:text-gray-100 mb-2 italic">Why Professional Terminology Matters</h3>
                 <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                    By citing technical mechanisms like <strong className="font-bold text-blue-600">Arc Faults</strong> or <strong className="font-bold text-blue-600">Ground Faults</strong>, you transition the report from a subjective complaint to a documented code violation. This increases the landlord's duty of care and legally protects your habitability rights.
                 </p>
              </div>
              <button 
                 onClick={() => navigate('/tenant-demand')}
                 className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-xl text-sm italic group shrink-0"
              >
                 Legal Notice Builder <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      <RelatedTools currentPath="/tenant-request" count={3} />
    </div>
  );
};