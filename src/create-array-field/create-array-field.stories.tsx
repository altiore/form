import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';

import ArrayField from './array-field';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: ArrayField,
	title: '@altiore/create-array-field',
} as ComponentMeta<typeof ArrayField>;

export const SimplestArrayField: ComponentStory<typeof ArrayField> = () => (
	<ArrayField name="ingredients" />
);

export const InsideFormArrayField: ComponentStory<typeof ArrayField> = ({
	onSubmit,
}: any) => (
	<Form onSubmit={onSubmit}>
		<ArrayField name="ingredients" />
	</Form>
);
