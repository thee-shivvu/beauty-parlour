import { LuUsers, LuMessageCircle } from 'react-icons/lu';
import { C, openWa } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, EmptyState, LuxImage } from '../UI/Primitives';

// Inline Data: Team Profiles
const teamData = [
  { 
    id: 't1', 
    name: 'Aanya Sharma', 
    role: 'Master Stylist', 
    experience: '8 YRS EXP', 
    specialties: 'Balayage, Color Correction, Keratin', 
    image_path: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 't2', 
    name: 'Riya Singh', 
    role: 'Head Makeup Artist', 
    experience: '6 YRS EXP', 
    specialties: 'Bridal HD, Airbrush, Editorial', 
    image_path: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 't3', 
    name: 'Dr. Meera Nambiar', 
    role: 'Senior Aesthetician & Skin Specialist', 
    experience: '10 YRS EXP', 
    specialties: 'HydraFacial, Clinical Acne, Brow Microblading', 
    image_path: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 't4', 
    name: 'Pooja Verma', 
    role: 'Nail Artist & Spa Therapist', 
    experience: '5 YRS EXP', 
    specialties: 'Gel Extensions, Chrome Art, Aromatherapy Massage', 
    image_path: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400' 
  }
];

const brandName = "Rylo Parlour";

// Rotating accent colours
const ACCENTS = [C.rose, C.gold, C.roseLight, C.earth];
function accentAt(i) { return ACCENTS[i % ACCENTS.length]; }

export default function TeamSection() {
  return (
    <section id="team" className="relative py-16 md:py-24" style={{ backgroundColor: C.nude }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Meet The Artists</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Our Team</SectionTitle></Reveal>
        <Reveal delay={120}><SectionSub>Specialists, not generalists — your appointment is matched to the right pair of hands.</SectionSub></Reveal>

        {teamData.length === 0 ? (
          <EmptyState icon={LuUsers} text="Team profiles are being updated." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {teamData.map((t, i) => {
              const tags = t.specialties.split(',').map(x => x.trim()).filter(Boolean);
              const a = accentAt(i);
              
              return (
                <Reveal key={t.id} delay={i * 80}>
                  <div
                    className="group h-full rounded-2xl border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                    style={{ borderColor: C.rose + '1F', backgroundColor: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(8px)' }}
                  >
                    {/* Gold-framed avatar */}
                    <div className="relative w-[104px] h-[104px] mx-auto mb-4">
                      <span className="absolute inset-0 rounded-full p-[2.5px]"
                        style={{ backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.rose}, ${C.roseLight})` }}>
                        <LuxImage src={t.image_path} alt={t.name}
                          className="w-full h-full rounded-full border-2"
                          imgClass="transition-transform duration-300 group-hover:scale-[1.09]" />
                      </span>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8.5px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap border"
                        style={{ backgroundColor: C.pearl, color: C.rose, borderColor: C.gold + '66' }}>
                        {t.experience}
                      </span>
                    </div>

                    <h3 className="font-[Playfair_Display] text-[16.5px] font-semibold" style={{ color: C.charcoal }}>{t.name}</h3>
                    <p className="text-[10.5px] font-semibold mt-1.5 leading-snug px-1" style={{ color: a }}>{t.role}</p>

                    <div className="flex flex-wrap gap-1.5 justify-center mt-3.5">
                      {tags.slice(0, 4).map((tag, k) => (
                        <span key={k} className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
                          style={{ color: C.earth, borderColor: C.rose + '2B', backgroundColor: C.rose + '0D' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => openWa(`Hello ${brandName}! I would like to book an appointment with ${t.name} (${t.role}).\n\nPlease share their available slots. Thank you!`)}
                      className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[10.5px] font-bold uppercase tracking-wider border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                      style={{ borderColor: C.rose + '3D', color: C.rose, backgroundColor: C.rose + '0F' }}
                    >
                      <LuMessageCircle size={11} /> Request
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