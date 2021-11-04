import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import Field from '~/stories/field';

import {Form} from '../form/form';

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
		<>
			<input name="name" />
			<button type="submit">Submit</button>
		</>
	),
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
		<>
			<Field label="Field Label" name="name" />
			<button type="submit">Submit</button>
		</>
	),
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

export const Field = createField(({errors, inputRef, name, /* you can add any extra fields here: */ label}) => {
	return (
		<div>
			<label htmlFor="input-id">
				{label}
				<input id="input-id" name={name} ref={inputRef} />
			</label>
			<span>{errors[0]}</span>
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
