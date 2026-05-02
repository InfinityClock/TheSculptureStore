'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ChevronRight, CreditCard, Smartphone, Building2, Lock } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { calculateShipping } from '@/lib/shipping'
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
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validateAddress = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.pincode.trim()) e.pincode = 'Required'
    if (!form.state) e.state = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const shipping = delivery === 'express' ? calculateShipping(subtotal, 'express') : calculateShipping(subtotal, 'standard')
  const total = subtotal + shipping

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check size={36} className="text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-tss-blue mb-3">Order Placed! 🎉</h1>
            <p className="text-gray-500 font-body text-sm leading-relaxed mb-2">
              Your divine sculptures are being crafted with love in our Chennai studio. You'll receive a confirmation shortly.
            </p>
            <p className="text-tss-peach font-display font-semibold text-sm mb-8">Order ID: #SS{orderId}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account" className="btn-peach text-sm">Track Order</Link>
              <Link href="/shop" className="btn-blue-outline text-sm">Continue Shopping</Link>
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
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-10">
          <h1 className="font-display text-3xl font-bold text-tss-blue mb-8">Checkout</h1>

          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center shrink-0">
                <button onClick={() => i < step && setStep(i)} className="flex items-center gap-2">
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-body transition-all',
                    i < step ? 'bg-tss-peach text-white' : i === step ? 'bg-tss-blue text-white' : 'bg-gray-200 text-gray-400'
                  )}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={clsx('text-sm font-body font-medium hidden sm:block', i === step ? 'text-tss-blue' : 'text-gray-400')}>{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={clsx('h-px w-8 sm:w-12 mx-2', i < step ? 'bg-tss-peach' : 'bg-gray-200')} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-7">
            {/* Left - step content */}
            <div className="lg:col-span-2">
              {step === 0 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-tss-blue mb-6">Delivery Address</h2>
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
                        <label className="block text-xs font-semibold text-gray-500 font-body mb-1.5 uppercase tracking-wide">{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={e => { update(key as keyof typeof form, e.target.value); setErrors(p => ({ ...p, [key]: '' })) }}
                          className={clsx('w-full px-4 py-3 border rounded-xl text-sm font-body text-tss-blue placeholder-gray-400 focus:outline-none transition-colors', errors[key as keyof typeof form] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-tss-peach/50')}
                        />
                        {errors[key as keyof typeof form] && <p className="text-xs text-red-500 font-body mt-1">{errors[key as keyof typeof form]}</p>}
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 font-body mb-1.5 uppercase tracking-wide">State</label>
                      <select
                        value={form.state}
                        onChange={e => { update('state', e.target.value); setErrors(p => ({ ...p, state: '' })) }}
                        className={clsx('w-full px-4 py-3 border rounded-xl text-sm font-body text-tss-blue focus:outline-none transition-colors appearance-none cursor-pointer', errors.state ? 'border-red-400' : 'border-gray-200 focus:border-tss-peach/50')}
                      >
                        <option value="">Select State</option>
                        {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button onClick={() => { if (validateAddress()) setStep(1) }} className="btn-peach mt-6 text-sm">
                    Continue to Delivery <ChevronRight size={15} />
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-tss-blue mb-6">Delivery Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', price: subtotal >= 999 ? 'Free' : '₹149' },
                      { id: 'express', label: 'Express Delivery', sub: '2–3 business days', price: '₹149' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setDelivery(opt.id)}
                        className={clsx(
                          'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left',
                          delivery === opt.id ? 'border-tss-peach bg-tss-peach/5' : 'border-gray-200 hover:border-tss-peach/40'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={clsx('w-4 h-4 rounded-full border-2 flex items-center justify-center', delivery === opt.id ? 'border-tss-peach' : 'border-gray-300')}>
                            {delivery === opt.id && <div className="w-2 h-2 rounded-full bg-tss-peach" />}
                          </div>
                          <div>
                            <div className="font-body font-semibold text-tss-blue text-sm">{opt.label}</div>
                            <div className="text-xs text-gray-400 font-body">{opt.sub}</div>
                          </div>
                        </div>
                        <span className={clsx('font-bold font-body text-sm', opt.price === 'Free' ? 'text-green-600' : 'text-tss-blue')}>
                          {opt.price}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="btn-blue-outline text-sm">← Back</button>
                    <button onClick={() => setStep(2)} className="btn-peach text-sm">Continue to Payment <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-tss-blue mb-6">Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'razorpay', icon: Smartphone, label: 'Razorpay', sub: 'UPI, Net Banking, Cards, Wallets' },
                      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Rupay' },
                      { id: 'netbanking', icon: Building2, label: 'Net Banking', sub: 'All major Indian banks' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setPayment(opt.id)}
                        className={clsx(
                          'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                          payment === opt.id ? 'border-tss-peach bg-tss-peach/5' : 'border-gray-200 hover:border-tss-peach/40'
                        )}
                      >
                        <div className={clsx('w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0', payment === opt.id ? 'border-tss-peach' : 'border-gray-300')}>
                          {payment === opt.id && <div className="w-2 h-2 rounded-full bg-tss-peach" />}
                        </div>
                        <opt.icon size={17} className="text-gray-400 shrink-0" />
                        <div>
                          <div className="font-body font-semibold text-tss-blue text-sm">{opt.label}</div>
                          <div className="text-xs text-gray-400 font-body">{opt.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-body mb-6">
                    <Lock size={12} /> All transactions are encrypted and secure
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-blue-outline text-sm">← Back</button>
                    <button onClick={() => setStep(3)} className="btn-peach text-sm">Review Order <ChevronRight size={15} /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-tss-blue mb-6">Review & Place Order</h2>
                  <div className="space-y-4 mb-6">
                    {CART_SUMMARY.map(({ product, quantity, size }) => (
                      <div key={product.id} className="flex gap-4 items-center">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-body text-sm font-semibold text-tss-blue">{product.name}</div>
                          <div className="text-xs text-gray-400 font-body">{size} · Qty: {quantity}</div>
                        </div>
                        <div className="font-bold text-tss-blue font-body text-sm">₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-sm font-body">
                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping ({delivery})</span>
                      <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="flex justify-between font-bold text-tss-blue text-base"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-blue-outline text-sm">← Back</button>
                    <button onClick={() => setOrderPlaced(true)} className="btn-peach text-sm flex-1 justify-center">
                      Place Order: ₹{total.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right - order summary */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="font-display text-lg font-bold text-tss-blue mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {CART_SUMMARY.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-body font-medium text-tss-blue line-clamp-1">{product.name}</div>
                        <div className="text-xs text-gray-400 font-body">Qty: {quantity}</div>
                      </div>
                      <div className="text-xs font-bold text-tss-blue font-body whitespace-nowrap">₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-100 mb-4" />
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between font-bold text-tss-blue text-base"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
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
