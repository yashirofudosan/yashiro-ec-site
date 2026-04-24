import Image from "next/image";
import Link from 'next/link';
import HeroContent from '@/components/HeroContent';
import ProductShowcase from '@/components/ProductShowcase';
import { client } from "@/lib/microcms";
import "./home.css";

export default async function Home() {
  // Fetch up to 8 latest products directly from microCMS
  const response = await client.getList({
    endpoint: "products",
    queries: { limit: 8 }
  });
  const products = response.contents;

  return (
    <main className="main-content">

      {/* Hero Section */}
      <section className="hero-section">
        <HeroContent />
        
        {/* Abstract 5 Elements Flow Animation */}
        <div className="elements-background">
          <div className="element-orb wood-orb"></div>
          <div className="element-orb fire-orb"></div>
          <div className="element-orb earth-orb"></div>
          <div className="element-orb metal-orb"></div>
          <div className="element-orb water-orb"></div>
        </div>
      </section>

      {/* Category Section */}
      <section className="categories-section">
        <h2 className="section-title">The Five Elements Collection</h2>
        <div className="category-grid">
          
          {/* Wood Category */}
          <a href="/category/wood" className="glass-panel category-card hover-lift element-wood">
            <div className="card-content">
              <h3>Wood (木)</h3>
              <p>Growth, Vitality. Teak furniture and lush foliage.</p>
            </div>
          </a>

          {/* Fire Category */}
          <a href="/category/fire" className="glass-panel category-card hover-lift element-fire">
            <div className="card-content">
              <h3>Fire (火)</h3>
              <p>Energy, Passion. Warm mahogany and vivid blooms.</p>
            </div>
          </a>

          {/* Earth Category */}
          <a href="/category/earth" className="glass-panel category-card hover-lift element-earth">
            <div className="card-content">
              <h3>Earth (土)</h3>
              <p>Stability, Grounding. Solid oak and trailing vines.</p>
            </div>
          </a>

          {/* Metal Category */}
          <a href="/category/metal" className="glass-panel category-card hover-lift element-metal">
            <div className="card-content">
              <h3>Metal (金)</h3>
              <p>Clarity, Precision. Sleek steel accents and structured plants.</p>
            </div>
          </a>

          {/* Water Category */}
          <a href="/category/water" className="glass-panel category-card hover-lift element-water">
            <div className="card-content">
              <h3>Water (水)</h3>
              <p>Flow, Wisdom. Flowing resin woods and aquatic accents.</p>
            </div>
          </a>

        </div>
      </section>

      {/* Expanded Philosophy and Teasers section */}
      <ProductShowcase products={products} />
    </main>
  );
}
