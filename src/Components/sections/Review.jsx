import  { useState, useEffect } from 'react';
import { LuQuote, LuBadgeCheck, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { C } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, EmptyState, LuxImage, Stars } from '../UI/Primitives';

// Inline Data: Client Testimonials
const reviewsData = [
  { 
    id: 'r1', 
    client_name: 'Priya Desai', 
    service: 'Signature Balayage', 
    rating: 5, 
    review_text: 'Absolutely in love with my hair! Aanya understood exactly what I wanted. The ambiance of the salon is so relaxing. Highly recommend.', 
    transformation_quote: 'They literally brought my hair back to life.', 
    is_verified: 1, 
    image_path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 'r2', 
    client_name: 'Sneha Kapoor', 
    service: 'Bridal HD Makeup', 
    rating: 5, 
    review_text: 'Riya made me look flawless on my wedding day. The makeup did not budge for 12 hours. Best decision ever!', 
    transformation_quote: 'Flawless from morning till night.', 
    is_verified: 1, 
    image_path: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 'r3', 
    client_name: 'Ananya Sharma', 
    service: 'Luxury Keratin Treatment', 
    rating: 5, 
    review_text: 'My hair went from frizzy and unmanageable to completely smooth and shiny. Monsoon humidity doesn\'t even touch it now!', 
    transformation_quote: 'Complete texture transformation from frizzy to liquid silk.', 
    is_verified: 1, 
    image_path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 'r4', 
    client_name: 'Meera Mehta', 
    service: 'Deep Cleansing Facial', 
    rating: 5, 
    review_text: 'The Hydra-Glow treatment gave me instant radiance before my event. Clean, serene environment and expert skin advice.', 
    transformation_quote: 'Restored my natural skin glow in just one session.', 
    is_verified: 1, 
    image_path: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 'r5', 
    client_name: 'Kavya Verma', 
    service: 'Global Hair Color', 
    rating: 5, 
    review_text: 'Switched to a copper shade and I get compliments everywhere I go. The colorist preserved my hair health completely.', 
    transformation_quote: 'A bold new color with zero hair damage.', 
    is_verified: 1, 
    image_path: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 'r6', 
    client_name: 'Rhea Nambiar', 
    service: 'Eyebrow Architecture', 
    rating: 5, 
    review_text: 'Microblading saved me 15 minutes of makeup time every morning. The symmetry and hair strokes look completely natural.', 
    transformation_quote: 'Perfectly sculpted brows without daily hassle.', 
    is_verified: 1, 
    image_path: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200' 
  }
];

export default function ReviewsSection() {
  const [reviewIdx, setReviewIdx] = useState(0);

  /* Testimonial autoplay */
  useEffect(() => {
    if (reviewsData.length < 2) return;
    const id = setInterval(() => setReviewIdx(i => (i + 1) % reviewsData.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="reviews" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(700px 380px at 80% 10%, ${C.gold}26, transparent 60%)`,
      }} />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Real Transformations</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>What Our Clients Say</SectionTitle></Reveal>
        <Reveal delay={120}><SectionSub>Unedited words from women who sat in our chairs.</SectionSub></Reveal>

        {reviewsData.length === 0 ? (
          <EmptyState icon={LuQuote} text="Client testimonials are on their way." />
        ) : (
          <div className="mt-12">
            {/* Featured slider */}
            <Reveal>
              <div className="max-w-3xl mx-auto">
                {(() => {
                  const r = reviewsData[reviewIdx % reviewsData.length] || {};
                  return (
                    <div
                      key={reviewIdx}
                      className="relative rounded-[26px] border p-7 md:p-10 text-center"
                      style={{ borderColor: C.gold + '3D', backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(10px)', animation: 'fadeIn 300ms ease-out', boxShadow: '0 12px 40px rgba(183,110,121,0.1)' }}
                    >
                      <LuQuote size={30} className="mx-auto mb-4 opacity-25" style={{ color: C.rose }} />
                      <p className="font-[Playfair_Display] text-[18px] md:text-[23px] font-semibold leading-snug mb-5" style={{ color: C.rose }}>
                        &ldquo;{r.transformation_quote}&rdquo;
                      </p>
                      <p className="text-[13px] md:text-[14px] leading-relaxed max-w-2xl mx-auto" style={{ color: C.earth }}>
                        {r.review_text}
                      </p>
                      <div className="flex items-center justify-center gap-3.5 mt-7">
                        <span className="w-14 h-14 rounded-full p-[2px] shrink-0"
                          style={{ backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.rose})` }}>
                          <LuxImage src={r.image_path} alt={r.client_name} className="w-full h-full rounded-full" />
                        </span>
                        <span className="text-left">
                          <span className="flex items-center gap-1.5">
                            <span className="text-[13.5px] font-bold" style={{ color: C.charcoal }}>{r.client_name}</span>
                            {Number(r.is_verified) === 1 && <LuBadgeCheck size={14} style={{ color: C.gold }} />}
                          </span>
                          <span className="block text-[10.5px] mt-0.5" style={{ color: C.earth }}>{r.service}</span>
                          <span className="mt-1 block"><Stars rating={r.rating} size={11} /></span>
                        </span>
                      </div>

                      {/* Slider arrows */}
                      {reviewsData.length > 1 && (
                        <div className="contents">
                          <button
                            onClick={() => setReviewIdx(i => (i - 1 + reviewsData.length) % reviewsData.length)}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-200 hover:scale-[1.08] active:scale-[0.94]"
                            style={{ borderColor: C.rose + '33', color: C.rose, backgroundColor: 'rgba(255,255,255,0.8)' }}
                            aria-label="Previous review"
                          >
                            <LuChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setReviewIdx(i => (i + 1) % reviewsData.length)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-200 hover:scale-[1.08] active:scale-[0.94]"
                            style={{ borderColor: C.rose + '33', color: C.rose, backgroundColor: 'rgba(255,255,255,0.8)' }}
                            aria-label="Next review"
                          >
                            <LuChevronRight size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Manual dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {reviewsData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIdx(i)}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: i === reviewIdx ? 26 : 8, height: 8,
                        backgroundColor: i === reviewIdx ? C.rose : C.rose + '3D',
                      }}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Supporting review grid */}
            {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {reviewsData.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 80}>
                  <button
                    onClick={() => setReviewIdx(i)}
                    className="group text-left w-full h-full rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]"
                    style={{
                      borderColor: i === reviewIdx ? C.gold + '66' : C.rose + '1F',
                      backgroundColor: 'rgba(255,255,255,0.66)', backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3.5">
                      <span className="w-10 h-10 rounded-full p-[1.5px] shrink-0"
                        style={{ backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.rose})` }}>
                        <LuxImage src={r.image_path} alt={r.client_name} className="w-full h-full rounded-full" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1">
                          <span className="text-[12.5px] font-bold truncate" style={{ color: C.charcoal }}>{r.client_name}</span>
                          {Number(r.is_verified) === 1 && <LuBadgeCheck size={12} style={{ color: C.gold }} />}
                        </span>
                        <span className="block text-[9.5px] truncate" style={{ color: C.earth }}>{r.service}</span>
                      </span>
                    </div>
                    <Stars rating={r.rating} size={11} />
                    <p className="text-[11.5px] leading-relaxed mt-2.5 line-clamp-4" style={{ color: C.earth }}>
                      {r.review_text}
                    </p>
                  </button>
                </Reveal>
              ))}
            </div> */}
          </div>
        )}
      </div>
    </section>
  );
}