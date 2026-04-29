import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const COLLECTIONS = [
  { id: 'divine', label: 'Divine Deities', description: 'Ganesha · Shiva · Lakshmi · Durga · Krishna', image: '/images/collections/divine-deities.png', href: '/shop?category=divine-idols' },
  { id: 'leaders', label: 'National Leaders', description: 'Gandhi · Kalam · Ambedkar · Subhash', image: '/images/collections/national-leaders.png', href: '/shop?category=monuments' },
  { id: 'temples', label: 'Temple Architecture', description: 'Gopurams · Pillars · Shrines · Décor', image: '/images/collections/temple-architecture.png', href: '/shop?category=temple-decor' },
  { id: 'home-decor', label: 'Home & Office Décor', description: 'Minimal · Contemporary · Spiritual', image: '/images/collections/home-office-decor.png', href: '/shop?category=home-decor' },
]

function CollectionCard({ c, tall, wide }: { c: typeof COLLECTIONS[0]; tall?: boolean; wide?: boolean }) {
  return (
    <Link href={c.href} id={`collection-card-${c.id}`}
      className={`group relative block rounded-3xl overflow-hidden img-zoom ${tall ? 'h-[580px] lg:h-full' : wide ? 'h-52 lg:h-64' : 'h-64 lg:h-[280px]'}`}>
      <img src={c.image} alt={c.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-tss-blue-deep via-tss-blue/25 to-transparent" />
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-tss-peach/45 rounded-3xl transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-1">{c.label}</h3>
        <p className="text-white/50 text-xs font-body mb-3">{c.description}</p>
        <span className="inline-flex items-center gap-1.5 text-tss-peach text-xs font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore Collection <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}

export default function CollectionsGrid() {
  return (
    <section id="collections" className="section-padding bg-tss-cream-dark">
      <div className="container-wide">
        <div className="text-center mb-14">
          <span className="section-label">Curated for You</span>
          <div className="divider-peach mx-auto" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-tss-blue mt-2">
            Explore Our <span className="peach-text">Collections</span>
          </h2>
          <p className="text-tss-stone mt-4 max-w-lg mx-auto font-body leading-relaxed text-[15px]">
            Each collection is a carefully curated world of art - find the one that speaks to your space and soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="lg:row-span-2"><CollectionCard c={COLLECTIONS[0]} tall /></div>
          <div><CollectionCard c={COLLECTIONS[1]} /></div>
          <div><CollectionCard c={COLLECTIONS[2]} /></div>
          <div className="lg:col-span-2"><CollectionCard c={COLLECTIONS[3]} wide /></div>
        </div>

        <div className="text-center mt-10">
          <Link href="/shop" id="collections-view-all-btn" className="btn-blue-outline">
            Browse All Sculptures <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
