import React from 'react';
import { Helmet } from 'react-helmet-async';

function buildJsonLd({ organization, website, breadcrumb, pageType, productSchema, contact }) {
  const ld = [];
  if (organization) ld.push(organization);
  if (website) ld.push(website);
  if (contact) ld.push(contact);
  if (breadcrumb) ld.push(breadcrumb);
  if (pageType === 'product' && productSchema) ld.push(productSchema);
  return ld.length ? JSON.stringify(ld.length === 1 ? ld[0] : ld) : null;
}

export default function SEO({
  title,
  description,
  keywords = '',
  image,
  url,
  canonical,
  author = 'RASHI MOLDEX',
  lang = 'en-IN',
  themeColor = '#0d47a1',
  organization = null,
  website = null,
  breadcrumb = null,
  productSchema = null,
  contact = null,
  pageType = 'website',
}) {
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : url);
  const jsonLd = buildJsonLd({ organization, website, breadcrumb, pageType, productSchema, contact });

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content={themeColor} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType === 'product' ? 'product' : 'website'} />
      <meta property="og:site_name" content="RASHI MOLDEX" />

      {/* Twitter */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* JSON-LD structured data */}
      {jsonLd && <script type="application/ld+json">{jsonLd}</script>}
    </Helmet>
  );
}
