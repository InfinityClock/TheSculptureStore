import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryNav from '@/components/home/CategoryNav'
import BestSellers from '@/components/home/BestSellers'
import ProcessSection from '@/components/home/ProcessSection'
import StorySection from '@/components/home/StorySection'
import CollectionsGrid from '@/components/home/CollectionsGrid'
import Testimonials from '@/components/home/Testimonials'
import TrustSection from '@/components/home/TrustSection'
import BrandsSection from '@/components/home/BrandsSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategoryNav />
        <BestSellers />
        <ProcessSection />
        <StorySection />
        <CollectionsGrid />
        <Testimonials />
        <TrustSection />
        <BrandsSection />
      </main>
      <Footer />
    </>
  )
}
