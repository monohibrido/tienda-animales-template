/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F1EEE3",     // fondo cálido, no blanco puro
        ink: "#1C1B17",       // texto principal
        brand: {
          light: "#EAF0EB",
          DEFAULT: "#1F3D2E", // verde botella, color de marca base
          dark: "#132A1F",
        },
        mustard: "#D9A441",   // acento tipo sello / ticket
        terracota: "#B5482F", // acento secundario, uso mínimo
        whats: "#25D366",     // verde WhatsApp, se mantiene reconocible aparte de la marca
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
