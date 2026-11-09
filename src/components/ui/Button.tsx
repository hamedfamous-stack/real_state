import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from './Icon'

type Variant = 'primary' | 'outline' | 'light' | 'champagne' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  icon?: boolean
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white hover:bg-navy-700 shadow-[0_10px_30px_-18px_rgba(9,24,43,0.7)]',
  outline:
    'border border-white/35 text-white hover:bg-white hover:text-navy',
  light:
    'border border-navy/20 text-navy hover:bg-navy hover:text-white',
  champagne:
    'bg-champagne text-navy-950 hover:bg-champagne-light',
  ghost:
    'text-navy hover:text-champagne-dark',
}

const sizes = {
  sm: 'h-10 px-5 text-[11px]',
  md: 'h-12 px-6 text-[12px]',
  lg: 'h-14 px-8 text-[12px]',
}

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap'

function Content({ children, icon }: { children: ReactNode; icon?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform duration-300 ease-premium group-hover/btn:translate-x-1"
        />
      ) : null}
    </>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon = false,
  className,
  type = 'button',
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        <Content icon={icon}>{children}</Content>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        <Content icon={icon}>{children}</Content>
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Content icon={icon}>{children}</Content>
    </button>
  )
}
