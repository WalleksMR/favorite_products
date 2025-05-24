import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
    },

    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
        },

        "import/ignore": [
            "@eslint/compat",
            "eslint-plugin-prettier",
            "class-validator",
            "rxjs",
            "class-transformer",
        ],
    },

    rules: {
        "import/namespace": "off",
        "no-useless-escape": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "import/no-unresolved": "warn",
        "import/no-named-as-default-member": "off",

        "import/order": ["warn", {
            groups: [
                "builtin",
                "external",
                "internal",
                ["sibling", "parent"],
                "index",
                "unknown",
            ],

            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}];