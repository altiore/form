import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {ValidateFuncType} from '~/@common/types';
import {getInput} from '~/create-field/named-field/validated-field/hooks/use-input';
import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';
import {FieldNumber} from './field-typed';

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
	password: string;
	passwordConfirm: string;
};

const equalValidator = (name: string): ValidateFuncType => ({
	validate: (value: string | any[] = '', formState) => {
		// мы не можем использовать хуки вне компонента :/
		const inputRef = getInput(name, formState);

		if (inputRef.value !== value) {
			return {
				error: new Error('Пароли не совпадают'),
				value: value,
			};
		}
		return undefined;
	},
});

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => (
	<div>
		<input type="text" name={'gg'} />
		<Form<T> onSubmit={onSubmit} defaultValues={{password: 'NOT DEFAULT'}}>
			<Field<T>
				name="password"
				label="p1: "
				validators={[
					Joi.string().max(5).min(2).messages({
						'string.min': 'Слишком коротко',
					}),
				]}
			/>
			<Field<T>
				name="passwordConfirm"
				label="p2: "
				validators={[equalValidator('password')]}
			/>
		</Form>
	</div>
);

type T2 = {
	string: string;
	number: number;
};

export const InsideFormTypedField: ComponentStory<typeof FieldNumber> = ({
	onSubmit,
}: any) => (
	<Form<T2> onSubmit={onSubmit} defaultValues={{number: 12}}>
		<Field<T2> name="string" label="String" defaultValue={'string'} />
		<FieldNumber<T2> name="number" label="Number" defaultValue={4} />
		<button type="submit">Отправить</button>
	</Form>
);
