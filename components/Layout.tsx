
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Zap, ShieldCheck, Search, ChevronRight, AlertOctagon,
  ChevronDown, Calculator, ClipboardCheck, AlertTriangle, UserCheck,
  Facebook, Linkedin, Twitter, Instagram, MessageCircle, DollarSign,
  Hammer, LifeBuoy, BookOpen, PenTool, Image, Download, Mail, Globe, Map, Camera, Baby, BatteryCharging, Bell, Gavel,
  Sun, Car, Ghost, Flame, Monitor, Clock, CloudLightning, Sparkles
} from 'lucide-react';
import { ARTICLES, APPLIANCES, ROOMS, HAZARD_GALLERY } from '../data';
import { ReturnVisitModal } from './ReturnVisitModal';
import { DarkModeToggle, useDarkMode } from './DarkModeToggle';
import { MobileTabBar } from './MobileTabBar';
import { ExitIntentModal } from './ExitIntentModal';
import { CurrencySelector } from './CurrencySelector';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}


// --- NAV DROP DOWN COMPONENTS ---

const NavDropdown = ({ title, items, icon: Icon }: { title: string, items: any[], icon: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:bg-gray-800 dark:bg-gray-800'
          }`}
      >
        <Icon className="w-4 h-4" />
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-80 max-h-[80vh] overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-2 space-y-1">
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 transition-colors group"
              >
                <div className={`mt-1 p-2 rounded-lg ${item.colorBg} ${item.colorText}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-sm group-hover:text-blue-600">{item.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 leading-tight mt-0.5">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { dark, setDark } = useDarkMode();


  // Search Logic with Deep Linking
  const getSearchResults = () => {
    if (!searchQuery) return [];
    const lowerQ = searchQuery.toLowerCase();

    const results = [
      ...ARTICLES.map(a => ({ type: 'Article', title: a.title, path: '/articles', sub: a.category, id: a.id })),
      ...APPLIANCES.map(a => ({ type: 'Appliance', title: a.name, path: '/appliances', sub: 'Guide', id: a.id })),
      ...ROOMS.map(r => ({ type: 'Room', title: r.name, path: '/rooms', sub: 'Checklist', id: r.id })),
      ...HAZARD_GALLERY.map(h => ({ type: 'Hazard', title: h.title, path: '/gallery', sub: h.risk, id: h.id })),
      // Deep Links for Everyday Safety Tools
      { type: 'Safety Tool', title: 'Lightbulb Guide', path: '/everyday-safety', sub: 'Color & Wattage', tab: 'lightbulb' },
      { type: 'Safety Tool', title: 'Power Outage Detective', path: '/everyday-safety', sub: 'Diagnosis', tab: 'outage' },
      { type: 'Safety Tool', title: 'Shock First Aid', path: '/everyday-safety', sub: 'Medical', tab: 'firstaid' },
      { type: 'Safety Tool', title: 'Storm Safety', path: '/everyday-safety', sub: 'Protocol', tab: 'storm' },
      { type: 'Safety Tool', title: 'Smart Home Check', path: '/everyday-safety', sub: 'Compatibility', tab: 'smart' },
      { type: 'Safety Tool', title: 'Baby Proofing', path: '/everyday-safety', sub: 'Child Safety', tab: 'baby' },
      { type: 'Safety Tool', title: 'Electrician Glossary', path: '/everyday-safety', sub: 'Terms', tab: 'glossary' },

      { type: 'Tool', title: 'Load Calculator', path: '/electrical-load-calculator', sub: 'Tool' },
      { type: 'Tool', title: 'Safety Assessment', path: '/assessment', sub: 'Audit' },
      { type: 'Tool', title: 'Risk Predictor', path: '/electrical-hazard-risk-predictor', sub: 'Diagnosis' },
      { type: 'Tool', title: 'Home Buyer Scanner', path: '/home-buyer-scanner', sub: 'Audit' },
      { type: 'Tool', title: 'Quote Analyzer', path: '/quote-analyzer', sub: 'Hiring' },
      { type: 'Tool', title: 'Breaker Mapper', path: '/breaker-mapper', sub: 'Utility' },
      { type: 'Tool', title: 'DIY or Deadly? Quiz', path: '/diy-quiz', sub: 'Game' },
      { type: 'Tool', title: 'Nursery Setup', path: '/nursery-safety', sub: 'Baby Safety' },
      { type: 'Tool', title: 'EV Charger Sizer', path: '/ev-charger', sub: 'Calculator' },
      { type: 'Tool', title: 'Alarm Calendar', path: '/alarm-calendar', sub: 'Recall Radar' },
      { type: 'Tool', title: 'Renters Demand', path: '/tenant-demand', sub: 'Legal Generator' },
      { type: 'Tool', title: 'Solar ROI Calculator', path: '/solar-roi-calculator', sub: 'Payback & CO₂' },
      { type: 'Tool', title: 'EV Cost Comparison', path: '/ev-charging-cost-calculator', sub: 'Cost Savings' },
      { type: 'Tool', title: 'Ghost Power Finder', path: '/ghost-power-calculator', sub: 'Standby Cost' },
      { type: 'Tool', title: 'Dryer Vent Risk', path: '/dryer-vent-fire-risk-calculator', sub: 'Fire Safety' },
      { type: 'Tool', title: 'WFH Load Auditor', path: '/wfh-load-audit', sub: 'Circuit Check' },
      { type: 'Tool', title: 'Appliance Life Gauge', path: '/appliance-life-expectancy-calculator', sub: 'Efficiency' },
      { type: 'Tool', title: 'Lightning Risk', path: '/lightning-strike-calculator', sub: 'IEC 62305' },
      { type: 'Tool', title: 'Holiday Lights Planner', path: '/holiday-lights', sub: 'Circuit Safety' },
      { type: 'Guide', title: 'Hardware Encyclopedia', path: '/hardware', sub: 'MCB/Wire/Switch' },
      { type: 'Guide', title: 'New Home Master Plan', path: '/new-home', sub: 'Construction' },
    ];

    return results.filter(item =>
      item.title.toLowerCase().includes(lowerQ) ||
      item.sub.toLowerCase().includes(lowerQ)
    );
  };

  // Nav Data Structure
  const toolsMenu = [
    { name: 'Solar ROI Calculator', path: '/solar-roi-calculator', icon: Sun, desc: 'Payback period & CO₂ savings', colorBg: 'bg-amber-100', colorText: 'text-amber-600' },
    { name: 'EV Cost Comparison', path: '/ev-charging-cost-calculator', icon: Car, desc: 'Home vs public vs petrol', colorBg: 'bg-blue-100', colorText: 'text-blue-600' },
    { name: 'Ghost Power Finder', path: '/ghost-power-calculator', icon: Ghost, desc: 'Phantom standby cost', colorBg: 'bg-purple-100', colorText: 'text-purple-600' },
    { name: 'Dryer Vent Fire Risk', path: '/dryer-vent-fire-risk-calculator', icon: Flame, desc: 'Lint fire probability', colorBg: 'bg-red-100', colorText: 'text-red-600' },
    { name: 'WFH Load Auditor', path: '/wfh-load-audit', icon: Monitor, desc: 'Home office circuit check', colorBg: 'bg-indigo-100', colorText: 'text-indigo-600' },
    { name: 'Appliance Life Gauge', path: '/appliance-life-expectancy-calculator', icon: Clock, desc: 'Efficiency decay by age', colorBg: 'bg-teal-100', colorText: 'text-teal-600' },
    { name: 'Lightning Risk', path: '/lightning-strike-calculator', icon: CloudLightning, desc: 'IEC 62305 strike odds', colorBg: 'bg-sky-100', colorText: 'text-sky-600' },
    { name: 'Holiday Lights Planner', path: '/holiday-lights', icon: Sparkles, desc: 'Max string calculator', colorBg: 'bg-red-100', colorText: 'text-red-600' },
    { name: 'Renters Generator', path: '/tenant-demand', icon: Gavel, desc: 'Formal hazard notice', colorBg: 'bg-red-100', colorText: 'text-red-600' },
    { name: 'Alarm Calendar', path: '/alarm-calendar', icon: Bell, desc: '10-year smoke alarm timer', colorBg: 'bg-orange-100', colorText: 'text-orange-600' },
    { name: 'EV Charger Sizer', path: '/ev-charger', icon: BatteryCharging, desc: 'Avoid NEMA 14-50 fires', colorBg: 'bg-green-100', colorText: 'text-green-600' },
    { name: 'Nursery Teardown', path: '/nursery-safety', icon: Baby, desc: 'Shock-proof for babies', colorBg: 'bg-rose-100', colorText: 'text-rose-600' },
    { name: 'DIY Photo Quiz', path: '/diy-quiz', icon: Camera, desc: 'Can you spot the hazard?', colorBg: 'bg-orange-100', colorText: 'text-orange-600' },
    { name: 'Quote Analyzer', path: '/quote-analyzer', icon: DollarSign, desc: 'Weed out bad contractors', colorBg: 'bg-indigo-100', colorText: 'text-indigo-600' },
    { name: 'Home Buyer Scan', path: '/home-buyer-scanner', icon: Search, desc: '15-min open house check', colorBg: 'bg-blue-100', colorText: 'text-blue-600' },
    { name: 'Breaker Mapper', path: '/breaker-mapper', icon: Map, desc: 'Generate printable labels', colorBg: 'bg-purple-100', colorText: 'text-purple-600' },
    { name: 'Self Assessment', path: '/assessment', icon: ClipboardCheck, desc: '25-point safety audit', colorBg: 'bg-green-100', colorText: 'text-green-600' },
    { name: 'Risk Predictor', path: '/electrical-hazard-risk-predictor', icon: AlertTriangle, desc: 'Diagnose symptoms', colorBg: 'bg-red-100', colorText: 'text-red-600' },
  ];

  const guidesMenu = [
    { name: 'New Home Guide', path: '/new-home', icon: Hammer, desc: 'Construction master plan', colorBg: 'bg-orange-100', colorText: 'text-orange-600' },
    { name: 'Hardware Guide', path: '/hardware', icon: Zap, desc: 'MCB, Wires, Switch specs', colorBg: 'bg-yellow-100', colorText: 'text-yellow-600' },
    { name: 'Protection Guide', path: '/surge-protection-guide', icon: ShieldCheck, desc: 'Breaker selection', colorBg: 'bg-teal-100', colorText: 'text-teal-600' },
  ];

  const learnMenu = [
    { name: 'Everyday Toolkit', path: '/everyday-safety', icon: LifeBuoy, desc: 'Life hacks & easy guides', colorBg: 'bg-cyan-100', colorText: 'text-cyan-600' },
    { name: 'Articles', path: '/articles', icon: BookOpen, desc: 'Expert knowledge base', colorBg: 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50', colorText: 'text-gray-600 dark:text-gray-400 dark:text-gray-400' },
    { name: 'Appliances', path: '/appliances', icon: PenTool, desc: 'Specific device safety', colorBg: 'bg-pink-100', colorText: 'text-pink-600' },
    { name: 'Room Guides', path: '/rooms', icon: Map, desc: 'Kitchen, Bath, etc.', colorBg: 'bg-indigo-100', colorText: 'text-indigo-600' },
    { name: 'Hazard Gallery', path: '/gallery', icon: Image, desc: 'Visual examples', colorBg: 'bg-rose-100', colorText: 'text-rose-600' },
  ];

  // Don't show Navbar/Footer on Emergency Page
  if (location.pathname === '/emergency') return null;

  return (
    <nav className="bg-white dark:bg-gray-900 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50 no-print border-b border-gray-100 dark:border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100 dark:text-gray-100">
                ElectroSafe<span className="text-blue-600">.homes</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavDropdown title="Smart Tools" items={toolsMenu} icon={Calculator} />
            <NavDropdown title="Master Guides" items={guidesMenu} icon={Hammer} />
            <NavDropdown title="Knowledge Base" items={learnMenu} icon={BookOpen} />

            <Link to="/downloads" className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:bg-gray-800 dark:bg-gray-800">
              <Download className="w-4 h-4" /> Downloads
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-1"></div>

            <CurrencySelector />
            <DarkModeToggle dark={dark} onToggle={() => setDark(!dark)} />

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-full transition"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link to="/assessment" className="ml-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-sm shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" /> Start Scan
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center lg:hidden gap-2">
            <CurrencySelector />
            <DarkModeToggle dark={dark} onToggle={() => setDark(!dark)} />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 dark:text-gray-400 dark:text-gray-400"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 focus:outline-none"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 dark:border-gray-800 p-4 animate-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search articles, appliances, hazards..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-3 top-2.5 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:bg-gray-200"
              >
                ESC
              </button>
            </div>

            {searchQuery && (
              <div className="mt-4 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 custom-scrollbar">
                {getSearchResults().length === 0 ? (
                  <div className="p-4 text-gray-500 dark:text-gray-400 dark:text-gray-400 text-center">No results found for "{searchQuery}"</div>
                ) : (
                  getSearchResults().map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        // Deep Linking Logic
                        const navState: any = {};
                        if ((res as any).id) navState.id = (res as any).id;
                        if ((res as any).tab) navState.tab = (res as any).tab;

                        navigate(res.path, { state: navState });
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-3 hover:bg-blue-50 border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 last:border-0 flex justify-between items-center group"
                    >
                      <div>
                        <div className="font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200 group-hover:text-blue-700">{res.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{res.type} • {res.sub}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-100 dark:border-gray-800 overflow-y-auto max-h-[85vh] z-50 animate-in slide-in-from-top-2">
          <div className="px-4 py-6 space-y-8">
            
            {/* Tools Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-xs">
                  <Calculator className="w-4 h-4" /> Smart Tools
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {toolsMenu.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg ${link.colorBg} ${link.colorText}`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{link.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">{link.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Guides Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-orange-600 dark:text-orange-400 font-bold tracking-wider uppercase text-xs">
                <Hammer className="w-4 h-4" /> Master Guides
              </div>
              <div className="space-y-2">
                {guidesMenu.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                     <div className={`p-2 rounded-lg ${link.colorBg} ${link.colorText}`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{link.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Knowledge Base Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-600 dark:text-purple-400 font-bold tracking-wider uppercase text-xs">
                <BookOpen className="w-4 h-4" /> Knowledge Base
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {learnMenu.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                     <div className={`p-2 rounded-lg ${link.colorBg} ${link.colorText}`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{link.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/downloads"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full p-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Download className="w-5 h-5" /> Download Resources
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0 || location.pathname === '/emergency') return null;

  const formatName = (str: string) => str.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700 py-2 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 flex items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={name}>
              <span className="mx-2 text-gray-300">/</span>
              {isLast ? (
                <span className="text-gray-800 dark:text-gray-200 dark:text-gray-200 font-medium">{formatName(name)}</span>
              ) : (
                <Link to={routeTo} className="hover:text-blue-600">{formatName(name)}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/emergency') return null;

  return (
    <footer className="bg-zinc-900 text-white pt-16 pb-8 no-print border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Column 1: Brand & Mission (4 cols) */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1 rounded-md">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                ElectroSafe<span className="text-blue-500">.homes</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm">
              Empowering every home with professional electrical safety knowledge.
              We translate complex engineering standards into simple, life-saving actions for homeowners, tenants, and builders worldwide.
            </p>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400 font-medium border border-zinc-700">100% Free</span>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400 font-medium border border-zinc-700">Global Standards</span>
            </div>
          </div>

          {/* Column 2: Legal & Company (2 cols) */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/standards-and-sources" className="hover:text-white transition-colors">Standards & Sources</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Network (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Explore Our Tools</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://designcalculators.co.in" target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    Design Calculators
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-400" />
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5 leading-snug group-hover:text-zinc-400 transition-colors">
                    Simplify complex engineering math with instant, free design tools.
                  </div>
                </a>
              </li>
              <li>
                <a href="https://reliabilitytools.co.in" target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    Reliability Tools
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-400" />
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5 leading-snug group-hover:text-zinc-400 transition-colors">
                    Predict system failures and calculate MTBF with professional precision.
                  </div>
                </a>
              </li>
              <li>
                <a href="https://knowyourname.co.in" target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    Know Your Name
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-400" />
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5 leading-snug group-hover:text-zinc-400 transition-colors">
                    Curious? Unlock the hidden numerology and meaning behind your name.
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Credits (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">Get in touch</div>
                  <a href="mailto:0808miracle@gmail.com" className="text-sm text-zinc-400 hover:text-blue-400 transition-colors">
                    0808miracle@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">Created by</div>
                  <div className="text-sm text-zinc-400">
                    Anil Sharma
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-zinc-800">
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-lg text-green-500 hover:bg-green-500 hover:text-white transition-all">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="mailto:0808miracle@gmail.com" className="p-2 bg-zinc-800 rounded-lg text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </a>
                <Link to="/emergency" className="p-2 bg-red-900/30 rounded-lg text-red-500 hover:bg-red-600 hover:text-white transition-all">
                  <AlertOctagon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} ElectroSafe.homes. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs text-center md:text-right max-w-xl">
            This guide provides safety education and does not replace licensed electricians or emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
};

const EmergencyButton = () => {
  const location = useLocation();
  if (location.pathname === '/emergency') return null;

  return (
    <Link
      to="/emergency"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-red-700 transition-transform hover:scale-105 active:scale-95 no-print"
      aria-label="Emergency Protocol"
    >
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></div>
        <AlertOctagon className="w-6 h-6 relative z-10" />
      </div>
      <span className="font-bold tracking-wide">EMERGENCY</span>
    </Link>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-D9L2WJRB5N', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  const routeData: Record<string, { title: string; desc: string; type?: string; keywords: string; image?: string }> = {
    '/': {
      title: 'Complete Home Electrical Safety Guide',
      desc: 'Electrical safety is critical. Discover our expert guide on home protection, hazard prevention, and daily safety tools for homeowners worldwide.',
      type: 'WebSite',
      keywords: 'electrical safety, home protection, fire prevention, shock hazards, electrical guide'
    },
    '/home-buyer-scanner': {
      title: '15-Minute Home Buyer Electrical Scanner',
      desc: 'Walking through an open house? Use this quick mobile scanner to spot costly electrical red flags before making an offer.',
      type: 'SoftwareApplication',
      keywords: 'home buying, electrical inspection, open house, electrical panel upgrade, real estate'
    },
    '/quote-analyzer': {
      title: 'Contractor Quote Analyzer & B.S. Detector',
      desc: 'Don\'t get scammed by shady electricians. Get fair price estimates and the top 3 vetting questions you must ask before hiring.',
      type: 'SoftwareApplication',
      keywords: 'electrician quotes, panel upgrade cost, EV charger installation cost, contractor scam'
    },
    '/breaker-mapper': {
      title: 'Visual Breaker Box Mapper & Label Generator',
      desc: 'Map out your messy electrical panel and print a perfectly sized, beautiful label sheet to tape inside your breaker box door.',
      type: 'SoftwareApplication',
      keywords: 'breaker box labels, electrical panel directory, circuit mapping tool, printable breaker labels'
    },
    '/diy-quiz': {
      title: 'DIY or Deadly? Home Electrical Safety Photo Quiz',
      desc: 'Can you spot the hidden electrical fire and shock hazards? Take our rapid-fire visual safety quiz to test your home inspector eye.',
      type: 'SoftwareApplication',
      keywords: 'electrical safety quiz, photo quiz, spot the hazard, DIY electrical, fire hazard quiz'
    },
    '/nursery-safety': {
      title: 'New Parent "Shock-Proofing" Nursery Checklist',
      desc: 'Prepare your nursery for your baby. Specialized electrical safety teardown for new parents regarding baby monitors, outlets, cords, and crib zones.',
      type: 'SoftwareApplication',
      keywords: 'nursery safety, baby proofing outlets, baby monitor safety, toddler electrical safety'
    },
    '/ev-charger': {
      title: 'EV Charger Wire Sizer & Breaker Calculator',
      desc: 'Calculate the correct wire gauge and breaker size for your home EV charger installed at a specific distance. Understand the continuous load 125% rule.',
      type: 'SoftwareApplication',
      keywords: 'ev charger installation, wire gauge calculator, noma 14-50 fire, continuous load rule'
    },
    '/alarm-calendar': {
      title: 'Smoke Alarm 10-Year Calendar Expiration Timer & Recall Check',
      desc: 'Generate a 10-year .ICS calendar reminder for your smoke alarms to prevent dead sensors, and search our recall database for recalled electrical products.',
      type: 'SoftwareApplication',
      keywords: 'smoke alarm expiration, 10 year alarm life, electrical product recalls, expired smoke detector'
    },
    '/tenant-demand': {
      title: 'Renters\' Revenge: Electrical Hazard Demand Letter Generator',
      desc: 'Landlord ignoring your sparking outlets? Generate a formal, legal-sounding Notice of Electrical Hazard to force them to fix dangerous code violations.',
      type: 'SoftwareApplication',
      keywords: 'tenant laws electrical, notice of hazard landlord, apartment electrical fire, renters rights electrical'
    },
    '/assessment': {
      title: 'Free Home Electrical Safety Audit',
      desc: 'Assessment tool for home safety. Identify fire risks and shock hazards in minutes with our comprehensive 25-point global electrical safety audit.',
      type: 'SoftwareApplication',
      keywords: 'safety audit, home inspection, electrical checklist, fire risk assessment, shock hazard'
    },
    '/electrical-load-calculator': {
      title: 'Electrical Load Calculator Tool',
      desc: 'Load calculator for preventing electrical fires. accurately estimate your household kW usage and Amps to ensure your wiring is never overloaded.',
      type: 'SoftwareApplication',
      keywords: 'load calculator, amperage estimate, wattage calculator, prevent overload, electrical design'
    },
    '/surge-protection-guide': {
      title: 'Circuit Protection & Breaker Guide',
      desc: 'Circuit protection is your first line of defense. Learn how to select the right miniature circuit breakers, GFCIs, and RCDs for your specific needs.',
      type: 'HowTo',
      keywords: 'circuit breakers, GFCI, RCD, electrical protection, safety switches, fuse box'
    },
    '/electrical-hazard-risk-predictor': {
      title: 'Electrical Hazard Risk Predictor',
      desc: 'Risk predictor tool analyzes symptoms like burning smells or flickering lights. Diagnose hidden electrical fire and shock hazards before failure.',
      type: 'MedicalWebPage',
      keywords: 'electrical diagnosis, fire hazard, flickering lights, burning smell, troubleshooting'
    },
    '/tenant-request': {
      title: 'Tenant Repair Request Generator',
      desc: 'Tenant request generator helps you get repairs fast. Create professional, safety-focused maintenance emails for landlords to fix hazards quickly.',
      type: 'SoftwareApplication',
      keywords: 'tenant rights, repair request, landlord letter, maintenance issue, rental safety'
    },
    '/appliances': {
      title: 'Home Appliance Electrical Safety',
      desc: 'Appliance safety guides for high-power devices. Learn correct usage and installation for Air Conditioners, Heaters, EV Chargers, and home wiring.',
      type: 'CollectionPage',
      keywords: 'appliance safety, AC installation, heater safety, EV charger, high power devices'
    },
    '/rooms': {
      title: 'Complete Room Safety Checklists',
      desc: 'Room safety checklists ensure every corner of your home is secure. Explore detailed electrical guides for Kitchens, Bathrooms, Garages, and Outdoors.',
      type: 'CollectionPage',
      keywords: 'kitchen safety, bathroom electrical, outdoor wiring, garage safety, room checklist'
    },
    '/hardware': {
      title: 'Electrical Hardware & Wiring Guide',
      desc: 'Electrical hardware guide for homeowners. identifying the right MCBs, wire gauges, and switches is crucial for a safe and compliant home installation.',
      type: 'Article',
      keywords: 'electrical hardware, wire gauge, MCB types, switches, electrical components'
    },
    '/new-home': {
      title: 'New Home Electrical Planning Guide',
      desc: 'New home electrical planning made simple. Follow our master guide for socket placement, wiring standards, procurement, and quality safety checks.',
      type: 'Article',
      keywords: 'new home wiring, electrical plan, construction guide, socket placement, wiring standards'
    },
    '/everyday-safety': {
      title: 'Everyday Home Electrical Safety',
      desc: 'Everyday safety toolkit for non-experts. Access our lightbulb guide, power outage detective, and shock first aid protocols to stay safe daily.',
      type: 'SoftwareApplication',
      keywords: 'everyday safety, power outage, first aid, lightbulb guide, child safety'
    },
    '/articles': {
      title: 'Expert Electrical Safety Articles',
      desc: 'Safety articles and expert advice on preventing electrical fires. consistent maintenance and knowledge are key to childproofing and home wiring.',
      type: 'CollectionPage',
      keywords: 'electrical articles, safety advice, expert tips, home maintenance, knowledge base'
    },
    '/gallery': {
      title: 'Electrical Hazard Visual Gallery',
      desc: 'Hazard gallery visualizes real electrical dangers. Learn to identify brunt outlets, exposed wiring, and dangerous plugs to prevent future accidents.',
      type: 'ImageGallery',
      keywords: 'hazard gallery, electrical dangers, burnt outlet, exposed wire, visual guide'
    },
    '/downloads': {
      title: 'Free Safety Checklist Downloads',
      desc: 'Safety checklists and templates for free. Download printable PDF audits, panel labels, and maintenance logs to keep your home electrical system safe.',
      type: 'CollectionPage',
      keywords: 'safety checklists, PDF download, audit templates, maintenance log, printable guides'
    },
    '/legal': {
      title: 'Legal Information & Privacy Policy',
      desc: 'Privacy Policy and Terms of Use for ElectroSafe.homes. We are committed to protecting your data while providing critical safety information.',
      type: 'WebPage',
      keywords: 'privacy policy, terms of use, legal info, disclaimer'
    },
    '/contact': {
      title: 'Contact Us - Support & Feedback',
      desc: 'Contact us for support or to share your story. We value your feedback on our electrical safety tools and guides to help protect more homes globally.',
      type: 'ContactPage',
      keywords: 'contact us, support, feedback, get in touch'
    },
    '/about': {
      title: 'About ElectroSafe - Our Mission',
      desc: 'Learn about ElectroSafe.homes and our mission to democratize electrical safety knowledge. Expert-led, standards-compliant, and free for everyone.',
      type: 'AboutPage',
      keywords: 'about us, mission, electrical safety, anil sharma, reliability'
    },
    '/emergency': {
      title: 'Electrical Fire & Shock Emergency',
      desc: 'Emergency protocol for electrical fires and shocks. Immediate life-saving steps to isolate power and call for help during an electrical crisis.',
      type: 'MedicalWebPage',
      keywords: 'electrical emergency, fire protocol, electric shock, first aid, emergency steps'
    },
    '/score': {
      title: 'Home Safety Score Card',
      desc: 'View and share your home electrical safety score. Challenge friends and family to check their own home safety.',
      type: 'WebPage',
      keywords: 'home safety score, electrical safety score, share safety score, home safety check'
    },
    '/challenge': {
      title: 'Home Safety Challenge',
      desc: 'Your friend challenged you! Can your home beat their safety score? Take the free electrical safety check.',
      type: 'WebPage',
      keywords: 'home safety challenge, beat the score, electrical safety quiz, safety challenge'
    },
    '/room-audit': {
      title: 'Room-by-Room Electrical Safety Audit',
      desc: 'Free printable room-by-room home electrical safety checklist. Kitchen, Bathroom, Bedroom, Garage and Outdoor inspection guide.',
      type: 'HowTo',
      keywords: 'room safety audit, kitchen electrical safety, bathroom wiring, home inspection checklist'
    },
    '/glossary': {
      title: 'Electrical Safety Glossary — 40+ Terms Explained Simply',
      desc: 'Plain-English definitions of electrical safety terms: GFCI, RCD, MCB, AFCI, earthing, arc fault, voltage drop and more.',
      type: 'WebPage',
      keywords: 'electrical glossary, GFCI definition, RCD meaning, MCB explained, electrical terms'
    },
    '/is-it-safe': {
      title: 'Is It Safe To...? — Home Electrical Safety Q&A',
      desc: 'Quick answers to 24+ common home electrical safety questions. Extension cords, phone charging, heaters, storms, and more.',
      type: 'FAQPage',
      keywords: 'is it safe, extension cord safe, phone charging safety, heater safety, electrical Q&A'
    },
    '/bill-detector': {
      title: 'Electricity Bill Spike Detector — Why Is My Bill High?',
      desc: 'Find out why your electricity bill spiked suddenly. Enter last 3 months of bills to identify the likely electrical cause.',
      type: 'SoftwareApplication',
      keywords: 'electricity bill spike, high electricity bill, bill increase reason, electrical bill calculator'
    },
    '/my-home': {
      title: 'My Home Safety Hub — Personal Safety Checklist',
      desc: 'Track your home electrical safety with our 28-item checklist. Save progress, earn badges, and see your safety streak.',
      type: 'WebPage',
      keywords: 'home safety checklist, safety progress tracker, electrical safety dashboard, safety badges'
    },
    '/landlords': {
      title: 'Electrical Safety for Landlords & Property Managers',
      desc: 'Free landlord electrical safety resources: safety badge, printable tenant safety letter, and compliance inspection guides.',
      type: 'WebPage',
      keywords: 'landlord electrical safety, rental property safety, tenant safety letter, EICR landlord'
    },
    '/stories': {
      title: 'Real Home Electrical Safety Near-Miss Stories',
      desc: 'Real stories from homeowners who avoided electrical fires, shocks, and hazards using ElectroSafe.homes.',
      type: 'WebPage',
      keywords: 'electrical safety stories, near miss, home fire prevention, electrical hazard story'
    },
    '/safety/india': {
      title: 'Home Electrical Safety Guide for India — IS 732, RCCB, Monsoon Safety',
      desc: 'Complete electrical safety guide for Indian homes. IS 732, RCCB, monsoon safety, inverter battery, BEE ratings, and emergency numbers.',
      type: 'WebPage',
      keywords: 'home electrical safety India, IS 732, RCCB India, monsoon electrical safety, BEE star rating'
    },
    '/safety/usa': {
      title: 'Home Electrical Safety Guide for USA — NEC, GFCI, AFCI',
      desc: 'Complete electrical safety guide for US homes. NEC 2023, AFCI and GFCI requirements, aluminum wiring risks, panel upgrades.',
      type: 'WebPage',
      keywords: 'home electrical safety USA, NEC 2023, AFCI breaker, GFCI outlet, electrical panel upgrade'
    },
    '/safety/uk': {
      title: 'Home Electrical Safety Guide for UK — BS 7671, EICR, RCD',
      desc: 'Complete electrical safety guide for UK homes. BS 7671, Part P, EICR requirements, consumer unit safety, bathroom zone rules.',
      type: 'WebPage',
      keywords: 'home electrical safety UK, BS 7671, EICR report, Part P, RCD protection, consumer unit'
    },
    // Phase 6 Global Calculators
    '/solar-roi-calculator': {
      title: 'Solar ROI & Panel Ready Check Calculator',
      desc: 'Calculate solar panel payback period, annual savings, CO₂ reduction, and check if your electrical panel can safely handle solar. IEC 62446 & NEC 690.',
      type: 'SoftwareApplication',
      keywords: 'solar ROI calculator, solar payback period, solar panel savings, CO2 reduction solar, panel ready check'
    },
    '/ev-charging-cost-calculator': {
      title: 'EV Charging Cost Comparison — Home vs Public vs Petrol',
      desc: 'Compare annual costs of home EV charging, public charging, and petrol/gas vehicles. Calculate CO₂ savings. Based on SAE J1772 & IEC 61851.',
      type: 'SoftwareApplication',
      keywords: 'EV charging cost, home charging vs public, EV vs petrol cost, electric vehicle savings'
    },
    '/ghost-power-calculator': {
      title: 'Ghost Power Standby Cost Finder — IEC 62301',
      desc: 'Discover how much your smart home devices cost in phantom standby power. 22-device library with IEC 62301-measured standby values.',
      type: 'SoftwareApplication',
      keywords: 'phantom load calculator, standby power cost, ghost electricity, vampire power, smart home standby'
    },
    '/dryer-vent-fire-risk-calculator': {
      title: 'Dryer Vent Fire Probability Meter — NFPA Data',
      desc: '5-question lint fire risk assessment with compound multipliers. 34% of dryer fires caused by lint buildup. Based on NFPA 211.',
      type: 'SoftwareApplication',
      keywords: 'dryer vent fire risk, lint fire probability, dryer vent cleaning, NFPA dryer safety'
    },
    '/wfh-load-audit': {
      title: 'Work-From-Home Circuit Load Auditor',
      desc: 'Check if your home office overloads the bedroom circuit. Live gauge with 27-device library. Based on NEC 210.23 & IEC 60884.',
      type: 'SoftwareApplication',
      keywords: 'WFH circuit overload, home office electrical, bedroom circuit capacity, work from home power'
    },
    '/appliance-life-expectancy-calculator': {
      title: 'Appliance Life Expectancy & Efficiency Gauge',
      desc: 'Check if your appliance is past its lifespan, losing efficiency, or becoming a safety hazard. 20+ appliances with ENERGY STAR data.',
      type: 'SoftwareApplication',
      keywords: 'appliance lifespan calculator, appliance efficiency, when to replace appliance, ENERGY STAR lifespan'
    },
    '/lightning-strike-calculator': {
      title: 'Lightning Strike Probability Calculator — IEC 62305',
      desc: 'Calculate lightning strike probability using IEC 62305-2 collection area formula. Includes surge protector ROI analysis.',
      type: 'SoftwareApplication',
      keywords: 'lightning strike calculator, probability of lightning strike, surge protector ROI, IEC 62305 calculator'
    },
    '/holiday-lights': {
      title: 'Holiday Lights Safety Planner — Circuit Capacity Calculator',
      desc: 'Calculate how many holiday light strings your circuit can handle. LED vs incandescent comparison. Based on UL 588 & NEC.',
      type: 'SoftwareApplication',
      keywords: 'holiday lights calculator, Christmas lights circuit, LED vs incandescent, max light strings'
    },
  };

  /* Restore necessary variable declarations */
  // Dynamic Metadata Lookup for Articles
  const getDynamicData = () => {
    if (location.pathname.startsWith('/articles/')) {
      const parts = location.pathname.split('/').filter(p => p);
      const slug = parts[parts.length - 1]; // Robustly get the last segment
      const article = ARTICLES.find(a => a.slug === slug);
      if (article) {
        return {
          title: article.seoTitle || article.title,
          desc: article.metaDescription || article.excerpt,
          type: 'Article',
          keywords: article.keywords ? article.keywords.join(', ') : 'electrical safety, home wiring',
          image: undefined
        };
      }
    }
    return null;
  };

  const dynamicData = getDynamicData();
  const data = dynamicData || routeData[location.pathname] || routeData['/'];
  const fullTitle = dynamicData ? `${data.title} | ElectroSafe.homes` : `${data.title} | ElectroSafe.homes`;

  // Canonical URL - Remove query parameters for SEO
  const canonicalUrl = `https://electrosafe.homes${location.pathname}`;

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": data.type || "WebPage",
    "name": fullTitle,
    "description": data.desc,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "ElectroSafe.homes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://electrosafe.homes/logo.png"
      }
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ElectroSafe.homes",
    "image": "https://electrosafe.homes/logo.png",
    "description": "Professional electrical safety guides and tools for homeowners.",
    "email": "0808miracle@gmail.com",
    "url": "https://electrosafe.homes",
    "priceRange": "$$"
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Anil Sharma",
    "jobTitle": "Electrical Reliability Expert",
    "url": "https://electrosafe.homes/about",
    "sameAs": [
      "https://designcalculators.co.in",
      "https://reliabilitytools.co.in"
    ],
    "description": "Expert in industrial electrical maintenance and reliability engineering with 25+ years of experience."
  };

  useEffect(() => {
    // Google Analytics Page View Tracking
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-D9L2WJRB5N', {
        page_path: location.pathname + location.search
      });
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 font-sans">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={data.desc} />
        <meta name="keywords" content={data.keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={data.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={data.image || "https://electrosafe.homes/logo.png"} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={data.desc} />
        <meta name="twitter:image" content={data.image || "https://electrosafe.homes/logo.png"} />

        {/* Organization & Base Schema */}
        <script type="application/ld+json">
          {JSON.stringify(baseSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow">
        {children}
      </main>
      <ReturnVisitModal />
      <ExitIntentModal />
      <EmergencyButton />
      <MobileTabBar />
      <Footer />
    </div>
  );
};
