import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';

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

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => (
	<Form onSubmit={onSubmit} defaultValues={{first: 'NOT DEFAULT'}}>
		<Field
			name="first"
			label="First"
			defaultValue={'DEFAULT'}
			validators={[
				Joi.string().max(5).min(2).messages({
					'string.min': 'Слишком коротко',
				}),
			]}
		/>
		<Field
			name="second"
			label="Second"
			defaultValue={'test'}
			validators={[minLength(3)]}
		/>
	</Form>
);
