import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Shipping policy, delivery timelines, and returns for The Sculpture Store.',
}

const POLICIES = [
  {
    title: 'Standard Delivery',
    body: 'Orders are dispatched within 3–5 business days. Delivery takes 5–7 business days within India. Free on all orders above ₹999.',
  },
  {
    title: 'Express Delivery',
    body: 'Available for an additional ₹149. Orders are prioritised and delivered within 2–3 business days.',
  },
  {
    title: 'International Shipping',
    body: 'We ship to 50+ countries. International orders typically arrive within 14–21 business days depending on the destination.',
  },
  {
    title: '7-Day Return Policy',
    body: 'Not satisfied? Return your order within 7 days of delivery. Items must be in original, undamaged condition. Custom orders are non-returnable.',
  },
  {
    title: 'Damaged in Transit',
    body: 'If your sculpture arrives damaged, please photograph and WhatsApp us within 48 hours of delivery. We will replace the item at no extra cost.',
  },
]

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Policies</span>
              <h1 className="font-display text-4xl font-bold text-tss-blue mt-3 mb-2">Shipping & Returns</h1>
            </div>
            <div className="space-y-4">
              {POLICIES.map(({ title, body }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-display font-bold text-tss-blue mb-2">{title}</h2>
                  <p className="text-tss-stone font-body text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
