import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, ArrowRight, RotateCcw, Zap, Home as HomeIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { TrustBadge } from '../components/TrustBadge';
import { RelatedTools } from '../components/RelatedTools';



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

  const getResultMessage = () => {
    const level = getRiskLevel();
    if (level === 'low') return "Great news! Your home appears electrically safe. Keep up the good maintenance habits!";
    if (level === 'medium') return "Your home has some warning signs. A few simple fixes could dramatically improve your electrical safety.";
    return "Your home may have serious electrical hazards. We strongly recommend a professional inspection.";
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
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setShowInsight(false);
  };

  const question = QUIZ_QUESTIONS[currentQ];
  const progress = ((currentQ) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Quick Safety Quiz — Is Your Home Safe? | ElectroSafe.homes</title>
        <meta name="description" content="Take our free 60-second quiz to find out if your home has hidden electrical dangers. 5 simple questions, instant results." />
        <link rel="canonical" href="https://electrosafe.homes/quick-quiz" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://electrosafe.homes/quick-quiz" />
        <meta property="og:title" content="Is Your Home Electrically Safe? — 60-Second Quiz" />
        <meta property="og:description" content="5 simple questions to uncover hidden electrical dangers in your home. Free, instant results." />
        <meta property="og:image" content="https://electrosafe.homes/android-chrome-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is Your Home Electrically Safe? — 60-Second Quiz" />
        <meta name="twitter:description" content="5 simple questions to uncover hidden electrical dangers in your home." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "Home Electrical Safety Quick Quiz",
            "description": "A 60-second quiz to evaluate your home's electrical safety",
            "educationalLevel": "beginner",
            "about": {
              "@type": "Thing",
              "name": "Home Electrical Safety"
            }
          })}
        </script>
      </Helmet>

      {!showResult ? (
        <div className="animate-in fade-in duration-300">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> 60-Second Quiz
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Is Your Home Safe? ⚡
            </h1>
            <p className="text-gray-600 text-lg">
              5 quick questions. No sign-up. Instant results.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 animate-in slide-in-from-right-4 duration-300" key={currentQ}>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 font-extrabold">{currentQ + 1}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectedOption === null && handleAnswer(opt.score, idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                    selectedOption === idx
                      ? opt.score === 0
                        ? 'bg-green-50 border-green-400 text-green-800'
                        : 'bg-amber-50 border-amber-400 text-amber-800'
                      : selectedOption !== null
                        ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-500'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === idx ? 'border-current bg-current' : 'border-gray-300'
                    }`}>
                      {selectedOption === idx && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    {opt.text}
                  </div>
                </button>
              ))}
            </div>

            {/* Insight Flash */}
            {showInsight && (
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl animate-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-1">💡 Did you know?</p>
                <p className="text-sm text-blue-700">{question.insight}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results */
        <div className="animate-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider mb-4 ${
              getRiskLevel() === 'low' 
                ? 'bg-green-100 text-green-800'
                : getRiskLevel() === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {getRiskLevel() === 'low' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              Quiz Complete
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Your Home Safety Score</h2>
          </div>

          {/* Score Display */}
          <div className={`p-8 rounded-3xl text-center mb-6 border-2 ${
            getRiskLevel() === 'low' 
              ? 'bg-green-50 border-green-200'
              : getRiskLevel() === 'medium'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
          }`}>
            <div className={`text-7xl font-black mb-2 ${
              getRiskLevel() === 'low' ? 'text-green-600' : getRiskLevel() === 'medium' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {safetyPercent}%
            </div>
            <p className="text-lg font-bold text-gray-800 mb-2">{getRating()}</p>
            <p className="text-gray-600 max-w-md mx-auto">{getResultMessage()}</p>
          </div>

          {/* CTA to full assessment */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Want a detailed analysis?</p>
            <a
              href="/assessment"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
            >
              <ShieldCheck className="w-5 h-5" />
              Take Full 25-Point Assessment
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Share Card */}
          <ShareableScoreCard
            score={totalScore}
            maxScore={maxScore}
            rating={getRating()}
            riskLevel={getRiskLevel()}
            toolName="Quick Safety Quiz"
            toolPath="/quick-quiz"
          />

          {/* Trust Badge */}
          <TrustBadge />


          {/* Reset */}
          <div className="text-center mt-6">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
            >
              <RotateCcw className="w-4 h-4" /> Take Quiz Again
            </button>
          </div>

          {/* Related Tools */}
          <RelatedTools currentPath="/quick-quiz" count={3} />
        </div>
      )}
    </div>
  );
};
