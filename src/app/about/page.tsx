import Link from "next/link";
import "../philosophy/philosophy.css";
import "./about.css";

export const metadata = {
  title: "YASHIROとは | YASHIRO",
  description: "YASHIRO – 環境心理学と空間最適化のパイオニア。私たちの哲学と歴史について。",
};

export default function AboutPage() {
  return (
    <main className="main-content philosophy-page">
      <section className="philosophy-hero">
        <div className="bg-glow"></div>
        <h1 className="philosophy-title">
          YASHIRO<br/>
          <span style={{ fontSize: "0.55em", letterSpacing: "0.3em", fontWeight: 300 }}>
            ABOUT US / YASHIROとは
          </span>
        </h1>
        <p className="philosophy-subtitle">
          Spatial optimization, grounded in Environmental Psychology.
        </p>
      </section>

      <section className="philosophy-content">
        {/* 01 */}
        <div className="grid-layout fade-up">
          <div className="text-block">
            <h2>01. 私たちの使命<span className="sub-heading"> / Our Mission</span></h2>
            <p>
              ヤシロ不動産は、「住空間とは単なる器ではなく、
              居住者のパフォーマンスを規定するハードウェアである」という確信から生まれました。
              電磁波・視覚的ノイズ・情報の淀みを論理的に排除（デバッグ）し、
              空間そのものを人間の能力を最大化するシステムへと再構築します。
            </p>
            <p style={{ marginTop: "1.5rem", color: "#aaa", fontSize: "0.95rem", lineHeight: 1.7 }}>
              YASHIRO was born from a conviction: living space is not merely a container,
              but hardware that defines the performance of its occupant.
              We systematically debug electromagnetic interference, visual noise, and information stagnation
              to reconstruct space as a system that maximizes human potential.
            </p>
          </div>
          <div className="about-visual fade-up">
            <div className="about-stat-card">
              <span className="stat-num">01</span>
              <span className="stat-label">SPATIAL DEBUGGING</span>
              <span className="stat-desc">電磁波・ノイズの排除</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-num">02</span>
              <span className="stat-label">ELEMENTAL ALIGNMENT</span>
              <span className="stat-desc">五行による空間再構築</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-num">03</span>
              <span className="stat-label">PERFORMANCE OPTIMIZATION</span>
              <span className="stat-desc">居住者能力の最大化</span>
            </div>
          </div>
        </div>

        {/* 02 */}
        <div className="grid-layout reverse fade-up">
          <div className="text-block">
            <h2>02. YASHIROメソッド<span className="sub-heading"> / The YASHIRO Method</span></h2>
            <p>
              YASHIROメソッドは2段階のピラミッドで構成されています。
              第1層「エラーの排除」では、空間内に潜む阻害要因を取り除きます。
              第2層「最適化」では、五行の知恵と現代の環境心理学を融合させ、
              居住者の生活パフォーマンスを能動的に向上させます。
            </p>
            <p style={{ marginTop: "1.5rem", color: "#aaa", fontSize: "0.95rem", lineHeight: 1.7 }}>
              The YASHIRO Method is a two-tier pyramid.
              Tier 1, "Error Elimination," removes environmental inhibitors.
              Tier 2, "Optimization," actively elevates occupant life performance
              by merging Five Elements wisdom with modern environmental psychology.
            </p>
          </div>
          <div className="pyramid-visual fade-up">
            <div className="pyramid-tier tier-2">
              <span>OPTIMIZATION</span>
              <span className="tier-jp">最適化</span>
            </div>
            <div className="pyramid-tier tier-1">
              <span>ERROR ELIMINATION</span>
              <span className="tier-jp">エラーの排除</span>
            </div>
          </div>
        </div>

        {/* 03 */}
        <div className="grid-layout fade-up">
          <div className="text-block">
            <h2>03. 私たちが選ぶもの<span className="sub-heading"> / What We Curate</span></h2>
            <p>
              このECサイトに並ぶ家具・観葉植物は、単なる商品ではありません。
              それぞれが五行のいずれかの「エレメント」としての機能を持ち、
              空間のエネルギーバランスを整えるために厳選されたコンポーネントです。
              ヤシロ不動産の空間設計の知見をもとに、世界中の高品質な素材から選定しています。
            </p>
            <p style={{ marginTop: "1.5rem", color: "#aaa", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Every product in this store is not merely an object — it is a spatial component
              with a defined elemental function (Wood, Fire, Earth, Metal, or Water),
              curated to restore energetic balance to your environment.
              Selected from global premium sources based on YASHIRO&apos;s spatial design expertise.
            </p>
          </div>
          <div className="about-visual fade-up">
            <div className="element-tag-grid">
              {["木 WOOD", "火 FIRE", "土 EARTH", "金 METAL", "水 WATER"].map((el) => (
                <span key={el} className="element-tag">{el}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy-footer">
        <h2>空間は、あなたを最適化する装置になる。<br/>
          <span style={{ fontSize: "0.6em", fontWeight: 300 }}>Your space becomes the device that optimizes you.</span>
        </h2>
        <Link href="/five-elements" className="action-btn hover-lift">
          五行とは / THE FIVE ELEMENTS →
        </Link>
      </section>
    </main>
  );
}
