import { Link } from 'react-router-dom'
import type { Property } from '@/data/properties'
import { cn, formatPrice, propertyLocation } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { FavoriteButton } from './FavoriteButton'

interface PropertyCardProps {
  property: Property
  className?: string
  imageAspect?: string
  sizes?: string
  priority?: boolean
  showFavorite?: boolean
}

export function PropertyCard({
  property,
  className,
  imageAspect = 'aspect-[4/5]',
  sizes = '(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 320px',
  priority = false,
  showFavorite = true,
}: PropertyCardProps) {
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className={cn('relative overflow-hidden rounded-[16px] bg-mist', imageAspect)}>
        <Link
          to={`/properties/${property.slug}`}
          className="block h-full w-full"
          aria-label={`View ${property.name} — ${propertyLocation(property)}`}
          tabIndex={-1}
        >
          <Photo
            id={property.images[0]}
            alt={`${property.name} in ${propertyLocation(property)}`}
            sizes={sizes}
            priority={priority}
            className="image-zoom"
          />
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-navy backdrop-blur">
          {property.type}
        </span>

        {showFavorite ? (
          <FavoriteButton
            slug={property.slug}
            name={property.name}
            className="absolute right-3 top-3 z-10"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <Link to={`/properties/${property.slug}`} className="block focus-visible:outline-offset-4">
          <h3 className="text-[17px] font-bold leading-snug tracking-[-0.01em] text-navy transition-colors duration-300 group-hover:text-champagne-dark">
            {property.name}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-ink/55">
            <Icon name="pin" size={13} className="shrink-0 text-champagne-dark" />
            {propertyLocation(property)}
          </p>
          <p className="mt-3 text-[15px] font-bold text-navy">
            {formatPrice(property.price)}
          </p>
        </Link>

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-4 text-[11px] font-medium text-ink/60">
          <span className="flex items-center gap-1.5">
            <Icon name="bed" size={15} className="text-ink/40" />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="bath" size={15} className="text-ink/40" />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="area" size={14} className="text-ink/40" />
            {property.sqft.toLocaleString('en-US')} sq ft
          </span>
        </div>
      </div>
    </article>
  )
}
