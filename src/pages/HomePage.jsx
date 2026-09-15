// ─── HomePage ─────────────────────────────────────────────────────────────────
//
// Fetches products on mount via the fetchProducts thunk and renders the grid.
//
// Concept: useDispatch — dispatches the async thunk action on component mount.
// Concept: useSelector — reads products state (loading, items, error) from the store.
// Concept: useEffect — triggers the fetch exactly once when the component mounts.

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import ProductList from '../components/ProductList';

const HomePage = () => {
  const dispatch = useDispatch();

  // Select the products slice of state managed by productReducer
  const { loading, items, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Dispatch the thunk — redux-thunk calls it with dispatch, triggering the API call
    // Empty dependency array [] means this runs only once on mount
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="page-container">
      {loading && (
        <div className="status-message">Loading products...</div>
      )}

      {error && (
        <div className="status-message error-message">
          Failed to load products: {error}
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <ProductList products={items} />
      )}
    </main>
  );
};

export default HomePage;
