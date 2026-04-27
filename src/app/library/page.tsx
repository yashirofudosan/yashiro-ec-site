export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getLibraries, Library } from "@/lib/microcms";
import type { Metadata } from "next";
import "./library.css";

export const metadata: Metadata = {
  title: "風水鑑定図書館 | YASHIRO EC",
  description: "間取りと方位から、あなたのお部屋の風水エネルギー（飛星盤）を自己分析できるライブラリです。",
};

export default async function LibraryPage() {
  let libraries: Library[] = [];
  try {
    const data = await getLibraries();
    libraries = data.contents;
  } catch (error) {
    console.error("Failed to fetch library data:", error);
  }

  return (
    <div className="library-container">
      <header className="library-header">
        <h1>風水鑑定図書館</h1>
        <p>間取り × 建築時期 × 方位 から、ご自身の部屋のエネルギーを自己分析</p>
      </header>
      
      <div className="library-grid">
        {libraries.length === 0 ? (
          <p className="no-data">現在、鑑定データを準備中です...</p>
        ) : (
          libraries.map((lib) => (
            <Link href={`/library/${lib.id}`} key={lib.id} className="library-card hover-lift">
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
                <h2>{lib.title}</h2>
                <div className="library-date">
                  {new Date(lib.publishedAt || lib.createdAt).toLocaleDateString("ja-JP")}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
