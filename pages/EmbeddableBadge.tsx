import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Copy, Check, Code, ExternalLink, Palette } from 'lucide-react';

const BADGE_STYLES = [
  {
    id: 'standard',
    name: 'Standard',
    preview: { bg: '#1e293b', text: '#ffffff', accent: '#22c55e' },
    html: `<a href="https://electrosafe.homes" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:#1e293b;color:#fff;border-radius:12px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:700;border:1px solid #334155;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>Verified by ElectroSafe</a>`,
  },
  {
    id: 'light',
    name: 'Light',
    preview: { bg: '#ffffff', text: '#1e293b', accent: '#2563eb' },
    html: `<a href="https://electrosafe.homes" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:#ffffff;color:#1e293b;border-radius:12px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:700;border:2px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.1);transition:transform 0.2s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>Verified by ElectroSafe</a>`,
  },
  {
    id: 'compact',
    name: 'Compact',
    preview: { bg: '#059669', text: '#ffffff', accent: '#ffffff' },
    html: `<a href="https://electrosafe.homes" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#059669;color:#fff;border-radius:8px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;font-weight:700;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>ElectroSafe ✓</a>`,
  },
  {
    id: 'banner',
    name: 'Banner',
    preview: { bg: '#0f172a', text: '#ffffff', accent: '#22c55e' },
    html: `<a href="https://electrosafe.homes" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:12px;padding:16px 24px;background:linear-gradient(135deg,#0f172a,#1e293b);color:#fff;border-radius:16px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:400px;border:1px solid #334155;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg><div><div style="font-weight:800;font-size:15px">Electrical Safety Verified</div><div style="font-size:11px;color:#94a3b8;margin-top:2px">Checked with ElectroSafe.homes</div></div></a>`,
  },
];

export const EmbeddableBadge = () => {
  const [selectedStyle, setSelectedStyle] = useState('standard');
  const [copied, setCopied] = useState(false);

  const currentBadge = BADGE_STYLES.find(b => b.id === selectedStyle)!;

  const copyCode = () => {
    navigator.clipboard.writeText(currentBadge.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Free Safety Badge for Your Website | ElectroSafe.homes</title>
        <meta name="description" content="Add a free 'Verified by ElectroSafe' badge to your property listing, landlord website, or real estate page. Build trust with tenants and buyers." />
        <meta property="og:title" content="Free Safety Badge for Your Website" />
        <meta property="og:description" content="Show tenants and buyers that electrical safety matters. Embed our free verification badge on your property listings." />
        <meta property="og:image" content="https://electrosafe.homes/android-chrome-512x512.png" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" /> Free to Use
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">
          Embed a Safety Badge
        </h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Show tenants, buyers, and visitors that electrical safety is a priority.
          Add our free badge to your property listing, landlord website, or real estate page.
        </p>
      </div>

      {/* Badge Style Selector */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4" /> Choose Style
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BADGE_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => { setSelectedStyle(style.id); setCopied(false); }}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedStyle === style.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-gray-300 bg-white dark:bg-gray-900 dark:bg-gray-900'
              }`}
            >
              <div 
                className="w-full h-8 rounded-lg mb-2" 
                style={{ background: style.preview.bg, border: `1px solid ${style.preview.bg === '#ffffff' ? '#e2e8f0' : 'transparent'}` }}
              ></div>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4" /> Preview
        </h2>
        <div className="bg-gray-100 dark:bg-gray-800/50 dark:bg-gray-800/50 rounded-2xl p-8 flex items-center justify-center min-h-[120px] border border-gray-200 dark:border-gray-700 dark:border-gray-700">
          <div dangerouslySetInnerHTML={{ __html: currentBadge.html }} />
        </div>
      </div>

      {/* Code Block */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" /> Embed Code
          </h2>
          <button
            onClick={copyCode}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              copied 
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Code</>}
          </button>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap break-all font-mono">
            {currentBadge.html}
          </pre>
        </div>
      </div>

      {/* How to Use */}
      <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">Choose a Style</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Pick the badge that matches your site's design.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">Copy the Code</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Click "Copy Code" and paste it into your HTML.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">Build Trust</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Show visitors you take electrical safety seriously.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">🏠 Landlords & Property Managers</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Add to rental listings to show tenants the property has been safety-assessed. Differentiates your listing.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">🏗️ Electricians & Contractors</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Add to your business website to show you align with global safety standards.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">📝 Real Estate Agents</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Embed in property brochures and listings pages to add a credibility layer.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">🏫 Community & Safety Blogs</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Link your safety content to authoritative verification tools.</p>
        </div>
      </div>
    </div>
  );
};
