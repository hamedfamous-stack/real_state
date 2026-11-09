import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  label: string
  title: ReactNode
  description?: string
  children?: ReactNode
  className?: string
}

export function PageHero({ label, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn('bg-cream pb-14 pt-32 sm:pt-36 lg:pb-20 lg:pt-44', className)}>
      <div className="shell">
        <p className="eyebrow text-champagne-dark">{label}</p>
        <h1 className="display-1 mt-4 max-w-4xl text-navy">{title}</h1>
        {description ? <p className="body-lg mt-6 max-w-2xl">{description}</p> : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  )
}
