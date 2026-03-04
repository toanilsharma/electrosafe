import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Share2, MessageCircle, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ScoreData {
  score: number;
  level: 'low' | 'medium' | 'high';
  tool: string;
  path: string;
}

function parseHash(): ScoreData | null {
  try {
    const hash = window.location.hash.replace('#', '');
    const params = new URLSearchParams(hash);
    const score = parseInt(params.get('score') || '0');
    const level = (params.get('level') || 'medium') as 'low' | 'medium' | 'high';
    const tool = decodeURIComponent(params.get('tool') || 'Safety Quiz');
    const path = decodeURIComponent(params.get('path') || '/quick-quiz');
    return { score, level, tool, path };
  } catch {
    return null;
  }
}

export const ScorePage: React.FC = () => {
  const [data, setData] = useState<ScoreData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const parsed = parseHash();
    setData(parsed || { score: 80, level: 'low', tool: 'Safety Quiz', path: '/quick-quiz' });
  }, []);

  if (!data) return null;

  const { score, level, tool, path } = data;
  const siteUrl = 'https://electrosafe.homes';
  const toolUrl = `${siteUrl}${path}`;
  const shareUrl = `${siteUrl}/score#score=${score}&level=${level}&tool=${encodeURIComponent(tool)}&path=${encodeURIComponent(path)}`;

  const emoji = level === 'low' ? '🟢' : level === 'medium' ? '🟡' : '🔴';
  const levelText = level === 'low' ? 'Safe' : level === 'medium' ? 'Moderate Risk' : 'High Risk';

  const SHARE_VARIANTS = [
    `${emoji} My home scored ${score}% on ElectroSafe's ${tool}! ⚡ 23% of home fires start from electrical faults. Is YOUR home safe? (Free, 2 mins) → ${shareUrl}`,
    `I just found out my home is ${score}% electrically safe 🏠⚡ Check yours FREE in 60 seconds → ${shareUrl}`,
    `${emoji} Home Safety Score: ${score}% — rated "${levelText}" on ElectroSafe.homes! Challenge your family & friends to beat this score 🎯 → ${shareUrl}`,
  ];
  const shareText = SHARE_VARIANTS[Math.floor(Date.now() / 1000) % SHARE_VARIANTS.length];
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const gradientBg = level === 'low' ? 'from-emerald-500 to-green-600' : level === 'medium' ? 'from-amber-500 to-yellow-600' : 'from-red-500 to-red-700';
  const ringColor = level === 'low' ? 'border-emerald-300' : level === 'medium' ? 'border-amber-300' : 'border-red-300';

  const shareLinks = [
    { name: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${encodedText}`, color: 'bg-green-500 hover:bg-green-600' },
    { name: 'X (Twitter)', icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodedText}`, color: 'bg-black hover:bg-gray-800' },
    { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: 'bg-blue-700 hover:bg-blue-800' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const challengeUrl = `${siteUrl}/challenge#c=score:${score}:level:${level}:tool:${encodeURIComponent(tool)}:path:${encodeURIComponent(path)}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 flex flex-col items-center justify-center px-4 py-12">
      <Helmet>
        <title>Home Safety Score: {score}% — {levelText} | ElectroSafe.homes</title>
        <meta name="description" content={`This home scored ${score}% on ElectroSafe's ${tool}. Check your own home's electrical safety for free.`} />
        <meta property="og:title" content={`Home Safety Score: ${score}% — ${levelText}`} />
        <meta property="og:description" content={`Check your own home's electrical safety for free at ElectroSafe.homes`} />
        <meta property="og:image" content="https://electrosafe.homes/og-social-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Home Safety Score: ${score}% — ${levelText}`} />
        <meta name="twitter:description" content="Check your home's electrical safety free at ElectroSafe.homes" />
        <meta name="twitter:image" content="https://electrosafe.homes/og-social-preview.png" />
      </Helmet>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 dark:text-gray-400 hover:text-blue-600 transition-colors mb-4">
            <div className="bg-blue-600 p-1 rounded-md"><Zap className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-lg">ElectroSafe<span className="text-blue-600">.homes</span></span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 font-medium">Home Electrical Safety Score</p>
        </div>

        {/* Score Card */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientBg} text-white p-8 shadow-2xl mb-6 animate-slide-up`}>
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white dark:bg-gray-900 dark:bg-gray-900/10" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white dark:bg-gray-900 dark:bg-gray-900/10" />
          <div className="relative z-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">⚡ ElectroSafe.homes</p>
            <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full border-4 ${ringColor} bg-white dark:bg-gray-900 dark:bg-gray-900/15 backdrop-blur-sm mb-4 shadow-inner`}>
              <div>
                <span className="block text-5xl font-black">{score}%</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">Safety</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold mb-1">{emoji} {levelText}</h1>
            <p className="text-white/80 text-sm mb-6">Tested with <strong className="text-white">{tool}</strong></p>
            <div className="border-t border-white/20 pt-4">
              <p className="text-xs text-white/60">Free electrical safety check</p>
              <p className="text-xs font-bold text-white/80">electrosafe.homes</p>
            </div>
          </div>
        </div>

        {/* Share Panel */}
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 dark:border-gray-800 mb-4 animate-slide-up delay-100">
          <p className="text-center text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-5">🎯 Challenge friends to beat your score</p>

          {/* WhatsApp Primary */}
          <a href={shareLinks[0].href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all mb-4">
            <MessageCircle className="w-6 h-6" /> Share on WhatsApp
          </a>

          {/* Other Platforms */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {shareLinks.slice(1).map(link => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                className={`${link.color} text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2`}>
                <link.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.name.split(' ')[0]}</span>
              </a>
            ))}
          </div>

          {/* Copy Link */}
          <button onClick={copyLink}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mb-4 ${copied ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 dark:text-gray-400 hover:bg-gray-200 border border-gray-200 dark:border-gray-700 dark:border-gray-700'}`}>
            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><LinkIcon className="w-4 h-4" /> Copy Score Link</>}
          </button>

          {/* Challenge Link */}
          <a href={challengeUrl}
            className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-bold text-sm border border-indigo-200 transition-all">
            <Share2 className="w-4 h-4" /> Send a Challenge Link
          </a>
        </div>

        {/* CTA to Take the Test */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center animate-slide-up delay-200">
          <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-blue-100" />
          <h2 className="font-bold text-lg mb-2">Haven't checked YOUR home yet?</h2>
          <p className="text-blue-100 text-sm mb-4">Take the free {tool} — it takes less than 60 seconds.</p>
          <Link to={path}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 dark:bg-gray-900 text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-md">
            Start Free Check <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
