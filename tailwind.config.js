/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#151515',
          secondary: '#fb0405',
          accent: '#0C1427',
          neutral: '#232734',
          'base-100': '#f0f0f0',
          info: '#3b82f6',
          success: '#2cddbc',
          warning: '#eab308',
          error: '#ff2727',
        },
      },
    ],
  },
  aspectRatio: {
    '16/8': '16/8',
  },
  plugins: [require('daisyui')],
  animation: {
    'fade-in': 'fadeIn 1s ease-in',
  },
};
