export const dynamic = 'force-dynamic';

import "./category.css";
import Link from "next/link";
import { getProducts, Product } from "@/lib/microcms";

interface CategoryPageProps {
  params: Promise<{ element: string }>;
}

// Basic element configuration
const elementData = {
  wood: { name: "Wood (木)", desc: "Vitality and Growth", color: "var(--element-wood-light)" },
  fire: { name: "Fire (火)", desc: "Energy and Passion", color: "var(--element-fire-light)" },
  earth: { name: "Earth (土)", desc: "Stability and Grounding", color: "var(--element-earth-light)" },
  metal: { name: "Metal (金)", desc: "Clarity and Precision", color: "var(--element-metal-light)" },
  water: { name: "Water (水)", desc: "Flow and Wisdom", color: "var(--element-water-light)" },
};

import type { Metadata } from "next";

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const paramData = await params;
  const elementKey = paramData.element.toLowerCase() as keyof typeof elementData;
  const config = elementData[elementKey] || elementData.wood;

  return {
    title: `${config.name}のアイテム | YASHIRO EC`,
    description: `五行思想における「${config.name}」の気を持つ家具・観葉植物のコレクション。${config.desc}`,
    openGraph: {
      title: `${config.name}のアイテム | YASHIRO EC`,
      description: `五行思想における「${config.name}」の気を持つ家具・観葉植物のコレクション。${config.desc}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await params directly per Next.js 15
  const paramData = await params;
  const elementKey = paramData.element.toLowerCase() as keyof typeof elementData;
  const config = elementData[elementKey] || elementData.wood;

  // Capitalize element for fallback logic 
  const elementCapitalized = elementKey.charAt(0).toUpperCase() + elementKey.slice(1);

  let products: Product[] = [];
  try {
    // Fetch all and filter locally for maximum robustness against uppercase/lowercase differences
    const data = await getProducts();
    products = data.contents.filter(item => {
      const elStr = Array.isArray(item.element) ? item.element.join(', ') : (item.element || '');
      return elStr.toLowerCase().includes(elementKey);
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <main className={`main-content category-theme-${elementKey}`}>


      <header className="category-header">
        <h1 className="category-title" style={{ color: config.color }}>{config.name}</h1>
        <p className="category-desc">{config.desc}</p>
      </header>

      <section className="products-grid">
        {products.length === 0 ? (
          <p className="product-image-placeholder" style={{ gridColumn: '1 / -1' }}>No items yet. Add products to microCMS.</p>
        ) : (
          products.map(item => (
            <Link href={`/product/${item.id}`} key={item.id} className="glass-panel product-wrapper hover-lift">
              <div 
                  className="product-image-placeholder" 
                  style={{ 
                    background: item.image ? `url(${item.image.url}) center/cover` : `linear-gradient(to bottom, transparent, ${config.color}22)` 
                  }}
              >
                {!item.image && <span>Image Placeholder</span>}
              </div>
              <div className="product-info">
                <span className="product-type">Elemental Item</span>
                <h2 className="product-name">{item.name}</h2>
                <p className="product-price">¥{item.price ? item.price.toLocaleString() : '--'}</p>
              </div>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}
