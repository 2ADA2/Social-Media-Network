import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'comma-dangle': ['error', 'always-multiline'],
            semi: ['error', 'always'],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            'space-before-blocks': 'error',
            'keyword-spacing': ['error', { before: true, after: true }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'computed-property-spacing': ['error', 'never'],
            'no-console': 'warn',
            'no-debugger': 'error',
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unused-vars': 'warn',
            'no-duplicate-imports': 'error',
            'spaced-comment': ['error', 'always', { markers: ['/'] }],
        },
    },
]);