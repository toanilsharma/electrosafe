import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ARTICLES } from '../data';
import { Clock, Tag, ChevronLeft, CheckCircle2, BookOpen, ShieldCheck, UserCheck } from 'lucide-react';
import { SocialShare } from '../components/SocialShare';
import { Article } from '../types';

export const Articles = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (slug) {
      const found = ARTICLES.find(a => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
      } else {
        setSelectedArticle(null);
      }
    } else {
      setSelectedArticle(null);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  // If slug exists but article not found, show 404
  if (slug && !selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Helmet>
          <title>Article Not Found | ElectroSafe</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/articles')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Articles
        </button>
      </div>
    );
  }

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
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": selectedArticle.title,
      "description": selectedArticle.metaDescription || selectedArticle.excerpt,
      "author": {
        "@type": "Person",
        "name": "Anil Sharma",
        "jobTitle": "Electrical Reliability Expert",
        "url": "https://electrosafe.homes/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ElectroSafe.homes",
        "logo": {
          "@type": "ImageObject",
          "url": "https://electrosafe.homes/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    };

    const faqLd = selectedArticle.faqs && selectedArticle.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": selectedArticle.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    } : null;

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4">
        <Helmet>
          <title>{selectedArticle.seoTitle || selectedArticle.title} | ElectroSafe Articles</title>
          <meta name="description" content={selectedArticle.metaDescription || selectedArticle.excerpt} />
          <meta name="keywords" content={selectedArticle.keywords ? selectedArticle.keywords.join(', ') : ''} />
          <link rel="canonical" href={`https://electrosafe.homes/articles/${selectedArticle.slug}`} />
          {/* Open Graph for rich social sharing */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://electrosafe.homes/articles/${selectedArticle.slug}`} />
          <meta property="og:title" content={selectedArticle.seoTitle || selectedArticle.title} />
          <meta property="og:description" content={selectedArticle.metaDescription || selectedArticle.excerpt} />
          <meta property="og:image" content="https://electrosafe.homes/android-chrome-512x512.png" />
          <meta property="og:site_name" content="ElectroSafe.homes" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={selectedArticle.seoTitle || selectedArticle.title} />
          <meta name="twitter:description" content={selectedArticle.metaDescription || selectedArticle.excerpt} />
          <meta name="twitter:image" content="https://electrosafe.homes/android-chrome-512x512.png" />
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
          {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
        </Helmet>

        <button
          onClick={() => navigate('/articles')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Base
        </button>

        <article className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-200">
          <header className="mb-10">
            <div className="flex flex-wrap gap-4 items-center text-sm font-bold tracking-wide text-blue-600 mb-6 uppercase">
              <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full"><Tag className="w-3 h-3 mr-2" /> {selectedArticle.category}</span>
              <span className="flex items-center text-gray-400"><Clock className="w-4 h-4 mr-1" /> {selectedArticle.readTime} read</span>
              {selectedArticle.standards && selectedArticle.standards.length > 0 && (
                <span className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100" title="Reference Standards">
                  <BookOpen className="w-3 h-3 mr-2" />
                  {selectedArticle.standards.join(', ')}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{selectedArticle.title}</h1>
            {/* Direct Answer / Excerpt Block */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-xl">
              <h3 className="font-bold text-indigo-900 text-lg mb-2">Key Takeaway</h3>
              <p className="text-indigo-800 text-base leading-relaxed">
                {selectedArticle.excerpt}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <SocialShare
                url={window.location.href}
                title={`Essential reading: ${selectedArticle.title}`}
                size="md"
              />
            </div>
          </header>

          <div className="space-y-6 text-gray-800 leading-relaxed">
            {selectedArticle.content.map((paragraph, idx) => {
              // 1. Bullet Points
              if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('1.') || paragraph.trim().match(/^\d+\./)) {
                return (
                  <div key={idx} className="flex gap-4 pl-2 mb-3 items-start group">
                    <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">{formatText(paragraph.replace(/^[•\d\.]+\s*/, ''))}</p>
                  </div>
                );
              }

              // 2. Headers
              // Heuristic: Short line ending in colon, no period.
              const isHeader = paragraph.includes(':') && paragraph.split(':')[0].length < 60 && !paragraph.includes('. ');

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

              return (
                <p key={idx} className="text-lg text-gray-700 leading-8 mb-6">
                  {formatText(paragraph)}
                </p>
              );
            })}
          </div>

          {/* FAQs Section */}
          {selectedArticle.faqs && selectedArticle.faqs.length > 0 && (
            <div className="mt-16 pt-10 border-t-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" /> Frequently Asked Questions
              </h3>
              <div className="grid gap-6">
                {selectedArticle.faqs.map((faq, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-100 transition-colors">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">{faq.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* E-E-A-T Author Card */}
        <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start animate-in slide-in-from-bottom-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
            <UserCheck className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Written & Verified By</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Anil Sharma</h3>
            <p className="text-blue-600 font-medium text-sm mb-3">Industrial Electrical Reliability Expert (25+ Years Exp)</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              With over two decades of experience in industrial electrical maintenance, instrumentation, and projects, Anil brings professional-grade reliability standards to home safety. He is dedicated to preventing electrical accidents through education.
            </p>
            <div className="flex gap-4 text-xs font-bold text-gray-500">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-500" /> Maintenance Expert</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-blue-500" /> Reliability Engineer</span>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-900 rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Don't let friends learn the hard way.</h3>
            <p className="mb-6 text-blue-200">Share this guide. You might save a home from a fire today.</p>
            <SocialShare
              url={window.location.href}
              title={`Essential reading: ${selectedArticle.title}`}
              size="lg"
              className="justify-center"
            />
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Electrical Safety Articles | ElectroSafe Knowledge Base</title>
        <meta name="description" content="Expert electrical safety guides for homeowners. Learn about wiring hazards, prevent fires, and understand your home's electrical system." />
        <link rel="canonical" href="https://electrosafe.homes/articles" />
      </Helmet>

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
            onClick={() => navigate(`/articles/${article.slug}`)}
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
