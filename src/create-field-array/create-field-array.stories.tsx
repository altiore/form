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
			<Field defaultValue={'Title'} label="Title" name="title" />
			{list.map(({name, remove, append, prepend}) => {
				return (
					<div key={name}>
						<div style={{display: 'flex'}}>
							<Field
								label={''}
								name="ingredient"
								defaultValue={'мой ингредиент'}
							/>
							<button onClick={remove} type="button">
								-
							</button>
							<button onClick={append} type="button">
								after
							</button>
							<button onClick={prepend} type="button">
								before
							</button>
						</div>
					</div>
				);
			})}
			<button onClick={list.add} type="button">
				Добавить ингредиент
			</button>
			<button type="submit">Submit</button>
		</div>
	);
});

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: IngredientsArray,
	title: '@altiore/create-field-array',
} as ComponentMeta<typeof IngredientsArray>;

const Template: ComponentStory<typeof IngredientsArray> = ({onSubmit}: any) => (
	<Form onSubmit={onSubmit}>
		<IngredientsArray name="ingredients" />
	</Form>
);

export const SimplestFieldArray = Template.bind({});
