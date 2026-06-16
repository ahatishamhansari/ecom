"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";
import { useAuth } from "../providers/AuthProvider";
import { useCart } from "../providers/CartProvider";
import AuthModal from "../auth/AuthModal";
import CartDrawer from "../cart/CartDrawer";
import "./Navbar.css";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="navbar-header glass-effect">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
          StyleForge
        </Link>
        <nav className="navbar-links">
          <Link href="/men">Men</Link>
          <Link href="/women">Women</Link>
          <Link href="/collections">Collections</Link>
        </nav>
        <div className="navbar-actions">
          <div className="search-placeholder flex-center">
            <span role="img" aria-label="search">🔍</span> Search
          </div>
          
          {user ? (
            <div className="user-menu flex-center">
              <span className="user-name">Hi, {user.name || 'User'}</span>
              <button className="navbar-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="navbar-btn" onClick={() => setIsAuthModalOpen(true)}>
              Login
            </button>
          )}

          <button 
            className="navbar-btn cart-btn flex-center" 
            onClick={() => {
              if (!user) setIsAuthModalOpen(true);
              else setIsCartOpen(true);
            }}
          >
            🛒 <span className="cart-count">{itemCount}</span>
          </button>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle flex-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer />
    </header>
  );
}
