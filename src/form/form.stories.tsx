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

// ???
const validate = (value: any) => {
	return value === undefined ? {error: '', valid: true} : {error: 'текст ошибки', valid: false}
}

export interface InputProps {
	name: string;
}

// Тестовый компонент 
// ??? meta
const Input:React.FC<InputProps> = ({name, meta}) => {
	return (
		<input name={name} />
	)
}

SimplestForm.args = {
	children: (
		<>
			<Field name="test1" />
			<Field name="test2" component={Input} />
			<Field name="test3" component={Input} validate={validate}/>
		</>
	),
};
