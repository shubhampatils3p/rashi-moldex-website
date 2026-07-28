import React from 'react';
import PageBanner from '../components/PageBanner.jsx';
import SEO from '../components/SEO.jsx';

export default function NotFound() {
  const url = 'https://rashimoldex.com/404';
  return (
    <main>
      <SEO
        title="404 Not Found — RASHI MOLDEX"
        description="The page you requested could not be found. Visit the homepage for our product range and contact information."
        url={url}
        canonical={url}
        keywords="404, not found, rashi moldex"
      />
      <PageBanner title="Page Not Found" subtitle="We couldn't find the page you're looking for." />
      <section className="py-5">
        <div className="container text-center">
          <h2 className="display-4">404</h2>
          <p className="lead">Sorry, the page you are looking for does not exist or has been moved.</p>
        </div>
      </section>
    </main>
  );
}
