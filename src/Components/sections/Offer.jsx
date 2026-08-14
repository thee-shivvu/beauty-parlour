import  { useState, useEffect } from 'react';
import { LuGift, LuTimer, LuMessageCircle } from 'react-icons/lu';
import { C, openWa } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, EmptyState } from '../UI/Primitives';

// Inline Data: Special Offers
const offersData = [
  { 
    id: 'o1', 
    title: 'The Weekend Glow Up', 
    description: 'Get a Signature Facial + Spa Pedicure at a special bundled price.', 
    terms: 'Valid only on Saturdays and Sundays. Prior booking mandatory.', 
    discount_label: '20% OFF', 
    badge: 'Weekend Special', 
    valid_till: new Date(Date.now() + 86400000 * 3).toISOString(), 
    accent_key: 'obsidian' 
  },
  { 
    id: 'o2', 
    title: 'Bridal Trial Session', 
    description: 'Book your bridal makeup trial and get the fee adjusted in final booking.', 
    terms: 'Subject to artist availability.', 
    discount_label: '100% Refundable', 
    badge: 'Brides to be', 
    valid_till: new Date(Date.now() + 86400000 * 15).toISOString(), 
    accent_key: 'rose' 
  },
  { 
    id: 'o3', 
    title: 'Hair Transformation Bundle', 
    description: 'Combine Signature Balayage with a complimentary Post-Color Keratin Hair Spa.', 
    terms: 'Applicable on shoulder-length hair and longer. Cannot combine with other codes.', 
    discount_label: 'SAVE ₹1,500', 
    badge: 'Best Seller', 
    valid_till: new Date(Date.now() + 86400000 * 7).toISOString(), 
    accent_key: 'amber' 
  },
  { 
    id: 'o4', 
    title: 'Full Body Waxing & Polish', 
    description: 'Book Full Body Rica Waxing and get a complimentary Lavender Detox Scrub.', 
    terms: 'Valid Monday through Thursday only. Prior appointment required.', 
    discount_label: 'FLAT 25% OFF', 
    badge: 'Weekday Exclusive', 
    valid_till: new Date(Date.now() + 86400000 * 10).toISOString(), 
    accent_key: 'emerald' 
  }
];

const brandName = "Rylo Parlour";

// Rotating accent colours
const ACCENTS = [C.rose, C.gold, C.roseLight, C.earth];
function accentAt(i) { return ACCENTS[i % ACCENTS.length]; }

export default function OffersSection() {
  // eslint-disable-next-line react-hooks/purity
  const [now, setNow] = useState(Date.now());

  /* Live countdown tick for the offers section */
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  /* Countdown formatter */
  function countdown(iso) {
    const end = new Date(iso).getTime();
    if (!Number.isFinite(end)) return null;
    const diff = end - now;
    if (diff <= 0) return { expired: true, text: 'Offer ended' };
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    return { 
      expired: false, 
      text: d > 0 ? `${d}d ${h}h ${m}m left` : `${h}h ${m}m ${s}s left` 
    };
  }

  return (
    <section id="offers" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(700px 380px at 10% 20%, ${C.gold}2B, transparent 62%)`,
      }} />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Limited Time</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Special Offers & Packages</SectionTitle></Reveal>
        <Reveal delay={120}><SectionSub>Curated bundles at member pricing. Claim any offer straight over WhatsApp.</SectionSub></Reveal>

        {offersData.length === 0 ? (
          <EmptyState icon={LuGift} text="New offers are being prepared — check back soon." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {offersData.map((o, i) => {
              const cd = countdown(o.valid_till);
              const a = accentAt(i);
              const dark = o.accent_key === 'obsidian';
              
              return (
                <Reveal key={o.id} delay={i * 80}>
                  <div
                    className="group relative h-full rounded-2xl border p-5 flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                    style={dark
                      ? { borderColor: C.gold + '4D', backgroundColor: C.obsidian }
                      : { borderColor: a + '2B', backgroundColor: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(8px)' }}
                  >
                    {/* Shimmer sweep on hover */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                      style={{ backgroundImage: `linear-gradient(105deg, transparent 30%, ${C.gold}26 50%, transparent 70%)`, backgroundSize: '220% 100%', animation: 'shimmer 1.4s linear infinite' }} />

                    <div className="relative flex items-start justify-between mb-3.5">
                      <span className="text-[8.5px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border"
                        style={{ color: dark ? C.gold : a, borderColor: (dark ? C.gold : a) + '4D', backgroundColor: (dark ? C.gold : a) + '14' }}>
                        {o.badge}
                      </span>
                      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: (dark ? C.gold : a) + '1A' }}>
                        <LuGift size={14} style={{ color: dark ? C.gold : a }} />
                      </span>
                    </div>

                    <p className="relative font-[Playfair_Display] text-[24px] font-bold leading-none mb-2"
                      style={{ color: dark ? C.gold : C.rose }}>
                      {o.discount_label}
                    </p>
                    <h3 className="relative font-[Playfair_Display] text-[15px] font-semibold leading-snug mb-2"
                      style={{ color: dark ? '#F5EFE6' : C.charcoal }}>
                      {o.title}
                    </h3>
                    <p className="relative text-[11px] leading-relaxed flex-1" style={{ color: dark ? '#A99F95' : C.earth }}>
                      {o.description}
                    </p>

                    {/* Live countdown */}
                    {cd && (
                      <div className="relative inline-flex items-center gap-1.5 mt-3.5 px-2.5 py-1.5 rounded-full text-[9.5px] font-bold w-max"
                        style={{ backgroundColor: cd.expired ? C.earth + '1F' : C.gold + '1A', color: cd.expired ? C.earth : (dark ? C.gold : '#8A6D1F') }}>
                        <LuTimer size={10} className={cd.expired ? '' : 'animate-pulse'} /> {cd.text}
                      </div>
                    )}

                    <p className="relative text-[9px] leading-relaxed mt-2.5" style={{ color: dark ? '#7D746B' : C.earth + 'CC' }}>
                      {o.terms}
                    </p>

                    <button
                      onClick={() => openWa(
                        `Hello ${brandName}! I would like to claim the "${o.title}" offer (${o.discount_label}).\n\nPlease share the available slots and what the package includes. Thank you!`
                      )}
                      className="relative mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[11.5px] font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                      style={dark
                        ? { backgroundImage: `linear-gradient(100deg, ${C.gold}, ${C.roseLight})`, color: C.obsidian }
                        : { backgroundImage: `linear-gradient(100deg, ${C.rose}, ${C.gold})`, color: '#fff' }}
                    >
                      <LuMessageCircle size={13} /> Claim on WhatsApp
                    </button>
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