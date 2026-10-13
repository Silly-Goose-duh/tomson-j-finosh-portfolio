import type { PortfolioProject } from '../content/types';

export function ProjectArtwork({ data, index }: { data: PortfolioProject; index: number }) {
  return (
    <div className={`project-art project-art--${data.visual}`} aria-hidden="true">
      <span className="project-art__label">{data.cover.label}</span>
      <div className="project-art__graphic">
        {data.visual === 'campaign' && <div className="neuro-orbits"><i /><i /><i /><i /><i /><i /></div>}
        {data.visual === 'mobile' && <div className="dot-device"><span className="dot-device__island" /><span className="dot-device__orb" /><i /><i /><i /></div>}
        {data.visual === 'event' && <div className="event-ticket"><span>{data.cover.title}</span><div className="ticket-barcode" /><small>{String(index + 1).padStart(6, '0')}</small></div>}
        {data.visual === 'dashboard' && <div className="refro-window"><div><i /><i /><i /></div><span>↗</span><div className="refro-window__lines"><i /><i /><i /></div></div>}
        {data.visual === 'writing' && <div className="book-lines"><i /><i /><i /><i /><i /></div>}
      </div>
      <strong className="project-art__title">{data.cover.title}</strong>
      <span className="project-art__subtitle">{data.cover.subtitle}</span>
    </div>
  );
}
