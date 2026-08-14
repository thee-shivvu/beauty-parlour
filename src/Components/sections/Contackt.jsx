import  { useState } from 'react';
import { 
  LuMapPin, LuPhone, LuMessageCircle, LuMail, LuArrowRight, 
  LuClock, LuInstagram, LuFacebook, LuYoutube, LuSend, } from 'react-icons/lu';
import { FaRegCheckCircle } from "react-icons/fa";

import { C, WA_NUMBER, TEL_NUMBER, openWa } from '../../constants/theme';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, GoldButton,   } from '../UI/Primitives';

// Inline Data
const contactData = {
  address: "Civil Lines, Dehradun, Uttarakhand",
  mapsQuery: "Civil Lines, Dehradun",
  phone: "+919760244019",
  email: "hello@ryloparlour.com",
  brandName: "Rylo Parlour",
  hours: [
    { day: 'Monday - Saturday', time: '10:00 AM - 8:00 PM' },
    { day: 'Sunday', time: '11:00 AM - 6:00 PM' }
  ],
  socials: [
    { label: 'Instagram', handle: '@ryloparlour', url: '#', icon: LuInstagram },
    { label: 'Facebook', handle: '@ryloparlour', url: '#', icon: LuFacebook },
    { label: 'YouTube', handle: '@ryloparlour', url: '#', icon: LuYoutube },
  ],
  feed: [
    { id: 'f1', image_url: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&q=80&w=400' },
    { id: 'f2', image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400' },
    { id: 'f3', image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?auto=format&fit=crop&q=80&w=400' },
    { id: 'f4', image_url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=400' },
    { id: 'f5', image_url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400' },
    { id: 'f6', image_url: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400' }
  ],
  newsletter: {
    title: "Exclusive Weekend Offers, First",
    subtitle: "Join our private list for members-only pricing."
  }
};

const ACCENTS = [C.rose, C.gold, C.roseLight, C.earth];
function accentAt(i) { return ACCENTS[i % ACCENTS.length]; }

export default function ContactSection() {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsDone, setNewsDone] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(newsEmail.trim())) return;
    
    // Hand the subscription to the salon over WhatsApp so no signup is lost
    openWa(`Hello ${contactData.brandName}! Please add me to your exclusive weekend offers list.\n\nEmail: ${newsEmail.trim()}`);
    setNewsDone(true);
  };

  return (
    <>
      {/* =================== PART 1: CONTACT INFO & MAP =================== */}
      <section id="contact" className="relative py-16 md:py-24" style={{ backgroundColor: C.nude }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal><Eyebrow>Visit The Atelier</Eyebrow></Reveal>
          <Reveal delay={60}><SectionTitle>Contact Us</SectionTitle></Reveal>
          <Reveal delay={120}><SectionSub>Walk in for a consultation, or reach us on whichever channel suits you.</SectionSub></Reveal>

          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 mt-12">
            {/* Contact cards */}
            <div className="space-y-3.5">
              {[
                { icon: LuMapPin, label: 'Our Address', value: contactData.address, href: `https://maps.google.com/?q=${encodeURIComponent(contactData.mapsQuery)}`, sub: 'Get directions' },
                { icon: LuPhone, label: 'Call Us', value: contactData.phone, href: `tel:${TEL_NUMBER}`, sub: 'Mon–Sat, 10 AM – 8 PM' },
                { icon: LuMessageCircle, label: 'WhatsApp Business', value: '+' + WA_NUMBER, href: `https://wa.me/${WA_NUMBER}`, sub: 'Fastest response' },
                { icon: LuMail, label: 'Email Us', value: contactData.email, href: `mailto:${contactData.email}`, sub: 'For bridal & bulk enquiries' },
              ].map((c, i) => {
                const Icon = c.icon;
                const a = accentAt(i);
                return (
                  <Reveal key={i} delay={i * 70}>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: C.rose + '1F', backgroundColor: 'rgba(255,255,255,0.76)' }}
                    >
                      <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-[1.08]"
                        style={{ backgroundColor: a + '1A' }}>
                        <Icon size={18} style={{ color: a }} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[9.5px] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: C.earth }}>
                          {c.label}
                        </span>
                        <span className="block text-[13px] font-semibold leading-snug break-words" style={{ color: C.charcoal }}>
                          {c.value}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] mt-1.5 transition-all duration-200 group-hover:gap-2" style={{ color: a }}>
                          {c.sub} <LuArrowRight size={10} />
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}

              {/* Opening hours table */}
              <Reveal delay={280}>
                <div className="p-5 rounded-2xl border" style={{ borderColor: C.gold + '3D', backgroundColor: 'rgba(255,255,255,0.76)' }}>
                  <h3 className="flex items-center gap-2 text-[12.5px] font-bold mb-3.5" style={{ color: C.charcoal }}>
                    <LuClock size={14} style={{ color: C.gold }} /> Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {contactData.hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 pb-2 border-b last:border-0 last:pb-0"
                        style={{ borderColor: C.rose + '1A' }}>
                        <span className="text-[11.5px] font-medium" style={{ color: C.earth }}>{h.day}</span>
                        <span className="text-[11.5px] font-bold" style={{ color: C.rose }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Map */}
            <Reveal delay={140}>
              <div className="h-full min-h-[420px] rounded-[26px] overflow-hidden border relative"
                style={{ borderColor: C.gold + '3D' }}>
                <iframe
                  title={`${contactData.brandName} location`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(contactData.mapsQuery)}&output=embed`}
                  className="w-full h-full min-h-[420px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Floating map CTA */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2.5">
                  <GoldButton href={`https://maps.google.com/?q=${encodeURIComponent(contactData.mapsQuery)}`} className="!py-2.5 !px-4 !text-[11.5px]" icon={LuMapPin}>
                    Open in Maps
                  </GoldButton>
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[11.5px] font-semibold backdrop-blur-md border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={{ borderColor: C.rose + '3D', color: C.charcoal, backgroundColor: 'rgba(253,251,247,0.9)' }}
                  >
                    <LuMessageCircle size={13} /> Ask for directions
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================== PART 2: SOCIALS & NEWSLETTER =================== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(720px 380px at 20% 90%, ${C.roseLight}38, transparent 62%)`,
        }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <Reveal><Eyebrow>@ryloparlour</Eyebrow></Reveal>
          <Reveal delay={60}><SectionTitle>Follow Our Latest Work</SectionTitle></Reveal>
          <Reveal delay={120}><SectionSub>New transformations posted weekly. Tag us to be featured on our feed.</SectionSub></Reveal>


          {/* Social links */}
          <Reveal delay={160}>
            <div className="flex flex-wrap justify-center gap-3 mt-9">
              {contactData.socials.map((s, i) => {
                const SIcon = s.icon;
                const a = accentAt(i);
                return (
                  <a
                    key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
                    style={{ borderColor: a + '33', backgroundColor: 'rgba(255,255,255,0.7)' }}
                  >
                    <span className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.12]"
                      style={{ backgroundColor: a + '1A' }}>
                      <SIcon size={13} style={{ color: a }} />
                    </span>
                    <span className="text-left leading-none">
                      <span className="block text-[11.5px] font-bold" style={{ color: C.charcoal }}>{s.label}</span>
                      <span className="block text-[9px] mt-0.5" style={{ color: C.earth }}>{s.handle}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Newsletter bar */}
          <Reveal delay={220}>
            <div
              className="mt-12 rounded-[26px] border p-6 md:p-9"
              style={{ borderColor: C.gold + '3D', backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(10px)' }}
            >
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 items-center">
                <div>
                  <h3 className="font-[Playfair_Display] text-[20px] md:text-[25px] font-semibold leading-tight" style={{ color: C.charcoal }}>
                    {contactData.newsletter.title}
                  </h3>
                  <p className="text-[12.5px] mt-2.5 leading-relaxed" style={{ color: C.earth }}>{contactData.newsletter.subtitle}</p>
                </div>
                {newsDone ? (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border"
                    style={{ borderColor: C.gold + '4D', backgroundColor: C.gold + '12' }}>
                    <FaRegCheckCircle size={19} style={{ color: C.gold }} />
                    <span className="text-[12.5px] font-semibold" style={{ color: C.charcoal }}>
                      You are on the list — watch your inbox each Friday.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={newsEmail}
                      onChange={e => setNewsEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 rounded-full text-[13px] outline-none border transition-all duration-200"
                      style={{ borderColor: C.rose + '2B', backgroundColor: '#fff', color: C.charcoal }}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[12.5px] font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                      style={{ backgroundImage: `linear-gradient(100deg, ${C.rose}, ${C.gold})`, color: '#fff' }}
                    >
                      <LuSend size={13} /> Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}