"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  // Hide sidebar on the login page
  if (pathname === '/admin/login') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Inventory', path: '/admin/inventory' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Analytics', path: '/admin/analytics' },
    { name: 'Storefront Config', path: '/admin/config' },
  ];

  return (
    <aside className="admin-sidebar glass-panel">
      <div className="sidebar-header">
        <Link href="/admin">
          <h2>StyleForge <span className="admin-badge">Admin</span></h2>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link 
                  href={item.path} 
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          Log Out
        </button>
      </div>
    </aside>
  );
}
