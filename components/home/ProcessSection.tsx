import { Camera, Paintbrush, PackageCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
  {
    num: '01',
    icon: Camera,
    title: 'Choose & Customise',
    body: 'Browse our catalogue or send us your photo/reference. Tell us the size, finish, and any personalisation. We review and confirm within 24 hours.',
    color: '#F4956A',
  },
  {
    num: '02',
    icon: Paintbrush,
    title: 'We Craft It',
    body: 'Our Chennai studio 3D-prints your sculpture with food-safe resin, then our artists hand-paint every detail to museum quality. Takes 14–21 days.',
    color: '#C9A227',
  },
  {
    num: '03',
    icon: PackageCheck,
    title: 'Delivered to Your Door',
    body: 'Packed in premium gift-ready packaging and shipped anywhere in India and to 50+ countries worldwide. Tracking link sent on dispatch.',
    color: '#1D3D5C',
  },
]

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="section-padding bg-tss-cream">
      <div className="container-wide">
        <div className="text-center mb-14">
          <span className="section-label">Simple Process</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-tss-blue mt-2">
            How It <span className="peach-text">Works</span>
          </h2>
          <p className="text-tss-stone mt-4 max-w-xl mx-auto font-body leading-relaxed text-[15px]">
            From your idea to your doorstep, good quality, honest pricing, delivered on time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-tss-peach/30 via-gold/30 to-tss-blue/30 z-0" />

          {STEPS.map(({ num, icon: Icon, title, body, color }) => (
            <div key={num} className="relative z-10 flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-tss-blue/6 shadow-card hover:-translate-y-1 transition-all duration-300 group">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
              >
                <Icon size={26} style={{ color }} />
              </div>
              <div className="font-body text-[11px] font-bold tracking-[0.2em] mb-2" style={{ color }}>
                STEP {num}
              </div>
              <h3 className="font-display text-xl font-bold text-tss-blue mb-3">{title}</h3>
              <p className="text-tss-stone text-sm leading-relaxed font-body">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link href="/shop" className="btn-peach">
            Start Your Order <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/917900060026?text=Hi%2C%20I%20want%20to%20order%20a%20sculpture%20from%20The%20Sculpture%20Store"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L0 24l6.338-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.955 0-3.79-.53-5.367-1.449l-.385-.228-3.985.948.962-3.91-.252-.4A9.93 9.93 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
