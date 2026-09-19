import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import tailwindcss from 'eslint-plugin-better-tailwindcss';
import checkFilePlugin from 'eslint-plugin-check-file';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const checkFile = defineConfig({
  name: 'Check file',
  plugins: { 'check-file': checkFilePlugin },
  rules: {
    'check-file/filename-naming-convention': [
      'warn',
      { '**/*.{ts,tsx}': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
    'check-file/folder-naming-convention': [
      'warn',
      {
        'src/app/**/': 'NEXT_JS_APP_ROUTER_CASE',
        'src/!(app)/**/': 'KEBAB_CASE',
      },
    ],
  },
});

const preferArrow = defineConfig({
  name: 'Prefer arrow functions',
  plugins: { 'prefer-arrow-functions': preferArrowFunctions },
  rules: {
    'prefer-arrow-callback': 'warn',
    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        allowNamedFunctions: false,
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'implicit',
        singleReturnOnly: false,
      },
    ],
  },
});

const preferTemplate = defineConfig({
  name: 'Prefer template',
  rules: { 'prefer-template': 'warn' },
});

const restrictedImports = defineConfig({
  name: 'Restricted imports',
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['*'],
            message:
              "Use named imports for React (e.g. import { useState } from 'react').",
          },
          {
            name: 'next/router',
            message: "Import from 'next/navigation' instead.",
          },
        ],
        patterns: [
          {
            group: ['lucide-react'],
            importNamePattern: '^(Lucide.*|(?:(?!.*Icon$).+))$',
            message:
              "Only import icons that end with 'Icon' and don't start with 'Lucide'.",
            allowTypeImports: true,
          },
        ],
      },
    ],
  },
});

const restrictedSyntax = defineConfig({
  name: 'Restricted React namespace',
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "TSQualifiedName[left.name='React']",
        message: "Import React types directly from 'react' instead.",
      },
      {
        selector: 'ExportNamedDeclaration[declaration=null][source=null]',
        message: 'Export declarations directly instead of using export lists.',
      },
      {
        selector:
          'ArrowFunctionExpression > ObjectPattern.params:first-child:has(> RestElement):not(:has(> Property))',
        message:
          'Use props as a param instead of destructuring only rest props.',
      },
    ],
  },
});

const sortImports = defineConfig({
  name: 'Sort imports',
  plugins: { 'simple-import-sort': simpleImportSort },
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^next', '^next/.*', '^@?\\w'],
          [
            '^@/components/ui/.*',
            '^@/components/(?!ui).*',
            '^@/hooks(/.*)?',
            '^@/contexts(/.*)?',
            '^@/actions(/.*)?',
            '^@/queries(/.*)?',
            '^@/store(/.*)?',
            '^@/lib(/.*)?',
            '^@/constants(/.*)?',
            '^@/types(/.*)?',
            '^@/styles(/.*)?',
            '^@/(.*)?',
          ],
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
          ],
        ],
      },
    ],
  },
});

const tailwind = defineConfig([
  tailwindcss.configs.recommended,
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/index.css',
        messageStyle: 'compact',
      },
    },
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variant-order': 'warn',
      'better-tailwindcss/enforce-logical-properties': [
        'warn',
        {
          ignore: [
            /** Physical dimensions */
            '^(?:.*:)?-?(?:min-|max-)?(?:w|h|size)-',
            /** Block-axis properties (top/bottom) */
            '^(?:.*:)?-?(?:(?:scroll-)?[pm][tb]-|(?:top|bottom)-|border-[tb](?:-|$))',
          ],
        },
      ],
    },
  },
]);

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    name: 'Project globals',
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    // TODO: Remove when eslint-plugin-react supports ESLint 10
    settings: { react: { version: '19.2' } },
  },
  checkFile,
  preferArrow,
  restrictedImports,
  restrictedSyntax,
  sortImports,
  preferTemplate,
  prettier,
  tailwind,
  {
    name: 'Project overrides',
    rules: { 'jsx-a11y/media-has-caption': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/generated/prisma/**',
  ]),
]);
