// /** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
//   theme: {
//     extend: {},
//   },
//   plugins: [flowbite.plugin()],
// };

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const tailwindScrollbar = require("tailwind-scrollbar"); // ✅ Import the plugin

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    tailwindScrollbar, // ✅ Add the scrollbar plugin
  ],
};
