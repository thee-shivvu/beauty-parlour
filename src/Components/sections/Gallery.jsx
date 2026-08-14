import  { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { LuImage as LuImageIcon, LuMoveHorizontal, LuX, LuChevronLeft, LuChevronRight, LuSparkles, LuCalendar } from 'react-icons/lu';
import { C, scrollToId } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, EmptyState, LuxImage } from '../UI/Primitives';
import gallery1 from "../../assets/images/gallery1.png";
import gallery2 from "../../assets/images/gallery2.png";
import gallery3 from "../../assets/images/gallery3.png";
import gallery4 from "../../assets/images/gallery4.png";
import gallery5 from "../../assets/images/gallery5.png";
import gallery6 from "../../assets/images/gallery6.png";
import gallery7 from "../../assets/images/gallery7.png";
import gallery5Reverse from "../../assets/images/gallery5_Reverse.png";
import About1 from "../../assets/images/about1.png";





// Inline Data: Lookbook & Before/After
const galleryData = [
  { 
    id: 'g1', 
    title: 'Ash Blonde Balayage', 
    category: 'Hair', 
    service_name: 'Signature Balayage', 
    image_url: gallery1, 
    is_before_after: 0 
  },
  { 
    id: 'g2', 
    title: 'Keratin Smoothing', 
    category: 'Hair', 
    service_name: 'Luxury Keratin Treatment', 
    image_url: gallery2, 
    is_before_after: 0, 
  },
  { 
    id: 'g3', 
    title: 'Minimalist Gel Art', 
    category: 'Nails', 
    service_name: 'Gel Extensions & Art', 
    image_url: gallery3, 
    is_before_after: 0 
  },
  { 
    id: 'g4', 
    title: 'Bridal Soft Glam', 
    category: 'Makeup', 
    service_name: 'HD Bridal Makeup', 
    image_url: gallery4, 
    is_before_after: 0 
  },
  { 
    id: 'g5', 
    title: 'Hydra-Glow Facial', 
    category: 'Skin', 
    service_name: 'Deep Cleansing Facial', 
    image_url: gallery6, 
    is_before_after: 0,  
  },
  { 
    id: 'g6', 
    title: 'French Chrome Manicure', 
    category: 'Nails', 
    service_name: 'Luxury Spa Manicure', 
    image_url: About1, 
    is_before_after: 0 
  },
  { 
    id: 'g7', 
    title: 'French Chrome Manicure', 
    category: 'Nails', 
    service_name: 'Luxury Spa Manicure', 
    image_url: gallery7, 
    is_before_after: 0 
  },
   { 
    id: 'g8', 
    title: 'Copper Red Transformation', 
    category: 'Hair', 
    service_name: 'Global Hair Color', 
    image_url: gallery5, 
    is_before_after: 1, 
    before_url: gallery5Reverse, 
    after_url: gallery5, 
    client_note: 'Shifted from washed-out brown to a rich, glossy copper tone.' 
  },

];

