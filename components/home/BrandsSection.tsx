'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const BRANDS = [
  {
    num: '01',
    tag: 'CONSUMER · EXPERIENCE',
    name: '3DSelfiy',
    tagline: "India's Pioneer 3D Selfie Studio",
    description:
      "India's pioneer 3D selfie studio, transforming people into stunning full-colour miniature figurines. The perfect personalised keepsake or corporate gift.",
    bullets: [
      'Full-colour 3D printed figurines',
      '360° body scanning technology',
      'Wedding, corporate & gifting packages',
    ],
    cta: { label: 'Explore 3DSelfiy', href: 'https://3dselfiy.com', external: true },
    status: null,
    current: false,
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center text-white font-bold text-lg font-display">
          3D
        </div>
        <span className="font-display font-bold text-xl text-[#1A1A1A] tracking-tight">3Dselfiy</span>
      </div>
    ),
    accent: '#F5C518',
    accentLight: 'rgba(245,197,24,0.08)',
    accentBorder: 'rgba(245,197,24,0.25)',
  },
  {
    num: '02',
    tag: 'ECOMMERCE · PROFESSIONAL · B2B',
    name: '3D Printing Studio',
    tagline: "India's Professional 3D Supply Store",
    description:
      "India's dedicated ecommerce store for professional 3D printing. Printers, filaments, resins and accessories. Everything a printing business needs, in one place.",
    bullets: [
      '3D printers for every scale of business',
      'Filaments, resins & consumables',
      'Tools, parts & accessories',
    ],
    cta: { label: 'Shop Now', href: 'https://3dprintingstudio.in', external: true },
    status: 'COMING SOON',
    current: false,
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#1D3D5C] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <p className="font-display font-bold text-sm text-[#1A1A1A] leading-none">3D Printing</p>
          <p className="font-display font-bold text-sm text-[#1A1A1A] leading-none">Studio.</p>
        </div>
      </div>
    ),
    accent: '#1D3D5C',
    accentLight: 'rgba(29,61,92,0.06)',
    accentBorder: 'rgba(29,61,92,0.18)',
  },
  {
    num: '03',
    tag: 'ECOMMERCE · SPIRITUAL · DECOR',
    name: 'SculptureStore',
    tagline: 'Your Sacred Art Destination',
    description:
      'Your one-stop shop for 3D-printed sculptures, monuments, divine idols and car dashboard dolls. Every size, for every home and every occasion.',
    bullets: [
      'Divine idols & spiritual figurines',
      'Monuments & sculptures in all sizes',
      'Car dashboard dolls for every model',
    ],
    cta: { label: 'Visit SculptureStore', href: '/', external: false },
    status: 'YOU ARE HERE',
    current: true,
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#F4956A] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <p className="font-display font-bold text-sm text-[#1D3D5C] leading-none">The</p>
          <p className="font-display font-bold text-sm text-[#1D3D5C] leading-none">Sculpture Store.</p>
        </div>
      </div>
    ),
    accent: '#F4956A',
    accentLight: 'rgba(244,149,106,0.08)',
    accentBorder: 'rgba(244,149,106,0.35)',
  },
]

export default function BrandsSection() {
  return (
    <section id="our-brands" className="section-padding" style={{ background: 'linear-gradient(170deg, #f5f0ec 0%, #fdf8f4 60%, #eef2f7 100%)' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Our Family</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-tss-blue mt-3 mb-4 leading-tight">
            Three Brands.{' '}
            <span className="peach-text italic">One Vision.</span>
          </h2>
          <p className="text-tss-stone font-body text-[15px] max-w-xl mx-auto leading-relaxed">
            Under{' '}
            <strong className="text-tss-blue font-semibold">Miniworks Design Merchandise Pvt. Ltd.</strong>
            , three specialised brands each serve a distinct dimension of India's creator economy.
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {BRANDS.map((brand) => (
            <div
              key={brand.num}
              className="relative rounded-3xl p-7 flex flex-col transition-all duration-300 group"
              style={{
                background: brand.current
                  ? 'white'
                  : 'rgba(255,255,255,0.7)',
                border: brand.current
                  ? `2px solid ${brand.accentBorder}`
                  : '1.5px solid rgba(29,61,92,0.10)',
                boxShadow: brand.current
                  ? `0 8px 40px ${brand.accentLight}, 0 2px 12px rgba(0,0,0,0.04)`
                  : '0 2px 16px rgba(29,61,92,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Number + Status badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="font-body text-xs font-bold tracking-widest"
                  style={{ color: brand.accent, opacity: 0.7 }}
                >
                  {brand.num}
                </span>
                {brand.status && (
                  <span
                    className="font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: brand.current ? brand.accent : '#1A1A1A',
                      color: 'white',
                    }}
                  >
                    ✦ {brand.status}
                  </span>
                )}
              </div>

              {/* Logo */}
              <div className="mb-6 min-h-[48px] flex items-center">
                {brand.logo}
              </div>

              {/* Category tag */}
              <p
                className="font-body text-[10px] font-bold tracking-widest uppercase mb-2"
                style={{ color: brand.accent }}
              >
                {brand.tag}
              </p>

              {/* Name + Description */}
              <h3 className="font-display text-2xl font-bold text-tss-blue mb-3 leading-tight">
                {brand.name}
              </h3>
              <p className="text-tss-stone font-body text-sm leading-relaxed mb-5 flex-1">
                {brand.description}
              </p>

              {/* Bullet list */}
              <ul className="space-y-2 mb-7">
                {brand.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 font-body text-sm text-tss-stone">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: brand.accent }}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {brand.cta.external ? (
                <a
                  href={brand.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-colors mt-auto"
                  style={{ color: brand.accent }}
                >
                  {brand.cta.label}
                  <ExternalLink size={13} />
                </a>
              ) : (
                <Link
                  href={brand.cta.href}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-colors mt-auto"
                  style={{ color: brand.accent }}
                >
                  {brand.cta.label}
                  <ArrowRight size={14} />
                </Link>
              )}

              {/* Active glow ring for current brand */}
              {brand.current && (
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${brand.accentBorder}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center mt-10 text-tss-stone/60 font-body text-xs tracking-wide">
          Miniworks Design Merchandise Pvt. Ltd. · Vanagaram, Chennai, TN 600077
        </p>
      </div>
    </section>
  )
}
