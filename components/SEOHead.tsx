import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
  jsonLd?: object;
  breadcrumbs?: { name: string; path: string }[];
}

/**
 * Reusable SEO Head component. Every page should use this.
 *
 * Injects:
 * - <title>, <meta description>, <link canonical>
 * - Open Graph tags
 * - Twitter Card tags
 * - JSON-LD BreadcrumbList
 * - Optional custom JSON-LD (FAQ, HowTo, etc.)
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  path,
  type = 'website',
  image = 'https://electrosafe.homes/android-chrome-512x512.png',
  noindex = false,
  jsonLd,
  breadcrumbs,
}) => {
  const url = `https://electrosafe.homes${path}`;
  const fullTitle = title.includes('ElectroSafe') ? title : `${title} | ElectroSafe.homes`;

  // Generate BreadcrumbList JSON-LD
  const breadcrumbLd = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://electrosafe.homes/' },
      ...breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: b.name,
        item: `https://electrosafe.homes${b.path}`,
      })),
    ],
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ElectroSafe.homes" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Breadcrumbs JSON-LD */}
      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}

      {/* Custom JSON-LD (FAQ, HowTo, etc.) */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};
