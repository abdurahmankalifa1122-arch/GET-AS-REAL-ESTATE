import { Property, FilterCriteria } from '../types';

/**
 * Pure filtering function for property listings.
 * Strictly decoupled from React components for deterministic unit testing.
 */
export function filterProperties(properties: Property[], criteria: FilterCriteria): Property[] {
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  return properties.filter((property) => {
    // 1. Property Type filter
    if (criteria.type && criteria.type !== 'all') {
      if (property.type !== criteria.type) {
        return false;
      }
    }

    // 2. Purpose filter (sale / rent)
    if (criteria.purpose && criteria.purpose !== 'all') {
      if (property.purpose !== criteria.purpose) {
        return false;
      }
    }

    // 3. Location filter
    if (criteria.location && criteria.location !== 'all') {
      if (criteria.location === 'addis_ababa') {
        // Addis Ababa covers Kazanchis, Summit, and city-wide listings
        const isAddis = ['kazanchis', 'summit', 'addis_ababa'].includes(property.locationKey);
        if (!isAddis) return false;
      } else {
        if (property.locationKey !== criteria.location) {
          return false;
        }
      }
    }

    // 4. Keyword search (optional)
    if (criteria.searchKeyword && criteria.searchKeyword.trim() !== '') {
      const query = criteria.searchKeyword.toLowerCase().trim();
      const matchEn =
        property.name.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query);
      const matchAm =
        property.nameAm.toLowerCase().includes(query) ||
        property.locationAm.toLowerCase().includes(query) ||
        property.descriptionAm.toLowerCase().includes(query);

      if (!matchEn && !matchAm) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Format currency or price string cleanly
 */
export function formatPrice(price: string, language: 'en' | 'am'): string {
  if (!price) return language === 'am' ? 'ለዋጋ ያነጋግሩን' : 'Contact for Price';
  return price;
}
