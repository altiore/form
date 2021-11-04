import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';
import FieldNumber from './field-number';

import * as Joi from 'joi';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: Field,
	title: '@altiore/create-field',
} as ComponentMeta<typeof Field>;

export const SimplestField: ComponentStory<typeof Field> = () => (
	<form>
		<Field
			name="first"
			defaultValue="Default"
			label="First"
			validators={[minLength(3)]}
		/>
		<Field
			name="second"
			label="Second"
			defaultValue=""
			validators={[minLength(3)]}
		/>
	</form>
);

type T = {
	first: string;
	second: string;
};

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => (
	<Form<T> onSubmit={onSubmit} defaultValues={{first: 'NOT DEFAULT'}}>
		<Field<T>
			name="first"
			label="First"
			defaultValue={'DEFAULT'}
			validators={[
				Joi.string().max(5).min(2).messages({
					'string.min': 'Слишком коротко',
				}),
			]}
		/>
		<Field<T>
			name="second"
			label="Second"
			defaultValue={'test'}
			validators={[minLength(3)]}
		/>
		<button type="submit">Submit</button>
	</Form>
);

export const FieldNumberExample: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => (
	<Form onSubmit={onSubmit} defaultValues={{first: 'NOT DEFAULT'}}>
		<Field name="string" label="String" defaultValue={'string'} />
		<FieldNumber name="number" label="Number" defaultValue={11} />
		<button type="submit">Submit</button>
	</Form>
);
