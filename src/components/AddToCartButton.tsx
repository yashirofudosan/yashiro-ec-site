"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/microcms";

export default function AddToCartButton({ product, color }: { product: Product, color: string }) {
  const { addToCart } = useCart();

  return (
    <button 
      className="add-to-cart-btn hover-lift" 
      style={{ background: color, border: 'none', padding: '1rem', color: '#fff', fontSize: '1rem', letterSpacing: '0.1em', cursor: 'pointer', width: '100%', marginTop: '2rem' }}
      onClick={() => addToCart(product)}
    >
      ADD TO CART
    </button>
  );
}
