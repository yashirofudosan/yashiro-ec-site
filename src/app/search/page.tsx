export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import { getProducts, Product } from "@/lib/microcms";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";
import "./search.css";
import "../category/[element]/category.css"; // Reuse card CSS

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';

  // Get products based on microCMS full-text search `q` parameter
  // If `q` is empty, it returns all products up to the default limit (10 for SDK)
  const productsData = await getProducts(q ? { q, limit: 100 } : { limit: 100 });
  const products = productsData.contents || [];

  return (
    <main className="search-page">
      <header className="search-header">
        <h1>ENVIRONMENTAL SEARCH</h1>
        <Suspense fallback={<div className="search-input">Loading search...</div>}>
          <SearchForm />
        </Suspense>
        
        <div className="search-suggestions">
          <Link href="/search?q=wood" className="suggestion-chip">Wood</Link>
          <Link href="/search?q=focus" className="suggestion-chip">Focus</Link>
          <Link href="/search?q=living" className="suggestion-chip">Living Room</Link>
          <Link href="/search?q=grounding" className="suggestion-chip">Grounding</Link>
        </div>
      </header>

      <section className="search-results-grid products-grid">
        {products.length > 0 ? (
          products.map((p: Product) => (
            <Link href={`/product/${p.id}`} key={p.id} className="glass-panel product-wrapper hover-lift">
              <div 
                className="product-image-placeholder" 
                style={{ background: p.image?.url ? `url(${p.image.url}) center/cover` : 'none' }}>
                {!p.image && <span style={{ color: "rgba(255,255,255,0.2)" }}>No Image</span>}
              </div>
              <div className="product-info">
                <span className="product-type">Result</span>
                <h2 className="product-name">{p.name}</h2>
                <p className="product-price">¥{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-results">
             No specific elements found aligning with your search. Try broadening your terms.
          </p>
        )}
      </section>
    </main>
  );
}
