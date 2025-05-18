/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4ecdc4', 
        'primary-light': '#76dbd1',
        'primary-dark': '#36b1a8',
        'primary-rgb': '78, 205, 196',
        secondary: '#1a1a1a', 
        'secondary-light': '#252525',
        'secondary-dark': '#0f0f0f',
        accent: '#5ce1e6', 
        'accent-light': '#8df0f3',
        'accent-dark': '#2cced3',
        'accent-rgb': '92, 225, 230',
        foreground: '#ffffff',
        background: '#0a0a0a',
        'gray-dark': '#252525',
        'gray-light': '#d1d1d1',
        'gradient-from': '#4ecdc4', 
        'gradient-from-rgb': '78, 205, 196',
        'gradient-to': '#4ecdc4', 
        'gradient-to-rgb': '78, 205, 196',
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(78, 205, 196, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(78, 205, 196, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(78, 205, 196, 0.3)',
        'glow': '0 0 15px rgba(78, 205, 196, 0.4)',
        'glow-lg': '0 0 25px rgba(78, 205, 196, 0.5)',
        'glow-xl': '0 0 35px rgba(78, 205, 196, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1))',
      },
    },
  },
  plugins: [],
}