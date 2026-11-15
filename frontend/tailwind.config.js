/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nouvelle Palette Militaire Institutionnelle ORIENT-GR
        gendarmerie: {
          darkest: '#091B13',
          dark: '#0E291E',
          DEFAULT: '#153B2B', // Vert militaire principal (#153B2B)
          light: '#1C4E39',
          lighter: '#25664A',
        },
        military: {
          darkest: '#091B13',
          dark: '#0E291E',
          DEFAULT: '#153B2B', // Vert militaire (#153B2B)
          light: '#1C4E39',
          gold: '#C9A052',    // Doré (#C9A052)
          bg: '#F7F8F5',      // Background (#F7F8F5)
          card: '#FFFFFF',    // Cards (#FFFFFF)
          text: '#344256',    // Texte (#344256)
          border: '#DCE4EA',  // Borders (#DCE4EA)
        },
        olive: {
          dark: '#1C4E39',
          DEFAULT: '#153B2B', // Vert militaire
          light: '#25664A',
          muted: '#8A9E84',
        },
        gold: {
          dark: '#A6823B',
          DEFAULT: '#C9A052', // Doré exact (#C9A052)
          light: '#DFC17E',
          muted: '#EBD4A2',
          subtle: '#FAF6ED',
        },
        cream: {
          50: '#FAFBF8',
          100: '#F7F8F5',     // Background général (#F7F8F5)
          200: '#EEF1EB',
          300: '#E0E6DD',
        },
        slateSubtle: {
          50: '#F7F8F5',
          100: '#DCE4EA',     // Borders fines exactes (#DCE4EA)
          200: '#DCE4EA',     // Borders fines exactes (#DCE4EA)
          300: '#CBD6DE',
          400: '#94A3B8',
          500: '#64748B',
          600: '#4B5B6D',
          700: '#344256',     // Texte principal (#344256)
          800: '#344256',     // Texte principal (#344256)
          900: '#1F2B3A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 1px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 2px 8px 0 rgba(21, 59, 43, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 16px -2px rgba(21, 59, 43, 0.08), 0 3px 6px -2px rgba(21, 59, 43, 0.04)',
        'modal': '0 20px 25px -5px rgba(21, 59, 43, 0.15), 0 10px 10px -5px rgba(21, 59, 43, 0.08)',
        'gold-glow': '0 0 15px rgba(201, 160, 82, 0.35)',
      },
      borderRadius: {
        'card': '0.75rem',
      }
    },
  },
  plugins: [],
}
