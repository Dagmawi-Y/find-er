/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FAD798", // lighter shade
          DEFAULT: "#F29F05", // original primary color
          dark: "#BA6E00", // darker shade
        },
        secondary: {
          light: "#B3E2F5", // lighter shade
          DEFAULT: "#3DADD9", // original secondary color
          dark: "#2A7BA6", // darker shade
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#F29F05",
          secondary: "#3DADD9",
          "primary-light": "#FAD798",
          "primary-dark": "#BA6E00",
          "secondary-light": "#B3E2F5",
          "secondary-dark": "#2A7BA6",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3DADD9",
          secondary: "#F29F05",
          "primary-content": "white",
          "primary-light": "#B3E2F5",
          "primary-dark": "#2A7BA6",
          "secondary-light": "#FAD798",
          "secondary-dark": "#BA6E00",
        },
      },
    ],
  },
};
