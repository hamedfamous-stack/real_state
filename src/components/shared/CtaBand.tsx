import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function CtaBand() {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="cta-title">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[24px] bg-[#EDF1F5] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-navy/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-24 h-56 w-56 rounded-full border border-navy/[0.05]"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white bg-white text-navy shadow-card sm:h-16 sm:w-16">
                <Icon name="key" size={24} strokeWidth={1.4} />
              </span>
              <div>
                <h2 id="cta-title" className="display-3 max-w-xl text-navy">
                  Ready to Find Your Perfect Property?
                </h2>
                <p className="mt-2 text-sm text-ink/55">
                  Let our experts guide you to the right home or investment.
                </p>
              </div>
            </div>

            <Button to="/contact" variant="primary" size="lg" icon className="shrink-0">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
