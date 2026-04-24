import Link from "next/link";
import "../../product/[id]/product.css"; 

export default function SuccessPage() {
  return (
    <main className="main-content product-page" style={{ textAlign: "center", paddingTop: "10rem" }}>
      <h1 className="detail-title" style={{ color: "var(--element-wood-light)", marginBottom: "2rem" }}>Alignment Complete</h1>
      <p className="detail-desc" style={{ maxWidth: "600px", margin: "0 auto 4rem auto" }}>
        Your payment has been successfully processed in test mode. The elemental force of your new item will soon be delivered to your space.
      </p>
      <Link href="/" className="add-to-cart-btn" style={{ background: "var(--bg-secondary)", border: "1px solid var(--glass-border)", textDecoration: "none" }}>
        Return to Flow
      </Link>
    </main>
  );
}
