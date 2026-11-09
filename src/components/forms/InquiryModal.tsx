import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Property } from '@/data/properties'
import { Icon } from '@/components/ui/Icon'
import { InquiryForm } from './InquiryForm'

interface InquiryModalProps {
  open: boolean
  mode: 'contact' | 'viewing'
  property?: Property
  onClose: () => void
}

export function InquiryModal({ open, mode, property, onClose }: InquiryModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocus.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/65 backdrop-blur-[2px]"
        tabIndex={-1}
      />

      <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[26px] bg-white p-6 shadow-float sm:rounded-[24px] sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-champagne-dark">
              {mode === 'viewing' ? 'Private viewing' : 'Speak with us'}
            </p>
            <h2 id="inquiry-title" className="display-3 mt-3 text-navy">
              {mode === 'viewing' ? 'Arrange a viewing' : 'Contact an advisor'}
            </h2>
            {property ? (
              <p className="mt-2 text-[13px] text-ink/55">
                {property.name} · {property.city}, {property.region}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-colors hover:bg-navy hover:text-white"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-7">
          <InquiryForm mode={mode} property={property} onDone={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  )
}
