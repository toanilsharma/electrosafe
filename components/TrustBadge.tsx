import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink } from 'lucide-react';

interface TrustBadgeProps {
  compact?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
        <span>Results based on <strong>IEC 60364 · NEC 2023 · BS 7671</strong> — </span>
        <Link to="/standards-and-sources" className="text-blue-600 hover:underline font-medium">See sources</Link>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
      <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-bold text-green-900 text-sm">✅ Expert-Verified Safety Standards</p>
        <p className="text-green-800 text-xs mt-0.5">
          Results based on <strong>IEC 60364</strong>, <strong>NEC 2023</strong>, <strong>BS 7671</strong>, and <strong>IS 732</strong> international electrical safety codes.
        </p>
        <Link to="/standards-and-sources" className="inline-flex items-center gap-1 text-green-700 hover:text-green-900 text-xs font-bold mt-1">
          View all sources <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
