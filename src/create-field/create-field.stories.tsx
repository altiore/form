import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {minLength} from '~/validators/min-length';

import {FieldProps, createField} from './create-field';

interface IField extends FieldProps {
	label: string;
}

const Field = createField<IField>(({errors, inputRef, label, name}) => {
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
		<Field name="my-field" label="My Label" validators={[minLength(3)]} />
	</form>
);

export const SimplestField = Template.bind({});
