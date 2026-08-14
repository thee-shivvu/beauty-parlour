import { LuScissors, LuSparkles, LuWind, LuHand, LuArrowRight, LuCrown, LuSparkle, LuSmile, LuFlower } from 'react-icons/lu';
import { C, inr } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, EmptyState } from '../UI/Primitives';

// Inline data for Featured Services
const featuredServices = [
  { 
    id: 's1', 
    name: 'Signature Balayage', 
    price_inr: 4500, 
    featured_desc: 'Custom hand-painted highlights by our master colorists.', 
    icon: LuScissors 
  },
  { 
    id: 's2', 
    name: 'HydraFacial Glow', 
    price_inr: 3000, 
    featured_desc: 'Medical-grade resurfacing for an instant red-carpet glow.', 
    icon: LuSparkles 
  },
  { 
    id: 's3', 
    name: 'Luxury Keratin Treatment', 
    price_inr: 5000, 
    featured_desc: 'Restore protein and eliminate frizz with our premium keratin blend.', 
    icon: LuWind 
  },
  { 
    id: 's4', 
    name: 'Gel Extensions & Art', 
    price_inr: 1500, 
    featured_desc: 'Flawless gel sculpting with intricate custom artistry.', 
    icon: LuHand 
  },
  { 
    id: 's5', 
    name: 'HD Bridal Makeup', 
    price_inr: 12000, 
    featured_desc: 'Long-lasting high-definition glam tailored for your special day.', 
    icon: LuCrown 
  },
  { 
    id: 's6', 
    name: 'Eyebrow Microblading', 
    price_inr: 6500, 
    featured_desc: 'Semi-permanent hair stroke tattooing for perfectly shaped brows.', 
    icon: LuSparkle 
  },
  { 
    id: 's7', 
    name: 'Clinical Acne Facial', 
    price_inr: 3500, 
    featured_desc: 'Targeted deep-pore cleansing to soothe redness and clear breakouts.', 
    icon: LuSmile 
  },
  { 
    id: 's8', 
    name: 'Aromatherapy Foot Spa', 
    price_inr: 1800, 
    featured_desc: 'Soothing organic essential oils paired with a relaxing pedicure.', 
    icon: LuFlower 
  }
];

// Rotating accent colours so cards never look monotonous
const ACCENTS = [C.rose, C.gold, C.roseLight, C.earth];
function accentAt(i) { return ACCENTS[i % ACCENTS.length]; }

export default function ServicesSection({ viewPrice }) {
  return (
    <section id="services" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(720px 400px at 85% 0%, ${C.roseLight}33, transparent 60%)`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Signature Treatments</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Our Services</SectionTitle></Reveal>
        <Reveal delay={120}>
          <SectionSub>
            Ten signature disciplines, each performed by a dedicated specialist using professional-grade,
            cruelty-free products.
          </SectionSub>
        </Reveal>

        {featuredServices.length === 0 ? (
          <EmptyState icon={LuSparkles} text="Service list is being updated — please check back shortly." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {featuredServices.map((s, i) => {
              const Icon = s.icon;
              const a = accentAt(i);
              return (
                <Reveal key={s.id} delay={(i % 4) * 70}>
                  <div
                    className="group h-full rounded-2xl border p-5 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{ borderColor: C.rose + '1F', backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)' }}
                  >
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-[1.08]"
                      style={{ backgroundColor: a + '1A' }}
                    >
                      <Icon size={19} style={{ color: a }} />
                    </span>
                    <h3 className="font-[Playfair_Display] text-[16px] font-semibold leading-snug mb-2" style={{ color: C.charcoal }}>
                      {s.name}
                    </h3>
                    <p className="text-[11.5px] leading-relaxed flex-1" style={{ color: C.earth }}>
                      {s.featured_desc}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 pt-3.5 border-t" style={{ borderColor: C.rose + '1A' }}>
                      <span className="text-[13px] font-bold" style={{ color: C.rose }}>{inr(s.price_inr)}</span>
                      <button
                        onClick={() => viewPrice && viewPrice(s.id)}
                        className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider transition-all duration-200 hover:gap-2"
                        style={{ color: C.gold }}
                      >
                        View Details <LuArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}