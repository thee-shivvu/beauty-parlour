import { LuSparkles, LuCalendar, LuArrowRight, LuShieldCheck } from 'react-icons/lu';
import { C, scrollToId } from '../../constants/theme';
import { Reveal, CountUp } from '../../hooks/useReveal';
import { GoldButton, GhostButton, LuxImage, Stars } from '../ui/Primitives';

const heroData = {
  eyebrow: "Rylo Parlour · Luxury Beauty Atelier",
  headline: "Unveil Your Inner Glow & Timeless Elegance",
  subtitle: "Premium organic products, certified specialists and a deeply relaxing ambiance.",
  heroBadge: "100% Hygienic & Certified",
  img: "https://media.istockphoto.com/id/1856117770/photo/modern-beauty-salon.jpg?s=612x612&w=0&k=20&c=dVZtsePk2pgbqDXwVkMm-yIw5imnZ2rnkAruR7zf8EA=",
  stats: [
    { value: 10, suffix: '+', label: 'Years Experience', decimals: 0 },
    { value: 15, suffix: 'k+', label: 'Happy Clients', decimals: 0 },
    { value: 4.9, suffix: '', label: 'Star Rating', decimals: 1 },
  ]
};

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-[68px] overflow-hidden">
      {/* Ambient radial lighting */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          `radial-gradient(900px 500px at 12% 8%, ${C.roseLight}55, transparent 62%),` +
          `radial-gradient(760px 460px at 88% 22%, ${C.gold}30, transparent 60%),` +
          `radial-gradient(680px 420px at 50% 100%, ${C.nude}cc, transparent 65%)`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          
          {/* Copy column */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md mb-6"
                style={{ borderColor: C.gold + '4D', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                <LuSparkles size={12} style={{ color: C.gold }} />
                <span className="text-[10.5px] font-semibold tracking-[0.16em] uppercase" style={{ color: C.earth }}>
                  {heroData.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-[Playfair_Display] font-semibold tracking-tight text-[36px] leading-[1.08] sm:text-[46px] md:text-[58px] lg:text-[62px]">
                <span style={{
                  backgroundImage: `linear-gradient(100deg, ${C.charcoal} 8%, ${C.rose} 48%, ${C.gold} 88%)`,
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                }}>
                  {heroData.headline}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 text-[14px] md:text-[16px] leading-relaxed max-w-xl" style={{ color: C.earth }}>
                {heroData.subtitle}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton onClick={() => scrollToId('booking')} icon={LuCalendar}>
                  Book an Appointment
                </GoldButton>
                <GhostButton onClick={() => scrollToId('services')} icon={LuArrowRight}>
                  Explore Services
                </GhostButton>
              </div>
            </Reveal>

            {/* Highlights counter bar */}
            <Reveal delay={320}>
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {heroData.stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border backdrop-blur-md px-3 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: C.rose + '26', backgroundColor: 'rgba(255,255,255,0.62)' }}
                  >
                    <p className="font-[Playfair_Display] text-[22px] md:text-[27px] font-bold leading-none" style={{ color: C.rose }}>
                      <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </p>
                    <p className="text-[9.5px] md:text-[10.5px] font-medium mt-2 tracking-wide uppercase" style={{ color: C.earth }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Visual column */}
          <Reveal delay={200} className="relative">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[32px] opacity-60 blur-xl"
                style={{ backgroundImage: `linear-gradient(135deg, ${C.roseLight}, ${C.gold}88)` }}
              />
              <LuxImage
                src={heroData.img}
                alt="Rylo Parlour luxury salon interior"
                className="relative rounded-[28px] border-2 h-[330px] sm:h-[420px] lg:h-[510px] w-full"
                imgClass="transition-transform duration-300 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 rounded-[28px] border-2 pointer-events-none" style={{ borderColor: C.gold + '55' }} />

              {/* Floating certified badge */}
              <div
                className="absolute -bottom-4 left-4 md:-left-5 flex items-center gap-2.5 px-4 py-3 rounded-2xl border backdrop-blur-md"
                style={{ borderColor: C.gold + '55', backgroundColor: 'rgba(253,251,247,0.9)', boxShadow: `0 10px 30px rgba(183,110,121,0.18)` }}
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: C.rose + '1A' }}>
                  <LuShieldCheck size={16} style={{ color: C.rose }} />
                </span>
                <span>
                  <span className="block text-[11.5px] font-bold" style={{ color: C.charcoal }}>{heroData.heroBadge}</span>
                  <span className="block text-[9.5px]" style={{ color: C.earth }}>Sanitised tools · every client</span>
                </span>
              </div>

              {/* Floating rating chip */}
              <div
                className="absolute -top-3 right-3 flex items-center gap-1.5 px-3.5 py-2 rounded-full border backdrop-blur-md"
                style={{ borderColor: C.gold + '55', backgroundColor: 'rgba(253,251,247,0.9)' }}
              >
                <Stars rating={5} size={11} />
                <span className="text-[10.5px] font-bold" style={{ color: C.charcoal }}>4.9</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}