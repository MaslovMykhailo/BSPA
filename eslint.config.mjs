import globals from 'globals'
import pluginJs from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import * as pluginCss from 'eslint-plugin-css'
import pluginHtml from 'eslint-plugin-html'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettierRecommended,
  pluginCss.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      'no-console': 'warn',
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    plugins: { html: pluginHtml },
  },
]
