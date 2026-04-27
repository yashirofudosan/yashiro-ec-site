"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderCartButton from "./HeaderCartButton";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link href="/" onClick={handleLinkClick}>YASHIRO</Link>
        </div>
        
        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link href="/type/furniture" className="nav-link-item hover-metal" style={{ fontWeight: 500 }}>{t("nav.furniture")}</Link>
          <Link href="/type/plant" className="nav-link-item hover-wood" style={{ fontWeight: 500 }}>{t("nav.plants")}</Link>
          <span style={{color: 'rgba(255,255,255,0.2)', margin: '0 0.5rem'}}>|</span>
          <Link href="/category/wood" className="nav-link-item hover-wood">{t("elements.wood")}</Link>
          <Link href="/category/fire" className="nav-link-item hover-fire">{t("elements.fire")}</Link>
          <Link href="/category/earth" className="nav-link-item hover-earth">{t("elements.earth")}</Link>
          <Link href="/category/metal" className="nav-link-item hover-metal">{t("elements.metal")}</Link>
          <Link href="/category/water" className="nav-link-item hover-water">{t("elements.water")}</Link>
          <span style={{color: 'rgba(255,255,255,0.2)', margin: '0 0.5rem'}}>|</span>
          <Link href="/room/living" className="nav-link-item">{t("nav.living")}</Link>
          <Link href="/room/bedroom" className="nav-link-item">{t("nav.bedroom")}</Link>
          <Link href="/room/workspace" className="nav-link-item">{t("nav.workspace")}</Link>
          <span style={{color: 'rgba(255,255,255,0.2)', margin: '0 0.5rem'}}>|</span>
          <Link href="/about" className="nav-link-item">{t("nav.about")}</Link>
          <Link href="/five-elements" className="nav-link-item hover-wood">{t("nav.fiveElements")}</Link>
          <Link href="/magazine" className="nav-link-item hover-water" style={{ fontWeight: 'bold' }}>MAGAZINE(記事)</Link>
        </div>

        <div className="nav-actions">
          <LanguageToggle />
          <Link href="/search" className="nav-action-btn hover-lift desktop-only" style={{ border: 'none', background: 'none' }}>{t("nav.search")}</Link>
          <HeaderCartButton />
          
          {/* Hamburger Icon */}
          <button 
            className="hamburger-btn hover-lift" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? t("nav.close") : t("nav.menu")}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div style={{ marginBottom: '2rem' }}><LanguageToggle /></div>
          <Link href="/search" className="mobile-link emphasis" onClick={handleLinkClick}>{t("nav.search")}</Link>
          <Link href="/type/furniture" className="mobile-link emphasis" onClick={handleLinkClick}>{t("nav.furniture")}</Link>
          <Link href="/type/plant" className="mobile-link emphasis" onClick={handleLinkClick}>{t("nav.plants")}</Link>
          
          <div className="mobile-divider">ELEMENTS</div>
          <Link href="/category/wood" className="mobile-link hover-wood" onClick={handleLinkClick}>{t("elements.wood")}</Link>
          <Link href="/category/fire" className="mobile-link hover-fire" onClick={handleLinkClick}>{t("elements.fire")}</Link>
          <Link href="/category/earth" className="mobile-link hover-earth" onClick={handleLinkClick}>{t("elements.earth")}</Link>
          <Link href="/category/metal" className="mobile-link hover-metal" onClick={handleLinkClick}>{t("elements.metal")}</Link>
          <Link href="/category/water" className="mobile-link hover-water" onClick={handleLinkClick}>{t("elements.water")}</Link>
          
          <div className="mobile-divider">SPACES</div>
          <Link href="/room/living" className="mobile-link" onClick={handleLinkClick}>{t("nav.living")}</Link>
          <Link href="/room/bedroom" className="mobile-link" onClick={handleLinkClick}>{t("nav.bedroom")}</Link>
          <Link href="/room/workspace" className="mobile-link" onClick={handleLinkClick}>{t("nav.workspace")}</Link>

          <div className="mobile-divider">PHILOSOPHY</div>
          <Link href="/about" className="mobile-link" onClick={handleLinkClick}>{t("nav.about")}</Link>
          <Link href="/five-elements" className="mobile-link hover-wood" onClick={handleLinkClick}>{t("nav.fiveElements")}</Link>
          <Link href="/magazine" className="mobile-link hover-water" onClick={handleLinkClick} style={{ fontWeight: 'bold' }}>MAGAZINE(記事)</Link>
        </div>
      </div>
    </>
  );
}
