import React, {useCallback} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import Field from '~/stories/field';
import {minLength} from '~/validators';

import FieldArray, {
	FieldArraySimplest,
	FieldArrayWithAddingDefValue,
} from './field-array';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: FieldArray,
	title: '@altiore/create-field-array',
} as ComponentMeta<typeof FieldArray>;

export const SimplestFieldArray: ComponentStory<typeof FieldArray> = () => (
	<>
		<legend>Массив полей</legend>
		<FieldArray name="ingredients" />
	</>
);

export const InsideFormFieldArraySimplest: ComponentStory<typeof FieldArray> =
	({onSubmit}: any) => (
		<>
			<legend>Простейший массив полей внутри формы</legend>
			<Form
				className="shadow border border-secondary rounded-3 p-3 w-75"
				onSubmit={onSubmit}>
				<Field label="Название" name="title" />
				<FieldArraySimplest name="ingredients" />
				<div className="mt-3">
					<button className="btn btn-success" type="submit">
						Отправить
					</button>
				</div>
			</Form>
		</>
	);

export const InsideFormFieldArrayWithValidators: ComponentStory<
	typeof FieldArray
> = ({onSubmit}: any) => (
	<>
		<legend>Массив полей внутри формы с валидаторами</legend>
		<Form
			className="shadow border border-secondary rounded-3 p-3 w-75"
			onSubmit={onSubmit}>
			<Field label="Название" name="title" />
			<FieldArray name="ingredients" validators={[minLength(null, 2)]} />
			<button className="btn btn-success mt-3" type="submit">
				Отправить
			</button>
		</Form>
	</>
);

export const InsideFormFieldArrayWithAddingDefValue: ComponentStory<
	typeof FieldArray
> = ({onSubmit}: any) => (
	<>
		<legend>Массив полей внутри формы со значениями по умолчанию</legend>
		<Form
			className="shadow border border-secondary rounded-3 p-3 w-75"
			onSubmit={onSubmit}>
			<Field label="Название" name="title" />
			<FieldArrayWithAddingDefValue name="ingredients" />
			<button className="btn btn-success " type="submit">
				Отправить
			</button>
		</Form>
	</>
);

export const InsideFormFieldArrayWithSettingErrors: ComponentStory<
	typeof FieldArray
> = ({onSubmit}: any) => {
	const handleSubmit = useCallback((values, setErrors) => {
		onSubmit(values);
		setErrors({
			ingredients: {
				'0': {
					ingredient: ['Ingredient error'],
				},
			},
		});
	}, []);
	return (
		<>
			<legend>Массив полей внутри формы с настройкой ошибок</legend>
			<Form
				className="shadow border border-secondary rounded-3 p-3 w-75"
				onSubmit={handleSubmit}>
				<Field label="Название" name="title" />
				<FieldArray name="ingredients" />
				<button className="btn btn-success mt-3" type="submit">
					Отправить
				</button>
			</Form>
		</>
	);
};
