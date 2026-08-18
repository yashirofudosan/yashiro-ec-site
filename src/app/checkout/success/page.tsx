import Link from "next/link";
import Stripe from "stripe";
import "../../product/[id]/product.css";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2026-03-25.dahlia" })
  : null;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let isPaid = false;
  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      isPaid = session.payment_status === "paid";
    } catch (err) {
      console.error("Failed to verify checkout session:", err);
    }
  }

  return (
    <main className="main-content product-page" style={{ textAlign: "center", paddingTop: "10rem" }}>
      {isPaid ? (
        <>
          <h1 className="detail-title" style={{ color: "var(--element-wood-light)", marginBottom: "2rem" }}>
            ご注文ありがとうございます
          </h1>
          <p className="detail-desc" style={{ maxWidth: "600px", margin: "0 auto 4rem auto" }}>
            ご注文を確認いたしました。まもなく新しい五行のエネルギーがお手元に届きます。
            発送準備が整い次第、あらためてご連絡いたします。
          </p>
        </>
      ) : (
        <>
          <h1 className="detail-title" style={{ marginBottom: "2rem" }}>
            ご注文内容を確認できませんでした
          </h1>
          <p className="detail-desc" style={{ maxWidth: "600px", margin: "0 auto 4rem auto" }}>
            決済状況を確認できませんでした。カードの明細をご確認いただき、
            解決しない場合はお手数ですがお問い合わせください。
          </p>
        </>
      )}
      <Link
        href="/"
        className="add-to-cart-btn"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--glass-border)", textDecoration: "none" }}
      >
        ホームへ戻る
      </Link>
    </main>
  );
}
