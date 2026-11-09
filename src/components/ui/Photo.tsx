import { cn } from '@/lib/utils'
import { photoSrcSet, photoUrl } from '@/lib/images'

interface PhotoProps {
  id: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  fit?: 'cover' | 'contain'
}

export function Photo({
  id,
  alt,
  className,
  sizes = '100vw',
  priority = false,
  quality = 78,
  fit = 'cover',
}: PhotoProps) {
  return (
    <img
      src={photoUrl(id, 1280, quality)}
      srcSet={photoSrcSet(id, quality)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={cn('h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain', className)}
    />
  )
}
