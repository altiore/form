import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import Submit from '~/stories/submit-button';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: Submit,
	title: '@altiore/create-submit-button',
} as ComponentMeta<typeof Submit>;

const submitFunc = (onSubmit: any) => async (values: any) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			onSubmit(values);
			resolve(values);
		}, 1000);
	});
};

const Template: ComponentStory<typeof Submit> = (args) => (
	<div className="shadow border border-secondary rounded-3 w-75">
		<Form className="p-4" onSubmit={submitFunc((args as any).onSubmit)}>
			<input className="form-control" name="test" />
			<Submit className="btn btn-primary" {...args}>
				Отправить
			</Submit>
		</Form>
	</div>
);

export const SimplestSubmitButton = Template.bind({});
