import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Sculpture Store team.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-wide py-16">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Get In Touch</span>
              <h1 className="font-display text-4xl font-bold text-tss-blue mt-3 mb-2">Contact Us</h1>
              <p className="text-tss-stone font-body">We&apos;d love to hear from you. Reach out via WhatsApp for the fastest response.</p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-5">
              {[
                { label: 'WhatsApp', value: '+91 79000 60026', href: 'https://wa.me/917900060026' },
                { label: 'Email', value: 'hello@sculpturestore.in', href: 'mailto:hello@sculpturestore.in' },
                { label: 'Studio', value: 'Vanagaram, Chennai, Tamil Nadu 600077', href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-xs font-semibold text-gray-400 font-body uppercase tracking-wide">{label}</span>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-tss-blue font-body text-sm font-medium hover:text-tss-peach transition-colors">{value}</a>
                  ) : (
                    <span className="text-tss-blue font-body text-sm">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
