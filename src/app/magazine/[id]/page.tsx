export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getArticleDetail } from "@/lib/microcms";
import type { Metadata } from "next";
import "../magazine.css"; 

interface MagazineDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MagazineDetailProps): Promise<Metadata> {
  const paramData = await params;
  let article = null;
  try {
    article = await getArticleDetail(paramData.id);
  } catch (error) {}

  if (!article) {
    return { title: "記事が見つかりません | YASHIRO EC" };
  }

  // extract simple text for description (strip html tags)
  const plainText = article.content.replace(/<[^>]+>/g, '').substring(0, 100);

  return {
    title: `${article.title} | YASHIRO EC MAGAZINE`,
    description: plainText ? `${plainText}...` : "YASHIRO EC マガジンの記事詳細ページです。",
    openGraph: {
      title: `${article.title} | YASHIRO EC MAGAZINE`,
      description: plainText ? `${plainText}...` : "YASHIRO EC マガジンの記事詳細ページです。",
      images: article.eyecatch?.url ? [{ url: article.eyecatch.url }] : [],
    },
  };
}

export default async function MagazineDetailPage({ params }: MagazineDetailProps) {
  const paramData = await params;
  
  let article = null;
  try {
    article = await getArticleDetail(paramData.id);
  } catch (error) {
    console.error("Fetch error:", error);
  }

  if (!article) {
    return (
      <main className="main-content magazine-page">
        <div style={{ padding: "10rem 5%", textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
          記事が見つかりません。(Article not found)
          <div style={{ marginTop: "2rem" }}>
            <Link href="/magazine" className="action-btn hover-lift">← マガジン一覧に戻る</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content magazine-page">
      <article>
        <header className="article-detail-header fade-up">
          <div className="article-detail-meta">
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
              </time>
            )}
            {article.category && article.category.length > 0 && (
              <div className="magazine-card-tags" style={{ position: 'static' }}>
                {article.category.map((cat, idx) => (
                  <span key={idx} className="magazine-tag">{cat}</span>
                ))}
              </div>
            )}
          </div>
          <h1 className="article-detail-title">{article.title}</h1>
        </header>

        {article.eyecatch?.url && (
          <figure className="article-detail-eyecatch fade-up" style={{ animationDelay: '0.1s' }}>
            <img src={article.eyecatch.url} alt={article.title} />
          </figure>
        )}

        <div 
          className="article-detail-content fade-up" 
          style={{ animationDelay: '0.2s' }}
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        <div style={{ textAlign: "center", paddingBottom: "6rem" }}>
          <Link href="/magazine" className="action-btn hover-lift">← マガジン一覧へ戻る</Link>
        </div>
      </article>
    </main>
  );
}
