import { Users, Paintbrush, MapPin, Globe, Clock, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const TRUST_ITEMS = [
  { icon: Users, number: '10,000+', label: 'Happy Customers', sub: 'Across India & worldwide' },
  { icon: Paintbrush, number: 'Hand-painted', label: 'Museum Finish', sub: 'Food-safe resin, full colour' },
  { icon: MapPin, number: 'Chennai', label: 'Made in India', sub: 'Miniworks Design Studio' },
  { icon: Globe, number: '50+', label: 'Countries Served', sub: 'Worldwide shipping available' },
  { icon: Clock, number: '14–21', label: 'Day Turnaround', sub: 'From order to your door' },
  { icon: MessageCircle, number: '24hr', label: 'Response Time', sub: 'WhatsApp & email support' },
]

export default function TrustSection() {
  return (
    <section id="trust" className="section-padding bg-white border-t border-gray-100">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="section-label">Why Choose Us</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-tss-blue mt-2">
            The Miniworks Promise
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto font-body leading-relaxed text-[15px]">
            Good quality, honest pricing, delivered on time, on every single order.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, number, label, sub }) => (
            <div
              key={label}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-tss-peach/30 hover:bg-white transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-tss-peach/10 flex items-center justify-center mb-3 group-hover:bg-tss-peach/20 transition-colors">
                <Icon size={20} className="text-tss-peach" />
              </div>
              <div className="font-display text-lg font-bold text-tss-blue mb-0.5">{number}</div>
              <div className="font-body font-semibold text-tss-blue text-xs mb-1">{label}</div>
              <div className="font-body text-gray-400 text-[11px] leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {['🔒 Secure Checkout', '🎁 Gift Wrapping', '⚡ Express Delivery', '🇮🇳 GST Invoice', '💳 EMI Available', '📦 Tamper-proof Packaging'].map(badge => (
            <span key={badge} className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-500 font-body">{badge}</span>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="btn-peach">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}
