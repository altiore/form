import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {FieldArrayProps, createFieldArray} from './create-field-array';

import {FieldProps, createField} from '../create-field';
import {Form} from '../form';

interface IField extends FieldProps {
	label: string;
}

const Field = createField<IField>(({inputRef, errors, name}) => {
	return (
		<div>
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
			{list.map(({name, remove, append, prepend, index}) => {
				return (
					<div key={name}>
						<div style={{display: 'flex'}}>
							<span>{index}</span>
							<Field label={''} name="ingredient" />
							<button onClick={remove}>-</button>
							<button onClick={append}>after</button>
							<button onClick={prepend}>before</button>
						</div>
					</div>
				);
			})}
			<button onClick={list.add}>Добавить ингредиент</button>
		</div>
	);
});

export default {
	component: IngredientsArray,
	title: '@altiore/create-field-array',
} as ComponentMeta<typeof IngredientsArray>;

const Template: ComponentStory<typeof IngredientsArray> = () => (
	<Form onSubmit={() => 1}>
		<IngredientsArray name="ingredients" />
	</Form>
);

export const SimplestFieldArray = Template.bind({});
