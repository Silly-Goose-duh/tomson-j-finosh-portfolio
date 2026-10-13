import type { ExternalLink, PortfolioContent } from '../content/types';

type HeroData = PortfolioContent['hero'];
type IntroData = PortfolioContent['intro'];
type SkillsData = PortfolioContent['skills'];
type ToolsData = PortfolioContent['toolsAndAwards'];
type BrandData = PortfolioContent['brand'];

function ArrowMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Hero({ data, brand }: { data: HeroData; brand: BrandData }) {
  const [first, ...rest] = data.title.split('');
  return (
    <section className="hero section-dark" id="top" aria-labelledby="hero-title">
      <div className="hero__image" aria-hidden="true"><div className="hero__streaks" /></div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__frame">
        <div className="hero__meta"><span>{brand.descriptor}</span><span>{data.issue}</span></div>
        <div className="hero__availability"><i />{data.availability}</div>
        <div className="hero__title-wrap">
          <h1 className="hero__title" id="hero-title" aria-label={`${data.title} — ${brand.name}`}>
            <span>{first}{rest.slice(0, 3).join('')}</span><span>{rest.slice(3).join('')}</span>
          </h1>
        </div>
        <div className="hero__subject" role="img" aria-label={`${data.portraitLabel}: ${data.portraitPrompt}`}>
          <div className="hero__subject-art">
            {data.image ? <img src={data.image} alt={data.imageAlt} width="1332" height="2000" /> : <><span className="hero__subject-orbit hero__subject-orbit--one" /><span className="hero__subject-orbit hero__subject-orbit--two" /><span className="hero__subject-head" /><span className="hero__subject-body" /><span className="hero__subject-cross">✳</span></>}
          </div>
          <span className="hero__portrait-label">{data.portraitLabel}</span>
          <span className="hero__portrait-note">{data.portraitPrompt}</span>
          <span className="hero__signature">{data.signature}</span>
        </div>
        <div className="hero__bottom">
          <div className="hero__identity"><span>{data.portraitLabel}</span><p>{data.portraitPrompt}</p><a href="#work" className="hero__work-link">{data.workLink}<span aria-hidden="true">↗</span></a></div>
          <div className="hero__copy">
            <p className="hero__subtitle">{data.subtitle}</p>
            <p className="hero__descriptor">{data.descriptor}</p>
            <a className="scroll-cue" href="#intro"><span>{data.scrollCue}</span><ArrowMark /></a>
          </div>
        </div>
        <span className="hero__vertical-note" aria-hidden="true">{brand.name} · {data.issue}</span>
      </div>
    </section>
  );
}

function LinkList({ links, externalLinkLabel }: { links: ExternalLink[]; externalLinkLabel: string }) {
  return <div className="intro-links">{links.map((link) => <a href={link.href} key={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label}. ${externalLinkLabel}`}>{link.label}<ArrowMark /></a>)}</div>;
}

export function Intro({ data, brand, externalLinkLabel }: { data: IntroData; brand: BrandData; externalLinkLabel: string }) {
  return (
    <section className="intro section-dark dot-grid" id="intro" aria-labelledby="intro-heading">
      <div className="section-wrap intro__wrap">
        <div className="section-kicker reveal" data-reveal><span>{data.index} / {data.label}</span><span>{brand.mark}</span></div>
        <h2 className="display-heading intro__title" id="intro-heading" data-reveal>
          <span className="eyebrow">{data.heading}</span>
          <span>{data.greeting}</span>
          <span className="intro__name-line">{data.firstName} {data.lastName}<i aria-hidden="true">✳</i></span>
          <span className="intro__aka">{data.aka}</span>
        </h2>
        <div className="intro__body" data-reveal>
          <div className="intro__copy">{data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="intro__aside"><span className="rule-mark" aria-hidden="true">↘</span><p>{data.note}</p><LinkList links={data.links} externalLinkLabel={externalLinkLabel} /></div>
        </div>
      </div>
    </section>
  );
}

export function Skills({ data }: { data: SkillsData }) {
  return (
    <section className="skills section-dark" id="skills" aria-labelledby="skills-heading">
      <div className="section-wrap skills__wrap">
        <div className="skills__poster" data-reveal>
          <div className="skills__circle"><span className="skills__circle-small">{data.label}</span><span className="skills__circle-big">{data.items.length}</span><span className="skills__circle-note">{data.circleCaption.split('\n').map((line) => <span key={line}>{line}</span>)}</span></div>
          <div className="skills__stamp"><span>{data.note}</span></div>
        </div>
        <div className="skills__panel">
          <div className="section-kicker"><span>{data.label}</span><span>{data.index} / 09</span></div>
          <h2 className="display-heading" id="skills-heading">{data.heading}</h2>
          <p className="skills__note">{data.note}</p>
          <ul className="skill-list">{data.items.map((item) => (
            <li key={item.symbol} className="skill-row" data-reveal>
              <span className="skill-row__number">{item.symbol}</span>
              <div className="skill-row__body"><span className="skill-row__name">{item.name}</span><span className="skill-row__detail">{item.detail}</span><span className="skill-row__line"><i data-fill /></span></div>
            </li>
          ))}</ul>
        </div>
      </div>
    </section>
  );
}

export function ToolsAndAwards({ data }: { data: ToolsData }) {
  return (
    <section className="tools-section section-paper" id="tools" aria-labelledby="tools-heading">
      <div className="section-wrap">
        <div className="section-kicker section-kicker--ink" data-reveal><span>{data.index} / {data.heading}</span><span>{data.cue}</span></div>
        <div className="tools-panel" data-reveal>
          <div className="tools-panel__top"><div><p className="eyebrow">{data.toolsLabel}</p><h2 className="display-heading" id="tools-heading">{data.heading}</h2></div><p className="tools-panel__note">{data.toolsNote}</p></div>
          <div className="tools-columns">
            <div className="tools-column">
              <p className="eyebrow" id="practice-list-label">{data.practiceLabel}</p>
              <ul className="tools-column__list" aria-labelledby="practice-list-label">{data.practiceAreas.map((area, index) => <li key={area}><span className="tools-column__index">{String(index + 1).padStart(2, '0')}</span><span className="tools-column__name">{area}</span></li>)}</ul>
            </div>
            <div className="tools-column">
              <p className="eyebrow" id="technical-list-label">{data.technicalLabel}</p>
              <ul className="tools-column__list" aria-labelledby="technical-list-label">{data.technicalAreas.map((area, index) => <li key={area}><span className="tools-column__index">{String(index + 1).padStart(2, '0')}</span><span className="tools-column__name">{area}</span></li>)}</ul>
            </div>
          </div>
          <ul className="sr-only" aria-label={data.toolsLabel}>{data.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          <div className="tool-marquee" aria-hidden="true">
            <div className="tool-marquee__track">{[...data.tools, ...data.tools].map((tool, index) => <span className="tool-pill" key={`${tool}-${index}`}><i aria-hidden="true">✳</i>{tool}</span>)}</div>
          </div>
          <div className="awards-row">
            <div><p className="eyebrow">{data.awardsLabel}</p><p className="awards-row__note">{data.awardsNote}</p></div>
            <div className="awards-empty"><span className="awards-empty__mark" aria-hidden="true">—</span><span>{data.awardsPlaceholder}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
