import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, ArrowRight, RotateCcw, Zap, Home as HomeIcon, AlertTriangle, CheckCircle2, Calculator, Info } from 'lucide-react';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { RelatedTools } from '../components/RelatedTools';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_QUESTIONS = [
  {
    question: "Do you know where your main circuit breaker / fuse box is?",
    options: [
      { text: "Yes, I can find it in seconds", score: 0 },
      { text: "Somewhere in the house, not sure", score: 3 },
      { text: "No idea", score: 5 },
    ],
    insight: "In an emergency, you need to cut power in under 30 seconds. Know your panel location.",
  },
  {
    question: "Have you ever noticed a burning or fishy smell near outlets or switches?",
    options: [
      { text: "Never", score: 0 },
      { text: "Once or twice, it went away", score: 3 },
      { text: "Yes, it happens sometimes", score: 5 },
    ],
    insight: "Chemical odor near wiring means insulation is melting — an immediate fire hazard.",
  },
  {
    question: "Do you use extension cords as permanent wiring?",
    options: [
      { text: "No, all appliances plug directly into wall sockets", score: 0 },
      { text: "One or two extensions for convenience", score: 2 },
      { text: "Yes, multiple rooms rely on extension cords", score: 5 },
    ],
    insight: "Extension cords are temporary solutions. Every connection point adds fire risk.",
  },
  {
    question: "Does your home have RCD/GFCI protection (a breaker with a 'Test' button)?",
    options: [
      { text: "Yes, and I test it monthly", score: 0 },
      { text: "I think so, but I've never tested it", score: 2 },
      { text: "No / I don't know what that is", score: 5 },
    ],
    insight: "RCD/GFCI devices prevent fatal electric shocks. Without one, there is no automatic shutoff.",
  },
  {
    question: "When was your home's wiring last inspected by a professional?",
    options: [
      { text: "Within the last 5 years", score: 0 },
      { text: "5-15 years ago", score: 2 },
      { text: "Never / Don't know / Over 15 years", score: 5 },
    ],
    insight: "Wiring insulation degrades over time. Homes over 25 years old should be inspected.",
  },
];

