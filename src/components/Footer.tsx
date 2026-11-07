import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Shield, FileText, ChevronRight, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language];
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#0b141e] text-slate-300 border-t border-[#C5A46D]/20 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#101D2B] border border-[#C5A46D]/60 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider font-serif text-[#F7F5F0]">
                  GET-AS <span className="font-sans font-light text-xs tracking-widest text-[#C5A46D]">REAL ESTATE</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase">
                  {t.divisionOf}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              {t.footer.desc}
            </p>

            <div className="pt-2 text-xs text-[#C5A46D] font-mono">
              Kazanchis · Summit 72 · Addis Ababa, Ethiopia
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F7F5F0] font-serif border-b border-[#C5A46D]/30 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.home}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.about}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.properties}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.services}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('summit')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.summit}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('agents')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.agents}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A46D] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A46D]" />
                  <span>{t.nav.contact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Sister Companies (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F7F5F0] font-serif border-b border-[#C5A46D]/30 pb-2">
              {t.footer.sisterGroup}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-[#F7F5F0] block">DUGDA CONSTRUCTION PLC</span>
                <span className="text-[11px] text-slate-400">Grade-1 Building & Foundation Contractor (Est. 2011)</span>
              </div>
              <div>
                <span className="font-semibold text-[#F7F5F0] block">HABESHA CEMENT</span>
                <span className="text-[11px] text-slate-400">National OPC & PPC Cement Manufacturer</span>
              </div>
              <div>
                <span className="font-semibold text-[#F7F5F0] block">GLOBAL PAINT</span>
                <span className="text-[11px] text-slate-400">Sons Industry PLC Coatings & Adhesives</span>
              </div>
            </div>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F7F5F0] font-serif border-b border-[#C5A46D]/30 pb-2">
              {t.nav.contact}
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span className="font-sans">Kazanchis, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href="tel:+251983018080" className="hover:text-[#C5A46D] transition-colors">
                  +251-983-018080
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href="tel:+251942654444" className="hover:text-[#C5A46D] transition-colors">
                  +251-942-654444
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href="mailto:john.andu89@gmail.com" className="hover:text-[#C5A46D] transition-colors font-sans truncate">
                  john.andu89@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>{t.footer.copyright}</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[11px] text-slate-400">{t.footer.disclaimer}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#C5A46D] transition-colors underline"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#C5A46D] transition-colors underline"
            >
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#101D2B] border border-[#C5A46D]/40 rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-lg font-serif font-bold text-[#F7F5F0]">
                {modalType === 'privacy' ? t.footer.privacy : t.footer.terms}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    GET-AS Real Estate, a division of GET-AS International PLC, operates strictly under Ethiopian commercial and data protection laws. Any personal information submitted via our property inquiry forms, phone calls, or office visits is treated with highest confidentiality.
                  </p>
                  <p>
                    Information collected (full name, telephone number, email, and preferred property specifications) is utilized solely for customer property advisory, private tour coordination, and transaction contract preparation.
                  </p>
                  <p>
                    We never sell, rent, or lease customer contact credentials to third-party marketing entities.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All architectural photographs, floor plans, pricing indications, and property specifications published on this platform are for general information and preliminary discovery.
                  </p>
                  <p>
                    All property acquisitions, reservations (capped at 100,000 ETB), and milestone contracts are subject to verified execution through GET-AS Real Estate's legal department in Kazanchis, Addis Ababa.
                  </p>
                  <p>
                    Any figures marked with verification flags remain subject to final verification on the formal sales contract.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 text-xs font-semibold rounded bg-[#C5A46D] text-[#101D2B] hover:bg-[#b3925a]"
              >
                {language === 'am' ? 'እሺ' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
