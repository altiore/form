// @ts-ignore
import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from './form';

export default {
	component: Form,
	title: '@altiore/form',
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const SimplestForm = Template.bind({});
SimplestForm.args = {
	children: (
		<>
			<input name="test" />
		</>
	),
};
