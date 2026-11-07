import React from 'react';
import { ShieldCheck, Award, Building, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  language: Language;
  onExplorePortfolio: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language, onExplorePortfolio }) => {
  const t = translations[language];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#101D2B] relative overflow-hidden">
      {/* Subtle architectural background texture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#C5A46D]/30 shadow-2xl group">
              <img
                src="/src/assets/images/property_development_craft_1794040690458.jpg"
                alt="GET-AS Real Estate construction engineers and site development in Addis Ababa"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-transparent to-transparent opacity-80" />
              
              {/* Floating verified badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#101D2B]/90 backdrop-blur-md border border-[#C5A46D]/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#C5A46D]/20 text-[#C5A46D]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-medium block">
                      GET-AS International PLC
                    </span>
                    <span className="text-sm font-semibold text-[#F7F5F0]">
                      {language === 'am' ? 'የአለም አቀፍ ደረጃ ግንባታ ልህቀት' : 'International Construction Standards'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner accent square */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#C5A46D]/40 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
                {t.about.kicker}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-6 leading-tight text-balance">
              {t.about.heading}
            </h2>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base mb-8">
              <p className="font-medium text-[#F7F5F0]">
                {t.about.p1}
              </p>
              <p>
                {t.about.p2}
              </p>
              <p className="text-slate-400">
                {t.about.p3}
              </p>
            </div>

            {/* Highlighted Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[#C5A46D]/20 mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-200">
                  {t.about.highlights[0]}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-200">
                  {t.about.highlights[1]}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-200">
                  {t.about.highlights[2]}
                </span>
              </div>
            </div>

            {/* Learn more action */}
            <div>
              <button
                onClick={onExplorePortfolio}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-all shadow-md active:scale-[0.98]"
              >
                <span>{t.about.learnMore}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
