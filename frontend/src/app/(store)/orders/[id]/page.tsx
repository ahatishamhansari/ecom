"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import './page.css';

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await fetchApi(`/orders/my/${params.id}`);
        setOrder(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [params.id]);

  if (loading) return <div className="order-container flex-center"><h2>Loading order...</h2></div>;
  if (error) return <div className="order-container flex-center"><h2>{error}</h2></div>;
  if (!order) return <div className="order-container flex-center"><h2>Order not found</h2></div>;

  return (
    <div className="order-container container">
      <div className="success-icon">✅</div>
      <h1>Order Successful!</h1>
      <p className="order-subtitle">Thank you for your purchase.</p>
      
      <div className="order-details-card glass-panel">
        <div className="order-header">
          <h2>Order #{order.orderNumber || order.id}</h2>
          <span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span>
        </div>
        
        <div className="order-summary-grid">
          <div className="summary-block">
            <h3>Shipping Address</h3>
            <p>{order.address?.fullName}</p>
            <p>{order.address?.line1}</p>
            <p>{order.address?.city}, {order.address?.state} {order.address?.postalCode}</p>
            <p>{order.address?.country}</p>
          </div>
          <div className="summary-block">
            <h3>Payment</h3>
            <p>Status: {order.paymentStatus}</p>
            <p>Total: ₹{Number(order.totalAmount).toFixed(2)}</p>
          </div>
        </div>

        <div className="order-items-list">
          <h3>Items</h3>
          {order.items?.map((item: any) => (
            <div key={item.id} className="order-item">
              <div className="item-name">{item.productName} (x{item.quantity})</div>
              <div className="item-price">₹{Number(item.totalPrice).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-actions">
        <Link href="/">
          <button className="btn-primary">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}
