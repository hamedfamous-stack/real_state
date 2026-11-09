import { site } from '@/data/site'
import { photoIds } from '@/lib/images'
import { usePageTitle } from '@/hooks/usePageTitle'
import { PageHero } from '@/components/shared/PageHero'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { Photo } from '@/components/ui/Photo'
import { Icon } from '@/components/ui/Icon'
import { InfoRow } from '@/components/ui/Field'

export default function Contact() {
  usePageTitle('Contact')

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`

  return (
    <>
      <PageHero
        label="Contact"
        title="Let’s talk about your next move."
        description="Tell us what you are looking for — or what you are thinking of selling. A senior advisor will reply within one business day."
      />

      <section className="bg-white py-16 lg:py-24" aria-label="Contact Horizon Properties">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="rounded-[22px] border border-line bg-cream/50 p-7 sm:p-8">
              <p className="eyebrow text-champagne-dark">Direct</p>
              <h2 className="display-3 mt-3 text-navy">Speak with us</h2>

              <div className="mt-7 space-y-6">
                <InfoRow icon={<Icon name="phone" size={17} />} label="Phone">
                  <a href={site.phoneHref} className="transition-colors hover:text-champagne-dark">
                    {site.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={<Icon name="mail" size={17} />} label="Email">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all transition-colors hover:text-champagne-dark"
                  >
                    {site.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<Icon name="pin" size={17} />} label="Office">
                  <p>{site.address}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-champagne-dark hover:text-navy"
                  >
                    Get directions
                    <Icon name="arrow-up-right" size={12} />
                  </a>
                </InfoRow>
                <InfoRow icon={<Icon name="clock" size={17} />} label="Hours">
                  <p>{site.hours}</p>
                  <p className="text-[12px] text-ink/45">Weekend viewings by appointment</p>
                </InfoRow>
              </div>
            </div>

            <div className="group relative mt-5 overflow-hidden rounded-[22px]">
              <div className="aspect-[16/10] overflow-hidden">
                <Photo
                  id={photoIds.aboutSide}
                  alt="Horizon Properties office interior"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="image-zoom"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Austin · By appointment
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[22px] border border-line bg-white p-7 shadow-card sm:p-9">
              <p className="eyebrow text-champagne-dark">Send a message</p>
              <h2 className="display-3 mt-3 text-navy">How can we help?</h2>
              <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-ink/55">
                Whether you are beginning a search, considering a sale or simply want a view on
                the market, we are happy to talk.
              </p>

              <div className="mt-8">
                <InquiryForm mode="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
