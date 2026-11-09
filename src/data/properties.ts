export type PropertyType = 'Villa' | 'House' | 'Estate' | 'Penthouse' | 'Residence'

export interface Property {
  slug: string
  name: string
  city: string
  region: string
  country: string
  price: number
  type: PropertyType
  beds: number
  baths: number
  sqft: number
  lot: string
  year: number
  featured: boolean
  tagline: string
  description: string
  features: string[]
  amenities: string[]
  images: string[]
  agentId: string
}

/** Property content is intentionally kept in one typed collection so it can be
 *  swapped for an API or database query without touching the UI components. */
export const properties: Property[] = [
  {
    slug: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    city: 'Austin',
    region: 'Texas',
    country: 'USA',
    price: 2_350_000,
    type: 'Villa',
    beds: 5,
    baths: 4,
    sqft: 4_850,
    lot: '0.62 acres',
    year: 2021,
    featured: true,
    tagline: 'A glass-walled villa suspended over the water’s edge.',
    description:
      'Set behind a private gate on the quieter eastern shore, Lakeside Modern Villa is an exercise in restraint. Floor-to-ceiling glazing frames the lake from every principal room, while a cantilevered terrace and infinity pool blur the line between architecture and landscape. Interiors are warm and quiet — oak, limestone and hand-finished plaster — with a main suite that opens directly onto the water.',
    features: [
      'Cantilevered living pavilion',
      'Full-height sliding glazing',
      'Infinity-edge pool',
      'Private boat dock',
      'Chef’s kitchen with butler’s pantry',
      'Four-car garage',
    ],
    amenities: [
      'Lake access',
      'Heated pool',
      'Home cinema',
      'Wine cellar',
      'Outdoor kitchen',
      'Smart home system',
      'Guest suite',
      'Gated entry',
    ],
    images: [
      '1613490493576-7fde63acd811',
      '1600607687939-ce8a6c25118c',
      '1600566753086-00f18fb6b3ea',
      '1600210492486-724fe5c67fb0',
    ],
    agentId: 'daniel-morgan',
  },
  {
    slug: 'pacific-glass-house',
    name: 'Pacific Glass House',
    city: 'Malibu',
    region: 'California',
    country: 'USA',
    price: 4_800_000,
    type: 'House',
    beds: 6,
    baths: 5,
    sqft: 6_200,
    lot: '1.1 acres',
    year: 2019,
    featured: true,
    tagline: 'Ocean-facing glass, weathered cedar and uninterrupted horizon.',
    description:
      'Perched above the Pacific with a hundred feet of frontage, Pacific Glass House was designed around the light. A double-height living room opens to a limestone terrace and negative-edge pool; the primary suite occupies its own wing with a private deck. Materials are deliberately few — glass, cedar, travertine — allowing the ocean to remain the most important surface in the house.',
    features: [
      'One hundred feet of ocean frontage',
      'Double-height living room',
      'Negative-edge pool and spa',
      'Primary wing with private deck',
      'Architect-designed landscaping',
      'Solar and battery storage',
    ],
    amenities: [
      'Ocean views',
      'Heated pool',
      'Sauna and steam room',
      'Gym',
      'Wine room',
      'Fire pit terrace',
      'Two-car garage',
      'Guest house',
    ],
    images: [
      '1600596542815-ffad4c1539a9',
      '1600607687920-4e2a09cf159d',
      '1502672260266-1c1ef2d93688',
      '1600566753190-17f0baa2a6c3',
    ],
    agentId: 'olivia-carter',
  },
  {
    slug: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    city: 'Scottsdale',
    region: 'Arizona',
    country: 'USA',
    price: 3_150_000,
    type: 'Estate',
    beds: 5,
    baths: 5,
    sqft: 5_600,
    lot: '2.4 acres',
    year: 2020,
    featured: true,
    tagline: 'Low-slung desert modernism with a private courtyard.',
    description:
      'A single-storey estate arranged around a planted courtyard, Desert Horizon draws its palette from the surrounding Sonoran landscape. Deep overhangs shade the living spaces, while a rammed-earth spine runs the length of the plan. The rear terrace looks west to Camelback Mountain — the pool, spa and shaded dining pavilion were positioned for the evening light.',
    features: [
      'Courtyard plan with rammed-earth spine',
      'Mountain-facing rear terrace',
      'Resort pool and spa',
      'Shaded outdoor dining pavilion',
      'Detached guest casita',
      'Motor court and four-car garage',
    ],
    amenities: [
      'Mountain views',
      'Heated pool',
      'Outdoor fireplace',
      'Putting green',
      'Home office',
      'Casita',
      'Gated entry',
      'Desert landscaping',
    ],
    images: [
      '1600585154340-be6161a56a0c',
      '1600573472550-8090b5e0745e',
      '1600566752355-35792bedcfea',
      '1512917774080-9991f1c4c750',
    ],
    agentId: 'james-wilson',
  },
  {
    slug: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    city: 'Miami',
    region: 'Florida',
    country: 'USA',
    price: 5_200_000,
    type: 'Residence',
    beds: 4,
    baths: 4,
    sqft: 4_100,
    lot: '0.4 acres',
    year: 2022,
    featured: true,
    tagline: 'A quiet modern residence with a private stretch of sand.',
    description:
      'Direct beachfront living, reimagined with the calm of a private home. Oceanfront Residence opens through pocketing glass to a covered loggia, pool deck and boardwalk to the sand. The interior is cool and tactile — bleached oak, linen and stone — with a primary suite positioned for sunrise over the Atlantic.',
    features: [
      'Direct beach frontage',
      'Pocketing glass walls',
      'Covered loggia and summer kitchen',
      'Private pool deck',
      'Primary suite with sunrise terrace',
      'Secure parking for three cars',
    ],
    amenities: [
      'Private beach access',
      'Heated pool',
      'Summer kitchen',
      'Spa bath',
      'Fitness room',
      'Elevator',
      'Concierge',
      'Hurricane glazing',
    ],
    images: [
      '1613977257363-707ba9348227',
      '1600607687939-ce8a6c25118c',
      '1600047509807-ba8f99d2cdde',
      '1600566753086-00f18fb6b3ea',
    ],
    agentId: 'james-wilson',
  },
  {
    slug: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    city: 'Los Angeles',
    region: 'California',
    country: 'USA',
    price: 3_750_000,
    type: 'House',
    beds: 4,
    baths: 4,
    sqft: 3_900,
    lot: '0.8 acres',
    year: 2018,
    featured: true,
    tagline: 'A hillside sequence of terraces, framed by mature olive trees.',
    description:
      'Tucked into a quiet canyon above the city, this retreat is organised as a series of terraces that step down the slope. Living spaces open west to a long pool and a view that runs to the ocean on clear days. The house is deliberately low in profile, with a warm interior of walnut, travertine and soft plaster.',
    features: [
      'Stepped terraces with city views',
      'Long west-facing pool',
      'Mature olive and citrus planting',
      'Walnut and travertine interiors',
      'Separate studio and office',
      'Two-car garage plus motor court',
    ],
    amenities: [
      'City and ocean views',
      'Heated pool',
      'Outdoor shower',
      'Fire pit',
      'Studio',
      'Wine storage',
      'Smart lighting',
      'Privacy hedging',
    ],
    images: [
      '1600047509807-ba8f99d2cdde',
      '1600585154340-be6161a56a0c',
      '1600210492486-724fe5c67fb0',
      '1600607687920-4e2a09cf159d',
    ],
    agentId: 'sophia-bennett',
  },
  {
    slug: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    city: 'Beverly Hills',
    region: 'California',
    country: 'USA',
    price: 6_400_000,
    type: 'Estate',
    beds: 6,
    baths: 6,
    sqft: 7_300,
    lot: '1.5 acres',
    year: 2017,
    featured: true,
    tagline: 'Classic California architecture, quietly modernised.',
    description:
      'Behind tall hedges on a prized Beverly Hills street, Palm Garden Residence pairs original 1930s proportions with a contemporary rear extension. Formal rooms sit either side of a central hall; the back of the house opens to a lawn, mature palms and a pool pavilion. A rare combination of provenance and ease.',
    features: [
      'Original 1930s architecture',
      'Contemporary rear extension',
      'Formal living and dining rooms',
      'Pool pavilion and lawn',
      'Primary suite with dressing room',
      'Detached guest house',
    ],
    amenities: [
      'Mature gardens',
      'Heated pool',
      'Pool pavilion',
      'Guest house',
      'Library',
      'Wine cellar',
      'Staff suite',
      'Gated driveway',
    ],
    images: [
      '1523217582562-09d0def993a6',
      '1600210492486-724fe5c67fb0',
      '1600566753190-17f0baa2a6c3',
      '1502672260266-1c1ef2d93688',
    ],
    agentId: 'sophia-bennett',
  },
  {
    slug: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    city: 'Lake Tahoe',
    region: 'Nevada',
    country: 'USA',
    price: 2_950_000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 3_400,
    lot: '0.9 acres',
    year: 2021,
    featured: false,
    tagline: 'Pine, stone and water — a four-season retreat.',
    description:
      'A modern interpretation of the Tahoe cabin, built for long weekends and longer winters. The upper level holds a single open room beneath a pitched ceiling, anchored by a stone fireplace and framed by clearest-water views. A heated mudroom, ski storage and a covered outdoor fire terrace make the house genuinely usable in every season.',
    features: [
      'Lake-facing great room',
      'Stone fireplace',
      'Heated mudroom and ski storage',
      'Covered fire terrace',
      'Boat mooring rights',
      'Two-car garage',
    ],
    amenities: [
      'Lake views',
      'Private mooring',
      'Outdoor fireplace',
      'Ski storage',
      'Sauna',
      'Boot warmers',
      'Guest bunk room',
      'Generator',
    ],
    images: [
      '1580587771525-78b9dba3b914',
      '1600566752355-35792bedcfea',
      '1512917774080-9991f1c4c750',
      '1600607687939-ce8a6c25118c',
    ],
    agentId: 'daniel-morgan',
  },
  {
    slug: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    city: 'Austin',
    region: 'Texas',
    country: 'USA',
    price: 1_850_000,
    type: 'Penthouse',
    beds: 3,
    baths: 3,
    sqft: 2_450,
    lot: 'Full floor',
    year: 2023,
    featured: false,
    tagline: 'A full-floor penthouse above the quiet side of downtown.',
    description:
      'Occupying the entire top floor of a boutique six-storey building, this penthouse was designed by its architect-owner as a city apartment that behaves like a house. A 60-foot terrace wraps the living spaces; interiors are restrained and warm, with a bespoke kitchen and a study that doubles as a third bedroom.',
    features: [
      'Full-floor private lift access',
      'Sixty-foot wrap terrace',
      'Bespoke kitchen',
      'Study / third bedroom',
      'Two secure parking spaces',
      'Private storage room',
    ],
    amenities: [
      'Skyline views',
      'Private terrace',
      'Concierge',
      'Fitness studio',
      'Secure parking',
      'Bicycle storage',
      'Guest suite',
      'Pet friendly',
    ],
    images: [
      '1512917774080-9991f1c4c750',
      '1600607687920-4e2a09cf159d',
      '1600566753086-00f18fb6b3ea',
      '1600047509807-ba8f99d2cdde',
    ],
    agentId: 'olivia-carter',
  },
]

