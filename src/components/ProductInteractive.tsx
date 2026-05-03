"use client";

import { useState } from "react";
import { useCart, VariantSize, getProductPrice } from "@/context/CartContext";
import { Product } from "@/lib/microcms";

interface ProductInteractiveProps {
  product: Product;
  color: string;
  isPlant: boolean;
  elementStr: string;
}

export default function ProductInteractive({ product, color, isPlant, elementStr }: ProductInteractiveProps) {
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

  // Determine which image to show
  let displayImage = product.image?.url;
  if (selectedVariant === 'S' && product.image_s?.url) displayImage = product.image_s.url;
  if (selectedVariant === 'M' && product.image_m?.url) displayImage = product.image_m.url;
  if (selectedVariant === 'L' && product.image_l?.url) displayImage = product.image_l.url;

  return (
    <section className="product-detail-container">
      {/* Left Column: Image Area */}
      <div className="product-image-column">
        <div className="product-image-large glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
           {displayImage ? (
             <img src={displayImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease-in-out' }} />
           ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${color}22, transparent)` }}>
               <span>{product.name || "No Image"}</span>
             </div>
           )}
        </div>
        
        {isPlant && (
          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.8, lineHeight: 1.6, textAlign: 'center' }}>
            ※商品画像は成長後のイメージ、または同等の参考写真です。<br />
            植物は生き物のため、実際の個体によって樹形やサイズ感に違いがございます。
          </div>
        )}
      </div>
      
      {/* Right Column: Info & Purchase Area */}
      <div className="product-info-panel">
        <span className="element-badge" style={{ borderColor: color, color: color }}>
          {elementStr}
        </span>
        <h1 className="detail-title">{product.name}</h1>
        <div className="detail-divider"></div>
        <p className="detail-desc">{product.desc || "No description provided."}</p>
        
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
      </div>
    </section>
  );
}
