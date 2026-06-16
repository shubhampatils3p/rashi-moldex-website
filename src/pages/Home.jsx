import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import CTASection from '../components/CTASection.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import PageBanner from '../components/PageBanner.jsx';
import { fetchConfig, getCategories } from '../services/configService.js';

function Home() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetchConfig().then(setConfig).catch(() => {});
  }, []);

  if (!config) {
    return <div className="container py-5">Loading...</div>;
  }

  const { hero, about, industries, statistics, products } = config;
  const categories = getCategories(config);
  const featuredProducts = products.slice(0, 6);

  return (
    <main>
      <Hero hero={hero} />
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <h2>About RASHI MOLDEX</h2>
              <p className="text-secondary">{about.overview}</p>
              <Link to="/about" className="btn btn-primary mt-3">Learn More</Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="info-card p-4 rounded-4 h-100">
                    <h3>Vision</h3>
                    <p>{about.vision}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="info-card p-4 rounded-4 h-100">
                    <h3>Mission</h3>
                    <p>{about.mission}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow text-uppercase">Why Choose Us</span>
            <h2 className="mt-3">Reliable rubber manufacturing with unmatched industrial expertise</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 rounded-4 h-100">
                <i className="bi bi-award-fill feature-icon" />
                <h5>Trusted Quality</h5>
                <p>Precision manufacturing with consistent inspection across every batch.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded-4 h-100">
                <i className="bi bi-gear-fill feature-icon" />
                <h5>Engineering Support</h5>
                <p>Product guidance and custom designs tailored for application-specific needs.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded-4 h-100">
                <i className="bi bi-truck-flatbed feature-icon" />
                <h5>Fast Delivery</h5>
                <p>Efficient production and logistics for dependable supply chain performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow text-uppercase">Product Categories</span>
            <h2 className="mt-3">Explore our rubber solutions by application area</h2>
          </div>
          <div className="row g-4">
            {categories.map((category) => (
              <div className="col-md-3" key={category}>
                <div className="category-card p-4 rounded-4 h-100">
                  <h5>{category}</h5>
                  <p>Specialized products designed to deliver performance and durability.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow text-uppercase">Industries Served</span>
            <h2 className="mt-3">Solutions for heavy industry, energy, construction, and manufacturing</h2>
          </div>
          <div className="row g-4">
            {industries.map((industry) => (
              <div className="col-sm-6 col-lg-3" key={industry.title}>
                <div className="industry-card p-4 rounded-4 h-100 text-center">
                  <div className="industry-icon mb-3"><i className={industry.icon} /></div>
                  <h5>{industry.title}</h5>
                  <p className="mb-0">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow text-uppercase">Company Statistics</span>
            <h2 className="mt-3">Proven performance across every metric</h2>
          </div>
          <div className="row g-4 text-center">
            {statistics.map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <div className="stat-card p-4 rounded-4 h-100">
                  <h3 className="display-6 mb-2">{stat.value}</h3>
                  <p className="mb-0 text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to partner for your next rubber component project"
        text="Contact our team to discuss custom molded rubber products, engineered sealing solutions, and vibration control parts for your industry."
        ctaText="Contact Sales"
        ctaLink="/contact"
      />

      <section className="py-5 bg-secondary text-white">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <h2>Get in touch with our engineering and sales team</h2>
              <p className="opacity-85">Whether you need standard parts or custom rubber solutions, our team is ready to help you choose the right material and design.</p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <Link to="/contact" className="btn btn-outline-light btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 rounded-4 p-4 p-md-5 bg-white shadow-sm">
            <div>
              <h2>Featured Products</h2>
              <p className="text-secondary">Browse our latest industrial rubber components engineered for durability and performance.</p>
            </div>
            <Link to="/products" className="btn btn-primary btn-lg">View Product Range</Link>
          </div>
          <div className="mt-5">
            <ProductGrid products={featuredProducts} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
