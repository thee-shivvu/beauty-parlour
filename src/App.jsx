/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { C, scrollToId, WA_NUMBER, TEL_NUMBER } from './constants/theme';
import { LuMessageCircle, LuPhone, LuCalendar } from 'react-icons/lu';

// Layout (We will build these next)
import Header from './Components/layout/Header.jsx';
import MobileDrawer from './Components/layout/MobileDrawer';
import Footer from './Components/layout/Footer.jsx';

// Sections (We will build these next)
import HeroSection from './Components/sections/Hero.jsx'
import AboutSection from './Components/sections/About.jsx';
import ServicesSection from './Components/sections/Service.jsx';
import PricingSection from './Components/sections/Pricing.jsx';
import OfferSection from "./Components/sections/Offer.jsx"
import GallerySection from './Components/sections/Gallery.jsx';
import TeamSection from './Components/sections/Team.jsx';
import ReviewSection from './Components/sections/Review.jsx';
import BridalSection from './Components/sections/Bridal.jsx';
import ContactSection from './Components/sections/Contackt.jsx';
import BookingSection from './Components/sections/Booking.jsx';


export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  // Cross-component state for booking pre-fill
  const [formPreFill, setFormPreFill] = useState('');
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Shared functions
  const bookService = (serviceName) => {
    setFormPreFill(serviceName);
    setTimeout(() => scrollToId('booking'), 60);
  };

  const viewPrice = (serviceId) => {
    setHighlight(serviceId);
    setTimeout(() => scrollToId('pricing'), 60);
    setTimeout(() => setHighlight(null), 2600);
  };

  return (
    <div className="min-h-screen antialiased" style={{ backgroundColor: C.pearl, color: C.charcoal, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      
      <Header scrolled={scrolled} setDrawer={setDrawer} /> 
       <MobileDrawer drawer={drawer} setDrawer={setDrawer} />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection viewPrice={viewPrice} />
        <PricingSection highlight={highlight} bookService={bookService} />
        <OfferSection />
        <GallerySection bookService={bookService}/>
        <TeamSection />
        <ReviewSection />
        <BridalSection />
        <ContactSection />
        <BookingSection />
      </main>

      <Footer bookService={bookService} />

      {/* FLOATING QUICK ACTION CTA BAR (FAB) */}
      <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col gap-2.5">
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I would like to know more about your services.')}`} target="_blank" rel="noopener noreferrer" className="group relative w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-[1.09] active:scale-[0.94]" style={{ backgroundColor: '#25D366', boxShadow: '0 8px 26px rgba(37,211,102,0.42)' }}>
          <LuMessageCircle size={22} className="text-white" />
        </a>
        <a href={`tel:${TEL_NUMBER}`} className="group relative w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-[1.09] active:scale-[0.94]" style={{ backgroundImage: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, boxShadow: `0 8px 26px ${C.rose}5C` }}>
          <LuPhone size={20} className="text-white" />
        </a>
        <button onClick={() => scrollToId('booking')} className="group relative w-[52px] h-[52px] rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-200 hover:scale-[1.09] active:scale-[0.94]" style={{ borderColor: C.rose + '4D', backgroundColor: 'rgba(253,251,247,0.9)' }}>
          <LuCalendar size={19} style={{ color: C.rose }} />
        </button>
      </div>

      {/* GLOBAL STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 76px; }
        .font-\\[Playfair_Display\\] { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; }
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.55; }
      `}} />
    </div>
  );
}