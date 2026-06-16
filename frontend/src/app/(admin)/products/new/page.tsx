"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './page.css';

interface DynamicAttribute {
  key: string;
  value: string;
}

export default function ProductCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [attributes, setAttributes] = useState<DynamicAttribute[]>([
    { key: 'Material', value: 'Cotton' },
    { key: 'Fit', value: 'Regular' }
  ]);

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const updateAttribute = (index: number, field: keyof DynamicAttribute, value: string) => {
    const newAttrs = [...attributes];
    newAttrs[index][field] = value;
    setAttributes(newAttrs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/admin/products');
    }, 1000);
  };

  return (
    <div className="product-form-container animate-fade-in">
      <form onSubmit={handleSubmit}>
        <header className="product-form-header">
          <div>
            <h1>Create New Product</h1>
            <p className="text-secondary">Fill in the details to add a new product to your catalog.</p>
          </div>
          <div className="header-actions">
            <Link href="/admin/products" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </header>

        <div className="product-form-grid animate-slide-up" style={{ marginTop: '2rem' }}>
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <section className="form-section">
              <h2>Basic Information</h2>
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input type="text" id="name" placeholder="e.g. Premium Cotton T-Shirt" required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea id="description" placeholder="Write a compelling description..." required></textarea>
              </div>
            </section>

            <section className="form-section">
              <h2>Pricing & Inventory</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price ($) *</label>
                  <input type="number" id="price" placeholder="0.00" min="0" step="0.01" required />
                </div>
                <div className="form-group">
                  <label htmlFor="comparePrice">Compare at Price</label>
                  <input type="number" id="comparePrice" placeholder="0.00" min="0" step="0.01" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <input type="text" id="sku" placeholder="e.g. TSHIRT-BLK-M" />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Available Stock *</label>
                  <input type="number" id="stock" placeholder="0" min="0" required />
                </div>
              </div>
            </section>

          </div>

          {/* Side Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <section className="form-section">
              <h2>Product Status</h2>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category">
                  <option value="apparel">Apparel</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </section>

            <section className="form-section">
              <h2>Media (Cloudinary)</h2>
              <div 
                className={`image-upload-area ${dragOver ? 'drag-over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              >
                <span className="upload-icon">📸</span>
                <strong>Click or drag images here</strong>
                <span style={{ fontSize: '0.85rem' }}>PNG, JPG, WEBP up to 5MB</span>
              </div>
            </section>

            <section className="form-section">
              <h2>Dynamic Attributes</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                Add custom key-value pairs for this product.
              </p>
              
              <div className="dynamic-attributes-list">
                {attributes.map((attr, index) => (
                  <div key={index} className="dynamic-attribute-item">
                    <input 
                      type="text" 
                      placeholder="Key (e.g. Material)" 
                      value={attr.key}
                      onChange={(e) => updateAttribute(index, 'key', e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder="Value (e.g. Cotton)" 
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                    />
                    <button type="button" className="btn-remove" onClick={() => removeAttribute(index)}>✕</button>
                  </div>
                ))}
              </div>
              <button type="button" className="btn-add" onClick={addAttribute}>
                + Add Attribute
              </button>
            </section>

          </div>
        </div>
      </form>
    </div>
  );
}
