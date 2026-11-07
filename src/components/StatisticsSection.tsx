import React, { useState, useEffect, useRef } from 'react';
import { Building2, Home, Landmark, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface StatisticsSectionProps {
  language: Language;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ language }) => {
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const [sqmCount, setSqmCount] = useState(0);
  const [villasCount, setVillasCount] = useState(0);
  const [towersCount, setTowersCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate sqm up to 40,000
    const sqmTarget = 40000;
    const duration = 1800;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setSqmCount(Math.floor(easeProgress * sqmTarget));
      setVillasCount(Math.min(32, Math.floor(easeProgress * 32)));
      setTowersCount(Math.min(2, Math.floor(easeProgress * 2.1)));

      if (step >= steps) {
        clearInterval(timer);
        setSqmCount(40000);
        setVillasCount(32);
        setTowersCount(2);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#101D2B] border-y border-[#C5A46D]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] block mb-2">
            {t.stats.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F5F0]">
            {t.stats.heading}
          </h2>
        </div>

        {/* Verified Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1: 40,000 sqm */}
          <div className="p-8 rounded-lg bg-[#20252B] border border-[#C5A46D]/25 hover:border-[#C5A46D] transition-colors text-center shadow-lg relative group">
            <div className="w-12 h-12 rounded bg-[#101D2B] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] mx-auto mb-4 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="text-4xl sm:text-5xl font-serif font-bold text-[#C5A46D] mb-2 tabular-nums">
              {sqmCount.toLocaleString()} <span className="text-lg font-sans text-slate-300">sqm</span>
            </div>
            <h3 className="text-base font-semibold text-[#F7F5F0] mb-1">
              {t.stats.stat1.title}
            </h3>
            <p className="text-xs text-slate-400">
              {t.stats.stat1.desc}
            </p>
          </div>

          {/* Stat 2: 32 G+1 Villas */}
          <div className="p-8 rounded-lg bg-[#20252B] border border-[#C5A46D]/25 hover:border-[#C5A46D] transition-colors text-center shadow-lg relative group">
            <div className="w-12 h-12 rounded bg-[#101D2B] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] mx-auto mb-4 group-hover:scale-105 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <div className="text-4xl sm:text-5xl font-serif font-bold text-[#C5A46D] mb-2 tabular-nums">
              {villasCount} <span className="text-lg font-sans text-slate-300">{language === 'am' ? 'ቪላዎች' : 'Villas'}</span>
            </div>
            <h3 className="text-base font-semibold text-[#F7F5F0] mb-1">
              {t.stats.stat2.title}
            </h3>
            <p className="text-xs text-slate-400">
              {t.stats.stat2.desc}
            </p>
          </div>

          {/* Stat 3: 2 Delivered Towers */}
          <div className="p-8 rounded-lg bg-[#20252B] border border-[#C5A46D]/25 hover:border-[#C5A46D] transition-colors text-center shadow-lg relative group">
            <div className="w-12 h-12 rounded bg-[#101D2B] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] mx-auto mb-4 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-4xl sm:text-5xl font-serif font-bold text-[#C5A46D] mb-2 tabular-nums">
              {towersCount} <span className="text-lg font-sans text-slate-300">{language === 'am' ? 'ፎቆች' : 'Towers'}</span>
            </div>
            <h3 className="text-base font-semibold text-[#F7F5F0] mb-1">
              {t.stats.stat3.title}
            </h3>
            <p className="text-xs text-slate-400">
              {t.stats.stat3.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
