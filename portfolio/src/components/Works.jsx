import '../styles/works.css';
import WorkCard from './WorkCard';
import WORKS from '../data/works';

export default function Works() {
  return (
    <section id="works">
      <div className="works-section">
        <div className="works-header reveal">
          <div>
            <div className="section-tag">Selected Works</div>
            <h2 className="section-title">
              Things I've<br />Built.
            </h2>
          </div>
          <span className="works-count">({WORKS.length} projects)</span>
        </div>

        <div className="works-grid">
          {WORKS.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
