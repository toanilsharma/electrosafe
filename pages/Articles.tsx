
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ARTICLES } from '../data';
import { Clock, Tag, ChevronLeft } from 'lucide-react';
import { Article } from '../types';

export const Articles = () => {
  const location = useLocation();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (location.state?.id) {
      const found = ARTICLES.find(a => a.id === location.state.id);
      if (found) setSelectedArticle(found);
    }
  }, [location.state]);

  // Helper to parse bold text markers (**text**)
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900 bg-yellow-50 px-1 rounded">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Knowledge Base
        </button>
        
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200">
          <header className="mb-10">
            <div className="flex gap-4 items-center text-sm font-bold tracking-wide text-blue-600 mb-4 uppercase">
              <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full"><Tag className="w-3 h-3 mr-2" /> {selectedArticle.category}</span>
              <span className="flex items-center text-gray-400"><Clock className="w-4 h-4 mr-1" /> {selectedArticle.readTime} read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{selectedArticle.title}</h1>
            <div className="text-xl text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-6 py-2 italic bg-gray-50 rounded-r-lg">
              {selectedArticle.excerpt}
            </div>
          </header>

          <div className="space-y-6 text-gray-800 leading-relaxed">
            {selectedArticle.content.map((paragraph, idx) => {
              
              // 1. Bullet Points
              if (paragraph.trim().startsWith('•')) {
                return (
                  <div key={idx} className="flex gap-4 pl-2 mb-3 items-start group">
                    <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">{formatText(paragraph.replace(/^•\s*/, ''))}</p>
                  </div>
                );
              }

              // 2. Headers (Short text ending in :)
              const isHeader = paragraph.includes(':') && 
                               paragraph.split(':')[0].length < 60 && 
                               !paragraph.includes('. ');

              if (isHeader) {
                const [title, ...rest] = paragraph.split(':');
                const body = rest.join(':').trim();
                return (
                  <div key={idx} className="mt-10 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                      {title}
                    </h3>
                    {body && <p className="text-lg text-gray-700 pl-1">{formatText(body)}</p>}
                    <div className="h-1 w-20 bg-blue-100 mt-4 rounded-full"></div>
                  </div>
                );
              }

              // 3. Standard Paragraph
              return (
                <p key={idx} className="text-lg text-gray-700 leading-8 mb-6">
                  {formatText(paragraph)}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Electrical Knowledge Base</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Expert guides rewritten for non-experts. Learn the hidden language of your home's wiring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map((article) => (
          <div 
            key={article.id} 
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer group flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">
                  {article.category}
                </span>
                <span className="text-gray-400 text-xs font-bold flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> {article.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
              Read Article <ChevronLeft className="w-4 h-4 rotate-180 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
