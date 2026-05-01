'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1E2E' }} className="text-white">

      <div className="container-wide pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-14">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image src="/logo/logo-white.png" alt="The Sculpture Store" width={140} height={40} className="h-8 w-auto" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-body max-w-[200px]">
              Hand-crafted 3D sculptures from Chennai, delivered worldwide.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:3dselfiy@gmail.com" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <Mail size={12} className="shrink-0" /> 3dselfiy@gmail.com
              </a>
              <a href="tel:+917900060025" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <Phone size={12} className="shrink-0" /> +91 79000 60025
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 font-body mb-4">Shop</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Divine Idols', '/shop?category=divine-idols'],
                ['Monuments', '/shop?category=monuments'],
                ['Custom Sculptures', '/shop?category=custom-sculptures'],
                ['Best Sellers', '/shop?sort=bestsellers'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/35 hover:text-tss-peach transition-colors font-body">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 font-body mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Our Story', '/about'],
                ['Blog', '/blog'],
                ['Contact Us', '/contact'],
                ['FAQ', '/faq'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/35 hover:text-tss-peach transition-colors font-body">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar — no border */}
      <div className="py-5">
        <div className="container-wide">
          <p className="text-xs text-white/25 font-body text-center">
            © {new Date().getFullYear()} The Sculpture Store · Miniworks Design Merchandise Pvt. Ltd. · Made with ❤️ in India.
          </p>
        </div>
      </div>

    </footer>
  )
}