export const QuickQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = QUIZ_QUESTIONS.length * 5;
  const safetyPercent = Math.round(((maxScore - totalScore) / maxScore) * 100);

  const getRiskLevel = (): 'low' | 'medium' | 'high' => {
    if (totalScore <= 5) return 'low';
    if (totalScore <= 12) return 'medium';
    return 'high';
  };

  const getRating = () => {
    const level = getRiskLevel();
    if (level === 'low') return '⭐⭐⭐⭐⭐ Excellent';
    if (level === 'medium') return '⭐⭐⭐ Needs Attention';
    return '⭐ High Risk';
  };

  const handleAnswer = (score: number, optionIdx: number) => {
    setSelectedOption(optionIdx);
    setShowInsight(true);
    
    setTimeout(() => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);
      setShowInsight(false);
      setSelectedOption(null);

      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setShowInsight(false);
  };

  const progress = ((currentQ) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>Quick Safety Quiz — Is Your Home Safe? | ElectroSafe.homes</title>
        <meta name="description" content="Take our free 60-second quiz to find out if your home has hidden electrical dangers." />
      </Helmet>

      {!showResult ? (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" /> Fast Audit
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-4 tracking-tighter italic">
              Is Your Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 underline">Safe?</span> ⚡
            </h1>
            <p className="text-slate-600 dark:text-gray-400 font-medium">60 seconds to uncover hidden electrical threats.</p>
          </motion.div>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              <span>Question {currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[40px] shadow-2xl border border-slate-100 dark:border-gray-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl" />
              
              <div className="flex items-start gap-6 mb-10">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center shrink-0 font-black text-yellow-600">
                  {currentQ + 1}
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-gray-100 leading-tight">
                  {QUIZ_QUESTIONS[currentQ].question}
                </h2>
              </div>

              <div className="space-y-4">
                {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectedOption === null && handleAnswer(opt.score, idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-6 rounded-[24px] border-2 transition-all duration-300 font-bold text-base flex items-center gap-4 ${
                      selectedOption === idx
                        ? 'bg-yellow-50 border-yellow-500 text-yellow-900 shadow-lg'
                        : selectedOption !== null
                          ? 'opacity-40 border-slate-100 grayscale'
                          : 'border-slate-50 dark:border-gray-800 hover:border-yellow-200 hover:bg-yellow-50/30 text-slate-700 dark:text-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedOption === idx ? 'bg-yellow-500 border-yellow-500' : 'border-slate-200'}`}>
                       {selectedOption === idx && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    {opt.text}
                  </button>
                ))}
              </div>

              {showInsight && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-6 bg-slate-900 text-white rounded-[24px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl" />
                  <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" /> Intelligence Flash
                  </p>
                  <p className="text-sm font-medium leading-relaxed italic">"{QUIZ_QUESTIONS[currentQ].insight}"</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 tracking-tighter italic mb-4">Final <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600 underline">Safety Score</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             {/* Score Card */}
             <div className={`lg:col-span-8 p-10 md:p-12 rounded-[48px] text-center border-4 shadow-2xl relative overflow-hidden transition-all ${
               getRiskLevel() === 'low' ? 'bg-emerald-50 border-emerald-500/20' : getRiskLevel() === 'medium' ? 'bg-amber-50 border-amber-500/20' : 'bg-rose-50 border-rose-500/20'
             }`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                   <div className={`text-9xl font-black tracking-tighter mb-4 ${
                     getRiskLevel() === 'low' ? 'text-emerald-600' : getRiskLevel() === 'medium' ? 'text-amber-600' : 'text-rose-600'
                   }`}>
                     {safetyPercent}%
                   </div>
                   <h3 className={`text-2xl font-black uppercase tracking-widest mb-6 ${
                     getRiskLevel() === 'low' ? 'text-emerald-700' : getRiskLevel() === 'medium' ? 'text-amber-700' : 'text-rose-700'
                   }`}>
                      {getRating()}
                   </h3>
                   <div className="bg-white/40 dark:bg-gray-900/20 backdrop-blur-md p-8 rounded-[32px] border border-white/20 max-w-lg mx-auto mb-10">
                      <p className="text-lg font-bold text-slate-800 dark:text-gray-200">
                         {getRiskLevel() === 'low' ? "Great news! Your home appears electrically safe. Keep up the good maintenance habits!" :
                          getRiskLevel() === 'medium' ? "Your home has some warning signs. A few simple fixes could dramatically improve your electrical safety." :
                          "Your home may have serious electrical hazards. We strongly recommend a professional inspection."}
                      </p>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="/assessment" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3">
                         <ShieldCheck className="w-5 h-5" /> 25-Point Full Audit
                      </a>
                      <button onClick={resetQuiz} className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-3">
                         <RotateCcw className="w-5 h-5" /> Retake
                      </button>
                   </div>
                </div>
             </div>

             {/* Transparency Panel */}
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl font-black" />
                   <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Calculator className="w-4 h-4" /> Scoring Engine
                   </h4>
                   <div className="space-y-4 font-mono text-xs text-slate-400">
                      <p>• Baseline Max: {maxScore} pts</p>
                      <p>• Deduction Factor: {totalScore} pts</p>
                      <p>• Mathematical Yield: {safetyPercent}% Safe</p>
                      <div className="pt-4 border-t border-white/5">
                         <p className="text-white font-bold mb-1">Standard Reference:</p>
                         <p className="leading-relaxed">NFPA 73 Standard for Electrical Inspections in Existing Dwellings.</p>
                      </div>
                   </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[32px] border-2 border-blue-100 dark:border-blue-800">
                   <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Vetting Logic
                   </h4>
                   <p className="text-xs text-blue-800 dark:text-blue-300 font-bold leading-relaxed">
                      Questions weighted by statistical probability of fire initiation. Cords and smell factors (MELT) carry 3x weight due to immediate arson risk.
                   </p>
                </div>
             </div>
          </div>

          <div className="mt-12">
             <TrustBadge />
             <RelatedTools currentPath="/quick-quiz" count={3} />
          </div>
        </div>
      )}
    </div>
  );
};
