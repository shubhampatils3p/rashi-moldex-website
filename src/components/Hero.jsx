import React from 'react';
import { Link } from 'react-router-dom';

function Hero({ hero }) {
  return (
    <section className="hero-section py-5 position-relative overflow-hidden" style={{ backgroundImage: `url(${hero.backgroundImage})` }}>
      <div className="overlay" />
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-7 text-white">
            <p className="eyebrow text-uppercase mb-3">{hero.tagline || 'Industrial Rubber Products'}</p>
            <h1 className="display-5 fw-bold hero-heading">{hero.headline}</h1>
            <p className="lead text-light mb-4">{hero.subheadline}</p>
            <Link to={hero.ctaLink} className="btn btn-secondary btn-lg">
              {hero.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
