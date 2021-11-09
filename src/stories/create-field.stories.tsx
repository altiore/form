import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';
import {FieldBoolean, FieldNumber} from './field-typed';

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
	</Form>
);

type T2 = {
	string: string;
	number: number;
	boolean: boolean;
};

export const InsideFormTypedField: ComponentStory<typeof FieldNumber> = ({
	onSubmit,
}: any) => (
	<Form<T2> onSubmit={onSubmit} defaultValues={{number: 12}}>
		<Field<T2> name="string" label="String" defaultValue={'string'} />
		<FieldNumber<T2> name="number" label="Number" defaultValue={4} />
		<FieldBoolean<T2> name="boolean" label="Boolean" defaultValue={true} />
		<button type="submit">Отправить</button>
	</Form>
);
