
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../data';
import { AlertCircle, ArrowRight, RotateCcw, Printer, Award, Info, X, ShieldCheck, ExternalLink } from 'lucide-react';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { RelatedTools } from '../components/RelatedTools';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { Helmet } from 'react-helmet-async';


const FAQ_DATA = [
  { q: 'How do I know if my home wiring is safe?', a: 'Take our free 25-point electrical safety assessment at electrosafe.homes/assessment. Look for signs like flickering lights, burning smells, tripping breakers, warm outlets, or wiring over 25 years old.' },
  { q: 'What is a GFCI or RCD outlet?', a: 'A GFCI (Ground Fault Circuit Interrupter) or RCD (Residual Current Device) shuts off power within 1/40th of a second when it detects a ground fault. Required near sinks, outdoors, in bathrooms, and garages. Press the Test button monthly.' },
  { q: 'How often should I have my home electrically inspected?', a: 'Every 5 years for homes under 25 years old, and every 3 years for older homes. Immediately after buying a home, after any flood or fire damage, or if you notice warning signs like burning smells or flickering lights.' },
  { q: 'What causes house fires from electricity?', a: 'The top electrical fire causes are: overloaded circuits, damaged extension cords, faulty wiring, arc faults inside walls, space heaters left unattended, and appliances with frayed cords.' },
  { q: 'Is it safe to use extension cords permanently?', a: 'No. Extension cords are for temporary use only. Permanent reliance on extension cords is a fire hazard and indicates you need additional outlets installed by a licensed electrician.' },
];