export const propertyTypes: Array<PropertyType | 'All Types'> = [
  'All Types',
  'Villa',
  'House',
  'Estate',
  'Penthouse',
  'Residence',
]

export const locations = Array.from(new Set(properties.map((property) => property.city))).sort()

export const priceRanges = [
  { label: 'Any Price', value: 'any' },
  { label: 'Up to $2.5M', value: '0-2500000' },
  { label: '$2.5M – $4M', value: '2500000-4000000' },
  { label: '$4M – $6M', value: '4000000-6000000' },
  { label: '$6M+', value: '6000000-99999999' },
]

export const bedroomOptions = ['Any', '3+', '4+', '5+', '6+']
export const bathroomOptions = ['Any', '3+', '4+', '5+', '6+']

export const sortOptions = [
  { label: 'Featured first', value: 'featured' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Recently built', value: 'newest' },
  { label: 'Largest', value: 'size' },
]

export function getProperty(slug: string) {
  return properties.find((property) => property.slug === slug)
}

export function similarProperties(property: Property, limit = 3) {
  return properties
    .filter((candidate) => candidate.slug !== property.slug)
    .sort((a, b) => {
      const score = (candidate: Property) =>
        (candidate.type === property.type ? 2 : 0) +
        (candidate.region === property.region ? 1 : 0) +
        (Math.abs(candidate.price - property.price) < 1_000_000 ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, limit)
}
