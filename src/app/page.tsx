import Image from "next/image";
import Link from 'next/link';
import HeroContent from '@/components/HeroContent';
import ProductShowcase from '@/components/ProductShowcase';
import { client, getArticles, getLibraries } from "@/lib/microcms";
import "./home.css";
import "./magazine/magazine.css";
import "./library/library.css";

export default async function Home() {
  // Fetch products, magazine articles, and library items
  const [productsRes, articlesRes, librariesRes] = await Promise.all([
    client.getList({ endpoint: "products", queries: { limit: 8 } }),
    getArticles({ limit: 3 }),
    getLibraries({ limit: 3 })
  ]);
  const products = productsRes.contents;
  const articles = articlesRes.contents;
  const libraries = librariesRes.contents;

  return (
    <main className="main-content">

      {/* Hero Section */}
      <section className="hero-section">
        <HeroContent />
        
        {/* CSS Slideshow Background */}
        <div className="hero-slideshow">
          {/* Unsplash Placeholder Images (High-End Interior) */}
          <div className="slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2800&q=80')" }}></div>
          <div className="slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2800&q=80')" }}></div>
          <div className="slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=2800&q=80')" }}></div>
          <div className="slide-overlay"></div>
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

      {/* Magazine Section */}
      <section className="categories-section" style={{ paddingTop: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Latest from MAGAZINE</h2>
        <div className="magazine-grid">
          {articles.length === 0 ? (
            <p className="no-articles">まだ記事がありません。</p>
          ) : (
            articles.map((article) => (
              <Link href={`/magazine/${article.id}`} key={article.id} className="magazine-card hover-lift glass-panel">
                <div className="magazine-card-img">
                  {article.eyecatch?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.eyecatch.url} alt={article.title} />
                  ) : (
                    <div className="magazine-placeholder-img">
                      <span>YASHIRO</span>
                    </div>
                  )}
                  {article.category && article.category.length > 0 && (
                    <div className="magazine-card-tags">
                      {article.category.map((cat, idx) => (
                        <span key={idx} className="magazine-tag">{cat}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="magazine-card-content">
                  <div className="magazine-card-meta">
                    {article.publishedAt && (
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                    )}
                  </div>
                  <h2 className="magazine-card-title">{article.title}</h2>
                </div>
              </Link>
            ))
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/magazine" className="action-btn">READ MORE</Link>
        </div>
      </section>

      {/* Library Section */}
      <section className="categories-section" style={{ paddingTop: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Library & Appraisals</h2>
        <div className="library-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {libraries.length === 0 ? (
            <p className="no-articles" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>現在、鑑定データを準備中です...</p>
          ) : (
            libraries.map((lib) => (
              <Link href={`/library/${lib.id}`} key={lib.id} className="library-card hover-lift">
                {lib.eyecatch ? (
                  <div className="library-card-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lib.eyecatch.url} alt={lib.title} />
                  </div>
                ) : (
                  <div className="library-card-img library-placeholder-img">
                    NO IMAGE
                  </div>
                )}
                <div className="library-card-content">
                  <div className="library-tags">
                    {lib.layout && lib.layout.map((tag) => (
                      <span key={tag} className="library-tag layout-tag">{tag}</span>
                    ))}
                    {lib.period && lib.period.map((tag) => (
                      <span key={tag} className="library-tag period-tag">{tag}</span>
                    ))}
                    {lib.facing && lib.facing.map((tag) => (
                      <span key={tag} className="library-tag facing-tag">{tag}</span>
                    ))}
                  </div>
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff', fontWeight: 500 }}>{lib.title}</h2>
                  <div className="library-date" style={{ color: '#888', fontSize: '0.8rem' }}>
                    {new Date(lib.publishedAt || lib.createdAt).toLocaleDateString("ja-JP")}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/library" className="action-btn">VIEW ALL DATA</Link>
        </div>
      </section>
    </main>
  );
}
