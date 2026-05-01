'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MessageCircle } from 'lucide-react'

const SocialIcon = ({ path, label, href }: { path: string; label: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-tss-peach hover:border-tss-peach/40 transition-all">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  </a>
)

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1E2E' }} className="text-white">

      <div className="container-wide py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link href="/">
              <Image src="/logo/logo-white.png" alt="The Sculpture Store" width={140} height={40} className="h-8 w-auto" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-body max-w-[200px]">
              Hand-crafted 3D sculptures from Chennai, delivered worldwide.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:3dselfiy@gmail.com" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <Mail size={12} className="shrink-0" /> 3dselfiy@gmail.com
              </a>
              <a href="tel:+917900060025" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <Phone size={12} className="shrink-0" /> +91 79000 60025
              </a>
              <a href="https://wa.me/917900060026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <MessageCircle size={12} className="shrink-0" /> +91 79000 60026
              </a>
            </div>
            <div className="flex gap-2">
              <SocialIcon href="https://instagram.com/3dselfiy" label="Instagram" path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM17.5 6.5h.01" />
              <SocialIcon href="https://facebook.com/3dselfiy" label="Facebook" path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              <SocialIcon href="https://linkedin.com/company/3dselfiy" label="LinkedIn" path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <SocialIcon href="https://wa.me/917900060026" label="WhatsApp" path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 font-body mb-4">Shop</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Divine Idols', '/shop?category=divine-idols'],
                ['Monuments', '/shop?category=monuments'],
                ['Car Dashboard Dolls', '/shop?category=car-dashboard'],
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
                ['Our Craftsmen', '/craftsmen'],
                ['Blog', '/blog'],
                ['Careers', '/careers'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/35 hover:text-tss-peach transition-colors font-body">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 font-body mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Track Order', '/track'],
                ['Shipping Policy', '/shipping'],
                ['Returns & Refunds', '/returns'],
                ['FAQ', '/faq'],
                ['Contact Us', '/contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/35 hover:text-tss-peach transition-colors font-body">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6 py-4">
        <div className="container-wide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-white/25 font-body">
            © {new Date().getFullYear()} The Sculpture Store · Miniworks Design Merchandise Pvt. Ltd. · Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <Link key={t} href={`/${t.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-white/25 hover:text-tss-peach transition-colors font-body">{t}</Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
