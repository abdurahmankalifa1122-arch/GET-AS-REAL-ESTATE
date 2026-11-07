import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { Language, ContactFormData } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  language: Language;
  prefilledInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language, prefilledInterest }) => {
  const t = translations[language];

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyInterest: prefilledInterest || 'Wing 1 Type 1 Apartment (Kazanchis)',
    message: '',
    preferredContact: 'phone',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Update interest if prop changed
  React.useEffect(() => {
    if (prefilledInterest) {
      setFormData((prev) => ({ ...prev, propertyInterest: prefilledInterest }));
    }
  }, [prefilledInterest]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = t.contact.form.validationErrors.name;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = t.contact.form.validationErrors.phone;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = t.contact.form.validationErrors.email;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = t.contact.form.validationErrors.message;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic asynchronous client-side validation & dispatch
    setTimeout(() => {
      const generatedRef = `GETAS-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyInterest: 'Wing 1 Type 1 Apartment (Kazanchis)',
      message: '',
      preferredContact: 'phone',
    });
    setErrors({});
    setSubmissionSuccess(false);
  };

  const whatsAppUrl = `https://wa.me/251983018080?text=${encodeURIComponent(
    `Hello GET-AS Real Estate, I am interested in: ${formData.propertyInterest || 'Luxury Properties in Addis Ababa'}`
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#101D2B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              {t.contact.kicker}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
            {t.contact.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contacts & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#20252B] p-6 sm:p-8 rounded-lg border border-[#C5A46D]/25 shadow-xl space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#F7F5F0]">
                {t.contact.companyName}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-[#101D2B] text-[#C5A46D] shrink-0 border border-[#C5A46D]/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">{t.contact.addressTitle}</span>
                  <p className="text-sm font-semibold text-[#F7F5F0]">
                    {t.contact.address}
                  </p>
                </div>
              </div>

              {/* Phones with Click to Call */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-[#101D2B] text-[#C5A46D] shrink-0 border border-[#C5A46D]/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block mb-0.5">{t.contact.phoneTitle}</span>
                  <div className="flex flex-col gap-1 text-sm font-mono text-[#F7F5F0]">
                    <a href="tel:+251983018080" className="hover:text-[#C5A46D] transition-colors flex items-center gap-2">
                      <span>+251-983-018080</span>
                      <span className="text-[10px] text-slate-400 font-sans">({language === 'am' ? 'ዋና መስመር' : 'Primary'})</span>
                    </a>
                    <a href="tel:+251942654444" className="hover:text-[#C5A46D] transition-colors flex items-center gap-2">
                      <span>+251-942-654444</span>
                      <span className="text-[10px] text-slate-400 font-sans">({language === 'am' ? 'ሽያጭ' : 'Sales'})</span>
                    </a>
                    <a href="tel:+251932312727" className="hover:text-[#C5A46D] transition-colors flex items-center gap-2">
                      <span>+251-932-312727</span>
                      <span className="text-[10px] text-slate-400 font-sans">({language === 'am' ? 'ኪራይ' : 'Leasing'})</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-[#101D2B] text-[#C5A46D] shrink-0 border border-[#C5A46D]/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">{t.contact.emailTitle}</span>
                  <a
                    href="mailto:john.andu89@gmail.com"
                    className="text-sm font-mono text-[#F7F5F0] hover:text-[#C5A46D] transition-colors"
                  >
                    john.andu89@gmail.com
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-4 border-t border-slate-700/60">
                <Clock className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">
                  {t.contact.hours}
                </span>
              </div>

              {/* Instant Messenger & Direct Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contact.whatsappBtn}</span>
                </a>
                <a
                  href="tel:+251983018080"
                  className="py-2.5 px-3 rounded bg-[#C5A46D] hover:bg-[#b3925a] text-[#101D2B] font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.contact.callNow}</span>
                </a>
              </div>
            </div>

            {/* Google Maps Location Preview */}
            <div className="rounded-lg overflow-hidden border border-[#C5A46D]/30 shadow-xl bg-[#20252B]">
              <div className="p-3 bg-[#101D2B] border-b border-[#C5A46D]/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                  Kazanchis, Addis Ababa, Ethiopia
                </span>
                <a
                  href="https://www.google.com/maps/search/Kazanchis+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A46D] hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <iframe
                title="GET-AS Real Estate Location Map - Kazanchis Addis Ababa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15761.547192931448!2d38.7610022!3d9.0195535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f269a4c5f9%3A0xb36b3fcf5095d9a!2sKazanchis%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Column: Verified Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#20252B] p-6 sm:p-8 lg:p-10 rounded-lg border border-[#C5A46D]/30 shadow-2xl">
              {submissionSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#F7F5F0]">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {t.contact.form.successMsg}
                  </p>
                  <div className="p-4 rounded bg-[#101D2B] border border-[#C5A46D]/30 inline-block font-mono text-sm text-[#C5A46D] my-2">
                    {t.contact.form.successRef}: <span className="font-bold text-white">{referenceId}</span>
                  </div>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t.contact.whatsappBtn}</span>
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 border border-slate-600 hover:border-[#C5A46D] text-slate-300 hover:text-white rounded text-xs font-semibold transition-colors"
                    >
                      {t.contact.form.sendAnother}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h3 className="text-xl font-serif font-bold text-[#F7F5F0] mb-2">
                    {t.contact.form.title}
                  </h3>

                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.contact.form.fullName} *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.contact.form.fullNamePlaceholder}
                        className={`w-full bg-[#101D2B] text-sm text-[#F7F5F0] rounded border px-3.5 py-2.5 outline-none transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-[#C5A46D]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.contact.form.phone} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.contact.form.phonePlaceholder}
                        className={`w-full bg-[#101D2B] text-sm text-[#F7F5F0] rounded border px-3.5 py-2.5 outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-[#C5A46D]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Property Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.form.emailPlaceholder}
                        className={`w-full bg-[#101D2B] text-sm text-[#F7F5F0] rounded border px-3.5 py-2.5 outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-slate-700 focus:border-[#C5A46D]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.contact.form.interest}
                      </label>
                      <select
                        value={formData.propertyInterest}
                        onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                        className="w-full bg-[#101D2B] text-sm text-[#F7F5F0] rounded border border-slate-700 focus:border-[#C5A46D] px-3.5 py-2.5 outline-none"
                      >
                        {t.contact.form.interestOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.preferredContactLabel}
                    </label>
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={() => setFormData({ ...formData, preferredContact: 'phone' })}
                          className="text-[#C5A46D] focus:ring-[#C5A46D]"
                        />
                        <span>{language === 'am' ? 'በስልክ ጥሪ' : 'Phone Call'}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="whatsapp"
                          checked={formData.preferredContact === 'whatsapp'}
                          onChange={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
                          className="text-[#C5A46D] focus:ring-[#C5A46D]"
                        />
                        <span>WhatsApp</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={() => setFormData({ ...formData, preferredContact: 'email' })}
                          className="text-[#C5A46D] focus:ring-[#C5A46D]"
                        />
                        <span>{language === 'am' ? 'በኢሜይል' : 'Email'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className={`w-full bg-[#101D2B] text-sm text-[#F7F5F0] rounded border px-3.5 py-2.5 outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-slate-700 focus:border-[#C5A46D]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#C5A46D] hover:bg-[#b3925a] disabled:bg-slate-600 text-[#101D2B] font-semibold text-sm rounded flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.contact.form.sending : t.contact.form.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
