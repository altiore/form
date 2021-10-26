// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	webpackFinal: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'~': path.resolve(__dirname, '../src'),
		};
		return config;
	},
};
