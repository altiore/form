import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {FieldArrayProps, createFieldArray} from './create-field-array';

import {FieldProps, createField} from '../create-field';
import {Form} from '../form';

interface IField extends FieldProps {
	label: string;
}

const Field = createField<IField>(({inputRef, errors, label, name}) => {
	return (
		<div>
			<span>{label}</span>
			<span>{name}</span>
			<input ref={inputRef} name={name} />
			<span>{errors[0]}</span>
		</div>
	);
});

interface IFieldArray extends FieldArrayProps {
	label?: string;
}

const IngredientsArray = createFieldArray<IFieldArray>(({list}) => {
	return (
		<div>
			{list.map(({name, remove}) => (
				<div key={name}>
					<Field label="Ingredient" name="ingredient" />
					<Field label="Amount" name="amount" />
					<Field label="Unit" name="unit" />
					<button onClick={remove}>Удалить ингредиент</button>
				</div>
			))}
			<button onClick={list.add}>Добавить ингредиент</button>
		</div>
	);
});

export default {
	component: IngredientsArray,
	title: '@altiore/create-field-array',
} as ComponentMeta<typeof IngredientsArray>;

const Template: ComponentStory<typeof IngredientsArray> = (_args) => (
	<Form onSubmit={console.log}>
		<IngredientsArray name="ingredients" />
	</Form>
);

export const SimplestFieldArray = Template.bind({});
