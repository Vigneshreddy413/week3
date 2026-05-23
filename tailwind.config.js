/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(79, 70, 229, 0.22)",
        glass: "0 18px 70px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at 10% 10%, rgba(59,130,246,.18), transparent 26%), radial-gradient(circle at 85% 12%, rgba(168,85,247,.18), transparent 28%), radial-gradient(circle at 50% 90%, rgba(20,184,166,.14), transparent 26%)",
        "mesh-dark":
          "radial-gradient(circle at 8% 8%, rgba(59,130,246,.24), transparent 28%), radial-gradient(circle at 86% 16%, rgba(168,85,247,.22), transparent 30%), radial-gradient(circle at 45% 92%, rgba(20,184,166,.18), transparent 28%)",
      },
    },
  },
  plugins: [],
};
