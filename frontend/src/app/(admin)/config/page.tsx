"use client";

import React, { useState } from 'react';
import './page.css';

export default function UIConfigEnginePage() {
  const [heroTitle, setHeroTitle] = useState('Discover the Latest in Fashion');
  const [heroSubtitle, setHeroSubtitle] = useState('Elevate your wardrobe with our premium collection of apparel and accessories.');
  const [heroCta, setHeroCta] = useState('Shop Now');
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop');
  
  const [collections, setCollections] = useState([
    { id: 'col-1', name: 'Summer Essentials' },
    { id: 'col-2', name: 'Premium Outerwear' },
    { id: 'col-3', name: 'Sneaker Drops' },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Storefront configuration saved successfully!');
    }, 800);
  };

  const removeCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
  };

  return (
    <div className="admin-config-page animate-fade-in">
      <header className="page-header">
        <h1>Storefront Config Engine</h1>
        <p>Dynamically update the homepage layout, hero section, and featured collections.</p>
      </header>

      <div className="config-grid animate-slide-up">
        {/* Left Column: Hero Section Configuration */}
        <section className="config-section">
          <h2>Hero Section Layout</h2>
          <div className="form-group">
            <label>Hero Title</label>
            <input 
              type="text" 
              value={heroTitle} 
              onChange={(e) => setHeroTitle(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Hero Subtitle</label>
            <textarea 
              rows={3} 
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Call to Action (CTA) Button Text</label>
            <input 
              type="text" 
              value={heroCta} 
              onChange={(e) => setHeroCta(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Hero Background Image URL</label>
            <input 
              type="url" 
              value={heroImage} 
              onChange={(e) => setHeroImage(e.target.value)} 
            />
            <div className="image-preview">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroImage} alt="Hero Preview" />
              ) : (
                <span>No Image Selected</span>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Featured Collections & Misc */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="config-section">
            <h2>Featured Collections</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
              Select which collections appear on the homepage. Drag to reorder (simulated).
            </p>
            <div className="collections-list">
              {collections.map(col => (
                <div key={col.id} className="collection-item">
                  <div>
                    <span className="drag-handle">☰</span>
                    <strong>{col.name}</strong>
                  </div>
                  <button className="btn-remove" onClick={() => removeCollection(col.id)}>Remove</button>
                </div>
              ))}
            </div>
            <button className="btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>
              + Add Collection
            </button>
          </section>

          <section className="config-section">
            <h2>Announcement Bar</h2>
            <div className="form-group">
              <label>Banner Text</label>
              <input type="text" defaultValue="Free shipping on all orders over $100! 🚚" />
            </div>
            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="enableBanner" defaultChecked style={{ width: 'auto' }} />
              <label htmlFor="enableBanner" style={{ margin: 0 }}>Enable Announcement Bar</label>
            </div>
          </section>
        </div>
      </div>

      <div className="save-actions animate-slide-up" style={{ animationDelay: '100ms' }}>
        <button className="btn-secondary">Discard Changes</button>
        <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Publishing...' : 'Publish Changes'}
        </button>
      </div>
    </div>
  );
}
