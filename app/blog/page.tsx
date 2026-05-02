import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories, craft insights, and inspiration from The Sculpture Store.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Insights & Stories</span>
            <h1 className="font-display text-4xl font-bold text-tss-blue mt-3 mb-4">
              Our Blog
            </h1>
            <p className="text-tss-stone font-body leading-relaxed mb-8">
              Dive into the world of sculpting, art, and spirituality. Stories from our
              studio, care guides for your sculptures, and the mythology behind the idols
              we create — coming soon.
            </p>
            <Link href="/" className="btn-blue-outline inline-flex">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
