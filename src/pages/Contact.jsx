import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import { fetchConfig } from '../services/configService.js';

function Contact() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchConfig().then((data) => setCompany(data.company)).catch(() => {});
  }, []);

  if (!company) {
    return <div className="container py-5">Loading...</div>;
  }

  return (
    <main>
      <PageBanner title="Contact Us" subtitle="Reach out for quotations, custom orders and technical support." />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="contact-card p-4 rounded-4 shadow-sm h-100">
                <h2>Contact Information</h2>
                <p>{company.description}</p>
                <div className="mt-4">
                  <p className="mb-2"><strong>Address</strong><br />{company.address}</p>
                  <p className="mb-2"><strong>Phone</strong><br /><a href={`tel:${company.phone}`} className="text-decoration-none">{company.phone}</a></p>
                  <p className="mb-2"><strong>Email</strong><br /><a href={`mailto:${company.email}`} className="text-decoration-none">{company.email}</a></p>
                </div>
                <div className="working-hours mt-4">
                  <h5>Working Hours</h5>
                  <p className="mb-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="mb-0">Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-card p-4 rounded-4 shadow-sm h-100">
                <h2>Send a Message</h2>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input id="name" type="text" className="form-control" placeholder="Your name" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input id="email" type="email" className="form-control" placeholder="you@example.com" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input id="subject" type="text" className="form-control" placeholder="Project details" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea id="message" className="form-control" rows="5" placeholder="Tell us about your requirement"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">Submit Request</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-4 overflow-hidden map-placeholder">
            <div className="map-overlay p-5 text-white">
              <h3>Embedded Map Placeholder</h3>
              <p>Replace this placeholder with your Google Maps iframe or location embed for the factory and office.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
