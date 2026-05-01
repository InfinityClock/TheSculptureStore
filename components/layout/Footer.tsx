'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1E2E' }} className="text-white">

      <div className="container-wide py-14">

        {/* Brand row */}
        <div className="mb-3">
          <Image src="/logo/logo-white.png" alt="The Sculpture Store" width={200} height={60} className="h-14 w-auto" />
        </div>

        {/* Tagline */}
        <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
          3D sculptures made by hand in Chennai. Shipped to your door anywhere in the world.
        </p>

        {/* Social icons */}
        <div className="flex gap-3 mb-10">
          {[
            { label: 'Instagram', href: 'https://instagram.com/3dselfiy', path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM17.5 6.5h.01" },
            { label: 'Facebook', href: 'https://facebook.com/3dselfiy', path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/3dselfiy', path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
          ].map(({ label, href, path }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8">

          <div>
            <h4 className="font-display font-bold text-white text-base mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                ['Our Story', '/about'],
                ['How It Works', '/#how-it-works'],
                ['Blog', '/blog'],
                ['Contact Us', '/contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/45 hover:text-tss-peach transition-colors font-body">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-base mb-4">Support</h4>
            <ul className="flex flex-col gap-3">
              {[
                ['Our Products', '/shop'],
                ['Shipping & Returns', '/shipping'],
                ['Track Order', '/track'],
                ['FAQ', '/faq'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/45 hover:text-tss-peach transition-colors font-body">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom bar */}
      <div className="pb-8">
        <div className="container-wide">
          <p className="text-xs text-white/25 font-body text-center">
            © {new Date().getFullYear()} The Sculpture Store · Miniworks Design Merchandise Pvt. Ltd.
          </p>
        </div>
      </div>

    </footer>
  )
}
