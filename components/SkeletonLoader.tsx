import React from 'react';
import { Zap } from 'lucide-react';

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <div className="w-16 h-16 bg-white border border-gray-100 shadow-xl rounded-2xl flex items-center justify-center relative z-10 animate-bounce">
          <Zap className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="h-4 w-48 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-3 w-32 bg-gray-100 rounded-full animate-pulse delay-75"></div>
      </div>
    </div>
  );
};
