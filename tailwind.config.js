/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        dh: "calc(100dvh - 80px)",
      },
    },
  },
  plugins: [],
};
