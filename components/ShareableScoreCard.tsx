import React, { useState } from 'react';
import { Share2, MessageCircle, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, Sparkles } from 'lucide-react';

interface ShareableScoreCardProps {
  score: number;
  maxScore: number;
  rating: string;
  riskLevel: 'low' | 'medium' | 'high';
  toolName: string;
  toolPath: string;
}

const SHARE_VARIANTS = (emoji: string, percent: number, rating: string, toolName: string, shareUrl: string) => [
  `${emoji} My home scored ${percent}% on ElectroSafe's ${toolName}! Rating: "${rating}". ⚡ 23% of home fires start from electrical faults — check YOUR home free (60 secs): ${shareUrl}`,
  `I just found out my home is ${percent}% electrically safe 🏠⚡ How safe is yours? Free 60-second check → ${shareUrl}`,
  `${emoji} Home Safety Score: ${percent}% — "${rating}" on ElectroSafe.homes! Challenge your family to beat this 🎯 → ${shareUrl}`,
];

export const ShareableScoreCard: React.FC<ShareableScoreCardProps> = ({
  score,
  maxScore,
  rating,
  riskLevel,
  toolName,
  toolPath,
}) => {
  const [copied, setCopied] = useState(false);
  const [challengeCopied, setChallengeCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const siteUrl = 'https://electrosafe.homes';
  const safetyPercent = Math.round(((maxScore - score) / maxScore) * 100);

  const emoji = riskLevel === 'low' ? '🟢' : riskLevel === 'medium' ? '🟡' : '🔴';
  const levelText = riskLevel === 'low' ? 'Safe' : riskLevel === 'medium' ? 'Moderate Risk' : 'High Risk';

  // Score deeplink page (hash-based)
  const scoreUrl = `${siteUrl}/score#score=${safetyPercent}&level=${riskLevel}&tool=${encodeURIComponent(toolName)}&path=${encodeURIComponent(toolPath)}`;
  // Challenge link
  const challengeUrl = `${siteUrl}/challenge#c=score:${safetyPercent}:level:${riskLevel}:tool:${encodeURIComponent(toolName)}:path:${encodeURIComponent(toolPath)}`;

  // Rotate share variants daily
  const variantIndex = Math.floor(Date.now() / 86400000) % 3;
  const shareText = SHARE_VARIANTS(emoji, safetyPercent, rating, toolName, scoreUrl)[variantIndex];

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(scoreUrl);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedText}`,
      color: 'bg-green-500 hover:bg-green-600',
      label: 'Share on WhatsApp',
      isPrimary: true,
    },
    {
      name: 'Twitter (X)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}`,
      color: 'bg-black hover:bg-gray-800',
      label: 'Post on X',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      label: 'Share on Facebook',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
      label: 'Share on LinkedIn',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyChallengeLink = () => {
    navigator.clipboard.writeText(challengeUrl);
    setChallengeCopied(true);
    setTimeout(() => setChallengeCopied(false), 2500);
  };

  const gradientBg = riskLevel === 'low'
    ? 'from-emerald-500 to-green-600'
    : riskLevel === 'medium'
    ? 'from-amber-500 to-yellow-600'
    : 'from-red-500 to-red-700';

  const ringColor = riskLevel === 'low'
    ? 'border-emerald-400'
    : riskLevel === 'medium'
    ? 'border-amber-400'
    : 'border-red-400';

  return (
    <div className="mt-8 no-print">
      {/* Trigger Button */}
      {!showCard && (
        <button
          onClick={() => setShowCard(true)}
          className={`w-full py-4 px-6 bg-gradient-to-r ${gradientBg} text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group`}
        >
          <Sparkles className="w-5 h-5 group-hover:animate-spin" />
          Share Your Safety Score
          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Shareable Card */}
      {showCard && (
        <div className="animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
          {/* Visual Score Card */}
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientBg} text-white p-8 shadow-2xl mb-4`}>
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10"></div>

            <div className="relative z-10 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-white/80 mb-4">
                ⚡ ElectroSafe.homes
              </p>

              {/* Score Circle */}
              <div className="inline-flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-4 ${ringColor} bg-white/15 backdrop-blur-sm flex flex-col items-center justify-center shadow-inner`}>
                  <span className="text-5xl font-black">{safetyPercent}%</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80">Safety</span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold mt-4 mb-1">{emoji} {levelText}</h3>
              <p className="text-white/80 text-sm font-medium">{rating}</p>

              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-sm text-white/70">
                  Tested with <strong className="text-white">{toolName}</strong>
                </p>
                <p className="text-xs text-white/50 mt-1">Free at electrosafe.homes</p>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              🎯 Challenge friends to beat your score
            </p>

            {/* Primary WhatsApp Button */}
            <a
              href={shareLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all mb-4"
            >
              <MessageCircle className="w-6 h-6" />
              Share on WhatsApp
            </a>

            {/* Other platforms */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {shareLinks.slice(1).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.name.replace(' (X)', '')}</span>
                </a>
              ))}
            </div>

            {/* Copy Share Text */}
            <button
              onClick={copyToClipboard}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mb-3 ${
                copied
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {copied ? (
                <><Check className="w-4 h-4" /> Copied!</>
              ) : (
                <><LinkIcon className="w-4 h-4" /> Copy share text</>
              )}
            </button>

            {/* Challenge Link — NEW */}
            <button
              onClick={copyChallengeLink}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                challengeCopied
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              {challengeCopied ? (
                <><Check className="w-4 h-4" /> Challenge link copied!</>
              ) : (
                <><Share2 className="w-4 h-4" /> Copy Challenge Link — Can your friend beat {safetyPercent}%?</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
