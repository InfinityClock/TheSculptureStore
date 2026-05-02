'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings,
  TrendingUp, TrendingDown, Plus, Search, Edit2, Trash2, Eye, ChevronRight, Bell, LogOut
} from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { clsx } from 'clsx'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const STATS = [
  { label: 'Total Revenue', value: '₹4,82,500', change: '+18%', up: true, bg: 'bg-tss-blue text-white' },
  { label: 'Orders This Month', value: '194', change: '+12%', up: true, bg: 'bg-tss-peach text-white' },
  { label: 'Active Products', value: '87', change: '+5', up: true, bg: 'bg-white text-tss-blue' },
  { label: 'Avg Order Value', value: '₹2,487', change: '-3%', up: false, bg: 'bg-white text-tss-blue' },
]

const RECENT_ORDERS = [
  { id: 'TSS45899', customer: 'Priya Sharma', product: 'Lord Ganesha', amount: 2499, status: 'processing' },
  { id: 'TSS45898', customer: 'Vikram Patel', product: 'Nataraja Dance', amount: 3299, status: 'shipped' },
  { id: 'TSS45897', customer: 'Ananya Nair', product: 'Custom Portrait', amount: 7999, status: 'delivered' },
  { id: 'TSS45896', customer: 'Rajesh Kumar', product: 'Car Dashboard Mini', amount: 699, status: 'delivered' },
  { id: 'TSS45895', customer: 'Sunita Reddy', product: 'Kalam Monument', amount: 4999, status: 'processing' },
]

