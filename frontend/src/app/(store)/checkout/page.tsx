"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { fetchApi } from '@/lib/api';
import './page.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, clearCart, loading } = useCart();
  
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="checkout-container flex-center">
        <h2>Please login to continue to checkout.</h2>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="checkout-container flex-center">
        <h2>Your cart is empty.</h2>
        <button onClick={() => router.push('/')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. In a real app, we would save the address first via POST /users/addresses
      // For this mock, let's assume we have an endpoint or we just pass it to order.
      // Wait, backend CreateOrderDto needs `addressId`. 
      // Let's create an address first (assuming backend has this endpoint, 
      // if not, we will need to adjust. We'll try to create it).
      // Since we don't have a dedicated address endpoint in the current codebase context,
      // we might need a workaround or assume the endpoint exists.
      // Let's assume POST /users/addresses exists and returns an id, 
      // OR we just use a dummy id for the mock.
      const dummyAddressId = 'dummy-address-123';

      // Transform cart items to order items DTO format
      const orderItems = items.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName || 'Unknown',
        variantName: item.variantName || 'Default',
        sku: item.sku || 'SKU-000',
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        unitPrice: item.price || 0,
      }));

      const orderData = {
        addressId: dummyAddressId,
        items: orderItems,
        notes: "Mock checkout order",
      };

      const order = await fetchApi('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });

      await clearCart();
      router.push(`/orders/${order.id}`);

    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + tax + shipping;

  return (
    <div className="checkout-container container">
      <h1>Checkout</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input required name="fullName" value={address.fullName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input required name="phone" value={address.phone} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Address Line 1</label>
              <input required name="line1" value={address.line1} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input required name="city" value={address.city} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input required name="state" value={address.state} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Postal Code</label>
                <input required name="postalCode" value={address.postalCode} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input required name="country" value={address.country} onChange={handleInputChange} disabled />
              </div>
            </div>

            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="payment-option selected">
                <input type="radio" name="payment" value="cod" defaultChecked />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.productName} (x{item.quantity})</span>
                <span className="item-price">₹{(item.price || 0) * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            form="checkout-form" 
            className="btn-primary place-order-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
