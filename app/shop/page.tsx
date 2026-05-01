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
  { value: 'monuments', label: 'Monuments & Tributes' },
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
  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000) }

  return (
    <div className="product-card group flex flex-col bg-white">
      <div className="relative img-zoom-wrap overflow-hidden aspect-square bg-gray-50 rounded-t-2xl">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-tss-peach text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide font-body">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-tss-blue text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full font-body">
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
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={clsx(
              'w-full py-2 rounded-xl text-xs font-semibold font-body flex items-center justify-center gap-1.5 transition-all',
              added ? 'bg-green-500 text-white' : 'bg-white text-tss-blue hover:bg-tss-peach hover:text-white'
            )}
          >
            <ShoppingCart size={13} />
            {added ? 'Added ✓' : 'Quick Add'}
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-widest text-tss-peach font-body font-semibold mb-1">
          {product.material.split(',')[0]}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="font-display text-tss-blue font-semibold text-sm leading-snug hover:text-tss-peach transition-colors mb-2 line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, s) => (
            <Star key={s} size={10} className={s < Math.round(product.rating) ? 'fill-tss-peach text-tss-peach' : 'fill-gray-200 text-gray-200'} />
          ))}
          <span className="text-[10px] text-gray-400 font-body ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-bold text-tss-blue font-display text-base">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-400 text-xs line-through ml-1 font-body">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-8 h-8 rounded-full bg-tss-blue hover:bg-tss-peach text-white transition-all flex items-center justify-center"
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
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Page header */}
        <div className="bg-tss-blue py-10 px-4">
          <div className="container-wide">
            <span className="section-label text-tss-peach/80">Discover</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              All Sculptures
            </h1>
            <p className="text-white/50 font-body mt-1.5 text-sm">{filtered.length} products found</p>
          </div>
        </div>

        <div className="container-wide py-8">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sculptures..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white font-body text-sm text-tss-blue placeholder-gray-400 focus:outline-none focus:border-tss-peach/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-tss-blue">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-tss-blue text-sm font-body"
              >
                <Filter size={14} /> Filter
              </button>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-tss-blue text-sm font-body focus:outline-none focus:border-tss-peach/50 cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-7">
            {/* Sidebar - desktop */}
            <aside className="w-60 shrink-0 hidden lg:block">
              <FilterSidebar category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} />
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                <div className="relative w-72 bg-white h-full overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-lg font-semibold text-tss-blue">Filters</h3>
                    <button onClick={() => setSidebarOpen(false)}><X size={18} className="text-gray-400" /></button>
                  </div>
                  <FilterSidebar category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} />
                </div>
              </div>
            )}

            {/* Product grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-xl text-gray-400 mb-2">No sculptures found</p>
                  <p className="text-gray-400 font-body text-sm">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
  category, setCategory, priceRange, setPriceRange,
}: {
  category: Category | 'all'
  setCategory: (c: Category | 'all') => void
  priceRange: number[]
  setPriceRange: (r: number[]) => void
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-display font-semibold text-tss-blue text-sm mb-3 uppercase tracking-wide">Category</h3>
        <div className="space-y-1">
          {CATEGORY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-all',
                category === opt.value
                  ? 'bg-tss-blue text-white font-semibold'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-tss-blue'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-tss-blue text-sm mb-3 uppercase tracking-wide">Price Range</h3>
        <div className="flex justify-between text-xs text-gray-500 font-body mb-2">
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range" min={0} max={10000} step={100}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-tss-peach"
        />
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[[0, 1000], [1000, 3000], [3000, 6000], [6000, 10000]].map(([min, max]) => (
            <button
              key={`${min}-${max}`}
              onClick={() => setPriceRange([min, max])}
              className={clsx(
                'text-xs font-body py-1.5 px-2 rounded-lg border transition-all',
                priceRange[0] === min && priceRange[1] === max
                  ? 'border-tss-peach bg-tss-peach/10 text-tss-blue font-semibold'
                  : 'border-gray-200 text-gray-500 hover:border-tss-peach/40'
              )}
            >
              ₹{min === 0 ? '0' : `${min/1000}K`} – ₹{max/1000}K
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
