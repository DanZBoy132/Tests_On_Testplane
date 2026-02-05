const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
    {
        ignores: ["node_modules/**", "build/**", "eslint.config.js"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: { js },
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: globals.node,
        },
    },
    tseslint.configs.recommended,
]);
