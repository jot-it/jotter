/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cva"],
  plugins: ["prettier-plugin-tailwindcss"],
};
