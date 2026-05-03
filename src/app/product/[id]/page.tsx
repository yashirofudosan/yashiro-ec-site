export const dynamic = 'force-dynamic';

import "./product.css";
import Link from "next/link";
import { getProductDetail } from "@/lib/microcms";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

import type { Metadata } from "next";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const paramData = await params;
  let product = null;
  try {
    product = await getProductDetail(paramData.id);
  } catch (error) {}

  if (!product) {
    return { title: "商品が見つかりません | YASHIRO EC" };
  }

  return {
    title: `${product.name} | YASHIRO EC`,
    description: product.desc || "五行思想に基づいたプレミアムな家具・観葉植物。",
    openGraph: {
      title: `${product.name} | YASHIRO EC`,
      description: product.desc || "五行思想に基づいたプレミアムな家具・観葉植物。",
      images: product.image?.url ? [{ url: product.image.url }] : [],
    },
  };
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
  
  // Check if it is a plant to show the image disclaimer
  const isPlant = 
    String(product.kind || '').includes('植物') || 
    String(product.kind || '').includes('plant') ||
    String(product.name || '').includes('植物') ||
    String(product.name || '').includes('モンステラ') ||
    String(product.name || '').includes('パキラ');

  
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
        
        {isPlant && (
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-color)', opacity: 0.8, lineHeight: 1.6, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong>※画像に関するご注意</strong><br />
            商品画像は成長後のイメージ、または同等クラスの参考写真です。植物は生き物のため、お届けする実際の個体によって樹形、葉の付き方、サイズ感などに違いがございます。あらかじめご了承ください。
          </div>
        )}
        
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
