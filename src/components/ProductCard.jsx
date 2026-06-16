import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card product-card border-0 shadow-sm h-100">
      <img loading="lazy" src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.summary}</p>
        <div className="mt-auto">
          <span className="badge bg-secondary mb-3 d-inline-block">{product.category}</span>
          <Link to={`/products/${product.slug}`} className="btn btn-outline-primary btn-sm stretched-link mt-2">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
