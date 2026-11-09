import { agents } from '@/data/site'
import { usePageTitle } from '@/hooks/usePageTitle'
import { PageHero } from '@/components/shared/PageHero'
import { CtaBand } from '@/components/shared/CtaBand'
import { Photo } from '@/components/ui/Photo'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export default function Team() {
  usePageTitle('Our team')

  return (
    <>
      <PageHero
        label="Our team"
        title="Senior advisors. No hand-offs."
        description="A small team by design. The person you meet at the first viewing is the person who negotiates your offer and sees it through to completion."
      />

      <section className="bg-white py-16 lg:py-24" aria-label="Horizon advisors">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {agents.map((agent, index) => (
              <Reveal key={agent.id} delay={(index % 2) * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white sm:flex-row">
                  <div className="relative overflow-hidden bg-mist sm:w-[42%]">
                    <div className="aspect-[4/3] overflow-hidden sm:aspect-auto sm:h-full sm:min-h-[320px]">
                      <Photo
                        id={agent.image}
                        alt={`${agent.name}, ${agent.role} at Horizon Properties`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
                        className="image-zoom"
                      />
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-navy backdrop-blur">
                      {agent.location}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-champagne-dark">
                      {agent.role}
                    </p>
                    <h2 className="mt-2 text-xl font-bold tracking-[-0.01em] text-navy">
                      {agent.name}
                    </h2>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink/60">{agent.bio}</p>

                    <div className="mt-auto flex items-center gap-2 pt-6">
                      <a
                        href={`mailto:${agent.email}`}
                        aria-label={`Email ${agent.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                      >
                        <Icon name="mail" size={15} />
                      </a>
                      <a
                        href={`tel:${agent.phone.replace(/[^+\d]/g, '')}`}
                        aria-label={`Call ${agent.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                      >
                        <Icon name="phone" size={15} />
                      </a>
                      <a
                        href={`mailto:${agent.email}?subject=Property%20enquiry`}
                        className="ml-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:text-champagne-dark"
                      >
                        Get in touch
                        <Icon name="arrow-right" size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
