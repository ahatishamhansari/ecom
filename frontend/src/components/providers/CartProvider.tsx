"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useAuth } from './AuthProvider';

export interface CartItem {
  id: string; // Cart item ID from DB
  productId: string;
  variantId: string;
  quantity: number;
  // Hydrated product details
  productName?: string;
  variantName?: string;
  price?: number;
  imageUrl?: string;
  sku?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  loading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (productId: string, variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    if (!token) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const cartData = await fetchApi('/cart'); // Array of { id, productId, variantId, quantity }
      
      if (!cartData || cartData.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      const productIds = [...new Set(cartData.map((item: any) => item.productId))];
      const products = await fetchApi(`/products/batch?ids=${productIds.join(',')}`);

      const hydratedItems: CartItem[] = cartData.map((cartItem: any) => {
        const product = products.find((p: any) => p._id === cartItem.productId);
        const variant = product?.variants?.find((v: any) => v._id === cartItem.variantId);
        
        return {
          id: cartItem.id,
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          quantity: cartItem.quantity,
          productName: product?.name || 'Unknown Product',
          variantName: variant?.name || 'Default',
          price: variant?.price || product?.basePrice || 0,
          imageUrl: variant?.images?.[0] || product?.images?.[0] || '',
          sku: variant?.sku || '',
        };
      });

      setItems(hydratedItems);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addToCart = async (productId: string, variantId: string, quantity = 1) => {
    if (!token) throw new Error("Must be logged in to add to cart");
    await fetchApi('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, variantId, quantity }),
    });
    await fetchCart();
    setIsCartOpen(true);
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    if (!token) return;
    await fetchApi(`/cart/items/${variantId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
    await fetchCart();
  };

  const removeFromCart = async (variantId: string) => {
    if (!token) return;
    await fetchApi(`/cart/items/${variantId}`, {
      method: 'DELETE',
    });
    await fetchCart();
  };

  const clearCart = async () => {
    if (!token) return;
    await fetchApi('/cart', {
      method: 'DELETE',
    });
    await fetchCart();
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        loading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
