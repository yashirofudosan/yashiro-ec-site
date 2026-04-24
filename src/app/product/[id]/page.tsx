export const dynamic = 'force-dynamic';

import "./product.css";
import Link from "next/link";
import { getProductDetail } from "@/lib/microcms";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: ProductPageProps) {
  const paramData = await params;
  
  let product = null;
  try {
    // Fetch product detail using the document ID
    product = await getProductDetail(paramData.id);
  } catch (error) {
    console.error("Fetch error:", error);
  }

  if (!product) {
    return (
      <main className="main-content product-page">

        <div style={{ padding: "5rem", textAlign: "center", fontSize: "1.5rem" }}>
          Product not found in microCMS. (Or ID is incorrect)
        </div>
      </main>
    );
  }

  // Parse element representation
  const elementStr = Array.isArray(product.element) ? product.element.join(', ') : (product.element || 'Unknown');
  
  // Quick mapping for elemental coloring
  const lowerElement = elementStr.toLowerCase();
  const color = lowerElement.includes('fire') ? 'var(--element-fire-light)' :
                lowerElement.includes('earth') ? 'var(--element-earth-light)' :
                lowerElement.includes('metal') ? 'var(--element-metal-light)' :
                lowerElement.includes('water') ? 'var(--element-water-light)' :
                'var(--element-wood-light)';

  return (
    <main className="main-content product-page">


      <section className="product-detail-container">
        <div className="product-image-large glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
           {product.image?.url ? (
             <img src={product.image.url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${color}22, transparent)` }}>
               <span>{product.name || "No Image"}</span>
             </div>
           )}
        </div>
        
        <div className="product-info-panel">
          <span className="element-badge" style={{ borderColor: color, color: color }}>
            {elementStr}
          </span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">¥{product.price ? product.price.toLocaleString() : '--'}</p>
          <div className="detail-divider"></div>
          <p className="detail-desc">{product.desc || "No description provided."}</p>
          
          {/* Add to Cart Button */}
          <AddToCartButton product={product} color={color} />
        </div>
      </section>
    </main>
  );
}
