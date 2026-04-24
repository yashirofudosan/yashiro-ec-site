import Link from "next/link";
import "./philosophy.css";

export default function PhilosophyPage() {
  return (
    <main className="main-content philosophy-page">
      <section className="philosophy-hero">
        <div className="bg-glow"></div>
        <h1 className="philosophy-title">ENVIRONMENTAL<br/>PSYCHOLOGY</h1>
        <p className="philosophy-subtitle">Eliminating visual noise. Harmonizing physical space.</p>
      </section>

      <section className="philosophy-content">
        <div className="grid-layout">
          <div className="text-block fade-up">
            <h2>01. The Concept of Error Elimination</h2>
            <p>
              YASHIRO operates on a fundamental principle: our physical environment dictates our subconscious momentum. Clutter, dissonant colors, and unaligned textures are not merely aesthetic issues—they are "environmental errors." By systematically eliminating these visual and spatial errors, we strip away the friction that slows cognitive bandwidth.
            </p>
          </div>
          <div className="image-block fade-up delay-1">
            <div className="block-placeholder">ERROR ELIMINATION</div>
          </div>
        </div>

        <div className="grid-layout reverse">
          <div className="text-block fade-up delay-2">
            <h2>02. The Five Elements Logic</h2>
            <p>
              Drawing from ancient systems like Feng Shui but optimized through modern environmental psychology, we classify materials into Wood, Fire, Earth, Metal, and Water. Each element carries a specific frequency. Wood fosters growth. Metal enforces boundaries. Water accelerates flow. By auditing your space, we prescribe the precise elements needed to rebalance your daily trajectory.
            </p>
          </div>
          <div className="image-block fade-up delay-3">
            <div className="block-placeholder">ELEMENTAL ALIGNMENT</div>
          </div>
        </div>

        <div className="grid-layout">
          <div className="text-block fade-up delay-4">
            <h2>03. Geopathic Stress Mitigation</h2>
            <p>
              Your space is permeated by unseen variables—from EMF pollution to structural dissonances known as Geopathic Stress. Our products are not just furniture; they are environmental tuning tools. Our Earth-element components ground these erratic frequencies, anchoring your space securely.
            </p>
          </div>
          <div className="image-block fade-up delay-5">
            <div className="block-placeholder">GEOPATHIC GROUNDING</div>
          </div>
        </div>
      </section>

      <section className="philosophy-footer">
        <h2>Your space is your ultimate algorithm.</h2>
        <Link href="/" className="action-btn hover-lift">BEGIN TUNING YOUR SPACE</Link>
      </section>
    </main>
  );
}
