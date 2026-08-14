import { LuUsers, LuDroplets, LuCrown, LuSprout, LuCalendar, LuPhone } from 'react-icons/lu';
import { C, TEL_NUMBER, scrollToId } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, LuxImage, GoldButton, GhostButton } from '../UI/Primitives';
import AboutImage from '../../assets/Images/About.png';

const aboutData = {
  img: AboutImage,
  story: [
    "Rylo Parlour is a luxury beauty atelier built around personalised, unhurried care.",
    "Every treatment is tailored to your unique skin and hair profile, ensuring lasting radiance rather than just a temporary fix. We believe beauty is a ritual, not a rush."
  ],
  pills: [
    { label: "Expert Stylists", icon: LuUsers },
    { label: "Custom Skincare", icon: LuDroplets },
    { label: "Luxury Ambiance", icon: LuCrown },
    { label: "Cruelty-Free Products", icon: LuSprout }
  ]
};

// Rotating accent colours so feature pills never look monotonous
const ACCENTS = [C.rose, C.gold, C.roseLight, C.earth];
function accentAt(i) { return ACCENTS[i % ACCENTS.length]; }

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-24" style={{ backgroundColor: C.nude }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Our Story</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Beauty As A Ritual, Never A Rush</SectionTitle></Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mt-12">
          {/* Visual Side with Medallion */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <LuxImage
                src={aboutData.img}
                alt="Rylo Parlour reception lounge"
                className="rounded-[26px] border h-[320px] md:h-[460px] w-full"
                imgClass="transition-transform duration-300 hover:scale-[1.04]"
              />
              <div className="absolute inset-0 rounded-[26px] border pointer-events-none" style={{ borderColor: C.gold + '4D' }} />
              
              {/* Experience medallion */}
              <div
                className="absolute -bottom-5 -right-2 md:right-6 w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 backdrop-blur-md"
                style={{ borderColor: C.gold + '66', backgroundColor: 'rgba(253,251,247,0.94)', boxShadow: '0 12px 32px rgba(183,110,121,0.2)' }}
              >
                <span className="font-[Playfair_Display] text-[24px] font-bold leading-none" style={{ color: C.rose }}>10+</span>
                <span className="text-[8.5px] font-semibold uppercase tracking-[0.14em] mt-1 text-center leading-tight" style={{ color: C.earth }}>
                  Years of<br />Artistry
                </span>
              </div>
            </div>
          </Reveal>

          {/* Story & Features Side */}
          <div className="order-1 lg:order-2">
            {aboutData.story.map((paragraph, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-[13.5px] md:text-[15px] leading-relaxed mb-4" style={{ color: i === 0 ? C.charcoal : C.earth }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {/* 4 key feature pills */}
            <Reveal delay={240}>
              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {aboutData.pills.map((pill, i) => {
                  const PillIcon = pill.icon;
                  const a = accentAt(i);
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-full border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: a + '33', backgroundColor: 'rgba(255,255,255,0.7)' }}
                    >
                      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: a + '1F' }}>
                        <PillIcon size={14} style={{ color: a }} />
                      </span>
                      <span className="text-[12.5px] font-semibold" style={{ color: C.charcoal }}>{pill.label}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={320}>
              <div className="flex flex-wrap gap-3 mt-8">
                <GoldButton onClick={() => scrollToId('booking')} icon={LuCalendar}>Reserve Your Ritual</GoldButton>
                <GhostButton href={`tel:${TEL_NUMBER}`} icon={LuPhone}>Speak To Us</GhostButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}