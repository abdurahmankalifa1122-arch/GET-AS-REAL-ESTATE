import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProperties } from './filter';
import { Property, FilterCriteria } from '../types';

const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Wing 1 Type 1',
    nameAm: 'ዊንግ 1 ታይፕ 1',
    location: 'Kazanchis, Addis Ababa',
    locationAm: 'ካዛንቺስ፣ አዲስ አበባ',
    locationKey: 'kazanchis',
    type: 'apartment',
    purpose: 'sale',
    priceDisplay: '$990,000',
    priceDisplayAm: '$990,000',
    priceVerified: false,
    sizeSqft: 115,
    sizeVerified: false,
    bedrooms: 2,
    bathrooms: 2,
    kitchen: 1,
    balconies: 2,
    featured: true,
    image: '/test.jpg',
    gallery: ['/test.jpg'],
    description: 'Luxury apartment in Kazanchis',
    descriptionAm: 'የቅንጦት አፓርታማ በካዛንቺስ',
    features: ['Balcony', 'Kitchen'],
    featuresAm: ['በረንዳ', 'ወጥ ቤት'],
  },
  {
    id: 'prop-2',
    name: 'Summit 72 Villa',
    nameAm: 'ሰሚት 72 ቪላ',
    location: 'Summit 72, Addis Ababa',
    locationAm: 'ሰሚት 72፣ አዲስ አበባ',
    locationKey: 'summit',
    type: 'villa',
    purpose: 'sale',
    priceDisplay: 'Contact for Price',
    priceDisplayAm: 'ለዋጋ ያነጋግሩን',
    priceVerified: true,
    sizeSqft: 3850,
    sizeVerified: true,
    bedrooms: 4,
    bathrooms: 4,
    kitchen: 1,
    balconies: 3,
    featured: true,
    image: '/test2.jpg',
    gallery: ['/test2.jpg'],
    description: 'Spacious G+1 villa',
    descriptionAm: 'ሰፊ ጂ+1 ቪላ',
    features: ['Garden', 'Parking'],
    featuresAm: ['አትክልት', 'መኪና ማቆሚያ'],
  },
  {
    id: 'prop-3',
    name: 'Commercial Office Tower',
    nameAm: 'የንግድ ቢሮ ሕንፃ',
    location: 'Kazanchis Business District, Addis Ababa',
    locationAm: 'ካዛንቺስ የንግድ ማዕከል፣ አዲስ አበባ',
    locationKey: 'kazanchis',
    type: 'office',
    purpose: 'rent',
    priceDisplay: 'Contact for Price',
    priceDisplayAm: 'ለዋጋ ያነጋግሩን',
    priceVerified: true,
    sizeSqft: 2500,
    sizeVerified: true,
    bedrooms: 0,
    bathrooms: 4,
    kitchen: 1,
    balconies: 1,
    featured: false,
    image: '/test3.jpg',
    gallery: ['/test3.jpg'],
    description: 'Corporate office space for rent',
    descriptionAm: 'የቢሮ ቦታ ለኪራይ',
    features: ['Elevators', 'Security'],
    featuresAm: ['ሊፍት', 'ጥበቃ'],
  },
];

test('filterProperties returns all properties when criteria is empty or set to "all"', () => {
  const criteria: FilterCriteria = {
    type: 'all',
    purpose: 'all',
    location: 'all',
  };
  const results = filterProperties(mockProperties, criteria);
  assert.equal(results.length, 3);
});

test('filterProperties filters by type correctly', () => {
  const criteria: FilterCriteria = {
    type: 'apartment',
    purpose: 'all',
    location: 'all',
  };
  const results = filterProperties(mockProperties, criteria);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'prop-1');
});

test('filterProperties filters by purpose correctly (sale vs rent)', () => {
  const rentCriteria: FilterCriteria = {
    type: 'all',
    purpose: 'rent',
    location: 'all',
  };
  const rentResults = filterProperties(mockProperties, rentCriteria);
  assert.equal(rentResults.length, 1);
  assert.equal(rentResults[0].id, 'prop-3');

  const saleCriteria: FilterCriteria = {
    type: 'all',
    purpose: 'sale',
    location: 'all',
  };
  const saleResults = filterProperties(mockProperties, saleCriteria);
  assert.equal(saleResults.length, 2);
});

test('filterProperties filters by location correctly', () => {
  const summitCriteria: FilterCriteria = {
    type: 'all',
    purpose: 'all',
    location: 'summit',
  };
  const summitResults = filterProperties(mockProperties, summitCriteria);
  assert.equal(summitResults.length, 1);
  assert.equal(summitResults[0].id, 'prop-2');

  const addisCriteria: FilterCriteria = {
    type: 'all',
    purpose: 'all',
    location: 'addis_ababa',
  };
  // Kazanchis and Summit both match addis_ababa
  const addisResults = filterProperties(mockProperties, addisCriteria);
  assert.equal(addisResults.length, 3);
});

test('filterProperties filters by keyword search across English and Amharic', () => {
  const enCriteria: FilterCriteria = {
    type: 'all',
    purpose: 'all',
    location: 'all',
    searchKeyword: 'Wing 1',
  };
  const enResults = filterProperties(mockProperties, enCriteria);
  assert.equal(enResults.length, 1);
  assert.equal(enResults[0].id, 'prop-1');

  const amCriteria: FilterCriteria = {
    type: 'all',
    purpose: 'all',
    location: 'all',
    searchKeyword: 'ሰሚት',
  };
  const amResults = filterProperties(mockProperties, amCriteria);
  assert.equal(amResults.length, 1);
  assert.equal(amResults[0].id, 'prop-2');
});
