import globals from 'globals';
import jsLint from '@eslint/js';
import tsLint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginPrettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...tsLint.configs.strict,
  ...tsLint.configs.stylistic,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(pluginPrettierConfig),
  {
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': fixupPluginRules(reactHooks),
      prettier,
    },
  },
];
