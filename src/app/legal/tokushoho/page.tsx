import Link from "next/link";
import "../../philosophy/philosophy.css";

export const metadata = {
  title: "特定商取引法に基づく表記 | YASHIRO",
  description: "株式会社YASHIRO不動産の特定商取引法に基づく表記。",
};

const rows = [
  { label: "販売業者", value: "株式会社YASHIRO不動産" },
  { label: "代表者", value: "武田雄成 / 武田亜希子" },
  { label: "所在地", value: "〒141-0031 東京都品川区西五反田1-26-2 五反田サンハイツ810" },
  { label: "電話番号", value: "03-3407-1707" },
  { label: "メールアドレス", value: "info@yashirofudosan.jp" },
  { label: "販売価格", value: "各商品ページに記載の価格（消費税込み）" },
  { label: "追加費用", value: "送料・梱包費は別途商品ページに表示" },
  { label: "支払方法", value: "クレジットカード（Visa / Mastercard / Amex / JCB）" },
  { label: "支払時期", value: "注文確定時にクレジットカード決済（即時）" },
  { label: "商品の引渡し時期", value: "ご注文確認後、通常3〜7営業日以内に発送（大型家具は別途ご連絡）" },
  { label: "返品・交換について", value: "商品到着後7日以内にご連絡ください。未使用・未開封のものに限り返品・交換可能です。お客様都合による返品の送料はお客様負担となります。不良品・誤送品の場合は当社負担にて対応いたします。" },
  { label: "返品送付先", value: "〒141-0031 東京都品川区西五反田1-26-2 五反田サンハイツ810" },
];

export default function TokushohoPage() {
  return (
    <main className="main-content philosophy-page">
      <section className="philosophy-hero" style={{ height: "40vh" }}>
        <div className="bg-glow"></div>
        <h1 className="philosophy-title" style={{ fontSize: "2.2rem" }}>
          特定商取引法に基づく表記
          <span style={{ display: "block", fontSize: "0.45em", letterSpacing: "0.2em", marginTop: "0.5rem", fontWeight: 300 }}>
            SPECIFIED COMMERCIAL TRANSACTIONS ACT
          </span>
        </h1>
      </section>

      <section className="philosophy-content" style={{ gap: "0", marginTop: "0" }}>
        <div className="text-block">
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "2rem" }}>
            最終更新日：2026年4月25日
          </p>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
            lineHeight: 1.8,
          }}>
            <tbody>
              {rows.map(({ label, value }) => (
                <tr key={label} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{
                    padding: "1.2rem 1.5rem",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    verticalAlign: "top",
                    width: "230px",
                    background: "rgba(255,255,255,0.02)",
                  }}>
                    {label}
                  </td>
                  <td style={{
                    padding: "1.2rem 1.5rem",
                    color: "#ccc",
                    verticalAlign: "top",
                  }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="philosophy-footer" style={{ marginTop: "5rem" }}>
        <Link href="/" className="action-btn hover-lift">← ホームへ戻る / BACK TO HOME</Link>
      </section>
    </main>
  );
}
