import React, { useEffect, useMemo, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { fetchConfig, getCategories } from '../services/configService.js';

function Products() {
  const [config, setConfig] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchConfig().then(setConfig).catch(() => {});
  }, []);

  const products = config?.products || [];
  const categories = ['All', ...getCategories(config || {})];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  if (!config) {
    return <div className="container py-5">Loading...</div>;
  }

  return (
    <main>
      <PageBanner title="Our Products" subtitle="Explore premium industrial rubber components and sealing solutions." />
      <section className="py-5">
        <div className="container">
          <div className="row align-items-end gy-3 mb-4">
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  id="productSearch"
                  type="search"
                  className="form-control"
                  placeholder="Search products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label htmlFor="productSearch">Search products</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <select id="productCategory" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <label htmlFor="productCategory">Category</label>
              </div>
            </div>
            <div className="col-md-2 text-md-end">
              <span className="text-muted">{filteredProducts.length} products</span>
            </div>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
    </main>
  );
}

export default Products;
