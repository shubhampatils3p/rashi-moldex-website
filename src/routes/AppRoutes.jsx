import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Home = lazy(() => import('../pages/Home.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Products = lazy(() => import('../pages/Products.jsx'));
const ProductDetails = lazy(() => import('../pages/ProductDetails.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));

function AppRoutes() {
  return (
    <div className="app-shell">
      <Navbar />
      <Suspense fallback={<div className="loading-screen bg-primary text-white vh-100 d-flex align-items-center justify-content-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default AppRoutes;
