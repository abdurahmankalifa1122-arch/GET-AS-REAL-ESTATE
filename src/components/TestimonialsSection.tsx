import React from 'react';
import { Quote, MessageSquareQuote, ShieldCheck, Mail } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TestimonialsSectionProps {
  language: Language;
  onShareExperience: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language, onShareExperience }) => {
  const t = translations[language];

  return (
    <section className="py-20 lg:py-24 bg-[#20252B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Kicker */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              {t.testimonials.kicker}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F5F0] mb-4">
            {t.testimonials.heading}
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-12">
            {t.testimonials.subtitle}
          </p>

          {/* Genuine Client Statement Box */}
          <div className="relative p-8 sm:p-12 rounded-lg bg-[#101D2B] border border-[#C5A46D]/30 shadow-2xl text-left">
            <Quote className="w-10 h-10 text-[#C5A46D]/30 absolute top-6 left-6 -scale-x-100 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <p className="text-base sm:text-lg lg:text-xl font-serif italic text-[#F7F5F0] leading-relaxed">
                "{t.testimonials.quoteText}"
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#20252B] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] font-serif font-bold">
                    G
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#F7F5F0] block">
                      {t.testimonials.quoteAuthor}
                    </span>
                    <span className="text-xs text-[#C5A46D]">
                      {language === 'am' ? 'ሰሚት 72 የመኖሪያ ማህበረሰብ' : 'Summit 72 Residential Enclave'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
                  <span>{language === 'am' ? 'የተረጋገጠ የቤት ባለቤት' : 'Verified Homeowner'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Corporate Homeowner Invitation */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400">
            <span>{t.testimonials.requestShare}</span>
            <button
              onClick={onShareExperience}
              className="text-[#C5A46D] font-semibold underline hover:text-white transition-colors"
            >
              {language === 'am' ? 'ግብረ-መልስ ይላኩ' : 'Contact Customer Relations'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
