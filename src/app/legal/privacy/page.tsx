import Link from "next/link";
import "../../philosophy/philosophy.css";

export const metadata = {
  title: "プライバシーポリシー | YASHIRO",
  description: "YASHIRO（屋代不動産）のプライバシーポリシー。個人情報の取り扱いについて。",
};

export default function PrivacyPage() {
  return (
    <main className="main-content philosophy-page">
      <section className="philosophy-hero" style={{ height: "40vh" }}>
        <div className="bg-glow"></div>
        <h1 className="philosophy-title" style={{ fontSize: "3rem" }}>
          PRIVACY POLICY
          <span style={{ display: "block", fontSize: "0.5em", letterSpacing: "0.2em", marginTop: "0.5rem" }}>
            プライバシーポリシー
          </span>
        </h1>
      </section>

      <section className="philosophy-content" style={{ gap: "4rem", marginTop: "0" }}>
        <div className="text-block">
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "3rem" }}>
            最終更新日：2026年4月25日
          </p>

          <h2>1. 事業者情報</h2>
          <p>
            屋代不動産（以下「当社」）は、YASHIRO ECサイト（以下「本サービス」）を運営します。
            本プライバシーポリシーは、本サービスにおける個人情報の取り扱いについて定めるものです。
          </p>

          <h2 style={{ marginTop: "3rem" }}>2. 収集する情報</h2>
          <p>
            当社は、以下の情報を収集することがあります。<br />
            ・氏名、メールアドレス、電話番号（お問い合わせ時）<br />
            ・住所（配送先）<br />
            ・クレジットカード情報（Stripe社が安全に管理。当社は保持しません）<br />
            ・当サイトのアクセスログ・Cookie情報
          </p>

          <h2 style={{ marginTop: "3rem" }}>3. 利用目的</h2>
          <p>
            収集した個人情報は、以下の目的に限り利用します。<br />
            ・商品の発送および継続的な取引<br />
            ・お問い合わせへの対応<br />
            ・サービスの改善・統計分析（個人を特定しない形）<br />
            ・メールマガジン・キャンペーン情報のご案内（登録者のみ）
          </p>

          <h2 style={{ marginTop: "3rem" }}>4. 第三者提供</h2>
          <p>
            当社は、以下の場合を除き、個人情報を第三者に提供しません。<br />
            ・法令に基づく場合<br />
            ・決済処理のためStripe, Inc.に提供する場合<br />
            ・本人の同意がある場合
          </p>

          <h2 style={{ marginTop: "3rem" }}>5. Cookieの使用</h2>
          <p>
            本サービスでは、利便性向上のためCookieを使用することがあります。
            ブラウザの設定からCookieを拒否することができますが、一部機能が制限される場合があります。
          </p>

          <h2 style={{ marginTop: "3rem" }}>6. 個人情報の開示・訂正・削除</h2>
          <p>
            ご本人からの個人情報の開示・訂正・削除のご要請には、本人確認の上、速やかに対応いたします。
            下記お問い合わせ窓口までご連絡ください。
          </p>

          <h2 style={{ marginTop: "3rem" }}>7. お問い合わせ</h2>
          <p>
            プライバシーポリシーに関するお問い合わせは、
            <Link href="/contact" style={{ color: "#ccc", textDecoration: "underline" }}>お問い合わせページ</Link>
            よりご連絡ください。
          </p>
        </div>
      </section>

      <section className="philosophy-footer" style={{ marginTop: "5rem" }}>
        <Link href="/" className="action-btn hover-lift">← ホームへ戻る / BACK TO HOME</Link>
      </section>
    </main>
  );
}
