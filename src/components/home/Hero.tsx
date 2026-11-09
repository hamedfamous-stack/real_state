import { useMemo } from 'react'
import { site } from '@/data/site'
import { photoIds } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Photo } from '@/components/ui/Photo'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrollScrubVideo } from '@/hooks/useScrollScrubVideo'
import { heroPoster, pickHeroVideo } from '@/lib/heroVideo'
import { SearchPanel } from './SearchPanel'

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const { sectionRef, stageRef, videoRef, copyRef, searchRef, status, buffered } =
    useScrollScrubVideo({ enabled: !reducedMotion })
  const film = useMemo(() => pickHeroVideo(), [])

  // The cinematic layer is the default; reduced motion and a failed film both fall
  // back to the original static hero (same copy, no dead scroll distance).
  const cinematic = !reducedMotion && status !== 'error'

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Horizon Properties"
      className={cn('relative bg-navy-950', cinematic && 'hero-scroll')}
    >
      <div
        ref={stageRef}
        className={cn(
          'relative overflow-hidden bg-navy-950',
          cinematic ? 'sticky top-0 h-[100svh]' : 'min-h-[92svh]',
        )}
      >
        <div className="absolute inset-0">
          {cinematic ? (
            <>
              {/* Poster stays underneath so a slow or seek-pending frame never shows
                  an empty black rectangle. */}
              <img
                src={heroPoster}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <video
                ref={videoRef}
                src={film}
                poster={heroPoster}
                preload="auto"
                muted
                playsInline
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden="true"
                className={cn(
                  'hero-film absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-premium',
                  status === 'ready' ? 'opacity-100' : 'opacity-0',
                )}
              />
            </>
          ) : (
            <Photo
              id={photoIds.hero}
              alt="Modern luxury villa with a pool at dusk"
              sizes="100vw"
              priority
              quality={82}
              className="animate-image-in"
            />
          )}

          {/* Light scrim only where text needs it — the film stays dominant. */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,29,0.62)_0%,rgba(7,16,29,0.2)_22%,rgba(7,16,29,0.04)_48%,rgba(7,16,29,0.52)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_46%,rgba(7,16,29,0.22)_100%)]" />
        </div>

        {/* Preload indicator: a hairline that tracks buffered data. */}
        {cinematic && status === 'loading' && (
          <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-white/15" aria-hidden="true">
            <div
              className="h-full bg-champagne transition-[width] duration-700 ease-out"
              style={{ width: `${Math.max(8, buffered * 100)}%` }}
            />
          </div>
        )}
        <p className="sr-only" role="status">
          {cinematic && status === 'loading' ? 'Preparing the hero film' : ''}
        </p>

        <div className={cn('relative z-10 flex flex-col', cinematic ? 'h-full' : 'min-h-[92svh]')}>
          <div className="flex flex-1 items-center justify-center px-5 pb-10 pt-32 sm:px-8 lg:pt-36">
            <div ref={copyRef} className="hero-layer w-full max-w-4xl text-center text-white">
              <p
                className="animate-hero-in text-[10px] font-semibold uppercase tracking-[0.34em] text-white/75 [text-shadow:0_1px_18px_rgba(7,16,29,0.65)] sm:text-[11px]"
                style={{ animationDelay: '80ms' }}
              >
                Austin <span className="mx-2 text-champagne">·</span> Malibu
                <span className="mx-2 text-champagne">·</span> Miami
              </p>

              <h1
                aria-label="Discover Exceptional Homes & Investments"
                className="display-1 mt-6 text-white [text-shadow:0_2px_38px_rgba(7,16,29,0.45)] sm:mt-8"
              >
                <span className="block animate-hero-in" style={{ animationDelay: '160ms' }}>
                  Discover Exceptional
                </span>
                <span className="block animate-hero-in" style={{ animationDelay: '260ms' }}>
                  Homes &amp; Investments
                </span>
              </h1>

              <p
                className="mx-auto mt-6 max-w-xl animate-hero-in text-[14px] leading-relaxed text-white/80 [text-shadow:0_1px_20px_rgba(7,16,29,0.7)] sm:mt-8 sm:text-base"
                style={{ animationDelay: '380ms' }}
              >
                Premium properties in prime locations. Find your dream home or the perfect
                investment with confidence.
              </p>
            </div>
          </div>

          <div ref={searchRef} className="hero-layer shell w-full pb-7 lg:pb-10">
            <div className="animate-hero-in" style={{ animationDelay: '500ms' }}>
              <SearchPanel className="mx-auto max-w-4xl" />
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.24em] text-white/60 [text-shadow:0_1px_16px_rgba(7,16,29,0.7)]">
                Private viewings · {site.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
