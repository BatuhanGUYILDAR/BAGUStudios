import { useEffect, useRef } from 'react';

// Tracks the pointer over the element and exposes it as CSS variables:
// --glow-x / --glow-y for a spotlight and --tilt-x / --tilt-y for a subtle 3D tilt.
// Only runs for mouse-like pointers; tilt stays at 0 when reduced motion is requested.
export function usePointerGlow<T extends HTMLElement>(maxTilt = 5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pointer) return;
      const rect = element.getBoundingClientRect();
      const x = (pointer.x - rect.left) / rect.width;
      const y = (pointer.y - rect.top) / rect.height;
      const tilt = reducedMotion.matches ? 0 : maxTilt;

      element.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
      element.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
      element.style.setProperty('--tilt-x', `${((0.5 - y) * tilt).toFixed(2)}deg`);
      element.style.setProperty('--tilt-y', `${((x - 0.5) * tilt).toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pointer = null;
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [maxTilt]);

  return ref;
}
