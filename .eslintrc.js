const path = require('path');
// const {
//   // readFileSync,
//   readdirSync,
//   lstatSync,
// } = require('fs');

// const schemaString = readFileSync(`${__dirname}/packages/subgraph/schema.graphql`, "utf8");

/*
 * Support Monorepo
 * TODO: Update eslint-plugin-import version once released: https://github.com/benmosher/eslint-plugin-import/pull/1696
 * WORKAROUND: https://github.com/benmosher/eslint-plugin-import/issues/1174
 */

// const PACKAGE_DIR = 'packages/'; // this could be replaced utilizing the globs in package.json's "workpackges" or from the lerna.json config

// // get files in packages
// const noExtraneousOverrides = readdirSync(resolve(__dirname, PACKAGE_DIR))
// 	// filter for non-hidden dirs to get a list of packages
// 	.filter(
// 		entry =>
// 			entry.substr(0, 1) !== '.' && lstatSync(resolve(__dirname, PACKAGE_DIR, entry)).isDirectory(),
// 	)
// 	// map to override rules pointing to local and root package.json for rule
// 	.map(entry => ({
// 		files: [`${PACKAGE_DIR}${entry}/**`],
// 		rules: {
// 			'import/no-extraneous-dependencies': [
// 				'error',
// 				{
// 					packageDir: [
//             __dirname,
//             resolve(__dirname, PACKAGE_DIR, entry),
//           ],
// 				},
// 			],
// 		},
// 	}));

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:workspaces/recommended',
    'eslint:recommended',
    // "plugin:react/recommended",
    'airbnb',
    'airbnb/hooks',
    // "plugin:import/typescript",
    // "plugin:@typescript-eslint/recommended",
    'prettier',
    // "prettier/@typescript-eslint",
    'prettier/react',
  ],
  plugins: [
    'jest',
    // "@typescript-eslint",
    'react-hooks',
    'react',
    'graphql',
    'simple-import-sort',
    'import',
    'prettier',
    'workspaces',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        // "airbnb-typescript",
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
      ],
      plugins: ['@typescript-eslint'],
      // parserOptions: {
      //   project: './tsconfig.json',
      // },
      rules: {
        // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
        // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-const-assign': 'off',
        'no-dupe-args': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-new-symbol': 'off',
        'no-obj-calls': 'off',
        'no-redeclare': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'valid-typeof': 'off',
        'import/named': 'off',
        'import/no-unresolved': 'off',

        /*
         * Support Typescript for airbnb-eslint-rules
         */

        // Prevent missing props validation in a React component definition
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': 'off',

        // disallow declaration of variables that are not used in the code
        // 'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
        // note you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],

        // only .jsx files may have JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.jsx', '.tsx'] },
        ],
      },
    },
    {
      files: ['@app/e2e/cypress/**'],
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
    },
    // ...noExtraneousOverrides,
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // use a glob pattern
        project: 'packages/*/tsconfig.json',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // "@typescript-eslint/no-unused-vars": [
    //   "error",
    //   {
    //     argsIgnorePattern: "^_",
    //     varsIgnorePattern: "^_",
    //     args: "after-used",
    //     ignoreRestSiblings: true,
    //   },
    // ],
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
      },
    ],
    // "no-console": 0,
    'no-confusing-arrow': 0,
    'no-else-return': 0,
    'no-return-assign': [2, 'except-parens'],
    // "no-underscore-dangle": 0,
    'jest/no-focused-tests': 2,
    'jest/no-identical-title': 2,
    camelcase: 0,
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
      },
    ],
    'class-methods-use-this': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    // "react/prop-types": 0,
    // "react/no-multi-comp": 0,
    // "react/jsx-filename-extension": 0,
    // "react/no-unescaped-entities": 0,

    // "import/no-extraneous-dependencies": 0,

    // "graphql/template-strings": [
    //   "error",
    //   {
    //     env: "literal",
    //     schemaString,
    //     validators: [
    //       "ExecutableDefinitions",
    //       "FieldsOnCorrectType",
    //       "FragmentsOnCompositeTypes",
    //       "KnownArgumentNames",
    //       "KnownDirectives", // disabled by default in relay
    //       // "KnownFragmentNames", // disabled by default in all envs
    //       "KnownTypeNames",
    //       "LoneAnonymousOperation",
    //       "NoFragmentCycles",
    //       "NoUndefinedVariables", //disabled by default in relay
    //       // "NoUnusedFragmentsRule" // disabled by default in all envs
    //       // "NoUnusedVariablesRule" throws even when fragments use the variable
    //       "OverlappingFieldsCanBeMerged",
    //       "PossibleFragmentSpreads",
    //       "ProvidedRequiredArguments", // disabled by default in relay
    //       "ScalarLeafs", // disabled by default in relay
    //       "SingleFieldSubscriptions",
    //       "UniqueArgumentNames",
    //       "UniqueDirectivesPerLocation",
    //       "UniqueFragmentNames",
    //       "UniqueInputFieldNames",
    //       "UniqueOperationNames",
    //       "UniqueVariableNames",
    //       "ValuesOfCorrectType",
    //       "VariablesAreInputTypes",
    //       // "VariablesDefaultValueAllowed",
    //       "VariablesInAllowedPosition",
    //     ],
    //   },
    // ],
    // "graphql/named-operations": [
    //   "error",
    //   {
    //     schemaString,
    //   },
    // ],
    // "graphql/required-fields": [
    //   "error",
    //   {
    //     env: "literal",
    //     schemaString,
    //     requiredFields: ["nodeId", "id"],
    //   },
    // ],
    // "react/destructuring-assignment": 0,

    // "arrow-body-style": 0,
    // "no-nested-ternary": 0,

    /*
     * simple-import-sort seems to be the most stable import sorting currently,
     * disable others
     * See https://github.com/lydell/eslint-plugin-simple-import-sort/blob/1280c2ed6e3c0c76dad55d5fbec685fa18f299d1/examples/.eslintrc.js#L74-L92
     */
    'simple-import-sort/imports': [
      'warn',
      {
        // See: https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',

    'import/no-deprecated': 'warn',
    'import/no-duplicates': 'error',

    /*
     * Optimize linting performance
     */

    // Forbid cyclical dependencies between modules
    // https://github.com/benmosher/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
    'import/no-cycle': ['error', { maxDepth: 2 }],

    /*
     * Enable/Disable irritating import rules
     */

    // Require modules with a single export to use a default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    /*
     * Disable irritating jsx-a11y rules
     */

    // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
    'jsx-a11y/click-events-have-key-events': 'off',

    // Enforce that DOM elements without semantic behavior not have interaction handlers
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': [
      'warn',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],

    // A non-interactive element does not support event handlers (mouse and key handlers)
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
    'jsx-a11y/no-noninteractive-element-interactions': [
      'warn',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],

    /*
     * Disable irritating React rules
     */

    // Enforce consistent usage of destructuring assignment of props, state, and context
    // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': ['warn', 'always'],

    // Validate JSX has key prop when in array or iterator
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    'react/jsx-key': 'warn',

    // Disallow JSX props spreading
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'ignore',
        explicitSpread: 'ignore', // See: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md#explicitspread
        exceptions: [],
      },
    ],

    // Prevent usage of Array index in keys
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    'react/no-array-index-key': 'warn',

    // Require stateless functions when not using lifecycle methods, setState or ref
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],

    // Prevent missing props validation in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    'react/prop-types': [
      'warn',
      {
        ignore: [],
        customValidators: [],
        skipUndeclared: false,
      },
    ],

    /*
     * Disable irritating code-styling rules
     */

    // require function expressions to have a name
    // https://eslint.org/docs/rules/func-names
    'func-names': ['warn', 'as-needed'],

    // require parens in arrow function arguments
    // https://eslint.org/docs/rules/arrow-parens
    // 'arrow-parens': ['error', 'always'],

    // Prefer destructuring from arrays and objects
    // https://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': [
      'error',
      150,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': 'off',

    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': 'off',

    // disallow nested ternary expressions
    'no-nested-ternary': 'warn',

    // disallow use of console
    'no-console': 'off',

    // require return statements to either always or never specify values
    // 'consistent-return': ['warn', { treatUndefinedAsUnspecified: true }],
    'consistent-return': 'off',

    // enforce line breaks between braces
    // https://eslint.org/docs/rules/object-curly-newline
    // 'object-curly-newline': ['error', {
    //   ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
    //   ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
    //   ImportDeclaration: { minProperties: 8, multiline: true, consistent: true },
    //   ExportDeclaration: { minProperties: 8, multiline: true, consistent: true },
    // }],

    // Requires operator at the beginning of the line in multiline statements
    // https://eslint.org/docs/rules/operator-linebreak
    // 'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],

    /*
     * Support Typescript for airbnb-eslint-rules
     */

    // disallow use of variables before they are defined
    // 'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: true },
    ],

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
