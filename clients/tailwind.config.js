/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'slide-in-elliptic-top-fwd':
          'slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
      },
      keyframes: {
        'slide-in-elliptic-top-fwd': {
          '0%': {
            transform: 'translateY(-600px) rotateX(-30deg) scale(0)',
            'transform-origin': '50% 100%',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0) rotateX(0) scale(1)',
            'transform-origin': '50% 1400px',
            opacity: '1',
          },
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  plugins: [],
};
