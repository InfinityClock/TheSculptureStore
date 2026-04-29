'use client'

import Link from 'next/link'
import { ShoppingCart, Star, ArrowRight, Heart } from 'lucide-react'
import { useState } from 'react'
import { BEST_SELLERS, type Product } from '@/lib/data'
import { clsx } from 'clsx'

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000) }

  return (
    <div className="product-card group flex flex-col bg-white">
      {/* Image */}
      <div className="relative img-zoom overflow-hidden aspect-[4/5] rounded-t-2xl bg-gray-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-tss-peach text-white text-[10px] font-bold font-body px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-tss-blue text-white text-[10px] font-semibold font-body px-2.5 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          aria-label="Wishlist"
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={13} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>

        {/* Quick add — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={clsx(
              'w-full py-2.5 rounded-xl text-sm font-semibold font-body flex items-center justify-center gap-2 transition-all',
              added ? 'bg-green-500 text-white' : 'bg-white text-tss-blue hover:bg-tss-peach hover:text-white'
            )}
          >
            <ShoppingCart size={14} />
            {added ? 'Added ✓' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] uppercase tracking-widest text-tss-peach font-body font-semibold mb-1">
          {product.material.split(',')[0]}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="font-display text-tss-blue font-semibold text-[15px] leading-snug hover:text-tss-peach transition-colors mb-2 line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'fill-tss-peach text-tss-peach' : 'fill-gray-200 text-gray-200'} />
          ))}
          <span className="text-[11px] text-gray-400 font-body ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-display font-bold text-tss-blue text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-400 text-xs line-through ml-1.5 font-body">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="w-9 h-9 rounded-full bg-tss-blue hover:bg-tss-peach text-white transition-all duration-200 flex items-center justify-center"
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
    <section id="best-sellers" className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">Our Finest Work</span>
            <div className="divider-peach" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-tss-blue mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-tss-peach text-sm font-semibold font-body hover:gap-3 transition-all"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {BEST_SELLERS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Marquee */}
        <div className="mt-12 overflow-hidden border-t border-gray-100 pt-8">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) =>
              ['⭐ 10,000+ Happy Customers', '🇮🇳 Made in Chennai', '🎨 Hand-painted Finish', '📦 Gift-ready Packaging', '🚚 Ships to 50+ Countries', '✅ Museum-quality Detail', '🎁 Perfect for Every Occasion', '💬 WhatsApp Support'].map((item) => (
                <span key={`${i}-${item}`} className="text-gray-400 text-sm font-body font-medium">{item}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
