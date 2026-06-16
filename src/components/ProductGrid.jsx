import React from 'react';
import ProductCard from './ProductCard.jsx';

function ProductGrid({ products }) {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-lg-4" key={product.slug}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default React.memo(ProductGrid);
