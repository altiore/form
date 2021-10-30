import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: Field,
	title: '@altiore/create-field',
} as ComponentMeta<typeof Field>;

export const SimplestField: ComponentStory<typeof Field> = () => (
	<form>
		<Field name="first" label="First" validators={[minLength(3)]} />
		<Field name="second" label="Second" validators={[minLength(3)]} />
	</form>
);

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => (
	<Form onSubmit={onSubmit}>
		<Field name="first" label="First" validators={[minLength(3)]} />
		<Field name="second" label="Second" validators={[minLength(3)]} />
	</Form>
);
