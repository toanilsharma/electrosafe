import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, ClipboardList, HelpCircle, Home, FileText, Globe } from 'lucide-react';

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
  { title: '60-Second Quiz', desc: 'Quick safety check — get your score instantly', to: '/quick-quiz', icon: HelpCircle, color: 'indigo' },
  { title: 'Load Calculator', desc: 'Estimate your electricity bill and circuit loads', to: '/load-calc', icon: Zap, badge: 'Free Tool', color: 'green' },
  { title: 'Room-by-Room Audit', desc: 'Printable checklist for every room in your home', to: '/room-audit', icon: ClipboardList, color: 'orange' },
  { title: 'My Home Dashboard', desc: 'Save progress, earn badges, track your safety streak', to: '/my-home', icon: Home, color: 'purple' },
  { title: 'Is It Safe?', desc: '24+ common electrical Q&A answered instantly', to: '/is-it-safe', icon: HelpCircle, color: 'teal' },
  { title: 'Bill Spike Detector', desc: 'Find out why your electricity bill jumped', to: '/bill-detector', icon: Zap, color: 'yellow' },
  { title: 'Tenant Safety Letter', desc: 'Generate a formal letter to your landlord', to: '/tenant-request', icon: FileText, color: 'pink' },
  { title: 'Risk Predictor', desc: 'Predict your fire risk from warning signs', to: '/risk-predictor', icon: ShieldCheck, color: 'red' },
  { title: 'Country Safety Guide', desc: 'India, USA, UK specific electrical standards', to: '/safety/india', icon: Globe, color: 'cyan' },
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
