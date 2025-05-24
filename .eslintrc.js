// eslint-disable-next-line no-undef
module.exports = {
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignores: ['./src/main/config/*.ts'],
  rules: {
    'import/namespace': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    'import/ignore': ['@eslint/compat', 'eslint-plugin-prettier', 'class-validator', 'rxjs', 'class-transformer'],
  },
};
