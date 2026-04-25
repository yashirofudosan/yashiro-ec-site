import Link from "next/link";
import "../philosophy/philosophy.css";
import "./company.css";

export const metadata = {
  title: "企業情報 | YASHIRO",
  description: "株式会社YASHIRO不動産の企業情報。宅地建物取引業・環境心理学に基づく空間最適化サービスを提供。",
};

const companyInfo = [
  { label: "商号", value: "株式会社YASHIRO不動産" },
  { label: "代表取締役", value: "武田雄成 / 武田亜希子" },
  { label: "所在地", value: "〒141-0031\n東京都品川区西五反田1-26-2\n五反田サンハイツ810" },
  { label: "電話番号", value: "03-3407-1707" },
  { label: "メールアドレス", value: "info@yashirofudosan.jp" },
  { label: "資本金", value: "990万円" },
  { label: "宅地建物取引業", value: "東京都知事（1）第112130号" },
  { label: "事業内容", value: "宅地建物の売買・賃貸・仲介\n環境心理学に基づく空間最適化コンサルティング\n五行理論を活用したインテリア・観葉植物の販売" },
];

export default function CompanyPage() {
  return (
    <main className="main-content philosophy-page">
      <section className="philosophy-hero" style={{ height: "50vh" }}>
        <div className="bg-glow"></div>
        <h1 className="philosophy-title">
          COMPANY
          <span style={{ display: "block", fontSize: "0.45em", letterSpacing: "0.3em", marginTop: "0.5rem", fontWeight: 300 }}>
            企業情報
          </span>
        </h1>
        <p className="philosophy-subtitle">
          株式会社YASHIRO不動産
        </p>
      </section>

      <section className="philosophy-content" style={{ gap: "5rem", marginTop: "0" }}>
        {/* Company Table */}
        <div className="text-block">
          <h2 style={{ marginBottom: "2.5rem" }}>会社概要</h2>
          <table className="company-table">
            <tbody>
              {companyInfo.map(({ label, value }) => (
                <tr key={label}>
                  <td className="company-label">{label}</td>
                  <td className="company-value" style={{ whiteSpace: "pre-line" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mission Statement */}
        <div className="grid-layout fade-up">
          <div className="text-block">
            <h2>ミッション</h2>
            <p>
              私たちは「環境が人をつくる」という確信から生まれました。
              住まいとは単なる器ではなく、居住者のパフォーマンスを規定するハードウェアです。
              宅地建物取引の専門知識と、環境心理学・五行思想を融合させた独自の「YASHIROメソッド」を通じて、
              お客様の生活の質を根本から向上させることが私たちの使命です。
            </p>
          </div>
          <div className="company-accent-block fade-up">
            <div className="accent-item">
              <span className="accent-num">01</span>
              <span className="accent-text">空間のエラーを排除する</span>
            </div>
            <div className="accent-item">
              <span className="accent-num">02</span>
              <span className="accent-text">五行で環境を最適化する</span>
            </div>
            <div className="accent-item">
              <span className="accent-num">03</span>
              <span className="accent-text">居住者の能力を最大化する</span>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy-footer">
        <h2>空間を、パフォーマンスの資産に。</h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/about" className="action-btn hover-lift">YASHIROとは</Link>
          <Link href="/contact" className="action-btn hover-lift">お問い合わせ</Link>
        </div>
      </section>
    </main>
  );
}
