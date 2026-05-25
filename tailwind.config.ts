import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0d12',
        surface: '#111318',
        'surface-2': '#151922',
        'surface-3': '#1b2030',
        'surface-4': '#232a3f',
        foreground: '#eef1ff',
        muted: '#a0a7be',
        line: 'rgba(255,255,255,0.08)',
        primary: '#a8a6ff',
        'primary-strong': '#7f7bff',
        secondary: '#70d7ff',
        accent: '#9dd6ff',
        success: '#58d39b',
        warning: '#ffcc66',
        danger: '#ff7b8d'
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2.5rem'
      },
      boxShadow: {
        glow: '0 18px 70px rgba(168, 166, 255, 0.14)',
        panel: '0 12px 60px rgba(0, 0, 0, 0.3)'
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif']
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top, rgba(168,166,255,0.18), rgba(11,13,18,0) 48%), radial-gradient(circle at 85% 15%, rgba(112,215,255,0.10), rgba(11,13,18,0) 38%)',
        'mesh-dark':
          'linear-gradient(135deg, rgba(168,166,255,0.08), rgba(112,215,255,0.04), rgba(255,255,255,0.02))'
      }
    }
  },
  plugins: []
};

export default config;
