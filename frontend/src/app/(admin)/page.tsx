import React from 'react';
import './page.css';

// Mock Data for Statistics
const stats = [
  { label: 'Total Sales', value: '$45,231', trend: '+12.5%', isPositive: true, icon: '📈' },
  { label: 'Active Users', value: '2,405', trend: '+5.2%', isPositive: true, icon: '👥' },
  { label: 'Return Rate', value: '3.1%', trend: '-1.2%', isPositive: true, icon: '📦' },
  { label: 'Conversion Rate', value: '4.8%', trend: '+0.4%', isPositive: true, icon: '🔥' }
];

// Mock Data for Recent Orders
const recentOrders = [
  { id: 'ORD-7023', customer: 'Alice Smith', date: '2026-06-16', total: '$120.00', status: 'completed' },
  { id: 'ORD-7024', customer: 'Bob Johnson', date: '2026-06-16', total: '$85.50', status: 'processing' },
  { id: 'ORD-7025', customer: 'Charlie Brown', date: '2026-06-15', total: '$210.00', status: 'completed' },
  { id: 'ORD-7026', customer: 'Diana Prince', date: '2026-06-15', total: '$45.00', status: 'cancelled' },
  { id: 'ORD-7027', customer: 'Evan Wright', date: '2026-06-14', total: '$340.00', status: 'processing' },
];

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard animate-fade-in">
      <header className="admin-page-header">
        <h1>Dashboard Overview</h1>
        <p className="text-secondary">Welcome back to the StyleForge Admin Portal.</p>
      </header>
      
      {/* Statistics Section */}
      <section className="stats-grid animate-slide-up">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-header">
              <span>{stat.label}</span>
              <span className="stat-icon" role="img" aria-label="icon">{stat.icon}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-trend ${stat.isPositive ? 'positive' : 'negative'}`}>
              {stat.trend} vs last month
            </div>
          </div>
        ))}
      </section>

      {/* Recent Orders Section */}
      <section className="recent-orders-section animate-slide-up" style={{ animationDelay: '100ms' }}>
        <h2>Recent Orders</h2>
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <a href={`/admin/orders/${order.id}`} className="action-link">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
