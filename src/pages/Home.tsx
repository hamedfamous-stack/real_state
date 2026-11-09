import { Hero } from '@/components/home/Hero'
import { WhoWeAre } from '@/components/home/WhoWeAre'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { WhyChoose } from '@/components/home/WhyChoose'
import { TeamPreview } from '@/components/home/TeamPreview'
import { CtaBand } from '@/components/shared/CtaBand'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Home() {
  usePageTitle('Exceptional homes & investments')

  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <ServicesPreview />
      <WhyChoose />
      <TeamPreview />
      <CtaBand />
    </>
  )
}
