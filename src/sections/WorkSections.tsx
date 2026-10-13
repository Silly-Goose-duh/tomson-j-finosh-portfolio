import type { CSSProperties } from 'react';
import type { PortfolioContent, PlaceholderProject } from '../content/types';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { ProjectCard } from '../components/ProjectCard';

type CampaignData = PortfolioContent['campaigns'];
type WorkData = PortfolioContent['work'];
type SocialData = PortfolioContent['social'];
type LandingData = PortfolioContent['landing'];

function PlaceholderCard({ data, index }: { data: PlaceholderProject; index: number }) {
  return (
    <article className={`placeholder-card placeholder-card--${data.visual}`} data-reveal>
      <div className="placeholder-card__art"><PlaceholderArt variant={data.visual} index={index} /><span className="placeholder-card__category">{data.category}</span><span className="placeholder-card__index">0{index + 1}</span></div>
      <div className="placeholder-card__copy"><h3>{data.title}</h3><p>{data.prompt}</p></div>
    </article>
  );
}

export function Campaigns({ data }: { data: CampaignData }) {
  return (
    <section className="campaigns section-paper" id="campaigns" aria-labelledby="campaign-heading">
      <div className="section-wrap">
        <div className="section-kicker section-kicker--ink" data-reveal><span>{data.index}</span><span>{data.statusLabel}</span></div>
        <div className="campaigns__heading" data-reveal><h2 className="display-heading" id="campaign-heading">{data.heading}</h2><p>{data.intro}</p></div>
        <div className="event-archive" aria-labelledby="event-archive-heading">
          <div className="event-archive__intro"><p className="eyebrow">THE EVENT ARCHIVE</p><h3 id="event-archive-heading">EVENTS I’VE HELPED BRING TO LIFE.</h3><p>Each moving panel names the event, its date and the format.</p></div>
          <div className="event-groups">{data.eventGroups.map((group) => <div className="event-group" key={group.title}><p className="eyebrow">{group.eyebrow}</p><h4>{group.title}</h4><div className="event-orbit">{[...group.items, ...group.items].map((item, index) => <article className="event-orb" key={`${group.title}-${item.name}-${index}`} aria-hidden={index >= group.items.length} style={{ '--orb-index': index % group.items.length } as CSSProperties}><span>{item.date}</span><strong>{item.name}</strong><small>{item.description}</small></article>)}</div></div>)}</div>
        </div>
        <div className="research-archive" aria-labelledby="research-archive-heading"><div><p className="eyebrow">RESEARCH IN PROGRESS</p><h3 id="research-archive-heading">WHAT I’M CURRENTLY RESEARCHING.</h3><p className="research-archive__lead">Two ongoing writing and research directions about work, identity and how brands earn attention.</p></div><div className="research-archive__list">{data.research.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h4>{item.title}</h4><p>{item.description}</p><span className="research-archive__status">RESEARCH / WRITING IN PROGRESS</span></article>)}</div></div>
      </div>
    </section>
  );
}

export function SelectedWork({ data, externalLinkLabel }: { data: WorkData; externalLinkLabel: string }) {
  return (
    <section className="work section-dark" id="work" aria-labelledby="work-heading">
      <div className="section-wrap">
        <div className="section-kicker reveal" data-reveal><span>{data.index}</span><span>{data.statusLabel}</span></div>
        <div className="work__heading" data-reveal><h2 className="display-heading" id="work-heading">{data.heading}</h2><p>{data.intro}</p></div>
         <div className="work-grid">{data.projects.map((project, index) => <ProjectCard key={project.id} data={project} linkLabel={project.linkLabel ?? data.linkLabel} externalLinkLabel={externalLinkLabel} index={index} staticCard />)}</div>
        <p className="work__note">{data.sectionNote}</p>
      </div>
    </section>
  );
}

export function SocialPages({ data }: { data: SocialData }) {
  return (
    <section className="social section-dark dot-grid" id="social" aria-labelledby="social-heading">
      <div className="section-wrap">
        <div className="section-kicker reveal" data-reveal><span>{data.index}</span><span>{data.statusLabel}</span></div>
        <div className="social__heading" data-reveal><h2 className="display-heading" id="social-heading">{data.heading}</h2><p>{data.intro}</p></div>
        <div className="hobby-skill-grid">{data.skillCards.map((item, index) => <article className="hobby-skill-card" key={item.symbol} data-reveal><span className="hobby-skill-card__number">{item.symbol}</span><div className="hobby-skill-card__shape" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div><p className="eyebrow">THE DOMAIN</p><h3>{item.name}</h3><p className="hobby-skill-card__detail">{item.detail}</p><span className="hobby-skill-card__caption">ANOTHER WAY OF LOOKING</span></article>)}</div>
        <p className="social__note">{data.note}</p>
      </div>
    </section>
  );
}

export function LandingAndPosters({ data, externalLinkLabel }: { data: LandingData; externalLinkLabel: string }) {
  return (
    <section className="landing section-paper" id="landing" aria-labelledby="landing-heading">
      <div className="section-wrap">
        <div className="section-kicker section-kicker--ink" data-reveal><span>{data.index}</span><span>{data.statusLabel}</span></div>
        <div className="landing__heading" data-reveal><h2 className="display-heading" id="landing-heading">{data.heading}</h2><p>{data.intro}</p></div>
        <div className="landing__grid">
          <div className="landing__project">{data.projects.map((project, index) => <ProjectCard key={project.id} data={project} linkLabel={data.linkLabel} externalLinkLabel={externalLinkLabel} index={index + 2} />)}</div>
          <PlaceholderCard data={data.poster} index={4} />
        </div>
      </div>
    </section>
  );
}
