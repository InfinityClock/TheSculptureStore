'use client'

import Link from 'next/link'
import { ShoppingCart, Star, ArrowRight, Heart } from 'lucide-react'
import { useState } from 'react'
import { BEST_SELLERS, type Product } from '@/lib/data'
import { clsx } from 'clsx'

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAdd = () => { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2000) }

  return (
    <div className="product-card group relative flex flex-col bg-white">
      <div className="relative img-zoom overflow-hidden aspect-[4/5] rounded-t-2xl">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-tss-blue/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-tss-peach text-white text-[10px] font-bold font-body px-2.5 py-1 rounded-full uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-tss-blue text-white text-[10px] font-semibold font-body px-2.5 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          aria-label="Wishlist"
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-all"
        >
          <Heart size={13} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-tss-stone'} />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            id={`product-add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={clsx(
              'w-full py-2.5 rounded-xl text-sm font-semibold font-body flex items-center justify-center gap-2 transition-all',
              addedToCart ? 'bg-green-500 text-white' : 'bg-white text-tss-blue hover:bg-tss-peach hover:text-white'
            )}
          >
            <ShoppingCart size={14} />
            {addedToCart ? 'Added ✓' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] uppercase tracking-widest text-tss-peach font-body mb-1.5 font-semibold">
          {product.material.split(',')[0]}
        </span>
        <Link href={`/product/${product.slug}`} className="font-display text-tss-blue font-semibold text-base leading-tight hover:text-tss-peach transition-colors mb-2">
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5 mb-3">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'fill-tss-peach text-tss-peach' : 'fill-gray-200 text-gray-200'} />
          ))}
          <span className="text-xs text-tss-stone/60 font-body">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-body font-bold text-tss-blue text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <span className="text-tss-stone/40 text-xs line-through ml-1.5 font-body">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-9 h-9 rounded-full bg-tss-blue hover:bg-tss-peach text-white transition-all duration-200 flex items-center justify-center"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BestSellers() {
  return (
    <section id="best-sellers" className="section-padding" style={{ background: '#0D1E2E' }}>
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Our Finest Work</span>
            <div className="divider-peach" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
              Best <span className="peach-text">Sellers</span>
            </h2>
          </div>
          <Link href="/shop?sort=bestsellers" id="bestsellers-view-all-btn"
            className="flex items-center gap-1.5 text-tss-peach text-sm font-semibold font-body hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {BEST_SELLERS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Marquee trust strip */}
        <div className="mt-14 overflow-hidden border-t border-white/6 pt-8">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) =>
              ['⭐ 10,000+ Happy Customers', '🇮🇳 Made in India', '🎨 Handcrafted with Love', '📦 Secure Packaging', '🚚 Pan India Delivery', '✅ Quality Guaranteed', '🎁 Gift Wrapping Available', '💬 24/7 Customer Support'].map((item) => (
                <span key={`${i}-${item}`} className="text-white/25 text-sm font-body font-medium">{item}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
