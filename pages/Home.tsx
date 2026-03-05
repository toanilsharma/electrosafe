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
import { SocialShare } from '../components/SocialShare';
import { SafetyTipOfTheDay } from '../components/SafetyTipOfTheDay';
import { SeasonalBanner } from '../components/SeasonalBanner';
import { EmbeddedQuizHook } from '../components/EmbeddedQuizHook';
import { XRaySlider } from '../components/XRaySlider';

export const Home = () => {
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

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-tight animate-slide-up delay-100">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Home Electrical Safety Guide
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 mb-6 animate-slide-up delay-100">
            Is Your Home's Wiring A Hidden Fire Hazard?
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed animate-slide-up delay-200">
            Why does your breaker keep tripping? Is that humming outlet safe? Stop guessing. We translate complex engineering codes into simple, instant safety checks.
          </p>

          {/* Redesigned Primary CTA */}
          <div className="w-full max-w-2xl mx-auto px-4 animate-slide-up delay-300 mb-12 relative z-20">
            <button
               onClick={() => navigate('/assessment')}
               className="group relative inline-flex items-center justify-center px-8 py-5 font-bold text-white bg-blue-600 rounded-full overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:scale-105 transition-all w-full sm:w-auto text-xl border border-blue-400/50"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all"></div>
              <span className="relative flex items-center gap-3">
                <ClipboardCheck className="w-7 h-7" /> Start Free 3-Minute Safety Audit
              </span>
            </button>
            <p className="text-sm text-gray-400 mt-5 font-medium flex items-center justify-center gap-2">
               <ShieldCheck className="w-4 h-4 text-green-400" /> No signup required. Based on international codes.
            </p>
          </div>

          {/* Social Proof / Trust Indicators */}
          <div className="animate-slide-up delay-400 flex flex-col items-center w-full max-w-4xl mx-auto pt-10 border-t border-white/10 mt-8">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by 50,000+ Homeowners & Renters</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-90 w-full transition-opacity hover:opacity-100">
              <div className="flex flex-col items-center text-center group">
                <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform">4.9/5</div>
                <div className="flex gap-1 text-yellow-500 mb-2">
                   <Star className="w-5 h-5 fill-current"/>
                   <Star className="w-5 h-5 fill-current"/>
                   <Star className="w-5 h-5 fill-current"/>
                   <Star className="w-5 h-5 fill-current"/>
                   <Star className="w-5 h-5 fill-current"/>
                </div>
                <div className="text-sm text-gray-400 font-medium">User Ratings</div>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform">24</div>
                <div className="text-sm text-green-400 font-bold mb-1">Free Tools</div>
                <div className="text-sm text-gray-400 font-medium">Calculators & Audits</div>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-sm text-blue-400 font-bold mb-1">IEC Aligned</div>
                <div className="text-sm text-gray-400 font-medium">Global Standards</div>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform">Zero</div>
                <div className="text-sm text-red-400 font-bold mb-1">Data Sold</div>
                <div className="text-sm text-gray-400 font-medium">Strict Local Privacy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE BENTO GRID: Core Tools */}
      <section className="bg-slate-50 dark:bg-gray-800/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">Master Your Home's Safety</h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              We've digitized professional electrical logic into simple tools anyone can use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* Main Feature: Assessment (Large) */}
            <Link to="/assessment" className="group md:col-span-2 lg:col-span-2 row-span-2 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between animate-slide-up delay-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl mb-6 shadow-lg shadow-blue-200">
                  <ClipboardCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">Is my house up to code?</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-base md:text-lg mb-6">
                  The gold standard 25-point check. Find out exactly where your home poses fire or shock risks in 3 minutes.
                </p>
              </div>
              <div className="relative z-10 flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                Start Full Audit <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            {/* Risk Predictor (Medium - Alert Style) */}
            <Link to="/electrical-hazard-risk-predictor" className="group md:col-span-1 lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-red-900/20 transition-all relative overflow-hidden animate-slide-up delay-200">
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
                <h3 className="text-2xl font-bold mb-2">Smell burning wire?</h3>
                <p className="text-gray-400 text-sm">Flickering lights? Warm outlets? Enter your symptoms to diagnose the root cause instantly.</p>
              </div>
            </Link>

            {/* Load Calculator (Medium) */}
            <Link to="/electrical-load-calculator" className="group md:col-span-1 lg:col-span-1 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all animate-slide-up delay-300">
              <div className="p-2 bg-green-100 w-fit rounded-xl mb-4 group-hover:bg-green-200 transition-colors">
                <Calculator className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Why is the bill so high?</h3>
              <p className="text-base text-gray-600 dark:text-gray-400">Calculate appliance costs & stop overloads.</p>
            </Link>

            {/* Protection Guide (Medium) */}
            <Link to="/breaker-mapper" className="group md:col-span-1 lg:col-span-1 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all animate-slide-up delay-300">
              <div className="p-2 bg-purple-100 w-fit rounded-xl mb-4 group-hover:bg-purple-200 transition-colors">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Label the Panel</h3>
              <p className="text-base text-gray-600 dark:text-gray-400">Map your breaker box visually & print labels.</p>
            </Link>

            {/* New Hardware Guide (Medium) */}
            <Link to="/quote-analyzer" className="group md:col-span-1 lg:col-span-1 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all animate-slide-up delay-300">
              <div className="p-2 bg-orange-100 w-fit rounded-xl mb-4 group-hover:bg-orange-200 transition-colors">
                <DollarSign className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Don't get scammed.</h3>
              <p className="text-base text-gray-600 dark:text-gray-400">Analyze an electrician's quote for fair pricing.</p>
            </Link>

            {/* Article/Learn (Wide) */}
            <Link to="/articles" className="group md:col-span-3 lg:col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 md:p-8 border border-blue-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-gray-600 transition-all flex flex-col md:flex-row items-center justify-between gap-6 animate-slide-up delay-400">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                  <BookOpen className="w-5 h-5" /> Knowledge Base
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">Learn to speak "Electrician"</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Read our library of 20+ articles covering everything from childproofing outlets to understanding grounding.</p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 px-6 py-3 rounded-xl font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200 shadow-sm group-hover:scale-105 transition-transform flex items-center gap-2">
                  Read Articles <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 2.5 NEW: Building a New Home Banner */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
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
              <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark:text-gray-100 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 group-hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
                Open Master Plan <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 2.6 NEW: EVERYDAY SOLUTIONS (HOOKS) */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Everyday Electrical Dilemmas</h2>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 mt-2 text-lg">Simple tools for the questions you ask yourself at the supermarket or during a storm.</p>
            </div>
            <Link to="/everyday-safety" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:underline">
              View All Life Hacks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/everyday-safety', { state: { tab: 'lightbulb' } })}
              className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl">Lightbulb Guide</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-2">Warm vs Cool White? Find the perfect light for every room.</p>
            </button>

            <button
              onClick={() => navigate('/everyday-safety', { state: { tab: 'storm' } })}
              className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CloudLightning className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl">Storm Protocol</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-2">Shower during thunder? What to unplug when lightning strikes?</p>
            </button>

            <button
              onClick={() => navigate('/everyday-safety', { state: { tab: 'baby' } })}
              className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Baby className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl">Baby Proofing</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-2">Why plastic plugs are dangerous choke hazards. Use TRR instead.</p>
            </button>

            <button
              onClick={() => navigate('/everyday-safety', { state: { tab: 'firstaid' } })}
              className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-blue-100 group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl">Shock First Aid</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-2">Got a 'zing' from the fridge? Medical steps to take immediately.</p>
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
      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 bg-indigo-800 text-indigo-200 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-700">Renters & Home Buyers</div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Moving into a new place? <br className="hidden md:block" /> Check the electricals before you sign.</h2>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">Landlords and sellers often hide structural hazards. Use our diagnostic tools to uncover dangerous wiring and force them to fix it.</p>
          </div>

          <XRaySlider />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white dark:bg-gray-900 dark:bg-gray-900/20 transition">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-4 text-white">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1">Avoid "Fixed Bill" Scams</h3>
              <p className="text-sm text-indigo-200">Our checklist helps you identify shared meters vs sub-meters.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white dark:bg-gray-900 dark:bg-gray-900/20 transition">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-4 text-white">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1">Spot "Dead" Sockets</h3>
              <p className="text-sm text-indigo-200">Don't find out your bedside plug is broken after you move in.</p>
            </div>
            <Link to="/tenant-demand" className="group bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/30 hover:bg-red-500/20 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-red-300">Renters' Revenge</h3>
              <p className="text-sm text-indigo-200">Generate a Notice of Hazard to force your landlord to fix code violations.</p>
            </Link>
          </div>

        </div>
      </section>

      {/* 3.5 NEW: VISUAL HAZARD CHALLENGE (HOOK) */}
      <EmbeddedQuizHook />

      {/* 4. VALUE PROPS: Why This Matters */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

            <div className="flex flex-col items-center md:items-start animate-slide-up">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Flame className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Prevent Fire Hazards</h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                Electrical malfunctions are a leading cause of home fires globally. Early detection of "hot spots" saves lives.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start animate-slide-up delay-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Improve Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                Overloaded circuits generate waste heat and damage appliances. A balanced system lasts longer and costs less.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start animate-slide-up delay-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">Protect Your Family</h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                From childproofing outlets to ensuring grounding works, we help you create a fail-safe environment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEASONAL SAFETY ALERT */}
      <SeasonalBanner />

      {/* 4.5 NEW: FEATURED INSIGHT */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-8">Featured Insight</h2>
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

      {/* DAILY SAFETY TIP */}
      <SafetyTipOfTheDay />

      {/* 4.6 NEW: GLOBAL COMMUNITY STORIES (TESTIMONIALS) */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-gray-800/50 border-t border-slate-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Global Community Stories</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400 mt-2">Real people preventing real hazards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-blue-100" />
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 italic mb-6 relative z-10 pt-4">
                "I used the Tenant Request tool when my hostel room socket was sparking. The warden actually listened because the message looked so professional. Fixed next day!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Rajesh K.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Student, Mumbai</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-green-100" />
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 italic mb-6 relative z-10 pt-4">
                "The Load Calculator saved me. I realized I was overloading my kitchen circuit with the air fryer and microwave. I moved them to separate plugs and the tripping stopped."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Sarah M.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Homeowner, Texas</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-orange-100" />
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 italic mb-6 relative z-10 pt-4">
                "Building my first house was scary. The 'New Home Master Plan' helped me catch a contractor using cheap wire. This guide is literally a lifesaver."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">J</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">James T.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Builder, London</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA: Downloads */}
      <section className="bg-slate-900 text-white py-20 md:py-28 border-t border-slate-800">
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

      {/* Deleted MODAL Section - Using Inline XRay Instead */}

    </div>
  );
};