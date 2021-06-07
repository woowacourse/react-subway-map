module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "react-app",
    "react-app/jest",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jsx-a11y", "import", "react-hooks"],
  overrides: [
    {
      files: "**/*.jsx",
      rules: {
        "jsx-a11y/label-has-associated-control": [
          "error",
          {
            labelComponents: [],
            controlComponents: ["Input"],
            assert: "either",
            depth: 3,
          },
        ],
      },
    },
    {
      files: ["**/hooks.js"],
      rules: {
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["**/slice.js"],
      rules: {
        "no-param-reassign": "off",
      },
    },
    {
      files: ["**/test.{js,jsx}"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
  ],
  ignorePatterns: ["node_modules", "build"],
};
