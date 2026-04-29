'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

const NAV_LINKS = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'Divine Idols', href: '/shop?category=divine-idols' },
      { label: 'Monuments', href: '/shop?category=monuments' },
      { label: 'Car Dashboard Dolls', href: '/shop?category=car-dashboard' },
      { label: 'Custom Sculptures', href: '/shop?category=custom-sculptures' },
    ],
  },
  { label: 'Collections', href: '/collections' },
  { label: 'Custom Order', href: '/custom' },
  { label: 'Our Story', href: '/#story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartCount] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-tss-blue-deep/95 backdrop-blur-2xl shadow-tss py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-wide flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo/logo-white.png"
              alt="The Sculpture Store"
              width={160}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-white/80 hover:text-white transition-colors font-body text-sm font-medium"
                >
                  {link.label}
                  {link.children && <ChevronDown size={13} className="opacity-50" />}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-tss-blue-deep border border-white/10 rounded-2xl shadow-tss-lg overflow-hidden">
                    <div className="py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors font-body"
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

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            <button
              id="navbar-search-btn"
              aria-label="Search"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/8 transition-colors"
            >
              <Search size={17} />
            </button>

            <Link
              href="/cart"
              id="navbar-cart-btn"
              aria-label="Cart"
              className="relative flex w-9 h-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/8 transition-colors"
            >
              <ShoppingCart size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-tss-peach text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/shop"
              id="navbar-shop-cta"
              className="hidden md:flex btn-peach py-2 px-5 text-xs rounded-lg"
            >
              Shop Now
            </Link>

            <button
              id="navbar-mobile-menu-btn"
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex w-9 h-9 items-center justify-center text-white/70 hover:text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-tss-blue-deep/98 backdrop-blur-xl flex flex-col pt-20 px-6 overflow-y-auto">
          {/* Logo in mobile menu */}
          <div className="mb-8">
            <Image src="/logo/logo-white.png" alt="The Sculpture Store" width={140} height={42} className="h-8 w-auto" />
          </div>

          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-white/8">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-xl font-display text-white hover:text-tss-peach transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 pb-2 grid grid-cols-2 gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm text-white/45 hover:text-tss-peach py-1 transition-colors font-body"
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
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="btn-peach justify-center text-sm">
              Explore All Sculptures
            </Link>
            <Link href="/custom" onClick={() => setMobileOpen(false)} className="btn-white-outline justify-center text-sm">
              Place Custom Order
            </Link>
          </div>

          <div className="mt-auto pb-6 pt-8 flex items-center gap-6 text-white/30 text-xs font-body">
            <span>📍 Made in India</span>
            <span>🚚 Free Shipping ₹999+</span>
            <span>⭐ 4.9 Rated</span>
          </div>
        </div>
      )}
    </>
  )
}
