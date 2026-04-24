export const dynamic = 'force-dynamic';

import { getProducts, Product } from "@/lib/microcms";
import Link from "next/link";
import "../../category/[element]/category.css"; 

interface TypePageProps {
  params: Promise<{ kind: string }>;
}

const typeData = {
  furniture: { name: "Environmental Furniture", desc: "Solid, grounding forms designed to restructure your spatial momentum." },
  plant: { name: "Botanical Elements", desc: "Living frequencies that naturally filter visual noise and breathe life." }
};

export default async function TypePage({ params }: TypePageProps) {
  const paramData = await params;
  const typeKey = paramData.kind.toLowerCase() as keyof typeof typeData;
  const currentType = typeData[typeKey] || { name: paramData.kind, desc: "Premium spatial items." };

  const productsData = await getProducts({ limit: 100 });
  const products = productsData.contents || [];

  const filteredProducts = products.filter((item: any) => {
    // Assuming user will create a 'kind' text field in microCMS
    if (!item.kind) return false;
    const kStr = Array.isArray(item.kind) ? item.kind.join(', ') : item.kind;
    return kStr.toLowerCase().includes(typeKey);
  });

  return (
    <main className="main-content category-page">
      <header className="category-header" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <h1 className="category-title" style={{ color: "var(--text-primary)" }}>{currentType.name}</h1>
        <p className="category-desc">{currentType.desc}</p>
      </header>

      <section className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p: Product) => (
            <Link href={`/product/${p.id}`} key={p.id} className="glass-panel product-wrapper hover-lift">
              <div className="product-image-placeholder" style={{ position: 'relative', background: '#0a0a0a', overflow: 'hidden' }}>
                {p.image?.url ? (
                  <img src={p.image.url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>No Image</span>
                )}
              </div>
              <div className="product-info">
                <span className="product-type">Category: {paramData.kind}</span>
                <h2 className="product-name">{p.name}</h2>
                <p className="product-price">¥{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", opacity: 0.5, marginTop: '2rem' }}>
            No items in this category yet. Please add data to microCMS.
          </p>
        )}
      </section>
    </main>
  );
}
