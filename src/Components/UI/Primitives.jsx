import { useState } from 'react';
import { LuCrown, LuStar, LuSparkles } from 'react-icons/lu';
import { C } from '../../constants/theme.jsx';


export function Eyebrow({ children, dark = false }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-8" style={{ backgroundColor: dark ? C.gold + '66' : C.rose + '55' }} />
      <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: dark ? C.gold : C.rose }}>
        {children}
      </span>
      <span className="h-px w-8" style={{ backgroundColor: dark ? C.gold + '66' : C.rose + '55' }} />
    </div>
  );
}

export function SectionTitle({ children, dark = false }) {
  return (
    <h2 className="font-[Playfair_Display] text-[28px] leading-tight md:text-[42px] font-semibold text-center tracking-tight"
      style={dark ? { backgroundImage: `linear-gradient(100deg, ${C.roseLight}, ${C.gold}, ${C.roseLight})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : { color: C.charcoal }}>
      {children}
    </h2>
  );
}

export function SectionSub({ children, dark = false }) {
  return (
    <p className="text-center text-[13px] md:text-[15px] max-w-2xl mx-auto mt-4 leading-relaxed" style={{ color: dark ? '#B8AFA6' : C.earth }}>
      {children}
    </p>
  );
}

export function GoldButton({ children, onClick, href, className = '', icon: Icon }) {
  const cls = 'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:shadow-lg ' + className;
  const style = { backgroundImage: `linear-gradient(100deg, ${C.rose}, ${C.roseLight} 55%, ${C.gold})`, color: '#FFFFFF', boxShadow: `0 6px 20px ${C.rose}33` };
  
  if (href) return <a href={href} className={cls} style={style}>{Icon && <Icon size={15} />}{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{Icon && <Icon size={15} />}{children}</button>;
}

export function GhostButton({ children, onClick, href, className = '', icon: Icon, dark = false }) {
  const cls = 'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold tracking-wide backdrop-blur-md border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ' + className;
  const style = dark ? { borderColor: C.gold + '55', color: C.roseLight, backgroundColor: 'rgba(255,255,255,0.05)' } : { borderColor: C.rose + '44', color: C.charcoal, backgroundColor: 'rgba(255,255,255,0.55)' };
  
  if (href) return <a href={href} className={cls} style={style}>{Icon && <Icon size={15} />}{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{Icon && <Icon size={15} />}{children}</button>;
}

export function Stars({ rating = 5, size = 13 }) {
  const r = Math.max(0, Math.min(5, Number(rating) || 5));
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map(i => <LuStar key={i} size={size} style={{ color: i < r ? C.gold : C.nude }} fill={i < r ? C.gold : 'none'} strokeWidth={1.6} />)}
    </div>
  );
}

export function LuxImage({ src, alt, className = '', imgClass = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={'flex items-center justify-center ' + className} style={{ backgroundImage: `linear-gradient(135deg, ${C.nude}, ${C.pearl} 50%, ${C.roseLight}55)` }}>
        <div className="text-center">
          <LuCrown size={26} style={{ color: C.rose }} className="mx-auto mb-2 opacity-70" />
          <p className="font-[Playfair_Display] text-[13px] tracking-[0.2em]" style={{ color: C.earth }}>RYLO</p>
        </div>
      </div>
    );
  }
  return (
    <div className={'overflow-hidden ' + className}>
      <img src={src} alt={alt || 'Image'} loading="lazy" onError={() => setFailed(true)} className={'w-full h-full object-cover ' + imgClass} />
    </div>
  );
}

export function EmptyState({ icon: Icon = LuSparkles, text }) {
  return (
    <div className="text-center py-14">
      <Icon size={30} className="mx-auto mb-3" style={{ color: '#B76E7955' }} />
      <p className="text-[13px]" style={{ color: '#7A6A60' }}>{text}</p>
    </div>
  );
}