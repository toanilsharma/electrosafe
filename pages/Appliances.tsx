
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APPLIANCES } from '../data';
import { ApplianceGuide } from '../types';
import { Power, AlertOctagon, Plug, Clock, ShieldAlert, Baby, BookOpen } from 'lucide-react';

export const Appliances = () => {
  const location = useLocation();
  const [activeId, setActiveId] = useState(APPLIANCES[0].id);

  useEffect(() => {
    if (location.state?.id) {
      setActiveId(location.state.id);
    }
  }, [location.state]);

  const activeAppliance = APPLIANCES.find(a => a.id === activeId) || APPLIANCES[0];

  const safeUsageSummary = activeAppliance.safeUsage.join(' ');

  const commonSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `How to use ${activeAppliance.name} safely?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": safeUsageSummary
      }
    }]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>{activeAppliance.name} Safety Guide | ElectroSafe</title>
        <meta name="description" content={`Electrical safety guide for ${activeAppliance.name}. Learn about outlet requirements, overload signs, and safe usage.`} />
        <script type="application/ld+json">{JSON.stringify(commonSchema)}</script>
      </Helmet>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Appliance Safety Guides</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 dark:text-gray-400 flex items-center justify-center gap-2">
          Universal safety instructions for high-power household devices.
        </p>
        <div className="inline-flex items-center gap-1 mt-2 text-xs font-mono text-gray-500 dark:text-gray-400 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 px-2 py-1 rounded">
          <BookOpen className="w-3 h-3" /> Safety Standard Ref: IEC 60335
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation */}
        <div className="lg:w-1/4 space-y-2">
          {APPLIANCES.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveId(app.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${activeId === app.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 dark:bg-gray-900 text-gray-600 dark:text-gray-400 dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 dark:border-gray-800'
                }`}
            >
              {app.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700 flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-full shadow-sm">
                <Power className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">{activeAppliance.name}</h2>
            </div>

            {/* Direct Answer Block */}
            <div className="px-8 pt-8">
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-indigo-900 text-lg mb-2">Safe Usage Executive Summary</h3>
                <p className="text-indigo-800 text-base leading-relaxed">
                  {safeUsageSummary}
                </p>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Safe Usage */}
              <div>
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">
                  <ShieldAlert className="w-5 h-5 text-green-600" /> Safe Usage
                </h3>
                <ul className="space-y-2">
                  {activeAppliance.safeUsage.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signs of Overload */}
              <div>
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">
                  <AlertOctagon className="w-5 h-5 text-red-600" /> Warning Signs
                </h3>
                <ul className="space-y-2">
                  {activeAppliance.signsOfOverload.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                  {activeAppliance.wiringDamage.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-blue-50 p-5 rounded-xl">
                <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-3">
                  <Plug className="w-5 h-5" /> Connection Requirements
                </h3>
                <p className="text-sm text-blue-800 font-medium mb-2">{activeAppliance.outletReqs}</p>
                <div className="text-xs text-blue-700 mt-2 border-t border-blue-200 pt-2">
                  <strong>When to Unplug:</strong> {activeAppliance.whenToUnplug.join(', ')}
                </div>
              </div>

              {/* Inspection & Safety */}
              <div className="bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 p-5 rounded-xl">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">
                  <Clock className="w-5 h-5" /> Maintenance & Safety
                </h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  <p><strong>Inspect:</strong> {activeAppliance.inspectionFreq}</p>
                  <p><strong>Replace If:</strong> {activeAppliance.whenToReplace}</p>
                  <div className="flex items-start gap-2 mt-3 text-orange-700 bg-orange-50 p-2 rounded">
                    <Baby className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold">{activeAppliance.childSafety}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
