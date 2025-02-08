import globals from 'globals';
import jsLint from '@eslint/js';
import tsLint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import reactPlugin from 'eslint-plugin-react';
import pluginPrettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules/**/*', 'coverage/**/*', 'dist/**/*'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...tsLint.configs.strict,
  ...tsLint.configs.stylistic,
  ...fixupConfigRules(reactPlugin.configs.flat['jsx-runtime']),
  ...fixupConfigRules(pluginPrettierConfig),
  {
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': fixupPluginRules(reactHooks),
      prettier,
    },
  },
  { settings: { react: { version: 'detect' } } },
];
