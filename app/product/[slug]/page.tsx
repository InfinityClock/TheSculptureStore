'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, ZoomIn, Truck, Shield, RotateCcw, Share2, Minus, Plus, Check } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PRODUCTS, type Product } from '@/lib/data'
import { clsx } from 'clsx'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="space-y-3">
      <div
        className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square cursor-zoom-in"
        onClick={() => setZoomed(!zoomed)}
      >
        <Image
          src={images[activeImage]}
          alt={product.name}
          fill
          className={clsx('object-cover transition-transform duration-500', zoomed ? 'scale-150' : 'scale-100')}
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-tss-peach text-white text-xs font-bold font-body px-3 py-1.5 rounded-full uppercase">
              {product.badge}
            </span>
          </div>
        )}
        <button
          aria-label="Zoom image"
          className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <ZoomIn size={15} className="text-tss-blue" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); setActiveImage(a => a === 0 ? images.length - 1 : a - 1) }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronLeft size={15} className="text-tss-blue" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); setActiveImage(a => a === images.length - 1 ? 0 : a + 1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronRight size={15} className="text-tss-blue" />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={clsx(
              'relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
              activeImage === i ? 'border-tss-peach' : 'border-transparent opacity-50 hover:opacity-100'
            )}
          >
            <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 3000) }

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-body">
        <Link href="/" className="hover:text-tss-peach transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-tss-peach transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-tss-blue leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, s) => (
            <Star key={s} size={14} className={s < Math.round(product.rating) ? 'fill-tss-peach text-tss-peach' : 'fill-gray-200 text-gray-200'} />
          ))}
        </div>
        <span className="text-sm text-gray-500 font-body">{product.rating} ({product.reviews} reviews)</span>
        <span className="text-xs text-green-600 font-body font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
          In Stock
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="font-display text-3xl font-bold text-tss-blue">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-gray-400 text-lg line-through font-body">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="bg-tss-peach/15 text-tss-peach-dark text-sm font-bold font-body px-2.5 py-0.5 rounded-full">
              {product.discount}% OFF
            </span>
          </>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-body text-sm font-semibold text-tss-blue">Select Size</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={clsx(
                'px-4 py-2 rounded-lg border text-sm font-body transition-all',
                selectedSize === size
                  ? 'border-tss-peach bg-tss-peach/10 text-tss-blue font-semibold'
                  : 'border-gray-200 text-gray-500 hover:border-tss-peach/40 hover:text-tss-blue'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="font-body text-sm font-semibold text-tss-blue mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-tss-blue hover:bg-gray-50 transition-colors">
              <Minus size={14} />
            </button>
            <span className="w-12 text-center font-body font-semibold text-tss-blue text-sm">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-tss-blue hover:bg-gray-50 transition-colors">
              <Plus size={14} />
            </button>
          </div>
          <span className="text-xs text-gray-400 font-body">Max 10 per order</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-body text-sm transition-all',
            addedToCart ? 'bg-green-500 text-white' : 'bg-tss-blue text-white hover:bg-tss-blue-light'
          )}
        >
          {addedToCart ? <><Check size={15} /> Added to Cart</> : <><ShoppingCart size={15} /> Add to Cart</>}
        </button>
        <Link href="/checkout" className="flex-1 btn-peach text-sm justify-center">
          Buy Now
        </Link>
        <button
          aria-label="Add to wishlist"
          onClick={() => setWishlisted(!wishlisted)}
          className={clsx(
            'w-12 h-12 rounded-xl border flex items-center justify-center transition-all',
            wishlisted ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-tss-peach/40'
          )}
        >
          <Heart size={17} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      {/* Delivery strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Truck, label: 'Free Shipping', sub: 'Orders ₹999+' },
          { icon: Shield, label: 'Quality Guarantee', sub: '100% authentic' },
          { icon: RotateCcw, label: '7-Day Returns', sub: 'Easy process' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
            <Icon size={15} className="text-tss-peach mb-1.5" />
            <div className="text-[10px] font-semibold text-tss-blue font-body leading-tight">{label}</div>
            <div className="text-[10px] text-gray-400 font-body">{sub}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 font-body">
        <span className="font-semibold text-tss-blue">Material:</span> {product.material}
      </div>

      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-tss-blue transition-colors font-body w-fit">
        <Share2 size={14} /> Share this product
      </button>
    </div>
  )
}

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const product = PRODUCTS.find(p => p.slug === slug)
  if (!product) return notFound()
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-14">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>

          {/* Details + Delivery */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="md:col-span-2 bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-tss-blue mb-4">About This Sculpture</h2>
              <p className="text-gray-500 font-body leading-relaxed text-sm mb-4">{product.description}</p>
              <p className="text-gray-500 font-body leading-relaxed text-sm">
                Each piece is individually crafted using high-fidelity 3D printing technology in our Chennai studio, paired with hand-applied finishing. Our artists spend hours on colour application, detailing, and quality checks before dispatch.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Material', value: product.material },
                  { label: 'Category', value: product.category.replace(/-/g, ' ') },
                  { label: 'Available Sizes', value: product.sizes.join(', ') },
                  { label: 'Finish', value: 'Hand-painted, UV coated' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[11px] font-semibold text-gray-400 font-body uppercase tracking-wide mb-1">{label}</div>
                    <div className="text-sm text-tss-blue font-body capitalize">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-tss-blue rounded-2xl p-6 text-white">
              <h2 className="font-display text-lg font-bold text-white mb-5">Delivery & Returns</h2>
              <div className="space-y-4">
                {[
                  { icon: Truck, title: 'Standard Delivery', desc: '5–7 business days. Free on orders above ₹999.' },
                  { icon: Shield, title: 'Express Delivery', desc: '2–3 business days. Available for ₹149 extra.' },
                  { icon: RotateCcw, title: '7-Day Returns', desc: 'Not happy? Return within 7 days, no questions asked.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <Icon size={16} className="text-tss-peach shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold font-body mb-0.5">{title}</div>
                      <div className="text-xs text-white/50 font-body leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <div className="mb-6">
                <span className="section-label">You May Also Like</span>
                <h2 className="font-display text-2xl font-bold text-tss-blue mt-1">Related Sculptures</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="product-card group block">
                    <div className="relative img-zoom-wrap overflow-hidden rounded-t-2xl aspect-square bg-gray-50">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="font-display text-sm font-semibold text-tss-blue line-clamp-2 group-hover:text-tss-peach transition-colors">{p.name}</div>
                      <div className="font-display font-bold text-tss-blue text-sm mt-1">₹{p.price.toLocaleString('en-IN')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
