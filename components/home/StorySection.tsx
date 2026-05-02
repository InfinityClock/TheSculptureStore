'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, UserCircle2, Box } from 'lucide-react'

export default function StorySection() {
  return (
    <section id="story" className="overflow-hidden relative" style={{ backgroundColor: '#0D1E2E' }}>

      {/* Mobile layout — stacked */}
      <div className="lg:hidden container-wide pt-16 pb-12 flex flex-col gap-10">
        {/* Text */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-tss-peach/20 bg-white/5 mb-6">
            <span className="text-tss-peach"><Box size={13} /></span>
            <span className="text-tss-peach text-[10px] font-bold tracking-widest uppercase font-body">MINIWORKS DESIGN · CHENNAI, INDIA</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-4 leading-[1.15]">
            We turn tradition into <span className="peach-text italic">3D sculptures.</span>
          </h2>
          <p className="text-white/55 font-body text-sm leading-relaxed mb-8">
            We started in Chennai with one belief: divine art belongs in every home. Today, Miniworks Design ships hand-crafted 3D sculptures to 50+ countries, blending precision technology with the soul of Indian craftsmanship.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/shop" className="px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2" style={{ background: '#F5C518', color: '#1A1A1A' }}>
              Start Your Order <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-white-outline px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 border-white/20">
              <UserCircle2 size={18} className="text-white/70" /> Meet the Founder
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              <div className="relative w-9 h-9 rounded-full border-2 border-[#0D1E2E] overflow-hidden bg-white"><Image src="/images/products/ganesha-dashboard.png" alt="" fill className="object-cover" /></div>
              <div className="relative w-9 h-9 rounded-full border-2 border-[#0D1E2E] overflow-hidden bg-white"><Image src="/images/products/apj-kalam-monument.png" alt="" fill className="object-cover" /></div>
              <div className="relative w-9 h-9 rounded-full border-2 border-[#0D1E2E] overflow-hidden bg-white"><Image src="/images/products/shiva-nataraja.png" alt="" fill className="object-cover" /></div>
            </div>
            <div>
              <p className="text-white font-bold font-body text-sm leading-tight">10,000+ Masterpieces Crafted</p>
              <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase font-body">ACROSS THE WORLD</p>
            </div>
          </div>
        </div>

        {/* Founder photo — mobile */}
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '340px' }}>
          <Image
            src="/images/founder.jpeg"
            alt="Founder Jagadesh Koteesvaran"
            fill
            className="object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0D1E2E] to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-display font-bold text-base">Jagadesh Koteesvaran</p>
            <p className="text-white/50 text-xs font-body">Founder & 3D Artist · Chennai, Tamil Nadu</p>
          </div>
        </div>
      </div>

      {/* Desktop layout — side by side */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 lg:min-h-[820px] items-stretch">

        {/* Left — copy */}
        <div className="container-wide flex flex-col justify-center py-24 pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pr-0 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-tss-peach/20 bg-white/5 backdrop-blur-sm mb-8 self-start">
            <span className="text-tss-peach"><Box size={14} /></span>
            <span className="text-tss-peach text-[10px] font-bold tracking-widest uppercase font-body">MINIWORKS DESIGN · CHENNAI, INDIA</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            We turn tradition<br />into <span className="peach-text italic">3D sculptures.</span>
          </h2>
          <p className="text-white/60 font-body text-lg leading-relaxed max-w-lg mb-10">
            We started in Chennai with one belief: divine art belongs in every home. Today, Miniworks Design ships hand-crafted 3D sculptures to 50+ countries, blending precision technology with the soul of Indian craftsmanship.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link href="/shop" className="px-6 py-3 rounded-xl text-base font-semibold flex items-center gap-2 hover:gap-3 transition-all" style={{ background: '#F5C518', color: '#1A1A1A' }}>
              Start Your Order <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-white-outline px-6 py-3 rounded-xl text-base font-semibold flex items-center gap-2 hover:bg-white/10 transition-all border-white/20">
              <UserCircle2 size={20} className="text-white/70" /> Meet the Founder
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="relative w-10 h-10 rounded-full border-2 border-[#0D1E2E] overflow-hidden bg-white"><Image src="/images/products/ganesha-dashboard.png" alt="" fill className="object-cover" /></div>
              <div className="relative w-10 h-10 rounded-full border-2 border-[#0D1E2E] overflow-hidden bg-white"><Image src="/images/products/apj-kalam-monument.png" alt="" fill className="object-cover" /></div>
              <div className="relative w-10 h-10 rounded-full border-2 border-[#0D1E2E] overflow-hidden bg-white"><Image src="/images/products/shiva-nataraja.png" alt="" fill className="object-cover" /></div>
            </div>
            <div>
              <p className="text-white font-bold font-body text-sm leading-tight">10,000+ Masterpieces Crafted</p>
              <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase font-body">ACROSS THE WORLD</p>
            </div>
          </div>
        </div>

        {/* Right — full-bleed founder image */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/founder.jpeg"
            alt="Founder Jagadesh Koteesvaran"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0D1E2E] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#0D1E2E]/80 to-transparent" />

          {/* Top-right badge */}
          <div className="absolute top-10 right-8 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 max-w-[145px] backdrop-blur-xl bg-[#0D1E2E]/60 z-10">
            <div className="w-10 h-10 rounded-full bg-[#F5C518] flex items-center justify-center text-[#1A1A1A]">
              <Box size={20} />
            </div>
            <p className="text-white font-body font-bold text-sm leading-tight mt-1">Micron-level.<br />Infinite Detail.</p>
          </div>

          {/* Bottom founder card */}
          <div className="absolute bottom-10 left-8 right-8 border border-white/10 rounded-2xl p-5 backdrop-blur-xl bg-[#0D1E2E]/70 z-10">
            <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase font-body mb-1">FOUNDER & CEO</p>
            <p className="text-white font-display font-bold text-xl mb-0.5">Jagadesh Koteesvaran</p>
            <p className="text-white/50 text-xs font-body">Founder & 3D Artist · Chennai, Tamil Nadu</p>
          </div>
        </div>

      </div>
    </section>
  )
}
