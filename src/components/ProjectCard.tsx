import type { PortfolioProject } from '../content/types';
import { ProjectArtwork } from './ProjectArtwork';

type Props = { data: PortfolioProject; linkLabel: string; externalLinkLabel: string; index: number; staticCard?: boolean };

export function ProjectCard({ data, linkLabel, externalLinkLabel, index, staticCard = false }: Props) {
  return (
    <article className={`project-card project-card--${data.visual}${staticCard ? ' project-card--static' : ''}`} {...(staticCard ? {} : { 'data-reveal': true })}>
      <a className="project-card__link" data-cursor href={data.href} target="_blank" rel="noreferrer" aria-label={`${linkLabel}: ${data.title}. ${externalLinkLabel}`}>
        <div className="project-card__art"><ProjectArtwork data={data} index={index} /><span className="project-card__arrow" aria-hidden="true">↗</span></div>
        <div className="project-card__body">
          <div className="project-card__eyebrow">{data.eyebrow}<span>↗</span></div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
           <ul className="project-tags" aria-label={data.tags.join(', ')}>{data.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
           {data.note && <p className="project-card__note">{data.note}</p>}
        </div>
      </a>
      {data.live && <a className="project-live" href={data.live.href} target="_blank" rel="noreferrer" aria-label={`${data.live.label}: ${data.title}. ${externalLinkLabel}`}>{data.live.label}<span aria-hidden="true">↗</span></a>}
    </article>
  );
}
