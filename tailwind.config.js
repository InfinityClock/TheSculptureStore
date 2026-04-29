/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Brand Primary ────────────────────────────────────
        tss: {
          blue: '#1D3D5C',
          'blue-light': '#254D73',
          'blue-dark': '#132A40',
          'blue-deep': '#0D1E2E',
          peach: '#F4956A',
          'peach-light': '#F7AC86',
          'peach-dark': '#E07A4D',
          cream: '#FDF8F4',
          'cream-dark': '#F5EDE5',
          stone: '#8C7B6E',
        },
        // ─── Aliases used across shop/cart/checkout/account ──
        navy: {
          DEFAULT: '#1D3D5C',
          light: '#254D73',
          dark: '#132A40',
          deep: '#0D1E2E',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#D4B44A',
          dark: '#A8841C',
        },
        cream: '#FDF8F4',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'marquee': 'marquee 22s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'tss-gradient': 'linear-gradient(135deg, #0D1E2E 0%, #1D3D5C 50%, #254D73 100%)',
        'peach-gradient': 'linear-gradient(135deg, #F4956A 0%, #F7AC86 100%)',
        'hero-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(244,149,106,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(29,61,92,0.4) 0%, transparent 50%), linear-gradient(160deg, #0D1E2E 0%, #1D3D5C 60%, #1a3450 100%)',
      },
      boxShadow: {
        'peach': '0 4px 24px rgba(244, 149, 106, 0.30)',
        'peach-lg': '0 8px 40px rgba(244, 149, 106, 0.40)',
        'tss': '0 4px 24px rgba(29, 61, 92, 0.25)',
        'tss-lg': '0 8px 40px rgba(29, 61, 92, 0.35)',
        'card': '0 2px 16px rgba(29,61,92,0.07)',
        'card-hover': '0 12px 40px rgba(29,61,92,0.14)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
