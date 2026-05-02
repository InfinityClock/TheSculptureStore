import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Track your sculpture order from The Sculpture Store.',
}

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-16">
          <div className="max-w-lg mx-auto text-center">
            <span className="section-label">Order Status</span>
            <h1 className="font-display text-4xl font-bold text-tss-blue mt-3 mb-4">Track Your Order</h1>
            <p className="text-tss-stone font-body leading-relaxed mb-8">
              Real-time order tracking is coming soon. In the meantime, WhatsApp us your
              Order ID and we&apos;ll give you an instant update.
            </p>
            <a
              href="https://wa.me/917900060026?text=Hi%2C%20I%27d%20like%20to%20track%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-peach inline-flex"
            >
              Track via WhatsApp
            </a>
            <p className="mt-4">
              <Link href="/account" className="text-sm text-tss-blue font-body underline underline-offset-2 hover:text-tss-peach transition-colors">
                View My Account
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
