"use client";

import React, { useState } from 'react';
import './page.css';

interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  children?: CategoryNode[];
}

const initialCategories: CategoryNode[] = [
  {
    id: 'cat-1',
    name: 'Apparel',
    slug: 'apparel',
    children: [
      { id: 'cat-1-1', name: 'T-Shirts', slug: 't-shirts' },
      { id: 'cat-1-2', name: 'Hoodies', slug: 'hoodies' },
    ]
  },
  {
    id: 'cat-2',
    name: 'Footwear',
    slug: 'footwear',
    children: [
      { id: 'cat-2-1', name: 'Sneakers', slug: 'sneakers' },
      { id: 'cat-2-2', name: 'Boots', slug: 'boots' },
    ]
  },
  {
    id: 'cat-3',
    name: 'Accessories',
    slug: 'accessories'
  }
];

export default function AdminCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryNode | null>(null);

  const renderTree = (nodes: CategoryNode[]) => {
    return (
      <ul className="tree-root">
        {nodes.map(node => (
          <li key={node.id} className="tree-node">
            <div 
              className={`tree-node-content ${activeCategory?.id === node.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(node)}
            >
              <div className="tree-node-label">
                {node.children && node.children.length > 0 ? '📁' : '📄'}
                {node.name}
              </div>
              <button className="btn-icon" onClick={(e) => { e.stopPropagation(); /* Add logic to append child */ }}>
                +
              </button>
            </div>
            {node.children && (
              <div className="tree-children">
                {renderTree(node.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="admin-categories-page animate-fade-in">
      <header className="page-header">
        <h1>Category Management</h1>
        <p>Organize your products by creating a structured category tree.</p>
      </header>

      <div className="categories-container animate-slide-up">
        {/* Left Panel: Category Tree */}
        <div className="category-tree-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Category Tree</h2>
            <button className="btn-icon" style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem' }}>
              + Root Category
            </button>
          </div>
          {renderTree(initialCategories)}
        </div>

        {/* Right Panel: Edit Category Details */}
        <div className="category-details-panel">
          {activeCategory ? (
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Edit Category</h2>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={activeCategory.name} readOnly />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input type="text" value={activeCategory.slug} readOnly />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Category description..." rows={4}></textarea>
              </div>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '3rem 1rem' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</p>
              <h3>Select a category</h3>
              <p>Click on a category from the tree to edit its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
