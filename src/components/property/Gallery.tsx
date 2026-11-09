import { useEffect, useRef, useState } from 'react'
import type { Property } from '@/data/properties'
import { propertyLocation } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'

export function Gallery({ property }: { property: Property }) {
  const images = property.images
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const openAt = (position: number) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setIndex(position)
    setOpen(true)
  }

  const next = () => setIndex((current) => (current + 1) % images.length)
  const previous = () => setIndex((current) => (current - 1 + images.length) % images.length)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') {
        setIndex((current) => (current - 1 + images.length) % images.length)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      returnFocusRef.current?.focus()
    }
  }, [open, images.length])

  return (
    <>
      <div className="grid gap-3 sm:h-[520px] sm:grid-cols-4 sm:grid-rows-2">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative h-64 overflow-hidden rounded-[18px] sm:col-span-3 sm:row-span-2 sm:h-full"
          aria-label={`Open ${property.name} photo gallery`}
        >
          <Photo
            id={images[0]}
            alt={`${property.name}, ${propertyLocation(property)} — main view`}
            sizes="(max-width: 640px) 100vw, 75vw"
            priority
            className="image-zoom"
          />
          <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/55 to-transparent" />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-navy backdrop-blur transition-colors group-hover:bg-white">
            <Icon name="expand" size={14} />
            View all {images.length} photos
          </span>
        </button>

        {[1, 2].map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => openAt(position)}
            className="group relative hidden h-full overflow-hidden rounded-[18px] sm:block"
            aria-label={`Open photo ${position + 1} of ${property.name}`}
          >
            <Photo
              id={images[position]}
              alt={`${property.name} — view ${position + 1}`}
              sizes="25vw"
              className="image-zoom"
            />
            {position === 2 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-navy-950/35 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors group-hover:bg-navy-950/45">
                +{images.length - 2} more
              </span>
            ) : null}
          </button>
        ))}

        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {[1, 2].map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => openAt(position)}
              className="relative aspect-[4/3] overflow-hidden rounded-[14px]"
              aria-label={`Open photo ${position + 1} of ${property.name}`}
            >
              <Photo
                id={images[position]}
                alt={`${property.name} — view ${position + 1}`}
                sizes="50vw"
              />
            </button>
          ))}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-navy-950"
          role="dialog"
          aria-modal="true"
          aria-label={`${property.name} photo gallery`}
        >
          <div className="flex items-center justify-between px-5 py-5 text-white sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
              {property.name} · {index + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous photo"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-navy sm:left-6"
            >
              <Icon name="chevron-left" size={18} />
            </button>

            <div className="h-full max-h-[68vh] w-full max-w-5xl">
              <Photo
                id={images[index]}
                alt={`${property.name} — view ${index + 1}`}
                sizes="100vw"
                fit="contain"
              />
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-navy sm:right-6"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-5">
            {images.map((image, position) => (
              <button
                key={image}
                type="button"
                onClick={() => setIndex(position)}
                aria-label={`Show photo ${position + 1}`}
                aria-current={position === index}
                className={`h-14 w-20 overflow-hidden rounded-md border-2 transition-all ${
                  position === index
                    ? 'border-champagne opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <Photo id={image} alt="" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
