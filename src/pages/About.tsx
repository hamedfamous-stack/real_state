import { stats, testimonials, values } from '@/data/site'
import { photoIds } from '@/lib/images'
import { usePageTitle } from '@/hooks/usePageTitle'
import { PageHero } from '@/components/shared/PageHero'
import { CtaBand } from '@/components/shared/CtaBand'
import { TeamPreview } from '@/components/home/TeamPreview'
import { Photo } from '@/components/ui/Photo'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function About() {
  usePageTitle('About us')

  return (
    <>
      <PageHero
        label="Our story"
        title={
          <>
            A quiet standard in
            <br className="hidden sm:block" /> a loud market.
          </>
        }
        description="Horizon Properties is an independent advisory built on architectural literacy, discretion and a belief that the best property decisions are made calmly."
      />

      <section className="bg-white py-20 lg:py-28" aria-labelledby="story-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div className="group overflow-hidden rounded-[20px]">
                <div className="aspect-[4/5] overflow-hidden">
                  <Photo
                    id={photoIds.aboutMain}
                    alt="An architectural Horizon property with pool and garden"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="image-zoom"
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 right-4 hidden w-48 overflow-hidden rounded-[16px] border-4 border-white shadow-float sm:block lg:-right-8">
                <div className="aspect-[4/5] overflow-hidden">
                  <Photo
                    id={photoIds.aboutSide}
                    alt="Light-filled interior with considered materials"
                    sizes="192px"
                  />
                </div>
              </div>
              <div className="absolute left-5 top-5 rounded-full bg-navy-950/60 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                Est. 2001
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={100}>
            <SectionHeading
              label="Who we are"
              title="Buildings first, transactions second."
            />
            <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-ink/65">
              <p>
                Horizon began in Austin with a simple observation: the most significant homes were
                being sold like commodities. We built a practice around the opposite idea — that
                architecture deserves context, care and a considered audience.
              </p>
              <p>
                Twenty-four years later, our advisors represent a small number of homes at any one
                time. We work directly with owners, architects and a private network of buyers. No
                junior hand-offs, no inflated valuations, no noise.
              </p>
              <p>
                For buyers, that means honest counsel on value and fit. For sellers, it means an
                editorial presentation and a discreet process. For both, it means a single senior
                advisor who stays until the keys change hands.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-champagne pl-5">
              <p className="text-[15px] font-medium italic leading-relaxed text-navy">
                “We would rather lose a listing than overstate a home. That principle has built
                every relationship we have.”
              </p>
              <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
                Daniel Morgan · Managing Director
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20 lg:py-24" aria-label="Client testimonial">
        <Photo
          id={photoIds.why}
          alt=""
          sizes="100vw"
          quality={60}
          className="absolute inset-0 opacity-25"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
        <div className="relative shell">
          <Reveal className="mx-auto max-w-3xl text-center text-white">
            <Icon name="quote" size={30} className="mx-auto text-champagne" />
            <blockquote className="mt-6">
              <p className="text-xl font-medium leading-[1.6] tracking-[-0.01em] sm:text-2xl lg:text-[28px]">
                “{testimonials[0].quote}”
              </p>
              <footer className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                {testimonials[0].name} · {testimonials[0].detail}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28" aria-labelledby="values-title">
        <div className="shell">
          <Reveal>
            <SectionHeading
              label="What guides us"
              title="Four principles, held quietly."
              description="They are not slogans on a wall. They decide which homes we take on, how we advise and when we say no."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-navy/10 bg-navy/10 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60} className="bg-white">
                <div className="h-full p-7 sm:p-8">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-champagne-dark">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14" delay={80}>
            <dl className="grid grid-cols-2 gap-8 border-t border-navy/10 pt-10 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <p className="text-3xl font-bold tracking-[-0.03em] text-navy sm:text-4xl">
                      {stat.value}
                      <span className="text-champagne-dark">{stat.suffix}</span>
                    </p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                      {stat.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <TeamPreview />
      <CtaBand />
    </>
  )
}
