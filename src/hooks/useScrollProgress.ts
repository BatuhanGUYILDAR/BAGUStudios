import { useEffect, type RefObject } from 'react';

// Writes how far the element has been scrolled past (0 → 1) into a CSS variable.
// The value is set directly on the element so scrolling never triggers a React render.
export function useScrollProgress(ref: RefObject<HTMLElement>, property = '--scroll-progress') {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, height } = element.getBoundingClientRect();
      const progress = Math.min(Math.max(-top / height, 0), 1);
      element.style.setProperty(property, progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const stop = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const sync = () => {
      stop();
      if (reducedMotion.matches) {
        element.style.setProperty(property, '0');
        return;
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    };

    sync();
    reducedMotion.addEventListener('change', sync);

    return () => {
      stop();
      reducedMotion.removeEventListener('change', sync);
    };
  }, [ref, property]);
}
