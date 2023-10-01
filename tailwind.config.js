/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './redux/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      colors: {
        'primary-color': '#c594ff',
        'secondary-color': '#3a33a4',
        // 'secondary-color': '#6a63d4',
        'tertiary-color': '#31438e',
        'bg-color': '#00011c',
        'bg-color-light': '#082450',
        'bg-color-xlight': '#bad5ff',
        'bg-color-xxlight': '#c9dff8',
        alert: 'rgb(208, 0, 0)',
        info: 'rgb(0, 122, 0)',
        'clear-text': 'rgb(255, 255, 255)',
        'really-dark': '#00011c',
        'btn-light-blue': '#97b1bf',
      },
      screens: {
        h2xs: { raw: '(min-height: 480px)' },
        hxs: { raw: '(min-height: 640px)' },
        hs: { raw: '(min-height: 740px)' },
        hm: { raw: '(min-height: 840px)' },
        hl: { raw: '(min-height: 915px)' },
        hxl: { raw: '(min-height: 1024px)' },
        h2xl: { raw: '(min-height: 1400px)' },

        '2xs': '280px',
        xs: '320px',
        sm: '576px',
        md: '960px',
        lg: '1440px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
