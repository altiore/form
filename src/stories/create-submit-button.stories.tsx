import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import Field from '~/stories/field';
import Submit from '~/stories/submit-button';
import {minLength} from '~/validators';

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
		<Form onSubmit={submitFunc((args as any).onSubmit)}>
			<div className="container overflow-hidden">
				<div className="row gy-3 p-3">
					<div className="col-12">
						<legend>Пример работы кнопки отправки формы</legend>
					</div>
					<div className="col-6">
						<Field name="title" label="Title No Validation" />
					</div>
					<div className="col-6" />
					<div className="col-6">
						<Field
							name="email"
							label="Email"
							validators={[minLength(null, 3)]}
						/>
					</div>
					<div className="col-6" />
					<div className="col-6">
						<Field
							defaultValue="Test"
							name="first"
							label="First"
							validators={[minLength(null, 3)]}
						/>
					</div>
					<div className="col-6" />
					<div className="col-6">
						<Submit className="btn btn-primary" {...args}>
							Отправить
						</Submit>
					</div>
				</div>
			</div>
		</Form>
	</div>
);

export const SimplestSubmitButton = Template.bind({});
