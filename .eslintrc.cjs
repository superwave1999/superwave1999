module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {},
  overrides: [
    {
      files: ["*.js", "*.vue", "*.ts"],
      rules: {
        "vue/no-v-html": ["off"],
        "import/no-named-as-default-member": ["off"],
        "import/default": ["off"],
      },
    },
  ],
};
