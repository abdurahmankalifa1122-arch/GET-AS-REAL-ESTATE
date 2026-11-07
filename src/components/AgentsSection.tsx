import React from 'react';
import { Phone, Mail, MessageSquare, MapPin, UserCheck, Shield } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AgentsSectionProps {
  language: Language;
  onDirectConsult: (agentName: string) => void;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ language, onDirectConsult }) => {
  const t = translations[language];

  return (
    <section id="agents" className="py-20 lg:py-28 bg-[#101D2B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              {t.agents.kicker}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F5F0] tracking-tight mb-4 text-balance">
            {t.agents.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.agents.subtitle}
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.agents.members.map((member, idx) => {
            const rawPhone = member.phone.replace(/[^0-9]/g, '');

            return (
              <div
                key={idx}
                className="bg-[#20252B] rounded-lg p-6 sm:p-8 border border-[#C5A46D]/20 hover:border-[#C5A46D] transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top Office Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-[#101D2B] text-[#C5A46D] border border-[#C5A46D]/30">
                      {member.office}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#101D2B] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D]">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#F7F5F0] mb-1 group-hover:text-[#C5A46D] transition-colors">
                    {member.name}
                  </h3>

                  <div className="text-xs font-medium text-[#C5A46D] mb-4">
                    {member.role}
                  </div>

                  <div className="p-3 rounded bg-[#101D2B] border border-slate-800 text-xs text-slate-300 mb-6">
                    <span className="text-[11px] text-slate-400 block mb-0.5">
                      {language === 'am' ? 'የስራ ዘርፍ' : 'Specialization'}
                    </span>
                    {member.specialty}
                  </div>

                  {/* Direct Contact Links */}
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <a
                      href={`tel:${rawPhone}`}
                      className="flex items-center gap-2 hover:text-[#C5A46D] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 hover:text-[#C5A46D] transition-colors truncate"
                    >
                      <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0" />
                      <span>Kazanchis, Addis Ababa</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => onDirectConsult(member.name)}
                    className="w-full py-2.5 px-4 text-xs font-semibold rounded bg-[#101D2B] hover:bg-[#C5A46D] text-[#F7F5F0] hover:text-[#101D2B] border border-[#C5A46D]/30 hover:border-[#C5A46D] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === 'am' ? 'ቀጥታ ያማክሩ' : 'Direct Consultation'}</span>
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
