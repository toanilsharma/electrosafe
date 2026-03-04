import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ARTICLES } from '../data';
import { Clock, Tag, ChevronLeft, ChevronRight, CheckCircle2, BookOpen, ShieldCheck, UserCheck, AlertTriangle, Lightbulb, AlertOctagon, Info, Zap, ArrowRight, Calculator, ClipboardCheck, Activity, ExternalLink, Quote, Share2 } from 'lucide-react';
import { SocialShare } from '../components/SocialShare';
import { Article, RichContentBlock } from '../types';
import { RelatedTools } from '../components/RelatedTools';

// ─── Category Colors ──────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  'Basics': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-600 to-indigo-700' },
  'Prevention': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-orange-500 to-red-600' },
  'Modern Risks': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-600 to-pink-600' },
  'Habits': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'from-amber-500 to-orange-600' },
  'Safety Systems': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', gradient: 'from-green-600 to-emerald-700' },
  'Family': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', gradient: 'from-pink-500 to-rose-600' },
  'Maintenance': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', gradient: 'from-cyan-600 to-blue-700' },
  'Appliances': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', gradient: 'from-teal-500 to-green-600' },
  'Nature': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', gradient: 'from-emerald-600 to-teal-700' },
  'DIY': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', gradient: 'from-yellow-500 to-amber-600' },
};

const getCatColor = (cat: string) => CATEGORY_COLORS[cat] || CATEGORY_COLORS['Basics'];

// ─── Bold text parser ──────────────────────────────────────
const formatText = (text: string) => {
  // Parse **bold**, *italic*, `code`, and [[tool:/path|label]] links
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[\[.*?\]\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i} className="italic text-gray-700 dark:text-gray-300 dark:text-gray-300">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    }
    // [[tool:/assessment|Take the Safety Assessment]]
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const inner = part.slice(2, -2);
      const [path, label] = inner.split('|');
      return (
        <Link key={i} to={path} className="inline-flex items-center gap-1 text-blue-600 font-bold hover:text-blue-800 underline decoration-blue-300 decoration-2 underline-offset-2 transition-colors">
          {label || path} <ArrowRight className="w-3 h-3" />
        </Link>
      );
    }
    return part;
  });
};

