"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/microcms";

export type VariantSize = 'S' | 'M' | 'L';

export interface CartItem {
  cartItemId: string; // Unique ID for cart item (e.g. "productId-M")
  product: Product;
  quantity: number;
  variant?: VariantSize;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, variant?: VariantSize) => void;
  removeFromCart: (cartItemId: string) => void;
  toggleCart: () => void;
  cartTotal: number;
}

export function getProductPrice(product: Product, variant?: VariantSize): number {
  if (variant === 'S' && product.price_s) return product.price_s;
  if (variant === 'M' && product.price_m) return product.price_m;
  if (variant === 'L' && product.price_l) return product.price_l;
  return product.price || 0;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, variant?: VariantSize) => {
    const cartItemId = variant ? `${product.id}-${variant}` : product.id;
    
    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { cartItemId, product, quantity: 1, variant }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + getProductPrice(item.product, item.variant) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, isCartOpen, addToCart, removeFromCart, toggleCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
