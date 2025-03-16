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
      colors: {
        primary: {
          0: "#032C5B",
          10: "#043C7A",
          20: "#06457F",
          30: "#125896",
          40: "#1D6CAE",
          50: "#2880C6",
          60: "#3995DC",
          70: "#5EA9E5",
          80: "#87C0ED",
          90: "#B0D6F4",
          95: "#D9EAF9",
          99: "#F2F8FD",
          100: "#FFFFFF",
        },
        secondary: {
          0: "#1A1F33",
          10: "#23283D",
          20: "#2B3049",
          30: "#353A56",
          40: "#3F4463",
          50: "#4A4E71",
          60: "#5A5D83",
          70: "#6A6D94",
          80: "#8889AA",
          90: "#A7A8C0",
          95: "#D2D3DD",
          99: "#EBEBF2",
          100: "#FCFCFD",
        },
        neutral: {
          0: "#2B3D58",
          10: "#3A5273",
          20: "#4A6790",
          30: "#5B7CAC",
          40: "#6E91C9",
          50: "#85A8DC",
          60: "#9DBCE8",
          70: "#B4CFF2",
          80: "#C9DEF7",
          90: "#DEECFB",
          95: "#EAF4FD",
          99: "#F5FAFF",
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
