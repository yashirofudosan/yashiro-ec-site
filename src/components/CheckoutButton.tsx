"use client";

import { useState } from "react";
import { Product } from "@/lib/microcms";

export default function CheckoutButton({ product, color }: { product: Product, color: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initialize checkout.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <button 
      className="add-to-cart-btn" 
      style={{ background: color, opacity: loading ? 0.7 : 1, pointerEvents: loading ? 'none' : 'auto' }}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Aligning Elements..." : "Add to Flow (Checkout)"}
    </button>
  );
}
