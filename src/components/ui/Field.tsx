import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from './Icon'

interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string } | string>
  className?: string
  id?: string
  compact?: boolean
}

export function Select({ label, value, onChange, options, className, id, compact }: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <div className={cn('relative', className)}>
      <label
        htmlFor={selectId}
        className={cn(
          'block text-[9px] font-bold uppercase tracking-[0.2em] text-ink/45',
          compact ? 'mb-1' : 'mb-2',
        )}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'w-full cursor-pointer appearance-none rounded-full border border-line bg-white py-3 pl-4 pr-10 text-[13px] font-medium text-navy outline-none transition-colors hover:border-navy/25 focus:border-navy/40 focus:ring-2 focus:ring-navy/10',
            compact ? 'h-10' : 'h-11',
          )}
        >
          {options.map((option) => {
            const item = typeof option === 'string' ? { label: option, value: option } : option
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )
          })}
        </select>
        <Icon
          name="chevron-down"
          size={14}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/45"
        />
      </div>
    </div>
  )
}

interface TextFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  error?: string
  required?: boolean
  autoComplete?: string
  className?: string
  rows?: number
  min?: string
}

export function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  required,
  autoComplete,
  className,
  rows,
  min,
}: TextFieldProps) {
  const id = `field-${name}`
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-champagne-dark"> *</span> : null}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-navy/40 focus:ring-2 focus:ring-navy/10"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          min={min}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field-input"
        />
      )}
      {error ? (
        <p id={errorId} className="mt-1.5 pl-1 text-[11px] font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-champagne-dark">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">{label}</p>
        <div className="mt-1 text-sm font-medium leading-relaxed text-navy">{children}</div>
      </div>
    </div>
  )
}

export function TextLink({
  to,
  children,
  className,
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group/link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:text-champagne-dark',
        className,
      )}
    >
      {children}
      <Icon
        name="arrow-up-right"
        size={14}
        className="transition-transform duration-300 ease-premium group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </Link>
  )
}
