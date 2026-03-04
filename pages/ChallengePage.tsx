import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Zap, Trophy, ShieldCheck } from 'lucide-react';

interface ChallengeData {
  score: number;
  level: 'low' | 'medium' | 'high';
  tool: string;
  path: string;
}

function parseChallenge(): ChallengeData | null {
  try {
    const hash = window.location.hash.replace('#c=', '');
    // Format: score:82:level:low:tool:QuickQuiz:path:/quick-quiz
    const parts = hash.split(':');
    const obj: Record<string, string> = {};
    for (let i = 0; i < parts.length - 1; i += 2) {
      obj[parts[i]] = parts[i + 1];
    }
    return {
      score: parseInt(obj.score || '80'),
      level: (obj.level || 'low') as 'low' | 'medium' | 'high',
      tool: decodeURIComponent(obj.tool || 'Safety Quiz'),
      path: decodeURIComponent(obj.path || '/quick-quiz'),
    };
  } catch {
    return null;
  }
}

export const ChallengePage: React.FC = () => {
  const [data, setData] = useState<ChallengeData | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const parsed = parseChallenge();
    setData(parsed || { score: 80, level: 'low', tool: 'Safety Quiz', path: '/quick-quiz' });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); setReady(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

  const { score, level, tool, path } = data;
  const emoji = level === 'low' ? '🟢' : level === 'medium' ? '🟡' : '🔴';
  const levelText = level === 'low' ? 'Safe' : level === 'medium' ? 'Moderate Risk' : 'High Risk';
  const gradientBg = level === 'low' ? 'from-emerald-600 to-green-700' : level === 'medium' ? 'from-amber-600 to-yellow-700' : 'from-red-600 to-red-800';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-12 text-white">
      <Helmet>
        <title>You've Been Challenged! — ElectroSafe.homes</title>
        <meta name="description" content={`Your friend scored ${score}% on the ${tool}. Can you beat that? Check your home's electrical safety free.`} />
      </Helmet>

      <div className="w-full max-w-md text-center">
        {/* Brand */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold mb-4 border border-white/20">
            <Zap className="w-4 h-4 text-yellow-400" />
            ElectroSafe.homes
          </div>
        </div>

        {/* Challenge Badge */}
        <div className="mb-8 animate-bounce-slow">
          <div className="w-24 h-24 mx-auto bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/30 mb-4">
            <Trophy className="w-12 h-12 text-yellow-900" />
          </div>
          <p className="text-yellow-400 font-bold text-sm uppercase tracking-widest">⚡ You've Been Challenged!</p>
        </div>

        {/* Challenger Score */}
        <div className={`rounded-3xl bg-gradient-to-br ${gradientBg} p-8 mb-8 shadow-2xl`}>
          <p className="text-white/70 text-sm font-medium mb-2">Your friend scored</p>
          <div className="text-7xl font-black mb-2">{score}%</div>
          <div className="text-xl font-bold mb-1">{emoji} {levelText}</div>
          <p className="text-white/70 text-sm">on the <strong className="text-white">{tool}</strong></p>
        </div>

        <h1 className="text-3xl font-extrabold mb-4 leading-tight">
          Is YOUR home <span className="text-yellow-400">electrically safer?</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Take the free {tool} and see if you can beat their score. It only takes <strong className="text-white">60 seconds</strong>.
        </p>

        {/* Avatar Slots */}
        <div className="flex justify-center gap-3 mb-8">
          {['You', 'Friend 1', 'Friend 2'].map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-sm font-bold
                ${i === 0 ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/10 border-dashed border-white/30 text-white/40'}`}>
                {i === 0 ? '?' : <ShieldCheck className="w-6 h-6" />}
              </div>
              <span className="text-xs text-white/50">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link to={path}
          className={`inline-flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-xl
            ${ready ? 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 shadow-blue-900/40' : 'bg-white/20 text-white/60 cursor-not-allowed'}`}
          onClick={e => { if (!ready) e.preventDefault(); }}>
          {ready ? (
            <>Accept Challenge <ArrowRight className="w-6 h-6" /></>
          ) : (
            <>Get Ready... {countdown}</>
          )}
        </Link>

        <p className="text-white/40 text-xs mt-4">Free · No sign-up · 60 seconds</p>
      </div>
    </div>
  );
};
