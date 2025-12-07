import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Calculator, 
  AlertTriangle, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Zap, 
  Flame, 
  CheckCircle2,
  Download,
  BookOpen,
  UserCheck,
  Hammer,
  Eye,
  DollarSign,
  Wifi,
  X,
  Search,
  Maximize,
  Lightbulb,
  CloudLightning,
  Baby,
  Activity,
  BatteryCharging,
  Star,
  Quote
} from 'lucide-react';
import { HAZARD_GALLERY } from '../data';

export const Home = () => {
  const [showRentModal, setShowRentModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION: High Trust, Global Appeal */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-20 pt-24 md:pt-32 lg:pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 animate-fade-in">
          
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Globe className="w-3.5 h-3.5" />
              110V & 230V Compatible
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/40 border border-green-500/30 text-green-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              IEC / IEEE Standards Aligned
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight animate-slide-up delay-100">
            Protect Your Home <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400">
               From Hidden Dangers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed animate-slide-up delay-200">
            The universal guide to electrical safety. We translate complex engineering codes into simple actions to <span className="text-white font-medium">prevent fires</span>, <span className="text-white font-medium">avoid shocks</span>, and <span className="text-white font-medium">lower your bills</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-4 animate-slide-up delay-300 mb-16">
            <Link 
              to="/assessment" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20 w-full sm:w-auto"
            >
              Start Free Safety Check
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/risk-predictor" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-semibold rounded-2xl text-lg transition-all hover:scale-105 w-full sm:w-auto"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Analyze Symptoms
            </Link>
          </div>

          {/* Social Proof / Trust Indicators */}
          <div className="animate-slide-up delay-400 flex flex-col items-center gap-4">
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Empowering Safety In</p>
             <div className="flex flex-wrap justify-center items-center gap-6 opacity-80 hover:opacity-100 transition-all duration-500">
                 <div className="flex items-center gap-2 text-gray-400 font-bold" title="United States">
                    <span className="text-2xl">🇺🇸</span> <span className="hidden sm:inline">USA</span>
                 </div>
                 <div className="flex items-center gap-2 text-gray-400 font-bold" title="European Union">
                    <span className="text-2xl">🇪🇺</span> <span className="hidden sm:inline">EU</span>
                 </div>
                 <div className="flex items-center gap-2 text-gray-400 font-bold" title="India">
                    <span className="text-2xl">🇮🇳</span> <span className="hidden sm:inline">India</span>
                 </div>
                  <div className="flex items-center gap-2 text-gray-400 font-bold" title="United Kingdom">
                    <span className="text-2xl">🇬🇧</span> <span className="hidden sm:inline">UK</span>
                 </div>
                 <div className="flex items-center gap-2 text-gray-400 font-bold" title="Australia">
                    <span className="text-2xl">🇦🇺</span> <span className="hidden sm:inline">Aus</span>
                 </div>
             </div>
             <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium border-t border-white/5 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> No Sign-Up
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Free
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Local Storage Privacy
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE BENTO GRID: Core Tools */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Master Your Home's Safety</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We've digitized professional electrical logic into simple tools anyone can use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Main Feature: Assessment (Large) */}
            <Link to="/assessment" className="group md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between animate-slide-up delay-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl mb-6 shadow-lg shadow-blue-200">
                  <ClipboardCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Self-Assessment Tool</h3>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                  The gold standard 25-point check. Rate your home's wiring, outlets, and habits to get a precise safety score.
                </p>
              </div>
              <div className="relative z-10 flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                Start Audit <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            {/* Risk Predictor (Medium - Alert Style) */}
            <Link to="/risk-predictor" className="group md:col-span-1 lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-red-900/20 transition-all relative overflow-hidden animate-slide-up delay-200">
               <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Flame className="w-40 h-40 translate-x-10 translate-y-10" />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-red-500 rounded-lg">
                     <AlertTriangle className="w-6 h-6 text-white" />
                   </div>
                   <span className="font-bold text-red-400 uppercase tracking-wider text-sm">Diagnosis Tool</span>
                 </div>
                 <h3 className="text-2xl font-bold mb-2">Risk Predictor</h3>
                 <p className="text-gray-400 text-sm">Smell burning? Flickering lights? Use our AI-logic to analyze symptoms instantly.</p>
               </div>
            </Link>

            {/* Load Calculator (Medium) */}
            <Link to="/load-calc" className="group md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all animate-slide-up delay-300">
              <div className="p-2 bg-green-100 w-fit rounded-xl mb-4 group-hover:bg-green-200 transition-colors">
                <Calculator className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bill Estimator</h3>
              <p className="text-sm text-gray-500">Calculate costs & prevent overloads.</p>
            </Link>

            {/* Protection Guide (Medium) */}
            <Link to="/protection-guide" className="group md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all animate-slide-up delay-300">
              <div className="p-2 bg-purple-100 w-fit rounded-xl mb-4 group-hover:bg-purple-200 transition-colors">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Breaker Guide</h3>
              <p className="text-sm text-gray-500">Find the right GFCI & MCB protection.</p>
            </Link>
            
             {/* New Hardware Guide (Medium) */}
            <Link to="/hardware" className="group md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all animate-slide-up delay-300">
              <div className="p-2 bg-orange-100 w-fit rounded-xl mb-4 group-hover:bg-orange-200 transition-colors">
                <Zap className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Parts Guide</h3>
              <p className="text-sm text-gray-500">Learn about MCBs, wires & switches.</p>
            </Link>

            {/* Article/Learn (Wide) */}
            <Link to="/articles" className="group md:col-span-3 lg:col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-8 border border-blue-100 hover:border-blue-200 transition-all flex flex-col md:flex-row items-center justify-between gap-6 animate-slide-up delay-400">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                  <BookOpen className="w-5 h-5" /> Knowledge Base
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Learn to speak "Electrician"</h3>
                <p className="text-gray-600">Read our library of 20+ articles covering everything from childproofing outlets to understanding grounding.</p>
              </div>
              <div className="flex-shrink-0">
                 <div className="bg-white px-6 py-3 rounded-xl font-bold text-gray-800 shadow-sm group-hover:scale-105 transition-transform flex items-center gap-2">
                   Read Articles <ArrowRight className="w-4 h-4" />
                 </div>
              </div>
            </Link>

          </div>
        </div>
      </section>
      
      {/* 2.5 NEW: Building a New Home Banner */}
      <section className="py-2 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/new-home" className="group block bg-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gray-700 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase mb-4 border border-yellow-500/30">
                            <Hammer className="w-3 h-3" /> Blueprint for Perfection
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Building a New Home?</h2>
                        <p className="text-gray-300 text-lg max-w-xl">
                            Don't let contractors cut corners. Get our free "Master Plan" for electrical layout, quality checks, and future-proofing your dream home.
                        </p>
                    </div>
                    <div className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 group-hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
                        Open Master Plan <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
            </Link>
        </div>
      </section>

      {/* 2.6 NEW: EVERYDAY SOLUTIONS (HOOKS) */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Everyday Electrical Dilemmas</h2>
              <p className="text-gray-600 mt-2 text-lg">Simple tools for the questions you ask yourself at the supermarket or during a storm.</p>
            </div>
            <Link to="/everyday-safety" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:underline">
              View All Life Hacks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/everyday-safety', { state: { tab: 'lightbulb' } })} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Lightbulb Guide</h3>
              <p className="text-sm text-gray-500 mt-2">Warm vs Cool White? Find the perfect light for every room.</p>
            </button>

            <button 
              onClick={() => navigate('/everyday-safety', { state: { tab: 'storm' } })}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CloudLightning className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Storm Protocol</h3>
              <p className="text-sm text-gray-500 mt-2">Shower during thunder? What to unplug when lightning strikes?</p>
            </button>

            <button 
              onClick={() => navigate('/everyday-safety', { state: { tab: 'baby' } })}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
               <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Baby className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Baby Proofing</h3>
              <p className="text-sm text-gray-500 mt-2">Why plastic plugs are dangerous choke hazards. Use TRR instead.</p>
            </button>

             <button 
              onClick={() => navigate('/everyday-safety', { state: { tab: 'firstaid' } })}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Shock First Aid</h3>
              <p className="text-sm text-gray-500 mt-2">Got a 'zing' from the fridge? Medical steps to take immediately.</p>
            </button>
          </div>
          
           <div className="mt-8 md:hidden text-center">
            <Link to="/everyday-safety" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">
              View All Safety Hacks
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TARGETED AUDIENCE (Students/Tenants) */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            
            <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 bg-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-700">Renters • Students • Flatmates</div>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">Don't Sign That Lease Yet.</h2>
              <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                Most tenants ignore electricals until it's too late. Avoid high bills, shocks, and arguments with your landlord by checking these things <strong>before</strong> you move in.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowRentModal(true)}
                  className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Eye className="w-5 h-5" /> Inspect Before You Rent
                </button>
                <Link to="/tenant-request" className="bg-indigo-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition border border-indigo-700 flex items-center justify-center gap-2">
                  <UserCheck className="w-5 h-5" /> Report Issue (Already Moved In)
                </Link>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="md:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/20 transition">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-4 text-white">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Avoid "Fixed Bill" Scams</h3>
                  <p className="text-sm text-indigo-200">Our checklist helps you identify shared meters vs sub-meters.</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/20 transition">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-4 text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Spot "Dead" Sockets</h3>
                  <p className="text-sm text-indigo-200">Don't find out your bedside plug is broken <em>after</em> you move in.</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/20 transition sm:col-span-2">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shrink-0 text-white">
                       <Wifi className="w-5 h-5" />
                     </div>
                     <div>
                       <h3 className="font-bold text-lg">The 5-Minute Walkthrough</h3>
                       <p className="text-sm text-indigo-200">Open our "Pre-Rent Check" tool on your phone while viewing the flat.</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5 NEW: VISUAL HAZARD CHALLENGE (HOOK) */}
      <section className="py-20 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 order-2 md:order-1 relative">
                 {/* Visual Stack */}
                 <div className="relative h-80 w-full">
                    <div className="absolute top-4 left-4 w-full h-full bg-red-100 rounded-2xl transform rotate-3"></div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition duration-500 z-10">
                      <img src={HAZARD_GALLERY[2].src} className="w-full h-full object-cover" alt="Scorched Outlet" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white backdrop-blur-sm">
                        <div className="font-bold text-lg flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-400" /> Scorched Outlet
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                 <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                   Train Your Eyes
                 </div>
                 <h2 className="text-4xl font-bold text-gray-900 mb-6">Can you spot the danger?</h2>
                 <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                   Some electrical dangers are invisible. Others are staring you in the face. 
                   We've curated a gallery of common faults—from melted plugs to rodent damage—so you know exactly what to look for.
                 </p>
                 <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition shadow-lg hover:shadow-xl">
                   Enter Hazard Gallery <ArrowRight className="w-5 h-5" />
                 </Link>
              </div>
           </div>
         </div>
      </section>

      {/* 4. VALUE PROPS: Why This Matters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            
            <div className="flex flex-col items-center md:items-start animate-slide-up">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Flame className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Prevent Fire Hazards</h3>
              <p className="text-gray-600 leading-relaxed">
                Electrical malfunctions are a leading cause of home fires globally. Early detection of "hot spots" saves lives.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start animate-slide-up delay-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Improve Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                Overloaded circuits generate waste heat and damage appliances. A balanced system lasts longer and costs less.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start animate-slide-up delay-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Protect Your Family</h3>
              <p className="text-gray-600 leading-relaxed">
                From childproofing outlets to ensuring grounding works, we help you create a fail-safe environment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4.5 NEW: FEATURED INSIGHT */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Insight</h2>
           <div 
             onClick={() => navigate('/articles', { state: { id: '3' } })}
             className="cursor-pointer group block"
           >
             <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                   <BatteryCharging className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                   <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">Trending Now</div>
                   <h3 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">The Pocket Bomb: Lithium Fires</h3>
                   <p className="text-lg text-gray-300 max-w-2xl mb-8">
                     Your phone battery holds the energy of a hand grenade. Learn why they explode and how to charge them safely.
                   </p>
                   <span className="inline-flex items-center gap-2 font-bold text-orange-400 group-hover:text-orange-300">
                     Read Article <ArrowRight className="w-5 h-5" />
                   </span>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 4.6 NEW: GLOBAL COMMUNITY STORIES (TESTIMONIALS) */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Global Community Stories</h2>
            <p className="text-lg text-gray-600 mt-2">Real people preventing real hazards.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-blue-100" />
              <p className="text-gray-600 italic mb-6 relative z-10 pt-4">
                "I used the Tenant Request tool when my hostel room socket was sparking. The warden actually listened because the message looked so professional. Fixed next day!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
                <div>
                  <div className="font-bold text-gray-900">Rajesh K.</div>
                  <div className="text-xs text-gray-500">Student, Mumbai</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-green-100" />
              <p className="text-gray-600 italic mb-6 relative z-10 pt-4">
                "The Load Calculator saved me. I realized I was overloading my kitchen circuit with the air fryer and microwave. I moved them to separate plugs and the tripping stopped."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <div className="font-bold text-gray-900">Sarah M.</div>
                  <div className="text-xs text-gray-500">Homeowner, Texas</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-orange-100" />
              <p className="text-gray-600 italic mb-6 relative z-10 pt-4">
                "Building my first house was scary. The 'New Home Master Plan' helped me catch a contractor using cheap wire. This guide is literally a lifesaver."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">J</div>
                <div>
                  <div className="font-bold text-gray-900">James T.</div>
                  <div className="text-xs text-gray-500">Builder, London</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA: Downloads */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl font-bold mb-6">Take Safety Offline</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Internet down? Power out? Be prepared. Download our printable checklists and panel labels to keep near your breaker box.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/downloads" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-all w-full sm:w-auto">
               <Download className="w-5 h-5" /> Get Checklists
             </Link>
             <Link to="/gallery" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold transition-all w-full sm:w-auto">
               View Hazard Gallery
             </Link>
          </div>
        </div>
      </section>

      {/* PRE-RENTAL CHECKLIST MODAL */}
      {showRentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8">
             <div className="bg-indigo-900 text-white p-6 flex justify-between items-center">
               <div>
                 <h2 className="text-xl font-bold flex items-center gap-2">
                   <Eye className="w-5 h-5 text-green-400" /> Pre-Rental Inspection Audit
                 </h2>
                 <p className="text-indigo-200 text-xs">Do this 5-minute check BEFORE you pay the deposit.</p>
               </div>
               <button onClick={() => setShowRentModal(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 max-h-[70vh] overflow-y-auto">
               <div className="space-y-8">

                 {/* 1. CRITICAL SAFETY SECTION */}
                 <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                   <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5" /> 1. Critical Life Safety (Don't Compromise)
                   </h3>
                   <ul className="space-y-3">
                     <li className="flex gap-3 items-start">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                       <div className="text-sm">
                         <strong className="text-gray-900">The "T" Button Test (ELCB/RCCB)</strong>
                         <p className="text-gray-600 text-xs mt-1">
                           Locate main panel. Find wide breaker with "T" button. Press it. <br/>
                           <span className="font-bold text-red-600">Action:</span> It MUST trip/cut power immediately. If not, NO shock protection exists.
                         </p>
                       </div>
                     </li>
                     <li className="flex gap-3 items-start">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                       <div className="text-sm">
                         <strong className="text-gray-900">Earthing Visual Check</strong>
                         <p className="text-gray-600 text-xs mt-1">
                           Shine a light into the heavy socket (Fridge/Geyser). Can you see a copper/green wire connected to the top pin?<br/>
                           <span className="font-bold text-red-600">Warning:</span> If you see only 2 wires in a 3-pin socket, it's unsafe.
                         </p>
                       </div>
                     </li>
                   </ul>
                 </div>

                 {/* 2. FIRE FORENSICS */}
                 <div>
                   <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                     <Flame className="w-5 h-5 text-orange-500" /> 2. Fire Hazard Forensics
                   </h3>
                   <ul className="space-y-3">
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                       <div className="text-sm">
                         <strong>The "Black Spot" Check</strong>
                         <p className="text-gray-500 text-xs mt-1">Look at Kitchen/Geyser socket holes. Black/Brown scorch marks = Internal Burning.</p>
                       </div>
                     </li>
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                       <div className="text-sm">
                         <strong>Dampness Patrol</strong>
                         <p className="text-gray-500 text-xs mt-1">Check walls behind Kitchen Sink and Bathrooms. Wet patches near switches = Electrocution Risk.</p>
                       </div>
                     </li>
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                       <div className="text-sm">
                         <strong>The "Loose Switch" Wiggle</strong>
                         <p className="text-gray-500 text-xs mt-1">Wiggle the fan/light switches. Crackling sound or flickering light = Loose Wiring (Fire Risk).</p>
                       </div>
                     </li>
                   </ul>
                 </div>
                 
                 {/* 3. MONEY TRAP */}
                 <div>
                   <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                     <DollarSign className="w-5 h-5 text-green-600" /> 3. The Money & Meter Trap
                   </h3>
                   <ul className="space-y-3">
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                       <div className="text-sm">
                         <strong>Sub-Meter Hunt</strong>
                         <p className="text-gray-500 text-xs mt-1">Is there a dedicated meter for YOUR unit? If shared, demand a written calculation method.</p>
                       </div>
                     </li>
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                       <div className="text-sm">
                         <strong>Commercial vs Residential Rate</strong>
                         <p className="text-gray-500 text-xs mt-1">Ask to see a past bill. Ensure you aren't paying higher "Commercial" rates for a flat.</p>
                       </div>
                     </li>
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                       <div className="text-sm">
                         <strong>Start Reading Photo</strong>
                         <p className="text-gray-500 text-xs mt-1">Take a photo of the meter reading TODAY. Don't pay for previous tenant's usage.</p>
                       </div>
                     </li>
                   </ul>
                 </div>

                  {/* 4. UTILITY & COMFORT */}
                 <div>
                   <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                     <Maximize className="w-5 h-5 text-blue-600" /> 4. Utility Stress Test
                   </h3>
                   <ul className="space-y-3">
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                       <div className="text-sm">
                         <strong>AC Point Availability</strong>
                         <p className="text-gray-500 text-xs mt-1">Are there 16A (Large) sockets near windows? Extension cords for ACs are dangerous.</p>
                       </div>
                     </li>
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                       <div className="text-sm">
                         <strong>The "Flush" Test</strong>
                         <p className="text-gray-500 text-xs mt-1">Flush the toilet while running the tap. Check water pressure. (Low pressure kills Washing Machines).</p>
                       </div>
                     </li>
                     <li className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                       <div className="text-sm">
                         <strong>Mobile Signal Bunker</strong>
                         <p className="text-gray-500 text-xs mt-1">Close the bathroom and bedroom doors. Check signal strength. Thick walls often block signal.</p>
                       </div>
                     </li>
                   </ul>
                 </div>

               </div>
             </div>
             <div className="p-4 bg-gray-50 text-center border-t border-gray-200">
               <button onClick={() => setShowRentModal(false)} className="w-full bg-indigo-900 text-white font-bold py-3 rounded-lg hover:bg-indigo-800 transition">
                 I've Finished the Audit
               </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};