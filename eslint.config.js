import js from "@eslint/js";
import globals from "globals";
import pluginNode from "eslint-plugin-n";

export default [
  js.configs.recommended,
  pluginNode.configs["flat/recommended"],

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "n/no-process-exit": "error",
    },

    ignores: ["node_modules/"],
  },
];
