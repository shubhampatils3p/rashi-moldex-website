import React from 'react';
import { Link } from 'react-router-dom';

function CTASection({ title, text, ctaText, ctaLink }) {
  return (
    <section className="cta-section py-5">
      <div className="container">
        <div className="rounded-4 p-4 p-lg-5 cta-card text-center">
          <h2 className="mb-3 text-white">{title}</h2>
          <p className="mb-4 text-light opacity-85">{text}</p>
          <Link to={ctaLink} className="btn btn-outline-light btn-lg">
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default React.memo(CTASection);
