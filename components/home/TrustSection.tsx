import { Users, Gem, MapPin, Truck, RefreshCw, Headphones } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: Users, number: '10,000+', label: 'Happy Customers', sub: 'Across 15+ Indian states' },
  { icon: Gem, number: '500+', label: 'Unique Designs', sub: 'Handcrafted masterpieces' },
  { icon: MapPin, number: '100%', label: 'Made in India', sub: 'Proudly Indian craftsmanship' },
  { icon: Truck, number: 'Free', label: 'Pan India Shipping', sub: 'On orders above ₹999' },
  { icon: RefreshCw, number: '7-Day', label: 'Easy Returns', sub: 'No questions asked' },
  { icon: Headphones, number: '24/7', label: 'Customer Support', sub: 'Always here for you' },
]

export default function TrustSection() {
  return (
    <section id="trust" className="section-padding relative overflow-hidden" style={{ background: '#132A40' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #F4956A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #F4956A 0%, transparent 70%)' }} />

      <div className="container-wide relative z-10">
        <div className="text-center mb-14">
          <span className="section-label">Why Choose Us</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            The <span className="peach-text">TSS</span> Promise
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto font-body leading-relaxed text-[15px]">
            Every order is backed by our commitment to quality, authenticity, and your complete satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {TRUST_ITEMS.map(({ icon: Icon, number, label, sub }) => (
            <div key={label}
              className="group flex flex-col items-center text-center p-5 lg:p-6 rounded-2xl border border-white/8 hover:border-tss-peach/30 bg-white/3 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-tss-peach/10 border border-tss-peach/20 flex items-center justify-center mb-4 group-hover:bg-tss-peach/20 transition-colors">
                <Icon size={20} className="text-tss-peach" />
              </div>
              <div className="font-display text-2xl font-bold text-tss-peach mb-1">{number}</div>
              <div className="font-body font-semibold text-white text-sm mb-1">{label}</div>
              <div className="font-body text-white/35 text-xs leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {['🔒 Secure Checkout', '🎁 Gift Wrapping', '⚡ Express Delivery', '🇮🇳 GST Invoice', '💳 EMI Available', '📦 Tamper-proof Packaging'].map(badge => (
            <div key={badge} className="glass-dark rounded-full px-4 py-2 text-sm text-white/50 font-body">{badge}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
