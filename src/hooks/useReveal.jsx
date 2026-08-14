import { useState, useEffect, useRef } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { setShown(true); obs.disconnect(); }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, shown];
}

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(22px)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        transitionDelay: delay + 'ms',
      }}
    >
      {children}
    </div>
  );
}

export function CountUp({ value, suffix = '', decimals = 0 }) {
  const [ref, shown] = useReveal(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!shown) return;
    const target = Number(value) || 0;
    const startedAt = Date.now();
    const DURATION = 1100;
    
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - startedAt) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p >= 1) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [shown, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-IN')}{suffix}
    </span>
  );
}