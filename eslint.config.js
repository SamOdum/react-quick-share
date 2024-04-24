const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const globals = require('globals');
const reactPlugin = require('react');

module.exports = {
    languageOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
        typescript: typescriptPlugin,
        react: reactPlugin,
    },
    rules: {
        'prefer-const': 'error',
        'react/prop-types': 'off',
        '@typescript/no-unused-vars': 'error',
        '@typescript/no-explicit-any': 'error',
    },
    ignores: ['**/.*', '**/*.config.*'],
};
