"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="nav-action-btn hover-lift desktop-only"
      style={{ 
        border: 'none', background: 'none', 
        fontSize: '0.8rem', opacity: 0.8,
        display: 'flex', alignItems: 'center', gap: '0.3rem'
      }}
    >
      <span style={{ fontWeight: locale === 'en' ? 700 : 300, opacity: locale === 'en' ? 1 : 0.5 }}>EN</span>
      <span>/</span>
      <span style={{ fontWeight: locale === 'ja' ? 700 : 300, opacity: locale === 'ja' ? 1 : 0.5 }}>JP</span>
    </button>
  );
}
