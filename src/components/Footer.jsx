import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchConfig } from '../services/configService.js';

function Footer() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetchConfig().then(setConfig).catch(() => {});
  }, []);

  const company = config?.company || {};
  const socialLinks = config?.socialLinks || [];

  return (
    <footer className="site-footer bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-5">
            <h5>{company.name || 'RASHI MOLDEX'}</h5>
            <p className="text-muted">{company.description || 'Industrial rubber products crafted for performance, durability and reliability.'}</p>
          </div>
          <div className="col-md-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/" className="text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none">About</Link></li>
              <li><Link to="/products" className="text-decoration-none">Products</Link></li>
              <li><Link to="/contact" className="text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Contact</h6>
            <p className="mb-1"><i className="bi bi-telephone-fill me-2" />{company.phone || '+91 98765 43210'}</p>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2" />{company.email || 'info@rashimoldex.com'}</p>
            <p className="mb-0"><i className="bi bi-geo-alt-fill me-2" />{company.address || 'Plot 24, Industrial Area, Ankleshwar, Gujarat'}</p>
            <div className="social-icons mt-3">
              {socialLinks.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-light me-3 fs-5">
                  <i className={link.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-top mt-4 pt-3 text-center text-muted small">
          © {new Date().getFullYear()} {company.name || 'RASHI MOLDEX'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
