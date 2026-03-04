import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

const STANDARDS = [
  {
    code: 'IEC 60364',
    full: 'International Electrotechnical Commission — Low Voltage Installations',
    desc: 'The global baseline standard for electrical safety in buildings. Covers wiring, protection, earthing, and equipment selection. Most national standards (BS 7671, IS 732) are derived from IEC 60364.',
    url: 'https://www.iec.ch/homepage',
    flag: '🌍',
    applies: 'Global reference standard',
  },
  {
    code: 'NEC 2023',
    full: 'National Electrical Code (NFPA 70) — USA',
    desc: 'The USA\'s primary electrical safety code, updated every 3 years. Mandates AFCI protection in bedrooms, GFCI near water, and tamper-resistant outlets. Adopted by most US states.',
    url: 'https://www.nfpa.org/codes-and-standards/nfpa-70-standard-for-electrical-installations',
    flag: '🇺🇸',
    applies: 'USA & Canada',
  },
  {
    code: 'BS 7671',
    full: 'IET Wiring Regulations 18th Edition — United Kingdom',
    desc: 'The UK\'s wiring standard, requiring RCD protection, proper consumer units, and EICR inspections every 5-10 years for rental properties. Part P requires certified electricians for major work.',
    url: 'https://electrical.theiet.org/bs-7671/',
    flag: '🇬🇧',
    applies: 'UK & Ireland',
  },
  {
    code: 'IS 732',
    full: 'Indian Standard 732 — Bureau of Indian Standards',
    desc: 'India\'s code of practice for electrical wiring, requiring RCCB protection, IS-certified wires and MCBs, proper earthing per IS 3043, and licensed wiremen for all installations.',
    url: 'https://www.bis.gov.in',
    flag: '🇮🇳',
    applies: 'India',
  },
];

interface BadgeProps {
  compact?: boolean;
}

export const TrustBadgeModal: React.FC<BadgeProps> = ({ compact = false }) => {
  const [openStd, setOpenStd] = useState<string | null>(null);
  const active = STANDARDS.find(s => s.code === openStd);

  return (
    <>
      {/* Badges Row */}
      <div className={`flex flex-wrap gap-2 ${compact ? '' : 'mt-6'}`}>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 font-medium mr-1">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          Verified against:
        </div>
        {STANDARDS.map(s => (
          <button
            key={s.code}
            onClick={() => setOpenStd(s.code)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-200 dark:border-gray-700 dark:border-gray-700 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all cursor-pointer group"
            title={`Learn about ${s.code}`}
          >
            <span>{s.flag}</span>
            <span>{s.code}</span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpenStd(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 dark:bg-gray-900 dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{active.flag}</div>
                <div>
                  <h2 className="font-black text-xl text-gray-900 dark:text-gray-100 dark:text-gray-100 dark:text-gray-100">{active.code}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">{active.applies}</p>
                </div>
              </div>
              <button
                onClick={() => setOpenStd(null)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:hover:text-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200 dark:text-gray-200 text-sm mb-2">{active.full}</h3>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 text-sm leading-relaxed mb-5">{active.desc}</p>

            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition"
            >
              Official Standard Website <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
