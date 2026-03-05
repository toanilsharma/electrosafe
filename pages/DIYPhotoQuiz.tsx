import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { AlertCircle, CheckCircle2, XCircle, ArrowRight, Camera, Trophy, RotateCcw, Calculator, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    imageDesc: "A power strip plugged into another power strip (daisy-chaining) behind a TV stand.",
    options: [
      { id: 'a', text: 'Safe: As long as it\'s just a TV and router.', isCorrect: false },
      { id: 'b', text: 'Deadly: Daisy-chaining power strips causes overheating and fires.', isCorrect: true },
      { id: 'c', text: 'Safe: If both have surge protection.', isCorrect: false }
    ],
    explanation: 'Never plug a power strip into another power strip. This is called "daisy-chaining" and violates fire codes because it easily overloads the circuit and causes the strips to melt or catch fire.',
    hazardType: 'Fire Hazard'
  },
  {
    id: 2,
    imageDesc: "A three-prong plug with the bottom round third prong broken off, plugged into a standard wall outlet.",
    options: [
      { id: 'a', text: 'Deadly: The grounding path is removed, risking severe shock.', isCorrect: true },
      { id: 'b', text: 'Safe: The third prong is just for stability.', isCorrect: false },
      { id: 'c', text: 'Safe: It still powers the device perfectly fine.', isCorrect: false }
    ],
    explanation: 'The third round prong is the ground connection. Removing it disables the safety mechanism that protects you from electrocution if the appliance malfunctions.',
    hazardType: 'Shock Hazard'
  },
  {
    id: 3,
    imageDesc: "A bathroom sink area where a hairdryer is plugged into an outlet with \"TEST\" and \"RESET\" buttons.",
    options: [
      { id: 'a', text: 'Deadly: Hairdryers should never be used near sinks.', isCorrect: false },
      { id: 'b', text: 'Safe: It is plugged into a GFCI/RCD protected outlet.', isCorrect: true },
      { id: 'c', text: 'Deadly: The buttons mean the outlet is broken.', isCorrect: false }
    ],
    explanation: 'This is a Ground Fault Circuit Interrupter (GFCI/RCD). It is specifically designed to immediately cut power if moisture causes a fault, making it the ONLY safe outlet type near water.',
    hazardType: 'Safe Practice'
  },
  {
    id: 4,
    imageDesc: "An extension cord running under a living room area rug to reach a floor lamp.",
    options: [
      { id: 'a', text: 'Safe: It prevents people from tripping over the cord.', isCorrect: false },
      { id: 'b', text: 'Safe: The rug protects the cord from damage.', isCorrect: false },
      { id: 'c', text: 'Deadly: Walking on it strips the insulation and traps heat.', isCorrect: true }
    ],
    explanation: 'Cords generate heat. Trapping them under carpets prevents heat from escaping, leading to spontaneous combustion. Also, foot traffic crushes the internal wires, causing hidden arcing and fires.',
    hazardType: 'Fire Hazard'
  },
  {
    id: 5,
    imageDesc: "A space heater plugged directly into a wall outlet, situated 4 feet away from curtains.",
    options: [
      { id: 'a', text: 'Deadly: Space heaters must be plugged into surge protectors.', isCorrect: false },
      { id: 'b', text: 'Safe: Directly in the wall with proper clearance.', isCorrect: true },
      { id: 'c', text: 'Deadly: 4 feet is too close for curtains.', isCorrect: false }
    ],
    explanation: 'Space heaters pull massive current and MUST be plugged directly into the wall—never into power strips or extension cords. They require at least 3 feet of clearance from all flammable objects.',
    hazardType: 'Safe Practice'
  }
];

