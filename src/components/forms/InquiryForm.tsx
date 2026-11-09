import { useState } from 'react'
import type { Property } from '@/data/properties'
import { isEmail } from '@/lib/utils'
import { saveInquiry } from '@/lib/inquiries'
import { Icon } from '@/components/ui/Icon'
import { TextField } from '@/components/ui/Field'

type Mode = 'contact' | 'viewing'

interface InquiryFormProps {
  mode?: Mode
  property?: Property
  onDone?: () => void
}

interface FormState {
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
}

const emptyForm: FormState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  message: '',
}

export function InquiryForm({ mode = 'contact', property, onDone }: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sent, setSent] = useState(false)

  const set = (key: keyof FormState) => (value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const today = new Date().toISOString().slice(0, 10)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof FormState, string>> = {}

    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.'
    if (!isEmail(form.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    if (mode === 'viewing') {
      if (!form.date) nextErrors.date = 'Please choose a preferred date.'
      if (!form.time) nextErrors.time = 'Please choose a preferred time.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    saveInquiry({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message:
        form.message.trim() ||
        (property
          ? `I would like to ${mode === 'viewing' ? 'arrange a viewing of' : 'learn more about'} ${property.name}.`
          : ''),
      mode,
      property: property?.name,
    })

    setSent(true)
  }

  if (sent) {
    return (
      <div role="status" className="rounded-[20px] bg-cream px-6 py-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-champagne/20 text-champagne-dark">
          <Icon name="check" size={26} />
        </span>
        <h3 className="display-3 mt-5 text-navy">
          {mode === 'viewing' ? 'Viewing request received' : 'Thank you for reaching out'}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
          {form.name.split(' ')[0]}, a member of our team will be in touch within one business
          day{mode === 'viewing' && form.date ? ` to confirm ${form.date} at ${form.time}` : ''}.
        </p>
        {onDone ? (
          <button
            type="button"
            onClick={onDone}
            className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-navy px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-700"
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSent(false)
              setForm(emptyForm)
            }}
            className="mt-7 inline-flex h-11 items-center justify-center rounded-full border border-navy/15 px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Send another message
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          value={form.name}
          onChange={set('name')}
          placeholder="Jane Whitmore"
          autoComplete="name"
          required
          error={errors.name}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="jane@example.com"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      <div className={mode === 'viewing' ? 'mt-5 grid gap-5 sm:grid-cols-3' : 'mt-5'}>
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          placeholder="(555) 000-0000"
          autoComplete="tel"
        />
        {mode === 'viewing' ? (
          <>
            <TextField
              label="Preferred date"
              name="date"
              type="date"
              value={form.date}
              onChange={set('date')}
              min={today}
              required
              error={errors.date}
            />
            <TextField
              label="Preferred time"
              name="time"
              type="time"
              value={form.time}
              onChange={set('time')}
              required
              error={errors.time}
            />
          </>
        ) : null}
      </div>

      <TextField
        className="mt-5"
        label={mode === 'viewing' ? 'Anything we should know?' : 'How can we help?'}
        name="message"
        value={form.message}
        onChange={set('message')}
        placeholder={
          mode === 'viewing'
            ? 'I would like to see the house on a weekday afternoon.'
            : 'Tell us what you are looking for.'
        }
        rows={4}
      />

      <button
        type="submit"
        className="group mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-navy px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-navy-700 sm:w-auto sm:px-9"
      >
        {mode === 'viewing' ? 'Request viewing' : 'Send message'}
        <Icon
          name="arrow-right"
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <p className="mt-4 text-[11px] leading-relaxed text-ink/40">
        By submitting this form you agree to be contacted about this enquiry. Your details are
        never shared or sold.
      </p>
    </form>
  )
}
