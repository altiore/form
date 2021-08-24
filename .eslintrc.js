module.exports = {
	env: {
		jest: true,
		node: true,
	},
	extends: [
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			extends: ['prettier', 'plugin:prettier/recommended'],
			files: ['*.js', '*.jsx'],
			parser: '@babel/eslint-parser',
			parserOptions: {
				requireConfigFile: false,
			},
			plugins: ['prettier'],
			rules: {
				'prettier/prettier': 0,
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'ordered-imports', 'prettier'],
	root: true,
	rules: {
		'ordered-imports/ordered-imports': [
			'warn',
			{
				'group-ordering': [
					{match: '^react', name: 'react', order: 10},
					{match: '^@storybook', name: '@storybook', order: 20},
					{match: '^\\./', name: 'current directory', order: 80},
					{match: '.*', name: 'new unknown', order: 90},
				],
			},
		],
		'prettier/prettier': 0,
		'sort-keys': [1, 'asc'],
	},
};
