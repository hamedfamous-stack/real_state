import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, services, site } from '@/data/site'
import { isEmail } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'

const socials = [
  { label: 'Instagram', icon: 'instagram' as const, href: '#' },
  { label: 'LinkedIn', icon: 'linkedin' as const, href: '#' },
  { label: 'Facebook', icon: 'facebook' as const, href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [joined, setJoined] = useState(false)

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault()
    if (!isEmail(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="bg-navy-950 text-white">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              A private real estate advisory representing architectural homes and considered
              investments across the United States since 2001.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-champagne hover:text-champagne"
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-champagne">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-champagne">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-champagne">
              Newsletter
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              A considered note on new listings, market movement and architecture. Sent monthly.
            </p>

            {joined ? (
              <p
                role="status"
                className="mt-5 flex items-start gap-2 rounded-2xl border border-champagne/30 bg-champagne/10 px-4 py-3 text-[13px] text-champagne-light"
              >
                <Icon name="check" size={16} className="mt-0.5 shrink-0" />
                You’re on the list. Look out for our next note.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-5" noValidate>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 focus-within:border-champagne/60">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setError('')
                    }}
                    placeholder="Your email address"
                    className="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to the newsletter"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne text-navy-950 transition-colors hover:bg-champagne-light"
                  >
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
                {error ? (
                  <p id="newsletter-error" className="mt-2 pl-4 text-[11px] text-red-300">
                    {error}
                  </p>
                ) : null}
              </form>
            )}

            <div className="mt-8 space-y-2.5 text-sm text-white/55">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="phone" size={14} className="text-champagne" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="mail" size={14} className="text-champagne" />
                {site.email}
              </a>
              <p className="flex items-start gap-3">
                <Icon name="pin" size={14} className="mt-0.5 shrink-0 text-champagne" />
                {site.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="transition-colors hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Terms
            </a>
            <span>Licensed Texas Real Estate Brokerage</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