const STATUS_COLORS: Record<string, string> = {
  processing: 'bg-amber-100 text-amber-700 border-amber-200',
  shipped: 'bg-blue-100 text-blue-700 border-blue-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-600 border-red-200',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [productSearch, setProductSearch] = useState('')

  const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()))

  return (
    <div className="min-h-screen flex" style={{ background: '#F5EDE5' }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="w-64 shrink-0 flex flex-col sticky top-0 h-screen overflow-y-auto" style={{ background: '#0D1E2E' }}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/8">
          <Link href="/">
            <Image src="/logo/logo-white.png" alt="The Sculpture Store" width={140} height={42} className="h-8 w-auto" />
          </Link>
          <div className="mt-2 text-[9px] tracking-[0.2em] text-tss-peach/50 font-body uppercase">Admin Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} id={`admin-nav-${id}`} onClick={() => setActiveTab(id)}
              className={clsx(
                'w-full flex items-center gap-3 px-6 py-3.5 text-sm font-body font-medium transition-all',
                activeTab === id
                  ? 'bg-tss-peach/10 text-white border-r-2 border-tss-peach'
                  : 'text-white/40 hover:text-white hover:bg-white/4'
              )}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 space-y-2">
          <Link href="/" className="flex items-center gap-2 text-xs text-white/30 hover:text-tss-peach transition-colors font-body">
            <Eye size={12} /> View Live Store
          </Link>
          <button className="flex items-center gap-2 text-xs text-white/30 hover:text-red-400 transition-colors font-body">
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-tss-blue/8 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-display text-xl font-bold text-tss-blue capitalize">{activeTab}</h1>
            <p className="text-xs text-tss-stone/60 font-body">The Sculpture Store Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-tss-blue/10 flex items-center justify-center text-tss-stone/50 hover:text-tss-blue transition-colors relative">
              <Bell size={15} />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-tss-peach rounded-full text-[9px] text-white font-bold flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-tss-peach flex items-center justify-center font-bold text-white text-xs font-body">AD</div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-tss-blue font-body">Admin</div>
                <div className="text-[10px] text-tss-stone/50 font-body">admin@thesculpturestore.in</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* ── Dashboard ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map(({ label, value, change, up, bg }) => (
                  <div key={label} className={clsx('rounded-2xl p-5 border border-tss-blue/8 shadow-card', bg)}>
                    <div className={clsx('text-[11px] font-body mb-2 uppercase tracking-wide font-semibold', bg.includes('text-white') ? 'text-white/60' : 'text-tss-stone/60')}>{label}</div>
                    <div className={clsx('font-display text-2xl font-bold mb-2', bg.includes('text-white') ? 'text-white' : 'text-tss-blue')}>{value}</div>
                    <div className={clsx('flex items-center gap-1 text-xs font-body font-semibold', up ? 'text-green-400' : 'text-red-400')}>
                      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {change} this month
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent orders table */}
              <div className="bg-white rounded-2xl border border-tss-blue/8 shadow-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <h2 className="font-display text-lg font-semibold text-tss-blue">Recent Orders</h2>
                  <button id="admin-view-all-orders" onClick={() => setActiveTab('orders')}
                    className="text-xs text-tss-peach font-body font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ChevronRight size={12} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-[11px] font-body font-semibold text-tss-stone/60 uppercase tracking-wide">
                        {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                          <th key={h} className="text-left px-6 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_ORDERS.map(o => (
                        <tr key={o.id} className="border-t border-gray-50 hover:bg-tss-cream/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-tss-stone/60 font-body">#{o.id}</td>
                          <td className="px-6 py-4 text-sm font-body font-medium text-tss-blue">{o.customer}</td>
                          <td className="px-6 py-4 text-sm font-body text-tss-stone/70">{o.product}</td>
                          <td className="px-6 py-4 text-sm font-body font-semibold text-tss-blue">₹{o.amount.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">
                            <span className={clsx('text-[11px] font-body font-semibold px-2.5 py-1 rounded-full border capitalize', STATUS_COLORS[o.status])}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-5">
                {[
                  { label: 'Pending Orders', value: 14, bg: 'bg-amber-50 border-amber-200 text-amber-700' },
                  { label: 'Low Stock Items', value: 6, bg: 'bg-red-50 border-red-200 text-red-600' },
                  { label: 'Reviews Pending', value: 3, bg: 'bg-tss-blue/5 border-tss-blue/15 text-tss-blue' },
                ].map(s => (
                  <div key={s.label} className={clsx('rounded-2xl p-5 border', s.bg)}>
                    <div className="font-display text-3xl font-bold mb-1">{s.value}</div>
                    <div className="text-sm font-body font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Products ── */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tss-stone/40" />
                  <input id="admin-product-search" type="text" placeholder="Search products..."
                    value={productSearch} onChange={e => setProductSearch(e.target.value)}
                    className="pl-9 pr-4 py-2.5 border border-tss-blue/10 rounded-xl text-sm font-body text-tss-blue bg-white focus:outline-none focus:border-tss-peach/50 w-64" />
                </div>
                <button id="admin-add-product-btn" className="btn-peach text-sm rounded-xl py-2.5">
                  <Plus size={15} /> Add Product
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-tss-blue/8 shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-tss-cream text-[11px] font-body font-semibold text-tss-stone/60 uppercase tracking-wide">
                        {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                          <th key={h} className="text-left px-6 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="border-t border-gray-50 hover:bg-tss-cream/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                                <Image src={p.image} alt={p.name} fill className="object-cover" />
                              </div>
                              <div className="font-body text-sm font-medium text-tss-blue line-clamp-1 max-w-[180px]">{p.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-body text-tss-stone/60 capitalize">{p.category.replace('-', ' ')}</td>
                          <td className="px-6 py-4 text-sm font-body font-semibold text-tss-blue">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">
                            <span className={clsx('text-xs font-body px-2 py-0.5 rounded-full', p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600')}>
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-body text-tss-stone/70">⭐ {p.rating}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button id={`admin-edit-${p.id}`} className="w-7 h-7 rounded-lg bg-tss-blue/5 hover:bg-tss-blue/10 flex items-center justify-center transition-colors">
                                <Edit2 size={12} className="text-tss-blue/60" />
                              </button>
                              <button id={`admin-delete-${p.id}`} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
                                <Trash2 size={12} className="text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder tabs */}
          {['orders', 'customers', 'analytics', 'settings'].includes(activeTab) && (
            <div className="bg-white rounded-2xl border border-tss-blue/8 shadow-card p-16 text-center">
              <Image src="/logo/logo-blue.png" alt="TSS" width={120} height={36} className="h-8 w-auto mx-auto mb-6 opacity-20" />
              <h2 className="font-display text-2xl font-bold text-tss-blue/30 mb-2 capitalize">{activeTab}</h2>
              <p className="text-tss-stone/40 font-body text-sm">
                Full functionality coming with Phase 2 backend integration (Supabase).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
