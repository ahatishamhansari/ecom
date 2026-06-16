"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import "./page.css";

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export default function ProductDetailClient({ product }: { product: ProductData }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color.");
      return;
    }
    // TODO: Integrate with Cart state/context
    alert(`Added ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) to cart!`);
  };

  return (
    <div className="pdp-container container">
      {/* Masonry Image Gallery */}
      <div className="pdp-gallery">
        {product.images.map((img, index) => (
          <div key={index} className={`pdp-image-wrapper ${index === 0 ? "main-image" : "sub-image"}`}>
            <Image 
              src={img} 
              alt={`${product.name} - View ${index + 1}`}
              fill
              className="pdp-image"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Product Details Area */}
      <div className="pdp-details">
        <h1 className="pdp-title">{product.name}</h1>
        <p className="pdp-price">${product.price.toFixed(2)}</p>
        
        <div className="pdp-description">
          <p>{product.description}</p>
        </div>

        {/* Color Selection */}
        <div className="pdp-section">
          <h3 className="pdp-section-title">Color: {selectedColor || "Select a color"}</h3>
          <div className="color-options">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`color-btn ${selectedColor === color.name ? "active" : ""}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="pdp-section">
          <div className="size-header">
            <h3 className="pdp-section-title">Size</h3>
            <button className="size-guide-link">Size Guide</button>
          </div>
          <div className="size-options">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pdp-actions">
          <Button 
            size="lg" 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
        
        {/* Additional Info */}
        <div className="pdp-meta">
          <p>✓ Free shipping on orders over $150</p>
          <p>✓ 30-day return policy</p>
        </div>
      </div>
    </div>
  );
}
