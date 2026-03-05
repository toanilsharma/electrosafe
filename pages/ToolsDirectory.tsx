import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { 
  Calculator, AlertTriangle, ShieldCheck, DollarSign, Search, Map, 
  ClipboardCheck, Bell, BatteryCharging, Baby, Camera, Gavel, Sun, 
  Car, Ghost, Flame, Monitor, Clock, CloudLightning, Sparkles
} from 'lucide-react';

const TOOLS = [
  { name: 'Solar ROI Calculator', path: '/solar-roi-calculator', icon: Sun, desc: 'Payback period & CO₂ savings', colorBg: 'bg-amber-100 dark:bg-amber-900/30', colorText: 'text-amber-600 dark:text-amber-400' },
  { name: 'EV Cost Comparison', path: '/ev-charging-cost-calculator', icon: Car, desc: 'Home vs public vs petrol', colorBg: 'bg-blue-100 dark:bg-blue-900/30', colorText: 'text-blue-600 dark:text-blue-400' },
  { name: 'Ghost Power Finder', path: '/ghost-power-calculator', icon: Ghost, desc: 'Phantom standby cost', colorBg: 'bg-purple-100 dark:bg-purple-900/30', colorText: 'text-purple-600 dark:text-purple-400' },
  { name: 'Dryer Vent Risk', path: '/dryer-vent-fire-risk-calculator', icon: Flame, desc: 'Lint fire probability', colorBg: 'bg-red-100 dark:bg-red-900/30', colorText: 'text-red-600 dark:text-red-400' },
  { name: 'WFH Load Auditor', path: '/wfh-load-audit', icon: Monitor, desc: 'Home office circuit check', colorBg: 'bg-indigo-100 dark:bg-indigo-900/30', colorText: 'text-indigo-600 dark:text-indigo-400' },
  { name: 'Appliance Life Gauge', path: '/appliance-life-expectancy-calculator', icon: Clock, desc: 'Efficiency decay by age', colorBg: 'bg-teal-100 dark:bg-teal-900/30', colorText: 'text-teal-600 dark:text-teal-400' },
  { name: 'Lightning Risk', path: '/lightning-strike-calculator', icon: CloudLightning, desc: 'IEC 62305 strike odds', colorBg: 'bg-sky-100 dark:bg-sky-900/30', colorText: 'text-sky-600 dark:text-sky-400' },
  { name: 'Holiday Lights Planner', path: '/holiday-lights', icon: Sparkles, desc: 'Max string calculator', colorBg: 'bg-orange-100 dark:bg-orange-900/30', colorText: 'text-orange-600 dark:text-orange-400' },
  { name: 'Load Calculator', path: '/electrical-load-calculator', icon: Calculator, desc: 'Prevent tripped breakers', colorBg: 'bg-green-100 dark:bg-green-900/30', colorText: 'text-green-600 dark:text-green-400' },
  { name: 'Renters Generator', path: '/tenant-demand', icon: Gavel, desc: 'Formal hazard notice', colorBg: 'bg-red-100 dark:bg-red-900/30', colorText: 'text-red-600 dark:text-red-400' },
  { name: 'Alarm Calendar', path: '/alarm-calendar', icon: Bell, desc: '10-year smoke alarm timer', colorBg: 'bg-orange-100 dark:bg-orange-900/30', colorText: 'text-orange-600 dark:text-orange-400' },
  { name: 'EV Charger Sizer', path: '/ev-charger', icon: BatteryCharging, desc: 'Avoid NEMA 14-50 fires', colorBg: 'bg-green-100 dark:bg-green-900/30', colorText: 'text-green-600 dark:text-green-400' },
  { name: 'Nursery Teardown', path: '/nursery-safety', icon: Baby, desc: 'Shock-proof for babies', colorBg: 'bg-rose-100 dark:bg-rose-900/30', colorText: 'text-rose-600 dark:text-rose-400' },
  { name: 'DIY Photo Quiz', path: '/diy-quiz', icon: Camera, desc: 'Can you spot the hazard?', colorBg: 'bg-amber-100 dark:bg-amber-900/30', colorText: 'text-amber-600 dark:text-amber-400' },
  { name: 'Quote Analyzer', path: '/quote-analyzer', icon: DollarSign, desc: 'Weed out bad contractors', colorBg: 'bg-indigo-100 dark:bg-indigo-900/30', colorText: 'text-indigo-600 dark:text-indigo-400' },
  { name: 'Home Buyer Scan', path: '/home-buyer-scanner', icon: Search, desc: '15-min open house check', colorBg: 'bg-blue-100 dark:bg-blue-900/30', colorText: 'text-blue-600 dark:text-blue-400' },
  { name: 'Breaker Mapper', path: '/breaker-mapper', icon: Map, desc: 'Generate printable labels', colorBg: 'bg-purple-100 dark:bg-purple-900/30', colorText: 'text-purple-600 dark:text-purple-400' },
  { name: 'Self Assessment', path: '/assessment', icon: ClipboardCheck, desc: '25-point safety audit', colorBg: 'bg-emerald-100 dark:bg-emerald-900/30', colorText: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'Risk Predictor', path: '/electrical-hazard-risk-predictor', icon: AlertTriangle, desc: 'Diagnose symptoms', colorBg: 'bg-red-100 dark:bg-red-900/30', colorText: 'text-red-600 dark:text-red-400' },
];

export default function ToolsDirectory() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-24 md:pb-12">
      <SEOHead 
        title="All Electrical Safety Tools & Calculators"
        description="Access over 18 free electrical safety tools, calculators, and auditing apps to protect your home. Calculate your solar ROI, EV charging costs, and map your breaker box."
        path="/tools"
        breadcrumbs={[
          { name: 'Tools', path: '/tools' }
        ]}
      />

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Electrical Tools & Calculators
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Our comprehensive suite of free, interactive tools designed to help you analyze electrical loads, predict hazards, and make smart home energy decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {TOOLS.map((tool, idx) => (
            <Link 
              key={idx} 
              to={tool.path}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className={`p-3 rounded-xl ${tool.colorBg} ${tool.colorText} group-hover:scale-110 transition-transform shrink-0`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
