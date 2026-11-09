import type { Agent } from '@/data/site'
import { Photo } from '@/components/ui/Photo'
import { Icon } from '@/components/ui/Icon'

export function TeamCard({ agent }: { agent: Agent }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-[16px] bg-mist">
        <div className="aspect-[3/4] overflow-hidden">
          <Photo
            id={agent.image}
            alt={`${agent.name}, ${agent.role} at Horizon Properties`}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 300px"
            className="image-zoom saturate-[0.85] transition-[filter] duration-700 group-hover:saturate-100"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-950/75 to-transparent p-4 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${agent.email}`}
              aria-label={`Email ${agent.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              <Icon name="mail" size={14} />
            </a>
            <a
              href={`tel:${agent.phone.replace(/[^+\d]/g, '')}`}
              aria-label={`Call ${agent.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              <Icon name="phone" size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <h3 className="text-[17px] font-bold tracking-[-0.01em] text-navy">{agent.name}</h3>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne-dark">
          {agent.role}
        </p>
      </div>
    </article>
  )
}
