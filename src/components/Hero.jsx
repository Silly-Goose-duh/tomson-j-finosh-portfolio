import "./Hero.css";

const STATS = [
  { num: "00+", label: "Projects Shipped" },
  { num: "00+", label: "Happy Clients"    },
  { num: "00+", label: "Years Experience" },
  { num: "00+", label: "Technologies"     },
];

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section className="hero">
        {/* Decorative grid lines */}
        <div className="hero-grid-line" />
        <div className="hero-grid-line" />
        <div className="hero-grid-line" />

        <div className="hero-inner">
          {/* ── Left ── */}
          <div className="hero-left">
            <div className="hero-tag">Portfolio — 2025</div>

            <h1 className="hero-name">
              Your<br />
              <span className="line2">Name</span><br />
              Here.
            </h1>

            <p className="hero-desc">
              [ Your tagline or role — e.g. Full-stack developer &amp; digital
              craftsman building things that live on the internet. ]
            </p>

            <div className="hero-btns">
              <button className="btn-primary"    onClick={() => scrollTo("works")}>View Works</button>
              <button className="btn-secondary"  onClick={() => scrollTo("contact")}>Get in Touch</button>
            </div>
          </div>

          {/* ── Right – avatar ── */}
          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-ring2" />
              <div className="avatar-ring"  />
              <div className="avatar-img">
                {/* Replace the placeholder div below with <img src="..." alt="Your Name" /> */}
                <div className="avatar-placeholder">
                  <div className="avatar-icon">
                    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                      <circle cx="16" cy="12" r="6" stroke="#e8e8e0" strokeWidth="1.5" />
                      <path   d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
                              stroke="#e8e8e0" strokeWidth="1.5" strokeLinecap="round" />
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

      {/* Stats bar */}
      <div className="stats-bar reveal">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
