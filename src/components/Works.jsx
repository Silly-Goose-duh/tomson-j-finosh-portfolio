import { useState } from "react";
import "./WorkCard.css";

function WorkCard({ work, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`work-card reveal ${work.featured ? "featured" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="card-header">
        <span className="card-num">{work.id}</span>
        <span className="card-tag-pill">{work.tag}</span>
      </div>

      {/* Preview mock */}
      <div className={`card-mock ${work.featured ? "featured-mock" : ""}`}>
        <div className="mock-grid" />
        {/* Replace .mock-grid + .mock-label with <img> once you have screenshots */}
        <span className="mock-label">[ Project Preview Placeholder ]</span>
      </div>

      {/* Text body */}
      <div className="card-body">
        <div className="card-title">{work.title}</div>
        <div className="card-desc">{work.desc}</div>
      </div>

      {/* Expandable details */}
      <div className={`card-details ${open ? "open" : ""}`}>
        <div className="card-details-inner">
          <div className="detail-block">
            <h4>Role</h4>
            <p>{work.role}</p>
          </div>
          <div className="detail-block">
            <h4>Year</h4>
            <p>{work.year}</p>
          </div>
          <div className="detail-block">
            <h4>Outcome</h4>
            <p>{work.outcome}</p>
          </div>
          <div className="detail-block">
            <h4>View Project</h4>
            <a href={work.link} className="detail-link" target="_blank" rel="noreferrer">
              Visit →
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="card-tech">
          {work.tech.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
        <button className="card-expand-btn" onClick={() => setOpen(!open)}>
          {open ? "Collapse" : "Expand"}
          <svg
            className={`expand-arrow ${open ? "open" : ""}`}
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Works section wrapper ── */
export default function Works({ works }) {
  return (
    <section id="works">
      <div className="section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Selected Works</div>
            <h2 className="section-title">
              Things I've<br />Built.
            </h2>
          </div>
          <span className="section-count">({works.length} projects)</span>
        </div>

        <div className="works-grid">
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
