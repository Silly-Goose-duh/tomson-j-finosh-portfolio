import '../styles/hero.css';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      {/* Decorative vertical grid lines */}
      <div className="hero-grid-line" />
      <div className="hero-grid-line" />
      <div className="hero-grid-line" />

      <div className="hero-inner">
        {/* ── Left: Text ── */}
        <div className="hero-left">
          <div className="hero-tag">Portfolio — 2025</div>

          <h1 className="hero-name">
            Your<br />
            <span className="line2">Name</span><br />
            Here.
          </h1>

          <p className="hero-desc">
            {/* Replace with your tagline / role */}
            [ Your tagline goes here — e.g. Full-stack developer & digital craftsman
            building things that live on the internet. ]
          </p>

          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('works')}>
              View Works
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('contact')}>
              Get in Touch
            </button>
          </div>
        </div>

        {/* ── Right: Avatar ── */}
        <div className="hero-right">
          <div className="avatar-wrap">
            <div className="avatar-ring2" />
            <div className="avatar-ring" />
            <div className="avatar-img">
              {/* Replace the placeholder below with an <img> tag pointing to your photo */}
              <div className="avatar-placeholder">
                <div className="avatar-icon">
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                    <circle cx="16" cy="12" r="6" stroke="#e8e8e0" strokeWidth="1.5" />
                    <path
                      d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
                      stroke="#e8e8e0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="avatar-hint">Your photo here</span>
              </div>
              <div className="avatar-dot" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}
