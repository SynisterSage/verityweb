module.exports = {
  // Restrict content globs to source files only to avoid scanning node_modules
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0b111b',
          card: '#121a26',
          border: '#202c3c',
          text: '#f5f7fb',
          muted: '#98a7c2',
        },
        light: {
          bg: '#f7f9fc',
          card: '#ffffff',
          border: '#e3e9f4',
          text: '#101623',
          muted: '#5b6b86',
        },
        brand: {
          blue: '#2d6df6',
          lightBlue: '#8ab4ff',
          danger: '#ff8a8a',
          warning: '#f7c16e',
        }
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(45, 109, 246, 0.3)',
        'glow-sm': '0 0 20px -5px rgba(45, 109, 246, 0.2)'
      }
    }
  },
  plugins: []
}
