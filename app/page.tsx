import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryNav from '@/components/home/CategoryNav'
import BestSellers from '@/components/home/BestSellers'
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
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Category Navigation */}
        <CategoryNav />

        {/* 3. Best Sellers */}
        <BestSellers />

        {/* 4. Story Section */}
        <StorySection />

        {/* 5. Collections Grid */}
        <CollectionsGrid />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. Trust Section */}
        <TrustSection />

        {/* 8. Brands - Miniworks Design Merchandise */}
        <BrandsSection />
      </main>
      <Footer />
    </>
  )
}
