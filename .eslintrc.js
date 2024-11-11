module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
};
