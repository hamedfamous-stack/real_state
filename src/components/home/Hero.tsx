import { site } from '@/data/site'
import { photoIds } from '@/lib/images'
import { Photo } from '@/components/ui/Photo'
import { SearchPanel } from './SearchPanel'

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Photo
          id={photoIds.hero}
          alt="Modern luxury villa with a pool at dusk"
          sizes="100vw"
          priority
          quality={82}
          className="animate-image-in"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,29,0.78)_0%,rgba(7,16,29,0.38)_36%,rgba(7,16,29,0.22)_58%,rgba(7,16,29,0.66)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,16,29,0.28)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[92svh] flex-col">
        <div className="flex flex-1 items-center justify-center px-5 pb-10 pt-32 sm:px-8 lg:pt-36">
          <div className="w-full max-w-4xl text-center text-white">
            <p
              className="animate-hero-in text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 sm:text-[11px]"
              style={{ animationDelay: '80ms' }}
            >
              Austin <span className="mx-2 text-champagne">·</span> Malibu
              <span className="mx-2 text-champagne">·</span> Miami
            </p>

            <h1
              aria-label="Discover Exceptional Homes & Investments"
              className="display-1 mt-6 text-white sm:mt-8"
            >
              <span
                className="block animate-hero-in"
                style={{ animationDelay: '160ms' }}
              >
                Discover Exceptional
              </span>
              <span
                className="block animate-hero-in"
                style={{ animationDelay: '260ms' }}
              >
                Homes &amp; Investments
              </span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl animate-hero-in text-[14px] leading-relaxed text-white/75 sm:mt-8 sm:text-base"
              style={{ animationDelay: '380ms' }}
            >
              Premium properties in prime locations. Find your dream home or the perfect
              investment with confidence.
            </p>
          </div>
        </div>

        <div
          className="shell w-full animate-hero-in pb-7 lg:pb-10"
          style={{ animationDelay: '500ms' }}
        >
          <SearchPanel className="mx-auto max-w-4xl" />
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.24em] text-white/45">
            Private viewings · {site.phone}
          </p>
        </div>
      </div>
    </section>
  )
}
