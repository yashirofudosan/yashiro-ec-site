"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function HeroContent() {
  const { t, locale } = useLanguage();

  return (
    <>
      <div className="hero-grid-overlay" />
      <div className="hero-content" key={locale}>
        <h1 className="hero-title">
          {locale === 'en' ? (
            <>ENVIRONMENTAL<br/>PSYCHOLOGY</>
          ) : (
            <span style={{ fontSize: '0.86em', whiteSpace: 'pre-line', fontWeight: 400 }}>{t("hero.title")}</span>
          )}
        </h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <div style={{ marginTop: '3rem' }}>
          <Link href="/philosophy" className="hero-btn hover-lift">{t("hero.cta")}</Link>
        </div>
      </div>

      <div className="hero-status-panel desktop-only">
        <div className="status-item">
          <span>SPATIAL_DEBUGGING</span>
          <div className="status-line" />
          <span>ACTIVE</span>
        </div>
        <div className="status-item">
          <span>NOISE_REDUCTION</span>
          <div className="status-line" />
          <span>OPTIMIZED</span>
        </div>
        <div className="status-item">
          <span>ELEMENTAL_SYNC</span>
          <div className="status-line" />
          <span>528HZ</span>
        </div>
      </div>
    </>
  );
}
