import React, { useState, useRef, useEffect } from 'react';
import { Eye, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const XRaySlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize user-select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Under layer (X-Ray / Danger) */}
        <div className="absolute inset-0 bg-slate-900 w-full h-full">
           <img 
             src="https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&q=80&w=1200" 
             alt="Wall internals" 
             className="w-full h-full object-cover opacity-40 grayscale"
           />
           {/* Simulated Glowing Hazards */}
           <div className="absolute top-[30%] left-[20%] w-16 h-16 bg-red-500/50 rounded-full blur-xl animate-pulse"></div>
           <div className="absolute top-[40%] right-[30%] w-24 h-24 bg-orange-500/50 rounded-full blur-xl animate-pulse delay-75"></div>
           <div className="absolute bottom-[20%] left-[40%] w-20 h-20 bg-yellow-500/50 rounded-full blur-xl animate-pulse delay-150"></div>
           
           <div className="absolute top-[32%] left-[22%] flex items-center gap-1 text-red-400 font-bold bg-slate-900/80 px-2 py-1 rounded text-xs border border-red-500/50">
             <AlertTriangle className="w-3 h-3" /> Overloaded Circuit
           </div>
           
           <div className="absolute top-[42%] right-[32%] flex items-center gap-1 text-orange-400 font-bold bg-slate-900/80 px-2 py-1 rounded text-xs border border-orange-500/50">
             <AlertTriangle className="w-3 h-3" /> Frayed Romex
           </div>
        </div>

        {/* Top layer (Pristine Living Room) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
            alt="Pristine living room" 
            className="absolute inset-y-0 left-0 w-[100vw] h-full object-cover"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -mr-3" style={{ opacity: 0 }}><path d="m9 18 6-6-6-6"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-1"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>

      </div>

      <div className="mt-8 flex flex-col items-center animate-slide-up">
        <p className="text-indigo-200 text-lg mb-6 text-center max-w-2xl">
          A fresh coat of paint hides deadly secrets. Use our 15-minute open-house scanner before you sign the lease or buy the house.
        </p>
        <button 
          onClick={() => navigate('/home-buyer-scanner')}
          className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-xl hover:scale-105"
        >
          <Eye className="w-5 h-5" /> Start the 15-Min X-Ray Scan
        </button>
      </div>

    </div>
  );
};
