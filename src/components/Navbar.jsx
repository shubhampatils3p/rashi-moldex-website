import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import { fetchConfig } from '../services/configService.js';

function Navbar() {
  const [company, setCompany] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetchConfig().then((data) => setCompany(data.company)).catch(() => {});
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={company.logo || '/images/logo.png'} alt="Rashi Moldex" className="brand-logo" />
          <div>
            <div className="brand-name">{company.name || 'RASHI MOLDEX'}</div>
            <small className="text-muted brand-tagline">Industrial Rubber Products</small>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {['/', '/about', '/products', '/contact'].map((path, index) => {
              const label = ['Home', 'About', 'Products', 'Contact'][index];
              return (
                <li className="nav-item" key={label}>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={path}>
                    {label}
                  </NavLink>
                </li>
              );
            })}
            <li className="nav-item mt-2 mt-lg-0">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
