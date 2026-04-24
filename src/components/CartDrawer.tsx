"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, cartTotal } = useCart();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initialize checkout.");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cart-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>CART ({cartItems.length})</h2>
          <button onClick={toggleCart} className="close-cart-btn">✕</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">Your space awaits its elements.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.product.name}</h4>
                  <p>¥{(item.product.price || 0).toLocaleString()} <span style={{opacity: 0.5}}>x {item.quantity}</span></p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="remove-item-btn"
                >
                  REMOVE
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>SUBTOTAL</span>
            <span>¥{cartTotal.toLocaleString()}</span>
          </div>
          <button 
            className="checkout-btn" 
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 10000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .cart-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        .cart-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 400px;
          max-width: 100vw;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255,255,255,0.05);
          z-index: 10001;
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .cart-drawer.open {
          transform: translateX(0);
        }

        .cart-header {
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cart-header h2 {
          font-weight: 300;
          letter-spacing: 0.1em;
          font-size: 1.2rem;
        }
        .close-cart-btn {
          background: none; border: none;
          color: white; font-size: 1.2rem;
          cursor: pointer; opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .close-cart-btn:hover { opacity: 1; }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .empty-cart-msg {
          opacity: 0.4;
          text-align: center;
          margin-top: 2rem;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cart-item-info h4 {
          font-weight: 400; margin-bottom: 0.3rem;
        }
        .remove-item-btn {
          background: none; border: none;
          color: rgba(255,100,100,0.8);
          font-size: 0.7rem; letter-spacing: 0.1em;
          cursor: pointer; cursor: none; /* since we have custom cursor */
        }
        .remove-item-btn:hover {
          color: rgba(255,100,100,1);
        }

        .cart-footer {
          padding: 2rem;
          background: rgba(0,0,0,0.5);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .cart-subtotal {
          display: flex; justify-content: space-between;
          margin-bottom: 1.5rem;
          font-weight: 300; letter-spacing: 0.1em;
        }
        .checkout-btn {
          width: 100%;
          padding: 1.2rem;
          background: var(--text-primary);
          color: var(--bg-primary);
          border: none;
          font-weight: 600;
          letter-spacing: 0.2em;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .checkout-btn:hover:not(:disabled) {
          transform: scale(1.02);
        }
        .checkout-btn:disabled {
          opacity: 0.3; cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
