'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone } from 'lucide-react'

const SocialIcon = ({ path, label, href }: { path: string; label: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-white/40 hover:text-tss-peach hover:border-tss-peach/40 transition-all">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  </a>
)

const FOOTER_LINKS = {
  shop: [
    { label: 'Divine Idols', href: '/shop?category=divine-idols' },
    { label: 'Monuments', href: '/shop?category=monuments' },
    { label: 'Car Dashboard Dolls', href: '/shop?category=car-dashboard' },
    { label: 'Custom Sculptures', href: '/shop?category=custom-sculptures' },
    { label: 'Best Sellers', href: '/shop?sort=bestsellers' },
    { label: 'New Arrivals', href: '/shop?sort=newest' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Our Craftsmen', href: '/craftsmen' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Track Order', href: '/track' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#0D1E2E' }} className="text-white">
      {/* Newsletter */}
      <div className="border-b border-white/6 py-12">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white mb-1">
              Stay Connected with <span className="peach-text">Artisan Craft</span>
            </h3>
            <p className="text-white/45 text-sm font-body">
              New arrivals, exclusive offers & artisan stories - straight to your inbox.
            </p>
          </div>
          <form id="footer-newsletter-form" onSubmit={(e) => e.preventDefault()} className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              id="footer-newsletter-email"
              placeholder="Your email address"
              className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-tss-peach/40 transition-colors font-body"
            />
            <button type="submit" className="btn-peach text-xs rounded-xl">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image src="/logo/logo-white.png" alt="The Sculpture Store" width={160} height={48} className="h-9 w-auto" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-body max-w-xs">
              We blend centuries of Indian artistic tradition with cutting-edge 3D craftsmanship - creating sculptures that carry meaning and last lifetimes.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a href="mailto:hello@thesculpturestore.in" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <Mail size={13} /> hello@thesculpturestore.in
              </a>
              <a href="tel:+919999999999" className="flex items-center gap-2 text-sm text-white/35 hover:text-tss-peach transition-colors font-body">
                <Phone size={13} /> +91 99999 99999
              </a>
              <span className="flex items-center gap-2 text-sm text-white/35 font-body">
                <MapPin size={13} /> Jaipur, Rajasthan, India
              </span>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2">
              <SocialIcon href="https://instagram.com" label="Instagram" path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM17.5 6.5h.01" />
              <SocialIcon href="https://youtube.com" label="YouTube" path="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              <SocialIcon href="https://facebook.com" label="Facebook" path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              <SocialIcon href="https://twitter.com" label="Twitter/X" path="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'SHOP', links: FOOTER_LINKS.shop },
            { title: 'COMPANY', links: FOOTER_LINKS.company },
            { title: 'SUPPORT', links: FOOTER_LINKS.support },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-body font-semibold text-white/60 text-[11px] mb-4 tracking-widest">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-tss-peach transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-body">
            © {new Date().getFullYear()} The Sculpture Store · A brand of{' '}
            <span className="text-white/40">Miniworks Design Merchandise Pvt. Ltd.</span>
            {' '}· Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((t) => (
              <Link key={t} href={`/${t.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-white/25 hover:text-tss-peach transition-colors font-body">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
