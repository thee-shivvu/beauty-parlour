import { LuCrown, LuSparkles, LuCalendar, LuMenu } from 'react-icons/lu';
import { C, scrollToId } from '../../constants/theme';
import { GoldButton } from "../UI/Primitives"

const brand = {
  name: "Rylo Parlour",
  tagline: "Where Luxury Meets Radiance"
};

// eslint-disable-next-line react-refresh/only-export-components
export const NAV = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' }, { id: 'pricing', label: 'Pricing' },
  { id: 'offers', label: 'Offers' }, { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Team' }, { id: 'reviews', label: 'Reviews' },
  { id: 'bridal', label: 'Bridal' }, { id: 'contact', label: 'Contact' },
];

export default function Header({ scrolled, setDrawer }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b"
      style={{
        backgroundColor: scrolled ? 'rgba(253,251,247,0.82)' : 'rgba(253,251,247,0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: scrolled ? C.rose + '22' : 'transparent',
        boxShadow: scrolled ? '0 6px 24px rgba(183,110,121,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between">
        
        {/* Brand logo — sparkling crown mark */}
        <button onClick={() => scrollToId('home')} className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
          <span
            className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundImage: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, boxShadow: `0 4px 14px ${C.rose}44` }}
          >
            <LuCrown size={16} className="text-white" />
            <LuSparkles size={9} className="absolute -top-0.5 -right-0.5" style={{ color: C.gold }} />
          </span>
          <span className="text-left leading-none">
            <span className="block font-[Playfair_Display] text-[17px] font-bold tracking-tight" style={{ color: C.charcoal }}>
              {brand.name}
            </span>
            <span className="block text-[8.5px] font-semibold tracking-[0.22em] uppercase mt-0.5" style={{ color: C.rose }}>
              {brand.tagline}
            </span>
          </span>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => scrollToId(n.id)}
              className="px-3 py-2 text-[12.5px] font-medium rounded-full transition-all duration-200 hover:bg-white/70"
              style={{ color: C.earth }}
              onMouseEnter={e => { e.currentTarget.style.color = C.rose; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.earth; }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <GoldButton onClick={() => scrollToId('booking')} className="hidden md:inline-flex !px-5 !py-2.5 !text-[12px]" icon={LuCalendar}>
            Book Appointment
          </GoldButton>
          
          {/* Mobile drawer toggle */}
          <button
            onClick={() => setDrawer(true)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-[0.94]"
            style={{ borderColor: C.rose + '33', color: C.charcoal, backgroundColor: 'rgba(255,255,255,0.6)' }}
            aria-label="Open menu"
          >
            <LuMenu size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}