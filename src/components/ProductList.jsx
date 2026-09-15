// ─── ProductList ──────────────────────────────────────────────────────────────
//
// A pure presentational component — it receives a `products` array as a prop
// and renders a grid of ProductCard components.
// It does not connect to Redux directly; the parent (HomePage) reads the store.

import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        // ownProps: `product` is passed here and will be available to
        // ProductCard's mapStateToProps via ownProps.product
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
