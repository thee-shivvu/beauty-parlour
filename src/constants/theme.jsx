export const C = {
  rose: '#B76E79',        // Primary accent
  roseLight: '#E8C39E',   // Light accent
  gold: '#D4AF37',        // Champagne gold
  pearl: '#FDFBF7',       // Background cream
  nude: '#F5EBE6',        // Soft warm nude sections
  obsidian: '#121212',    // Dark footer/sections
  charcoal: '#1A1A1A',    // Main text
  earth: '#7A6A60',       // Subtext
};

export const WA_NUMBER = '919760244019';
export const TEL_NUMBER = '+919760244019';

// Added safe back in!
export function safe(v) { 
  return String(v ?? '').trim(); 
}

export function inr(v) {
  return '\u20B9' + Number(v).toLocaleString('en-IN');
}

export function dur(mins) {
  if (mins < 60) return mins + ' Mins';
  const h = Math.floor(mins / 60);
  const r = mins % 60;
  return r === 0 ? h + (h === 1 ? ' Hour' : ' Hours') : h + 'h ' + r + 'm';
}

export function openWa(message) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}