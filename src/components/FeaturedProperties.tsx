import React from 'react';
import { Bed, Bath, Maximize2, MapPin, AlertCircle, ArrowUpRight, ChefHat, Eye } from 'lucide-react';
import { Property, Language } from '../types';
import { translations } from '../data/translations';

interface FeaturedPropertiesProps {
  language: Language;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (propertyName: string) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  language,
  properties,
  onSelectProperty,
  onOpenInquiry,
}) => {
  const t = translations[language];

  return (
    <section id="properties" className="py-20 lg:py-28 bg-[#101D2B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
                {t.properties.kicker}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
              {t.properties.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {t.properties.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-xs font-mono text-slate-400 bg-[#20252B] px-3 py-1.5 rounded border border-[#C5A46D]/20">
              {properties.length} {language === 'am' ? 'ንብረቶች ቀርበዋል' : 'Listings Displayed'}
            </span>
          </div>
        </div>

        {/* Empty state if search returned no items */}
        {properties.length === 0 ? (
          <div className="glass-card rounded-lg p-12 text-center max-w-2xl mx-auto my-8 border border-[#C5A46D]/30">
            <AlertCircle className="w-10 h-10 text-[#C5A46D] mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-[#F7F5F0] mb-2">
              {language === 'am' ? 'ምንም ንብረት አልተገኘም' : 'No Properties Found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {t.search.noResults}
            </p>
            <button
              onClick={() => onOpenInquiry('General Property Search Inquiry')}
              className="px-5 py-2.5 text-xs font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-all"
            >
              {language === 'am' ? 'የሽያጭ ቡድናችንን ያነጋግሩ' : 'Contact Sales Specialist'}
            </button>
          </div>
        ) : (
          /* Property Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              const title = language === 'am' ? property.nameAm : property.name;
              const location = language === 'am' ? property.locationAm : property.location;
              const priceDisplay = language === 'am' ? property.priceDisplayAm : property.priceDisplay;

              return (
                <article
                  key={property.id}
                  className="group relative bg-[#20252B] rounded-lg overflow-hidden border border-[#C5A46D]/20 hover:border-[#C5A46D]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Property Image & Status Badge */}
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <img
                        src={property.image}
                        alt={`${title} in ${location}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#20252B] via-transparent to-black/30" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        {/* Status Badge */}
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded uppercase tracking-wider ${
                          property.purpose === 'sale'
                            ? 'bg-[#C5A46D] text-[#101D2B]'
                            : 'bg-sky-900/90 text-sky-200 border border-sky-500/30'
                        }`}>
                          {property.purpose === 'sale' ? t.properties.forSale : t.properties.forRent}
                        </span>

                        {/* Property Type Badge */}
                        <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#101D2B]/85 text-slate-200 rounded border border-slate-700 backdrop-blur-sm">
                          {property.type}
                        </span>
                      </div>

                      {/* Flagged Verification Alert if applicable (e.g. Wing 1 Type 1) */}
                      {!property.priceVerified && (
                        <div className="absolute bottom-3 left-3 right-3 bg-[#101D2B]/90 border border-amber-500/40 rounded px-2.5 py-1.5 flex items-center gap-2 backdrop-blur-sm">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="text-[10px] text-amber-200 leading-tight">
                            {property.priceNote || t.properties.verificationAlert}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Property Info Content */}
                    <div className="p-6">
                      {/* Location indicator */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                        <span className="truncate">{location}</span>
                      </div>

                      {/* Property Name */}
                      <h3 className="text-xl font-serif font-bold text-[#F7F5F0] mb-3 group-hover:text-[#C5A46D] transition-colors">
                        {title}
                      </h3>

                      {/* Price Row */}
                      <div className="flex items-baseline gap-2 mb-5">
                        <span className="text-2xl font-serif font-bold text-[#C5A46D]">
                          {priceDisplay}
                        </span>
                        {!property.priceVerified && (
                          <span className="text-[10px] font-mono text-slate-400">
                            {language === 'am' ? '(ማረጋገጫ የሚሻ)' : '(Subject to Verification)'}
                          </span>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-700/60 text-slate-300 text-xs mb-4">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1.5" title={`${property.bedrooms} ${t.properties.beds}`}>
                            <Bed className="w-3.5 h-3.5 text-[#C5A46D]" />
                            <span>{property.bedrooms} {t.properties.beds}</span>
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center gap-1.5" title={`${property.bathrooms} ${t.properties.baths}`}>
                            <Bath className="w-3.5 h-3.5 text-[#C5A46D]" />
                            <span>{property.bathrooms} {t.properties.baths}</span>
                          </div>
                        )}
                        {property.kitchen > 0 && (
                          <div className="flex items-center gap-1.5" title={`${property.kitchen} ${t.properties.kitchen}`}>
                            <ChefHat className="w-3.5 h-3.5 text-[#C5A46D]" />
                            <span>{property.kitchen} {t.properties.kitchen}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5" title={`${property.sizeSqft} ${t.properties.sqft}`}>
                          <Maximize2 className="w-3.5 h-3.5 text-[#C5A46D]" />
                          <span>
                            {property.sizeSqft.toLocaleString()} {t.properties.sqft}
                            {!property.sizeVerified && ' *'}
                          </span>
                        </div>
                      </div>

                      {/* Note for flagged size */}
                      {!property.sizeVerified && property.sizeNote && (
                        <p className="text-[11px] text-slate-400 italic mb-4">
                          * {language === 'am' ? property.sizeNoteAm : property.sizeNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="flex-1 py-2.5 px-3 text-xs font-semibold rounded bg-[#C5A46D] hover:bg-[#b3925a] text-[#101D2B] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.properties.viewDetails}</span>
                    </button>
                    <button
                      onClick={() => onOpenInquiry(property.name)}
                      className="py-2.5 px-3 text-xs font-semibold rounded border border-[#C5A46D]/40 text-[#F7F5F0] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors"
                      title={language === 'am' ? 'ጥያቄ ላክ' : 'Inquire'}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
