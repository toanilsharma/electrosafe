import React from 'react';

const ToolFooter: React.FC = () => {
  return (
    <footer className="bg-[#141a2b] text-amber-300 px-4 py-2 text-xs flex items-center justify-center text-center border-t border-amber-500/20 z-10 flex-shrink-0">
      <i className="fas fa-exclamation-triangle mr-3 text-amber-400"></i>
      <strong>Disclaimer:</strong> This tool is for educational purposes only and is not a substitute for a professional, site-specific analysis by a qualified person. No liability is assumed for its use.
    </footer>
  );
};

export default ToolFooter;