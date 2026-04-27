export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getArticles, Article } from "@/lib/microcms";
import type { Metadata } from "next";
import "./magazine.css";

export const metadata: Metadata = {
  title: "MAGAZINE | YASHIRO EC",
  description: "環境心理学と五行思想に基づいた、空間を最適化するための知識と洞察。",
  openGraph: {
    title: "MAGAZINE | YASHIRO EC",
    description: "環境心理学と五行思想に基づいた、空間を最適化するための知識と洞察。",
  },
};

export default async function MagazinePage() {
  let articles: Article[] = [];
  try {
    const data = await getArticles();
    articles = data.contents;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  return (
    <main className="main-content magazine-page">
      <section className="magazine-hero">
        <div className="bg-glow"></div>
        <h1 className="magazine-title">
          MAGAZINE
          <span className="magazine-subtitle">KNOWLEDGE & INSIGHTS</span>
        </h1>
        <p className="magazine-lead">
          環境心理学と五行思想に基づいた、<br className="sp-br" />空間を最適化するための知識と洞察。
        </p>
      </section>

      <section className="magazine-list-section">
        <div className="magazine-grid">
          {articles.length === 0 ? (
            <p className="no-articles">まだ記事がありません。microCMSで記事を作成してください。</p>
          ) : (
            articles.map((article) => (
              <Link href={`/magazine/${article.id}`} key={article.id} className="magazine-card hover-lift glass-panel">
                <div className="magazine-card-img">
                  {article.eyecatch?.url ? (
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
      </section>
    </main>
  );
}
