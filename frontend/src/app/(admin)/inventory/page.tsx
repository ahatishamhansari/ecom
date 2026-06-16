"use client";

import React, { useState } from 'react';
import './page.css';

const initialInventory = [
  { sku: 'TSHIRT-BLK-M', name: 'Premium Cotton T-Shirt', variant: 'Black / Medium', stock: 45 },
  { sku: 'TSHIRT-BLK-L', name: 'Premium Cotton T-Shirt', variant: 'Black / Large', stock: 12 },
  { sku: 'SNEAK-WHT-10', name: 'Classic Sneakers', variant: 'White / US 10', stock: 0 },
  { sku: 'SNEAK-WHT-11', name: 'Classic Sneakers', variant: 'White / US 11', stock: 5 },
  { sku: 'HOOD-GRY-S', name: 'Fleece Hoodie', variant: 'Grey / Small', stock: 85 },
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});

  const handleAdjust = (sku: string) => {
    const adj = adjustments[sku];
    if (adj !== undefined) {
      setInventory(prev => prev.map(item => 
        item.sku === sku ? { ...item, stock: adj } : item
      ));
      
      // Clear adjustment input after saving
      const newAdj = { ...adjustments };
      delete newAdj[sku];
      setAdjustments(newAdj);
    }
  };

  const getStatusClass = (stock: number) => {
    if (stock > 20) return 'status-ok';
    if (stock > 0) return 'status-low';
    return 'status-out';
  };

  return (
    <div className="admin-inventory-page animate-fade-in">
      <header className="page-header">
        <h1>Inventory Management</h1>
        <p>Monitor stock levels and quickly adjust inventory for specific SKUs.</p>
      </header>

      <div className="inventory-table-container animate-slide-up">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Details</th>
              <th>Status</th>
              <th>Current Stock</th>
              <th>Adjust Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.sku}>
                <td><strong>{item.sku}</strong></td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.name}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{item.variant}</span>
                  </div>
                </td>
                <td>
                  <span className={`stock-status ${getStatusClass(item.stock)}`}>
                    {item.stock > 20 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.stock}</span>
                </td>
                <td>
                  <div className="stock-adjust-group">
                    <input 
                      type="number" 
                      min="0"
                      value={adjustments[item.sku] ?? item.stock}
                      onChange={(e) => setAdjustments({ ...adjustments, [item.sku]: parseInt(e.target.value) || 0 })}
                    />
                    <button 
                      className="btn-update"
                      onClick={() => handleAdjust(item.sku)}
                      disabled={adjustments[item.sku] === undefined || adjustments[item.sku] === item.stock}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
