import { useState, useEffect, useMemo } from 'react';
import { 
  LuChevronDown, LuSun, LuSparkles, LuStar, LuMessageCircle, 
  LuPhone,  LuX, 
   LuCalendar, LuClock 
} from 'react-icons/lu';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";


import { C, TEL_NUMBER, openWa, inr, safe } from '../../constants/theme.jsx';
import { Reveal } from '../../hooks/useReveal';
import { Eyebrow, SectionTitle, SectionSub, GhostButton, GoldButton } from '../UI/Primitives';

// Inline Data: Services for the Dropdown
const servicesData = [
  { id: 's1', name: 'Signature Balayage', category: 'Hair', price_inr: 4500 },
  { id: 's2', name: 'HydraFacial Glow', category: 'Skin', price_inr: 3000 },
  { id: 's3', name: 'Luxury Keratin Treatment', category: 'Hair', price_inr: 5000 },
  { id: 's4', name: 'Gel Extensions & Art', category: 'Nails', price_inr: 1500 },
  { id: 's5', name: 'Organic Spa Pedicure', category: 'Body', price_inr: 1200 }
];

const SLOTS = [
  { key: 'Morning (10 AM - 1 PM)', label: 'Morning', hint: '10 AM - 1 PM', icon: LuSun },
  { key: 'Afternoon (1 PM - 5 PM)', label: 'Afternoon', hint: '1 PM - 5 PM', icon: LuSparkles },
  { key: 'Evening (5 PM - 8 PM)', label: 'Evening', hint: '5 PM - 8 PM', icon: LuStar },
];

const brandName = "Rylo Parlour";

