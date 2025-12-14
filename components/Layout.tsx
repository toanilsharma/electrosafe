
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Zap, ShieldCheck, Search, ChevronRight, AlertOctagon,
  ChevronDown, Calculator, ClipboardCheck, AlertTriangle, UserCheck,
  Hammer, BookOpen, PenTool, Image, Download, Mail, Globe, Map, LifeBuoy
} from 'lucide-react';
import { ARTICLES, APPLIANCES, ROOMS, HAZARD_GALLERY } from '../data';

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
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`}
      >
        <Icon className="w-4 h-4" />
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-2 space-y-1">
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className={`mt-1 p-2 rounded-lg ${item.colorBg} ${item.colorText}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm group-hover:text-blue-600">{item.name}</div>
                  <div className="text-xs text-gray-500 leading-tight mt-0.5">{item.desc}</div>
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

      { type: 'Tool', title: 'Load Calculator', path: '/load-calc', sub: 'Tool' },
      { type: 'Tool', title: 'Safety Assessment', path: '/assessment', sub: 'Audit' },
      { type: 'Tool', title: 'Risk Predictor', path: '/risk-predictor', sub: 'Diagnosis' },
      { type: 'Tool', title: 'Tenant Request', path: '/tenant-request', sub: 'Generator' },
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
    { name: 'Self Assessment', path: '/assessment', icon: ClipboardCheck, desc: '25-point safety audit', colorBg: 'bg-blue-100', colorText: 'text-blue-600' },
    { name: 'Load Calculator', path: '/load-calc', icon: Calculator, desc: 'Bill & load estimator', colorBg: 'bg-green-100', colorText: 'text-green-600' },
    { name: 'Risk Predictor', path: '/risk-predictor', icon: AlertTriangle, desc: 'Diagnose symptoms', colorBg: 'bg-red-100', colorText: 'text-red-600' },
    { name: 'Tenant Request', path: '/tenant-request', icon: UserCheck, desc: 'Fix-it generator', colorBg: 'bg-purple-100', colorText: 'text-purple-600' },
  ];

  const guidesMenu = [
    { name: 'New Home Guide', path: '/new-home', icon: Hammer, desc: 'Construction master plan', colorBg: 'bg-orange-100', colorText: 'text-orange-600' },
    { name: 'Hardware Guide', path: '/hardware', icon: Zap, desc: 'MCB, Wires, Switch specs', colorBg: 'bg-yellow-100', colorText: 'text-yellow-600' },
    { name: 'Protection Guide', path: '/protection-guide', icon: ShieldCheck, desc: 'Breaker selection', colorBg: 'bg-teal-100', colorText: 'text-teal-600' },
  ];

  const learnMenu = [
    { name: 'Everyday Toolkit', path: '/everyday-safety', icon: LifeBuoy, desc: 'Life hacks & easy guides', colorBg: 'bg-cyan-100', colorText: 'text-cyan-600' },
    { name: 'Articles', path: '/articles', icon: BookOpen, desc: 'Expert knowledge base', colorBg: 'bg-gray-100', colorText: 'text-gray-600' },
    { name: 'Appliances', path: '/appliances', icon: PenTool, desc: 'Specific device safety', colorBg: 'bg-pink-100', colorText: 'text-pink-600' },
    { name: 'Room Guides', path: '/rooms', icon: Map, desc: 'Kitchen, Bath, etc.', colorBg: 'bg-indigo-100', colorText: 'text-indigo-600' },
    { name: 'Hazard Gallery', path: '/gallery', icon: Image, desc: 'Visual examples', colorBg: 'bg-rose-100', colorText: 'text-rose-600' },
  ];

  // Don't show Navbar/Footer on Emergency Page
  if (location.pathname === '/emergency') return null;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 no-print border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                ElectroSafe<span className="text-blue-600">.homes</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavDropdown title="Smart Tools" items={toolsMenu} icon={Calculator} />
            <NavDropdown title="Master Guides" items={guidesMenu} icon={Hammer} />
            <NavDropdown title="Knowledge Base" items={learnMenu} icon={BookOpen} />

            <Link to="/downloads" className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              <Download className="w-4 h-4" /> Downloads
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center lg:hidden gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 animate-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search articles, appliances, hazards..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-3 top-2.5 px-2 py-1 text-xs bg-gray-100 rounded text-gray-500 hover:bg-gray-200"
              >
                ESC
              </button>
            </div>

            {searchQuery && (
              <div className="mt-4 max-h-64 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 custom-scrollbar">
                {getSearchResults().length === 0 ? (
                  <div className="p-4 text-gray-500 text-center">No results found for "{searchQuery}"</div>
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
                      className="w-full text-left p-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 flex justify-between items-center group"
                    >
                      <div>
                        <div className="font-bold text-gray-800 group-hover:text-blue-700">{res.title}</div>
                        <div className="text-xs text-gray-500">{res.type} • {res.sub}</div>
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
        <div className="lg:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[80vh]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Tools</div>
            {toolsMenu.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Guides</div>
            {guidesMenu.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Learn</div>
            {learnMenu.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/downloads"
              onClick={() => setIsMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50 mt-4 border border-green-200 text-center"
            >
              Download Checklists
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
    <div className="bg-gray-50 border-b border-gray-200 py-2 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 flex items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={name}>
              <span className="mx-2 text-gray-300">/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">{formatName(name)}</span>
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
          <div className="md:col-span-5">
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

          {/* Column 2: Legal & Company (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Company & Legal</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Credits (4 cols) */}
          <div className="md:col-span-4">
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

              <div className="pt-6 mt-6 border-t border-zinc-800">
                <Link to="/emergency" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-bold transition-colors">
                  <AlertOctagon className="w-4 h-4" /> Emergency Protocol
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} ElectroSafe.homes. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">
            For educational purposes only. Always consult a certified professional.
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
  const routeData: Record<string, { title: string; desc: string; type?: string; keywords: string }> = {
    '/': {
      title: 'Electrical Safety Guide: Protect Your Home & Family Global',
      desc: 'Electrical safety is critical. Discover our expert guide on home protection, hazard prevention, and daily safety tools for homeowners worldwide.',
      type: 'WebSite',
      keywords: 'electrical safety, home protection, fire prevention, shock hazards, electrical guide'
    },
    '/assessment': {
      title: 'Assessment Tool: Rate Your Home Electrical Safety Score',
      desc: 'Assessment tool for home safety. Identify fire risks and shock hazards in minutes with our comprehensive 25-point global electrical safety audit.',
      type: 'SoftwareApplication',
      keywords: 'safety audit, home inspection, electrical checklist, fire risk assessment, shock hazard'
    },
    '/load-calc': {
      title: 'Load Calculator: Estimate Home Amps & Prevent Overloads',
      desc: 'Load calculator for preventing electrical fires. accurately estimate your household kW usage and Amps to ensure your wiring is never overloaded.',
      type: 'SoftwareApplication',
      keywords: 'load calculator, amperage estimate, wattage calculator, prevent overload, electrical design'
    },
    '/protection-guide': {
      title: 'Circuit Protection Guide: Breakers, GFCI & RCD Safety',
      desc: 'Circuit protection is your first line of defense. Learn how to select the right miniature circuit breakers, GFCIs, and RCDs for your specific needs.',
      type: 'HowTo',
      keywords: 'circuit breakers, GFCI, RCD, electrical protection, safety switches, fuse box'
    },
    '/risk-predictor': {
      title: 'Risk Predictor: Diagnose Electrical Fire & Shock Hazards',
      desc: 'Risk predictor tool analyzes symptoms like burning smells or flickering lights. Diagnose hidden electrical fire and shock hazards before failure.',
      type: 'MedicalWebPage',
      keywords: 'electrical diagnosis, fire hazard, flickering lights, burning smell, troubleshooting'
    },
    '/tenant-request': {
      title: 'Tenant Request Generator: Report Repairs to Landlords',
      desc: 'Tenant request generator helps you get repairs fast. Create professional, safety-focused maintenance emails for landlords to fix hazards quickly.',
      type: 'SoftwareApplication',
      keywords: 'tenant rights, repair request, landlord letter, maintenance issue, rental safety'
    },
    '/appliances': {
      title: 'Appliance Safety Guides: ACs, Heaters & EV Charger Tips',
      desc: 'Appliance safety guides for high-power devices. Learn correct usage and installation for Air Conditioners, Heaters, EV Chargers, and home wiring.',
      type: 'CollectionPage',
      keywords: 'appliance safety, AC installation, heater safety, EV charger, high power devices'
    },
    '/rooms': {
      title: 'Room Safety Checklists: Kitchen, Bathroom & Outdoor Tips',
      desc: 'Room safety checklists ensure every corner of your home is secure. Explore detailed electrical guides for Kitchens, Bathrooms, Garages, and Outdoors.',
      type: 'CollectionPage',
      keywords: 'kitchen safety, bathroom electrical, outdoor wiring, garage safety, room checklist'
    },
    '/hardware': {
      title: 'Electrical Hardware Guide: MCBs, Wires & Switches Encyclopedia',
      desc: 'Electrical hardware guide for homeowners. identifying the right MCBs, wire gauges, and switches is crucial for a safe and compliant home installation.',
      type: 'Article',
      keywords: 'electrical hardware, wire gauge, MCB types, switches, electrical components'
    },
    '/new-home': {
      title: 'New Home Electrical Plan: Construction & Safety Guide Master',
      desc: 'New home electrical planning made simple. Follow our master guide for socket placement, wiring standards, procurement, and quality safety checks.',
      type: 'Article',
      keywords: 'new home wiring, electrical plan, construction guide, socket placement, wiring standards'
    },
    '/everyday-safety': {
      title: 'Everyday Safety Toolkit: Lightbulbs, Outages & First Aid',
      desc: 'Everyday safety toolkit for non-experts. Access our lightbulb guide, power outage detective, and shock first aid protocols to stay safe daily.',
      type: 'SoftwareApplication',
      keywords: 'everyday safety, power outage, first aid, lightbulb guide, child safety'
    },
    '/articles': {
      title: 'Safety Articles: Expert Electrical Advice & Knowledge Base',
      desc: 'Safety articles and expert advice on preventing electrical fires. consistent maintenance and knowledge are key to childproofing and home wiring.',
      type: 'CollectionPage',
      keywords: 'electrical articles, safety advice, expert tips, home maintenance, knowledge base'
    },
    '/gallery': {
      title: 'Hazard Gallery: Visual Guide to Real Electrical Dangers',
      desc: 'Hazard gallery visualizes real electrical dangers. Learn to identify brunt outlets, exposed wiring, and dangerous plugs to prevent future accidents.',
      type: 'ImageGallery',
      keywords: 'hazard gallery, electrical dangers, burnt outlet, exposed wire, visual guide'
    },
    '/downloads': {
      title: 'Safety Checklists: Free PDF Downloads & Audit Templates',
      desc: 'Safety checklists and templates for free. Download printable PDF audits, panel labels, and maintenance logs to keep your home electrical system safe.',
      type: 'CollectionPage',
      keywords: 'safety checklists, PDF download, audit templates, maintenance log, printable guides'
    },
    '/legal': {
      title: 'Privacy Policy & Terms: ElectroSafe Legal Information Page',
      desc: 'Privacy Policy and Terms of Use for ElectroSafe.homes. We are committed to protecting your data while providing critical safety information.',
      type: 'WebPage',
      keywords: 'privacy policy, terms of use, legal info, disclaimer'
    },
    '/contact': {
      title: 'Contact Us: Support, Feedback & Safety Story Submission',
      desc: 'Contact us for support or to share your story. We value your feedback on our electrical safety tools and guides to help protect more homes globally.',
      type: 'ContactPage',
      keywords: 'contact us, support, feedback, get in touch'
    },
    '/emergency': {
      title: 'Emergency Protocol: Electrical Fire & Shock First Aid Steps',
      desc: 'Emergency protocol for electrical fires and shocks. Immediate life-saving steps to isolate power and call for help during an electrical crisis.',
      type: 'MedicalWebPage',
      keywords: 'electrical emergency, fire protocol, electric shock, first aid, emergency steps'
    }
  };

  /* Restore necessary variable declarations */
  const data = routeData[location.pathname] || routeData['/'];
  const fullTitle = `${data.title} | ElectroSafe.homes`;

  // Canonical URL - Remove query parameters for SEO
  const canonicalUrl = window.location.origin + location.pathname;

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
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
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
        <meta property="og:image" content="https://electrosafe.homes/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={data.desc} />
        <meta name="twitter:image" content="https://electrosafe.homes/logo.png" />

        {/* Organization & Base Schema */}
        <script type="application/ld+json">
          {JSON.stringify(baseSchema)}
        </script>
      </Helmet>

      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow">
        {children}
      </main>
      <EmergencyButton />
      <Footer />
    </div>
  );
};
