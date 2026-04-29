'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Heart, User, Settings, LogOut, ChevronRight, Truck, Check, Clock } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { clsx } from 'clsx'

const MOCK_ORDERS = [
  {
    id: 'SS45821',
    date: 'Apr 25, 2026',
    status: 'delivered',
    items: [{ product: PRODUCTS[0], quantity: 1, size: '12 inch' }],
    total: 2499,
  },
  {
    id: 'SS45399',
    date: 'Apr 12, 2026',
    status: 'in-transit',
    items: [{ product: PRODUCTS[5], quantity: 2, size: '3 inch' }],
    total: 1398,
  },
  {
    id: 'SS44102',
    date: 'Mar 30, 2026',
    status: 'delivered',
    items: [{ product: PRODUCTS[1], quantity: 1, size: '18 inch' }],
    total: 3299,
  },
]

const STATUS_CONFIG = {
  delivered: { label: 'Delivered', color: 'text-green-700 bg-green-50 border-green-200', icon: Check },
  'in-transit': { label: 'In Transit', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Truck },
  processing: { label: 'Processing', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Clock },
}

const NAV_ITEMS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-tss-blue py-10 px-4">
          <div className="container-wide flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-tss-peach flex items-center justify-center font-display font-bold text-white text-2xl">
              RK
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Rajesh Kumar</h1>
              <p className="text-white/50 font-body text-sm">rajesh@email.com · Member since 2024</p>
            </div>
          </div>
        </div>

        <div className="container-wide py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar nav */}
            <aside className="w-full lg:w-60 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    id={`account-tab-${id}`}
                    onClick={() => setActiveTab(id)}
                    className={clsx(
                      'w-full flex items-center gap-3 px-5 py-4 text-sm font-body font-medium transition-all border-b border-gray-100 last:border-0',
                      activeTab === id
                        ? 'bg-tss-blue text-white'
                        : 'text-gray-500 hover:text-tss-blue hover:bg-gray-50'
                    )}
                  >
                    <Icon size={16} />
                    {label}
                    <ChevronRight size={14} className="ml-auto opacity-40" />
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-body font-medium text-red-400 hover:bg-red-50 transition-colors">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
              {/* Orders tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-tss-blue mb-5">My Orders</h2>
                  <div className="space-y-4">
                    {MOCK_ORDERS.map(order => {
                      const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]
                      const StatusIcon = status.icon
                      return (
                        <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                          {/* Order header */}
                          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                            <div className="flex items-center gap-4">
                              <div>
                                <div className="font-body font-semibold text-tss-blue text-sm">Order #{order.id}</div>
                                <div className="text-xs text-gray-400 font-body">{order.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={clsx('flex items-center gap-1.5 text-xs font-semibold font-body px-3 py-1.5 rounded-full border', status.color)}>
                                <StatusIcon size={11} />
                                {status.label}
                              </span>
                              <span className="font-bold text-tss-blue font-body text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="px-5 py-4 space-y-3">
                            {order.items.map(({ product, quantity, size }) => (
                              <div key={product.id} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-body text-sm font-medium text-tss-blue">{product.name}</div>
                                  <div className="text-xs text-gray-400 font-body">{size} · Qty: {quantity}</div>
                                </div>
                                <Link href={`/product/${product.slug}`} className="text-xs text-tss-peach hover:underline font-body">
                                  Buy Again
                                </Link>
                              </div>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="px-5 pb-4 flex gap-2">
                            <button
                              id={`order-track-${order.id}`}
                              className="px-4 py-2 rounded-lg border border-tss-blue text-tss-blue text-xs font-body font-semibold hover:bg-tss-blue hover:text-white transition-all"
                            >
                              Track Order
                            </button>
                            {order.status === 'delivered' && (
                              <button
                                id={`order-review-${order.id}`}
                                className="px-4 py-2 rounded-lg bg-tss-peach text-white text-xs font-body font-semibold hover:bg-tss-peach-dark transition-all"
                              >
                                Write Review
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Profile tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                  <h2 className="font-display text-2xl font-bold text-tss-blue mb-6">My Profile</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', value: 'Rajesh', id: 'profile-first-name' },
                      { label: 'Last Name', value: 'Kumar', id: 'profile-last-name' },
                      { label: 'Email', value: 'rajesh@email.com', id: 'profile-email' },
                      { label: 'Phone', value: '+91 98765 43210', id: 'profile-phone' },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="block text-xs font-semibold text-gray-400 font-body uppercase tracking-wide mb-1.5">{f.label}</label>
                        <input
                          id={f.id}
                          type="text"
                          defaultValue={f.value}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-body text-tss-blue focus:outline-none focus:border-tss-peach/50 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <button id="profile-save-btn" className="btn-peach mt-6 text-sm">Save Changes</button>
                </div>
              )}

              {/* Wishlist & Settings placeholder */}
              {(activeTab === 'wishlist' || activeTab === 'settings') && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <h2 className="font-display text-2xl font-bold text-gray-300 mb-2">
                    {activeTab === 'wishlist' ? 'Your Wishlist' : 'Settings'}
                  </h2>
                  <p className="text-gray-400 font-body text-sm">Coming soon in the next update</p>
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
