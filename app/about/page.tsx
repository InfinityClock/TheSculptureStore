import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about The Sculpture Store, our mission, and our team in Chennai.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Our Story</span>
            <h1 className="font-display text-4xl font-bold text-tss-blue mt-3 mb-4">
              Crafting Divine Art Since 2018
            </h1>
            <p className="text-tss-stone font-body leading-relaxed mb-8">
              Founded in Vanagaram, Chennai, The Sculpture Store brings together the finest
              3D printing technology with centuries-old sculpting traditions. Every piece we
              create is a blend of faith, craftsmanship, and modern precision.
            </p>
            <Link href="/shop" className="btn-peach inline-flex">
              Explore Our Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
