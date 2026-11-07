import React, { useState, useEffect } from 'react';
import { X, Bed, Bath, ChefHat, Maximize2, MapPin, Check, AlertCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import { Property, Language } from '../types';
import { translations } from '../data/translations';

interface PropertyModalProps {
  property: Property | null;
  language: Language;
  onClose: () => void;
  onInquireSubmit: (propertyName: string, contactData: { name: string; phone: string; email: string; note: string }) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  language,
  onClose,
  onInquireSubmit,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formNote, setFormNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setActiveImageIdx(0);
    setSubmitted(false);
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const t = translations[language];
  const title = language === 'am' ? property.nameAm : property.name;
  const location = language === 'am' ? property.locationAm : property.location;
  const description = language === 'am' ? property.descriptionAm : property.description;
  const features = language === 'am' ? property.featuresAm : property.features;
  const priceDisplay = language === 'am' ? property.priceDisplayAm : property.priceDisplay;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    onInquireSubmit(property.name, {
      name: formName,
      phone: formPhone,
      email: formEmail,
      note: formNote,
    });
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-5xl bg-[#101D2B] border border-[#C5A46D]/40 rounded-lg shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#C5A46D]/20 bg-[#20252B]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C5A46D] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
              <span>·</span>
              <span className="uppercase font-mono">{property.purpose === 'sale' ? t.properties.forSale : t.properties.forRent}</span>
            </div>
            <h2 id="property-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-[#F7F5F0]">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label={t.properties.modal.close}
            className="p-2 rounded border border-slate-700 hover:border-[#C5A46D] text-slate-300 hover:text-[#C5A46D] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-md overflow-hidden bg-slate-900 border border-[#C5A46D]/20">
              <img
                src={property.gallery[activeImageIdx] || property.image}
                alt={`${title} photo ${activeImageIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#101D2B]/85 text-xs font-mono text-slate-200 border border-[#C5A46D]/30">
                {activeImageIdx + 1} / {property.gallery.length}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {property.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {property.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-16 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activeImageIdx ? 'border-[#C5A46D] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded bg-[#20252B] border border-[#C5A46D]/25">
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Price</span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#C5A46D] block">
                {priceDisplay}
              </span>
              {!property.priceVerified && (
                <span className="text-[10px] text-amber-300 block">Flagged for verification</span>
              )}
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">{t.properties.modal.specifications}</span>
              <div className="flex items-center gap-2 text-sm text-[#F7F5F0]">
                {property.bedrooms > 0 && <span>{property.bedrooms} {t.properties.beds}</span>}
                {property.bathrooms > 0 && <span>· {property.bathrooms} {t.properties.baths}</span>}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">{t.properties.sqft}</span>
              <span className="text-sm font-semibold text-[#F7F5F0]">
                {property.sizeSqft.toLocaleString()} Sqft
              </span>
              {!property.sizeVerified && (
                <span className="text-[10px] text-amber-300 block">* Supplied figure</span>
              )}
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Balconies & Kitchen</span>
              <span className="text-sm font-semibold text-[#F7F5F0]">
                {property.balconies} Balconies · {property.kitchen} Kitchen
              </span>
            </div>
          </div>

          {/* Verification Notice Banner */}
          {(!property.priceVerified || !property.sizeVerified) && (
            <div className="p-4 rounded bg-amber-950/40 border border-amber-600/40 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold block mb-0.5">
                  {language === 'am' ? 'የማረጋገጫ ማስታወሻ' : 'Official Listing Verification Notice'}
                </span>
                {property.priceNote && <p className="mb-1">{language === 'am' ? property.priceNoteAm : property.priceNote}</p>}
                {property.sizeNote && <p>{language === 'am' ? property.sizeNoteAm : property.sizeNote}</p>}
              </div>
            </div>
          )}

          {/* Description & Features Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#F7F5F0]">
                {language === 'am' ? 'የንብረቱ ዝርዝር መግለጫ' : 'Property Overview'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {description}
              </p>

              <div className="pt-4">
                <h4 className="text-sm font-bold text-[#C5A46D] uppercase tracking-wider mb-3">
                  {t.properties.modal.featuresTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-[#C5A46D] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-5 bg-[#20252B] p-5 rounded-lg border border-[#C5A46D]/30">
              <h3 className="text-base font-serif font-bold text-[#F7F5F0] mb-1">
                {t.properties.modal.inquireTitle}
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                {t.properties.modal.inquireDesc}
              </p>

              {submitted ? (
                <div className="p-4 rounded bg-[#101D2B] border border-[#C5A46D] text-center space-y-2">
                  <Check className="w-8 h-8 text-[#C5A46D] mx-auto" />
                  <h4 className="text-sm font-bold text-[#F7F5F0]">
                    {language === 'am' ? 'ጥያቄዎ ደርሶናል' : 'Inquiry Submitted'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {language === 'am'
                      ? 'የካዛንቺስ የሽያጭ ቡድናችን በቅርቡ ያነጋግርዎታል።'
                      : 'Our Kazanchis sales advisory team will contact you shortly.'}
                  </p>
                  <a
                    href="tel:+251983018080"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A46D] font-semibold underline mt-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +251-983-018080
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {t.contact.form.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={t.contact.form.fullNamePlaceholder}
                      className="w-full bg-[#101D2B] text-xs text-white rounded border border-slate-700 focus:border-[#C5A46D] px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {t.contact.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+251 9... / 09..."
                      className="w-full bg-[#101D2B] text-xs text-white rounded border border-slate-700 focus:border-[#C5A46D] px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#101D2B] text-xs text-white rounded border border-slate-700 focus:border-[#C5A46D] px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {language === 'am' ? 'ተጨማሪ ማስታወሻ' : 'Specific Inquiries / Viewing Preference'}
                    </label>
                    <textarea
                      rows={2}
                      value={formNote}
                      onChange={(e) => setFormNote(e.target.value)}
                      placeholder={language === 'am' ? 'የጉብኝት ቀን ወይም ጥያቄዎን ይጻፉ...' : 'Preferred date for inspection or questions...'}
                      className="w-full bg-[#101D2B] text-xs text-white rounded border border-slate-700 focus:border-[#C5A46D] px-3 py-2 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#C5A46D] hover:bg-[#b3925a] text-[#101D2B] font-semibold text-xs rounded transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.properties.modal.submitInquiry}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#C5A46D]/20 bg-[#20252B] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
              +251-983-018080
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C5A46D]" />
              john.andu89@gmail.com
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded border border-slate-600 text-slate-300 hover:text-white hover:border-[#C5A46D] transition-colors"
          >
            {t.properties.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
