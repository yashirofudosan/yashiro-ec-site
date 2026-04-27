import { getLibraryDetail, getLibraries } from "@/lib/microcms";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "../library.css";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  try {
    const lib = await getLibraryDetail(id);
    return {
      title: `${lib.title} | 風水鑑定図書館`,
      description: `間取りと方位から読み解く風水鑑定結果。`,
    };
  } catch (e) {
    return { title: "Not Found | 風水鑑定図書館" };
  }
}

export default async function LibraryDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const lib = await getLibraryDetail(id);

  if (!lib) {
    return <div>鑑定データが見つかりません</div>;
  }

  // Schema.org for AEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": lib.title,
    "author": {
      "@type": "Organization",
      "name": "YASHIRO",
      "url": "https://yashiro-ec.example.com"
    },
    "description": `風水鑑定結果: ${lib.title}`,
  };

  return (
    <article className="library-detail-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="library-detail-header">
        <div className="library-tags">
          {lib.layout && lib.layout.map((tag) => <span key={tag} className="library-tag layout-tag">{tag}</span>)}
          {lib.period && lib.period.map((tag) => <span key={tag} className="library-tag period-tag">{tag}</span>)}
          {lib.facing && lib.facing.map((tag) => <span key={tag} className="library-tag facing-tag">{tag}</span>)}
        </div>
        <h1>{lib.title}</h1>
      </header>

      {(lib.eyecatch || lib.chartImage) && (
        <div className="library-visuals">
          {lib.eyecatch && (
            <div className="library-visual-item">
              <h3 className="visual-title">間取り</h3>
              <Image 
                src={lib.eyecatch.url} 
                alt="間取り" 
                width={lib.eyecatch.width || 800} 
                height={lib.eyecatch.height || 600} 
                className="library-visual-img"
              />
            </div>
          )}
          {lib.chartImage && (
            <div className="library-visual-item">
              <h3 className="visual-title">飛星盤</h3>
              <Image 
                src={lib.chartImage.url} 
                alt="飛星盤" 
                width={lib.chartImage.width || 800} 
                height={lib.chartImage.height || 600} 
                className="library-visual-img"
              />
            </div>
          )}
        </div>
      )}

      <div 
        className="library-content"
        dangerouslySetInnerHTML={{ __html: lib.content }}
      />

      <div className="library-remedies">
        <h3>五行の処方箋（推奨インテリア）</h3>
        <p>この間取りのエネルギーを最適化するために推奨されるアイテムです。</p>
        <div className="remedies-grid">
          {lib.remedyWood && (
            <div className="remedy-card wood">
              <h4>木 (Wood)</h4>
              <p>{lib.remedyWood}</p>
              <Link href="/category/wood" className="remedy-link">木のアイテムを見る →</Link>
            </div>
          )}
          {lib.remedyFire && (
            <div className="remedy-card fire">
              <h4>火 (Fire)</h4>
              <p>{lib.remedyFire}</p>
              <Link href="/category/fire" className="remedy-link">火のアイテムを見る →</Link>
            </div>
          )}
          {lib.remedyEarth && (
            <div className="remedy-card earth">
              <h4>土 (Earth)</h4>
              <p>{lib.remedyEarth}</p>
              <Link href="/category/earth" className="remedy-link">土のアイテムを見る →</Link>
            </div>
          )}
          {lib.remedyMetal && (
            <div className="remedy-card metal">
              <h4>金 (Metal)</h4>
              <p>{lib.remedyMetal}</p>
              <Link href="/category/metal" className="remedy-link">金のアイテムを見る →</Link>
            </div>
          )}
          {lib.remedyWater && (
            <div className="remedy-card water">
              <h4>水 (Water)</h4>
              <p>{lib.remedyWater}</p>
              <Link href="/category/water" className="remedy-link">水のアイテムを見る →</Link>
            </div>
          )}
        </div>
      </div>

      <div className="back-link-container">
        <Link href="/library" className="back-btn hover-lift">← 図書館一覧へ戻る</Link>
      </div>
    </article>
  );
}
