import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
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
  name: 'Next.js restricted imports',
  rules: {
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        paths: [
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
            '^@/lib(/.*)?',
            '^@/constants(/.*)?',
            '^@/types(/.*)?',
            '^@/styles(/.*)?',
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
  sortImports,
  preferTemplate,
  prettier,
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
