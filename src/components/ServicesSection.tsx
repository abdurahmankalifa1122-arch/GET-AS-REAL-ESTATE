import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { IMAGES } from '../assets/images';

interface ServicesSectionProps {
  language: Language;
  onSelectService: (serviceName: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  dev: IMAGES.propertyCraft,
  sales: IMAGES.wing1Interior,
  rental: IMAGES.commercialBuilding,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, onSelectService }) => {
  const t = translations[language];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#20252B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              {t.services.kicker}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
            {t.services.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Three Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.services.cards.map((card) => {
            const image = SERVICE_IMAGES[card.id] || SERVICE_IMAGES.dev;
            return (
              <div
                key={card.id}
                className="group relative bg-[#101D2B] rounded-lg overflow-hidden border border-[#C5A46D]/20 hover:border-[#C5A46D]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#101D2B]/40 to-transparent" />
                    
                    {/* Quiet editorial tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#101D2B]/85 text-[#C5A46D] rounded border border-[#C5A46D]/30 backdrop-blur-sm">
                        {card.id === 'dev' ? '01' : card.id === 'sales' ? '02' : '03'} · {card.id.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-[#F7F5F0] mb-3 group-hover:text-[#C5A46D] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {card.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-4 border-t border-slate-800">
                      {card.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => onSelectService(card.title)}
                    className="w-full py-2.5 px-4 text-xs font-semibold rounded border border-[#C5A46D]/40 text-[#F7F5F0] hover:bg-[#C5A46D] hover:text-[#101D2B] transition-all flex items-center justify-center gap-2 group-hover:border-[#C5A46D]"
                  >
                    <span>{language === 'am' ? 'ስለ አገልግሎቱ ይጠይቁ' : 'Inquire on This Service'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
