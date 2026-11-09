import { photoIds } from '@/lib/images'

export interface Agent {
  id: string
  name: string
  role: string
  phone: string
  email: string
  image: string
  bio: string
  location: string
  socials: { linkedin: string; instagram: string }
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  points: string[]
}

export interface Value {
  title: string
  description: string
}

export const site = {
  name: 'Horizon Properties',
  shortName: 'Horizon',
  tagline: 'Exceptional homes & investments',
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  address: '418 Lakeview Avenue, Austin, TX 78701',
  hours: 'Mon – Fri, 9:00 – 18:00',
  founded: 2001,
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export const agents: Agent[] = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    phone: '(555) 246-7891',
    email: 'daniel@horizonproperties.com',
    image: '1507003211169-0a1dd7228f2d',
    bio: 'Daniel founded Horizon Properties in 2001 after a decade in architectural development. He leads our advisory practice and negotiates the firm’s most significant residential transactions.',
    location: 'Austin, Texas',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    phone: '(555) 246-7892',
    email: 'olivia@horizonproperties.com',
    image: '1494790108377-be9c29b29330',
    bio: 'Olivia represents architecturally significant homes across the West Coast, pairing an editorial eye with a discreet, detail-obsessed approach to private sales.',
    location: 'Malibu, California',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    phone: '(555) 246-7893',
    email: 'james@horizonproperties.com',
    image: '1500648767791-00dcc994a43e',
    bio: 'James advises private clients and family offices on income-producing residential assets, with a focus on long-term value and tax-efficient ownership structures.',
    location: 'Miami, Florida',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    phone: '(555) 246-7894',
    email: 'sophia@horizonproperties.com',
    image: '1580489944761-15a19d654956',
    bio: 'Sophia guides buyers through every stage of acquisition, from first viewing to closing. She is known for calm counsel and an encyclopaedic knowledge of prime neighbourhoods.',
    location: 'Beverly Hills, California',
    socials: { linkedin: '#', instagram: '#' },
  },
]

export const services: Service[] = [
  {
    id: 'luxury-home-sales',
    number: '01',
    title: 'Luxury Home Sales',
    description:
      'Representation for architecturally significant homes, from private previews to discreet off-market sales.',
    points: ['Tailored marketing strategy', 'Qualified buyer network', 'Private sale management'],
  },
  {
    id: 'property-investment',
    number: '02',
    title: 'Property Investment',
    description:
      'Considered advice on income-producing residential assets, portfolio diversification and acquisition timing.',
    points: ['Investment modelling', 'Yield and risk analysis', 'Portfolio reviews'],
  },
  {
    id: 'property-marketing',
    number: '03',
    title: 'Property Marketing',
    description:
      'Editorial photography, film and a curated media plan that places your home in front of the right audience.',
    points: ['Architectural photography', 'Film and drone coverage', 'Global media placements'],
  },
  {
    id: 'real-estate-advisory',
    number: '04',
    title: 'Real Estate Advisory',
    description:
      'Independent counsel for buyers, sellers and families navigating complex residential decisions.',
    points: ['Acquisition strategy', 'Negotiation support', 'Estate and succession planning'],
  },
  {
    id: 'property-valuation',
    number: '05',
    title: 'Property Valuation',
    description:
      'Evidence-led valuations grounded in comparable sales, architectural merit and current market conditions.',
    points: ['Market appraisals', 'Pre-listing valuations', 'Insurance and probate reports'],
  },
  {
    id: 'relocation-services',
    number: '06',
    title: 'Relocation Services',
    description:
      'A single point of contact for families and executives moving to a new city, from search to settling in.',
    points: ['Neighbourhood orientation', 'School and lifestyle research', 'Settling-in support'],
  },
]

export const values: Value[] = [
  {
    title: 'Integrity first',
    description:
      'Clear advice, transparent fees and no pressure. We would rather lose a listing than overstate a home.',
  },
  {
    title: 'Architectural literacy',
    description:
      'We understand buildings — materials, provenance, planning — and present them with the care they deserve.',
  },
  {
    title: 'Genuine relationships',
    description:
      'Most of our work comes from clients we have represented before. Discretion and follow-through earn that trust.',
  },
  {
    title: 'Measured counsel',
    description:
      'Property is a long game. We help you weigh lifestyle, value and timing without theatrics.',
  },
]

export const whyChoose = [
  {
    title: 'A curated portfolio',
    description:
      'Every home we represent is selected for architectural merit, location and long-term value — never volume.',
    image: photoIds.why,
  },
  {
    title: 'Off-market access',
    description:
      'A private network of owners, architects and advisors gives our clients a first look at homes that never reach the open market.',
    image: photoIds.whyDetail,
  },
  {
    title: 'End-to-end advisory',
    description:
      'Search, negotiation, due diligence and closing handled by one dedicated advisor, supported by our in-house team.',
    image: photoIds.aboutSide,
  },
]

export const stats = [
  { value: '24', suffix: 'yrs', label: 'Advising private clients' },
  { value: '$1.4', suffix: 'B', label: 'Residential volume' },
  { value: '480', suffix: '+', label: 'Homes represented' },
  { value: '98', suffix: '%', label: 'Client retention' },
]

export const testimonials = [
  {
    quote:
      'Horizon understood the house before we did. Their presentation was restrained, precise and brought the right buyers within three weeks.',
    name: 'Marianne Ellis',
    detail: 'Seller · Lake Tahoe',
  },
  {
    quote:
      'We were relocating from London with two children and a tight timeline. Every viewing was worth our time, and the advice on neighbourhoods was invaluable.',
    name: 'The Alvarez Family',
    detail: 'Buyers · Austin',
  },
  {
    quote:
      'A genuinely discreet process. No noise, no inflated expectations — just clear counsel and a result that exceeded our underwriting.',
    name: 'Northline Capital',
    detail: 'Investor · Miami',
  },
]
