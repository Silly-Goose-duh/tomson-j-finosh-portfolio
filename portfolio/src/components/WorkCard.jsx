import { useState } from 'react';

export default function WorkCard({ work, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`work-card reveal ${work.featured ? 'featured' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Header row */}
      <div className="card-header">
        <span className="card-num">{work.id}</span>
        <span className="card-tag-pill">{work.tag}</span>
      </div>

      {/* Mock preview image area */}
      <div className={`card-mock ${work.featured ? 'featured-mock' : ''}`}>
        <div className="mock-grid" />
        {/*
          Replace the span below with an actual <img> once you have screenshots:
          <img src={work.previewImg} alt={work.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        */}
        <span className="mock-label">[ Preview Placeholder ]</span>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-title">{work.title}</div>
        <div className="card-desc">{work.desc}</div>
      </div>

      {/* Expandable details */}
      <div className={`card-details ${open ? 'open' : ''}`}>
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

      {/* Footer: tech pills + expand toggle */}
      <div className="card-footer">
        <div className="card-tech">
          {work.tech.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
        <button className="card-expand-btn" onClick={() => setOpen(!open)}>
          {open ? 'Collapse' : 'Expand'}
          <svg
            className={`expand-arrow ${open ? 'open' : ''}`}
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
