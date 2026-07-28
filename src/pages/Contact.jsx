import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import { fetchConfig } from '../services/configService.js';
import SEO from '../components/SEO.jsx';

function Contact() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchConfig().then((data) => setCompany(data.company)).catch(() => {});
  }, []);
  // Form state & handlers must be declared unconditionally (Hooks order must not change)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', phone: '' });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  function updateField(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ loading: false, success: false, message: 'Please fill Name, Email and Message.' });
      return;
    }
    setStatus({ loading: true, success: null, message: '' });
    try {
      const res = await fetch('/send-enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data && data.success) {
        setStatus({ loading: false, success: true, message: data.message || 'Enquiry sent successfully.' });
        setForm({ name: '', email: '', subject: '', message: '', phone: '' });
      } else {
        setStatus({ loading: false, success: false, message: (data && data.message) || 'Could not send enquiry.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, message: 'Network error. Please try again later.' });
    }
  }

  if (!company) {
    return <div className="container py-5">Loading...</div>;
  }

  const siteUrl = 'https://rashimoldex.com/contact';

  return (
    <main>
      <SEO
        title={`Contact RASHI MOLDEX | Request Quote & Support`}
        description={`Contact ${company.name} for quotations, technical support and custom molded rubber parts.`}
        url={siteUrl}
        canonical={siteUrl}
        keywords="contact, quote, rashi moldex, rubber products"
        contact={{
          "@context": "https://schema.org",
          "@type": "ContactPoint",
          telephone: company.phone,
          contactType: "customer service",
          email: company.email,
        }}
      />
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
                  <p className="mb-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-card p-4 rounded-4 shadow-sm h-100">
                <h2>Send a Message</h2>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input id="name" name="name" value={form.name} onChange={updateField} type="text" className="form-control" placeholder="Your name" required aria-required="true" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input id="email" name="email" value={form.email} onChange={updateField} type="email" className="form-control" placeholder="you@example.com" required aria-required="true" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input id="phone" name="phone" value={form.phone} onChange={updateField} type="tel" className="form-control" placeholder="Optional phone number" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input id="subject" name="subject" value={form.subject} onChange={updateField} type="text" className="form-control" placeholder="Project details" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea id="message" name="message" value={form.message} onChange={updateField} className="form-control" rows="5" placeholder="Tell us about your requirement" required aria-required="true"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary" disabled={status.loading}>{status.loading ? 'Sending…' : 'Submit Request'}</button>
                    </div>
                    {status.message && (
                      <div className={`col-12 mt-2`}>
                        <div className={`alert ${status.success ? 'alert-success' : 'alert-danger'}`}>{status.message}</div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-4 overflow-hidden map-placeholder">
            <iframe
              title="RASHI MOLDEX Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.9586384616177!2d73.85579634957821!3d18.633997769713012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c750b5cf50f9%3A0xc0c9f67bfa1780cf!2sRASHI%20MOLDEX!5e1!3m2!1sen!2sin!4v1785238370503!5m2!1sen!2sin"
              width="600"
              height="450"
              className="w-100"
              style={{ border: 0, minHeight: '450px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
