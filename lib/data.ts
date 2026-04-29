// ─── Product Types ───────────────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: Category
  material: string
  sizes: string[]
  badge?: string
  description: string
  inStock: boolean
  featured: boolean
}

export type Category =
  | 'divine-idols'
  | 'monuments'
  | 'car-dashboard'
  | 'custom-sculptures'
  | 'temple-decor'
  | 'home-decor'

// ─── Mock Products ────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lord Ganesha - Blessing Pose',
    slug: 'ganesha-blessing',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.9,
    reviews: 312,
    image: '/images/products/ganesha-blessing.png',
    images: ['/images/products/ganesha-blessing.png'],
    category: 'divine-idols',
    material: 'PLA+ Resin, Hand-painted',
    sizes: ['6 inch', '9 inch', '12 inch', '18 inch'],
    badge: 'Best Seller',
    description: 'Exquisitely crafted Lord Ganesha idol with intricate detailing, vibrant hand-painted finish, and a warm gold accent that brings prosperity to your space.',
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Lord Shiva - Nataraja Dance',
    slug: 'shiva-nataraja',
    price: 3299,
    originalPrice: 4499,
    discount: 27,
    rating: 4.8,
    reviews: 198,
    image: '/images/products/shiva-nataraja.png',
    images: ['/images/products/shiva-nataraja.png'],
    category: 'divine-idols',
    material: 'Resin Composite, Gold Finish',
    sizes: ['8 inch', '12 inch', '18 inch'],
    badge: 'Premium',
    description: 'The cosmic dance of creation and destruction. This Nataraja piece captures the energy and grace of Lord Shiva in his most iconic form.',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Goddess Lakshmi - Prosperity Form',
    slug: 'lakshmi-prosperity',
    price: 2799,
    originalPrice: 3799,
    discount: 26,
    rating: 4.9,
    reviews: 267,
    image: '/images/products/lakshmi-prosperity.png',
    images: ['/images/products/lakshmi-prosperity.png'],
    category: 'divine-idols',
    material: 'ABS Resin, Antique Finish',
    sizes: ['6 inch', '9 inch', '12 inch'],
    badge: 'New',
    description: 'Goddess Lakshmi in her benevolent blessing pose, showering wealth and fortune. Perfect for home temples and gifting.',
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Buddha - Meditating Serenity',
    slug: 'buddha-meditating',
    price: 1999,
    originalPrice: 2799,
    discount: 29,
    rating: 4.7,
    reviews: 145,
    image: '/images/products/buddha-meditating.png',
    images: ['/images/products/buddha-meditating.png'],
    category: 'divine-idols',
    material: 'Resin, Stone-effect Finish',
    sizes: ['5 inch', '8 inch', '12 inch'],
    description: 'A serene Buddha sculpture radiating peace and mindfulness. Ideal for living rooms, meditation spaces, and gardens.',
    inStock: true,
    featured: false,
  },
  {
    id: '5',
    name: 'APJ Abdul Kalam - Tribute Monument',
    slug: 'apj-kalam-monument',
    price: 4999,
    originalPrice: 6500,
    discount: 23,
    rating: 4.9,
    reviews: 89,
    image: '/images/products/apj-kalam-monument.png',
    images: ['/images/products/apj-kalam-monument.png'],
    category: 'monuments',
    material: 'High-detail Resin, Bronze Finish',
    sizes: ['10 inch', '15 inch', '20 inch'],
    badge: 'Trending',
    description: 'A dignified tribute to India\'s Missile Man. This monument-grade sculpture captures the visionary spirit of Dr. APJ Abdul Kalam.',
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Ganesha - Car Dashboard Mini',
    slug: 'ganesha-car-dashboard',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.8,
    reviews: 523,
    image: '/images/products/ganesha-dashboard.png',
    images: ['/images/products/ganesha-dashboard.png'],
    category: 'car-dashboard',
    material: 'PLA, Vibration-resistant Base',
    sizes: ['2 inch', '3 inch'],
    badge: 'Best Seller',
    description: 'Bring divine protection on every drive. This compact Ganesha fits perfectly on your car dashboard with a non-slip magnetic base.',
    inStock: true,
    featured: true,
  },
  {
    id: '7',
    name: 'Custom Portrait Sculpture',
    slug: 'custom-portrait',
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    rating: 5.0,
    reviews: 42,
    image: '/images/products/custom-portrait.png',
    images: ['/images/products/custom-portrait.png'],
    category: 'custom-sculptures',
    material: 'Premium Resin, Custom Painted',
    sizes: ['8 inch', '12 inch', '18 inch'],
    badge: 'Custom Order',
    description: 'Turn your loved one\'s photo into a timeless 3D sculpture. Our artists craft each piece with meticulous detail and love.',
    inStock: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Temple Gopuram Miniature',
    slug: 'temple-gopuram',
    price: 5499,
    originalPrice: 7000,
    discount: 21,
    rating: 4.8,
    reviews: 76,
    image: '/images/products/temple-gopuram.png',
    images: ['/images/products/temple-gopuram.png'],
    category: 'temple-decor',
    material: 'Resin + Stone Composite',
    sizes: ['12 inch', '18 inch', '24 inch'],
    description: 'An architectural marvel in miniature - a detailed South Indian temple gopuram replica for collectors and devotees alike.',
    inStock: true,
    featured: false,
  },
]

