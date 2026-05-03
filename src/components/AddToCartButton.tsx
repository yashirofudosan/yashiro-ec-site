"use client";

import { useState, useEffect } from "react";
import { useCart, VariantSize, getProductPrice } from "@/context/CartContext";
import { Product } from "@/lib/microcms";

export default function AddToCartButton({ product, color }: { product: Product, color: string }) {
  const { addToCart } = useCart();
  
  // Determine available variants
  const hasVariants = !!(product.price_s || product.price_m || product.price_l);
  const availableVariants: { size: VariantSize; price: number }[] = [];
  if (product.price_s) availableVariants.push({ size: 'S', price: product.price_s });
  if (product.price_m) availableVariants.push({ size: 'M', price: product.price_m });
  if (product.price_l) availableVariants.push({ size: 'L', price: product.price_l });

  const [selectedVariant, setSelectedVariant] = useState<VariantSize | undefined>(
    hasVariants && availableVariants.length > 0 ? availableVariants[0].size : undefined
  );

  const displayPrice = getProductPrice(product, selectedVariant);

  return (
    <div className="product-purchase-area">
      <p className="detail-price" style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        ¥{displayPrice ? displayPrice.toLocaleString() : '--'}
      </p>

      {hasVariants && (
        <div className="variant-selector" style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>SIZE</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {availableVariants.map((v) => (
              <button
                key={v.size}
                onClick={() => setSelectedVariant(v.size)}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: selectedVariant === v.size ? color : 'transparent',
                  color: selectedVariant === v.size ? '#000' : 'var(--text-primary)',
                  border: `1px solid ${selectedVariant === v.size ? color : 'var(--glass-border)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: selectedVariant === v.size ? 600 : 400,
                  transition: 'all 0.2s',
                  fontSize: '1.1rem'
                }}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        className="add-to-cart-btn hover-lift" 
        style={{ background: color, border: 'none', padding: '1.2rem', color: '#000', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', cursor: 'pointer', width: '100%', borderRadius: '50px' }}
        onClick={() => addToCart(product, selectedVariant)}
      >
        ADD TO CART
      </button>
    </div>
  );
}
