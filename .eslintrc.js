module.exports = {
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
