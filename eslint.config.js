const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
    {
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.browser, ...globals.node },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            react: reactPlugin,
        },
        rules: {
            'prefer-const': 'error',
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
        },
        ignores: ['**/.*', '**/*.config.*'],
    },
];
