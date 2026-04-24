"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import "./home-expansion.css";

interface Product {
  id: string;
  name: string;
  price: number;
  image: { url: string };
  category: string;
  kind?: string;
  room?: string;
}

export default function ProductShowcase({ products }: { products: Product[] }) {
  const { t, locale } = useLanguage();

  if (!products || products.length === 0) {
    return (
      <section className="product-showcase">
        <h2 className="showcase-title">{locale === 'en' ? 'NEW ARRIVALS' : '新作コレクション'}</h2>
        <p style={{ color: '#666', textAlign: 'center', margin: '4rem 0' }}>
          {locale === 'en' ? 'No products available.' : '商品がまだ登録されていません。'}
        </p>
      </section>
    );
  }

  return (
    <section className="product-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">{locale === 'en' ? 'NEW ARRIVALS' : '新作コレクション'}</h2>
        <Link href="/type/furniture" className="view-all-link hover-lift">
          {locale === 'en' ? 'VIEW ALL PRODUCTS' : 'すべての商品を見る'}
        </Link>
      </div>

      <div className="showcase-grid">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="showcase-card">
            <div className="sc-image-wrapper">
              <img src={product.image?.url} alt={product.name} className="sc-image" />
              <div className="sc-overlay">
                <span className="sc-view">VIEW DETAILS</span>
              </div>
            </div>
            <div className="sc-info">
              <span className="sc-category">
                {product.kind === "furniture" ? "FURNITURE" : product.kind === "plant" ? "HOUSEPLANTS" : product.category}
              </span>
              <h3 className="sc-name">{product.name}</h3>
              <p className="sc-price">¥{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
