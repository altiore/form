import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {FieldProps, createField} from './create-field';

import {minLength} from '../validators';

interface IField extends FieldProps {
	label: string;
}

const Field = createField<IField>(({inputRef, errors, label, name}) => {
	return (
		<div>
			<span>{label}</span>
			<span>{name}</span>
			<input name={name} ref={inputRef} />
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
		<Field
			defaultValue={'321'}
			validators={[minLength(3)]}
			name="my-field"
			label="My Label"
		/>
	</form>
);

export const SimplestField = Template.bind({});
