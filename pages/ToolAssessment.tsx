
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../data';
import { AlertCircle, ArrowRight, RotateCcw, Printer, Award, Info, X, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { RelatedTools } from '../components/RelatedTools';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { Helmet } from 'react-helmet-async';
import { useCurrencyStore } from '../store/currencyStore';


const FAQ_DATA = [
  { q: 'How do I know if my home wiring is safe?', a: 'Take our free 25-point electrical safety assessment at electrosafe.homes/assessment. Look for signs like flickering lights, burning smells, tripping breakers, warm outlets, or wiring over 25 years old.' },
  { q: 'What is a GFCI or RCD outlet?', a: 'A GFCI (Ground Fault Circuit Interrupter) or RCD (Residual Current Device) shuts off power within 1/40th of a second when it detects a ground fault. Required near sinks, outdoors, in bathrooms, and garages. Press the Test button monthly.' },
  { q: 'How often should I have my home electrically inspected?', a: 'Every 5 years for homes under 25 years old, and every 3 years for older homes. Immediately after buying a home, after any flood or fire damage, or if you notice warning signs like burning smells or flickering lights.' },
  { q: 'What causes house fires from electricity?', a: 'The top electrical fire causes are: overloaded circuits, damaged extension cords, faulty wiring, arc faults inside walls, space heaters left unattended, and appliances with frayed cords.' },
  { q: 'Is it safe to use extension cords permanently?', a: 'No. Extension cords are for temporary use only. Permanent reliance on extension cords is a fire hazard and indicates you need additional outlets installed by a licensed electrician.' },
];


export const ToolAssessment = () => {
  const { currency, format, convert } = useCurrencyStore();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [activeInfo, setActiveInfo] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };


  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('assessment_answers');
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('assessment_answers', JSON.stringify(answers));
  }, [answers]);

  // Save last assessment date when result is shown
  useEffect(() => {
    if (showResult) {
      localStorage.setItem('assessment_last_date', new Date().toISOString());
    }
  }, [showResult]);


  const handleSelect = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateScore = () => {
    const totalScore = (Object.values(answers) as number[]).reduce((a, b) => a + b, 0);
    const maxPossible = QUESTIONS.length * 5;
    const percentage = (totalScore / maxPossible) * 100;
    return { totalScore, percentage, maxPossible };
  };

  const getResult = (percentage: number) => {
    if (percentage < 15) return {
      rating: "⭐⭐⭐⭐⭐ Excellent",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-200 dark:border-green-800",
      title: "Low Risk",
      desc: "Your home electrical system appears to be in great condition. Maintain your regular checks."
    };
    if (percentage < 35) return {
      rating: "⭐⭐⭐ Fair",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/10",
      border: "border-yellow-200 dark:border-yellow-800",
      title: "Moderate Risk",
      desc: "There are some warning signs. Review the questions where you answered 'Yes' and address those issues soon."
    };
    return {
      rating: "⭐ Critical",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-200 dark:border-red-800",
      title: "High Risk",
      desc: "Significant hazards detected. We strongly recommend consulting a certified electrician immediately."
    };
  };

  const { percentage, totalScore, maxPossible } = calculateScore();
  const resultData = getResult(percentage);
  const isComplete = Object.keys(answers).length === QUESTIONS.length;
  const isPerfect = totalScore === 0 && isComplete;

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <ConfettiEffect active={isPerfect && showResult} />
      <Helmet>
        <title>Free Home Electrical Safety Assessment — 25-Point Audit | ElectroSafe.homes</title>
        <meta name="description" content="Take our free 25-point home electrical safety assessment. Get your safety score, identify risks, and download a personalized safety report. No sign-up required." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="hidden print-only mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold">Home Electrical Safety Audit</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Generated by ElectroSafe.homes</p>
        <p className="text-sm mt-2">Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="text-center mb-10 no-print">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4" /> Professional Audit
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6 tracking-tight">Home Electrical <span className="text-indigo-600">Safety Assessment</span></h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Answer these {QUESTIONS.length} diagnostic questions to get your home's safety rating. Based on ISO and NFPA weighted risk standards.
        </p>
      </div>

      {!showResult ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
          {QUESTIONS.map((q, idx) => (
            <div key={q.id} className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 print:border-none print:p-0 print:mb-4 relative group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <p className="font-bold text-xl text-gray-800 dark:text-gray-200 dark:text-gray-200 pr-8 leading-tight">
                  <span className="text-indigo-500 mr-3">{idx + 1}.</span>
                  {q.question}
                </p>
                <button 
                  onClick={() => setActiveInfo(activeInfo === q.id ? null : q.id)}
                  className="bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 p-2 rounded-xl text-gray-400 hover:text-blue-600 transition-colors"
                  title="Why we ask this"
                >
                  {activeInfo === q.id ? <X className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </button>
              </div>

              {/* Educational Context */}
              {activeInfo === q.id && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-5 mb-6 rounded-r-2xl animate-in fade-in slide-in-from-top-2 relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-indigo-500/5 to-transparent"></div>
                  <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" /> Safety Context
                  </h4>
                  <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed font-medium">{q.whyItMatters}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(q.id, opt.score)}
                    className={`px-6 py-4 rounded-2xl text-left text-sm font-bold transition-all duration-300 border-2 ${
                      answers[q.id] === opt.score
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                        : 'bg-white dark:bg-gray-900 dark:bg-gray-900 text-gray-600 dark:text-gray-400 dark:text-gray-400 border-gray-100 dark:border-gray-800 dark:border-gray-800 hover:border-indigo-200 hover:bg-indigo-50/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="sticky bottom-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-5 md:px-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 no-print z-50">
            <div className="flex flex-col items-center md:items-start">
               <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Audit Progress</div>
               <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-slate-100 dark:bg-gray-800 dark:bg-gray-800 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-indigo-500 transition-all duration-500" 
                        style={{ width: `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
                     ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">
                    {Object.keys(answers).length} / {QUESTIONS.length}
                  </span>
               </div>
            </div>
            <button
              disabled={!isComplete}
              onClick={() => {
                 setShowResult(true);
                 window.scrollTo(0, 0);
              }}
              className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-white transition-all transform hover:-translate-y-1 ${
                isComplete ? 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 cursor-pointer' : 'bg-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              Analyze Results <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className={`p-10 rounded-[32px] border-4 shadow-2xl relative overflow-hidden text-center ${resultData.bg} ${resultData.border}`}>
            {/* Glossy Decorator */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            {/* GAMIFICATION: Perfect Score Badge */}
            {isPerfect && (
              <div className="mb-8 flex justify-center">
                 <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full font-black shadow-xl transform animate-bounce">
                   <Award className="w-6 h-6" /> ElectroSafe Certified
                 </div>
              </div>
            )}

            <h2 className={`text-5xl font-black mb-2 tracking-tighter ${resultData.color}`}>{resultData.rating}</h2>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">{resultData.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg font-medium mb-10 max-w-xl mx-auto leading-relaxed">{resultData.desc}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
               <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm p-8 rounded-3xl text-left border border-black/5 shadow-inner">
                 <h4 className="font-black text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                   <AlertCircle className="w-4 h-4 text-indigo-600" />
                   Action Plan
                 </h4>
                 <ul className="space-y-4">
                   {isPerfect && <li className="text-green-600 font-bold flex gap-2"><CheckCircle className="w-4 h-4 shrink-0" /> Maintain your excellence.</li>}
                   {percentage > 10 && <li className="text-gray-700 dark:text-gray-300 dark:text-gray-300 font-medium text-sm flex gap-2"><span className="shrink-0">•</span> Audit smoke detectors.</li>}
                   {percentage > 25 && <li className="text-gray-700 dark:text-gray-300 dark:text-gray-300 font-medium text-sm flex gap-2"><span className="shrink-0">•</span> Eliminate extension cord reliance.</li>}
                   {percentage > 40 && <li className="text-gray-700 dark:text-gray-300 dark:text-gray-300 font-medium text-sm flex gap-2"><span className="shrink-0">•</span> Test GFCI/RCD functionality.</li>}
                   {percentage > 60 && <li className="text-red-600 font-black text-sm flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" /> Contact LICENSED electrician.</li>}
                 </ul>
               </div>

               {/* Mathematical Breakdown */}
               <div className="bg-black/5 dark:bg-white/5 p-8 rounded-3xl text-left border border-black/5 shadow-inner">
                 <h4 className="font-black text-gray-400 mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                   <Calculator className="w-4 h-4" />
                   Scoring Transparency
                 </h4>
                 <div className="space-y-4 text-xs font-mono text-gray-500 dark:text-gray-400">
                    <p>• Points Accrued: {totalScore}</p>
                    <p>• Max Possible Risk: {maxPossible}</p>
                    <p>• Risk Weighting: Σ(w) = {percentage.toFixed(1)}%</p>
                    <div className="pt-4 border-t border-black/10 dark:border-white/10">
                       <p className="text-indigo-600 dark:text-indigo-400 font-bold italic">Standard: BS 7671 Hybrid Risk Model</p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
               <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition shadow-xl font-black text-sm"
              >
                <Printer className="w-5 h-5" /> Download Report
              </button>
              <button
                onClick={() => {
                  if(window.confirm("This will clear your saved progress. Are you sure?")) {
                    setShowResult(false);
                    setAnswers({});
                    localStorage.removeItem('assessment_answers');
                    window.scrollTo(0, 0);
                  }
                }}
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-2xl border-2 border-gray-100 dark:border-gray-700 dark:border-gray-700 hover:bg-gray-50 transition font-bold text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Reset Audit
              </button>
            </div>

            <div className="mt-12 flex flex-col items-center">
              <ShareableScoreCard
                score={totalScore}
                maxScore={QUESTIONS.length * 5}
                rating={resultData.rating}
                riskLevel={percentage < 15 ? 'low' : percentage < 35 ? 'medium' : 'high'}
                toolName="Safety Assessment"
                toolPath="/assessment"
              />
            </div>
          </div>

          <RelatedTools currentPath="/assessment" count={3} />

          {/* Detailed Breakdown for Print Only */}
          <div className="hidden print-only mt-12 text-left">
             <h4 className="font-bold text-xl border-b-2 border-slate-300 pb-3 mb-6 uppercase tracking-wider">Diagnostic Audit Log</h4>
             <table className="w-full text-sm border-collapse">
               <thead>
                 <tr className="bg-slate-100 dark:bg-gray-800/50 dark:bg-gray-800/50">
                   <th className="text-left p-4 border border-slate-200">Category / Question</th>
                   <th className="text-right p-4 border border-slate-200">Weighted Risk</th>
                 </tr>
               </thead>
               <tbody>
                 {QUESTIONS.map(q => {
                   const score = answers[q.id];
                   if (score > 0) {
                     return (
                        <tr key={q.id}>
                          <td className="p-4 border border-slate-100">
                            <div className="font-bold text-slate-900">{q.question}</div>
                            <div className="text-xs text-red-600 mt-1 uppercase font-black">{q.options.find(o => o.score === score)?.label}</div>
                          </td>
                          <td className="text-right p-4 border border-slate-100 font-black text-red-600">+{score}</td>
                        </tr>
                     );
                   }
                   return null;
                 })}
               </tbody>
             </table>
             <div className="mt-6 p-6 bg-slate-50 rounded-2xl text-right font-black text-xl border-2 border-slate-200">
                Final Safety Index: {percentage.toFixed(1)}%
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
