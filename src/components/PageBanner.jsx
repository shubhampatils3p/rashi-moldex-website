import React from 'react';

function PageBanner({ title, subtitle }) {
  return (
    <section className="page-banner py-5 bg-secondary text-white">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <h1 className="mb-1">{title}</h1>
            <p className="mb-0 opacity-85">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(PageBanner);