export default function BookingSection({ formPreFill }) {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', slot: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // Pre-fill the form if user clicks "Book This" from another section
  useEffect(() => {
    if (formPreFill) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(f => ({ ...f, service: formPreFill }));
      setErrors(e => ({ ...e, service: '' }));
    }
  }, [formPreFill]);

  const priceCats = useMemo(() => {
    const set = [];
    servicesData.forEach(s => { if (s.category && set.indexOf(s.category) === -1) set.push(s.category); });
    return set;
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const submitBooking = (e) => {
    e.preventDefault();
    const errs = {};
    
    if (form.name.trim().length < 2) errs.name = 'Please enter your full name';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length !== 10) errs.phone = 'Enter a valid 10-digit mobile number';
    if (!form.service) errs.service = 'Please select a service';
    if (!form.date) errs.date = 'Please choose a preferred date';
    if (!form.slot) errs.slot = 'Please pick a time slot';
    
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);

    const msg =
      `Hello ${brandName}! I would like to book an appointment.\n\n` +
      `Name: ${form.name.trim()}\n` +
      `Phone: ${digits}\n` +
      `Service: ${form.service}\n` +
      `Preferred Date: ${form.date}\n` +
      `Preferred Time: ${form.slot}` +
      (form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : '') +
      `\n\nPlease confirm my slot. Thank you!`;

    // Simulate a brief loading state for UX
    setTimeout(() => {
      setSubmitting(false);
      setSuccess({ name: form.name.trim(), service: form.service, date: form.date, slot: form.slot, msg });
      openWa(msg);
    }, 600);
  };

  return (
    <section id="booking" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(780px 420px at 50% 0%, ${C.roseLight}4D, transparent 62%)`,
      }} />
      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        <Reveal><Eyebrow>Reserve Your Slot</Eyebrow></Reveal>
        <Reveal delay={60}><SectionTitle>Book An Appointment</SectionTitle></Reveal>
        <Reveal delay={120}>
          <SectionSub>
            Fill in your details and confirm instantly over WhatsApp — or call us and we will book it for you.
          </SectionSub>
        </Reveal>

        <Reveal delay={160}>
          <form
            onSubmit={submitBooking}
            className="mt-10 rounded-[26px] border p-6 md:p-9"
            style={{ borderColor: C.rose + '2B', backgroundColor: 'rgba(255,255,255,0.76)', backdropFilter: 'blur(12px)', boxShadow: '0 14px 44px rgba(183,110,121,0.1)' }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              {/* Full name */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: C.earth }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(x => ({ ...x, name: '' })); }}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-4 py-3 rounded-full text-[13px] outline-none transition-all duration-200 border"
                  style={{ borderColor: errors.name ? '#DC2626' : C.rose + '2B', backgroundColor: '#fff', color: C.charcoal }}
                />
                {errors.name && <p className="text-[10.5px] mt-1.5 ml-1" style={{ color: '#DC2626' }}>{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: C.earth }}>
                  Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold pointer-events-none" style={{ color: C.earth }}>
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setForm(f => ({ ...f, phone: v }));
                      setErrors(x => ({ ...x, phone: '' }));
                    }}
                    placeholder="10-digit mobile"
                    className="w-full pl-14 pr-4 py-3 rounded-full text-[13px] outline-none transition-all duration-200 border"
                    style={{ borderColor: errors.phone ? '#DC2626' : C.rose + '2B', backgroundColor: '#fff', color: C.charcoal }}
                  />
                </div>
                {errors.phone && <p className="text-[10.5px] mt-1.5 ml-1" style={{ color: '#DC2626' }}>{errors.phone}</p>}
              </div>

              {/* Service select */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: C.earth }}>
                  Select Service *
                </label>
                <div className="relative">
                  <select
                    value={form.service}
                    onChange={e => { setForm(f => ({ ...f, service: e.target.value })); setErrors(x => ({ ...x, service: '' })); }}
                    className="w-full appearance-none px-4 py-3 pr-10 rounded-full text-[13px] outline-none transition-all duration-200 border cursor-pointer"
                    style={{ borderColor: errors.service ? '#DC2626' : C.rose + '2B', backgroundColor: '#fff', color: form.service ? C.charcoal : C.earth }}
                  >
                    <option value="">Choose a treatment…</option>
                    {priceCats.map(cat => (
                      <optgroup key={cat} label={cat}>
                        {servicesData.filter(s => s.category === cat).map(s => (
                          <option key={s.id} value={s.name}>
                            {s.name} — {inr(s.price_inr)}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Not sure — please advise">Not sure — please advise</option>
                  </select>
                  <LuChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.earth }} />
                </div>
                {errors.service && <p className="text-[10.5px] mt-1.5 ml-1" style={{ color: '#DC2626' }}>{errors.service}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: C.earth }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(x => ({ ...x, date: '' })); }}
                  className="w-full px-4 py-3 rounded-full text-[13px] outline-none transition-all duration-200 border cursor-pointer"
                  style={{ borderColor: errors.date ? '#DC2626' : C.rose + '2B', backgroundColor: '#fff', color: C.charcoal }}
                />
                {errors.date && <p className="text-[10.5px] mt-1.5 ml-1" style={{ color: '#DC2626' }}>{errors.date}</p>}
              </div>
            </div>

            {/* Time slot selector */}
            <div className="mt-5">
              <label className="block text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2.5" style={{ color: C.earth }}>
                Preferred Time Slot *
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {SLOTS.map(s => {
                  const SIcon = s.icon;
                  const active = form.slot === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => { setForm(f => ({ ...f, slot: s.key })); setErrors(x => ({ ...x, slot: '' })); }}
                      className="flex flex-col items-center gap-1.5 px-2 py-3.5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                      style={active
                        ? { borderColor: C.rose, backgroundColor: C.rose + '14', boxShadow: `0 0 0 3px ${C.rose}1A` }
                        : { borderColor: C.rose + '2B', backgroundColor: '#fff' }}
                    >
                      <SIcon size={16} style={{ color: active ? C.rose : C.earth }} />
                      <span className="text-[11.5px] font-bold" style={{ color: active ? C.rose : C.charcoal }}>{s.label}</span>
                      <span className="text-[9px]" style={{ color: C.earth }}>{s.hint}</span>
                    </button>
                  );
                })}
              </div>
              {errors.slot && <p className="text-[10.5px] mt-1.5 ml-1" style={{ color: '#DC2626' }}>{errors.slot}</p>}
            </div>

            {/* Notes */}
            <div className="mt-5">
              <label className="block text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: C.earth }}>
                Special Notes / Requests
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Allergies, preferred stylist, occasion, inspiration photos…"
                className="w-full px-4 py-3 rounded-2xl text-[13px] outline-none resize-none transition-all duration-200 border"
                style={{ borderColor: C.rose + '2B', backgroundColor: '#fff', color: C.charcoal }}
              />
            </div>

            {/* Submit actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                style={{ backgroundImage: `linear-gradient(100deg, ${C.rose}, ${C.gold})`, color: '#fff', boxShadow: `0 6px 22px ${C.rose}3D` }}
              >
                {submitting ? <LuLoaderCircle size={15} className="animate-spin" /> : <LuMessageCircle size={15} />}
                {submitting ? 'Confirming…' : 'Confirm via WhatsApp'}
              </button>
              <GhostButton href={`tel:${TEL_NUMBER}`} className="flex-1 !py-3.5" icon={LuPhone}>
                Direct Call to Book
              </GhostButton>
            </div>

            <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: C.earth }}>
              Your enquiry is logged with us and confirmed over WhatsApp. Slots are held only after confirmation.
            </p>
          </form>
        </Reveal>
      </div>

      {/* ================== BOOKING SUCCESS MODAL ===================== */}
      {success && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(18,18,18,0.86)', backdropFilter: 'blur(8px)', animation: 'fadeIn 200ms ease-out' }}
          onClick={() => setSuccess(null)}
        >
          <div
            className="relative w-full max-w-md rounded-[26px] border p-7 md:p-8 text-center"
            style={{ borderColor: C.gold + '4D', backgroundColor: C.pearl, animation: 'scaleIn 260ms ease-out', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSuccess(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-[0.94]"
              style={{ color: C.earth }}
              aria-label="Close"
            >
              <LuX size={16} />
            </button>

            <span className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: C.gold + '1A', animation: 'glow 2s ease-in-out infinite' }}>
              <FaRegCheckCircle size={30} style={{ color: C.gold }} />
            </span>

            <h3 className="font-[Playfair_Display] text-[23px] font-semibold" style={{ color: C.charcoal }}>
              Almost There, {safe(success.name).split(' ')[0]}!
            </h3>
            <p className="text-[12.5px] mt-2.5 leading-relaxed" style={{ color: C.earth }}>
              We have prepared your request over WhatsApp with your details pre-filled.
              <strong style={{ color: C.charcoal }}> Please send that message</strong> so our team can confirm your slot.
            </p>

            {/* Summary */}
            <div className="mt-5 p-4 rounded-2xl border text-left space-y-2"
              style={{ borderColor: C.rose + '2B', backgroundColor: 'rgba(255,255,255,0.7)' }}>
              {[
                { l: 'Service', v: success.service, i: LuSparkles },
                { l: 'Date', v: success.date, i: LuCalendar },
                { l: 'Time', v: success.slot, i: LuClock },
              ].map((r, i) => {
                const RIcon = r.i;
                return (
                  <div key={i} className="flex items-center gap-2.5">
                    <RIcon size={12} style={{ color: C.gold }} className="shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider w-14 shrink-0" style={{ color: C.earth }}>{r.l}</span>
                    <span className="text-[11.5px] font-semibold flex-1 text-right" style={{ color: C.charcoal }}>{r.v}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2.5 mt-6">
              <GoldButton onClick={() => openWa(success.msg)} icon={LuMessageCircle}>Re-open WhatsApp</GoldButton>
              <GhostButton href={`tel:${TEL_NUMBER}`} icon={LuPhone}>Call Instead</GhostButton>
            </div>

            <button
              onClick={() => { setSuccess(null); setForm({ name: '', phone: '', service: '', date: '', slot: '', notes: '' }); }}
              className="text-[10.5px] font-semibold mt-4 underline transition-opacity duration-200 hover:opacity-70"
              style={{ color: C.earth }}
            >
              Book another appointment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}