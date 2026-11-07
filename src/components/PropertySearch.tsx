import React from 'react';
import { Search, RotateCcw, Home, Tag, MapPin } from 'lucide-react';
import { Language, FilterCriteria, PropertyType, PropertyPurpose, PropertyLocation } from '../types';
import { translations } from '../data/translations';

interface PropertySearchProps {
  language: Language;
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  onSearchSubmit: () => void;
  resultCount: number;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  language,
  filters,
  onFilterChange,
  onSearchSubmit,
  resultCount,
}) => {
  const t = translations[language];

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      type: e.target.value as PropertyType,
    });
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      purpose: e.target.value as PropertyPurpose,
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      location: e.target.value as PropertyLocation,
    });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchKeyword: e.target.value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      type: 'all',
      purpose: 'all',
      location: 'all',
      searchKeyword: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div id="search-bar" className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-14 mb-16">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-lg p-5 sm:p-6 lg:p-7 shadow-2xl bg-[#101D2B]/95 border border-[#C5A46D]/30 backdrop-blur-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C5A46D]/20 mb-5">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#C5A46D]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#F7F5F0]">
              {t.search.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#C5A46D] font-mono tabular-nums bg-[#20252B] px-2.5 py-1 rounded border border-[#C5A46D]/25">
              {resultCount} {t.search.resultsFound}
            </span>
            {(filters.type !== 'all' || filters.purpose !== 'all' || filters.location !== 'all' || (filters.searchKeyword && filters.searchKeyword !== '')) && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-300 hover:text-[#C5A46D] flex items-center gap-1 transition-colors"
                title={t.search.resetBtn}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.search.resetBtn}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Property Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#C5A46D]" />
              {t.search.typeLabel}
            </label>
            <select
              value={filters.type}
              onChange={handleTypeChange}
              className="w-full bg-[#20252B] text-[#F7F5F0] text-sm rounded border border-[#C5A46D]/30 px-3 py-2.5 focus:outline-none focus:border-[#C5A46D] focus:ring-1 focus:ring-[#C5A46D] transition-colors"
            >
              <option value="all">{t.search.types.all}</option>
              <option value="apartment">{t.search.types.apartment}</option>
              <option value="flat">{t.search.types.flat}</option>
              <option value="building">{t.search.types.building}</option>
              <option value="house">{t.search.types.house}</option>
              <option value="villa">{t.search.types.villa}</option>
              <option value="office">{t.search.types.office}</option>
            </select>
          </div>

          {/* 2. Purpose */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#C5A46D]" />
              {t.search.purposeLabel}
            </label>
            <select
              value={filters.purpose}
              onChange={handlePurposeChange}
              className="w-full bg-[#20252B] text-[#F7F5F0] text-sm rounded border border-[#C5A46D]/30 px-3 py-2.5 focus:outline-none focus:border-[#C5A46D] focus:ring-1 focus:ring-[#C5A46D] transition-colors"
            >
              <option value="all">{t.search.purposes.all}</option>
              <option value="sale">{t.search.purposes.sale}</option>
              <option value="rent">{t.search.purposes.rent}</option>
            </select>
          </div>

          {/* 3. Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
              {t.search.locationLabel}
            </label>
            <select
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full bg-[#20252B] text-[#F7F5F0] text-sm rounded border border-[#C5A46D]/30 px-3 py-2.5 focus:outline-none focus:border-[#C5A46D] focus:ring-1 focus:ring-[#C5A46D] transition-colors"
            >
              <option value="all">{t.search.locations.all}</option>
              <option value="kazanchis">{t.search.locations.kazanchis}</option>
              <option value="summit">{t.search.locations.summit}</option>
              <option value="addis_ababa">{t.search.locations.addis_ababa}</option>
              <option value="other">{t.search.locations.other}</option>
            </select>
          </div>

          {/* 4. Action Button */}
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#C5A46D] hover:bg-[#b3925a] text-[#101D2B] font-semibold text-sm rounded flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
            >
              <Search className="w-4 h-4" />
              <span>{t.search.searchBtn}</span>
            </button>
          </div>
        </div>

        {/* Optional text search quick filter */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={filters.searchKeyword || ''}
            onChange={handleKeywordChange}
            placeholder={language === 'am' ? 'በስም ወይም በዝርዝር ፈልግ (ለምሳሌ፡ ዊንግ 1፣ ካዛንቺስ፣ ቪላ)...' : 'Keyword search (e.g. Wing 1, Kazanchis, Villa)...'}
            className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none border-none py-1 px-1"
          />
        </div>
      </form>
    </div>
  );
};
