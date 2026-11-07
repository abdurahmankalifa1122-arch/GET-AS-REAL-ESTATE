import React from 'react';
import { Hammer, Factory, Paintbrush, ExternalLink, Check, Shield } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SISTER_COMPANIES_DATA } from '../data/properties';

interface SisterCompaniesProps {
  language: Language;
}

const COMPANY_ICONS: Record<string, React.ElementType> = {
  dugda: Hammer,
  habesha: Factory,
  'global-paint': Paintbrush,
};

export const SisterCompanies: React.FC<SisterCompaniesProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section id="companies" className="py-20 lg:py-28 bg-[#101D2B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              {t.sisterCompanies.kicker}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
            {t.sisterCompanies.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.sisterCompanies.subtitle}
          </p>
        </div>

        {/* Three Sister Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SISTER_COMPANIES_DATA.map((company) => {
            const Icon = COMPANY_ICONS[company.id] || Factory;
            const companyTrans = t.sisterCompanies.companies.find((c) =>
              c.name.toLowerCase().includes(company.id) || company.name.toLowerCase().includes(c.name.toLowerCase().slice(0, 5))
            ) || t.sisterCompanies.companies[0];

            const description = language === 'am' ? company.descriptionAm : company.description;
            const category = language === 'am' ? company.categoryAm : company.category;
            const highlights = language === 'am' ? company.highlightsAm : company.highlights;

            return (
              <div
                key={company.id}
                className="bg-[#20252B] rounded-lg p-6 sm:p-8 border border-[#C5A46D]/20 hover:border-[#C5A46D] transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-[#101D2B] text-[#C5A46D] border border-[#C5A46D]/30">
                      {company.badge}
                    </span>
                    <div className="w-11 h-11 rounded bg-[#101D2B] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Company Name */}
                  <h3 className="text-xl font-serif font-bold text-[#F7F5F0] mb-1 group-hover:text-[#C5A46D] transition-colors">
                    {company.name}
                  </h3>

                  <div className="text-xs text-[#C5A46D] font-medium mb-4">
                    {category} · {company.established}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-4 border-t border-slate-700/60">
                    {highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#C5A46D]" />
                    {language === 'am' ? 'የጌት-አስ የኢንዱስትሪ አጋር' : 'GET-AS Group Alliance'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
