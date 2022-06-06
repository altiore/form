import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import Field from '~/stories/field';

export default {
	component: Form,
	title: '@altiore/form',
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = ({children, ...args}) => (
	<Form {...args}>{children}</Form>
);

export const SimplestForm = Template.bind({});
SimplestForm.args = {
	children: (
		<div className="p-3 ">
			<legend>Простейшая форма</legend>
			<div className="mb-3">
				<input className="form-control mb-3 w-75" name="name" />
				<button className="btn btn-success btn-sm " type="submit">
					Отправить
				</button>
			</div>
		</div>
	),
	className: 'shadow border border-secondary rounded-3 w-75',
	defaultValues: {
		field: 'initial field',
	},
};

export const FormWithCustomField = Template.bind({});
FormWithCustomField.args = {
	children: (
		<div className="p-3">
			<legend>Форма с настраиваемым полем</legend>
			<div className="mb-3">
				<Field label="Ярлык поля" name="name" />
				<button className="btn btn-success btn-sm" type="submit">
					Отправить
				</button>
			</div>
		</div>
	),
	className: 'shadow border border-secondary rounded-3 w-75 ',
	defaultValues: {
		field: 'initial field',
	},
};