// ─── Rich Content Block Renderer ────────────────────────────
const RenderBlock: React.FC<{ block: RichContentBlock; index: number }> = ({ block, index }) => {
  const animDelay = `${Math.min(index * 40, 400)}ms`;

  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-lg text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-8 mb-5 animate-in fade-in" style={{ animationDelay: animDelay }}>
          {formatText(block.text)}
        </p>
      );

    case 'heading':
      return block.level === 3 ? (
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-8 mb-3 flex items-center gap-2 animate-in slide-in-from-left-4" style={{ animationDelay: animDelay }}>
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          {block.text}
        </h3>
      ) : (
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-12 mb-4 animate-in slide-in-from-left-4" style={{ animationDelay: animDelay }}>
          {block.text}
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mt-3 rounded-full"></div>
        </h2>
      );

    case 'callout': {
      const variants = {
        warning: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-900', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> },
        tip: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-900', icon: <Lightbulb className="w-5 h-5 text-green-600" /> },
        danger: { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-900', icon: <AlertOctagon className="w-5 h-5 text-red-600" /> },
        info: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-900', icon: <Info className="w-5 h-5 text-blue-600" /> },
      };
      const v = variants[block.variant];
      return (
        <div className={`${v.bg} border-l-4 ${v.border} rounded-r-xl p-5 my-6 animate-in slide-in-from-left-8`} style={{ animationDelay: animDelay }}>
          <div className="flex items-center gap-2 mb-2">
            {v.icon}
            <h4 className={`font-bold ${v.text}`}>{block.title}</h4>
          </div>
          <p className={`${v.text} text-sm leading-relaxed opacity-90`}>{formatText(block.text)}</p>
        </div>
      );
    }

    case 'math':
      return (
        <div className="my-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-center shadow-lg overflow-hidden relative animate-in zoom-in-95" style={{ animationDelay: animDelay }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
          <div className="relative z-10">
            {block.label && <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">{block.label}</div>}
            <div className="text-3xl md:text-4xl font-mono font-bold text-white tracking-wider" dangerouslySetInnerHTML={{ __html: block.formula }}></div>
            {block.description && <p className="text-sm text-slate-400 mt-3 max-w-md mx-auto">{block.description}</p>}
          </div>
        </div>
      );

    case 'stat':
      return (
        <div className="my-6 bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-in zoom-in-90" style={{ animationDelay: animDelay }}>
          <div className={`text-4xl md:text-5xl font-extrabold mb-1 ${block.color || 'text-blue-600'}`}>
            {block.value}
            {block.unit && <span className="text-lg font-normal text-gray-400 ml-1">{block.unit}</span>}
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider">{block.label}</div>
        </div>
      );

    case 'stats-row':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 animate-in slide-in-from-bottom-4" style={{ animationDelay: animDelay }}>
          {block.stats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 text-center shadow-sm hover:scale-105 transition-transform">
              <div className={`text-2xl md:text-3xl font-extrabold ${s.color || 'text-blue-600'}`}>{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      );

    case 'comparison':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 animate-in slide-in-from-bottom-4" style={{ animationDelay: animDelay }}>
          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" /> {block.bad.title}
            </h4>
            <ul className="space-y-2">
              {block.bad.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                  <span className="text-red-400 mt-1">✗</span> {formatText(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {block.good.title}
            </h4>
            <ul className="space-y-2">
              {block.good.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                  <span className="text-green-500 mt-1">✓</span> {formatText(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'steps':
      return (
        <div className="my-8 animate-in slide-in-from-bottom-4" style={{ animationDelay: animDelay }}>
          {block.title && <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">{block.title}</h3>}
          <div className="space-y-0 relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            {block.steps.map((step, i) => (
              <div key={i} className="flex gap-4 relative pl-2">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm z-10 shadow-md">
                  {i + 1}
                </div>
                <div className="pb-6 pt-1">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-base">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 leading-relaxed mt-1">{formatText(step.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'tool-link':
      return (
        <Link to={block.path} className="block my-6 group animate-in slide-in-from-bottom-4" style={{ animationDelay: animDelay }}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white flex items-center gap-4 shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all">
            <div className="bg-white dark:bg-gray-900 dark:bg-gray-900/20 rounded-xl p-3">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Try It Yourself</div>
              <div className="font-bold text-lg">{block.tool}</div>
              <div className="text-blue-200 text-sm">{block.description}</div>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      );

    case 'diagram':
      return (
        <div className="my-8 animate-in zoom-in-95" style={{ animationDelay: animDelay }}>
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 shadow-sm" dangerouslySetInnerHTML={{ __html: block.svg }}></div>
          {block.caption && <p className="text-center text-xs text-gray-400 mt-2 italic">{block.caption}</p>}
        </div>
      );

    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-blue-500 pl-6 py-2 animate-in slide-in-from-left-4" style={{ animationDelay: animDelay }}>
          <p className="text-xl italic text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed">{formatText(block.text)}</p>
          {block.author && <cite className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-2 block not-italic">— {block.author}</cite>}
        </blockquote>
      );

    default:
      return null;
  }
};

// ─── Reading Progress Bar ────────────────────────────────────
const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-200/50">
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

// ─── Related Article Card ───────────────────────────────────
const RelatedArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const navigate = useNavigate();
  const cat = getCatColor(article.category);
  return (
    <div
      onClick={() => navigate(`/articles/${article.slug}`)}
      className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:shadow-md cursor-pointer transition-all group"
    >
      <span className={`text-xs font-bold ${cat.text} ${cat.bg} px-2 py-0.5 rounded-full`}>{article.category}</span>
      <h4 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-2 text-sm group-hover:text-blue-600 transition-colors leading-tight">{article.title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1 line-clamp-2">{article.excerpt}</p>
    </div>
  );
};

// ─── Main Articles Component ────────────────────────────────
export const Articles = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    if (slug) {
      const found = ARTICLES.find(a => a.slug === slug);
      setSelectedArticle(found || null);
    } else {
      setSelectedArticle(null);
    }
    window.scrollTo(0, 0);
    setFaqOpen(null);
  }, [slug]);

  // 404
  if (slug && !selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Helmet>
          <title>Article Not Found | ElectroSafe</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">Article Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-8">The article you are looking for does not exist or has been moved.</p>
        <button onClick={() => navigate('/articles')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Articles
        </button>
      </div>
    );
  }

  // ─── ARTICLE DETAIL VIEW ──────────────────────────────────
  if (selectedArticle) {
    const catColor = getCatColor(selectedArticle.category);
    const blocks: RichContentBlock[] = selectedArticle.richContent || selectedArticle.content.map(text => ({ type: 'paragraph' as const, text }));

    // Find related articles
    const related = selectedArticle.relatedArticles
      ? ARTICLES.filter(a => selectedArticle.relatedArticles!.includes(a.slug) && a.slug !== selectedArticle.slug)
      : ARTICLES.filter(a => a.category === selectedArticle.category && a.id !== selectedArticle.id).slice(0, 3);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": selectedArticle.title,
      "description": selectedArticle.metaDescription || selectedArticle.excerpt,
      "author": { "@type": "Person", "name": "Anil Sharma", "jobTitle": "Electrical Reliability Expert", "url": "https://electrosafe.homes/about" },
      "publisher": { "@type": "Organization", "name": "ElectroSafe.homes", "logo": { "@type": "ImageObject", "url": "https://electrosafe.homes/logo.png" } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href }
    };

    const faqLd = selectedArticle.faqs && selectedArticle.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": selectedArticle.faqs.map(f => ({
        "@type": "Question", "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    } : null;

    return (
      <>
        <ReadingProgress />
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in">
          <Helmet>
            <title>{selectedArticle.seoTitle || selectedArticle.title} | ElectroSafe Articles</title>
            <meta name="description" content={selectedArticle.metaDescription || selectedArticle.excerpt} />
            <meta name="keywords" content={selectedArticle.keywords ? selectedArticle.keywords.join(', ') : ''} />
            <link rel="canonical" href={`https://electrosafe.homes/articles/${selectedArticle.slug}`} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://electrosafe.homes/articles/${selectedArticle.slug}`} />
            <meta property="og:title" content={selectedArticle.seoTitle || selectedArticle.title} />
            <meta property="og:description" content={selectedArticle.metaDescription || selectedArticle.excerpt} />
            <meta property="og:image" content="https://electrosafe.homes/android-chrome-512x512.png" />
            <meta property="og:site_name" content="ElectroSafe.homes" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={selectedArticle.seoTitle || selectedArticle.title} />
            <meta name="twitter:description" content={selectedArticle.metaDescription || selectedArticle.excerpt} />
            <meta name="twitter:image" content="https://electrosafe.homes/android-chrome-512x512.png" />
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
          </Helmet>

          <button onClick={() => navigate('/articles')} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors group">
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Base
          </button>

          {/* Hero Header */}
          <div className={`bg-gradient-to-br ${catColor.gradient} rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden shadow-2xl`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap gap-3 items-center text-sm mb-6">
                <span className="bg-white dark:bg-gray-900 dark:bg-gray-900/20 backdrop-blur-sm px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <Tag className="w-3 h-3" /> {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1 text-white/70">
                  <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime} read
                </span>
                {selectedArticle.standards && selectedArticle.standards.length > 0 && (
                  <span className="bg-white dark:bg-gray-900 dark:bg-gray-900/10 backdrop-blur-sm px-3 py-1 rounded-full font-medium flex items-center gap-1.5 text-xs">
                    <BookOpen className="w-3 h-3" /> {selectedArticle.standards.join(' · ')}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">{selectedArticle.title}</h1>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed">{selectedArticle.excerpt}</p>
            </div>
          </div>

          {/* Share bar */}
          <div className="flex items-center justify-between mb-10 py-4 border-b border-gray-100 dark:border-gray-800 dark:border-gray-800">
            <SocialShare url={window.location.href} title={`Must-read: ${selectedArticle.title}`} size="md" />
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Share2 className="w-3 h-3" /> Share to save a home
            </span>
          </div>

          {/* ─── Rich Content Body ──────────────────────────── */}
          <article className="mb-16">
            <div className="space-y-1">
              {blocks.map((block, idx) => (
                <RenderBlock key={idx} block={block} index={idx} />
              ))}
            </div>

            {/* Inline Related Tools */}
            {selectedArticle.relatedTools && selectedArticle.relatedTools.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" /> Related Tools on ElectroSafe
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedArticle.relatedTools.map((tool, i) => (
                    <Link key={i} to={tool.path} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 hover:bg-blue-50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-blue-200 transition-all group">
                      <div className="bg-blue-100 p-2 rounded-lg"><Zap className="w-4 h-4 text-blue-600" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 text-sm group-hover:text-blue-600 transition-colors">{tool.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{tool.why}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ─── FAQs with accordion ─────────────────────────── */}
          {selectedArticle.faqs && selectedArticle.faqs.length > 0 && (
            <div className="mb-16 animate-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" /> Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {selectedArticle.faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 overflow-hidden hover:border-blue-100 transition-colors shadow-sm">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full text-left p-5 font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${faqOpen === i ? 'rotate-90' : ''}`} />
                    </button>
                    {faqOpen === i && (
                      <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 dark:text-gray-400 leading-relaxed text-sm animate-in slide-in-from-top-2 border-t border-gray-50 pt-3">
                        {formatText(faq.answer)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Related Articles ─────────────────────────────── */}
          {related.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">Keep Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map(a => <RelatedArticleCard key={a.id} article={a} />)}
              </div>
            </div>
          )}

          {/* ─── Author Card (E-E-A-T) ────────────────────────── */}
          <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start mb-10 animate-in slide-in-from-bottom-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-1">Written & Verified By</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">Anil Sharma</h3>
              <p className="text-blue-600 font-medium text-sm mb-3">Industrial Electrical Reliability Expert (25+ Years Exp)</p>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm leading-relaxed mb-4">
                With over two decades of experience in industrial electrical maintenance, instrumentation, and projects, Anil brings professional-grade reliability standards to home safety knowledge. No AI-generated fluff — just hard-earned field wisdom.
              </p>
              <div className="flex gap-4 text-xs font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-500" /> Field Expert</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-blue-500" /> Reliability Engineer</span>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-8 text-center text-white overflow-hidden shadow-xl relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.3),transparent_70%)] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-3">Don't let friends learn the hard way.</h3>
              <p className="mb-6 text-blue-200 text-sm">Share this guide. You might save a home from a fire today.</p>
              <SocialShare url={window.location.href} title={`Essential reading: ${selectedArticle.title}`} size="lg" className="justify-center" />
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── GRID VIEW (Article Listing) ─────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Electrical Safety Articles | ElectroSafe Knowledge Base</title>
        <meta name="description" content="Expert electrical safety guides for homeowners. Learn about wiring hazards, prevent fires, and understand your home's electrical system." />
        <link rel="canonical" href="https://electrosafe.homes/articles" />
      </Helmet>

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5" /> {ARTICLES.length} Expert Guides
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 tracking-tight">Electrical Knowledge Base</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
          No boring textbooks. No AI fluff. Real-world electrical wisdom rewritten for non-engineers — with the math and physics that actually matter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => {
          const cat = getCatColor(article.category);
          const shareCount = 120 + parseInt(article.id) * 47 + new Date().getDate() * 3;
          return (
            <div
              key={article.id}
              onClick={() => navigate(`/articles/${article.slug}`)}
              className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 dark:border-gray-700 cursor-pointer group flex flex-col relative overflow-hidden"
            >
              {/* Category Color Band */}
              <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`}></div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 ${cat.bg} ${cat.text} text-xs font-bold uppercase tracking-wider rounded-full border ${cat.border}`}>
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs font-bold flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
                  {article.excerpt}
                </p>

                {/* Standards badges */}
                {article.standards && article.standards.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.standards.map((std, i) => (
                      <span key={i} className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800 dark:border-gray-800">{std}</span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> {shareCount} shares
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <Link to="/assessment" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
          <ClipboardCheck className="w-5 h-5" /> Take the Free Safety Assessment
        </Link>
        <p className="text-gray-400 text-sm mt-3">25 questions · 5 minutes · Could save your family</p>
      </div>
    </div>
  );
};
