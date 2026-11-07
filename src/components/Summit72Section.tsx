import React from 'react';
import { Home, Layers, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Summit72SectionProps {
  language: Language;
  onInquireSummit: () => void;
}

export const Summit72Section: React.FC<Summit72SectionProps> = ({ language, onInquireSummit }) => {
  const t = translations[language];

  return (
    <section id="summit" className="py-20 lg:py-28 bg-[#101D2B] relative overflow-hidden">
      {/* Decorative hairline grid overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Storytelling */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
                {t.summit.kicker}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
              {t.summit.headline}
            </h2>

            <p className="text-base sm:text-lg font-serif italic text-[#C5A46D] mb-6">
              {t.summit.subtitle}
            </p>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base mb-8">
              <p>
                {t.summit.desc1}
              </p>
              <p>
                {t.summit.desc2}
              </p>
            </div>

            {/* Transparent historical verification disclosure */}
            <div className="p-3.5 rounded bg-[#20252B] border border-[#C5A46D]/20 mb-8 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.summit.statusNotice}
              </p>
            </div>

            {/* Key Verified Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#C5A46D]/20 mb-8">
              {t.summit.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-serif font-bold text-[#C5A46D] tabular-nums">
                    <span>{stat.value}</span>
                    <span className="text-xs font-sans font-normal text-slate-300">{stat.unit}</span>
                  </div>
                  <div className="text-xs text-slate-300 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div>
              <button
                onClick={onInquireSummit}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-all shadow-lg active:scale-[0.98]"
              >
                <span>{t.summit.exploreCompound}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#C5A46D]/30 shadow-2xl group">
              <img
                src="/src/assets/images/summit72_luxury_villas_1794040688825.jpg"
                alt="Summit 72 Luxury G+1 Villas Compound in Addis Ababa"
                className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-transparent to-transparent opacity-80" />

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#101D2B]/95 backdrop-blur-md border border-[#C5A46D]/40 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#C5A46D] font-mono">
                  <span>SUMMIT 72 · ADDIS ABABA</span>
                  <span className="px-2 py-0.5 rounded bg-[#C5A46D]/20 text-[#C5A46D]">G+1 VILLAS</span>
                </div>
                <div className="text-sm font-semibold text-[#F7F5F0]">
                  {language === 'am' ? '32 የተመረጡ የቅንጦት ቪላዎችና ሁለት ፎቆች' : '32 Luxury G+1 Villas & Two Delivered Towers'}
                </div>
              </div>
            </div>

            {/* Subtle architectural frame accent */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C5A46D]/40 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
