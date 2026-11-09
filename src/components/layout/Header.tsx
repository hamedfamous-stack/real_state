import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, site } from '@/data/site'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const isHome = pathname === '/'
  const solid = !isHome || scrolled
  const lightText = !solid || open

  useEffect(() => {
    const onScroll = () => {
      // The home hero is pinned for a long scroll-driven film, so the header has to
      // stay light over it until the hero section itself has scrolled away.
      const hero = isHome ? document.getElementById('hero') : null
      const overHero = hero ? hero.getBoundingClientRect().bottom > 80 : false
      setScrolled(overHero ? false : window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-premium',
          open
            ? 'bg-navy-950'
            : solid
              ? 'border-b border-navy/[0.07] bg-white/95 shadow-[0_10px_40px_-30px_rgba(9,24,43,0.6)] backdrop-blur-md'
              : 'bg-gradient-to-b from-navy-950/75 via-navy-950/25 to-transparent',
        )}
      >
        <div className="shell relative flex h-[74px] items-center justify-between gap-4 lg:h-[88px]">
          <Logo
            light={lightText}
            onClick={() => setOpen(false)}
            className="relative z-10"
          />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-active={isActive(link.to)}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={cn(
                  'nav-underline relative py-2 text-[12px] font-semibold tracking-[0.06em] transition-colors duration-300',
                  lightText
                    ? 'text-white/85 hover:text-white'
                    : 'text-ink/65 hover:text-navy',
                  isActive(link.to) && (lightText ? 'text-white' : 'text-navy'),
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={cn(
                'hidden h-11 items-center gap-2.5 rounded-full border px-5 text-[11px] font-semibold tracking-[0.1em] transition-all duration-300 ease-premium lg:inline-flex',
                lightText
                  ? 'border-white/30 text-white hover:border-white hover:bg-white hover:text-navy'
                  : 'border-navy/20 text-navy hover:bg-navy hover:text-white',
              )}
            >
              <Icon name="phone" size={14} />
              {site.phone}
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                lightText
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-navy/15 text-navy hover:bg-navy/5',
              )}
            >
              <Icon name={open ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-navy-950 px-6 pb-8 pt-[92px] transition-all duration-500 ease-premium lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center justify-between border-b border-white/10 py-5 text-2xl font-semibold tracking-[-0.01em] transition-all duration-500 ease-premium',
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                isActive(link.to) ? 'text-champagne' : 'text-white',
              )}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
            >
              {link.label}
              <Icon name="arrow-up-right" size={20} className="text-white/40" />
            </Link>
          ))}
        </nav>

        <div
          className={cn(
            'mt-auto space-y-5 pt-10 transition-all delay-200 duration-500',
            open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          <a
            href={site.phoneHref}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3 text-sm font-medium text-white/80"
          >
            <Icon name="phone" size={16} className="text-champagne" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3 text-sm font-medium text-white/80"
          >
            <Icon name="mail" size={16} className="text-champagne" />
            {site.email}
          </a>
          <Link
            to="/properties"
            tabIndex={open ? 0 : -1}
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-champagne text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    </>
  )
}