export const BEST_SELLERS = PRODUCTS.filter(p => p.featured).slice(0, 6)

export const CATEGORIES = [
  {
    id: 'divine-idols',
    label: 'Divine Idols',
    description: 'Sacred sculptures of deities, crafted with devotion',
    icon: '🙏',
    image: '/images/products/ganesha-blessing.png',
    count: 120,
  },
  {
    id: 'monuments',
    label: 'Monuments',
    description: 'Leaders, legends & iconic monuments in 3D',
    icon: '🏛️',
    image: '/images/products/apj-kalam-monument.png',
    count: 45,
  },
  {
    id: 'car-dashboard',
    label: 'Car Dashboard Dolls',
    description: 'Divine companions for your daily drives',
    icon: '🚗',
    image: '/images/products/ganesha-dashboard.png',
    count: 38,
  },
  {
    id: 'custom-sculptures',
    label: 'Custom Sculptures',
    description: 'Your photo, your story - in 3D',
    icon: '✨',
    image: '/images/products/custom-portrait.png',
    count: 22,
  },
]

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    avatar: 'PS',
    rating: 5,
    review: 'The Ganesha idol I ordered for my puja room is absolutely stunning. The detail work is breathtaking and the gold finish looks so luxurious. My whole family is in love with it!',
    product: 'Lord Ganesha - Blessing Pose',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Chennai, Tamil Nadu',
    avatar: 'RK',
    rating: 5,
    review: 'Ordered the Nataraja sculpture for our office reception. Every visitor compliments it. The quality is on par with anything I\'ve seen in high-end galleries. Truly premium.',
    product: 'Lord Shiva - Nataraja Dance',
  },
  {
    id: '3',
    name: 'Ananya Nair',
    location: 'Kochi, Kerala',
    avatar: 'AN',
    rating: 5,
    review: 'The custom portrait sculpture of my grandfather was delivered on his 80th birthday. He was moved to tears. The likeness is incredible - you can even see his smile!',
    product: 'Custom Portrait Sculpture',
  },
  {
    id: '4',
    name: 'Vikram Patel',
    location: 'Ahmedabad, Gujarat',
    avatar: 'VP',
    rating: 5,
    review: 'Bought 6 car dashboard dolls as gifts for my team. Everyone loved them. The packaging was gorgeous and the quality exceeded all expectations. Will order again!',
    product: 'Ganesha - Car Dashboard Mini',
  },
  {
    id: '5',
    name: 'Sunita Reddy',
    location: 'Hyderabad, Telangana',
    avatar: 'SR',
    rating: 5,
    review: 'The Kalam monument is a conversation starter at our office. The bronze finish is so realistic. Delivery was fast and the packing was absolutely premium.',
    product: 'APJ Abdul Kalam - Tribute Monument',
  },
]
