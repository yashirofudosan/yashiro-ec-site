import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
  title: "YASHIRO E-Commerce | Five Elements",
  description: "Premium Furniture and Houseplants aligned with the Five Elements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <body className="layout-container">
        <LanguageProvider>
          <CartProvider>
            <CustomCursor />
            <CartDrawer />
            <Navigation />

        {children}

        <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
