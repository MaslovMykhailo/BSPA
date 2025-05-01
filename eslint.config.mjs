import globals from 'globals'
import pluginJs from '@eslint/js'
import { globalIgnores } from '@eslint/config-helpers'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import * as pluginCss from 'eslint-plugin-css'
import pluginHtml from 'eslint-plugin-html'

/** @type {import('eslint').Linter.Config[]} */
export default [
  globalIgnores(['dist/*', 'assets/*']),
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { globals: globals.node } },
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
