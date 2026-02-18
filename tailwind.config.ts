import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          tertiary: '#1A1A25',
          hover: '#22222E',
        },
        text: {
          primary: '#F0F0F5',
          secondary: '#A0A0B0',
          tertiary: '#606075',
          inverse: '#0A0A0F',
        },
        accent: {
          gold: '#D4A853',
          'gold-muted': 'rgba(212,168,83,0.19)',
          'gold-hover': '#E0B86A',
        },
        data: {
          blue: '#4A9EFF',
          cyan: '#00D4AA',
          purple: '#8B5CF6',
          orange: '#FF8C42',
          red: '#FF4C4C',
          green: '#10B981',
        },
        border: {
          subtle: '#1F1F2E',
          medium: '#2A2A3D',
          strong: '#3A3A50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
