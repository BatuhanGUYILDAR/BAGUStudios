import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  className?: string;
  // Milliseconds to wait after the element enters the viewport; used for staggered lists.
  delay?: number;
};

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
