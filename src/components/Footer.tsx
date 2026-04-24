"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>YASHIRO</h3>
          <p>
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="footer-col">
          <h4>{t("footer.collections")}</h4>
          <ul>
            <li><Link href="/category/wood" className="hover-wood">{t("footer.wood")}</Link></li>
            <li><Link href="/category/fire" className="hover-fire">{t("footer.fire")}</Link></li>
            <li><Link href="/category/earth" className="hover-earth">{t("footer.earth")}</Link></li>
            <li><Link href="/category/metal" className="hover-metal">{t("footer.metal")}</Link></li>
            <li><Link href="/category/water" className="hover-water">{t("footer.water")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t("footer.spaces")}</h4>
          <ul>
            <li><Link href="/room/living">{t("nav.living")}</Link></li>
            <li><Link href="/room/bedroom">{t("nav.bedroom")}</Link></li>
            <li><Link href="/room/workspace">{t("nav.workspace")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t("footer.philosophy")}</h4>
          <ul>
            <li><Link href="/philosophy">{t("footer.philosophyLink1")}</Link></li>
            <li><Link href="/philosophy">{t("footer.philosophyLink2")}</Link></li>
            <li><Link href="/philosophy">{t("footer.philosophyLink3")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t("footer.support")}</h4>
          <ul>
            <li><Link href="#">Maintenance & Care</Link></li>
            <li><Link href="#">Shipping & Returns</Link></li>
            <li><Link href="/contact">{t("footer.contact")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 YASHIRO CO., LTD. ALL RIGHTS RESERVED.</span>
        <span>PRIVACY POLICY | TERMS OF SERVICE</span>
      </div>
    </footer>
  );
}
