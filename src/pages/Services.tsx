import { Link } from 'react-router-dom'
import { services, site } from '@/data/site'
import { usePageTitle } from '@/hooks/usePageTitle'
import { PageHero } from '@/components/shared/PageHero'
import { CtaBand } from '@/components/shared/CtaBand'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const process = [
  {
    step: '01',
    title: 'A first conversation',
    text: 'We listen before we recommend — your timeline, priorities and what a successful move looks like.',
  },
  {
    step: '02',
    title: 'A considered search',
    text: 'A short list of homes worth your time, including off-market opportunities from our private network.',
  },
  {
    step: '03',
    title: 'Negotiation & diligence',
    text: 'Evidence-led advice on value, terms and condition, coordinated with your legal and financial team.',
  },
  {
    step: '04',
    title: 'Completion & beyond',
    text: 'We stay through closing and beyond — from contractors to property management introductions.',
  },
]

export default function Services() {
  usePageTitle('Services')

  return (
    <>
      <PageHero
        label="Services"
        title="Advisory for every stage of ownership."
        description="Buying, selling, investing or relocating — one senior advisor, a clear process and the judgement that comes from twenty-four years in the market."
      />

      <section className="bg-white py-20 lg:py-28" aria-labelledby="services-list-title">
        <div className="shell">
          <h2 id="services-list-title" className="sr-only">
            Our services
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={(index % 2) * 70}>
                <article className="group flex h-full flex-col rounded-[20px] border border-line bg-white p-7 transition-colors duration-500 hover:border-navy/20 hover:bg-cream/50 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-champagne-dark">
                      {service.number}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                      <Icon name="arrow-up-right" size={15} />
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-[-0.015em] text-navy sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[13px] text-ink/60">
                        <Icon
                          name="check"
                          size={14}
                          className="mt-0.5 shrink-0 text-champagne-dark"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="mt-auto inline-flex items-center gap-2 pt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-champagne-dark"
                  >
                    Speak with an advisor
                    <Icon
                      name="arrow-right"
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white lg:py-28" aria-labelledby="process-title">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                label="How we work"
                title="A calm, clear process."
                description="No surprises, no pressure. You will always know what happens next and who is handling it."
                tone="light"
              />
              <a
                href={site.phoneHref}
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-champagne">
                  <Icon name="phone" size={15} />
                </span>
                {site.phone}
              </a>
            </Reveal>

            <div className="lg:col-span-8">
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {process.map((item) => (
                  <Reveal key={item.step} as="li">
                    <div className="flex gap-5 py-6 sm:gap-8 sm:py-7">
                      <span className="text-[11px] font-semibold tracking-[0.14em] text-champagne">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/55">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
