import { properties } from '@/data/properties'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TextLink } from '@/components/ui/Field'
import { PropertyCarousel } from '@/components/property/PropertyCarousel'

export function FeaturedProperties() {
  const featured = properties.filter((property) => property.featured)

  return (
    <section className="bg-cream py-20 lg:py-28" aria-labelledby="featured-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="Featured"
            title="Featured Properties"
            description="A considered selection of homes currently represented by Horizon — from lakeside modernism to oceanfront quiet."
            align="center"
          />
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <PropertyCarousel properties={featured} />
        </Reveal>

        <div className="mt-10 flex justify-center">
          <TextLink to="/properties">View all properties</TextLink>
        </div>
      </div>
    </section>
  )
}
