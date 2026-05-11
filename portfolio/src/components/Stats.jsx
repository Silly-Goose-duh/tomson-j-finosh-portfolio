import '../styles/stats.css';

// ── Replace the num values with your real stats ──
const STATS = [
  { num: '00+', label: 'Projects Shipped' },
  { num: '00+', label: 'Happy Clients'    },
  { num: '00+', label: 'Years Experience' },
  { num: '00+', label: 'Technologies'     },
];

export default function Stats() {
  return (
    <div className="stats-bar reveal">
      {STATS.map((s) => (
        <div className="stat-item" key={s.label}>
          <span className="stat-num">{s.num}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
