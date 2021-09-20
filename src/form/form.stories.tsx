import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Field} from '../field/field';
import {Form} from './form';

export default {
	component: Form,
	title: '@altiore/form',
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const SimplestForm = Template.bind({});

const validate = (value: any) => {
	return value
}

// Тестовый компонент 
const Input = (name, ref) => (
	<textarea name={name} ref={ref} />
)

SimplestForm.args = {
	children: (
		<>
			<Field name="test" />
			<Field name="test" validate={validate} />
			<Field name="test" component={Input} validate={validate} />
		</>
	),
};
