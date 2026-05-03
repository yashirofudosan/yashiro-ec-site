export const dynamic = 'force-dynamic';

import "./product.css";
import Link from "next/link";
import { getProductDetail } from "@/lib/microcms";
import type { Metadata } from "next";
import ProductInteractive from "@/components/ProductInteractive";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

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
      <ProductInteractive 
        product={product} 
        color={color} 
        isPlant={isPlant} 
        elementStr={elementStr} 
      />
    </main>
  );
}
