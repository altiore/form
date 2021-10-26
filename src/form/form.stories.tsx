// @ts-ignore
import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from './form';

import {FieldProps, createField} from '../create-field';

export default {
	component: Form,
	title: '@altiore/form',
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = ({children, ...args}) => (
	<Form {...args}>{children}</Form>
);

interface IField extends FieldProps {
	label: string;
}

const Field = createField<IField>(
	({defaultValue, inputRef, errors, label, name}) => {
		return (
			<div>
				<span>{label}</span>
				<span>{name}</span>
				<input ref={inputRef} name={name} defaultValue={defaultValue} />
				<span>{errors[0]}</span>
			</div>
		);
	},
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
