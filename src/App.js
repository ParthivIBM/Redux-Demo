// ─── App — Router Setup ───────────────────────────────────────────────────────
//
// BrowserRouter wraps the whole app to enable client-side routing.
// Routes maps URL paths to page components:
//   /          → HomePage      (product grid)
//   /cart      → CartPage      (cart — uses hooks: useSelector, useDispatch)
//   /wishlist  → WishlistPage  (wishlist — uses connect() exclusively, no hooks)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it appears on every page */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
