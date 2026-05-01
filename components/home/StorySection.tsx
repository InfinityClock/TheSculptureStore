'use client'

import Link from 'next/link'
import { ArrowRight, UserCircle2, Box } from 'lucide-react'

export default function StorySection() {
  return (
    <section id="story" className="section-padding overflow-hidden relative" style={{ backgroundColor: '#0D1E2E' }}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Side */}
          <div className="flex flex-col items-start z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-tss-peach/20 bg-white/5 backdrop-blur-sm mb-8">
              <span className="text-tss-peach"><Box size={14} /></span>
              <span className="text-tss-peach text-[10px] font-bold tracking-widest uppercase font-body">MINIWORKS DESIGN · CHENNAI, INDIA</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              We turn tradition<br />
              into <span className="peach-text italic">3D sculptures.</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 font-body text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              We started in Chennai with one belief: divine art belongs in every home. Today, Miniworks Design ships hand-crafted 3D sculptures to 50+ countries, blending precision technology with the soul of Indian craftsmanship.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link href="/shop" className="px-6 py-3 rounded-xl text-base font-semibold flex items-center gap-2 hover:gap-3 transition-all" style={{ background: '#F5C518', color: '#1A1A1A' }}>
                Start Your Order <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-white-outline px-6 py-3 rounded-xl text-base font-semibold flex items-center gap-2 hover:bg-white/10 transition-all border-white/20">
                <UserCircle2 size={20} className="text-white/70" /> Meet the Founder
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img src="/images/products/ganesha-dashboard.png" alt="Miniature" className="w-10 h-10 rounded-full border-2 border-[#0D1E2E] object-cover bg-white" />
                <img src="/images/products/apj-kalam-monument.png" alt="Miniature" className="w-10 h-10 rounded-full border-2 border-[#0D1E2E] object-cover bg-white" />
                <img src="/images/products/shiva-nataraja.png" alt="Miniature" className="w-10 h-10 rounded-full border-2 border-[#0D1E2E] object-cover bg-white" />
              </div>
              <div>
                <p className="text-white font-bold font-body text-sm leading-tight">10,000+ Masterpieces Crafted</p>
                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase font-body">ACROSS THE WORLD</p>
              </div>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] rounded-[32px] overflow-hidden group">
            <img 
              src="/images/founder.jpeg"
              alt="Founder Jagadesh Koteesvaran with Sculpture" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Top Right Floating Badge */}
            <div className="absolute top-6 right-6 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 items-start shadow-xl max-w-[140px] backdrop-blur-xl bg-[#0D1E2E]/60">
              <div className="w-10 h-10 rounded-full bg-[#F5C518] flex items-center justify-center text-[#1A1A1A]">
                <Box size={20} />
              </div>
              <p className="text-white font-body font-bold text-sm leading-tight mt-1">Micron-level.<br/>Infinite Detail.</p>
            </div>

            {/* Bottom Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-xl bg-[#0D1E2E]/60">
              <div>
                <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase font-body mb-1">FOUNDER & CEO</p>
                <p className="text-white font-display font-bold text-xl mb-0.5">Jagadesh Koteesvaran</p>
                <p className="text-white/50 text-xs font-body">Founder & 3D Artist · Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
