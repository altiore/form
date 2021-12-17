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
	<FieldArray name="ingredients" />
);

export const InsideFormFieldArraySimplest: ComponentStory<typeof FieldArray> =
	({onSubmit}: any) => (
		<div>
			<Form onSubmit={onSubmit}>
				<Field label="Title" name="title" />
				<FieldArraySimplest name="ingredients" />
				<button type="submit">submit</button>
			</Form>
		</div>
	);

export const InsideFormFieldArrayWithValidators: ComponentStory<
	typeof FieldArray
> = ({onSubmit}: any) => (
	<Form onSubmit={onSubmit}>
		<Field label="Title" name="title" />
		<FieldArray name="ingredients" validators={[minLength(null, 2)]} />
		<button type="submit">Submit</button>
	</Form>
);

export const InsideFormFieldArrayWithAddingDefValue: ComponentStory<
	typeof FieldArray
> = ({onSubmit}: any) => (
	<Form onSubmit={onSubmit}>
		<Field label="Title" name="title" />
		<FieldArrayWithAddingDefValue name="ingredients" />
		<button type="submit">Submit</button>
	</Form>
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
		<Form onSubmit={handleSubmit}>
			<Field label="Title" name="title" />
			<FieldArray name="ingredients" />
			<button type="submit">Submit</button>
		</Form>
	);
};
