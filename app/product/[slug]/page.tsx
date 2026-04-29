'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, ZoomIn, Truck, Shield, RotateCcw, Share2, Minus, Plus, Check } from 'lucide-react'
import { PRODUCTS, type Product } from '@/lib/data'
import { clsx } from 'clsx'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const images = product.images.length > 1 ? product.images : [product.image, product.image]

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square cursor-zoom-in"
        onClick={() => setZoomed(!zoomed)}
      >
        <img
          src={images[activeImage]}
          alt={product.name}
          className={clsx('w-full h-full object-cover transition-transform duration-500', zoomed ? 'scale-150' : 'scale-100')}
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-gold text-navy text-xs font-bold font-body px-3 py-1.5 rounded-full uppercase">
              {product.badge}
            </span>
          </div>
        )}
        <button
          aria-label="Zoom image"
          className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <ZoomIn size={16} className="text-navy" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImage(a => a === 0 ? images.length - 1 : a - 1) }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronLeft size={16} className="text-navy" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImage(a => a === images.length - 1 ? 0 : a + 1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronRight size={16} className="text-navy" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={clsx(
              'w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
              activeImage === i ? 'border-gold shadow-gold' : 'border-transparent opacity-60 hover:opacity-100'
            )}
          >
            <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
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

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Category breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-navy/40 font-body">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-navy/60">{product.name}</span>
      </div>

      {/* Name */}
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, s) => (
            <Star key={s} size={14} className={s < Math.round(product.rating) ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'} />
          ))}
        </div>
        <span className="text-sm text-navy/60 font-body">{product.rating} ({product.reviews} reviews)</span>
        <span className="text-xs text-green-600 font-body font-semibold bg-green-50 px-2 py-0.5 rounded-full">
          In Stock
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="font-display text-3xl font-bold text-navy">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-navy/35 text-lg line-through font-body">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="bg-gold/15 text-gold-dark text-sm font-bold font-body px-2.5 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-navy/8" />

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-body text-sm font-semibold text-navy">Select Size</h3>
          <Link href="/size-guide" className="text-xs text-gold hover:underline font-body">Size Guide →</Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              id={`product-size-${size.replace(' ', '-')}`}
              onClick={() => setSelectedSize(size)}
              className={clsx(
                'px-4 py-2 rounded-lg border text-sm font-body transition-all',
                selectedSize === size
                  ? 'border-gold bg-gold/10 text-navy font-semibold shadow-gold'
                  : 'border-navy/15 text-navy/60 hover:border-gold/40 hover:text-navy'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="font-body text-sm font-semibold text-navy mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-navy/15 rounded-xl overflow-hidden">
            <button
              id="product-qty-minus"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-12 text-center font-body font-semibold text-navy text-sm">{quantity}</span>
            <button
              id="product-qty-plus"
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-xs text-navy/40 font-body">Max 10 per order</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          id="product-add-to-cart-main"
          onClick={handleAddToCart}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold font-body text-sm transition-all',
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-navy text-white hover:bg-navy-light'
          )}
        >
          {addedToCart ? <><Check size={16} /> Added to Cart</> : <><ShoppingCart size={16} /> Add to Cart</>}
        </button>
        <button
          id="product-buy-now-btn"
          className="flex-1 btn-gold text-sm py-4 justify-center"
        >
          Buy Now
        </button>
        <button
          aria-label="Add to wishlist"
          onClick={() => setWishlisted(!wishlisted)}
          className={clsx(
            'w-12 h-14 rounded-xl border flex items-center justify-center transition-all',
            wishlisted ? 'border-red-300 bg-red-50' : 'border-navy/15 hover:border-gold/40'
          )}
        >
          <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-navy/40'} />
        </button>
      </div>

      {/* Delivery info strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Truck, label: 'Free Shipping', sub: 'Orders ₹999+' },
          { icon: Shield, label: 'Quality Guarantee', sub: '100% authentic' },
          { icon: RotateCcw, label: '7-Day Returns', sub: 'Easy process' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-cream border border-navy/6">
            <Icon size={16} className="text-gold mb-1.5" />
            <div className="text-[10px] font-semibold text-navy font-body leading-tight">{label}</div>
            <div className="text-[10px] text-navy/40 font-body">{sub}</div>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="flex items-center gap-2 text-sm text-navy/60 font-body">
        <span className="font-semibold text-navy">Material:</span> {product.material}
      </div>

      {/* Share */}
      <button className="flex items-center gap-2 text-sm text-navy/40 hover:text-navy transition-colors font-body w-fit">
        <Share2 size={14} /> Share this product
      </button>
    </div>
  )
}

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0]
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <div className="container-wide py-10">
          {/* Main product layout */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
            {/* Gallery */}
            <ProductGallery product={product} />
            {/* Info */}
            <ProductInfo product={product} />
          </div>

          {/* Below the fold details */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Description */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 lg:p-8 border border-navy/6">
              <h2 className="font-display text-xl font-bold text-navy mb-4">About This Sculpture</h2>
              <p className="text-navy/60 font-body leading-relaxed text-sm mb-4">{product.description}</p>
              <p className="text-navy/60 font-body leading-relaxed text-sm">
                Each SculptureStore piece is individually crafted using high-fidelity 3D printing technology paired with hand-applied finishing. Our artists spend hours on colour application, detailing, and quality checks before your order is approved for dispatch.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Material', value: product.material },
                  { label: 'Category', value: product.category.replace('-', ' ') },
                  { label: 'Available Sizes', value: product.sizes.join(', ') },
                  { label: 'Finish', value: 'Hand-painted, UV coated' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold text-navy/40 font-body uppercase tracking-wide mb-1">{label}</div>
                    <div className="text-sm text-navy font-body capitalize">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Returns */}
            <div className="bg-navy rounded-2xl p-6 text-white">
              <h2 className="font-display text-lg font-bold text-white mb-5">Delivery & Returns</h2>
              <div className="space-y-4">
                {[
                  { icon: Truck, title: 'Standard Delivery', desc: '5–7 business days. Free on orders above ₹999.' },
                  { icon: Shield, title: 'Express Delivery', desc: '2–3 business days. Available for ₹149 extra.' },
                  { icon: RotateCcw, title: 'Easy 7-Day Returns', desc: 'Not happy? Return within 7 days - no questions asked.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <Icon size={16} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold font-body mb-0.5">{title}</div>
                      <div className="text-xs text-white/45 font-body leading-relaxed">{desc}</div>
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
                <h2 className="font-display text-2xl font-bold text-navy mt-1">Related Sculptures</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="product-card group block">
                    <div className="img-zoom-wrap overflow-hidden rounded-t-xl aspect-square">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="font-display text-sm font-semibold text-navy line-clamp-2 group-hover:text-gold transition-colors">{p.name}</div>
                      <div className="font-body font-bold text-navy text-sm mt-1">₹{p.price.toLocaleString('en-IN')}</div>
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
