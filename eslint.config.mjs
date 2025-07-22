import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Import
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      // Accessibility
      "jsx-a11y/anchor-is-valid": "warn",
      // Code style
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    },
  },
];

export default eslintConfig;
