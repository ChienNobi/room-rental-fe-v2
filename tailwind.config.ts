import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
