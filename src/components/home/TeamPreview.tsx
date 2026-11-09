import { agents } from '@/data/site'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TextLink } from '@/components/ui/Field'
import { TeamCard } from '@/components/team/TeamCard'

export function TeamPreview() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="team-title">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              label="Our team"
              title="The people behind Horizon"
              description="Senior advisors with deep local knowledge and a shared belief in doing the quiet work well."
            />
          </Reveal>
          <Reveal delay={80}>
            <TextLink to="/team">Meet the team</TextLink>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {agents.map((agent, index) => (
            <Reveal key={agent.id} delay={index * 70}>
              <TeamCard agent={agent} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
