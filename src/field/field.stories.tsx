// @ts-ignore
import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Field, InputProps} from './field';

export default {
	component: Field,
	title: '@altiore/field',
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;
/**
 * @constant
 * @param _value
 * @type {string | undefined}
 */
const validate = (_value: unknown): string | undefined => {
	console.log('validation value is', _value);
	return undefined;
};
/**
 * @author Pavel Bielik <razvanlomov@gmail.com>
 * @author Alexander Chernykh <dev@whitered932.ru>
 * @param {string} input - field for a data
 * @param {FieldMeta} meta - description of the field information
 * @class  input
 * @returns {string | undefined} input value
 *
 * @example <input>
 */
const Input: React.FC<InputProps> = ({name, meta}) => {
	return (
		<>
			<input name={name} />
			<p>Error: {meta.error}</p>
		</>
	);
};

export const SimplestField = Template.bind({});
SimplestField.args = {
	name: 'test1',
};

export const FieldWithComponent = Template.bind({});
FieldWithComponent.args = {
	component: Input,
	name: 'test1',
};

export const FieldWithValidation = Template.bind({});
FieldWithValidation.args = {
	component: Input,
	name: 'test1',
	validate,
};
