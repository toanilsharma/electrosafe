import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';

export const EmbeddedQuizHook: React.FC = () => {
  const [answer, setAnswer] = useState<'safe' | 'deadly' | null>(null);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800 relative overflow-hidden text-white">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="md:w-1/2 w-full">
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border-4 ${
              answer === 'safe' ? 'border-red-500 shadow-red-500/50' : 
              answer === 'deadly' ? 'border-green-500 shadow-green-500/50' : 
              'border-slate-800'
            }`}>
              {/* Question: Daisy chained power strips */}
              <img 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800" 
                alt="Daisy chained extension cords" 
                className="w-full h-80 object-cover"
              />
              
              {/* Overlay after answer */}
              {answer && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md ${
                  answer === 'deadly' ? 'bg-green-900/80 text-green-100' : 'bg-red-900/90 text-red-100'
                }`}>
                  {answer === 'deadly' ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                      <h3 className="text-3xl font-bold mb-2">Correct. It's DEADLY.</h3>
                      <p className="text-lg">You caught 1 of 5 hazards. Daisy-chaining causes extreme resistance heat, melting the wire insulation from the inside out.</p>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-16 h-16 text-red-400 mb-4" />
                      <h3 className="text-3xl font-bold mb-2">Wrong. This is a Fire Trap.</h3>
                      <p className="text-lg">Never plug a power strip into another power strip. The cascading resistance will melt the primary wall plug before the breaker trips.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Text Side */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <div className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-sm font-bold tracking-widest uppercase mb-6">
              Diagnostic Test
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Is this setup <span className="text-green-400">Safe</span> or <span className="text-red-500">Deadly</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Before you hire an electrician, test your own "hazard vision." Most deadly electrical traps look completely normal to the untrained eye.
            </p>

            {!answer ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => setAnswer('safe')}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition border border-slate-700 hover:border-slate-600 shadow-lg"
                >
                  Looks Safe to Me
                </button>
                <button 
                  onClick={() => setAnswer('deadly')}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition border border-slate-700 hover:border-slate-600 shadow-lg text-red-400"
                >
                  Definitely Deadly
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex justify-center md:justify-start">
                <button 
                  onClick={() => navigate('/diy-quiz')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition shadow-lg shadow-blue-900/50 hover:scale-105"
                >
                  Continue Hazard Challenge <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
