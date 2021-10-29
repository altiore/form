import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Field} from '~/create-field/field';

import {Form} from './form';

export default {
	component: Form,
	title: '@altiore/form',
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = ({children, ...args}) => (
	<Form {...args}>{children}</Form>
);

export const SimplestForm = Template.bind({});
SimplestForm.args = {
	children: (
		<>
			<input name="test" />
			<Field name="field" label="Custom Field" />
			<button type="submit">Submit</button>
		</>
	),
	defaultValues: {
		field: 'initial field',
	},
};
