'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { calculateShipping } from '@/lib/shipping'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const INITIAL_CART = [
  { product: PRODUCTS[0], quantity: 1, size: '12 inch' },
  { product: PRODUCTS[5], quantity: 2, size: '3 inch' },
]

export default function CartPage() {
  const [cart, setCart] = useState(INITIAL_CART)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setCart(c => c.map(item =>
      item.product.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
  }
  const remove = (id: string) => setCart(c => c.filter(item => item.product.id !== id))

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = calculateShipping(subtotal)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-tss-blue mb-8">
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <ShoppingCart size={48} className="text-gray-200 mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-gray-400 mb-2">Your cart is empty</h2>
              <p className="text-gray-400 font-body text-sm mb-6">Discover our divine sculptures</p>
              <Link href="/shop" className="btn-peach">Shop Now</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-7">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(({ product, quantity, size }) => (
                  <div key={product.id} className="bg-white rounded-2xl p-5 flex gap-4 border border-gray-100 shadow-sm">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link href={`/product/${product.slug}`} className="font-display font-semibold text-tss-blue text-[15px] leading-tight hover:text-tss-peach transition-colors line-clamp-2">
                            {product.name}
                          </Link>
                          <div className="text-xs text-gray-400 font-body mt-1">Size: {size} · {product.material.split(',')[0]}</div>
                        </div>
                        <button
                          onClick={() => remove(product.id)}
                          aria-label="Remove"
                          className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button onClick={() => updateQty(product.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-tss-blue hover:bg-gray-50 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-tss-blue font-body">{quantity}</span>
                          <button onClick={() => updateQty(product.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-tss-blue hover:bg-gray-50 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-tss-blue font-display">₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                          {quantity > 1 && <div className="text-xs text-gray-400 font-body">₹{product.price.toLocaleString('en-IN')} each</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-tss-blue font-body transition-colors mt-2">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order summary */}
              <div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                  <h2 className="font-display text-xl font-bold text-tss-blue mb-5">Order Summary</h2>

                  {/* Coupon */}
                  <div className="mb-5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={coupon}
                          onChange={e => setCoupon(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body text-tss-blue placeholder-gray-400 focus:outline-none focus:border-tss-peach/50"
                        />
                      </div>
                      <button
                        onClick={() => { if (coupon.toLowerCase() === 'divine10') setCouponApplied(true) }}
                        className="bg-tss-blue text-white px-4 rounded-xl text-sm font-body font-semibold hover:bg-tss-blue-light transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && <p className="text-green-600 text-xs font-body mt-1.5">✓ 10% discount applied!</p>}
                    <p className="text-gray-400 text-xs font-body mt-1">Try: DIVINE10</p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between text-sm font-body text-gray-500">
                      <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body text-gray-500">
                      <span className="flex items-center gap-1.5"><Truck size={12} /> Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm font-body text-green-600">
                        <span>Discount (DIVINE10)</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="h-px bg-gray-100 my-1" />
                    <div className="flex justify-between font-bold font-display text-tss-blue text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-green-600 font-body">🎁 You saved ₹149 on shipping!</p>
                    )}
                  </div>

                  <Link href="/checkout" className="btn-peach w-full justify-center">
                    Proceed to Checkout <ArrowRight size={15} />
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                    {['Visa', 'Mastercard', 'UPI', 'Razorpay'].map(p => (
                      <span key={p} className="text-[10px] font-body text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">{p}</span>
                    ))}
                  </div>
                  <p className="text-center text-[11px] text-gray-400 font-body mt-2">🔒 256-bit SSL secured</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
