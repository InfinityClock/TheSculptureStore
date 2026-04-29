'use client'

import Link from 'next/link'
import { ArrowRight, Star, Shield, Truck, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0D1E2E 0%, #1D3D5C 55%, #1a3450 100%)' }}
    >
      {/* ── Mesh background ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Peach glow - top right */}
        <div className="absolute top-[-5%] right-[-10%] w-[550px] h-[550px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #F4956A 0%, transparent 70%)' }} />
        {/* Blue glow - bottom left */}
        <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #254D73 0%, transparent 70%)' }} />
        {/* Floating dots */}
        {[...Array(16)].map((_, i) => {
          const size = ((i * 7) % 5) + 2;
          return (
            <div key={i} className="absolute rounded-full bg-tss-peach/15 animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${(i * 13) % 100}%`,
                left: `${(i * 29) % 100}%`,
                animationDelay: `${(i * 17) % 6}s`,
                animationDuration: `${4 + ((i * 23) % 5)}s`,
              }} />
          );
        })}
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, #F4956A 0, #F4956A 1px, transparent 0, transparent 60px), repeating-linear-gradient(0deg, #F4956A 0, #F4956A 1px, transparent 0, transparent 60px)' }} />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-28 pb-16 lg:py-0">
        {/* Left */}
        <div className="flex flex-col">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-tss-peach/25 bg-tss-peach/8 px-4 py-2 w-fit mb-7">
            <Sparkles size={13} className="text-tss-peach" />
            <span className="text-xs font-semibold text-tss-peach font-body tracking-wide">Premium · Made in India · Handcrafted</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
            Turn Your Faith Into{' '}
            <span className="peach-text italic">3D Art</span>
          </h1>

          <p className="text-white/55 text-lg leading-relaxed max-w-lg font-body mb-4">
            Hand-sculpted divine idols, custom portraits, monuments & more — crafted with precision in Chennai and delivered to your door anywhere in the world.
          </p>

          <p className="text-tss-peach font-body font-semibold text-base mb-8">
            Starting from ₹699 · 14–21 day delivery · Ships worldwide
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/shop" id="hero-shop-btn" className="btn-peach">
              Order Now <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/917900060026?text=Hi%2C%20I%27d%20like%20to%20order%20a%20sculpture"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-btn"
              className="btn-white-outline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L0 24l6.338-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.955 0-3.79-.53-5.367-1.449l-.385-.228-3.985.948.962-3.91-.252-.4A9.93 9.93 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Star, text: '4.9 Rated', sub: '10,000+ Happy Customers' },
              { icon: Shield, text: 'Hand-painted', sub: 'Museum Quality Finish' },
              { icon: Truck, text: 'Worldwide Shipping', sub: '50+ Countries' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-2.5 glass-dark rounded-full px-4 py-2">
                <Icon size={13} className="text-tss-peach shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white font-body">{text}</div>
                  <div className="text-[10px] text-white/35 font-body">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Image composition */}
        <div className="relative flex items-center justify-center">
          {/* Glow behind image */}
          <div className="absolute w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F4956A 0%, transparent 70%)' }} />

          {/* Main image frame */}
          <div className="relative w-full max-w-[420px]">
            <div className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(244,149,106,0.2), 0 32px 80px rgba(0,0,0,0.5)' }}>
              <img
                src="/images/products/ganesha-blessing.png"
                alt="Premium Lord Ganesha Sculpture - The Sculpture Store"
                className="w-full aspect-[4/5] object-cover bg-white"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tss-blue-deep/70 via-transparent to-transparent" />

              {/* Product badge */}
              <div className="absolute bottom-5 left-5 right-5 glass-dark rounded-2xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold font-display">Lord Ganesha</p>
                  <p className="text-tss-peach text-xs font-body">Blessing Pose · 12 inch</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold font-body">₹2,499</p>
                  <p className="text-white/35 text-xs line-through font-body">₹3,499</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 glass-dark rounded-2xl px-4 py-3 animate-float"
              style={{ animationDelay: '1s' }}>
              <p className="text-tss-peach text-xs font-semibold font-body">⭐ 4.9 Rating</p>
              <p className="text-white/40 text-[10px] font-body">10,000+ Happy Customers</p>
            </div>

            <div className="absolute -bottom-4 -left-4 glass-dark rounded-2xl px-4 py-3 animate-float"
              style={{ animationDelay: '2.5s' }}>
              <p className="text-tss-peach text-xs font-semibold font-body">🎨 Handcrafted</p>
              <p className="text-white/40 text-[10px] font-body">Made in India with love</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/25 text-[10px] font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-tss-peach/40 to-transparent" />
      </div>
    </section>
  )
}
