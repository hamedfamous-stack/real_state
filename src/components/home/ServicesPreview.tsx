import { Link } from 'react-router-dom'
import { services } from '@/data/site'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function ServicesPreview() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="services-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            label="Services"
            title="Advisory, end to end"
            description="Whether you are buying, selling or building a portfolio, one senior advisor stays with you from first conversation to closing."
          />
          <Button to="/services" variant="light" size="md" icon className="mt-8">
            Explore services
          </Button>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={100}>
          <ul className="border-y border-line">
            {services.map((service) => (
              <li key={service.id} className="border-b border-line last:border-b-0">
                <Link
                  to="/services"
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 py-6 transition-colors duration-300 sm:gap-6 sm:py-7"
                >
                  <span className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-champagne-dark">
                    {service.number}
                  </span>
                  <span>
                    <span className="block text-lg font-bold tracking-[-0.01em] text-navy transition-colors group-hover:text-champagne-dark sm:text-xl">
                      {service.title}
                    </span>
                    <span className="mt-1.5 block max-w-lg text-[13px] leading-relaxed text-ink/55">
                      {service.description}
                    </span>
                  </span>
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <Icon name="arrow-up-right" size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
