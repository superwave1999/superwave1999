// eslint.config.mjs

import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import withNuxt from "./.nuxt/eslint.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default withNuxt([
  {
    rules: {
      "vue/html-self-closing": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.vue", "**/*.js", "**/*.mjs"],
  },
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["nuxt.config.ts"],
  },
]);
