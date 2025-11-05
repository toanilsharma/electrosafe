import React from 'react';
import { Link } from 'react-router-dom';
import { Tool, ToolCategory } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const getCategoryTheme = (categories: ToolCategory[]) => {
  const themeMap = {
    'arc-flash': {
      bg: 'from-amber-900/40 to-[#0f1423]',
      border: 'border-amber-500/20',
      hoverBorder: 'hover:border-amber-400',
      icon: 'text-amber-400',
      tagBg: 'bg-amber-500/10',
      tagText: 'text-amber-300',
      hoverOverlay: 'from-amber-500/10',
      buttonBaseBg: 'bg-amber-500/10',
      buttonBorder: 'border-amber-500',
      buttonText: 'text-amber-400',
      buttonHoverBg: 'group-hover:bg-amber-500',
    },
    'shock-hazard': {
      bg: 'from-blue-900/40 to-[#0f1423]',
      border: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-400',
      icon: 'text-blue-400',
      tagBg: 'bg-blue-500/10',
      tagText: 'text-blue-300',
      hoverOverlay: 'from-blue-500/10',
      buttonBaseBg: 'bg-blue-500/10',
      buttonBorder: 'border-blue-500',
      buttonText: 'text-blue-400',
      buttonHoverBg: 'group-hover:bg-blue-500',
    },
    'compliance': {
      bg: 'from-violet-900/40 to-[#0f1423]',
      border: 'border-violet-500/20',
      hoverBorder: 'hover:border-violet-400',
      icon: 'text-violet-400',
      tagBg: 'bg-violet-500/10',
      tagText: 'text-violet-300',
      hoverOverlay: 'from-violet-500/10',
      buttonBaseBg: 'bg-violet-500/10',
      buttonBorder: 'border-violet-500',
      buttonText: 'text-violet-400',
      buttonHoverBg: 'group-hover:bg-violet-500',
    },
    'dc-systems': {
      bg: 'from-green-900/40 to-[#0f1423]',
      border: 'border-green-500/20',
      hoverBorder: 'hover:border-green-400',
      icon: 'text-green-400',
      tagBg: 'bg-green-500/10',
      tagText: 'text-green-300',
      hoverOverlay: 'from-green-500/10',
      buttonBaseBg: 'bg-green-500/10',
      buttonBorder: 'border-green-500',
      buttonText: 'text-green-400',
      buttonHoverBg: 'group-hover:bg-green-500',
    },
    'ac-systems': {
        bg: 'from-cyan-900/40 to-[#0f1423]',
        border: 'border-cyan-500/20',
        hoverBorder: 'hover:border-cyan-400',
        icon: 'text-cyan-400',
        tagBg: 'bg-cyan-500/10',
        tagText: 'text-cyan-300',
        hoverOverlay: 'from-cyan-500/10',
        buttonBaseBg: 'bg-cyan-500/10',
        buttonBorder: 'border-cyan-500',
        buttonText: 'text-cyan-400',
        buttonHoverBg: 'group-hover:bg-cyan-500',
    }
  };

  // Prioritize categories for theming
  const priority = ['arc-flash', 'shock-hazard', 'dc-systems', 'ac-systems', 'compliance'];
  for (const cat of priority) {
    if (categories.includes(cat as ToolCategory)) {
      return themeMap[cat as keyof typeof themeMap];
    }
  }
  return themeMap['compliance']; // Default theme
};


const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const theme = getCategoryTheme(tool.categories);
  
  const isAvailable = tool.status === 'available';

  const cardContent = (
    <div
      className={`group relative flex flex-col h-full bg-gradient-to-br ${theme.bg} border ${theme.border} rounded-2xl p-6 text-left shadow-lg transition-all duration-300 ${theme.hoverBorder} hover:shadow-2xl hover:shadow-black/50 overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${theme.hoverOverlay} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <div className={`text-4xl mb-4 ${theme.icon}`}>
          <i className={tool.icon}></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 flex-shrink-0">{tool.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{tool.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {tool.categories.map(cat => cat !== 'all' && (
            <span key={cat} className={`text-xs font-semibold px-2 py-1 rounded-full ${theme.tagBg} ${theme.tagText}`}>
              {cat.replace('-', ' ')}
            </span>
          ))}
        </div>

        {isAvailable ? (
          <div className={`relative inline-block text-center mt-2 py-2 px-4 rounded-lg font-semibold text-sm border ${theme.buttonBorder} ${theme.buttonBaseBg} ${theme.buttonText} group-hover:text-black ${theme.buttonHoverBg} transition-all duration-300`}>
            Launch Simulator
          </div>
        ) : (
          <div className="text-center mt-2 py-2 px-4 rounded-lg font-semibold text-sm bg-gray-700 text-gray-400 cursor-not-allowed">
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );

  return isAvailable ? <Link to={tool.path} className="h-full block">{cardContent}</Link> : <div className="h-full cursor-not-allowed">{cardContent}</div>;
};

export default ToolCard;
