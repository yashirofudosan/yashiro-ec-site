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
  title: "YASHIRO EC | 五行思想インテリア",
  description: "五行思想（木・火・土・金・水）に基づいたプレミアムな家具と観葉植物をご提案します。環境エネルギーを最適化するYASHIROメソッド。",
  openGraph: {
    title: "YASHIRO EC | 五行思想インテリア",
    description: "五行思想（木・火・土・金・水）に基づいたプレミアムな家具と観葉植物をご提案します。環境エネルギーを最適化するYASHIROメソッド。",
    url: "https://yashiro-ec.example.com",
    siteName: "YASHIRO EC",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
