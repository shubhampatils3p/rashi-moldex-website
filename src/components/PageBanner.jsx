import React from 'react';

function PageBanner({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="page-banner py-5 bg-secondary text-white">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <nav aria-label="breadcrumb">
              {breadcrumbs.length > 0 && (
                <ol className="breadcrumb breadcrumb-dark mb-2">
                  {breadcrumbs.map((b, i) => (
                    <li key={b.item || i} className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'active' : ''}`} aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}>
                      {i === breadcrumbs.length - 1 ? b.name : <a href={b.item} className="text-white">{b.name}</a>}
                    </li>
                  ))}
                </ol>
              )}
            </nav>
            <h1 className="mb-1">{title}</h1>
            <p className="mb-0 opacity-85">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(PageBanner);
