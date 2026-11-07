import React from 'react';
import { MessageCircle, FileCheck, FileSignature, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HowItWorksProps {
  language: Language;
  onConsultationClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language, onConsultationClick }) => {
  const t = translations[language];

  const STEP_ICONS = [MessageCircle, FileCheck, FileSignature];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#20252B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              {t.process.kicker}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
            {t.process.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* Timeline Steps (Desktop Horizontal, Mobile Vertical) */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-[#C5A46D]/20 via-[#C5A46D]/60 to-[#C5A46D]/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {t.process.steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx] || MessageCircle;

              return (
                <div
                  key={step.number}
                  className="bg-[#101D2B] rounded-lg p-6 sm:p-8 border border-[#C5A46D]/25 shadow-xl hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Step Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-[#C5A46D]/60 group-hover:text-[#C5A46D] transition-colors tabular-nums">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded bg-[#20252B] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] group-hover:border-[#C5A46D] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-serif font-bold text-[#F7F5F0] mb-3">
                      {step.name}
                    </h3>

                    {/* Prominent Ge'ez / English Quote Card */}
                    <blockquote className="p-3.5 rounded bg-[#20252B] border-l-2 border-[#C5A46D] mb-4">
                      <p className="text-sm font-serif italic text-[#C5A46D] font-medium leading-relaxed">
                        "{step.quote}"
                      </p>
                      {step.quoteTranslation && (
                        <p className="text-xs text-slate-400 mt-1 font-sans not-italic">
                          {step.quoteTranslation}
                        </p>
                      )}
                    </blockquote>

                    {/* Step Descriptive Guidance */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Step {idx + 1} of 3 · GET-AS Acquisition
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Consultation Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={onConsultationClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-all shadow-lg active:scale-[0.98]"
          >
            <span>{language === 'am' ? 'የመጀመሪያ ውይይትዎን አሁኑኑ ይጀምሩ' : 'Schedule Your Initial Consultation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
