import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Building2, PhoneCall, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'am' : 'en';
    onLanguageChange(nextLang);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-header border-b border-[#C5A46D]/20 py-3.5 shadow-xl'
            : 'bg-gradient-to-b from-[#101D2B]/95 via-[#101D2B]/75 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
              aria-label="GET-AS REAL ESTATE Home"
            >
              <div className="w-10 h-10 rounded-sm bg-[#101D2B] border border-[#C5A46D]/60 flex items-center justify-center transition-transform group-hover:border-[#C5A46D] shadow-sm">
                <Building2 className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-wider font-serif text-[#F7F5F0] group-hover:text-[#C5A46D] transition-colors whitespace-nowrap">
                  GET-AS <span className="font-sans font-light text-xs md:text-sm tracking-widest text-[#C5A46D]">REAL ESTATE</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase hidden sm:inline">
                  Kazanchis · Addis Ababa
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#F7F5F0]/90">
              <button
                onClick={() => handleNavClick('home')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => handleNavClick('properties')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.properties}
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => handleNavClick('summit')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.summit}
              </button>
              <button
                onClick={() => handleNavClick('agents')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.agents}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Zone 3: Actions (Language Switcher + CTA) */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'en' ? 'Amharic' : 'English'}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border border-[#C5A46D]/40 bg-[#101D2B]/80 text-[#F7F5F0] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-all whitespace-nowrap shrink-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span className="uppercase">{language === 'en' ? 'አማርኛ' : 'EN'}</span>
              </button>

              {/* Gold Explore CTA */}
              <button
                onClick={() => handleNavClick('properties')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-all duration-200 shadow-md whitespace-nowrap shrink-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
              >
                <span>{t.nav.exploreBtn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-[#F7F5F0] hover:text-[#C5A46D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-[#101D2B]/95 backdrop-blur-xl lg:hidden pt-24 px-6 pb-8 overflow-y-auto flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="border-b border-[#C5A46D]/20 pb-4 mb-4">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] block mb-1">
                GET-AS REAL ESTATE
              </span>
              <p className="text-xs text-slate-300">
                {t.divisionOf} · Kazanchis, Addis Ababa
              </p>
            </div>

            <nav className="flex flex-col space-y-3 text-base font-medium text-[#F7F5F0]">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => handleNavClick('properties')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.properties}
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => handleNavClick('summit')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.summit}
              </button>
              <button
                onClick={() => handleNavClick('process')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => handleNavClick('agents')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors border-b border-slate-800"
              >
                {t.nav.agents}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-left py-2 hover:text-[#C5A46D] transition-colors"
              >
                {t.nav.contact}
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#C5A46D]/20 space-y-3">
            <button
              onClick={() => handleNavClick('properties')}
              className="w-full py-3 text-center text-sm font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-colors"
            >
              {t.nav.exploreBtn}
            </button>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#C5A46D]" />
                +251-983-018080
              </span>
              <button
                onClick={toggleLanguage}
                className="text-[#C5A46D] font-medium underline"
              >
                Switch to {language === 'en' ? 'አማርኛ' : 'English'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
