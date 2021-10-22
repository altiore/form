// @ts-ignore
import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {createField} from './field.input';
import Field from './index';

import { maxLength } from '../validators/max-length/max-length';
import { minLength } from '../validators/min-length/min-length';

export default {
	component: Field.Input,
	title: '@altiore/filed.input',
} as ComponentMeta<typeof Field.Input>;

const Component = ({errors, name}) => {
	return (
		<>
			<input name={name} />
			{errors.map((item) => (
				<p key={item}>{item}</p>
			))}
		</>
	);
}

const MyFiled = createField(Component);

const Template: ComponentStory<typeof Field.Input> = () => (
	<form>
		{/* <Field.Boolean name="boolean" />
		<Field.Checkbox name="checkbox" />
		<Field.Input name="input" />
		<Field.Number name="number" />
		<Field.Password name="password" />
		<Field.Phone name="phone" />
		<Field.String name="string" /> */}
		<MyFiled name="my-field" validators={[minLength(5), maxLength(2)]} />
	</form>
);

export const SimplestForm = Template.bind({});
