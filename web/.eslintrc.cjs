module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // This project uses plain JavaScript without runtime PropTypes declarations.
    // Keep correctness and hooks checks enabled independently of that convention.
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['src/pages/homepage/previewSlider/ScrollCameraModel.jsx'],
      rules: { 'react/no-unknown-property': 'off' }, // React Three Fiber JSX, not DOM elements.
    },
    {
      files: ['src/context/AuthContext.jsx'],
      rules: { 'react-refresh/only-export-components': 'off' }, // Provider and its paired hook.
    },
    { files: ['tests/**/*.js'], env: { node: true } },
  ],
}
