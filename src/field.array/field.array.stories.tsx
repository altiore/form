// @ts-ignore
import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {createFieldArray, FieldArrayProps} from './field.array';

export default {
	component: FieldArray,
	title: '@altiore/field.array',
} as ComponentMeta<typeof FieldArray>;

const Template: ComponentStory<typeof FieldArray> = (args) => <MyFieldArray {...args} />;

const MyField = ({name}) => {
	return <input />
}

const Field = {
	Ingredients: createFieldArray(({ name, list }) => {
		return list.map(() => (
			<div>
				<MyField name="ingredient" />
				<MyField name="amount" />
				<MyField name="unit" />
			</div>
		));
	}),
}


const MyFieldArray: React.FC<FieldArrayProps> = () => {
	return (
		<>
			<Field.Ingredients name="ingredients" />
		</>
	);
};

export const SimplestFieldArray = Template.bind({});
SimplestFieldArray.args = {
	name: 'test1',
};