export const ToolAssessment = () => {
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
    const maxScore = QUESTIONS.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    return { totalScore, percentage };
  };

  const getResult = (percentage: number) => {
    if (percentage < 15) return {
      rating: "⭐⭐⭐⭐⭐ Excellent",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      title: "Low Risk",
      desc: "Your home electrical system appears to be in great condition. Maintain your regular checks."
    };
    if (percentage < 35) return {
      rating: "⭐⭐⭐ Fair",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      title: "Moderate Risk",
      desc: "There are some warning signs. Review the questions where you answered 'Yes' and address those issues soon."
    };
    return {
      rating: "⭐ Critical",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      title: "High Risk",
      desc: "Significant hazards detected. We strongly recommend consulting a certified electrician immediately."
    };
  };

  const { percentage, totalScore } = calculateScore();
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <ConfettiEffect active={isPerfect && showResult} />
      <Helmet>
        <title>Free Home Electrical Safety Assessment — 25-Point Audit | ElectroSafe.homes</title>
        <meta name="description" content="Take our free 25-point home electrical safety assessment. Get your safety score, identify risks, and download a personalized safety report. No sign-up required." />
        <link rel="canonical" href="https://electrosafe.homes/assessment" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="hidden print-only mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold">Home Electrical Safety Audit</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Generated by ElectroSafe.homes</p>
        <p className="text-sm mt-2">Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="text-center mb-10 no-print">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Home Electrical Safety Assessment</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 dark:text-gray-400">Answer these {QUESTIONS.length} questions to get your safety rating. Your progress is saved automatically.</p>
      </div>

      {!showResult ? (
        <div className="space-y-8">
          {QUESTIONS.map((q, idx) => (
            <div key={q.id} className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 dark:border-gray-700 print:border-none print:p-0 print:mb-4 relative">
              <div className="flex justify-between items-start mb-4">
                <p className="font-medium text-lg text-gray-800 dark:text-gray-200 dark:text-gray-200 pr-8">
                  <span className="text-blue-500 font-bold mr-2">{idx + 1}.</span>
                  {q.question}
                </p>
                <button 
                  onClick={() => setActiveInfo(activeInfo === q.id ? null : q.id)}
                  className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  title="Why we ask this"
                >
                  {activeInfo === q.id ? <X className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </button>
              </div>

              {/* Educational Context */}
              {activeInfo === q.id && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Why this matters</h4>
                  <p className="text-sm text-blue-900">{q.whyItMatters}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(q.id, opt.score)}
                    className={`px-4 py-3 rounded-md text-left text-sm font-medium transition-all duration-200 border ${
                      answers[q.id] === opt.score
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200'
                        : 'bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:text-gray-300 border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="sticky bottom-4 bg-white dark:bg-gray-900 dark:bg-gray-900/90 backdrop-blur p-4 rounded-lg shadow-lg border-t border-gray-200 dark:border-gray-700 dark:border-gray-700 flex justify-between items-center no-print">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {Object.keys(answers).length} of {QUESTIONS.length} answered
            </div>
            <button
              disabled={!isComplete}
              onClick={() => setShowResult(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-colors ${
                isComplete ? 'bg-green-600 hover:bg-green-700 shadow-md' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Analyze Results <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-xl border-2 ${resultData.bg} ${resultData.border}`}>
          <div className="text-center">
            
            {/* GAMIFICATION: Perfect Score Badge */}
            {isPerfect && (
              <div className="mb-6 animate-pulse">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform">
                   <Award className="w-6 h-6" /> ElectroSafe Certified Safe
                 </div>
                 <p className="text-xs text-yellow-700 font-bold mt-2 uppercase tracking-wide">You aced the audit!</p>
              </div>
            )}

            <h2 className={`text-4xl font-bold mb-2 ${resultData.color}`}>{resultData.rating}</h2>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 dark:text-gray-200 mb-4">{resultData.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-8 max-w-lg mx-auto">{resultData.desc}</p>
            
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-8 text-left border border-gray-100 dark:border-gray-800 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Recommended Actions
              </h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                {isPerfect && <li className="text-green-600 font-medium">✓ Maintain your excellent habits. Re-test annually.</li>}
                {percentage > 10 && <li>• Check all smoke detectors and replace batteries.</li>}
                {percentage > 25 && <li>• Inspect extension cords and replace any that show wear.</li>}
                {percentage > 40 && <li>• Test all GFCI/RCD buttons to ensure protection is active.</li>}
                {percentage > 60 && <li className="font-bold text-red-600">• Schedule an inspection with a professional electrician immediately.</li>}
                <li>• Download our room-by-room checklist for a deeper audit.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
               <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm font-bold"
              >
                <Printer className="w-4 h-4" /> Print Official Report
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
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-md hover:bg-gray-300 transition"
              >
                <RotateCcw className="w-4 h-4" /> Clear & Start Over
              </button>
            </div>

            {/* Viral Share Feature */}
            <ShareableScoreCard
              score={totalScore}
              maxScore={QUESTIONS.length * 5}
              rating={resultData.rating}
              riskLevel={percentage < 15 ? 'low' : percentage < 35 ? 'medium' : 'high'}
              toolName="Safety Assessment"
              toolPath="/assessment"
            />

            {/* Trust Badge */}
            <TrustBadge />

            {/* FAQ Section (screen only) */}
            <div className="mt-8 no-print text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">❓ Common Electrical Safety Questions</h3>
              <div className="space-y-3">
                {FAQ_DATA.map((faq, i) => (
                  <details key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 group cursor-pointer">
                    <summary className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-sm list-none flex justify-between items-center">
                      {faq.q}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg">▾</span>
                    </summary>
                    <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm mt-2 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>{/* end text-center */}

          {/* Related Tools */}
          <RelatedTools currentPath="/assessment" count={3} />


          {/* Detailed Breakdown for Print Only */}
          <div className="hidden print-only mt-8 text-left">
             <h4 className="font-bold text-lg border-b border-gray-300 pb-2 mb-4">Detailed Audit Log</h4>
             <table className="w-full text-sm">
               <thead>
                 <tr className="bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50">
                   <th className="text-left p-2">Category / Question</th>
                   <th className="text-right p-2">Score</th>
                 </tr>
               </thead>
               <tbody>
                 {QUESTIONS.map(q => {
                   const score = answers[q.id];
                   // Only show issues (score > 0) to save paper
                   if (score > 0) {
                     return (
                        <tr key={q.id} className="border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                          <td className="p-2">
                            <div className="font-medium">{q.question}</div>
                            <div className="text-xs text-red-600">{q.options.find(o => o.score === score)?.label}</div>
                          </td>
                          <td className="text-right p-2 font-bold text-red-600">+{score}</td>
                        </tr>
                     );
                   }
                   return null;
                 })}
               </tbody>
             </table>
             <div className="mt-4 text-right font-bold">Total Risk Score: {totalScore} / {QUESTIONS.length * 5}</div>
          </div>
        </div>
      )}
    </div>
  );
};
