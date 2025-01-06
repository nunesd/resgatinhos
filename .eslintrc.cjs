module.exports = {
  root: true,
  env: { browser: true, node: true, jest: true, es2021: true },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'server.js', 'build'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
