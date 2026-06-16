import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import './layout.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
}
