import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {FieldProps, createField} from './create-field';

interface IField extends FieldProps {
	label: string;
}

const Field = createField<IField>(({errors, label, name}) => {
	return (
		<div>
			<span>{label}</span>
			<span>{name}</span>
			<input name={name} />
			<span>{errors[0]}</span>
		</div>
	);
});

export default {
	component: Field,
	title: '@altiore/create-field',
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = () => (
	<form>
		<Field name="my-field" label="My Label" />
	</form>
);

export const SimplestForm = Template.bind({});
