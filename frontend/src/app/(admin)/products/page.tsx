"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import './page.css';

// Mock data for products
const initialProducts = Array.from({ length: 45 }).map((_, i) => ({
  id: `PROD-${1000 + i}`,
  name: `Premium ${['T-Shirt', 'Jacket', 'Sneakers', 'Jeans', 'Hoodie', 'Watch'][i % 6]} ${i + 1}`,
  category: ['Apparel', 'Outerwear', 'Footwear', 'Denim', 'Apparel', 'Accessories'][i % 6],
  price: (Math.random() * 150 + 20).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  image: `https://via.placeholder.com/150?text=Prod+${i + 1}`,
}));

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search/Filter logic
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter((p) => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.id.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [currentPage, filteredProducts]);

  const handleDelete = async (id: string) => {
    if (confirm(`Are you sure you want to delete product ${id}?`)) {
      // Mocking an API call
      setProducts(prev => prev.filter(p => p.id !== id));
      // Adjust current page if we deleted the last item on it
      if (currentProducts.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  const getStockBadgeClass = (stock: number) => {
    if (stock > 20) return 'in-stock';
    if (stock > 0) return 'low-stock';
    return 'out-of-stock';
  };

  return (
    <div className="admin-products-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product catalog, inventory, and categories.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <span>+ Add Product</span>
        </Link>
      </header>

      <div className="data-table-container animate-slide-up">
        <div className="table-toolbar" style={{ padding: '1rem' }}>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search by name, ID, or category..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
            />
          </div>
          <div className="filters">
            {/* Additional filters can go here */}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info">
                      <img src={product.image} alt={product.name} className="product-img" />
                      <div className="product-details">
                        <strong>{product.name}</strong>
                        <span>{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className={`stock-badge ${getStockBadgeClass(product.stock)}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/products/${product.id}/edit`} className="btn-icon edit" title="Edit">
                        ✏️
                      </Link>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDelete(product.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="pagination">
            <button 
              className="page-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="page-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
