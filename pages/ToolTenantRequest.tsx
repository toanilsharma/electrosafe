import React, { useState } from 'react';
import { TENANT_ISSUES } from '../data';
import { Copy, CheckCircle, MessageSquare, AlertTriangle, Send } from 'lucide-react';

export const ToolTenantRequest = () => {
  const [selectedIssueId, setSelectedIssueId] = useState(TENANT_ISSUES[0].id);
  const [location, setLocation] = useState('');
  const [recipient, setRecipient] = useState('Landlord'); // Landlord or Warden
  const [copied, setCopied] = useState(false);

  const selectedIssue = TENANT_ISSUES.find(i => i.id === selectedIssueId) || TENANT_ISSUES[0];

  const generateMessage = () => {
    return `Hello,

I am writing to report an electrical safety hazard in ${location || '[Room Name]'}.

I have observed: ${selectedIssue.label}.

This appears to be a "${selectedIssue.technicalTerm}" which poses a ${selectedIssue.riskDescription.toLowerCase()}

Given the urgency (${selectedIssue.urgency}), please arrange for a certified electrician to inspect this as soon as possible to prevent potential fire or injury.

Thank you,
[Your Name]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Tenant & Student Request Generator</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Found a hazard but don't know how to explain it? Use this tool to generate a professional, safety-focused message to send to your Landlord or Warden.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Side */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" /> Describe the Problem
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What is the issue?</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
                value={selectedIssueId}
                onChange={(e) => setSelectedIssueId(e.target.value)}
              >
                {TENANT_ISSUES.map(issue => (
                  <option key={issue.id} value={issue.id}>
                    {issue.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                <strong>Technical Term:</strong> {selectedIssue.technicalTerm}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Where is it located?</label>
              <input
                type="text"
                placeholder="e.g. Master Bedroom, Kitchen Sink, Room 304"
                className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Who are you sending this to?</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setRecipient('Landlord')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium border ${recipient === 'Landlord' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-600'}`}
                >
                  Landlord
                </button>
                <button
                   onClick={() => setRecipient('Warden')}
                   className={`flex-1 py-2 rounded-md text-sm font-medium border ${recipient === 'Warden' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-600'}`}
                >
                  Hostel Warden
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div className="flex flex-col h-full">
          <div className="bg-gray-900 text-white p-6 rounded-t-xl flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Generated Request
            </h2>
            <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
              selectedIssue.urgency === 'Emergency' ? 'bg-red-500 text-white' : 
              selectedIssue.urgency === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              Urgency: {selectedIssue.urgency}
            </span>
          </div>
          <div className="bg-gray-100 p-6 flex-grow border-x border-gray-200">
            <textarea
              readOnly
              className="w-full h-64 p-4 rounded-lg text-gray-800 font-mono text-sm border-0 focus:ring-0 resize-none bg-white shadow-inner"
              value={generateMessage()}
            />
          </div>
          <div className="bg-white p-6 rounded-b-xl border-x border-b border-gray-200 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? <><CheckCircle className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy Text</>}
            </button>
             <a
              href={`mailto:?subject=Urgent: Electrical Safety Issue in ${location || 'Property'}&body=${encodeURIComponent(generateMessage())}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-bold border border-gray-300"
            >
              <Send className="w-4 h-4" /> Open Email
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2">Why use this tool?</h3>
        <p className="text-sm text-blue-800">
          Landlords and Wardens are legally responsible for electrical safety in most countries. By using specific technical terms (like "Arcing" or "Ground Fault") and citing safety risks in writing, you create a documented request that is much harder for them to ignore than a casual verbal complaint.
        </p>
      </div>
    </div>
  );
};