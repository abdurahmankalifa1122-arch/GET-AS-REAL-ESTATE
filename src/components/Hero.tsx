import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown, MapPin, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { IMAGES } from '../assets/images';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onStoryClick: () => void;
}

interface SlideItem {
  id: number;
  titleKey: string;
  locationKey: string;
  image: string;
  alt: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    titleKey: 'Luxury Apartments',
    locationKey: 'Kazanchis, Addis Ababa',
    image: IMAGES.heroKazanchis,
    alt: 'Luxury architectural high-rise apartment tower in Kazanchis, Addis Ababa',
  },
  {
    id: 2,
    titleKey: 'Family Villas',
    locationKey: 'Summit 72, Addis Ababa',
    image: IMAGES.summit72Villas,
    alt: 'Master-planned G+1 luxury family villas in Summit 72, Addis Ababa',
  },
  {
    id: 3,
    titleKey: 'Commercial Buildings',
    locationKey: 'Addis Ababa Central District',
    image: IMAGES.commercialBuilding,
    alt: 'Prestigious commercial Grade-A tower in Addis Ababa business center',
  },
];

export const Hero: React.FC<HeroProps> = ({ language, onExploreClick, onStoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = translations[language];

  // Auto-play carousel every 6 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slideContent = t.hero.slides[currentSlide] || t.hero.slides[0];

  return (
    <section
      id="home"
      aria-label="GET-AS Real Estate Hero Showcase"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#101D2B]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background carousel images with measured scrim */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 -z-10 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover object-center transform transition-transform duration-[8000ms] ease-out scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Measured multi-layer scrim for pristine contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#101D2B]/60 to-[#101D2B]/45" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#101D2B]/30 to-[#101D2B]/85" />
        </div>
      ))}

      {/* Main hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 w-full">
        <div className="max-w-3xl">
          {/* Small architectural label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-[#C5A46D]/40 bg-[#101D2B]/75 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="text-[11px] md:text-xs font-semibold tracking-widest text-[#F7F5F0] uppercase">
              {t.hero.label}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F7F5F0] leading-[1.15] tracking-tight mb-6 text-balance">
            {t.hero.headline}
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg md:text-xl text-[#F7F5F0]/85 font-light leading-relaxed max-w-2xl mb-8">
            {t.hero.supporting}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 text-sm font-semibold text-[#101D2B] bg-[#C5A46D] hover:bg-[#b3925a] rounded transition-all shadow-lg hover:shadow-xl active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
            >
              {t.hero.primaryBtn}
            </button>
            <button
              onClick={onStoryClick}
              className="px-6 py-3.5 text-sm font-semibold text-[#F7F5F0] bg-transparent hover:bg-[#F7F5F0]/10 border border-[#F7F5F0]/40 hover:border-[#C5A46D] rounded transition-all backdrop-blur-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
            >
              {t.hero.secondaryBtn}
            </button>
          </div>
        </div>

        {/* Carousel slide indicators and information box */}
        <div className="mt-12 lg:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-[#C5A46D]/20 pt-6">
          {/* Active slide metadata */}
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded bg-[#101D2B]/80 border border-[#C5A46D]/30 backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-[#C5A46D]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C5A46D] font-medium">
                {slideContent.title}
              </div>
              <div className="text-sm font-semibold text-[#F7F5F0]">
                {slideContent.location}
              </div>
              <div className="text-xs text-slate-300 hidden sm:block max-w-sm mt-0.5">
                {slideContent.desc}
              </div>
            </div>
          </div>

          {/* Slide controls & indicators */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            {/* Slide index count */}
            <span className="text-xs font-mono text-slate-300">
              0{currentSlide + 1} <span className="text-[#C5A46D]">/</span> 0{SLIDES.length}
            </span>

            {/* Slide dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 transition-all rounded-full ${
                    i === currentSlide ? 'w-8 bg-[#C5A46D]' : 'w-2 bg-slate-500/60 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="p-2 rounded border border-[#C5A46D]/30 bg-[#101D2B]/70 text-[#F7F5F0] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="p-2 rounded border border-[#C5A46D]/30 bg-[#101D2B]/70 text-[#F7F5F0] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll down indicator */}
      <a
        href="#search-bar"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[#C5A46D] hover:text-[#F7F5F0] transition-colors hidden md:flex flex-col items-center gap-1 opacity-75 hover:opacity-100"
        aria-label="Scroll to search properties"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
