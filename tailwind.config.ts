import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#363738', // Primary color
        button: '#1600A0', // Button color
        // button: '#0069BF', // Button color
        text: {
          // Text colors based on sizes from gray-900 to gray-200 and white
          small: '#111827', // Equivalent to gray-900
          medium: '#4B5563', // Equivalent to gray-700
          large: '#9CA3AF', // Equivalent to gray-400
          light: '#E5E7EB', // Equivalent to gray-200
          white: '#FFFFFF', // White
        },
        success: {
          DEFAULT: '#4CAF50', // Green color for success
          light: '#66BB6A',
          dark: '#388E3C',
        },
        error: '#F44336', // Red color for error
        danger: {
          DEFAULT: '#F44336', // Red color for danger
          light: '#E57373',
          dark: '#D32F2F',
        },
        warning: {
          DEFAULT: '#FF9800', // Orange color for warning
          light: '#FFB74D',
          dark: '#F57C00',
        },
        info: {
          DEFAULT: '#2196F3', // Blue color for info
          light: '#64B5F6',
          dark: '#1976D2',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
