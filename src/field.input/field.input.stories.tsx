// @ts-ignore
import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {createField} from './field.input';
import Field from './index';

export default {
	component: Field.Input,
	title: '@altiore/filed.input',
} as ComponentMeta<typeof Field.Input>;

const MyFiled = createField(({error, name}) => {
	return (
		<div>
			<span>{name}</span>
			<input name={name} />
			<span>{error}</span>
		</div>
	);
});

const Template: ComponentStory<typeof Field.Input> = () => (
	<form>
		<Field.Boolean name="boolean" />
		<Field.Checkbox name="checkbox" />
		<Field.Input name="input" />
		<Field.Number name="number" />
		<Field.Password name="password" />
		<Field.Phone name="phone" />
		<Field.String name="string" />
		<MyFiled name="my-field" />
	</form>
);

export const SimplestForm = Template.bind({});
