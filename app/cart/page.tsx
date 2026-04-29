'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Gift } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Mock cart items
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
  const shipping = subtotal >= 999 ? 0 : 149
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <div className="container-wide py-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-8">
            Your <span className="gold-text">Cart</span>
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart size={48} className="text-navy/20 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-semibold text-navy/40 mb-2">Your cart is empty</h2>
              <p className="text-navy/40 font-body text-sm mb-6">Discover our divine sculptures and add them to your cart</p>
              <Link href="/shop" className="btn-gold text-sm">Shop Now</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(({ product, quantity, size }) => (
                  <div key={product.id} className="bg-white rounded-2xl p-5 flex gap-5 border border-navy/6 shadow-card">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link href={`/product/${product.slug}`} className="font-display font-semibold text-navy text-base leading-tight hover:text-gold transition-colors line-clamp-2">
                            {product.name}
                          </Link>
                          <div className="text-xs text-navy/40 font-body mt-1">Size: {size} · {product.material.split(',')[0]}</div>
                        </div>
                        <button
                          id={`cart-remove-${product.id}`}
                          onClick={() => remove(product.id)}
                          aria-label="Remove item"
                          className="text-navy/25 hover:text-red-400 transition-colors shrink-0"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Qty */}
                        <div className="flex items-center border border-navy/10 rounded-xl overflow-hidden">
                          <button
                            id={`cart-minus-${product.id}`}
                            onClick={() => updateQty(product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-navy font-body">{quantity}</span>
                          <button
                            id={`cart-plus-${product.id}`}
                            onClick={() => updateQty(product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-navy font-body">₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                          {quantity > 1 && (
                            <div className="text-xs text-navy/35 font-body">₹{product.price.toLocaleString('en-IN')} each</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue shopping */}
                <Link href="/shop" id="cart-continue-shopping-btn" className="inline-flex items-center gap-2 text-sm text-navy/50 hover:text-navy font-body transition-colors mt-2">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-navy/6 shadow-card sticky top-24">
                  <h2 className="font-display text-xl font-bold text-navy mb-5">Order Summary</h2>

                  {/* Coupon */}
                  <div className="mb-5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30" />
                        <input
                          id="cart-coupon-input"
                          type="text"
                          placeholder="Promo code"
                          value={coupon}
                          onChange={e => setCoupon(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 border border-navy/10 rounded-xl text-sm font-body text-navy placeholder-navy/30 focus:outline-none focus:border-gold/50"
                        />
                      </div>
                      <button
                        id="cart-apply-coupon-btn"
                        onClick={() => { if (coupon.toLowerCase() === 'divine10') setCouponApplied(true) }}
                        className="bg-navy text-white px-4 rounded-xl text-sm font-body font-semibold hover:bg-navy-light transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-green-600 text-xs font-body mt-2">✓ Coupon applied! 10% off your order.</p>
                    )}
                    <p className="text-navy/35 text-xs font-body mt-1">Try code: DIVINE10</p>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm font-body text-navy/60">
                      <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body text-navy/60">
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
                    <div className="h-px bg-navy/8 my-2" />
                    <div className="flex justify-between font-bold font-display text-navy text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    {shipping === 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-green-600 font-body">
                        <Gift size={12} /> You saved ₹149 on shipping!
                      </div>
                    )}
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    id="cart-checkout-btn"
                    className="btn-gold w-full justify-center text-sm py-4"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </Link>

                  {/* Payment logos */}
                  <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                    {['Visa', 'Mastercard', 'UPI', 'RazorPay', 'PayPal'].map(p => (
                      <span key={p} className="text-[10px] font-body text-navy/30 border border-navy/8 rounded px-1.5 py-0.5">{p}</span>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-navy/30 font-body mt-2">🔒 Secure 256-bit SSL encryption</p>
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
