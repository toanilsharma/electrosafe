import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShieldCheck, FileText, Printer, UserCheck, Zap, CheckCircle2, Star } from 'lucide-react';

export const Landlords: React.FC = () => {
  const [propName, setPropName] = useState('');
  const [propAddress, setAddress] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [inspDate, setInspDate] = useState('');
  const [inspector, setInspector] = useState('');
  const [showLetter, setShowLetter] = useState(false);

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  const BENEFITS = [
    { icon: ShieldCheck, title: 'Reduce liability', desc: 'Documented safety checks protect you legally in case of incidents.' },
    { icon: Star, title: 'Attract quality tenants', desc: 'Tenants choose safe, well-maintained properties. Safety builds trust.' },
    { icon: UserCheck, title: 'Retain long-term tenants', desc: 'Proactive safety maintenance reduces disputes and tenant turnover.' },
    { icon: FileText, title: 'Comply with regulations', desc: 'Many jurisdictions legally require periodic electrical inspections of rental properties.' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How often should landlords check electrical safety?', acceptedAnswer: { '@type': 'Answer', text: 'Most electrical safety codes require a full electrical inspection every 5 years for rental properties. Annual visual checks and GFCI/RCD testing are recommended between formal inspections.' } },
      { '@type': 'Question', name: 'What are landlords legally required to provide for electrical safety?', acceptedAnswer: { '@type': 'Answer', text: 'In the UK, landlords must provide an Electrical Installation Condition Report (EICR) every 5 years. In the USA, requirements vary by state. In India, periodic inspections are required under local building codes.' } },
      { '@type': 'Question', name: 'Can a landlord be held liable for electrical fires?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Landlords have a duty of care to ensure rental properties are electrically safe. Failure to maintain safe wiring, working smoke detectors, and GFCI/RCD protection can result in significant legal and financial liability.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Electrical Safety for Landlords & Property Managers | ElectroSafe.homes</title>
        <meta name="description" content="Free landlord electrical safety resources: embeddable safety badge, printable tenant safety letter, inspection checklist, and compliance guides for rental properties." />
        <link rel="canonical" href="https://electrosafe.homes/landlords" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Building2 className="w-3.5 h-3.5" /> For Landlords & Property Managers
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Protect Your Properties, Retain Your Tenants</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Free tools for landlords to document electrical safety, communicate with tenants, and demonstrate compliance.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {BENEFITS.map((b, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-blue-50 rounded-xl flex-shrink-0"><b.icon className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">{b.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm">{b.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="space-y-8">
        {/* Embeddable Badge */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-lg mb-2">Embeddable "Safety Verified" Badge</h2>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm mb-4">Embed a live safety badge on your property listing website to show tenants your commitment to safety. The badge links directly to ElectroSafe.homes verification page.</p>
              <Link to="/badge" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition text-sm">
                Get Your Badge <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tenant Safety Letter Generator */}
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-lg">Tenant Safety Notice Generator</h2>
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-sm">Fill in details to generate a printable, professional tenant safety communication letter.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-1">Property Name</label>
              <input type="text" placeholder="e.g. Sunrise Apartment 3B" value={propName} onChange={e => setPropName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-1">Property Address</label>
              <input type="text" placeholder="e.g. 123 Main Street, City" value={propAddress} onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-1">Tenant Name</label>
              <input type="text" placeholder="e.g. Mr./Ms. Kumar" value={tenantName} onChange={e => setTenantName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-1">Inspection Date</label>
              <input type="date" value={inspDate} onChange={e => setInspDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-1">Inspector / Landlord Name</label>
              <input type="text" placeholder="e.g. Anil Sharma / ABC Properties" value={inspector} onChange={e => setInspector(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setShowLetter(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition">
              <FileText className="w-4 h-4" /> Generate Letter
            </button>
            {showLetter && (
              <button onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                <Printer className="w-4 h-4" /> Print
              </button>
            )}
          </div>
        </div>

        {/* Generated Letter */}
        {showLetter && (
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border-2 border-blue-200 shadow-lg p-8 print-content">
            <div className="border-b-2 border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-black text-gray-900 dark:text-gray-100 dark:text-gray-100">ElectroSafe.homes — Verified Safety Notice</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">electrosafe.homes | Electrical Safety Standards: IEC 60364 / NEC 2023 / BS 7671</p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm mb-4">{today}</p>
            <p className="text-gray-800 dark:text-gray-200 dark:text-gray-200 font-medium">Dear {tenantName || '[Tenant Name]'},</p>
            <br />
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm leading-relaxed mb-3">
              We are writing to inform you that the electrical installation at <strong>{propName || '[Property Name]'}</strong>, located at <strong>{propAddress || '[Address]'}</strong>, has been reviewed and assessed for safety as of <strong>{inspDate || '[Date]'}</strong> by <strong>{inspector || '[Inspector/Landlord Name]'}</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm leading-relaxed mb-3">
              This assessment was conducted using the ElectroSafe.homes safety framework, aligned with international electrical safety standards including IEC 60364, NEC 2023, and BS 7671. The following items have been confirmed to be in safe working order:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300 space-y-1 mb-4 ml-4 list-disc">
              <li>Main circuit breaker / distribution panel — accessible and labeled</li>
              <li>RCD/GFCI residual current protection — tested and operational</li>
              <li>Smoke detectors — installed and functional</li>
              <li>Visible wiring — free from damage, rodent activity, or moisture exposure</li>
              <li>Kitchen and bathroom outlets — GFCI protected where required</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm leading-relaxed mb-6">
              Should you notice any electrical concerns — burning smells, flickering lights, sparking outlets, or tripping breakers — please contact us immediately. For a self-assessment of your own usage habits, we encourage you to visit <strong>electrosafe.homes/assessment</strong> (free, no sign-up required).
            </p>
            <div className="border-t border-gray-200 dark:border-gray-700 dark:border-gray-700 pt-4">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200">{inspector || '[Inspector/Landlord Name]'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{propName || '[Property Name]'} — Safety verified via ElectroSafe.homes</p>
            </div>

            {/* Tenant Rights */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-bold text-blue-900 text-xs uppercase tracking-wider mb-1">Tenant Rights Notice</p>
                  <p className="text-blue-800 text-xs">You have the right to request a copy of any formal electrical inspection certificate (EICR/PIR). If any electrical fault poses an immediate danger, you may request emergency repair within 24 hours. For guidance, visit electrosafe.homes/tenant-request</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment CTA for landlords */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white text-center">
          <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h2 className="font-bold text-xl mb-2">Start with a free property safety check</h2>
          <p className="text-gray-400 mb-4 text-sm">Use our 25-point assessment for each property to identify issues before they become liability risks.</p>
          <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Run Property Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style>{`@media print { .no-print { display: none; } }`}</style>
    </div>
  );
};
