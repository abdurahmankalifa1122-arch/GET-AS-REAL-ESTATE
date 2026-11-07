import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertySearch } from './components/PropertySearch';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PropertyModal } from './components/PropertyModal';
import { Summit72Section } from './components/Summit72Section';
import { HowItWorks } from './components/HowItWorks';
import { SisterCompanies } from './components/SisterCompanies';
import { StatisticsSection } from './components/StatisticsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AgentsSection } from './components/AgentsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { Language, FilterCriteria, Property } from './types';
import { PROPERTIES_DATA } from './data/properties';
import { filterProperties } from './utils/filter';

export default function App() {
  // 1. Language state with local storage persistence
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('getas_lang');
      return saved === 'am' ? 'am' : 'en';
    } catch {
      return 'en';
    }
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('getas_lang', lang);
    } catch {
      // ignore
    }
  };

  // 2. Search & filter state
  const [filters, setFilters] = useState<FilterCriteria>({
    type: 'all',
    purpose: 'all',
    location: 'all',
    searchKeyword: '',
  });

  // 3. Modals and active selections
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [prefilledInterest, setPrefilledInterest] = useState<string>('Wing 1 Type 1 Apartment (Kazanchis)');

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return filterProperties(PROPERTIES_DATA, filters);
  }, [filters]);

  // Smooth navigation helper
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger search view
  const handleSearchSubmit = () => {
    handleNavigate('properties');
  };

  // Open property details modal
  const handleOpenPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  // Open inquiry on contact section
  const handleOpenInquiry = (propertyName: string) => {
    setPrefilledInterest(propertyName);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#101D2B] text-slate-100 font-sans selection:bg-[#C5A46D] selection:text-[#101D2B]">
      {/* 1. Fixed Luxury Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main>
        {/* 2. Full-Screen Architectural Hero Section */}
        <Hero
          language={language}
          onExploreClick={() => handleNavigate('properties')}
          onStoryClick={() => handleNavigate('about')}
        />

        {/* 3. Property Search Panel (positioned over / below hero) */}
        <PropertySearch
          language={language}
          filters={filters}
          onFilterChange={setFilters}
          onSearchSubmit={handleSearchSubmit}
          resultCount={filteredProperties.length}
        />

        {/* 4. About GET-AS Real Estate Section */}
        <AboutSection
          language={language}
          onExplorePortfolio={() => handleNavigate('properties')}
        />

        {/* 5. Verified Company Statistics Section */}
        <StatisticsSection language={language} />

        {/* 6. Featured Properties Showcase */}
        <FeaturedProperties
          language={language}
          properties={filteredProperties}
          onSelectProperty={handleOpenPropertyDetails}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 7. Summit 72 Flagship Development Editorial */}
        <Summit72Section
          language={language}
          onInquireSummit={() => handleOpenInquiry('Summit 72 Luxury G+1 Villa')}
        />

        {/* 8. Our Services (Development, Sales, Rental) */}
        <ServicesSection
          language={language}
          onSelectService={(serviceName) => handleOpenInquiry(`Service: ${serviceName}`)}
        />

        {/* 9. Acquisition Process: How It Works */}
        <HowItWorks
          language={language}
          onConsultationClick={() => handleOpenInquiry('Initial Acquisition Consultation')}
        />

        {/* 10. Sister Companies (Dugda, Habesha, Global Paint) */}
        <SisterCompanies language={language} />

        {/* 11. Testimonials & Homeowner Commitment */}
        <TestimonialsSection
          language={language}
          onShareExperience={() => handleOpenInquiry('Homeowner Experience Submission')}
        />

        {/* 12. Our Agents / Property Advisors */}
        <AgentsSection
          language={language}
          onDirectConsult={(agentName) => handleOpenInquiry(`Consultation with ${agentName}`)}
        />

        {/* 13. Direct Contact & Validated Inquiry Form */}
        <ContactSection
          language={language}
          prefilledInterest={prefilledInterest}
        />
      </main>

      {/* 14. Luxury Dark Navy Footer with Legal Dialogs */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
      />

      {/* 15. Property Details Interactive Modal */}
      <PropertyModal
        property={selectedProperty}
        language={language}
        onClose={() => setSelectedProperty(null)}
        onInquireSubmit={(propertyName) => {
          setSelectedProperty(null);
          handleOpenInquiry(propertyName);
        }}
      />
    </div>
  );
}
