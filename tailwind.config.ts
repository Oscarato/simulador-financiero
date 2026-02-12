import type { Config } from 'tailwindcss';

// eslint-disable-next-line
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '426px',
        md: '769px',
        lg: '977px',
        xl: '1441px',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sanchez: ['Sanchez', 'serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        normalIm: '400 !important',
      },
      fontSize: {
        h1: ['48px', '48px'],
        h2: ['40px', '48px'],
        h3: ['34px', '40.8px'],
        h4: ['30px', '36px'],
        h5: ['24px', '31.2px'],
        h6: ['22px', '26.4px'],
        sb3: ['18px', '21.6px'],
        p: ['16px', '19.2px'],
        body2: ['14px', '16.8px'],
        caption: ['12px', '14.4px'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          '-500': '#F9FAFB',
          '-400': '#F0F1F2',
          '-300': '#E9EAEC',
          '-200': '#D1D3D8',
          '-100': '#6B7280',
          DEFAULT: '#606773',
          '100': '#565B66',
          '200': '#505660',
          '300': '#40444D',
          '400': '#30333A',
          '500': '#25282D',
        },
        purple: colors.violet,
        yellow: colors.amber,
        pink: colors.fuchsia,
        orange: colors.orange,
        primary: '#0097AE',
        secondary: {
          light: '#FEC82F',
          DEFAULT: '#F9B036',
        },
        white: {
          '-400': '#F0F1F2 !important',
          DEFAULT: '#FFF !important',
        },
        error: {
          '-400': '#F7DDDD',
          '-300': '#EEB9B9',
          '-200': '#C81E1D',
          '-100': '#B41B1A',
          DEFAULT: '#A01817',
          100: '#961716',
          200: '#781211',
          300: '#5A0D0D',
          400: '#460B0A',
        },
        green: {
          '-400': '#E6F3F5',
          '-300': '#D9ECEF',
          '-200': '#B0D8DE',
          '-100': '#008296',
          DEFAULT: '#007587',
          100: '#006878',
          200: '#006271',
          300: '#004E5A',
          400: '#003A44',
          500: '#002E35',
        },
        blue: {
          '-400': '#E6EDF3',
          '-300': '#DAE4ED',
          '-200': '#B2C7D9',
          '-100': '#054B85',
          DEFAULT: '#054478',
          100: '#043C6A',
          200: '#043864',
          300: '#032D50',
          400: '#02223C',
          500: '#021A2F',
        },
        success: {
          '-400': '#30333A',
          '-300': '#EFF8EF',
          '-200': '#E7F4E6',
          '-100': '#CDE9CC',
          DEFAULT: '#386E37',
          100: '#5DB85B',
          200: '#54A652',
          300: '#4A9349',
          400: '#468A44',
          500: '#214020',
        },
      },
      gridTemplateColumns: {
        A1: '500px repeat(2, minmax(0, 1fr))',
        A2: '194px repeat(3, minmax(0, 1fr))',
        A3: '380px repeat(2, minmax(0, 1fr))',
        T1: '3fr repeat(24, minmax(0, 1fr))',
        RT: '200px 1fr',
        RI: '400px 1fr',
        ON: '1fr 1fr 2fr',
      },
      borderRadius: {
        trInfo: '0px 158px 0px 0px',
      },
      spacing: {
        'custom-lg': '70px !important',
      },
    },
  },
};

module.exports = config;
