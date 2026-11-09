import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <section className="flex min-h-[80vh] items-center bg-cream pb-20 pt-32">
      <div className="shell text-center">
        <p className="eyebrow text-champagne-dark">404</p>
        <h1 className="display-1 mt-5 text-navy">This address is off the market.</h1>
        <p className="body-lg mx-auto mt-6 max-w-xl">
          The page you are looking for may have moved, or the property is no longer listed. Our
          current portfolio is only a click away.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/properties" size="lg" icon>
            Browse properties
          </Button>
          <Link
            to="/"
            className="inline-flex h-14 items-center gap-2 px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:text-champagne-dark"
          >
            <Icon name="arrow-left" size={15} />
            Back home
          </Link>
        </div>
      </div>
    </section>
  )
}
