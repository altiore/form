import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Field, InputProps} from './field';

export default {
	component: Field,
	title: '@altiore/field',
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

const validate = (_value: unknown): string | undefined => {
	console.log('validation value is', _value);
	return undefined;
};

const Input: React.FC<InputProps> = ({name, meta}) => {
	return (
		<div>
			<input name={name} />
			<p>Error: {meta.error}</p>
		</div>
	);
};

export const SimplestField = Template.bind({});
SimplestField.args = {
	name: 'test1',
};

export const FieldWithComponent = Template.bind({});
FieldWithComponent.args = {
	component: Input,
	name: 'test2',
};

export const FieldWithValidation = Template.bind({});
FieldWithValidation.args = {
	component: Input,
	name: 'test3',
	validate,
};
