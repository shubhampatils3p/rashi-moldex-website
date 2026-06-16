import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import { fetchConfig } from '../services/configService.js';

function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchConfig().then((data) => setAbout(data.about)).catch(() => {});
  }, []);

  if (!about) {
    return <div className="container py-5">Loading...</div>;
  }

  return (
    <main>
      <PageBanner title="About RASHI MOLDEX" subtitle="Industrial rubber manufacturing built for heavy industry." />
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h2>Company Overview</h2>
                <p>{about.overview}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h2>Infrastructure</h2>
                <p>{about.infrastructure}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h3>Vision</h3>
                <p>{about.vision}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h3>Mission</h3>
                <p>{about.mission}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h3>Quality Assurance</h3>
                <p>{about.quality}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h3>Manufacturing Process</h3>
                <p>{about.process}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
