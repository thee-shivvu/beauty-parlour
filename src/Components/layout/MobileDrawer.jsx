import { LuX, LuCalendar, LuMessageCircle, LuPhone } from 'react-icons/lu';
import { C, WA_NUMBER, TEL_NUMBER, scrollToId } from '../../constants/theme';
import { GoldButton, GhostButton } from "../UI/Primitives"
import { NAV } from './Header';

const brand = { name: "Rylo Parlour" };

export default function MobileDrawer({ drawer, setDrawer }) {
  if (!drawer) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(18,18,18,0.55)', backdropFilter: 'blur(4px)', animation: 'fadeIn 200ms ease-out' }}
        onClick={() => setDrawer(false)}
      />
      
      {/* Drawer Panel */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[330px] p-6 flex flex-col border-l"
        style={{ backgroundColor: C.pearl, borderColor: C.rose + '22', animation: 'drawerIn 260ms ease-out' }}
      >
        <div className="flex items-center justify-between mb-7">
          <span className="font-[Playfair_Display] text-[19px] font-bold" style={{ color: C.charcoal }}>{brand.name}</span>
          <button
            onClick={() => setDrawer(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-transform duration-200 active:scale-[0.94]"
            style={{ borderColor: C.rose + '33', color: C.earth }}
            aria-label="Close menu"
          >
            <LuX size={17} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {NAV.map((n, i) => (
            <button
              key={n.id}
              onClick={() => { setDrawer(false); setTimeout(() => scrollToId(n.id), 220); }}
              className="text-left px-4 py-3 rounded-2xl text-[14px] font-medium transition-all duration-200 hover:bg-white active:scale-[0.98]"
              style={{ color: C.charcoal, animation: 'fadeUp 300ms ease-out both', animationDelay: (i * 40) + 'ms' }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="pt-5 space-y-2.5 border-t mt-4" style={{ borderColor: C.rose + '22' }}>
          <GoldButton onClick={() => { setDrawer(false); setTimeout(() => scrollToId('booking'), 220); }} className="w-full" icon={LuCalendar}>
            Book Appointment
          </GoldButton>
          <div className="grid grid-cols-2 gap-2.5">
            <GhostButton href={`https://wa.me/${WA_NUMBER}`} className="w-full !px-3 !text-[12px]" icon={LuMessageCircle}>WhatsApp</GhostButton>
            <GhostButton href={`tel:${TEL_NUMBER}`} className="w-full !px-3 !text-[12px]" icon={LuPhone}>Call</GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}