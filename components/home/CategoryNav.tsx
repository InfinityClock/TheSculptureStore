import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'

export default function CategoryNav() {
  return (
    <section id="categories" className="section-padding bg-tss-cream">
      <div className="container-wide">
        <div className="text-center mb-14">
          <span className="section-label">Browse by Category</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-tss-blue mt-2">
            Find Your Perfect <span className="peach-text">Sculpture</span>
          </h2>
          <p className="text-tss-stone mt-4 max-w-xl mx-auto font-body leading-relaxed text-[15px]">
            From sacred divine idols to personalized portraits - discover sculptures crafted for every purpose and every space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              id={`category-card-${cat.id}`}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] block img-zoom"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tss-blue-deep via-tss-blue/30 to-transparent" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-tss-peach/50 rounded-3xl transition-all duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-[10px] font-body text-white/50 bg-white/10 rounded-full px-2.5 py-1 border border-white/10">
                    {cat.count}+ Items
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-tss-peach transition-colors">
                  {cat.label}
                </h3>
                <p className="text-white/50 text-xs font-body leading-relaxed mb-3">{cat.description}</p>
                <div className="flex items-center gap-1.5 text-tss-peach text-xs font-semibold font-body opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/shop" id="category-view-all-btn" className="btn-blue-outline">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
