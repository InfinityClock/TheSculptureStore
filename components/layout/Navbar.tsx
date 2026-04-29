'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

const NAV_LINKS = [
  {
    label: 'Products',
    href: '/shop',
    children: [
      { label: 'Divine Idols', href: '/shop?category=divine-idols' },
      { label: 'Monuments & Tributes', href: '/shop?category=monuments' },
      { label: 'Car Dashboard Dolls', href: '/shop?category=car-dashboard' },
      { label: 'Custom Sculptures', href: '/shop?category=custom-sculptures' },
    ],
  },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Contact', href: 'https://wa.me/917900060026', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={scrolled ? '/logo/logo-blue.png' : '/logo/logo-white.png'}
              alt="The Sculpture Store"
              width={150}
              height={44}
              className="h-8 w-auto object-contain transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'flex items-center gap-1 font-body text-sm font-medium transition-colors',
                      scrolled ? 'text-gray-600 hover:text-tss-blue' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={clsx(
                      'flex items-center gap-1 font-body text-sm font-medium transition-colors',
                      scrolled ? 'text-gray-600 hover:text-tss-blue' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {link.label}
                    {'children' in link && link.children && (
                      <ChevronDown size={13} className="opacity-50" />
                    )}
                  </Link>
                )}

                {'children' in link && link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
                    <div className="py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-tss-blue hover:bg-gray-50 transition-colors font-body"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className={clsx(
                'hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-colors',
                scrolled ? 'text-gray-500 hover:text-tss-blue hover:bg-gray-100' : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <Search size={17} />
            </button>

            <Link
              href="/cart"
              aria-label="Cart"
              className={clsx(
                'relative flex w-9 h-9 items-center justify-center rounded-full transition-colors',
                scrolled ? 'text-gray-500 hover:text-tss-blue hover:bg-gray-100' : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <ShoppingCart size={17} />
            </Link>

            <Link
              href="/shop"
              className="hidden md:flex btn-peach py-2 px-5 text-xs"
            >
              Order Now
            </Link>

            <button
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={clsx(
                'lg:hidden flex w-9 h-9 items-center justify-center rounded-full transition-colors',
                scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 overflow-y-auto">
          <div className="mb-6">
            <Image src="/logo/logo-blue.png" alt="The Sculpture Store" width={140} height={40} className="h-8 w-auto" />
          </div>

          <nav className="flex flex-col divide-y divide-gray-100">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-lg font-display font-semibold text-tss-blue hover:text-tss-peach transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-lg font-display font-semibold text-tss-blue hover:text-tss-peach transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
                {'children' in link && link.children && (
                  <div className="pl-4 pb-3 grid grid-cols-2 gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm text-gray-500 hover:text-tss-peach py-1 transition-colors font-body"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="btn-peach justify-center">
              Order Now
            </Link>
            <a
              href="https://wa.me/917900060026?text=Hi%2C%20I%27d%20like%20to%20order%20a%20sculpture"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-blue-outline justify-center"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mt-auto pb-8 pt-8 text-sm text-gray-400 font-body space-y-1">
            <p>📍 Vanagaram, Chennai, TN 600077</p>
            <p>📞 +91 79000 60025 · 🚚 Ships to 50+ countries</p>
          </div>
        </div>
      )}
    </>
  )
}
