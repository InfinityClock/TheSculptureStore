import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about The Sculpture Store, our products, and delivery.',
}

const FAQS = [
  {
    q: 'What materials are your sculptures made from?',
    a: 'Our sculptures use high-quality PLA and resin compounds, hand-painted with acrylic and UV-cured lacquer for a durable, museum-quality finish.',
  },
  {
    q: 'Can I customise the size or colour of a sculpture?',
    a: 'Yes! Most products are available in multiple sizes. For custom colours or special requests, WhatsApp us before ordering.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery is 5–7 business days within India. Express delivery is 2–3 days. International orders take 14–21 days.',
  },
  {
    q: 'Do you offer bulk or corporate orders?',
    a: 'Absolutely. We offer special pricing for bulk orders above 20 units. Contact us via WhatsApp to discuss your requirements.',
  },
  {
    q: 'Are the sculptures safe for temple use?',
    a: 'Yes. Our divine idols are finished with non-toxic, heat-resistant coatings and are suitable for home temple and altar use.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 7-day hassle-free return on all non-custom orders. Custom and personalised sculptures are non-returnable.',
  },
]

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Help Centre</span>
              <h1 className="font-display text-4xl font-bold text-tss-blue mt-3 mb-2">
                Frequently Asked Questions
              </h1>
            </div>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-display font-bold text-tss-blue mb-2 text-base">{q}</h2>
                  <p className="text-tss-stone font-body text-sm leading-relaxed">{a}</p>
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
