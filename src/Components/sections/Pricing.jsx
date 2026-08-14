import { useState, useMemo } from 'react';
import { 
  LuScissors, LuSparkles, LuWind, LuHand, LuDroplets, LuClock, 
  LuArrowRight, LuTag, LuCrown, LuFlame, LuFlower2, LuHeart, 
  LuSun, LuSparkle, LuWaves 
} from 'react-icons/lu';
import { C, inr, dur } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, EmptyState } from '../UI/Primitives';

// Inline Data: Full Service Menu
const servicesData = [
  { id: 's1', name: 'Signature Balayage', category: 'Hair', price_inr: 4500, duration_mins: 120, summary: 'Hand-painted highlights for a natural, sun-kissed luxury look.', icon: LuScissors },
  { id: 's2', name: 'HydraFacial Glow', category: 'Skin', price_inr: 3000, duration_mins: 60, summary: 'Deep cleansing, exfoliation, and hydration for instant radiance.', icon: LuSparkles },
  { id: 's3', name: 'Luxury Keratin Treatment', category: 'Hair', price_inr: 5000, duration_mins: 180, summary: 'Frizz-free, smooth, and manageable hair lasting up to 3 months.', icon: LuWind },
  { id: 's4', name: 'Gel Extensions & Art', category: 'Nails', price_inr: 1500, duration_mins: 90, summary: 'Sculpted gel extensions with custom minimalist or luxury nail art.', icon: LuHand },
  { id: 's5', name: 'Organic Spa Pedicure', category: 'Body', price_inr: 1200, duration_mins: 45, summary: 'A relaxing foot ritual with organic scrubs and deep massage.', icon: LuDroplets },
  { id: 's6', name: 'Royal HD Bridal Makeup', category: 'Bridal', price_inr: 15000, duration_mins: 180, summary: 'Complete high-definition bridal look with premium lashes and saree draping.', icon: LuCrown },
  { id: 's7', name: 'Full Body Rica Waxing', category: 'Waxing', price_inr: 2500, duration_mins: 75, summary: 'Gentle lipo-soluble wax for smooth, hair-free skin with minimal irritation.', icon: LuFlame },
  { id: 's8', name: 'Aromatherapy Full Body Spa', category: 'Spa', price_inr: 3500, duration_mins: 90, summary: 'Deep relaxation massage using therapeutic botanical essential oils.', icon: LuFlower2 },
  { id: 's9', name: 'Pre-Bridal Glow Ritual', category: 'Bridal', price_inr: 8500, duration_mins: 240, summary: 'Comprehensive multi-session skin brightening, body polish, and hair spa.', icon: LuHeart },
  { id: 's10', name: 'Hot Stone Therapy Spa', category: 'Spa', price_inr: 4000, duration_mins: 90, summary: 'Warm basalt stones applied to key points to melt away muscle tension.', icon: LuSun },
  { id: 's11', name: 'Brazilian Bikini Waxing', category: 'Waxing', price_inr: 1800, duration_mins: 30, summary: 'Hygienic and precise peel-off wax for sensitive intimate areas.', icon: LuSparkle },
  { id: 's12', name: 'Detoxifying Body Wrap & Scrub', category: 'Spa', price_inr: 3200, duration_mins: 60, summary: 'Full body exfoliation followed by a nutrient-rich clay detox wrap.', icon: LuWaves }
];

// Rotating accent colours for cards
const ACCENTS = [C.rose, C.gold, C.roseLight, C.earth];
function accentAt(i) { return ACCENTS[i % ACCENTS.length]; }

export default function PricingSection({ highlight, bookService }) {
  const [priceCat, setPriceCat] = useState('All');

  // Extract unique categories dynamically
  const priceCats = useMemo(() => {
    const set = [];
    servicesData.forEach(s => { 
      if (s.category && set.indexOf(s.category) === -1) set.push(s.category); 
    });
    return ['All'].concat(set);
  }, []);

  // Filter services based on selected category
  const pricedServices = useMemo(() => {
    if (priceCat === 'All') return servicesData;
    return servicesData.filter(s => s.category === priceCat);
  }, [priceCat]);

  return (
    <section id="pricing" className="relative py-16 md:py-24" style={{ backgroundColor: C.nude }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Transparent Pricing</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Service Menu & Pricing</SectionTitle></Reveal>
        <Reveal delay={120}>
          <SectionSub>Published prices, honest durations, no hidden add-ons. Tap any treatment to pre-fill the booking form.</SectionSub>
        </Reveal>

        {/* Category filter tabs */}
        <Reveal delay={160}>
          <div className="flex justify-center mt-9 mb-8 overflow-x-auto pb-1">
            <div className="flex gap-1 p-1 rounded-full border backdrop-blur-md w-max"
              style={{ borderColor: C.rose + '26', backgroundColor: 'rgba(255,255,255,0.66)' }}>
              {priceCats.map(cat => {
                const active = priceCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setPriceCat(cat)}
                    className="px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.97]"
                    style={active
                      ? { backgroundImage: `linear-gradient(100deg, ${C.rose}, ${C.gold})`, color: '#fff', boxShadow: `0 4px 14px ${C.rose}3D` }
                      : { color: C.earth }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Pricing list */}
        {pricedServices.length === 0 ? (
          <EmptyState icon={LuTag} text="No treatments in this category yet." />
        ) : (
          <div key={priceCat} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ animation: 'fadeIn 300ms ease-out' }}>
            {pricedServices.map((s, i) => {
              const Icon = s.icon;
              const a = accentAt(i);
              const isHot = highlight === s.id;
              
              return (
                <Reveal key={s.id} delay={Math.min(i, 8) * 45}>
                  <div
                    className="group h-full rounded-2xl border p-4 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      borderColor: isHot ? C.gold : C.rose + '1F',
                      backgroundColor: 'rgba(255,255,255,0.78)',
                      boxShadow: isHot ? `0 0 0 3px ${C.gold}33` : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-[1.08]"
                        style={{ backgroundColor: a + '1A' }}>
                        <Icon size={16} style={{ color: a }} />
                      </span>
                      <span className="font-[Playfair_Display] text-[17px] font-bold shrink-0" style={{ color: C.rose }}>
                        {inr(s.price_inr)}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="min-w-0 mb-2">
                        <h3 className="font-[Playfair_Display] text-[14.5px] font-semibold leading-snug" style={{ color: C.charcoal }}>
                          {s.name}
                        </h3>
                        <span className="inline-block text-[8.5px] font-bold uppercase tracking-[0.14em] mt-1 px-2 py-0.5 rounded-full border"
                          style={{ color: a, borderColor: a + '3D', backgroundColor: a + '12' }}>
                          {s.category}
                        </span>
                      </div>
                      
                      <p className="text-[11px] leading-relaxed flex-1" style={{ color: C.earth }}>{s.summary}</p>
                      
                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t" style={{ borderColor: C.rose + '1A' }}>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold" style={{ color: C.earth }}>
                          <LuClock size={10} style={{ color: C.gold }} /> {dur(s.duration_mins)}
                        </span>
                        <button
                          onClick={() => bookService && bookService(s.name)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                          style={{ borderColor: C.rose + '3D', color: C.rose, backgroundColor: C.rose + '0F' }}
                        >
                          Book <LuArrowRight size={10} />
                        </button>
                      </div>
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