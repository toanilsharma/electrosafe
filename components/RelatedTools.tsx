import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, ClipboardList, HelpCircle, Home, FileText, Globe, Search, DollarSign, Layout, Baby, BatteryCharging, Calendar, Gavel, Camera } from 'lucide-react';

interface RelatedTool {
  title: string;
  desc: string;
  to: string;
  icon: React.ElementType;
  badge?: string;
  color: string;
}

const ALL_TOOLS: RelatedTool[] = [
  { title: 'Full Safety Assessment', desc: '25-point home electrical audit with risk score', to: '/assessment', icon: ShieldCheck, badge: 'Most Popular', color: 'blue' },
  { title: 'Home Buyer Scanner', desc: '15-min open house check for hidden money pits', to: '/home-buyer-scanner', icon: Search, badge: 'New', color: 'indigo' },
  { title: 'Contractor BS Detector', desc: 'Price ranges & vetting questions for electricians', to: '/quote-analyzer', icon: DollarSign, color: 'green' },
  { title: 'Load Calculator', desc: 'Estimate your electricity bill and circuit loads', to: '/load-calc', icon: Zap, color: 'yellow' },
  { title: 'Visual Breaker Mapper', desc: 'Map your panel & print beautiful labels', to: '/breaker-mapper', icon: Layout, color: 'purple' },
  { title: 'DIY or Deadly? Quiz', desc: 'Test your hazard vision in 60 seconds', to: '/diy-quiz', icon: Camera, color: 'red' },
  { title: 'EV Charger Wire Sizer', desc: 'Proper wire & breaker sizing for EV safety', to: '/ev-charger', icon: BatteryCharging, color: 'cyan' },
  { title: 'Nursery Safety Check', desc: 'Electrical safety specifically for new parents', to: '/nursery-safety', icon: Baby, color: 'pink' },
  { title: 'Recall Radar & Calendar', desc: 'Track smoke alarms & dangerous recalls', to: '/alarm-calendar', icon: Calendar, color: 'orange' },
  { title: 'Renters Revenge Demand', desc: 'Legal-sounding notice for hazardous rentals', to: '/tenant-demand', icon: Gavel, color: 'slate' },
  { title: 'My Home Dashboard', desc: 'Save progress, earn badges, track your safety streak', to: '/my-home', icon: Home, color: 'violet' },
  { title: 'Is It Safe?', desc: '24+ common electrical Q&A answered instantly', to: '/is-it-safe', icon: HelpCircle, color: 'teal' },
  { title: 'Bill Spike Detector', desc: 'Find out why your electricity bill jumped', to: '/bill-detector', icon: Zap, color: 'amber' },
  { title: 'Tenant Safety Letter', desc: 'Generate a formal letter to your landlord', to: '/tenant-request', icon: FileText, color: 'rose' },
  { title: 'Risk Predictor', desc: 'Predict your fire risk from warning signs', to: '/risk-predictor', icon: ShieldCheck, color: 'emerald' },
  { title: 'Country Safety Guide', desc: 'Global electrical standards for India, USA, UK', to: '/safety/india', icon: Globe, color: 'sky' },
];

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
  indigo: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800',
  green: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
  orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-800',
  purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800',
  teal: 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-800',
  yellow: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-100 dark:border-yellow-800',
  pink: 'bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-800',
  red: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800',
  cyan: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-800',
  slate: 'bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-800',
  violet: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800',
  amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800',
  rose: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-800',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800',
  sky: 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-800',
};

interface Props {
  currentPath: string;
  count?: number;
}

export const RelatedTools: React.FC<Props> = ({ currentPath, count = 3 }) => {
  const related = ALL_TOOLS.filter(t => t.to !== currentPath).slice(0, count);

  return (
    <div className="mt-10 no-print">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap">You might also need</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map(tool => {
          const Icon = tool.icon;
          const colorClass = COLOR_MAP[tool.color] || COLOR_MAP.blue;
          return (
            <Link
              key={tool.to}
              to={tool.to}
              className={`flex items-start gap-3 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5 group ${colorClass}`}
            >
              <div className="mt-0.5 p-2 bg-white/60 dark:bg-black/20 rounded-xl flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm leading-tight">{tool.title}</p>
                  {tool.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/60 dark:bg-black/20 rounded-full whitespace-nowrap">{tool.badge}</span>
                  )}
                </div>
                <p className="text-xs opacity-75 mt-0.5 leading-snug">{tool.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
