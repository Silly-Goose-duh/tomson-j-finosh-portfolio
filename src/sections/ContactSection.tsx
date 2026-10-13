import { useState } from 'react';
import type { PortfolioContent } from '../content/types';

type ContactData = PortfolioContent['contact'];
type BrandData = PortfolioContent['brand'];

export function ContactSection({ data, brand, externalLinkLabel }: { data: ContactData; brand: BrandData; externalLinkLabel: string }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('error');
    }
  };

  return (
    <section className="contact section-paper" id="contact" aria-labelledby="contact-heading">
      <div className="section-wrap contact__wrap">
        <div className="contact-card">
          <div className="contact-card__marquee" aria-hidden="true"><span>{brand.descriptor} ✳ {brand.descriptor} ✳ {brand.descriptor} ✳ {brand.descriptor}</span></div>
          <div className="contact-card__top"><span>{brand.mark} / {brand.name}</span><span>{data.index}</span></div>
          <h2 className="contact__title display-heading" id="contact-heading" data-reveal>{data.heading}</h2>
          <div className="contact__bottom">
            <div className="contact__message"><p>{data.message}</p><div className="contact-actions"><a className="contact-cta" href={`mailto:${data.email}`}>{data.emailLabel}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a><a className="contact-secondary" href={data.pdf.href} download>{data.pdf.label}<span aria-hidden="true">↓</span></a><a className="contact-secondary" href={data.github.href} target="_blank" rel="noreferrer" aria-label={`${data.github.label}. ${externalLinkLabel}`}>{data.github.label}<span aria-hidden="true">↗</span></a>{data.instagram.href ? <a className="contact-secondary" href={data.instagram.href} target="_blank" rel="noreferrer">{data.instagram.label}<span aria-hidden="true">↗</span></a> : <span className="contact-secondary contact-placeholder-link">{data.instagram.label}</span>}<button className="contact-secondary contact-copy" type="button" onClick={copyEmail} aria-live="polite">{copyState === 'copied' ? data.copiedLabel : copyState === 'error' ? data.copyError : data.copyLabel}</button></div></div>
            <div className="contact-placeholder"><span className="contact-placeholder__marker" aria-hidden="true">+</span><span className="eyebrow">{data.placeholderTitle}</span><p>{data.placeholderCopy}</p></div>
          </div>
          <footer className="contact-footer"><span>© {new Date().getFullYear()} {brand.name}</span><span>{data.footerNote}</span><a href="#top">{data.topLabel} ↑</a></footer>
        </div>
      </div>
    </section>
  );
}
