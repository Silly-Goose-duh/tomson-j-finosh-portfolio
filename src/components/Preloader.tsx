import { useEffect, useState } from 'react';
import type { PortfolioContent } from '../content/types';

type BrandData = PortfolioContent['brand'];

export function Preloader({ brand }: { brand: BrandData }) {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = window.sessionStorage.getItem('sg-portfolio-seen') === 'yes';
    if (motionReduced || seen) {
      setFinished(true);
      return;
    }
    window.sessionStorage.setItem('sg-portfolio-seen', 'yes');
    const timer = window.setTimeout(() => setFinished(true), 720);
    return () => window.clearTimeout(timer);
  }, []);

  if (finished) return null;
  return <div className="preloader" aria-hidden="true"><span>{brand.mark}</span><span>{brand.descriptor}</span></div>;
}
