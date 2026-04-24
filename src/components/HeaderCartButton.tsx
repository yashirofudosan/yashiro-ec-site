"use client";

import { useCart } from "@/context/CartContext";

export default function HeaderCartButton() {
  const { cartItems, toggleCart } = useCart();
  
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button className="nav-action-btn hover-lift" onClick={toggleCart}>
      CART [{quantity}]
    </button>
  );
}
