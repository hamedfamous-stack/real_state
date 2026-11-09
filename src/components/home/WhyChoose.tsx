import { stats, whyChoose } from '@/data/site'
import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function WhyChoose() {
  return (
    <section className="bg-navy-950 py-20 text-white lg:py-28" aria-labelledby="why-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-[20px]">
              <div className="aspect-[4/5] overflow-hidden sm:aspect-[5/5]">
                <Photo
                  id={whyChoose[0].image}
                  alt="Architectural home at golden hour"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="image-zoom"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl border border-white/15 bg-navy-950/55 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-champagne text-navy-950">
                  <Icon name="key" size={19} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-champagne">
                    By appointment
                  </p>
                  <p className="mt-1 text-[13px] text-white/75">
                    Private viewings, arranged around you.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pl-4">
            <Reveal>
              <SectionHeading
                label="Why Horizon"
                title="Why Choose Horizon"
                description="We are a small, senior team by design. That means direct access to the person advising you — and a standard of care that does not change with the market."
                tone="light"
              />
            </Reveal>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {whyChoose.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="flex gap-5 py-6">
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-champagne">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-16 border-t border-white/10 pt-10 lg:mt-20" delay={80}>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                    {stat.value}
                    <span className="text-champagne">{stat.suffix}</span>
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {stat.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
