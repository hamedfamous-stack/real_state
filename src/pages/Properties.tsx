import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  bathroomOptions,
  bedroomOptions,
  locations,
  priceRanges,
  properties,
  propertyTypes,
  sortOptions,
  type Property,
} from '@/data/properties'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Field'
import { PageHero } from '@/components/shared/PageHero'
import { SearchPanel } from '@/components/home/SearchPanel'
import { PropertyCard } from '@/components/property/PropertyCard'
import { CtaBand } from '@/components/shared/CtaBand'

const sortProperties = (list: Property[], sort: string) => {
  const sorted = [...list]
  switch (sort) {
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year)
    case 'size':
      return sorted.sort((a, b) => b.sqft - a.sqft)
    default:
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price,
      )
  }
}

export default function Properties() {
  usePageTitle('Properties')
  const [params, setParams] = useSearchParams()

  const query = params.get('q') ?? ''
  const location = params.get('location') ?? 'All Locations'
  const type = params.get('type') ?? 'All Types'
  const price = params.get('price') ?? 'any'
  const beds = Number(params.get('beds') ?? 0) || 0
  const baths = Number(params.get('baths') ?? 0) || 0
  const sort = params.get('sort') ?? 'featured'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    const isDefault =
      value === '' ||
      value === 'any' ||
      value === 'All Types' ||
      value === 'All Locations' ||
      value === '0' ||
      (key === 'sort' && value === 'featured')

    if (isDefault) next.delete(key)
    else next.set(key, value)

    setParams(next, { replace: true })
  }

  const reset = () => setParams(new URLSearchParams(), { replace: true })

  const activeFilters = ['q', 'location', 'type', 'price', 'beds', 'baths'].filter((key) =>
    params.get(key),
  ).length

  const results = useMemo(() => {
    const search = query.trim().toLowerCase()
    const [minPrice, maxPrice] = price === 'any' ? [0, Infinity] : price.split('-').map(Number)

    const filtered = properties.filter((property) => {
      const haystack =
        `${property.name} ${property.city} ${property.region} ${property.type} ${property.country}`.toLowerCase()

      if (search && !haystack.includes(search)) return false
      if (location !== 'All Locations' && property.city !== location) return false
      if (type !== 'All Types' && property.type !== type) return false
      if (property.price < minPrice || property.price > maxPrice) return false
      if (beds > 0 && property.beds < beds) return false
      if (baths > 0 && property.baths < baths) return false
      return true
    })

    return sortProperties(filtered, sort)
  }, [query, location, type, price, beds, baths, sort])

  return (
    <>
      <PageHero
        label="Our portfolio"
        title={
          <>
            Find your next
            <br className="hidden sm:block" /> extraordinary address.
          </>
        }
        description="Browse a curated collection of architectural homes, private estates and city residences. Every listing is represented directly by Horizon."
      >
        <SearchPanel className="max-w-4xl" />
      </PageHero>

      <section className="bg-white py-10 lg:py-14" aria-label="Property search results">
        <div className="shell">
          <div className="rounded-[22px] border border-line bg-white p-4 shadow-[0_20px_50px_-42px_rgba(9,24,43,0.5)] sm:p-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="md:col-span-2">
                <label htmlFor="property-search" className="field-label">
                  Search
                </label>
                <div className="relative">
                  <Icon
                    name="search"
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                  />
                  <input
                    id="property-search"
                    type="search"
                    value={query}
                    onChange={(event) => setParam('q', event.target.value)}
                    placeholder="Search by name, city or property type"
                    className="field-input pl-11"
                  />
                </div>
              </div>

              <Select
                label="Location"
                value={location}
                onChange={(value) => setParam('location', value)}
                options={['All Locations', ...locations]}
              />
              <Select
                label="Property type"
                value={type}
                onChange={(value) => setParam('type', value)}
                options={propertyTypes}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              <Select
                label="Price range"
                value={price}
                onChange={(value) => setParam('price', value)}
                options={priceRanges}
                className="col-span-2 md:col-span-1"
              />
              <Select
                label="Bedrooms"
                value={beds === 0 ? '0' : String(beds)}
                onChange={(value) => setParam('beds', value)}
                options={bedroomOptions.map((option) => ({
                  label: option === 'Any' ? 'Any beds' : option,
                  value: option === 'Any' ? '0' : option.replace('+', ''),
                }))}
              />
              <Select
                label="Bathrooms"
                value={baths === 0 ? '0' : String(baths)}
                onChange={(value) => setParam('baths', value)}
                options={bathroomOptions.map((option) => ({
                  label: option === 'Any' ? 'Any baths' : option,
                  value: option === 'Any' ? '0' : option.replace('+', ''),
                }))}
              />
              <Select
                label="Sort by"
                value={sort}
                onChange={(value) => setParam('sort', value)}
                options={sortOptions}
              />

              <div className="col-span-2 flex items-end md:col-span-1">
                <button
                  type="button"
                  onClick={reset}
                  disabled={activeFilters === 0 && sort === 'featured'}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-navy/15 px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-navy/15 disabled:hover:bg-transparent disabled:hover:text-navy"
                >
                  <Icon name="close" size={13} />
                  Clear
                  {activeFilters > 0 ? (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne px-1 text-[9px] text-navy-950">
                      {activeFilters}
                    </span>
                  ) : null}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between border-b border-line pb-4">
            <p className="text-[12px] font-medium text-ink/55" aria-live="polite">
              <span className="font-bold text-navy">{results.length}</span>{' '}
              {results.length === 1 ? 'property' : 'properties'} found
              {location !== 'All Locations' ? ` in ${location}` : ''}
            </p>
            <p className="hidden text-[11px] uppercase tracking-[0.14em] text-ink/35 sm:block">
              Private viewings available
            </p>
          </div>

          {results.length > 0 ? (
            <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
              {results.map((property, index) => (
                <PropertyCard
                  key={property.slug}
                  property={property}
                  imageAspect="aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  className="animate-fade-up"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[22px] border border-dashed border-navy/15 bg-cream/60 px-6 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-champagne-dark shadow-card">
                <Icon name="search" size={22} />
              </span>
              <h2 className="display-3 mt-5 text-navy">No properties match those filters</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/55">
                Try widening your price range, removing a bedroom requirement, or exploring a
                different location. Our off-market portfolio is also available on request.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-navy px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
