/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px', // Questo corrisponde a 1024px
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ["SF UI Text", "sans-serif"],
      body: ["SF UI Text", "sans-serif"],
    },
    extend: {
      screens: {
        small: { raw: '(max-width: 1023px)' },
        large: { raw: '(min-width: 1024px)' },
      },
      fontSize: {
        '2.25xl': '1.625rem',
        '1.5xl': '1.375rem',
      },
      boxShadow: {
        'drop-4': '0px 12px 24px 0px rgba(122, 133, 133, 0.20)',
        'drop-5': '0px 16px 24px 0px rgba(0, 81, 87, 0.24)'
      },
      margin: {
        "5/8": "0.625rem",
        "3/8": "0.375rem"
      },
      padding: {
        "5/8": "0.625rem",
        "3/8": "0.375rem",
      },
      borderRadius: {
        "5/8": "0.625rem",
        "3/8": "0.375rem"
      },
      lineHeight: {
        "120": "120%"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ['"Roboto Slab"', "serif"],
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          0: "#000000",  // Nero
          10: "#121212",
          20: "#1E1E1E",
          30: "#2A2A2A",
          40: "#3C3C3C",
          50: "#4F4F4F",
          60: "#626262",
          70: "#757575",
          80: "#A0A0A0",
          90: "#C0C0C0",
          95: "#E0E0E0",
          99: "#F5F5F5",
          100: "#FFFFFF", // Bianco
        },
        secondary: {
          0: "#101010",
          10: "#181818",
          20: "#202020",
          30: "#282828",
          40: "#303030",
          50: "#383838",
          60: "#505050",
          70: "#686868",
          80: "#A8A8A8",
          90: "#D0D0D0",
          95: "#E8E8E8",
          99: "#F8F8F8",
          100: "#FFFFFF",
        },
        neutral: {
          0: "#141414",
          10: "#1C1C1C",
          20: "#242424",
          30: "#2C2C2C",
          40: "#3C3C3C",
          50: "#545454",
          60: "#7C7C7C",
          70: "#A4A4A4",
          80: "#CCCCCC",
          90: "#E6E6E6",
          95: "#F0F0F0",
          99: "#FAFAFA",
          100: "#FFFFFF",
        },
        accent: {
          0: "#003B49",
          10: "#004F61",
          20: "#00607C",
          30: "#007899",
          40: "#008FAB",
          50: "#00A5C2",
          60: "#26B9D4",
          70: "#58CDE4",
          80: "#8ADFED",
          90: "#BBF2FA",
          95: "#DCF8FD",
          99: "#F2FCFE",
          100: "#FFFFFF",
        },
        error: {
          0: "#5C0000",
          10: "#800000",
          20: "#9D0000",
          30: "#C51616",
          40: "#D22D2D",
          50: "#DD4040",
          60: "#E56C6C",
          70: "#EEA0A0",
          80: "#F5C7C7",
          90: "#FAE5E5",
          95: "#FDF2F2",
          99: "#FEFBFB",
          100: "#FFFFFF",
        },
        warning: {
          0: "#4D3D00",
          10: "#665100",
          20: "#997900",
          30: "#CCA100",
          40: "#E6B800",
          50: "#FFD700",
          60: "#FFDF33",
          70: "#FFE766",
          80: "#FFF099",
          90: "#FFF5CC",
          95: "#FFF9E6",
          99: "#FFFBF5",
          100: "#FFFFFF",
        },
      }
    }
  },
  plugins: [],
};
