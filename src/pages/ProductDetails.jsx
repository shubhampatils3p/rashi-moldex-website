import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner.jsx';
import { fetchConfig, findProductBySlug } from '../services/configService.js';
import SEO from '../components/SEO.jsx';

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchConfig().then((config) => {
      setCompany(config.company);
      const item = findProductBySlug(config, slug);
      setProduct(item);
    }).catch(() => {});
  }, [slug]);

  if (!product) {
    return <div className="container py-5">Product not found.</div>;
  }

  const siteBase = company?.website || 'https://rashimoldex.com';
  const canonical = `${siteBase}/products/${product.slug}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.summary,
    brand: { "@type": "Organization", name: company?.name || 'RASHI MOLDEX' },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: canonical }
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteBase },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteBase}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: canonical }
    ]
  };

  return (
    <main>
      <SEO
        title={`${product.name} | RASHI MOLDEX`}
        description={product.summary}
        image={product.image}
        url={canonical}
        canonical={canonical}
        keywords={`${product.name}, ${product.category}, industrial rubber`}
        productSchema={productSchema}
        breadcrumb={breadcrumb}
        pageType="product"
      />
      <PageBanner
        title={product.name}
        subtitle={product.summary}
        breadcrumbs={[
          { name: 'Home', item: siteBase },
          { name: 'Products', item: `${siteBase}/products` },
          { name: product.name, item: canonical },
        ]}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="product-detail-card rounded-4 shadow-sm overflow-hidden">
                {(() => {
                  let w, h;
                  try {
                    const m = product.image.match(/(\d+)x(\d+)/);
                    if (m) { w = parseInt(m[1], 10); h = parseInt(m[2], 10); }
                  } catch (e) {}
                  return (
                    <img loading="lazy" decoding="async" src={product.image} alt={product.name} className="img-fluid w-100" {...(w && h ? { width: w, height: h } : {})} />
                  );
                })()}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="section-card p-4 rounded-4 h-100">
                <h3>Overview</h3>
                <p>{product.summary}</p>
                <div className="mb-3">
                  <span className="badge bg-secondary">{product.category}</span>
                </div>
                <div>
                  <h5>Applications</h5>
                  <ul className="list-unstyled">
                    {product.applications.map((item) => (<li key={item}><i className="bi bi-check2-circle text-primary me-2" />{item}</li>))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h4>Key Features</h4>
                <ul className="list-unstyled ps-3">
                  {product.features.map((feature) => (
                    <li className="mb-2" key={feature}>
                      <i className="bi bi-arrow-right-short text-primary me-2" />{feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-card p-4 rounded-4 h-100">
                <h4>Specifications</h4>
                <ul className="list-unstyled ps-3">
                  {product.specifications.map((spec) => (
                    <li className="mb-2" key={spec}>
                      <i className="bi bi-check2-circle text-primary me-2" />{spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/products" className="btn btn-outline-primary">Back to Products</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
