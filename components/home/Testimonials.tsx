'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data'
import { clsx } from 'clsx'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const prev = () => setActive(a => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))
  const next = () => setActive(a => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))

  return (
    <section id="testimonials" className="section-padding bg-tss-cream">
      <div className="container-wide">
        <div className="text-center mb-14">
          <span className="section-label">What Customers Say</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-tss-blue mt-2">
            Stories of <span className="peach-text">Happy Homes</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden" style={{ background: '#1D3D5C' }}>
            {/* Decorative quote */}
            <div className="absolute top-6 right-8 text-tss-peach/10"><Quote size={80} /></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-tss-peach/5" />

            <div className="relative z-10">
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className={s <= TESTIMONIALS[active].rating ? 'fill-tss-peach text-tss-peach' : 'text-white/20'} />
                ))}
              </div>

              <blockquote className="font-display text-lg sm:text-xl lg:text-2xl text-white leading-relaxed mb-8 italic">
                "{TESTIMONIALS[active].review}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-tss-peach flex items-center justify-center font-display font-bold text-white text-lg shrink-0">
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-white text-sm">{TESTIMONIALS[active].name}</div>
                    <div className="text-white/40 text-xs font-body">{TESTIMONIALS[active].location}</div>
                    <div className="text-tss-peach/60 text-xs font-body mt-0.5">Purchased: {TESTIMONIALS[active].product}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button id="testimonials-prev-btn" onClick={prev} aria-label="Previous"
                    className="w-10 h-10 rounded-full border border-white/15 text-white/50 hover:border-tss-peach hover:text-tss-peach flex items-center justify-center transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button id="testimonials-next-btn" onClick={next} aria-label="Next"
                    className="w-10 h-10 rounded-full border border-white/15 text-white/50 hover:border-tss-peach hover:text-tss-peach flex items-center justify-center transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} id={`testimonial-dot-${i}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`}
                className={clsx('rounded-full transition-all duration-300', i === active ? 'w-8 h-2 bg-tss-peach' : 'w-2 h-2 bg-tss-blue/25')} />
            ))}
          </div>

          {/* Mini cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
            {TESTIMONIALS.map((t, i) => (
              <button key={t.id} id={`testimonial-mini-${i}`} onClick={() => setActive(i)}
                className={clsx('p-3 rounded-2xl text-left transition-all border', i === active ? 'border-tss-peach bg-tss-peach/5 shadow-peach' : 'border-tss-blue/10 bg-white hover:border-tss-peach/30')}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-xl bg-tss-blue flex items-center justify-center text-white text-[10px] font-bold font-body shrink-0">
                    {t.avatar}
                  </div>
                  <div className="text-[10px] font-semibold text-tss-blue font-body truncate">{t.name.split(' ')[0]}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => <Star key={s} size={8} className={s < t.rating ? 'fill-tss-peach text-tss-peach' : 'fill-gray-300 text-gray-300'} />)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
