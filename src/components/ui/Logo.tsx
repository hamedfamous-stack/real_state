import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  light?: boolean
  className?: string
  onClick?: () => void
}

export function Logo({ light = false, className, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Horizon Properties — home"
      className={cn('group flex items-center gap-3', className)}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M6 28h28"
          stroke="#C2A57B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9.5 22a10.5 10.5 0 0 1 21 0"
          stroke="#C2A57B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16 14.5L20 6l4 8.5"
          stroke={light ? '#F7F4EE' : '#13253F'}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 6v16" stroke="#C2A57B" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[15px] font-extrabold tracking-[0.16em] transition-colors',
            light ? 'text-white' : 'text-navy',
          )}
        >
          HORIZON
        </span>
        <span
          className={cn(
            'mt-1 text-[8px] font-semibold tracking-[0.34em]',
            light ? 'text-white/60' : 'text-ink/50',
          )}
        >
          PROPERTIES
        </span>
      </span>
    </Link>
  )
}