export default function GallerySection({ bookService }) {
  const [galleryCat, setGalleryCat] = useState('All');
  const [lightbox, setLightbox] = useState(null); // the gallery item currently previewed

  /* Before/after comparison slider state */
  const [compare, setCompare] = useState(50);
  const compareRef = useRef(null);
  const dragging = useRef(false);

  // Extract unique categories
  const galleryCats = useMemo(() => {
    const set = [];
    galleryData.forEach(g => { if (g.category && set.indexOf(g.category) === -1) set.push(g.category); });
    return ['All'].concat(set);
  }, []);

  const galleryFiltered = useMemo(() => {
    if (galleryCat === 'All') return galleryData;
    return galleryData.filter(g => g.category === galleryCat);
  }, [galleryCat]);

  const beforeAfter = useMemo(() => galleryData.find(g => Number(g.is_before_after) === 1) || null, []);

  /* Lightbox Keyboard Navigation & Scroll Lock */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = e => {
      if (e.key === 'Escape') { setLightbox(null); return; }
      const list = galleryFiltered;
      if (!list.length) return;
      const cur = list.findIndex(g => g.id === lightbox.id);
      if (e.key === 'ArrowRight') setLightbox(list[(cur + 1 + list.length) % list.length]);
      if (e.key === 'ArrowLeft') setLightbox(list[(cur - 1 + list.length) % list.length]);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, galleryFiltered]);

  /* Before/after drag logic */
  const updateCompare = useCallback(clientX => {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setCompare(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const move = e => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      updateCompare(x);
    };
    const up = () => { dragging.current = false; };
    
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', up);
    
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [updateCompare]);

  return (
    <section id="gallery" className="relative py-16 md:py-24" style={{ backgroundColor: C.nude }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>The Lookbook</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Gallery & Real Transformations</SectionTitle></Reveal>
        <Reveal delay={120}><SectionSub>Every image is real work from our chairs. Tap any photograph to view it full screen.</SectionSub></Reveal>

        {/* Filter tabs */}
        <Reveal delay={160}>
          <div className="flex justify-center mt-9 mb-8 overflow-x-auto pb-1">
            <div className="flex gap-1 p-1 rounded-full border backdrop-blur-md w-max"
              style={{ borderColor: C.rose + '26', backgroundColor: 'rgba(255,255,255,0.66)' }}>
              {galleryCats.map(cat => {
                const active = galleryCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setGalleryCat(cat)}
                    className="px-4 py-2 rounded-full text-[11.5px] font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.97]"
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

        {/* Photo grid */}
        {galleryFiltered.length === 0 ? (
          <EmptyState icon={LuImageIcon} text="No photographs in this category yet." />
        ) : (
          <div key={galleryCat} className="grid grid-cols-2 lg:grid-cols-4 gap-3.5" style={{ animation: 'fadeIn 300ms ease-out' }}>
            {galleryFiltered.map((g, i) => (
              <Reveal key={g.id} delay={Math.min(i, 8) * 55}>
                <button
                  onClick={() => setLightbox(g)}
                  className="group relative block w-full rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
                  style={{ borderColor: C.rose + '26' }}
                >
                  <LuxImage
                    src={g.image_url}
                    alt={g.title}
                    className="h-[190px] sm:h-[230px] lg:h-[260px] w-full"
                    imgClass="transition-transform duration-300 group-hover:scale-[1.09]"
                  />
                  {/* Gradient caption veil */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundImage: 'linear-gradient(to top, rgba(18,18,18,0.86) 0%, rgba(18,18,18,0.15) 48%, transparent 78%)' }} />
                  
                  <span className="absolute bottom-0 left-0 right-0 p-3.5 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="block text-[12px] font-bold text-white leading-snug">{g.title}</span>
                    <span className="block text-[9.5px] mt-0.5" style={{ color: C.roseLight }}>{g.service_name}</span>
                  </span>
                  
                  {Number(g.is_before_after) === 1 && (
                    <span className="absolute top-2.5 left-2.5 text-[8.5px] font-bold uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-md border"
                      style={{ color: C.gold, borderColor: C.gold + '66', backgroundColor: 'rgba(18,18,18,0.6)' }}>
                      Before / After
                    </span>
                  )}
                </button>
              </Reveal>
            ))}
          </div>
        )}

        {/* Draggable Before & After comparison slider */}
        {beforeAfter && (
          <Reveal delay={120}>
            <div className="mt-14">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md"
                  style={{ borderColor: C.gold + '4D', backgroundColor: 'rgba(255,255,255,0.7)' }}>
                  <LuMoveHorizontal size={12} style={{ color: C.gold }} />
                  <span className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: C.earth }}>
                    Drag to reveal the transformation
                  </span>
                </span>
              </div>

              <div className="max-w-3xl mx-auto">
                <div
                  ref={compareRef}
                  className="relative rounded-[26px] overflow-hidden border-2 select-none cursor-ew-resize h-[340px] sm:h-[440px] md:h-[520px]"
                  style={{ borderColor: C.gold + '55' }}
                  onMouseDown={e => { dragging.current = true; updateCompare(e.clientX); }}
                  onTouchStart={e => { dragging.current = true; updateCompare(e.touches[0].clientX); }}
                >
                  {/* AFTER (base layer) */}
                  <img src={beforeAfter.after_url} alt="After treatment"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
                  
                  {/* BEFORE (clipped overlay) */}
                  <img src={beforeAfter.before_url} alt="Before treatment"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false}
                    style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }} />

                  {/* Labels */}
                  <span className="absolute top-3.5 left-3.5 text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border pointer-events-none"
                    style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(18,18,18,0.55)' }}>
                    Before
                  </span>
                  <span className="absolute top-3.5 right-3.5 text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border pointer-events-none"
                    style={{ color: C.obsidian, borderColor: C.gold, backgroundColor: C.gold + 'E6' }}>
                    After
                  </span>

                  {/* Drag handle */}
                  <span className="absolute top-0 bottom-0 pointer-events-none" style={{ left: compare + '%', transform: 'translateX(-50%)' }}>
                    <span className="block w-0.5 h-full" style={{ backgroundColor: C.gold, boxShadow: `0 0 14px ${C.gold}` }} />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border-2"
                      style={{ backgroundColor: 'rgba(253,251,247,0.95)', borderColor: C.gold, boxShadow: '0 4px 18px rgba(0,0,0,0.28)' }}>
                      <LuMoveHorizontal size={17} style={{ color: C.rose }} />
                    </span>
                  </span>
                </div>

                <div className="text-center mt-5">
                  <h3 className="font-[Playfair_Display] text-[18px] font-semibold" style={{ color: C.charcoal }}>
                    {beforeAfter.title}
                  </h3>
                  <p className="text-[12px] mt-1.5 max-w-lg mx-auto leading-relaxed" style={{ color: C.earth }}>
                    {beforeAfter.client_note}
                  </p>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider mt-2.5" style={{ color: C.rose }}>
                    {beforeAfter.service_name}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* ==================== GALLERY LIGHTBOX MODAL =================== */}
      {lightbox && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(18,18,18,0.92)', backdropFilter: 'blur(8px)', animation: 'fadeIn 200ms ease-out' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-[1.08] active:scale-[0.94] z-10"
            style={{ borderColor: C.gold + '4D', color: C.gold, backgroundColor: 'rgba(255,255,255,0.06)' }}
            aria-label="Close preview"
          >
            <LuX size={19} />
          </button>

          {/* Prev / next */}
          {galleryFiltered.length > 1 && (
            <div className="contents">
              <button
                onClick={e => {
                  e.stopPropagation();
                  const cur = galleryFiltered.findIndex(g => g.id === lightbox.id);
                  setLightbox(galleryFiltered[(cur - 1 + galleryFiltered.length) % galleryFiltered.length]);
                }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-[1.08] active:scale-[0.94] z-10"
                style={{ borderColor: C.gold + '4D', color: C.gold, backgroundColor: 'rgba(255,255,255,0.06)' }}
              >
                <LuChevronLeft size={20} />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  const cur = galleryFiltered.findIndex(g => g.id === lightbox.id);
                  setLightbox(galleryFiltered[(cur + 1) % galleryFiltered.length]);
                }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-[1.08] active:scale-[0.94] z-10"
                style={{ borderColor: C.gold + '4D', color: C.gold, backgroundColor: 'rgba(255,255,255,0.06)' }}
              >
                <LuChevronRight size={20} />
              </button>
            </div>
          )}

          <div
            className="relative w-full max-w-3xl rounded-[26px] overflow-hidden border"
            style={{ borderColor: C.gold + '4D', animation: 'scaleIn 260ms ease-out' }}
            onClick={e => e.stopPropagation()}
          >
            <LuxImage src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[62vh]" imgClass="!object-contain" />
            <div className="p-5 md:p-6" style={{ backgroundColor: C.obsidian }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[8.5px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border"
                    style={{ color: C.gold, borderColor: C.gold + '4D', backgroundColor: C.gold + '14' }}>
                    {lightbox.category}
                  </span>
                  <h3 className="font-[Playfair_Display] text-[19px] md:text-[23px] font-semibold mt-2.5" style={{ color: '#F5EFE6' }}>
                    {lightbox.title}
                  </h3>
                  <p className="text-[11.5px] mt-1.5 leading-relaxed max-w-lg" style={{ color: '#A99F95' }}>
                    {lightbox.client_note}
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider mt-3" style={{ color: C.roseLight }}>
                    <LuSparkles size={11} /> {lightbox.service_name}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setLightbox(null);
                    if (bookService) bookService(lightbox.service_name);
                    else setTimeout(() => scrollToId('booking'), 60);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold shrink-0 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                  style={{ backgroundImage: `linear-gradient(100deg, ${C.gold}, ${C.roseLight})`, color: C.obsidian }}
                >
                  <LuCalendar size={13} /> Book This Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}