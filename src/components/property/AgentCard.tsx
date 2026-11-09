import type { Agent } from '@/data/site'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'

interface AgentCardProps {
  agent: Agent
  onContact: () => void
  onSchedule: () => void
}

export function AgentCard({ agent, onContact, onSchedule }: AgentCardProps) {
  return (
    <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist">
          <Photo
            id={agent.image}
            alt={agent.name}
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-champagne-dark">
            Listing advisor
          </p>
          <p className="mt-1 text-base font-bold leading-tight text-navy">{agent.name}</p>
          <p className="mt-0.5 text-[12px] text-ink/55">{agent.role}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-line pt-5 text-[13px]">
        <a
          href={`tel:${agent.phone.replace(/[^+\d]/g, '')}`}
          className="flex items-center gap-3 text-ink/65 transition-colors hover:text-navy"
        >
          <Icon name="phone" size={15} className="text-champagne-dark" />
          {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-3 break-all text-ink/65 transition-colors hover:text-navy"
        >
          <Icon name="mail" size={15} className="text-champagne-dark" />
          {agent.email}
        </a>
      </div>

      <div className="mt-6 space-y-2.5">
        <button
          type="button"
          onClick={onContact}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-navy-700"
        >
          Contact agent
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
        <button
          type="button"
          onClick={onSchedule}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-navy/15 text-[11px] font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
        >
          <Icon name="calendar" size={15} />
          Schedule a viewing
        </button>
      </div>
    </div>
  )
}
