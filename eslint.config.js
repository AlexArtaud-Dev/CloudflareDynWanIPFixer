import js from "@eslint/js";
import plugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
    // Include eslint:recommended equivalent
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        ignores: ["node_modules", "dist", "tests"],
        languageOptions: {
            parser: parser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
                ecmaVersion: "latest"
            },
        },
        plugins: {
            "@typescript-eslint": plugin
        },
        // Merge in the rules from the @typescript-eslint recommended config
        // by spreading them into our rules object.
        rules: {
            ...plugin.configs.recommended.rules,
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error"],
            "@typescript-eslint/consistent-type-imports": "error",
            "no-undef": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/explicit-function-return-type": "off"
        }
    }
];
