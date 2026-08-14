import { LuCrown, LuMessageCircle, LuPhone, LuInstagram, LuFacebook, LuYoutube } from 'react-icons/lu';
import { C, WA_NUMBER, TEL_NUMBER, scrollToId } from '../../constants/theme';
import { NAV } from './Header'; 

const staticData = {
  brand: {
    name: "Rylo Parlour",
    tagline: "Luxury Beauty Atelier"
  },
  socials: [
    { label: 'Instagram', url: '#', icon: LuInstagram },
    { label: 'Facebook', url: '#', icon: LuFacebook },
    { label: 'YouTube', url: '#', icon: LuYoutube },
  ],
  services: [
    { id: 's1', name: 'Signature Balayage' },
    { id: 's2', name: 'HydraFacial Glow' },
    { id: 's3', name: 'Luxury Keratin' },
    { id: 's4', name: 'Gel Extensions' },
    { id: 's5', name: 'Bridal Packages' },
  ],
  hours: [
    { day: 'Mon - Sat', time: '10:00 AM - 8:00 PM' },
    { day: 'Sunday', time: '11:00 AM - 6:00 PM' }
  ]
};

export default function Footer({ bookService }) {
  return (
    <footer className="relative pt-12 pb-6 overflow-hidden border-t" style={{ backgroundColor: C.obsidian, borderColor: C.gold + '22' }}>
      {/* Subtle gold glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(600px 300px at 50% 100%, ${C.gold}14, transparent 70%)`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* COMPACT GRID: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* 1. Brand Bio */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundImage: `linear-gradient(135deg, ${C.rose}, ${C.gold})` }}>
                <LuCrown size={15} className="text-white" />
              </span>
              <div>
                <span className="block font-[Playfair_Display] text-[16px] font-bold leading-tight" style={{ color: '#F5EFE6' }}>
                  {staticData.brand.name}
                </span>
                <span className="block text-[8px] font-semibold tracking-[0.2em] uppercase" style={{ color: C.gold }}>
                  {staticData.brand.tagline}
                </span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed mb-5 pr-4" style={{ color: '#A99F95' }}>
              A luxury beauty and wellness atelier built on certified expertise and unhurried, personalised care.
            </p>
            <div className="flex gap-2">
              {staticData.socials.map((s, i) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-[1.1] active:scale-[0.94]"
                    style={{ borderColor: C.gold + '33', color: C.gold, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    aria-label={s.label}
                  >
                    <SIcon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: C.gold }}>Quick Links</h4>
            <ul className="space-y-2">
              {NAV.slice(0, 5).map(n => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    className="text-[11.5px] transition-all duration-200 hover:translate-x-0.5"
                    style={{ color: '#A99F95' }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.roseLight; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#A99F95'; }}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services List */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: C.gold }}>Our Services</h4>
            <ul className="space-y-2">
              {staticData.services.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => bookService && bookService(s.name)}
                    className="text-left text-[11.5px] transition-all duration-200 hover:translate-x-0.5"
                    style={{ color: '#A99F95' }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.roseLight; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#A99F95'; }}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Hours & Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: C.gold }}>Opening Hours</h4>
            <ul className="space-y-2 mb-5">
              {staticData.hours.map((h, i) => (
                <li key={i} className="flex justify-between items-center text-[11px] border-b pb-1.5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="font-semibold" style={{ color: '#C4BBB1' }}>{h.day}</span>
                  <span style={{ color: C.gold }}>{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 text-[10.5px]" style={{ color: '#7D746B' }}>
              <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span>&bull;</span>
              <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
            </div>
          </div>
        </div>

        {/* Footer CTA & Copyright strip */}
        <div className="mt-10 pt-5 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: C.gold + '26' }}>
          <p className="text-[10px] text-center md:text-left" style={{ color: '#7D746B' }}>
            &copy; {new Date().getFullYear()} {staticData.brand.name}. All Rights Reserved.
          </p>
          
          {/* Sleeker buttons */}
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <LuMessageCircle size={12} /> WhatsApp
            </a>
            <a
              href={`tel:${TEL_NUMBER}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ borderColor: C.gold + '4D', color: C.gold, backgroundColor: 'rgba(255,255,255,0.04)' }}
            >
              <LuPhone size={12} /> Call Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}