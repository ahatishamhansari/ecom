"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../providers/CartProvider';
import './CartDrawer.css';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, loading } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer glass-panel">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        <div className="cart-items">
          {loading && items.length === 0 ? (
            <div className="cart-empty flex-center">Loading...</div>
          ) : items.length === 0 ? (
            <div className="cart-empty flex-center">
              <p>Your cart is empty.</p>
              <button className="continue-shopping-btn" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} />
                  ) : (
                    <div className="placeholder-img" />
                  )}
                </div>
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <p className="variant-name">{item.variantName}</p>
                  <p className="item-price">₹{item.price}</p>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.variantId)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <p className="taxes-note">Taxes and shipping calculated at checkout</p>
            <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
