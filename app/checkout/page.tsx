'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronRight, CreditCard, Smartphone, Building2, Lock } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { clsx } from 'clsx'

const STEPS = ['Address', 'Delivery', 'Payment', 'Review']

const CART_SUMMARY = [
  { product: PRODUCTS[0], quantity: 1, size: '12 inch' },
  { product: PRODUCTS[5], quantity: 2, size: '3 inch' },
]

const subtotal = CART_SUMMARY.reduce((s, i) => s + i.product.price * i.quantity, 0)

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  })
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState('razorpay')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId] = useState(() => Math.floor(Math.random() * 90000 + 10000))

  const update = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const shipping = delivery === 'express' ? 149 : subtotal >= 999 ? 0 : 49
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream pt-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold-lg">
              <Check size={36} className="text-navy" />
            </div>
            <h1 className="font-display text-3xl font-bold text-navy mb-3">Order Placed! 🎉</h1>
            <p className="text-navy/60 font-body text-sm leading-relaxed mb-2">
              Your divine sculptures are being prepared with love. You'll receive a confirmation email shortly.
            </p>
            <p className="text-gold font-body font-semibold text-sm mb-8">Order ID: #SS{orderId}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account" className="btn-gold text-sm">Track Order</Link>
              <Link href="/shop" className="btn-outline-gold text-sm" style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>Continue Shopping</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <div className="container-wide py-10">
          <h1 className="font-display text-3xl font-bold text-navy mb-8">Checkout</h1>

          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center shrink-0">
                <button
                  id={`checkout-step-${i}`}
                  onClick={() => i < step && setStep(i)}
                  className="flex items-center gap-2"
                >
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-body transition-all',
                    i < step ? 'bg-gold text-navy' : i === step ? 'bg-navy text-white' : 'bg-navy/10 text-navy/40'
                  )}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={clsx(
                    'text-sm font-body font-medium hidden sm:block',
                    i === step ? 'text-navy' : 'text-navy/40'
                  )}>{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={clsx('h-px w-8 sm:w-16 mx-2 transition-colors', i < step ? 'bg-gold' : 'bg-navy/10')} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - step content */}
            <div className="lg:col-span-2">
              {/* Step 0: Address */}
              {step === 0 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-navy/6">
                  <h2 className="font-display text-xl font-bold text-navy mb-6">Delivery Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Rajesh Kumar', span: false },
                      { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', span: false },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', span: true },
                      { key: 'address', label: 'Street Address', type: 'text', placeholder: '123, MG Road, Apt 4B', span: true },
                      { key: 'city', label: 'City', type: 'text', placeholder: 'Mumbai', span: false },
                      { key: 'pincode', label: 'Pincode', type: 'text', placeholder: '400001', span: false },
                    ].map(({ key, label, type, placeholder, span }) => (
                      <div key={key} className={span ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-semibold text-navy/60 font-body mb-1.5 uppercase tracking-wide">{label}</label>
                        <input
                          id={`checkout-${key}`}
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={e => update(key as keyof typeof form, e.target.value)}
                          className="w-full px-4 py-3 border border-navy/10 rounded-xl text-sm font-body text-navy placeholder-navy/25 focus:outline-none focus:border-gold/60 transition-colors"
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-navy/60 font-body mb-1.5 uppercase tracking-wide">State</label>
                      <select
                        id="checkout-state"
                        value={form.state}
                        onChange={e => update('state', e.target.value)}
                        className="w-full px-4 py-3 border border-navy/10 rounded-xl text-sm font-body text-navy focus:outline-none focus:border-gold/60 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select State</option>
                        {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button id="checkout-next-address" onClick={() => setStep(1)} className="btn-gold mt-6 text-sm">
                    Continue to Delivery <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 1: Delivery */}
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-navy/6">
                  <h2 className="font-display text-xl font-bold text-navy mb-6">Delivery Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', price: subtotal >= 999 ? 'Free' : '₹49' },
                      { id: 'express', label: 'Express Delivery', sub: '2–3 business days', price: '₹149' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        id={`checkout-delivery-${opt.id}`}
                        onClick={() => setDelivery(opt.id)}
                        className={clsx(
                          'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left',
                          delivery === opt.id ? 'border-gold bg-gold/5' : 'border-navy/10 hover:border-gold/30'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={clsx('w-5 h-5 rounded-full border-2 flex items-center justify-center', delivery === opt.id ? 'border-gold' : 'border-navy/20')}>
                            {delivery === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                          </div>
                          <div>
                            <div className="font-body font-semibold text-navy text-sm">{opt.label}</div>
                            <div className="text-xs text-navy/40 font-body">{opt.sub}</div>
                          </div>
                        </div>
                        <span className={clsx('font-bold font-body text-sm', opt.price === 'Free' ? 'text-green-600' : 'text-navy')}>
                          {opt.price}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="btn-outline-gold text-sm" style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>← Back</button>
                    <button id="checkout-next-delivery" onClick={() => setStep(2)} className="btn-gold text-sm">Continue to Payment <ChevronRight size={16} /></button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-navy/6">
                  <h2 className="font-display text-xl font-bold text-navy mb-6">Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'razorpay', icon: Smartphone, label: 'Razorpay', sub: 'UPI, Net Banking, Cards, Wallets' },
                      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Rupay' },
                      { id: 'netbanking', icon: Building2, label: 'Net Banking', sub: 'All major Indian banks' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        id={`checkout-payment-${opt.id}`}
                        onClick={() => setPayment(opt.id)}
                        className={clsx(
                          'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                          payment === opt.id ? 'border-gold bg-gold/5' : 'border-navy/10 hover:border-gold/30'
                        )}
                      >
                        <div className={clsx('w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0', payment === opt.id ? 'border-gold' : 'border-navy/20')}>
                          {payment === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                        </div>
                        <opt.icon size={18} className="text-navy/50 shrink-0" />
                        <div>
                          <div className="font-body font-semibold text-navy text-sm">{opt.label}</div>
                          <div className="text-xs text-navy/40 font-body">{opt.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy/40 font-body mb-6">
                    <Lock size={12} /> All transactions are encrypted and secure
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline-gold text-sm" style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>← Back</button>
                    <button id="checkout-next-payment" onClick={() => setStep(3)} className="btn-gold text-sm">Review Order <ChevronRight size={16} /></button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-navy/6">
                  <h2 className="font-display text-xl font-bold text-navy mb-6">Review & Place Order</h2>
                  <div className="space-y-4 mb-6">
                    {CART_SUMMARY.map(({ product, quantity, size }) => (
                      <div key={product.id} className="flex gap-4 items-center">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-body text-sm font-semibold text-navy">{product.name}</div>
                          <div className="text-xs text-navy/40 font-body">{size} · Qty: {quantity}</div>
                        </div>
                        <div className="font-bold text-navy font-body text-sm">₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-cream rounded-xl p-4 mb-6 space-y-2 text-sm font-body">
                    <div className="flex justify-between text-navy/60"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-navy/60"><span>Shipping ({delivery})</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                    <div className="h-px bg-navy/10" />
                    <div className="flex justify-between font-bold text-navy text-base"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline-gold text-sm" style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>← Back</button>
                    <button id="checkout-place-order-btn" onClick={handlePlaceOrder} className="btn-gold text-sm flex-1 justify-center">
                      Place Order - ₹{total.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Mini order summary */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 border border-navy/6 shadow-card sticky top-24">
                <h3 className="font-display text-lg font-bold text-navy mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {CART_SUMMARY.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-body font-medium text-navy line-clamp-1">{product.name}</div>
                        <div className="text-xs text-navy/40 font-body">Qty: {quantity}</div>
                      </div>
                      <div className="text-xs font-bold text-navy font-body whitespace-nowrap">₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-navy/8 mb-4" />
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between text-navy/50"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-navy/50"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                  <div className="h-px bg-navy/8" />
                  <div className="flex justify-between font-bold text-navy text-base"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
