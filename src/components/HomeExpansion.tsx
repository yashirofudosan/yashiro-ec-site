"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import "./home-expansion.css";

export default function HomeExpansion() {
  const { t, locale } = useLanguage();

  return (
    <>
      {/* Philosophy Teaser Section */}
      <section className="philosophy-teaser-section">
        <div className="pt-content">
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            {locale === 'en' ? 'ELIMINATE THE NOISE' : '環境のエラーを排除する'}
          </h2>
          <p className="pt-text">
            {locale === 'en' 
              ? 'Our living spaces actively shape our subconscious. YASHIRO applies Environmental Psychology and Five Elements theory to align your physical space with your cognitive bandwidth. By removing geopathic stress and curating elemental flow, we help you reclaim your absolute focus.'
              : '私たちが身を置く空間の「ノイズ」は、無意識のうちに脳のリソースを奪っています。YASHIROは環境心理学と五行思想を融合させ、空間のエネルギーフローを最適化。デザインに留まらない「空間の調律」を提供します。'}
          </p>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/philosophy" className="pt-btn hover-lift">
              {locale === 'en' ? 'READ OUR PHILOSOPHY' : 'ブランド哲学を読む'}
            </Link>
          </div>
        </div>
        <div className="pt-image-container">
          {/* Abstract aesthetic shape instead of actual image for now */}
          <div className="abstract-shape"></div>
        </div>
      </section>

      {/* Feature Teaser Grid */}
      <section className="feature-teaser-section">
        <div className="ft-grid">
          {/* Diagnostic Feature (Upcoming) */}
          <div className="ft-card glass-panel dark">
            <h3 className="ft-title">
              {locale === 'en' ? 'SPATIAL DIAGNOSTIC' : '空間チューニング診断'}
            </h3>
            <p className="ft-desc">
              {locale === 'en' 
                ? 'Discover which of the Five Elements is missing from your environment. Take our interactive assessment.'
                : '今、あなたの空間に足りていないエレメントは何でしょうか？直感的な質問から最適な属性を導き出します。'}
            </p>
            <div className="ft-status">COMING SOON</div>
          </div>

          {/* Consultation / Contact */}
          <Link href="/contact" className="ft-card glass-panel light hover-lift">
            <h3 className="ft-title" style={{ color: '#111' }}>
              {locale === 'en' ? 'PRIVATE CONSULTATION' : '風水・空間コンサルティング'}
            </h3>
            <p className="ft-desc" style={{ color: '#333' }}>
              {locale === 'en'
                ? 'Schedule a 1-on-1 session to analyze the energetic footprint of your home or office.'
                : '図面を用いた緻密な環境分析と、最適な家具・植物の配置プランをご提案します。'}
            </p>
            <div className="ft-status" style={{ border: '1px solid #111', color: '#111' }}>
              {locale === 'en' ? 'CONTACT US' : 'お問い合わせ'}
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
