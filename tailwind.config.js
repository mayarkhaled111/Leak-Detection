/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

];
export const theme = {
  container: {
    center: true,
    padding: '60px'
  },
  extend: {
    colors: {
      mainColor: "#023873",
      secondColor: "#3162DA",
    },
  },
};
export const plugins = [];
