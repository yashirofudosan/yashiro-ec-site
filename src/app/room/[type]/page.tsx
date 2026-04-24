import { getProducts, Product } from "@/lib/microcms";
import Link from "next/link";
import "../../category/[element]/category.css"; 

export const dynamic = 'force-dynamic';

interface RoomPageProps {
  params: Promise<{ type: string }>;
}

const roomData = {
  living: { name: "Living Room", desc: "Spaces designed for connection, grounding, and expansive energy." },
  bedroom: { name: "Bedroom", desc: "Sanctuaries of restoration, deep calm, and quiet alignment." },
  workspace: { name: "Workspace", desc: "Environments tuned for absolute clarity, focus, and momentum." },
  entrance: { name: "Entrance", desc: "The threshold of flow. Filtering out external errors before they enter." }
};

export default async function RoomPage({ params }: RoomPageProps) {
  const paramData = await params;
  const typeKey = paramData.type.toLowerCase() as keyof typeof roomData;
  const currentRoom = roomData[typeKey] || { name: paramData.type, desc: "A space awaiting specific elemental tuning." };

  const productsData = await getProducts();
  const products = productsData.contents || [];

  const filteredProducts = products.filter((item: Product) => {
    if (!item.room) return false;
    const rStr = Array.isArray(item.room) ? item.room.join(', ') : item.room;
    return rStr.toLowerCase().includes(typeKey);
  });

  return (
    <main className="main-content category-page">
      <header className="category-header" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <h1 className="category-title" style={{ color: "var(--text-primary)" }}>{currentRoom.name}</h1>
        <p className="category-desc">{currentRoom.desc}</p>
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
                <span className="product-type">Spatial Item</span>
                <h2 className="product-name">{p.name}</h2>
                <p className="product-price">¥{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", opacity: 0.5, marginTop: '2rem' }}>
            No optimized elements found for this space yet.
          </p>
        )}
      </section>
    </main>
  );
}
