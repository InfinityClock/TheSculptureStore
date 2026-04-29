'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, Star, ShoppingCart, Heart, ChevronDown, Filter } from 'lucide-react'
import { PRODUCTS, type Product, type Category } from '@/lib/data'
import { clsx } from 'clsx'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CATEGORY_OPTIONS: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'divine-idols', label: 'Divine Idols' },
  { value: 'monuments', label: 'Monuments' },
  { value: 'car-dashboard', label: 'Car Dashboard Dolls' },
  { value: 'custom-sculptures', label: 'Custom Sculptures' },
  { value: 'temple-decor', label: 'Temple Décor' },
  { value: 'home-decor', label: 'Home Décor' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
]

function ShopProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="product-card group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="relative img-zoom-wrap overflow-hidden aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-gold text-navy text-[10px] font-bold font-body px-2 py-0.5 rounded-full uppercase">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-navy text-white text-[10px] font-semibold font-body px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        <button
          aria-label="Wishlist"
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart size={13} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={clsx(
              'w-full py-2 rounded-lg text-xs font-semibold font-body flex items-center justify-center gap-1.5 transition-all',
              added ? 'bg-green-500 text-white' : 'bg-white text-navy hover:bg-gold'
            )}
          >
            <ShoppingCart size={13} />
            {added ? 'Added ✓' : 'Quick Add'}
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-widest text-gold/70 font-body font-semibold mb-1">
          {product.material.split(',')[0]}
        </span>
        <Link href={`/product/${product.slug}`} className="font-display text-navy font-semibold text-sm leading-snug hover:text-gold transition-colors mb-2 line-clamp-2">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, s) => (
            <Star key={s} size={10} className={s < Math.round(product.rating) ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'} />
          ))}
          <span className="text-[10px] text-navy/40 font-body ml-0.5">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-bold text-navy font-body">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <span className="text-navy/35 text-xs line-through ml-1 font-body">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-8 h-8 rounded-full bg-navy hover:bg-gold text-white hover:text-navy transition-all flex items-center justify-center"
          >
            <ShoppingCart size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let products = [...PRODUCTS]
    if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'all') products = products.filter(p => p.category === category)
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sort) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break
      case 'price-desc': products.sort((a, b) => b.price - a.price); break
      case 'rating': products.sort((a, b) => b.rating - a.rating); break
      case 'newest': products.sort((a, b) => b.id.localeCompare(a.id)); break
      default: products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return products
  }, [search, category, sort, priceRange])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        {/* Page header */}
        <div className="bg-navy py-12 px-4">
          <div className="container-wide">
            <span className="section-label text-gold/70">Discover</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-1">
              All <span className="gold-text">Sculptures</span>
            </h1>
            <p className="text-white/45 font-body mt-2 text-sm">{filtered.length} products found</p>
          </div>
        </div>

        <div className="container-wide py-10">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
              <input
                id="shop-search-input"
                type="text"
                placeholder="Search sculptures..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy/10 bg-white font-body text-sm text-navy placeholder-navy/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Filter (mobile) */}
              <button
                id="shop-filter-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-navy/10 bg-white text-navy text-sm font-body"
              >
                <Filter size={14} /> Filter
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  id="shop-sort-select"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-3 rounded-xl border border-navy/10 bg-white text-navy text-sm font-body focus:outline-none focus:border-gold/50 cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar filter - desktop always visible, mobile toggleable */}
            <aside className={clsx(
              'w-64 shrink-0 transition-all',
              'hidden lg:block'
            )}>
              <FilterSidebar
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                <div className="relative w-72 bg-white h-full overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-lg font-semibold text-navy">Filters</h3>
                    <button onClick={() => setSidebarOpen(false)}><X size={18} className="text-navy/50" /></button>
                  </div>
                  <FilterSidebar
                    category={category}
                    setCategory={setCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                </div>
              </div>
            )}

            {/* Product grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-2xl text-navy/30 mb-2">No sculptures found</p>
                  <p className="text-navy/40 font-body text-sm">Try adjusting your filters or search term</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                  {filtered.map(p => <ShopProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FilterSidebar({
  category,
  setCategory,
  priceRange,
  setPriceRange,
}: {
  category: Category | 'all'
  setCategory: (c: Category | 'all') => void
  priceRange: number[]
  setPriceRange: (r: number[]) => void
}) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-body font-semibold text-navy text-sm mb-3 uppercase tracking-wide">Category</h3>
        <div className="space-y-1.5">
          {CATEGORY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              id={`filter-category-${opt.value}`}
              onClick={() => setCategory(opt.value)}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-all',
                category === opt.value
                  ? 'bg-navy text-white font-semibold'
                  : 'text-navy/60 hover:bg-navy/5 hover:text-navy'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-body font-semibold text-navy text-sm mb-3 uppercase tracking-wide">Price Range</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-navy/50 font-body">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
          <input
            id="filter-price-max"
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-gold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[[0, 1000], [1000, 3000], [3000, 6000], [6000, 10000]].map(([min, max]) => (
            <button
              key={`${min}-${max}`}
              id={`filter-price-${min}-${max}`}
              onClick={() => setPriceRange([min, max])}
              className={clsx(
                'text-xs font-body py-1.5 px-2 rounded-lg border transition-all',
                priceRange[0] === min && priceRange[1] === max
                  ? 'border-gold bg-gold/10 text-navy font-semibold'
                  : 'border-navy/10 text-navy/50 hover:border-gold/40'
              )}
            >
              ₹{(min / 1000).toFixed(0) || '0'}K – ₹{(max / 1000).toFixed(0)}K
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
