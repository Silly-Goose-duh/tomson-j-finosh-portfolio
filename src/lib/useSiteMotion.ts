import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useSiteMotion(): void {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    const desktop = window.matchMedia('(min-width: 768px)').matches;
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (desktop) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>('[data-fill]').forEach((element) => {
        gsap.fromTo(element,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'left center', scrollTrigger: { trigger: element, start: 'top 90%', once: true } },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => {
      context.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);
}
