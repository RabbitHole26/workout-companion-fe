import plugin from "tailwindcss/plugin"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-black": "rgb(18,18,18)"
      },
      height: {
        "custom-max-desktop-mobile-lg": "calc(100vh - 80px)",
        "custom-max-mobile": "calc(100vh - 64px - 72px)"
      }
    },
  },
  plugins: [
    require("daisyui"),
    plugin(({ addVariant }) => {
      addVariant("has-hover", "@media (hover: hover) and (pointer: fine)")
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "base-100": "rgb(240,240,240)",
          // primary: "rgb(74,222,128)"
        },
        // dark: {
        //   ...require("daisyui/src/theming/themes")["dark"],
        // }
      },
      "dark"
    ],
  },
}
