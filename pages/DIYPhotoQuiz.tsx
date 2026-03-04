import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShareableScoreCard } from '../components/ShareableScoreCard';
import { AlertCircle, CheckCircle2, XCircle, ArrowRight, Camera, Trophy, RotateCcw } from 'lucide-react';

// Quiz Data - simulated images via descriptive placeholders or real safe/unsafe scenarios
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

  const question = QUIZ_QUESTIONS[currentQuestionIdx];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestionIdx, showResults]);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (selectedOption !== null) return; // Prevent double clicking
    
    setSelectedOption(optionId);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
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

  const getScoreMessage = () => {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    if (percentage === 100) return { title: "Safety Inspector!", desc: "Flawless. You have an eagle eye for electrical hazards." };
    if (percentage >= 80) return { title: "Well Trained!", desc: "Great job, but reviewing the ones you missed could save a life." };
    if (percentage >= 60) return { title: "Risky Business.", desc: "You missed some critical hazards. Please review the safety explanations." };
    return { title: "Danger Zone!", desc: "Your home might be hiding serious risks. Consider hiring a pro for an audit." };
  };

  if (showResults) {
    const msg = getScoreMessage();
    const finalScore = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Helmet>
          <title>DIY or Deadly? Quiz Results | ElectroSafe.homes</title>
          <meta name="description" content="Your home electrical hazard identification score." />
        </Helmet>
        
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 text-center animate-fade-in relative overflow-hidden">
          {/* Confetti background for perfect score */}
          {finalScore === 100 && (
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iNSIgZmlsbD0iI2Y1OWMwYiIvPjwvc3ZnPg==')] " />
          )}

          <Trophy className={`w-20 h-20 mx-auto mb-6 ${finalScore >= 80 ? 'text-yellow-400' : 'text-gray-400'}`} />
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 dark:text-gray-100 mb-4">{msg.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-8 max-w-lg mx-auto">{msg.desc}</p>
          
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl mb-8">
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-[22px] px-10 py-6">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Correct Answers</div>
            </div>
          </div>
          
          {/* Feature: Shareable Card Generation */}
          <div className="mt-8 mb-12">
             <ShareableScoreCard 
               score={finalScore} 
               category="Visual Safety Quiz" 
               shareText={`I scored ${finalScore}% on the "DIY or Deadly" Electrical Photo Quiz! Can you spot the hidden fire hazards? Take the test:`}
               url="https://electrosafe.homes/diy-quiz"
             />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={restartQuiz} className="inline-flex justify-center items-center gap-2 px-8 py-3 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 hover:bg-gray-200 text-gray-700 dark:text-gray-300 dark:text-gray-300 font-bold rounded-xl transition">
              <RotateCcw className="w-5 h-5" /> Retake Quiz
            </button>
            <Link to="/home-buyer-scanner" className="inline-flex justify-center items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/30">
              Try Home Buyer Scanner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Helmet>
        <title>DIY or Deadly? Photo Quiz | ElectroSafe.homes</title>
        <meta name="description" content="Can you spot the hidden electrical fire and shock hazards? Take our rapid-fire visual safety quiz to test your home inspector eye." />
        <link rel="canonical" href="https://electrosafe.homes/diy-quiz" />
      </Helmet>

      {/* Header & Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-bold uppercase tracking-wide">
            <Camera className="w-4 h-4" /> DIY or Deadly?
          </div>
          <div className="text-sm font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400">
            Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
          </div>
        </div>
        
        {/* Progress Bar Timeline */}
        <div className="flex gap-1 h-2">
          {QUIZ_QUESTIONS.map((_, idx) => {
            let bgColor = "bg-gray-200";
            if (idx < currentQuestionIdx) {
              bgColor = answeredList[idx] ? "bg-green-500" : "bg-red-500";
            } else if (idx === currentQuestionIdx) {
              bgColor = "bg-blue-500 animate-pulse";
            }
            return (
               <div key={idx} className={`flex-1 rounded-full ${bgColor} transition-colors duration-300`} />
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 animate-slide-up">
         
         {/* Simulated Image Area - Using styled placeholder representing real photos */}
         <div className="bg-slate-900 aspect-video md:aspect-[21/9] relative flex items-center justify-center p-8 text-center border-b-4 border-slate-800">
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white/70 rounded-full text-xs font-mono">IMG_{currentQuestionIdx + 1}.JPG</span>
            </div>
            <p className="text-xl md:text-2xl font-medium text-white max-w-xl leading-relaxed">
              "{question.imageDesc}"
            </p>
         </div>

         <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6 font-display">Is this setup Safe or Deadly?</h2>
            
            <div className="space-y-3 mb-8">
               {question.options.map((opt) => {
                 const isSelected = selectedOption === opt.id;
                 const isCorrectStatus = isSelected && opt.isCorrect;
                 const isWrongStatus = isSelected && !opt.isCorrect;
                 const showCorrectAnswer = selectedOption !== null && opt.isCorrect;
                 
                 let btnStyle = "bg-white dark:bg-gray-900 dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-700 dark:border-gray-700 text-slate-700 dark:text-gray-300 dark:text-gray-300 hover:border-blue-400 hover:bg-blue-50";
                 
                 if (isCorrectStatus || showCorrectAnswer) {
                   btnStyle = "bg-green-50 border-2 border-green-500 text-green-800";
                 } else if (isWrongStatus) {
                   btnStyle = "bg-red-50 border-2 border-red-500 text-red-800";
                 } else if (selectedOption !== null) {
                   btnStyle = "bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-800 dark:border-gray-800 text-slate-400 opacity-60";
                 }

                 return (
                   <button
                     key={opt.id}
                     onClick={() => handleSelect(opt.id, opt.isCorrect)}
                     disabled={selectedOption !== null}
                     className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 flex items-start gap-4 ${btnStyle}`}
                   >
                     {/* Check/X Icon */}
                     <div className="mt-0.5 flex-shrink-0">
                       {(isCorrectStatus || showCorrectAnswer) && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                       {isWrongStatus && <XCircle className="w-5 h-5 text-red-600" />}
                       {!isCorrectStatus && !isWrongStatus && !showCorrectAnswer && <div className="w-5 h-5 rounded-full border-2 border-current opacity-40" />}
                     </div>
                     <span className="text-lg">{opt.text}</span>
                   </button>
                 );
               })}
            </div>

            {/* Explanation Area (Expands after selection) */}
            {selectedOption !== null && (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                 <div className="p-6 rounded-2xl bg-slate-50 dark:bg-gray-800 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 dark:border-gray-700 mb-6">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 dark:text-gray-400 font-bold mb-2 uppercase tracking-wider text-xs">
                       <AlertCircle className="w-4 h-4" /> {question.hazardType}
                    </div>
                    <p className="text-slate-800 dark:text-gray-200 dark:text-gray-200 leading-relaxed">
                       {question.explanation}
                    </p>
                 </div>
                 
                 <div className="flex justify-end">
                    <button 
                      onClick={nextQuestion}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/30 group"
                    >
                      {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Photo'} 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
