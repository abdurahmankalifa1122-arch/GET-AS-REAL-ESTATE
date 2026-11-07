export type Language = 'en' | 'am';

export type PropertyType = 'all' | 'apartment' | 'flat' | 'building' | 'house' | 'villa' | 'office';
export type PropertyPurpose = 'all' | 'sale' | 'rent';
export type PropertyLocation = 'all' | 'kazanchis' | 'summit' | 'addis_ababa' | 'other';

export interface Property {
  id: string;
  name: string;
  nameAm: string;
  location: string;
  locationAm: string;
  locationKey: 'kazanchis' | 'summit' | 'addis_ababa' | 'other';
  type: 'apartment' | 'flat' | 'building' | 'house' | 'villa' | 'office';
  purpose: 'sale' | 'rent';
  priceDisplay: string;
  priceDisplayAm: string;
  priceVerified: boolean;
  priceNote?: string;
  priceNoteAm?: string;
  sizeSqft: number;
  sizeVerified: boolean;
  sizeNote?: string;
  sizeNoteAm?: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  balconies: number;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  descriptionAm: string;
  features: string[];
  featuresAm: string[];
}

export interface FilterCriteria {
  type: PropertyType;
  purpose: PropertyPurpose;
  location: PropertyLocation;
  searchKeyword?: string;
}

export interface SisterCompany {
  id: string;
  name: string;
  established?: string;
  category: string;
  categoryAm: string;
  description: string;
  descriptionAm: string;
  highlights: string[];
  highlightsAm: string[];
  badge: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  message: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
}