export const DIYPhotoQuiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredList, setAnsweredList] = useState<boolean[]>([]);

  useEffect(() => { window.scrollTo(0, 0); }, [currentQuestionIdx, showResults]);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionId);
    if (isCorrect) setScore(prev => prev + 1);
    setAnsweredList(prev => [...prev, isCorrect]);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setAnsweredList([]);
  };

  const finalScorePercent = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>DIY or Deadly? Photo Quiz | ElectroSafe.homes</title>
        <meta name="description" content="Can you spot the hidden electrical fire and shock hazards? Test your eye for safety." />
      </Helmet>

      {!showResults ? (
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-black uppercase tracking-widest mb-4">
              <Camera className="w-3.5 h-3.5" /> Visual Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-4 tracking-tighter italic">
              DIY or <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600 underline">Deadly?</span> 📸
            </h1>
            <p className="text-slate-600 dark:text-gray-400 font-medium">Spot the hidden electrical fire & shock hazards.</p>
          </motion.div>

          {/* Progress */}
          <div className="mb-12 flex gap-2 h-2.5">
            {QUIZ_QUESTIONS.map((_, idx) => (
              <div 
                key={idx} 
                className={`flex-1 rounded-full transition-all duration-500 ${
                  idx < currentQuestionIdx ? (answeredList[idx] ? 'bg-emerald-500' : 'bg-rose-500') :
                  idx === currentQuestionIdx ? 'bg-slate-300 animate-pulse' : 'bg-slate-100 dark:bg-gray-800'
                }`} 
              />
            ))}
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div 
               key={currentQuestionIdx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="bg-white dark:bg-gray-900 rounded-[48px] overflow-hidden shadow-2xl border border-slate-100 dark:border-gray-800"
            >
               <div className="bg-slate-900 aspect-video flex items-center justify-center p-12 text-center relative">
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Live Evidence View</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white leading-tight italic tracking-tighter">
                     "{QUIZ_QUESTIONS[currentQuestionIdx].imageDesc}"
                  </p>
               </div>

               <div className="p-8 md:p-12">
                  <h2 className="text-xl font-black text-slate-900 dark:text-gray-100 mb-8 uppercase tracking-tight">Vetting Choice:</h2>
                  <div className="space-y-4 mb-10">
                     {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        const showCorrect = selectedOption !== null && opt.isCorrect;
                        const showWrong = isSelected && !opt.isCorrect;
                        
                        return (
                           <button
                              key={opt.id}
                              onClick={() => handleSelect(opt.id, opt.isCorrect)}
                              disabled={selectedOption !== null}
                              className={`w-full text-left p-6 rounded-[24px] border-2 transition-all duration-300 font-bold flex items-center gap-4 ${
                                 isSelected ? (opt.isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-lg' : 'bg-rose-50 border-rose-500 text-rose-900 shadow-lg') :
                                 showCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900' :
                                 selectedOption !== null ? 'opacity-40 border-slate-100 scale-95' :
                                 'border-slate-50 dark:border-gray-800 hover:border-emerald-200 hover:bg-slate-50 text-slate-700 dark:text-gray-300'
                              }`}
                           >
                              <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelected || showCorrect ? (opt.isCorrect ? 'bg-emerald-500 border-emerald-500' : 'bg-rose-500 border-rose-500') : 'border-slate-200'}`}>
                                 {(isSelected || showCorrect) && (opt.isCorrect ? <CheckCircle2 className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />)}
                              </div>
                              {opt.text}
                           </button>
                        );
                     })}
                  </div>

                  {selectedOption !== null && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-8">
                        <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-[32px] border-2 border-slate-100 dark:border-gray-700">
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                              <Info className="w-4 h-4 text-rose-500" /> Forensic Breakdown
                           </div>
                           <p className="text-lg font-bold text-slate-800 dark:text-gray-200 leading-relaxed italic">
                              {QUIZ_QUESTIONS[currentQuestionIdx].explanation}
                           </p>
                        </div>
                        <button onClick={nextQuestion} className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                           {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? 'Analyze Final Score' : 'Next Evidence Item'} <ArrowRight className="w-5 h-5" />
                        </button>
                     </motion.div>
                  )}
               </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-slate-900 dark:text-gray-100 tracking-tighter italic">Forensic <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600 underline">Report</span></h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className={`lg:col-span-8 p-12 rounded-[56px] text-center border-4 shadow-2xl relative overflow-hidden ${
                 finalScorePercent >= 80 ? 'bg-emerald-50 border-emerald-500/20' : 'bg-rose-50 border-rose-500/20'
              }`}>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full blur-3xl font-black" />
                 
                 <div className="relative z-10">
                    <Trophy className={`w-24 h-24 mx-auto mb-8 ${finalScorePercent >= 80 ? 'text-yellow-500 animate-bounce' : 'text-slate-300'}`} />
                    <div className={`text-9xl font-black tracking-tighter mb-4 ${finalScorePercent >= 80 ? 'text-emerald-600' : 'text-rose-600'}`}>
                       {finalScorePercent}%
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-gray-100 mb-8 italic">
                       {finalScorePercent === 100 ? "Master Inspector" : finalScorePercent >= 80 ? "Certified Aware" : "Hazard Prone"}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Link to="/home-buyer-scanner" className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3">
                          <ShieldCheck className="w-5 h-5" /> Full Buyer Scanner
                       </Link>
                       <button onClick={restartQuiz} className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                          <RotateCcw className="w-5 h-5" /> Restart
                       </button>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl">
                    <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Calculator className="w-4 h-4" /> Deduction Logic
                    </h4>
                    <div className="space-y-4 text-xs font-mono text-slate-400">
                       <p>• Items Scanned: {QUIZ_QUESTIONS.length}</p>
                       <p>• Correct ID: {score}</p>
                       <p>• Lethality Missed: {QUIZ_QUESTIONS.length - score}</p>
                       <div className="pt-4 border-t border-white/5">
                          <p className="text-rose-400 font-black mb-1">Risk Weighting:</p>
                          <p>Misidentified hazards are assumed as "Homeowner Exposure" incidents.</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[32px] border-2 border-indigo-100 dark:border-indigo-800">
                    <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Zap className="w-4 h-4" /> Transparency
                    </h4>
                    <p className="text-xs text-indigo-800 dark:text-indigo-300 font-bold leading-relaxed">
                       All "Deadly" outcomes are based on <strong className="text-slate-900 dark:text-white">OSHA</strong> and <strong className="text-slate-900 dark:text-white">NFPA 70E</strong> arc flash and shock distance standards.
                    </p>
                 </div>
              </div>
           </div>

           <div className="mt-12">
              <ShareableScoreCard 
                 score={finalScorePercent} 
                 toolName="Photo Hazard Quiz" 
                 toolPath="/diy-quiz"
                 rating={finalScorePercent >= 80 ? "Safety Pro" : "Needs Review"}
                 riskLevel={finalScorePercent >= 80 ? "low" : "high"}
              />
           </div>
        </div>
      )}
    </div>
  );
};
