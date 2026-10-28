import type { ReactNode } from 'react';
import { usePointerGlow } from '../hooks/usePointerGlow';

type GlowPanelProps = {
  children: ReactNode;
  className?: string;
};

// Glass panel with a pointer-following spotlight (no tilt, so text stays steady).
function GlowPanel({ children, className = '' }: GlowPanelProps) {
  const panelRef = usePointerGlow<HTMLDivElement>(0);

  return (
    <div ref={panelRef} className={`glow-card glass-panel transition duration-300 hover:border-neon-blue/30 ${className}`}>
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}

export default GlowPanel;
