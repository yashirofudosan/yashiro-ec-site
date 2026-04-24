"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function HeroContent() {
  const { t, locale } = useLanguage();

  return (
    <>
      <div className="hero-content" key={locale}>
        <h1 className="hero-title">
          {locale === 'en' ? (
            <>ENVIRONMENTAL<br/>PSYCHOLOGY</>
          ) : (
            <span style={{ fontSize: '0.8em', whiteSpace: 'pre-line' }}>{t("hero.title")}</span>
          )}
        </h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <div style={{ marginTop: '3rem' }}>
          <Link href="/philosophy" className="hero-btn hover-lift">{t("hero.cta")}</Link>
        </div>
      </div>
    </>
  );
}
