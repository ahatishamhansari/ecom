"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import "./page.css";

const MOCK_PRODUCTS = [
  { id: "1", name: "Oversized Cotton Tee", price: 45, category: "Tops", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "Slim Fit Chinos", price: 85, category: "Bottoms", imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800" },
  { id: "3", name: "Classic Denim Jacket", price: 120, category: "Outerwear", imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800" },
  { id: "4", name: "Minimalist Sneakers", price: 110, category: "Footwear", imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800" },
  { id: "5", name: "Linen Summer Shirt", price: 65, category: "Tops", imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800" },
  { id: "6", name: "Tailored Trousers", price: 95, category: "Bottoms", imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800" },
];

export default function CollectionsClient() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    const applyClientSideFilters = () => {
      let filtered = [...MOCK_PRODUCTS];

      if (searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      
      if (categories.length > 0) {
        filtered = filtered.filter(p => categories.includes(p.category));
      }

      if (minPrice) {
        filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
      }

      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
      }

      setProducts(filtered);
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build query params
        const params = new URLSearchParams();
        if (searchQuery) params.append("q", searchQuery);
        
        const filterParts = [];
        if (categories.length > 0) {
          filterParts.push(`category IN [${categories.map(c => `"${c}"`).join(",")}]`);
        }
        if (minPrice) filterParts.push(`price >= ${minPrice}`);
        if (maxPrice) filterParts.push(`price <= ${maxPrice}`);
        
        // sizes would be similarly handled if schema supports it
        
        if (filterParts.length > 0) {
          params.append("filter", filterParts.join(" AND "));
        }

        const url = `http://localhost:3001/search?${params.toString()}`;
        
        // Attempt to fetch from the NestJS MeiliSearch endpoint
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error("API not available");
        }
        
        const data = await res.json();
        
        // Fallback to mock data if the API returns an empty array or no hits
        if (data.hits && data.hits.length > 0) {
          // Map backend schema to frontend representation
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fetchedProducts = data.hits.map((hit: any) => ({
            id: hit.id || hit._id,
            name: hit.name || hit.title,
            price: hit.price,
            category: hit.category,
            imageUrl: hit.imageUrl || hit.images?.[0] || MOCK_PRODUCTS[0].imageUrl,
          }));
          setProducts(fetchedProducts);
        } else {
          // If no hits, might be empty DB, fallback to mock to keep UI testable
          applyClientSideFilters();
        }
      } catch (error) {
        console.warn("Search API fetch failed, falling back to mock data.", error);
        applyClientSideFilters();
      } finally {
        setLoading(false);
      }
    };

    // Debounce slightly to avoid spamming the API on typing
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, categories, minPrice, maxPrice, sizes]);

  const handleCategoryToggle = (category: string) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  return (
    <div className="plp-container container">
      {/* Sidebar Filters */}
      <aside className="plp-sidebar">
        <div className="filter-section">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="ui-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        <div className="filter-section">
          <h3 className="filter-title">Category</h3>
          <ul className="filter-list">
            {["Tops", "Bottoms", "Outerwear", "Footwear"].map(cat => (
              <li key={cat}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={categories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  /> {cat}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-section">
          <h3 className="filter-title">Price Range</h3>
          <div className="price-inputs">
            <input 
              type="number" 
              placeholder="Min" 
              className="ui-input" 
              style={{ width: '100%' }} 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="ui-input" 
              style={{ width: '100%' }} 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <h3 className="filter-title">Size</h3>
          <div className="size-grid">
            {["S", "M", "L", "XL"].map(size => (
              <button 
                key={size}
                className={`size-btn ${sizes.includes(size) ? 'active' : ''}`}
                onClick={() => handleSizeToggle(size)}
                style={{
                  borderColor: sizes.includes(size) ? 'var(--color-primary)' : 'var(--color-border)',
                  color: sizes.includes(size) ? 'var(--color-primary)' : 'var(--color-text-primary)'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Product Grid */}
      <main className="plp-main">
        <div className="plp-header">
          <h1 className="plp-heading">All Collections</h1>
          <span className="plp-results">{products.length} Results</span>
        </div>

        <div className="product-grid" style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          {products.length === 0 ? (
            <p>No products found matching your filters.</p>
          ) : (
            products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="product-card-link">
                <Card className="product-card glass-effect">
                  <div className="product-image-wrapper">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name}
                      fill
                      className="product-image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">${product.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
