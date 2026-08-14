
import { 
  LuCrown, LuSparkles, LuClock, LuMessageCircle, LuPhone,  LuHeart 
} from 'react-icons/lu';
import { FaRegCheckCircle } from "react-icons/fa";

import { C, inr, openWa, TEL_NUMBER } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, GhostButton, GoldButton } from '../UI/Primitives';

// Inline Data: Expanded Bridal Packages
const bridalMeta = {
  eyebrow: 'The Rylo Bridal Atelier',
  headline: 'Your Once-In-A-Lifetime Glow, Engineered Flawlessly',
  subtitle: 'Every detail of your beauty timeline, choreographed for perfection.',
};

const bridalPackages = [
  {
    title: 'The Classic Elegance',
    duration: '4 Hours',
    price: 15000,
    summary: 'Traditional, timeless elegance tailored specifically to enhance your natural features.',
    includes: ['HD Makeup', 'Classic Hair Do', 'Saree/Lehenga Draping', 'Basic Nail Art', 'Skin Prep'],
    icon: LuHeart
  },
  {
    title: 'The Signature Bridal Glow',
    duration: '6 Hours',
    price: 25000,
    summary: 'Our most popular luxury bridal experience featuring international HD & Airbrush techniques.',
    includes: ['HD Airbrush Makeup', 'Premium Hair Styling', 'Advanced Draping', 'Luxury Facial', 'Gel Extensions', 'Body Polishing'],
    icon: LuSparkles,
    popular: true
  },
  {
    title: 'The Royal Bridal Journey',
    duration: '2 Days',
    price: 45000,
    summary: 'The ultimate VIP package including complete pre-bridal prep and day-of styling.',
    includes: ['Pre-Bridal Spa & Polish', 'HD Airbrush Makeup', 'Premium Hair Styling', 'Bridal Mehendi Prep', 'Luxury Nail Art', 'Priority Booking'],
    icon: LuCrown
  }
];

const brandName = "Rylo Parlour";

export default function BridalSection() {
  return (
    <section id="bridal" className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: C.pearl }}>
      {/* Soft elegant ambient glows for light theme */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          `radial-gradient(760px 420px at 15% 12%, ${C.roseLight}22, transparent 62%),` +
          `radial-gradient(680px 380px at 88% 82%, ${C.gold}1A, transparent 60%)`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Removed "dark" prop so it uses standard beautiful rose/gold text */}
        <Reveal><Eyebrow>{bridalMeta.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>{bridalMeta.headline}</SectionTitle></Reveal>
        <Reveal delay={120}><SectionSub>{bridalMeta.subtitle}</SectionSub></Reveal>

        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          {bridalPackages.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div
                  className="group relative h-full rounded-[24px] border p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    borderColor: p.popular ? C.gold : C.rose + '2B',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: p.popular ? `0 10px 40px ${C.gold}1A` : `0 10px 30px rgba(183,110,121,0.05)`
                  }}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full text-[9px] font-bold uppercase tracking-widest border"
                      style={{ color: C.gold, borderColor: C.gold }}>
                      Most Popular
                    </span>
                  )}

                  <span className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-[1.08] shadow-sm"
                    style={{ backgroundColor: p.popular ? C.gold + '1A' : C.rose + '14' }}>
                    <Icon size={22} style={{ color: p.popular ? C.gold : C.rose }} />
                  </span>

                  <h3 className="font-[Playfair_Display] text-[19px] font-bold leading-snug mb-2" style={{ color: C.charcoal }}>
                    {p.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-[Playfair_Display] text-[22px] font-bold" style={{ color: p.popular ? C.gold : C.rose }}>
                      {inr(p.price)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border" 
                      style={{ color: C.earth, borderColor: C.earth + '33', backgroundColor: C.earth + '0A' }}>
                      <LuClock size={12} style={{ color: C.earth }} /> {p.duration}
                    </span>
                  </div>

                  <p className="text-[12.5px] leading-relaxed mb-6" style={{ color: C.earth }}>{p.summary}</p>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {p.includes.map((inc, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-[11.5px] leading-snug font-medium" style={{ color: C.charcoal }}>
                        <FaRegCheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: p.popular ? C.gold : C.rose }} /> {inc}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openWa(`Hello ${brandName}! I am interested in the "${p.title}" bridal package (${inr(p.price)}).\n\nPlease share the details and available consultation slots. Thank you!`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={p.popular 
                      ? { backgroundImage: `linear-gradient(100deg, ${C.rose}, ${C.gold})`, color: '#fff', border: 'none', boxShadow: `0 6px 20px ${C.rose}33` }
                      : { borderColor: C.rose + '4D', color: C.rose, backgroundColor: C.rose + '0A' }
                    }
                  >
                    <LuMessageCircle size={14} /> Enquire Now
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bridal consultation CTA */}
        <Reveal delay={160}>
          <div
            className="mt-14 rounded-[26px] border p-8 md:p-12 text-center relative overflow-hidden"
            style={{ borderColor: C.rose + '3D', backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)' }}
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${C.roseLight}1A, transparent 70%)`}} />
            
            <div className="relative z-10">
              <LuCrown size={30} className="mx-auto mb-5 transition-transform duration-500 hover:scale-110" style={{ color: C.gold }} />
              <h3 className="font-[Playfair_Display] text-[24px] md:text-[32px] font-bold leading-tight" style={{ color: C.charcoal }}>
                Bridal dates fill months in advance
              </h3>
              <p className="text-[13.5px] md:text-[14.5px] max-w-2xl mx-auto mt-4 leading-relaxed" style={{ color: C.earth }}>
                Book a private consultation and we will build your complete beauty timeline — pre-bridal
                skin prep, trial makeup, and the on-day schedule for you and your party.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <GoldButton 
                  onClick={() => openWa(`Hello ${brandName}! I would like to schedule a BRIDAL CONSULTATION.\n\nMy wedding date is: \nServices I am considering: \n\nPlease let me know your available consultation slots. Thank you!`)}
                  icon={LuMessageCircle}
                >
                  Schedule Bridal Consultation
                </GoldButton>
                
                <GhostButton href={`tel:${TEL_NUMBER}`} icon={LuPhone}>
                  Call The Bridal Desk
                </GhostButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}