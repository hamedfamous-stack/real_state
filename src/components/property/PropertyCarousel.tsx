import { useCallback, useEffect, useRef, useState } from 'react'
import type { Property } from '@/data/properties'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { PropertyCard } from './PropertyCard'

interface PropertyCarouselProps {
  properties: Property[]
  label?: string
}

const cardWidth =
  'w-[82vw] max-w-[330px] sm:w-[54vw] md:w-[calc((100%-1.5rem)/2.15)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]'

export function PropertyCarousel({ properties, label = 'Featured properties' }: PropertyCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const suppressClick = useRef(false)

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateEdges()
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    return () => observer.disconnect()
  }, [updateEdges, properties.length])

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.86, behavior: 'smooth' })
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    const delta = event.clientX - drag.current.startX
    if (!drag.current.moved && Math.abs(delta) > 6) {
      drag.current.moved = true
      track.classList.add('is-dragging')
    }
    if (drag.current.moved) {
      event.preventDefault()
      track.scrollLeft = drag.current.startScroll - delta
    }
  }

  const endDrag = () => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    drag.current.active = false
    track.classList.remove('is-dragging')
    if (drag.current.moved) {
      suppressClick.current = true
      window.setTimeout(() => {
        suppressClick.current = false
      }, 60)
    }
  }

  return (
    <div className="relative">
      <div className="mb-7 flex items-end justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label="Previous properties"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-navy/15 disabled:hover:bg-transparent disabled:hover:text-navy"
        >
          <Icon name="arrow-left" size={17} />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label="Next properties"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-navy/15 disabled:hover:bg-transparent disabled:hover:text-navy"
        >
          <Icon name="arrow-right" size={17} />
        </button>
      </div>

      <div
        ref={trackRef}
        className="carousel-track pb-2"
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
        tabIndex={0}
        role="region"
        aria-label={label}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollByPage(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollByPage(-1)
          }
        }}
      >
        {properties.map((property, index) => (
          <div key={property.slug} className={cn(cardWidth, 'shrink-0')}>
            <PropertyCard
              property={property}
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 320px"
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
