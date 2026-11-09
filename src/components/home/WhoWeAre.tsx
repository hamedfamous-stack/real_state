import { Link } from 'react-router-dom'
import { photoIds } from '@/lib/images'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'

export function WhoWeAre() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="who-we-are-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-champagne-dark">About us</p>
          <h2 id="who-we-are-title" className="display-2 mt-4 text-navy">
            Who We Are
          </h2>
          <p className="body-lg mt-6 max-w-md">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>
          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ink/50">
            Established in 2001, our advisors represent architectural homes across Texas and the
            coasts — with the discretion and rigour of a private office.
          </p>
          <Button to="/about" variant="primary" size="md" icon className="mt-8">
            Learn More
          </Button>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="relative">
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <div className="group col-span-8 overflow-hidden rounded-[18px]">
                <div className="aspect-[4/5] overflow-hidden">
                  <Photo
                    id={photoIds.aboutMain}
                    alt="Modern villa with pool and landscaped gardens"
                    sizes="(max-width: 1024px) 60vw, 480px"
                    className="image-zoom"
                  />
                </div>
              </div>
              <div className="group col-span-4 mt-12 overflow-hidden rounded-[18px] self-end sm:mt-16">
                <div className="aspect-[2/3] overflow-hidden">
                  <Photo
                    id={photoIds.aboutSide}
                    alt="Warm, light-filled interior of a Horizon property"
                    sizes="(max-width: 1024px) 30vw, 220px"
                    className="image-zoom"
                  />
                </div>
              </div>
            </div>

            <Link
              to="/properties"
              aria-label="Browse our property portfolio"
              className="group absolute -left-5 bottom-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-navy shadow-float transition-colors duration-300 hover:bg-navy hover:text-white sm:-left-7 sm:h-20 sm:w-20"
            >
              <Icon
                name="arrow-up-right"
                size={24}
                className="transition-transform duration-500 ease-premium group-hover:rotate-45"
              />
            </Link>

            <div className="absolute -right-1 -top-4 hidden rounded-full border border-white/70 bg-white/90 px-5 py-2.5 shadow-card backdrop-blur sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/45">
                Since 2001
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
