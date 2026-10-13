import { useEffect, useRef, useState } from 'react';
import type { PortfolioContent } from '../content/types';

type NavData = PortfolioContent['navigation'];
type BrandData = PortfolioContent['brand'];

export function SiteNav({ data, brand }: { data: NavData; brand: BrandData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let previousY = window.scrollY;
    let scheduled = false;
    let currentlyHidden = false;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const distance = Math.abs(currentY - previousY);
        const focusInsideHeader = headerRef.current?.contains(document.activeElement) ?? false;
        if (currentY < 84 || menuOpen || focusInsideHeader) currentlyHidden = false;
        else if (distance > 5) currentlyHidden = currentY > previousY;
        setHidden(currentlyHidden);
        if (headerRef.current) headerRef.current.inert = currentlyHidden;
        previousY = currentY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(100, (currentY / max) * 100) : 0;
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
        document.querySelector('.nav-progress')?.setAttribute('aria-valuenow', String(Math.round(progress)));
        scheduled = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(`#${current.target.id}`);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={`site-header${hidden ? ' site-header--hidden' : ''}${menuOpen ? ' site-header--open' : ''}`}>
      <div className="site-nav-shell">
        <a className="brand-mark" href="#top" aria-label={brand.name} onClick={closeMenu}>
          <span aria-hidden="true">{brand.mark}</span>
          <span className="brand-wordmark">{brand.name}</span>
        </a>
        <nav className="site-nav" aria-label={data.ariaLabel}>
          {data.links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className={active === link.href ? 'is-active' : ''} aria-current={active === link.href ? 'location' : undefined}>
              <span className="nav-index">0{index + 1}</span>{link.label}
            </a>
          ))}
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? data.closeLabel : data.menuLabel} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
      </div>
      <div className="nav-progress" role="progressbar" aria-label={data.progressLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span /></div>
    </header>
  );
}
