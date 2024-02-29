const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["next", "eslint:recommended", "prettier", "eslint-config-turbo"],
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],

  rules: {
    "turbo/no-undeclared-env-vars": "off",
    "no-unused-vars": "off",
    "no-redeclare": "off",
  },
};
