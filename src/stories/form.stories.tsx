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

SimplestForm.parameters = {
	docs: {
		source: {
			code: `
import React, {useCallback} from 'react';

import {Form} from '@altiore/form';

const MyForm = () => {
	const handleSubmit = useCallback((values) => {
		console.log('form.values is', values);
	}, []);

	return (
		<Form onSubmit={handleSubmit}>
			<input name="name" />
			<button type="submit">Submit</button>
		</Form>
	);
}
`,
		},
	},
};

export const FormWithCustomField = Template.bind({});
FormWithCustomField.args = {
	children: (
		<div className="p-3">
			<legend> Форма с настраиваемым полем</legend>
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

FormWithCustomField.parameters = {
	docs: {
		source: {
			code: `
import React, {useCallback} from 'react';

import {createField, Form} from '@altiore/form';

export const Field = createField(({error, inputRef, name, /* you can add any extra fields here: */ label}) => {
	return (
		<div>
			<label htmlFor="input-id">
				{label}
				<input id="input-id" name={name} ref={inputRef} />
			</label>
			<span>{error}</span>
		</div>
	);
});

const MyForm = () => {
	const handleSubmit = useCallback((values) => {
		console.log('form.values is', values);
	}, []);

	return (
		<Form onSubmit={handleSubmit}>
			<Field label="Field Label" name="name" />
			<button type="submit">Submit</button>
		</Form>
	);
}
`,
		},
	},
};
