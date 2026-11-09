import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { agents } from '@/data/site'
import { getProperty, similarProperties } from '@/data/properties'
import { formatPrice, propertyLocation } from '@/lib/utils'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useFavorites } from '@/context/FavoritesContext'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/Field'
import { Gallery } from '@/components/property/Gallery'
import { AgentCard } from '@/components/property/AgentCard'
import { PropertyCard } from '@/components/property/PropertyCard'
import { InquiryModal } from '@/components/forms/InquiryModal'
import NotFound from './NotFound'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = slug ? getProperty(slug) : undefined
  const [modal, setModal] = useState<'contact' | 'viewing' | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  usePageTitle(property ? property.name : 'Property not found')

  if (!property) return <NotFound />

  const agent = agents.find((candidate) => candidate.id === property.agentId) ?? agents[0]
  const saved = isFavorite(property.slug)
  const similar = similarProperties(property)
  const address = `${property.city}, ${property.region}`

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${property.name}, ${propertyLocation(property)}`,
  )}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: property.name,
    description: property.description,
    url: window.location.href,
    numberOfRooms: property.beds,
    floorSize: { '@type': 'QuantitativeValue', value: property.sqft, unitCode: 'FTK' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      addressRegion: property.region,
      addressCountry: property.country,
    },
    offers: { '@type': 'Offer', price: property.price, priceCurrency: 'USD' },
  }

  return (
    <div className="pb-20 lg:pb-0">
      <section className="bg-cream pb-10 pt-28 sm:pt-32 lg:pb-12 lg:pt-40">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] text-ink/45">
            <Link to="/" className="transition-colors hover:text-navy">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/properties" className="transition-colors hover:text-navy">
              Properties
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy/70">{property.name}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-navy">
                  {property.type}
                </span>
                <span className="rounded-full bg-champagne/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-champagne-dark">
                  For sale
                </span>
              </div>

              <h1 className="display-2 mt-5 max-w-3xl text-navy">{property.name}</h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-ink/55">
                <Icon name="pin" size={15} className="text-champagne-dark" />
                {propertyLocation(property)}
              </p>
            </div>

            <div className="flex flex-wrap items-end gap-6 lg:flex-col lg:items-end lg:gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
                  Guide price
                </p>
                <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-navy sm:text-3xl">
                  {formatPrice(property.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(property.slug)}
                aria-pressed={saved}
                className={`flex h-11 items-center gap-2 rounded-full border px-5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  saved
                    ? 'border-champagne bg-champagne text-navy-950'
                    : 'border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white'
                }`}
              >
                <Icon name="heart" size={15} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save property'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 pt-5 lg:pb-16" aria-label="Property gallery">
        <div className="shell">
          <Gallery property={property} />
        </div>
      </section>

      <div className="shell grid gap-12 pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow text-champagne-dark">The residence</p>
            <h2 className="display-3 mt-3 text-navy">About this home</h2>
            <p className="mt-6 text-[16px] font-medium leading-relaxed text-navy/80 sm:text-[17px]">
              {property.tagline}
            </p>
            <p className="body-lg mt-4">{property.description}</p>
          </Reveal>

          <Reveal className="mt-10">
            <dl className="grid grid-cols-2 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
              {[
                { label: 'Bedrooms', value: String(property.beds), icon: 'bed' as const },
                { label: 'Bathrooms', value: String(property.baths), icon: 'bath' as const },
                {
                  label: 'Internal area',
                  value: `${property.sqft.toLocaleString('en-US')} sq ft`,
                  icon: 'area' as const,
                },
                { label: 'Built', value: String(property.year), icon: 'calendar' as const },
              ].map((fact) => (
                <div key={fact.label} className="flex items-center gap-3 border-line sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
                  <Icon name={fact.icon} size={20} className="shrink-0 text-champagne-dark" />
                  <div>
                    <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/40">
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold text-navy">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="display-3 text-navy">Key features</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 border-b border-line py-3.5 text-[13px] text-ink/70"
                >
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-champagne-dark" />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="display-3 text-navy">Amenities</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {property.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full border border-line bg-cream/60 px-4 py-2 text-[12px] font-medium text-ink/65"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <p className="eyebrow text-champagne-dark">Location</p>
            <h2 className="display-3 mt-3 text-navy">The neighbourhood</h2>
            <p className="body-lg mt-4 max-w-2xl">
              {address} — quiet streets, established landscaping and a short drive to the city’s
              best restaurants, schools and waterfront. Our advisory team can arrange a private
              orientation of the area alongside your viewing.
            </p>

            <div className="group relative mt-6 overflow-hidden rounded-[18px]">
              <div className="aspect-[16/9] overflow-hidden">
                <Photo
                  id="1523217582562-09d0def993a6"
                  alt={`Neighbourhood near ${property.name}`}
                  sizes="(max-width: 1024px) 100vw, 780px"
                  className="image-zoom"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/95 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-champagne">
                    <Icon name="pin" size={17} />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/40">
                      Address
                    </p>
                    <p className="text-[13px] font-semibold text-navy">
                      {address}, {property.country}
                    </p>
                  </div>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-navy px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-700"
                >
                  Open in maps
                  <Icon name="arrow-up-right" size={13} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <aside className="lg:col-span-4" aria-label="Property summary and advisor">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[20px] border border-line bg-white p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
                Guide price
              </p>
              <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-navy">
                {formatPrice(property.price)}
              </p>

              <dl className="mt-5 space-y-3 border-t border-line pt-5 text-[13px]">
                {[
                  ['Property type', property.type],
                  ['Bedrooms', `${property.beds}`],
                  ['Bathrooms', `${property.baths}`],
                  ['Internal area', `${property.sqft.toLocaleString('en-US')} sq ft`],
                  ['Plot', property.lot],
                  ['Year built', `${property.year}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink/45">{label}</dt>
                    <dd className="font-semibold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center gap-2 text-[11px] text-ink/40">
                <Icon name="clock" size={13} />
                Private viewings by appointment
              </div>
            </div>

            <AgentCard
              agent={agent}
              onContact={() => setModal('contact')}
              onSchedule={() => setModal('viewing')}
            />

            <p className="px-1 text-[10px] uppercase tracking-[0.14em] text-ink/30">
              Reference HP-{property.slug.slice(0, 3).toUpperCase()}-
              {String(property.year).slice(2)}
            </p>
          </div>
        </aside>
      </div>

      <section className="bg-cream py-16 lg:py-24" aria-labelledby="similar-title">
        <div className="shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-champagne-dark">You may also like</p>
              <h2 id="similar-title" className="display-2 mt-3 text-navy">
                Similar properties
              </h2>
            </div>
            <TextLink to="/properties">Browse all properties</TextLink>
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
            {similar.map((candidate) => (
              <PropertyCard
                key={candidate.slug}
                property={candidate}
                imageAspect="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 lg:hidden" aria-hidden="true" />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Guide price
            </p>
            <p className="truncate text-sm font-bold text-navy">{formatPrice(property.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => setModal('viewing')}
            className="flex h-11 items-center justify-center rounded-full border border-navy/15 px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-navy"
          >
            Viewing
          </button>
          <button
            type="button"
            onClick={() => setModal('contact')}
            className="flex h-11 items-center justify-center rounded-full bg-navy px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
          >
            Contact
          </button>
        </div>
      </div>

      <InquiryModal
        open={modal !== null}
        mode={modal ?? 'contact'}
        property={property}
        onClose={() => setModal(null)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}
