import Link from "next/link";
import "./realestate.css";

export const metadata = {
  title: "不動産サービス | YASHIRO不動産",
  description: "風水では人生の33%は住まいで決まります。YASHIRO不動産は、あなたの人生を変える「正しい家」を探します。東京都知事（1）第112130号",
};

export default function RealEstatePage() {
  return (
    <main className="re-main">
      {/* Hero */}
      <section className="re-hero">
        <div className="re-hero-overlay" />
        <div className="re-hero-content">
          <p className="re-eyecatch">風水の知恵が示す、確かな真実。</p>
          <h1 className="re-hero-title">
            人生の<span className="re-accent">33%</span>は、<br />
            住まいで決まる。
          </h1>
          <p className="re-hero-subtitle">
            あなたがどれほどの力を持っていても、<br className="sp-br" />
            住環境がそれを超えることはできない。
          </p>
          <Link href="/contact" className="re-cta-btn">
            無料相談はこちら →
          </Link>
        </div>
        <div className="re-hero-badge">
          <span>宅地建物取引業</span>
          <span>東京都知事（1）第112130号</span>
        </div>
      </section>

      {/* Philosophy: 33% */}
      <section className="re-section re-philosophy">
        <div className="re-section-inner">
          <div className="re-text-col">
            <p className="re-label">YASHIRO'S PERSPECTIVE</p>
            <h2>家は、人生の<br />「土台」である。</h2>
            <p>
              風水の世界では古くから、人の人生は「天・地・人」の三要素で決まると言われています。
              そのうち「地」、すなわち住まいが担う割合は<strong>33%</strong>——
              運命の三分の一が、あなたが毎日帰る場所によって形成されているのです。
            </p>
            <p>
              これは単なる迷信ではありません。
              住環境は、あなたの睡眠の質、思考の明瞭さ、出会う人間関係、そして毎日の仕事のパフォーマンスに
              直接的・間接的に影響を与え続けます。
            </p>
            <p>
              家が変われば、人生が変わる。
            </p>
          </div>
          <div className="re-stat-col">
            <div className="re-stat-ring">
              <div className="re-stat-ring-inner">
                <span className="re-stat-num">33</span>
                <span className="re-stat-pct">%</span>
                <span className="re-stat-desc">住まいが<br />決める</span>
              </div>
            </div>
            <div className="re-stat-labels">
              <div className="re-stat-label-item">
                <span className="dot dot-a"></span>天（天命・タイミング）33%
              </div>
              <div className="re-stat-label-item">
                <span className="dot dot-b"></span>地（住環境・場所）<strong>33%</strong>
              </div>
              <div className="re-stat-label-item">
                <span className="dot dot-c"></span>人（行動・努力）33%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Small vs Big */}
      <section className="re-section re-law">
        <div className="re-section-inner re-section-center">
          <p className="re-label">THE UNIVERSAL LAW</p>
          <blockquote className="re-blockquote">
            「この世界では、<br />小さいものは大きいものに勝てない。」
          </blockquote>
          <div className="re-law-grid">
            <div className="re-law-card">
              <div className="re-law-icon">🌊</div>
              <h3>器が小さければ</h3>
              <p>どれほど大きな水を注いでも、溢れてしまう。住環境が持つ許容量（キャパシティ）によって、あなたの才能が発揮できる上限が決まります。</p>
            </div>
            <div className="re-law-card re-law-card--highlight">
              <div className="re-law-icon">⚡</div>
              <h3>器が整えば</h3>
              <p>どんな努力も、どんな出会いも、最大限の成果として返ってくる。住まいは、あなたの人生の「最大値」を決める器です。</p>
            </div>
            <div className="re-law-card">
              <div className="re-law-icon">🏡</div>
              <h3>だからこそ</h3>
              <p>住まい選びは、人生で最も重要な投資のひとつ。仕事・家族・健康・財運——すべてが、そこから始まります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* What changes */}
      <section className="re-section re-changes">
        <div className="re-section-inner">
          <div className="re-text-col">
            <p className="re-label">WHAT CHANGES WHEN YOUR HOME CHANGES</p>
            <h2>住環境が変わると、<br />何が変わるのか。</h2>
            <p>
              住まいは、あなたの意識の届かないところで、毎日・24時間、あなたに影響を与えています。
              正しい家に引越した方が、こんな変化を経験しています。
            </p>
          </div>
          <div className="re-changes-grid">
            {[
              { emoji: "💼", title: "仕事・キャリア", body: "思考がクリアになり、決断力が向上。仕事の流れが変わったと感じる方が多くいます。" },
              { emoji: "🤝", title: "人間関係", body: "関わる人の質が変わる。引越しを機に、新しいご縁が生まれることも珍しくありません。" },
              { emoji: "👨‍👩‍👧", title: "家族・パートナーシップ", body: "空間の気（エネルギー）が整うと、家族間のコミュニケーションが柔らかくなります。" },
              { emoji: "💰", title: "財運・経済状況", body: "風水では、家の方位や間取りが財の流れに直結すると言われています。" },
              { emoji: "😴", title: "健康・睡眠", body: "電磁波・間取り・方位が整うと、睡眠の質が変わり、日中のエネルギーが回復します。" },
              { emoji: "🎯", title: "目標達成力", body: "住環境がノイズを排除し、本来の力を引き出すことで、夢に向かう速度が変わります。" },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="re-change-card">
                <span className="re-change-emoji">{emoji}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="re-section re-service">
        <div className="re-section-inner re-section-center">
          <p className="re-label">OUR SERVICE</p>
          <h2>YASHIRO不動産が<br />あなたにできること</h2>
          <p className="re-service-lead">
            私たちは単に「物件を紹介する」会社ではありません。<br />
            あなたの命式・現在地・ライフスタイルを丁寧にヒアリングし、<br />
            人生を後押しする「正しい家」を一緒に探します。
          </p>
          <div className="re-service-grid">
            <div className="re-service-card">
              <span className="re-service-num">01</span>
              <h3>賃貸物件の仲介</h3>
              <p>東京都内を中心に、YASHIRO独自の空間評価基準で厳選した物件をご提案します。</p>
            </div>
            <div className="re-service-card">
              <span className="re-service-num">02</span>
              <h3>売買物件の仲介</h3>
              <p>人生の大きな決断に寄り添い、長期的な視点で「住んで良かった」と言える物件をご提案します。</p>
            </div>
            <div className="re-service-card">
              <span className="re-service-num">03</span>
              <h3>空間コンサルティング</h3>
              <p>現在の住まいを環境心理学・五行の視点で診断し、改善案をご提案するコンサルティングサービスです。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="re-cta-section">
        <div className="re-cta-inner">
          <h2>
            あなたに合った家が、<br />
            あなたの人生を変える。
          </h2>
          <p>まずはお気軽にご相談ください。無料でお話を伺います。</p>
          <Link href="/contact" className="re-cta-btn re-cta-btn--large">
            無料相談・お問い合わせ →
          </Link>
          <p className="re-license">
            宅地建物取引業 東京都知事（1）第112130号<br />
            株式会社YASHIRO不動産 / 03-3407-1707
          </p>
        </div>
      </section>
    </main>
  );
}
