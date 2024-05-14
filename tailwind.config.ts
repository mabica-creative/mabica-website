import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#ebe9fc",
        background: "#010104",
        primary: "#3a31d8",
        secondary: "#020024",
        accent: "#0600c2",
      },
    },
  },
};
export default config;
