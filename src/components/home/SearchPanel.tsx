import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locations, priceRanges, propertyTypes } from '@/data/properties'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Field'

export function SearchPanel({ className }: { className?: string }) {
  const navigate = useNavigate()
  const [location, setLocation] = useState('All Locations')
  const [type, setType] = useState('All Types')
  const [price, setPrice] = useState('any')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (location !== 'All Locations') params.set('location', location)
    if (type !== 'All Types') params.set('type', type)
    if (price !== 'any') params.set('price', price)
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Search properties"
      className={`rounded-[22px] border border-white/60 bg-white/95 p-4 shadow-float backdrop-blur-md sm:p-5 ${className ?? ''}`}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5">
        <Select
          label="Location"
          value={location}
          onChange={setLocation}
          options={['All Locations', ...locations]}
          compact
          className="col-span-1"
        />
        <Select
          label="Property type"
          value={type}
          onChange={setType}
          options={propertyTypes}
          compact
          className="col-span-1"
        />
        <Select
          label="Price range"
          value={price}
          onChange={setPrice}
          options={priceRanges}
          compact
          className="col-span-2 lg:col-span-1"
        />
        <button
          type="submit"
          className="group col-span-2 flex h-11 items-center justify-center gap-2 rounded-full bg-navy px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-navy-700 lg:col-span-1"
        >
          <Icon name="search" size={15} />
          Search
        </button>
      </div>
    </form>
  )
}
