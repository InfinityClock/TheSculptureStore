import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SculptureStore – Crafting Divine Art for Every Space',
    template: '%s | SculptureStore',
  },
  description: 'Premium handcrafted sculptures, divine idols, and 3D printed monuments. Blending tradition with modern craftsmanship. Made in India, delivered worldwide.',
  keywords: ['3D printed idols', 'temple sculptures', 'divine idols', 'handcrafted sculptures', 'Indian art', 'religious sculptures', 'custom monuments'],
  authors: [{ name: 'SculptureStore' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sculpturestore.in',
    siteName: 'SculptureStore',
    title: 'SculptureStore – Crafting Divine Art for Every Space',
    description: 'Premium handcrafted sculptures & divine idols. Made in India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SculptureStore – Crafting Divine Art for Every Space',
    description: 'Premium handcrafted sculptures & divine idols. Made in India.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
